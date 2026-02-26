#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
MANAH GROUP — Video Asset Generator
═══════════════════════════════════════════════════════════════
Uses Google Veo 2 (via Gemini API) to generate website videos.

Video generation is asynchronous — Veo returns an operation ID
that must be polled until the video is ready.

Usage:
    python scripts/generate_videos.py                   # Generate all videos
    python scripts/generate_videos.py --category hero   # Generate only hero videos
    python scripts/generate_videos.py --id video_hero_main  # Generate single video
    python scripts/generate_videos.py --dry-run         # Preview prompts only
    python scripts/generate_videos.py --poll             # Poll pending operations
═══════════════════════════════════════════════════════════════
"""

import os
import sys
import json
import time
import argparse
import urllib.request
from pathlib import Path
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prompts import VIDEO_PROMPTS, get_all_video_prompts

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai package not installed.")
    print("Run: pip install google-genai --break-system-packages")
    sys.exit(1)

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

API_KEY = os.getenv("GOOGLE_API_KEY", "")
VIDEO_MODEL = os.getenv("VIDEO_MODEL", "veo-2.0-generate-001")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'videos')
OPERATIONS_FILE = os.path.join(os.path.dirname(__file__), '..', 'output', 'pending_video_operations.json')

# Rate limiting for video generation (more conservative)
BATCH_SIZE = 3  # Submit videos in batches of 3
DELAY_BETWEEN_BATCHES = 15  # seconds between batches
POLL_INTERVAL = 30  # seconds between status checks


def setup_client():
    """Initialize the Google GenAI client."""
    if not API_KEY or API_KEY == "PASTE_YOUR_KEY_HERE":
        print("=" * 60)
        print("  ERROR: API key not configured!")
        print("  Please paste your Google AI Studio key in:")
        print("  asset-generator/.env")
        print("=" * 60)
        sys.exit(1)
    return genai.Client(api_key=API_KEY)


def load_pending_operations():
    """Load pending video generation operations from file."""
    if os.path.exists(OPERATIONS_FILE):
        with open(OPERATIONS_FILE, "r") as f:
            return json.load(f)
    return {}


def save_pending_operations(operations):
    """Save pending operations to file."""
    os.makedirs(os.path.dirname(OPERATIONS_FILE), exist_ok=True)
    with open(OPERATIONS_FILE, "w") as f:
        json.dump(operations, f, indent=2)


def submit_video_generation(client, prompt_data, output_base):
    """Submit a video generation request (async)."""
    filepath = os.path.join(output_base, prompt_data["filename"])
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    # Skip if already generated
    if os.path.exists(filepath):
        print(f"  ⏭  SKIP (exists): {prompt_data['filename']}")
        return {"status": "skipped", "id": prompt_data["id"]}

    # Check if already submitted
    pending = load_pending_operations()
    if prompt_data["id"] in pending:
        print(f"  ⏭  SKIP (pending): {prompt_data['id']} — use --poll to check status")
        return {"status": "pending", "id": prompt_data["id"]}

    print(f"  🎬 Submitting: {prompt_data['id']}")
    print(f"     Purpose: {prompt_data['purpose']}")
    print(f"     Duration: {prompt_data.get('duration', 8)}s")

    try:
        # Veo 3.1 supports: 720p, 1080p, 4K resolution
        # Supports: 16:9, 9:16 aspect ratios
        # Supports: 5s, 6s, 8s durations
        # Supports native audio generation
        duration = prompt_data.get("duration", 8)
        # Veo 3.1 supports 5, 6, or 8 second durations
        if duration not in (5, 6, 8):
            duration = 8

        operation = client.models.generate_videos(
            model=VIDEO_MODEL,
            prompt=prompt_data["prompt"],
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                duration_seconds=duration,
                aspect_ratio="16:9",
                resolution="1080p",
            ),
        )

        # Store the operation for later polling
        op_name = operation.name if hasattr(operation, 'name') else str(operation)
        pending = load_pending_operations()
        pending[prompt_data["id"]] = {
            "operation_name": op_name,
            "filename": prompt_data["filename"],
            "filepath": filepath,
            "purpose": prompt_data["purpose"],
            "submitted_at": datetime.now().isoformat(),
        }
        save_pending_operations(pending)

        print(f"  📤 Submitted! Operation: {op_name[:50]}...")
        print(f"     Run `python scripts/generate_videos.py --poll` to check status")
        return {"status": "submitted", "id": prompt_data["id"], "operation": op_name}

    except Exception as e:
        error_msg = str(e)
        print(f"  ❌ Error: {error_msg[:150]}")
        return {"status": "error", "id": prompt_data["id"], "error": error_msg}


def poll_pending_operations(client):
    """Check status of pending video operations and download completed ones."""
    pending = load_pending_operations()
    if not pending:
        print("  No pending video operations found.")
        return

    print(f"  Polling {len(pending)} pending operation(s)...\n")
    completed = []

    for video_id, op_data in pending.items():
        print(f"  [{video_id}]")
        print(f"    Operation: {op_data['operation_name'][:60]}...")

        try:
            # Reconstruct the operation object from the stored name
            operation = types.GenerateVideosOperation(name=op_data['operation_name'])
            result = client.operations.get(operation)

            if hasattr(result, 'done') and result.done:
                print(f"    ✅ COMPLETE!")

                try:
                    resp = getattr(result, 'result', None) or getattr(result, 'response', None)
                    if resp and hasattr(resp, 'generated_videos') and resp.generated_videos:
                        vid = resp.generated_videos[0].video
                        saved = False
                        if vid:
                            # Try video_bytes first, then authenticated URI download
                            if hasattr(vid, 'video_bytes') and vid.video_bytes:
                                with open(op_data["filepath"], "wb") as f:
                                    f.write(vid.video_bytes)
                                saved = True
                            elif hasattr(vid, 'uri') and vid.uri:
                                print(f"    📥 Downloading from URI...")
                                # URI requires API key for authentication
                                separator = "&" if "?" in vid.uri else "?"
                                auth_uri = f"{vid.uri}{separator}key={API_KEY}"
                                urllib.request.urlretrieve(auth_uri, op_data["filepath"])
                                saved = True
                        if saved:
                            file_size = os.path.getsize(op_data["filepath"])
                            print(f"    📁 Saved: {op_data['filepath']} ({file_size / (1024*1024):.1f} MB)")
                            completed.append(video_id)
                        else:
                            print(f"    ⚠️  No video data available (no bytes or URI)")
                            completed.append(video_id)
                    else:
                        print(f"    ⚠️  Operation done but no generated videos in result")
                        completed.append(video_id)
                except Exception as save_err:
                    print(f"    ⚠️  Download error: {str(save_err)[:100]}")
                    print(f"    Keeping in queue — re-run --poll to retry")
            else:
                elapsed = ""
                if "submitted_at" in op_data:
                    from datetime import datetime as dt
                    submitted = dt.fromisoformat(op_data["submitted_at"])
                    mins = (dt.now() - submitted).seconds // 60
                    elapsed = f" (submitted {mins}m ago)"
                print(f"    ⏳ Still processing{elapsed}")

        except Exception as e:
            error_str = str(e)
            if "not found" in error_str.lower() or "404" in error_str:
                print(f"    ❌ Operation expired or not found. Removing from queue.")
                completed.append(video_id)
            else:
                print(f"    ❌ Poll error: {error_str[:120]}")

    # Remove completed operations
    for vid_id in completed:
        del pending[vid_id]
    save_pending_operations(pending)

    remaining = len(pending)
    if remaining > 0:
        print(f"\n  {remaining} video(s) still processing. Run --poll again in a few minutes.")
    else:
        print(f"\n  All videos complete!")


def generate_videos(category=None, single_id=None, dry_run=False, poll=False, batch_size=None):
    """Generate videos or poll for pending operations."""
    client = setup_client()

    if poll:
        poll_pending_operations(client)
        return

    all_prompts = get_all_video_prompts()

    if single_id:
        prompts = [p for p in all_prompts if p["id"] == single_id]
        if not prompts:
            print(f"Error: No prompt found with id '{single_id}'")
            sys.exit(1)
    elif category:
        prompts = [p for p in all_prompts if p["category"] == category]
        if not prompts:
            print(f"Error: No prompts found for category '{category}'")
            print(f"Available categories: {list(VIDEO_PROMPTS.keys())}")
            sys.exit(1)
    else:
        prompts = all_prompts

    total_batches = (len(prompts) + BATCH_SIZE - 1) // BATCH_SIZE

    print("=" * 60)
    print(f"  MANAH GROUP — Video Generation")
    print(f"  Model: {VIDEO_MODEL}")
    print(f"  Videos to generate: {len(prompts)} ({total_batches} batches of {BATCH_SIZE})")
    print(f"  Output: {OUTPUT_DIR}")
    if dry_run:
        print(f"  MODE: DRY RUN (no API calls)")
    print("=" * 60)

    if dry_run:
        for p in prompts:
            print(f"\n  [{p['id']}] {p['filename']}")
            print(f"  Category: {p['category']}")
            print(f"  Duration: {p.get('duration', 8)}s")
            print(f"  Purpose:  {p['purpose']}")
            print(f"  Prompt:   {p['prompt'][:200]}...")
        return

    results = []
    batches = [prompts[i:i + BATCH_SIZE] for i in range(0, len(prompts), BATCH_SIZE)]

    for batch_idx, batch in enumerate(batches):
        print(f"\n{'─' * 60}")
        print(f"  BATCH {batch_idx + 1}/{len(batches)} ({len(batch)} videos)")
        print(f"{'─' * 60}")

        batch_had_submission = False
        for i, prompt_data in enumerate(batch):
            overall_idx = batch_idx * BATCH_SIZE + i
            print(f"\n[{overall_idx + 1}/{len(prompts)}] ─────────────────────────────")
            result = submit_video_generation(client, prompt_data, OUTPUT_DIR)
            results.append(result)
            if result["status"] == "submitted":
                batch_had_submission = True

        if batch_idx < len(batches) - 1 and batch_had_submission:
            print(f"\n  ⏳ Batch {batch_idx + 1} done. Waiting {DELAY_BETWEEN_BATCHES}s before next batch...")
            time.sleep(DELAY_BETWEEN_BATCHES)

    submitted = sum(1 for r in results if r["status"] == "submitted")
    skipped = sum(1 for r in results if r["status"] in ("skipped", "pending"))
    errors = sum(1 for r in results if r["status"] == "error")

    print("\n" + "=" * 60)
    print(f"  SUBMISSION COMPLETE")
    print(f"  Submitted: {submitted} | Skipped: {skipped} | Errors: {errors}")
    if submitted > 0:
        print(f"\n  ⏳ Videos are generating asynchronously.")
        print(f"  Run this to check status:")
        print(f"  python scripts/generate_videos.py --poll")
    print("=" * 60)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Manah website videos")
    parser.add_argument("--category", "-c", help="Generate only specific category")
    parser.add_argument("--id", help="Generate single video by ID")
    parser.add_argument("--dry-run", "-d", action="store_true", help="Preview prompts only")
    parser.add_argument("--poll", "-p", action="store_true", help="Poll pending video operations")
    parser.add_argument("--list", "-l", action="store_true", help="List all video IDs")
    args = parser.parse_args()

    if args.list:
        for p in get_all_video_prompts():
            print(f"  {p['id']:30s} [{p['category']:12s}] {p.get('duration', 8)}s — {p['purpose']}")
        sys.exit(0)

    generate_videos(category=args.category, single_id=args.id, dry_run=args.dry_run, poll=args.poll)

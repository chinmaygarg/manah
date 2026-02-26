#!/usr/bin/env python3
"""
Manah Group — Hero Section Video Generator
Generates 5 cinematic hero videos (one per division) using Replicate.
Each video is 5 seconds for quick crossfading in the hero section.

Usage:
    python scripts/generate_hero_videos.py              # Generate all 5
    python scripts/generate_hero_videos.py --id tech    # Generate single
    python scripts/generate_hero_videos.py --dry-run    # Preview prompts
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import subprocess
from pathlib import Path
from datetime import datetime

try:
    import replicate
except ImportError:
    print("ERROR: replicate not installed. Run: pip3 install replicate")
    sys.exit(1)

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
if not REPLICATE_TOKEN:
    print("ERROR: REPLICATE_API_TOKEN not set in .env")
    sys.exit(1)

os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

VIDEO_MODEL = "google/veo-3-fast"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'replicate', 'videos', 'hero')
WEBSITE_VIDEO_DIR = "/Users/chinmay/Desktop/Manah/website/public/videos/hero"

HERO_VIDEOS = [
    {
        "id": "infrastructure",
        "filename": "hero_infrastructure.mp4",
        "duration": 4,
        "prompt": (
            "Cinematic aerial drone shot gliding forward over a massive modern power transmission "
            "and infrastructure construction project at golden hour. Enormous steel lattice towers "
            "stretching to the horizon. Camera moves steadily forward at medium altitude revealing "
            "the immense scale — roads, bridges, electrical substations below. Warm golden sunlight "
            "streaming through dramatic clouds, casting long shadows across the landscape. "
            "Dust particles catching golden light. Deep navy-blue shadows contrast with warm amber "
            "highlights. Ultra-smooth camera motion. Shot on Arri Alexa 65mm. "
            "Photorealistic, 4K cinematic quality. No text, no people close-up."
        ),
        "purpose": "Division 1: Manah Dynamics — Infrastructure & EPC"
    },
    {
        "id": "aerospace",
        "filename": "hero_aerospace.mp4",
        "duration": 4,
        "prompt": (
            "Cinematic slow dolly shot inside a pristine modern aircraft MRO maintenance hangar. "
            "Camera glides smoothly along the polished fuselage of a wide-body commercial aircraft. "
            "Open engine cowling reveals intricate turbine blades. Cool blue-white industrial LED "
            "lighting with warm amber spot highlights reflecting off the aircraft's metallic skin. "
            "Mirror-like reflections on the polished concrete hangar floor. Precision tools and "
            "advanced diagnostic equipment visible. Atmosphere of meticulous, high-tech precision. "
            "Ultra-smooth camera motion. Shot on Arri Alexa with anamorphic lens flare. "
            "Photorealistic, 4K cinematic quality. No text, no people close-up."
        ),
        "purpose": "Division 2: Manah Aerospace — Aviation MRO"
    },
    {
        "id": "green_energy",
        "filename": "hero_green_energy.mp4",
        "duration": 4,
        "prompt": (
            "Cinematic aerial shot rising slowly over a vast solar farm at sunrise transition. "
            "Thousands of solar panels catching the first golden rays of dawn, creating geometric "
            "patterns across the landscape. Elegant white wind turbines spinning slowly in the "
            "background against a gradient sky — deep navy blue transitioning to warm amber-gold. "
            "Morning mist hovering just above the ground. Camera rises steadily revealing the "
            "enormous clean energy installation stretching to the horizon. Serene, powerful, hopeful. "
            "Ultra-smooth camera motion. Shot on RED V-Raptor. "
            "Photorealistic, 4K cinematic quality. No text, no people."
        ),
        "purpose": "Division 3: Manah Green Energy — Renewables & Green Hydrogen"
    },
    {
        "id": "technology",
        "filename": "hero_technology.mp4",
        "duration": 4,
        "prompt": (
            "Cinematic slow tracking shot inside a state-of-the-art electronics manufacturing "
            "cleanroom. Camera glides smoothly past automated SMT (Surface Mount Technology) pick-and-place "
            "machines operating with robotic precision. Micro-components being placed on circuit boards "
            "at high speed. Cool blue-violet ambient lighting with warm golden accent lights on the "
            "machinery. LED indicators glowing. Shallow depth of field creating beautiful bokeh on "
            "background equipment. Atmosphere of advanced technological precision and defence-grade "
            "quality. Ultra-smooth dolly motion. Shot on Sony Venice 2 with Cooke anamorphic lenses. "
            "Photorealistic, 4K cinematic quality. No text, no people close-up."
        ),
        "purpose": "Division 4: Manah Technology — Electronics Manufacturing"
    },
    {
        "id": "investments",
        "filename": "hero_investments.mp4",
        "duration": 4,
        "prompt": (
            "Cinematic aerial shot at blue hour (twilight) sweeping over a modern Indian cityscape "
            "with illuminated corporate towers and infrastructure. Camera glides forward smoothly "
            "over a river reflecting city lights, revealing multiple project sites — a bridge under "
            "construction, a modern glass office complex, industrial facilities with warm amber "
            "lighting. The sky transitions from deep navy to warm gold at the horizon. City lights "
            "twinkling below. Represents strategic investment, growth, and urban development. "
            "Ultra-smooth aerial camera motion. Shot on Arri Alexa 65mm. "
            "Photorealistic, 4K cinematic quality. No text, no people."
        ),
        "purpose": "Division 5: Manah Investments — Strategic Growth"
    },
]


def generate_video(prompt_data):
    """Generate a single hero video using Veo 3 Fast on Replicate."""
    out_path = os.path.join(OUTPUT_DIR, prompt_data["filename"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {prompt_data['filename']}")
        return {"status": "skipped", "id": prompt_data["id"], "file": out_path}

    print(f"  Generating: {prompt_data['id']}")
    print(f"    Purpose: {prompt_data['purpose']}")
    print(f"    Duration: {prompt_data['duration']}s")
    print(f"    Model: {VIDEO_MODEL}")

    try:
        output = replicate.run(
            VIDEO_MODEL,
            input={
                "prompt": prompt_data["prompt"],
                "duration": prompt_data["duration"],
                "aspect_ratio": "16:9",
                "resolution": "720p",
            }
        )

        if output:
            if hasattr(output, 'read'):
                with open(out_path, "wb") as f:
                    f.write(output.read())
            elif isinstance(output, str):
                urllib.request.urlretrieve(output, out_path)
            elif isinstance(output, list) and len(output) > 0:
                url = str(output[0])
                urllib.request.urlretrieve(url, out_path)
            else:
                url = str(output)
                urllib.request.urlretrieve(url, out_path)

            size_mb = os.path.getsize(out_path) / (1024 * 1024)
            print(f"  Saved: {out_path} ({size_mb:.1f} MB)")
            return {"status": "success", "id": prompt_data["id"], "file": out_path}

        print(f"  No output returned for: {prompt_data['id']}")
        return {"status": "empty", "id": prompt_data["id"]}

    except Exception as e:
        print(f"  Error: {str(e)[:200]}")
        return {"status": "error", "id": prompt_data["id"], "error": str(e)}


def optimize_for_web(src_path, video_id):
    """Compress video to 720p and 480p for web delivery."""
    base = f"hero_{video_id}"

    for res_name, scale, crf in [("720p", "1280:720", "28"), ("480p", "854:480", "30")]:
        out_path = os.path.join(WEBSITE_VIDEO_DIR, f"{base}-{res_name}.mp4")
        os.makedirs(os.path.dirname(out_path), exist_ok=True)

        try:
            subprocess.run([
                "ffmpeg", "-y", "-i", src_path,
                "-vf", f"scale={scale}:force_original_aspect_ratio=decrease",
                "-c:v", "libx264", "-preset", "slow", "-crf", crf,
                "-an",
                "-movflags", "+faststart",
                "-pix_fmt", "yuv420p",
                out_path
            ], capture_output=True, check=True)
            size_kb = os.path.getsize(out_path) / 1024
            print(f"    {res_name}: {out_path} ({size_kb:.0f} KB)")
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"    ffmpeg error ({res_name}): {str(e)[:100]}")
            subprocess.run(["cp", src_path, out_path], capture_output=True)


def main():
    parser = argparse.ArgumentParser(description="Generate Manah hero videos")
    parser.add_argument("--id", help="Generate single video by ID (infrastructure, aerospace, green_energy, technology, investments)")
    parser.add_argument("--dry-run", "-d", action="store_true", help="Preview prompts only")
    parser.add_argument("--skip-optimize", action="store_true", help="Skip ffmpeg optimization")
    args = parser.parse_args()

    videos = HERO_VIDEOS
    if args.id:
        videos = [v for v in HERO_VIDEOS if v["id"] == args.id]
        if not videos:
            print(f"Error: No video with id '{args.id}'")
            print(f"Available: {', '.join(v['id'] for v in HERO_VIDEOS)}")
            sys.exit(1)

    print("=" * 60)
    print("  MANAH GROUP — Hero Video Generator")
    print(f"  Model: {VIDEO_MODEL}")
    print(f"  Videos: {len(videos)} x 4 seconds each")
    print(f"  Output: {OUTPUT_DIR}")
    if args.dry_run:
        print("  MODE: DRY RUN")
    print("=" * 60)

    if args.dry_run:
        for v in videos:
            print(f"\n  [{v['id']}] {v['filename']} ({v['duration']}s)")
            print(f"  Purpose: {v['purpose']}")
            print(f"  Prompt:  {v['prompt'][:200]}...")
        return

    results = []
    for i, video in enumerate(videos):
        print(f"\n{'─' * 60}")
        print(f"  [{i+1}/{len(videos)}] {video['id'].upper()}")
        print(f"{'─' * 60}")
        result = generate_video(video)
        results.append(result)

        # Rate limit: wait 5s between API calls
        if i < len(videos) - 1 and result["status"] != "skipped":
            print("  Waiting 5s for rate limit...")
            time.sleep(5)

        if result["status"] == "success" and not args.skip_optimize:
            print("  Optimizing for web...")
            optimize_for_web(result["file"], video["id"])

    success = sum(1 for r in results if r["status"] == "success")
    errors = sum(1 for r in results if r["status"] == "error")
    skipped = sum(1 for r in results if r["status"] == "skipped")

    print("\n" + "=" * 60)
    print(f"  COMPLETE: {success} generated | {skipped} skipped | {errors} errors")
    print("=" * 60)

    log_path = os.path.join(OUTPUT_DIR, "hero_generation_log.json")
    with open(log_path, "w") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "model": VIDEO_MODEL,
            "results": results,
        }, f, indent=2)


if __name__ == "__main__":
    main()

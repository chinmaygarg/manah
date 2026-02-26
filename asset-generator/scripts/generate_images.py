#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
MANAH GROUP — Image Asset Generator
═══════════════════════════════════════════════════════════════
Uses Google Imagen 3 (via Gemini API) to generate all website images.

Usage:
    python scripts/generate_images.py                  # Generate all images
    python scripts/generate_images.py --category hero  # Generate only hero images
    python scripts/generate_images.py --id hero_main_01  # Generate single image
    python scripts/generate_images.py --dry-run        # Preview prompts only
═══════════════════════════════════════════════════════════════
"""

import os
import sys
import json
import time
import argparse
import base64
from pathlib import Path
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prompts import IMAGE_PROMPTS, get_all_image_prompts

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai package not installed.")
    print("Run: pip install google-genai --break-system-packages")
    sys.exit(1)

# ─── Configuration ───
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

API_KEY = os.getenv("GOOGLE_API_KEY", "")
IMAGE_MODEL = os.getenv("IMAGE_MODEL", "imagen-3.0-generate-002")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'images')

# Rate limiting
REQUESTS_PER_MINUTE = 10
DELAY_BETWEEN_REQUESTS = 60 / REQUESTS_PER_MINUTE  # 6 seconds


def setup_client():
    """Initialize the Google GenAI client."""
    if not API_KEY or API_KEY == "PASTE_YOUR_KEY_HERE":
        print("=" * 60)
        print("  ERROR: API key not configured!")
        print("  Please paste your Google AI Studio key in:")
        print("  asset-generator/.env")
        print("=" * 60)
        sys.exit(1)

    client = genai.Client(api_key=API_KEY)
    return client


def generate_single_image(client, prompt_data, output_base):
    """Generate a single image using Imagen 3."""
    filepath = os.path.join(output_base, prompt_data["filename"])
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    # Skip if already generated
    if os.path.exists(filepath):
        print(f"  ⏭  SKIP (exists): {prompt_data['filename']}")
        return {"status": "skipped", "id": prompt_data["id"], "file": filepath}

    print(f"  🎨 Generating: {prompt_data['id']}")
    print(f"     Purpose: {prompt_data['purpose']}")

    try:
        # Imagen 4 uses generate_images with GenerateImagesConfig
        # Supports: 1:1, 3:4, 4:3, 9:16, 16:9
        aspect = prompt_data.get("aspect_ratio", "16:9")

        response = client.models.generate_images(
            model=IMAGE_MODEL,
            prompt=prompt_data["prompt"],
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio=aspect,
                safety_filter_level="BLOCK_LOW_AND_ABOVE",
                person_generation="ALLOW_ADULT",
                output_mime_type="image/png",
            ),
        )

        # Save the generated image
        if response.generated_images and len(response.generated_images) > 0:
            image = response.generated_images[0]
            # Imagen 4 returns image via .image property
            image.image.save(filepath)

            file_size = os.path.getsize(filepath)
            print(f"  ✅ Saved: {filepath} ({file_size / 1024:.1f} KB)")
            return {"status": "success", "id": prompt_data["id"], "file": filepath, "size": file_size}
        else:
            print(f"  ⚠️  No image returned for: {prompt_data['id']}")
            if hasattr(response, 'filtered_reason'):
                print(f"     Reason: {response.filtered_reason}")
            return {"status": "empty", "id": prompt_data["id"]}

    except Exception as e:
        error_msg = str(e)
        print(f"  ❌ Error: {error_msg[:100]}")
        return {"status": "error", "id": prompt_data["id"], "error": error_msg}


def generate_images(category=None, single_id=None, dry_run=False):
    """Generate images for all or specific categories."""
    all_prompts = get_all_image_prompts()

    # Filter by category or ID
    if single_id:
        prompts = [p for p in all_prompts if p["id"] == single_id]
        if not prompts:
            print(f"Error: No prompt found with id '{single_id}'")
            sys.exit(1)
    elif category:
        prompts = [p for p in all_prompts if p["category"] == category]
        if not prompts:
            print(f"Error: No prompts found for category '{category}'")
            print(f"Available categories: {list(IMAGE_PROMPTS.keys())}")
            sys.exit(1)
    else:
        prompts = all_prompts

    print("=" * 60)
    print(f"  MANAH GROUP — Image Generation")
    print(f"  Model: {IMAGE_MODEL}")
    print(f"  Images to generate: {len(prompts)}")
    print(f"  Output: {OUTPUT_DIR}")
    if dry_run:
        print(f"  MODE: DRY RUN (no API calls)")
    print("=" * 60)

    if dry_run:
        for p in prompts:
            print(f"\n  [{p['id']}] {p['filename']}")
            print(f"  Category: {p['category']}")
            print(f"  Aspect:   {p.get('aspect_ratio', '16:9')}")
            print(f"  Purpose:  {p['purpose']}")
            print(f"  Prompt:   {p['prompt'][:150]}...")
        return

    client = setup_client()
    results = []
    start_time = time.time()

    for i, prompt_data in enumerate(prompts):
        print(f"\n[{i+1}/{len(prompts)}] ─────────────────────────────")
        result = generate_single_image(client, prompt_data, OUTPUT_DIR)
        results.append(result)

        # Rate limiting
        if i < len(prompts) - 1 and result["status"] != "skipped":
            print(f"  ⏳ Waiting {DELAY_BETWEEN_REQUESTS:.0f}s (rate limit)...")
            time.sleep(DELAY_BETWEEN_REQUESTS)

    # ─── Summary ───
    elapsed = time.time() - start_time
    success = sum(1 for r in results if r["status"] == "success")
    skipped = sum(1 for r in results if r["status"] == "skipped")
    errors = sum(1 for r in results if r["status"] == "error")

    print("\n" + "=" * 60)
    print(f"  GENERATION COMPLETE")
    print(f"  Time: {elapsed:.0f}s | Success: {success} | Skipped: {skipped} | Errors: {errors}")
    print("=" * 60)

    # Save results log
    log_path = os.path.join(OUTPUT_DIR, "..", "image_generation_log.json")
    with open(log_path, "w") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "model": IMAGE_MODEL,
            "total": len(prompts),
            "success": success,
            "skipped": skipped,
            "errors": errors,
            "elapsed_seconds": elapsed,
            "results": results
        }, f, indent=2)
    print(f"  Log saved: {log_path}")

    if errors > 0:
        print(f"\n  ⚠️  {errors} image(s) failed. Re-run to retry failed images.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Manah website images")
    parser.add_argument("--category", "-c", help="Generate only specific category (hero, divisions, sectors, etc.)")
    parser.add_argument("--id", help="Generate single image by ID")
    parser.add_argument("--dry-run", "-d", action="store_true", help="Preview prompts without generating")
    parser.add_argument("--list", "-l", action="store_true", help="List all available image IDs")
    args = parser.parse_args()

    if args.list:
        for p in get_all_image_prompts():
            print(f"  {p['id']:35s} [{p['category']:15s}] {p['purpose']}")
        sys.exit(0)

    generate_images(category=args.category, single_id=args.id, dry_run=args.dry_run)

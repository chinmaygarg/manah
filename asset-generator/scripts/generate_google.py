#!/usr/bin/env python3
"""
Manah Group — Google AI Studio Asset Generator
Uses Gemini image models for image generation via the generateContent API.
Outputs optimized WebP images for fast web loading.

Usage:
    python3 scripts/generate_google.py                    # Only generate missing images (default)
    python3 scripts/generate_google.py --dry-run          # Show what would be generated
    python3 scripts/generate_google.py --force             # Regenerate all images
    python3 scripts/generate_google.py --category news     # Only process 'news' category
    python3 scripts/generate_google.py --dry-run --force   # Show all images that would be generated
"""

import argparse
import os
import sys
import json
import base64
import time
import urllib.request
import subprocess
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
IMAGE_MODEL = os.getenv("IMAGE_MODEL", "gemini-3.1-flash-image-preview")
IMAGE_MODEL_FALLBACK = os.getenv("IMAGE_MODEL_FALLBACK", "gemini-2.5-flash-image")

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'google')
WEBSITE_IMAGES_DIR = os.path.join(
    os.path.dirname(__file__), '..', '..', 'website', 'public', 'images'
)

API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

ALTERNATE_EXTENSIONS = {
    ".png": [".jpg", ".jpeg", ".webp"],
    ".jpg": [".png", ".jpeg", ".webp"],
    ".jpeg": [".png", ".jpg", ".webp"],
    ".webp": [".png", ".jpg", ".jpeg"],
}


def find_existing_file(filename):
    """Check if an image already exists in website or output dirs.

    Checks the exact filename first, then tries alternate extensions
    (e.g., a prompt specifies .png but Replicate generated .jpg).

    Returns (path, location_label) if found, or (None, None).
    """
    base, ext = os.path.splitext(filename)
    candidates = [filename] + [
        f"{base}{alt}" for alt in ALTERNATE_EXTENSIONS.get(ext, [])
    ]

    for candidate in candidates:
        website_path = os.path.join(WEBSITE_IMAGES_DIR, candidate)
        if os.path.exists(website_path):
            return website_path, "website"

        out_path = os.path.join(OUTPUT_DIR, "images", candidate)
        if os.path.exists(out_path):
            return out_path, "output"

    return None, None


def generate_image_with_model(model, prompt, retries=2):
    """Call Google AI Studio generateContent API for image generation."""
    url = f"{API_BASE}/{model}:generateContent?key={GOOGLE_API_KEY}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }

    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode(),
                headers={"Content-Type": "application/json"}
            )
            resp = urllib.request.urlopen(req, timeout=180)
            data = json.loads(resp.read())

            for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
                if "inlineData" in part:
                    return {
                        "data": base64.b64decode(part["inlineData"]["data"]),
                        "mime": part["inlineData"]["mimeType"],
                        "model": model,
                    }

            return None

        except urllib.error.HTTPError as e:
            status = e.code
            if status == 503 and attempt < retries - 1:
                print(f"    503 from {model}, retrying in 5s...")
                time.sleep(5)
                continue
            body = e.read().decode()[:200]
            raise RuntimeError(f"HTTP {status}: {body}")

    return None


def generate_image(prompt_data, force=False, dry_run=False):
    """Generate a single image, skipping if it already exists.

    Checks both website/public/images and output/google/images directories,
    including alternate file extensions.
    """
    filename = prompt_data["filename"]

    if not force:
        existing_path, location = find_existing_file(filename)
        if existing_path:
            print(f"  SKIP (in {location}): {filename}")
            return {"status": "skipped", "id": prompt_data["id"], "file": existing_path}

    if dry_run:
        print(f"  WOULD GENERATE: {prompt_data['id']} -> {filename}")
        print(f"    Purpose: {prompt_data['purpose']}")
        return {"status": "dry_run", "id": prompt_data["id"], "file": filename}

    out_path = os.path.join(OUTPUT_DIR, "images", filename)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    print(f"  Generating: {prompt_data['id']}")
    print(f"    Purpose: {prompt_data['purpose']}")

    prompt = prompt_data["prompt"]
    aspect = prompt_data.get("aspect_ratio", "16:9")
    full_prompt = f"{prompt} Aspect ratio: {aspect}."

    models_to_try = [IMAGE_MODEL, IMAGE_MODEL_FALLBACK]

    for model in models_to_try:
        try:
            print(f"    Using: {model}")
            result = generate_image_with_model(model, full_prompt)

            if result:
                ext = "png" if "png" in result["mime"] else "jpg"
                base_no_ext, _ = os.path.splitext(out_path)
                save_path = f"{base_no_ext}.{ext}"
                with open(save_path, "wb") as f:
                    f.write(result["data"])

                size_kb = len(result["data"]) / 1024
                print(f"    Saved: {save_path} ({size_kb:.0f} KB) via {result['model']}")
                return {
                    "status": "success",
                    "id": prompt_data["id"],
                    "file": save_path,
                    "model": result["model"],
                    "size_kb": round(size_kb),
                }
            else:
                print(f"    No image returned from {model}")

        except Exception as e:
            print(f"    Error with {model}: {str(e)[:150]}")

    print(f"    FAILED: all models exhausted for {prompt_data['id']}")
    return {"status": "error", "id": prompt_data["id"], "error": "all models failed"}


def optimize_images():
    """Convert generated images to optimized WebP at responsive breakpoints."""
    src_dir = os.path.join(OUTPUT_DIR, "images")
    if not os.path.exists(src_dir):
        print("  No images to optimize.")
        return

    sizes = {"sm": 640, "md": 1024, "lg": 1920, "xl": 2560}

    for root, _, files in os.walk(src_dir):
        for fname in files:
            if not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue

            src = os.path.join(root, fname)
            rel = os.path.relpath(src, src_dir)
            base, _ = os.path.splitext(rel)

            for suffix, width in sizes.items():
                webp_path = os.path.join(WEBSITE_IMAGES_DIR, f"{base}-{suffix}.webp")
                os.makedirs(os.path.dirname(webp_path), exist_ok=True)

                jpg_tmp = webp_path.replace('.webp', '.jpg')
                subprocess.run(
                    ["sips", "--resampleWidth", str(width), "-s", "format", "jpeg", src, "--out", jpg_tmp],
                    capture_output=True
                )

                if os.path.exists(jpg_tmp):
                    try:
                        subprocess.run(
                            ["cwebp", "-q", "85", jpg_tmp, "-o", webp_path],
                            capture_output=True, check=True
                        )
                        os.remove(jpg_tmp)
                        size_kb = os.path.getsize(webp_path) / 1024
                        print(f"    {webp_path} ({size_kb:.0f} KB)")
                    except (subprocess.CalledProcessError, FileNotFoundError):
                        final_path = os.path.join(WEBSITE_IMAGES_DIR, f"{base}-{suffix}.jpg")
                        os.rename(jpg_tmp, final_path)
                        size_kb = os.path.getsize(final_path) / 1024
                        print(f"    {final_path} ({size_kb:.0f} KB)")

            orig_dest = os.path.join(WEBSITE_IMAGES_DIR, rel)
            os.makedirs(os.path.dirname(orig_dest), exist_ok=True)
            subprocess.run(["cp", src, orig_dest], capture_output=True)
            print(f"  Original: {orig_dest}")


def parse_args():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(
        description="Manah Group — Google AI Studio Asset Generator"
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regenerate all images even if they already exist"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be generated without calling the API"
    )
    parser.add_argument(
        "--category",
        type=str,
        default=None,
        help="Only generate images for a specific category (e.g., news, blog, gallery)"
    )
    return parser.parse_args()


def main():
    args = parse_args()

    if not args.dry_run and not GOOGLE_API_KEY:
        print("ERROR: GOOGLE_API_KEY not set in .env")
        sys.exit(1)

    from prompts import get_all_image_prompts, get_summary, IMAGE_PROMPTS

    if args.category:
        if args.category not in IMAGE_PROMPTS:
            print(f"ERROR: Unknown category '{args.category}'")
            print(f"Available: {', '.join(IMAGE_PROMPTS.keys())}")
            sys.exit(1)
        all_prompts = [
            {**p, "category": args.category}
            for p in IMAGE_PROMPTS[args.category]
        ]
    else:
        all_prompts = get_all_image_prompts()

    mode_label = []
    if args.dry_run:
        mode_label.append("DRY RUN")
    if args.force:
        mode_label.append("FORCE")
    mode_str = f" [{' + '.join(mode_label)}]" if mode_label else ""

    print("=" * 60)
    print(f"  MANAH GROUP — Google AI Studio Asset Generator{mode_str}")
    print(f"  Primary Model: {IMAGE_MODEL}")
    print(f"  Fallback Model: {IMAGE_MODEL_FALLBACK}")
    print(f"  Total Prompts: {len(all_prompts)}")
    if args.category:
        print(f"  Category Filter: {args.category}")
    print("=" * 60)

    if not args.category:
        get_summary()

    results = []
    for i, prompt in enumerate(all_prompts):
        print(f"\n[{i+1}/{len(all_prompts)}] ────────────────────────")
        result = generate_image(prompt, force=args.force, dry_run=args.dry_run)
        results.append(result)

        if result["status"] == "success":
            time.sleep(1)

    success = sum(1 for r in results if r["status"] == "success")
    skipped = sum(1 for r in results if r["status"] == "skipped")
    dry_run_count = sum(1 for r in results if r["status"] == "dry_run")
    errors = sum(1 for r in results if r["status"] == "error")

    print(f"\n{'─' * 60}")
    if args.dry_run:
        print(f"  Dry Run: {dry_run_count} would be generated, {skipped} already exist")
    else:
        print(f"  Results: {success} generated, {skipped} skipped, {errors} errors")
    print(f"{'─' * 60}")

    if success > 0 and not args.dry_run:
        print("\n  Optimizing images for web...")
        optimize_images()

    print("\n" + "=" * 60)
    print("  COMPLETE")
    print(f"  Output: {OUTPUT_DIR}")
    print("=" * 60)

    if not args.dry_run:
        log_path = os.path.join(OUTPUT_DIR, "generation_log.json")
        os.makedirs(os.path.dirname(log_path), exist_ok=True)
        with open(log_path, "w") as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "primary_model": IMAGE_MODEL,
                "fallback_model": IMAGE_MODEL_FALLBACK,
                "category_filter": args.category,
                "force": args.force,
                "results": results,
            }, f, indent=2)


if __name__ == "__main__":
    main()

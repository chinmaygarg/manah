#!/usr/bin/env python3
"""
Manah Group — Presentation Image Generator
Uses google/nano-banana-pro via Replicate API.
Generates 7 AI images for the corporate presentation.

Usage:
    python generate-images.py              # Generate all images
    python generate-images.py --id cover   # Generate single image
    python generate-images.py --dry-run    # Preview prompts only

Est. cost: < $0.10 total
"""

import os
import sys
import json
import urllib.request
from pathlib import Path
from datetime import datetime

try:
    import replicate
except ImportError:
    print("ERROR: replicate package not installed. Run: pip3 install replicate")
    sys.exit(1)

from dotenv import load_dotenv

# Load API token from asset-generator/.env
ENV_PATH = os.path.join(os.path.dirname(__file__), '..', 'asset-generator', '.env')
load_dotenv(ENV_PATH)

REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
if not REPLICATE_TOKEN:
    print("ERROR: REPLICATE_API_TOKEN not set in asset-generator/.env")
    sys.exit(1)

os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

MODEL = "google/nano-banana-pro"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'images', 'generated')

# ─── Brand Style Directive ───
BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

# ─── Image Prompts ───
IMAGES = [
    {
        "id": "cover_hero",
        "filename": "cover_hero.jpg",
        "prompt": (
            BRAND_STYLE +
            "A young Indian child holding a glowing light bulb, standing in front of a panoramic view of "
            "modern Indian infrastructure — suspension bridges, metro lines, solar farms, and transmission towers. "
            "Golden hour lighting, cinematic depth of field. The child represents India's future. "
            "Warm golden tones with deep navy sky. Aspirational and emotional. 16:9 aspect ratio."
        ),
        "purpose": "Slide 1 — Cover background",
    },
    {
        "id": "india_infra_split",
        "filename": "india_infra_split.jpg",
        "prompt": (
            BRAND_STYLE +
            "Aerial split composition: left side shows undeveloped rural Indian landscape with dirt roads "
            "and basic structures; right side shows a gleaming modern smart city with glass towers, metro systems, "
            "and solar panels. A dramatic dividing line between old and new India. "
            "Shot from drone, wide angle. Golden hour lighting. 16:9 aspect ratio."
        ),
        "purpose": "Slide 2 — The Challenge",
    },
    {
        "id": "corporate_boardroom",
        "filename": "corporate_boardroom.jpg",
        "prompt": (
            BRAND_STYLE +
            "A modern corporate boardroom with floor-to-ceiling windows showing Hyderabad skyline at dusk. "
            "Long polished conference table with navy leather chairs. Subtle gold accent lighting. "
            "Empty room, no people. Premium materials — marble, glass, brushed steel. "
            "Warm golden light spilling through windows. Professional and aspirational. 16:9 aspect ratio."
        ),
        "purpose": "Slide 3 — Who We Are",
    },
    {
        "id": "manufacturing_floor",
        "filename": "manufacturing_floor.jpg",
        "prompt": (
            BRAND_STYLE +
            "Close-up of an advanced SMT electronics manufacturing line. Robotic pick-and-place machines "
            "assembling PCBs with extreme precision. Clean room environment with blue LED accent lighting. "
            "Circuit boards in production. Sharp macro photography style. "
            "High-tech, precise, modern Indian manufacturing excellence. 16:9 aspect ratio."
        ),
        "purpose": "Slide 10 — Tech & Manufacturing",
    },
    {
        "id": "business_jet",
        "filename": "business_jet.jpg",
        "prompt": (
            BRAND_STYLE +
            "A sleek white business jet (Embraer Phenom style) parked on a tarmac at golden hour. "
            "Maintenance crew in professional uniforms performing inspection. "
            "Dramatic sky with warm gold and navy blue tones. Airport hangar in background. "
            "Clean, professional aviation photography. 16:9 aspect ratio."
        ),
        "purpose": "Slide 13 — Aerospace",
    },
    {
        "id": "hydrogen_plant",
        "filename": "hydrogen_plant.jpg",
        "prompt": (
            BRAND_STYLE +
            "A modern green hydrogen production facility with rows of electrolyzers and solar panels. "
            "Wind turbines visible in the background against a clean blue sky. "
            "Green vegetation surrounding the facility. Sustainable, clean, futuristic. "
            "Bright daylight, vivid greens and clean whites. 16:9 aspect ratio."
        ),
        "purpose": "Slide 17 — Green Energy",
    },
    {
        "id": "esg_landscape",
        "filename": "esg_landscape.jpg",
        "prompt": (
            BRAND_STYLE +
            "Aerial view of solar panels installed in a lush green Indian landscape. "
            "A clean river flows nearby with a small village visible. Trees, agriculture fields. "
            "Community members visible at distance. Harmonious blend of technology and nature. "
            "Golden hour, warm tones. Sustainability and community impact. 16:9 aspect ratio."
        ),
        "purpose": "Slide 23 — ESG",
    },
]


def generate_image(image_config, dry_run=False):
    """Generate a single image using Replicate."""
    img_id = image_config["id"]
    filename = image_config["filename"]
    prompt = image_config["prompt"]
    output_path = os.path.join(OUTPUT_DIR, filename)

    print(f"\n{'─' * 60}")
    print(f"  Generating: {img_id}")
    print(f"  Purpose: {image_config['purpose']}")
    print(f"  Output: {output_path}")
    print(f"{'─' * 60}")

    if dry_run:
        print(f"  [DRY RUN] Prompt: {prompt[:120]}...")
        return True

    if os.path.exists(output_path):
        print(f"  [SKIP] Already exists: {output_path}")
        return True

    try:
        print(f"  Running {MODEL}...")
        output = replicate.run(
            MODEL,
            input={
                "prompt": prompt,
                "aspect_ratio": "16:9",
            }
        )

        # Handle output (could be URL string or FileOutput)
        if hasattr(output, 'read'):
            image_data = output.read()
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'wb') as f:
                f.write(image_data)
        elif isinstance(output, str):
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            urllib.request.urlretrieve(output, output_path)
        elif isinstance(output, list) and len(output) > 0:
            url = str(output[0])
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            urllib.request.urlretrieve(url, output_path)
        else:
            print(f"  [ERROR] Unexpected output type: {type(output)}")
            return False

        file_size = os.path.getsize(output_path)
        print(f"  [OK] Saved ({file_size / 1024:.1f} KB)")
        return True

    except Exception as e:
        print(f"  [ERROR] {e}")
        return False


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Generate presentation images via Replicate")
    parser.add_argument("--id", help="Generate single image by ID")
    parser.add_argument("--dry-run", action="store_true", help="Preview prompts without generating")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print("  MANAH GROUP — Presentation Image Generator")
    print(f"  Model: {MODEL}")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"  Images: {len(IMAGES)}")
    print("=" * 60)

    images_to_generate = IMAGES
    if args.id:
        images_to_generate = [img for img in IMAGES if img["id"] == args.id]
        if not images_to_generate:
            print(f"ERROR: No image found with ID '{args.id}'")
            print(f"Available IDs: {', '.join(img['id'] for img in IMAGES)}")
            sys.exit(1)

    results = []
    for img in images_to_generate:
        success = generate_image(img, dry_run=args.dry_run)
        results.append({"id": img["id"], "success": success})

    # Summary
    print(f"\n{'=' * 60}")
    succeeded = sum(1 for r in results if r["success"])
    print(f"  Results: {succeeded}/{len(results)} images generated")
    print("=" * 60)

    # Save generation log
    if not args.dry_run:
        log_path = os.path.join(OUTPUT_DIR, "generation_log.json")
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "model": MODEL,
            "results": results,
        }
        with open(log_path, 'w') as f:
            json.dump(log_entry, f, indent=2)


if __name__ == "__main__":
    main()

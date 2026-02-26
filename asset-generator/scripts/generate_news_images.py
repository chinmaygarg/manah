#!/usr/bin/env python3
"""Generate editorial-quality news images for the Making Headlines section."""

import os
import sys
import urllib.request
import subprocess
from pathlib import Path

try:
    import replicate
except ImportError:
    print("ERROR: replicate package not installed. Run: pip3 install replicate")
    sys.exit(1)

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
if not REPLICATE_TOKEN:
    print("ERROR: REPLICATE_API_TOKEN not set in .env")
    sys.exit(1)

os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

IMAGE_MODEL = "black-forest-labs/flux-2-pro"
OUTPUT_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/news"

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

NEWS_IMAGES = [
    {
        "id": "news_power_transmission",
        "filename": "power-transmission.jpg",
        "prompt": (
            BRAND_STYLE +
            "Massive high-voltage power transmission towers stretching across the Thar Desert "
            "at golden hour. 220kV steel lattice towers receding into the distance along a "
            "straight line. Dramatic desert landscape with sand dunes. Warm golden sunlight "
            "casting long shadows. Dust particles in the air catching golden light. "
            "Power lines gleaming. Epic scale, infrastructure achievement. "
            "Shot from low angle looking up at tower. Cinematic wide-angle."
        ),
        "aspect_ratio": "3:4",
    },
    {
        "id": "news_aerospace_mro",
        "filename": "aerospace-mro.jpg",
        "prompt": (
            BRAND_STYLE +
            "Inside a modern aircraft MRO hangar. Wide-body commercial aircraft with engine "
            "cowling open being serviced. Technicians in professional uniforms working with "
            "precision tools. Cool blue industrial LED lighting mixed with warm accent spots. "
            "Reflective polished hangar floor. Aircraft fuselage fills the frame. "
            "High-tech, precision engineering atmosphere. Shallow depth of field on engine. "
            "Clean, organized workspace. Shot on 35mm."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "id": "news_green_hydrogen",
        "filename": "green-hydrogen.jpg",
        "prompt": (
            BRAND_STYLE +
            "Modern green hydrogen electrolysis facility in Gujarat, India. Rows of gleaming "
            "electrolyzer stacks with stainless steel piping. Green and teal LED accent lighting "
            "on the equipment. Subtle steam/vapor rising. Large storage tanks in background. "
            "Solar panels visible through facility windows. Clean, futuristic, hopeful atmosphere. "
            "Shot from walkway perspective between equipment rows. Industrial beauty."
        ),
        "aspect_ratio": "16:9",
    },
]


def generate_image(img_data):
    """Generate a single image."""
    out_path = os.path.join(OUTPUT_DIR, img_data["filename"])

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {img_data['filename']}")
        return out_path

    print(f"  Generating: {img_data['id']}...")

    output = replicate.run(
        IMAGE_MODEL,
        input={
            "prompt": img_data["prompt"],
            "aspect_ratio": img_data["aspect_ratio"],
            "output_format": "jpg",
            "output_quality": 95,
            "safety_tolerance": 2,
            "steps": 30,
        }
    )

    if output:
        if hasattr(output, 'read'):
            with open(out_path, "wb") as f:
                f.write(output.read())
        elif isinstance(output, str):
            urllib.request.urlretrieve(output, out_path)
        elif isinstance(output, list) and len(output) > 0:
            urllib.request.urlretrieve(str(output[0]), out_path)
        else:
            urllib.request.urlretrieve(str(output), out_path)

        size_kb = os.path.getsize(out_path) / 1024
        print(f"  Saved: {img_data['filename']} ({size_kb:.0f} KB)")
        return out_path

    print(f"  ERROR: No output for {img_data['id']}")
    return None


def optimize_to_webp(jpg_path, name):
    """Convert to optimized WebP at multiple sizes."""
    sizes = {"sm": 640, "md": 1024, "lg": 1920}
    base = os.path.splitext(name)[0]

    for suffix, width in sizes.items():
        webp_out = os.path.join(OUTPUT_DIR, f"{base}-{suffix}.webp")
        try:
            subprocess.run(
                ["cwebp", "-q", "85", "-resize", str(width), "0", jpg_path, "-o", webp_out],
                capture_output=True, check=True
            )
            size_kb = os.path.getsize(webp_out) / 1024
            print(f"    {base}-{suffix}.webp ({size_kb:.0f} KB)")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print(f"    cwebp not available, keeping jpg")
            break


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print("=" * 50)
    print("  Generating News Section Images (FLUX 2 Pro)")
    print("=" * 50)

    for i, img in enumerate(NEWS_IMAGES):
        print(f"\n[{i+1}/{len(NEWS_IMAGES)}] ─────────────────────")
        path = generate_image(img)
        if path:
            print("  Optimizing to WebP...")
            optimize_to_webp(path, img["filename"])

    print("\n" + "=" * 50)
    print("  DONE")
    print("=" * 50)


if __name__ == "__main__":
    main()

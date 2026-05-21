#!/usr/bin/env python3
"""
Manah Group — Mining & Irrigation/Water Sector Image Generator (Replicate / FLUX 2 Pro)
Generates exclusive sector card images for the Mining and Irrigation & Water
sectors, which previously reused the manufacturing/infrastructure photos.

Outputs optimised WebP straight to website/public/images/sectors/ so the
site data can point at unique files. Generates a temporary JPG from the
model, caps the long edge, then converts to WebP via cwebp.
"""

import os
import sys
import subprocess
import urllib.request

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

IMAGE_MODEL = os.getenv("REPLICATE_IMAGE_MODEL", "black-forest-labs/flux-2-pro")
SECTORS_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/sectors"
MAX_EDGE = 2560   # optimize: cap long edge to match existing sector images
WEBP_QUALITY = 80

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

SECTOR_IMAGES = [
    {
        "id": "mining",
        "filename": "mining.webp",
        "prompt": (
            BRAND_STYLE +
            "Sweeping open-pit mine at golden hour — terraced excavation benches descending "
            "into the earth, massive haul trucks and hydraulic excavators working the floor, "
            "a mineral processing plant with conveyor systems and crushing units on the rim. "
            "Large-scale coal and iron-ore extraction operation. Industrial scale and "
            "engineering precision. Dramatic low sun, deep navy sky, warm gold light raking "
            "across the pit walls."
        ),
    },
    {
        "id": "irrigation_water",
        "filename": "irrigation_water.webp",
        "prompt": (
            BRAND_STYLE +
            "Large municipal water treatment plant at dawn — circular clarifier tanks and "
            "aeration basins with rippling water, a canal network and lift-irrigation pumping "
            "station stretching toward green farmland. Clean drinking-water infrastructure, "
            "calm and vital atmosphere. Soft morning light, deep navy pre-dawn sky, warm gold "
            "sunrise reflecting off the water surfaces."
        ),
    },
]


def generate(img):
    out_path = os.path.join(SECTORS_DIR, img["filename"])
    if os.path.exists(out_path):
        print(f"  SKIP (exists): {img['filename']}")
        return "skipped"

    tmp_jpg = os.path.join(SECTORS_DIR, img["id"] + "._tmp.jpg")
    print(f"  Generating: {img['id']} via {IMAGE_MODEL}")
    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": img["prompt"],
                "aspect_ratio": "16:9",
                "output_format": "jpg",
                "output_quality": 95,
                "safety_tolerance": 2,
                "steps": 30,
            },
        )
        if not output:
            print(f"  No output for {img['id']}")
            return "error"

        if hasattr(output, "read"):
            with open(tmp_jpg, "wb") as f:
                f.write(output.read())
        elif isinstance(output, list) and output:
            urllib.request.urlretrieve(str(output[0]), tmp_jpg)
        else:
            urllib.request.urlretrieve(str(output), tmp_jpg)

        print(f"  Generated JPG: {os.path.getsize(tmp_jpg) / 1024:.0f} KB")
        to_webp(tmp_jpg, out_path)
        return "success"
    except Exception as e:
        print(f"  Error: {str(e)[:200]}")
        return "error"
    finally:
        if os.path.exists(tmp_jpg):
            os.remove(tmp_jpg)


def to_webp(jpg_path, webp_path):
    """Cap the long edge, then convert JPG to optimised WebP via cwebp."""
    try:
        subprocess.run(
            ["sips", "-Z", str(MAX_EDGE), jpg_path],
            capture_output=True, check=True,
        )
        subprocess.run(
            ["cwebp", "-q", str(WEBP_QUALITY), jpg_path, "-o", webp_path],
            capture_output=True, check=True,
        )
        print(f"  Saved WebP: {webp_path} ({os.path.getsize(webp_path) / 1024:.0f} KB)")
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        raise RuntimeError(f"WebP conversion failed: {str(e)[:120]}")


def main():
    print("=" * 60)
    print("  Mining & Irrigation/Water Sector Images — Replicate / FLUX 2 Pro")
    print(f"  Output: {SECTORS_DIR}")
    print("=" * 60)
    results = [generate(img) for img in SECTOR_IMAGES]
    print("=" * 60)
    print(f"  Done: {results.count('success')} generated, "
          f"{results.count('skipped')} skipped, {results.count('error')} errors")
    print("=" * 60)
    if results.count("error"):
        sys.exit(1)


if __name__ == "__main__":
    main()

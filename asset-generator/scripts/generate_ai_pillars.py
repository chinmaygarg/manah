#!/usr/bin/env python3
"""
Manah Group — Manah AI Pillar Image Generator (Replicate / FLUX 2 Pro)
Generates cinematic-photography images for the two Manah AI division pillars:
Generative AI & LLM, and Data Centers.

Outputs optimised WebP straight to website/public/images/divisions/ so the
division data can point at unique files. Generates a temporary JPG from the
model, caps the long edge, then converts to WebP via cwebp.

Usage:
    python3 generate_ai_pillars.py            # generate missing pillar images
    python3 generate_ai_pillars.py --force    # regenerate even if files exist
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
DIVISIONS_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/divisions"
MAX_EDGE = 2048   # cap long edge — keeps optimised WebP comfortably under 200 KB
WEBP_QUALITY = 80
FORCE = "--force" in sys.argv

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

PILLAR_IMAGES = [
    {
        "id": "manah_ai_generative",
        "filename": "manah_ai_generative.webp",
        "prompt": (
            BRAND_STYLE +
            "A modern AI research and operations center — engineers at sleek workstations with "
            "large curved monitors displaying abstract neural-network graphs and language-model "
            "dashboards, a glass-walled GPU compute room glowing softly in the background. "
            "Sovereign artificial-intelligence engineering environment. Focused, intelligent, "
            "high-tech atmosphere. Cool blue screen glow balanced with warm gold ambient light, "
            "deep navy interior."
        ),
    },
    {
        "id": "manah_ai_datacenter",
        "filename": "manah_ai_datacenter.webp",
        "prompt": (
            BRAND_STYLE +
            "A modern hyperscale data center hall — a long symmetrical corridor of liquid-cooled "
            "server racks with subtle blue and warm gold indicator lights, polished floor "
            "reflecting the rows, neatly managed cabling running overhead. High-density GPU "
            "compute infrastructure. Vast scale, precision, and security. Dramatic perspective "
            "down the aisle, deep navy shadows, warm gold accent lighting."
        ),
    },
]


def generate(img):
    out_path = os.path.join(DIVISIONS_DIR, img["filename"])
    if os.path.exists(out_path) and not FORCE:
        print(f"  SKIP (exists, use --force to regenerate): {img['filename']}")
        return "skipped"

    tmp_jpg = os.path.join(DIVISIONS_DIR, img["id"] + "._tmp.jpg")
    print(f"  Generating: {img['id']} via {IMAGE_MODEL}")
    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": img["prompt"],
                "aspect_ratio": "4:3",
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
    print("  Manah AI Pillar Images — Replicate / FLUX 2 Pro")
    print(f"  Output: {DIVISIONS_DIR}")
    print("=" * 60)
    results = [generate(img) for img in PILLAR_IMAGES]
    print("=" * 60)
    print(f"  Done: {results.count('success')} generated, "
          f"{results.count('skipped')} skipped, {results.count('error')} errors")
    print("=" * 60)
    if results.count("error"):
        sys.exit(1)


if __name__ == "__main__":
    main()

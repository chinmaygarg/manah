#!/usr/bin/env python3
"""
Manah Group — Sustainability Page Hero Image Generator
Generates a dramatic, cinematic sustainability hero using FLUX 2 Pro.
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
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'replicate', 'images', 'sustainability')
WEBSITE_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/sustainability"

PROMPT = (
    "Ultra-premium cinematic aerial photography. A breathtaking drone shot at golden hour showing "
    "a massive solar farm with thousands of gleaming photovoltaic panels stretching across a lush "
    "green Indian landscape, seamlessly blending into rolling hills dotted with modern white wind "
    "turbines spinning against a dramatic sky. In the mid-ground, high-voltage transmission towers "
    "carry power lines connecting the renewable energy to the grid. A river winds through the valley "
    "reflecting the golden sunset light. The composition conveys the harmony of clean energy "
    "infrastructure and nature coexisting. Rich greens, warm golden sunlight, deep shadows. "
    "Dramatic volumetric clouds with sun rays breaking through. Shot on Phase One IQ4 150MP. "
    "No text, no logos, no watermarks. Extremely detailed, sharp, professional grade."
)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    out_path = os.path.join(OUTPUT_DIR, "sustainability_hero_v2.jpg")

    print("=" * 60)
    print("  MANAH GROUP — Sustainability Hero Image Generator")
    print(f"  Model: {IMAGE_MODEL}")
    print(f"  Est. cost: ~$0.03")
    print("=" * 60)

    print("\n  Generating sustainability hero image...")

    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": PROMPT,
                "aspect_ratio": "16:9",
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
            print(f"  Saved: {out_path} ({size_kb:.0f} KB)")
        else:
            print("  ERROR: No output returned")
            sys.exit(1)

    except Exception as e:
        print(f"  ERROR: {e}")
        sys.exit(1)

    # Copy to website directory
    dest = os.path.join(WEBSITE_DIR, "sustainability_hero.png")
    subprocess.run(["cp", out_path, dest], capture_output=True)
    print(f"  Replaced: {dest}")

    print("\n" + "=" * 60)
    print("  COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    main()

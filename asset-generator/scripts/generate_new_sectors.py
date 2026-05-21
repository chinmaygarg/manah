#!/usr/bin/env python3
"""
Manah Group — New Sector Image Generator (Replicate / FLUX 2 Pro)
Generates the Energy Storage and Industrial Automation sector hero images
created when the old "bess-scada" sector was split into two.

Outputs straight to website/public/images/sectors/ (format derived from each
entry's filename extension), then runs an optimize pass (cap long edge,
recompress) so the source files stay web-weight. Existing files are skipped.
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
MAX_EDGE = 2560  # optimize: cap long edge

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

SECTOR_IMAGES = [
    {
        "id": "energy_storage",
        "filename": "energy_storage.webp",
        "prompt": (
            BRAND_STYLE +
            "Utility-scale battery energy storage system at a renewable grid substation — "
            "long rows of containerised lithium-ion battery units in a fenced compound, "
            "connected to high-voltage switchgear and transformers. Solar panels and wind "
            "turbines on the horizon. Dusk lighting, deep navy sky, warm gold accent light "
            "on the equipment. Engineering precision and clean-energy reliability."
        ),
    },
    {
        "id": "industrial_automation",
        "filename": "industrial_automation.webp",
        "prompt": (
            BRAND_STYLE +
            "Modern industrial SCADA control room — operators monitoring a wall of large "
            "dashboards showing real-time grid and process telemetry, plant schematics, and "
            "data trends. Racks of control servers and RTU cabinets, fibre cabling, soft "
            "screen glow. Deep navy ambient light with warm gold accent lighting. Precision, "
            "real-time supervision, and operational reliability."
        ),
    },
]


def generate(img):
    out_path = os.path.join(SECTORS_DIR, img["filename"])
    if os.path.exists(out_path):
        print(f"  SKIP (exists): {img['filename']}")
        return "skipped"

    print(f"  Generating: {img['id']} via {IMAGE_MODEL}")
    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": img["prompt"],
                "aspect_ratio": "16:9",
                "output_format": img["filename"].rsplit(".", 1)[-1].lower(),
                "output_quality": 95,
                "safety_tolerance": 2,
                "steps": 30,
            },
        )
        if not output:
            print(f"  No output for {img['id']}")
            return "error"

        if hasattr(output, "read"):
            with open(out_path, "wb") as f:
                f.write(output.read())
        elif isinstance(output, list) and output:
            urllib.request.urlretrieve(str(output[0]), out_path)
        else:
            urllib.request.urlretrieve(str(output), out_path)

        print(f"  Saved: {out_path} ({os.path.getsize(out_path) / 1024:.0f} KB)")
        optimize(out_path)
        return "success"
    except Exception as e:
        print(f"  Error: {str(e)[:200]}")
        return "error"


def optimize(path):
    """Cap the long edge and recompress so the source file stays lean."""
    try:
        subprocess.run(
            ["sips", "-Z", str(MAX_EDGE), "-s", "formatOptions", "85", path],
            capture_output=True, check=True,
        )
        print(f"  Optimized: {os.path.getsize(path) / 1024:.0f} KB")
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"  Optimize skipped ({str(e)[:80]})")


def main():
    print("=" * 60)
    print("  New Sector Images — Replicate / FLUX 2 Pro")
    print(f"  Output: {SECTORS_DIR}")
    print("=" * 60)
    results = [generate(img) for img in SECTOR_IMAGES]
    print("=" * 60)
    print(f"  Done: {results.count('success')} generated, "
          f"{results.count('skipped')} skipped, {results.count('error')} errors")
    print("=" * 60)


if __name__ == "__main__":
    main()

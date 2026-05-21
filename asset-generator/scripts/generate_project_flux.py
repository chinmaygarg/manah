#!/usr/bin/env python3
"""
Manah Group — Project Image Generator (Replicate / FLUX 2 Pro)

Generates unique, photorealistic images for the /projects page so that no two
projects share an image and none fall back to a generic sector photo.

Each image is generated as a high-quality JPG via Replicate, then converted to
an optimized WebP placed directly in the website's projects image directory.

Model is configurable via .env (REPLICATE_IMAGE_MODEL).

Usage:
    python scripts/generate_project_flux.py            # generate all (skip existing)
    python scripts/generate_project_flux.py --force    # regenerate even if exists
    python scripts/generate_project_flux.py --id project1_residential_g4
    python scripts/generate_project_flux.py --list     # list asset ids
"""

import os
import sys
import time
import shutil
import subprocess

try:
    import replicate
except ImportError:
    print("ERROR: replicate package not installed. Run: pip3 install replicate")
    sys.exit(1)

from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
if not REPLICATE_TOKEN:
    print("ERROR: REPLICATE_API_TOKEN not set in .env")
    sys.exit(1)
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

IMAGE_MODEL = os.getenv("REPLICATE_IMAGE_MODEL", "black-forest-labs/flux-2-pro")

JPG_OUTPUT_DIR = os.path.join(
    os.path.dirname(__file__), "..", "output", "replicate", "images", "projects"
)
WEBP_OUTPUT_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/projects"

# ─── Brand Style Directive ───

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold "
    "(#C8A96E) color accents in the lighting and palette. Cinematic lighting with dramatic "
    "shadows, golden-hour warmth. Shot on a medium-format camera, shallow depth of field. "
    "Professional editorial quality, photorealistic, sharp detail. Indian setting. "
    "No text, no logos, no watermarks, no signage. Clean composition with a clear focal point. "
)

# ─── Per-project prompts ───
# Each entry maps to a project on /projects. `filename` is the final WebP name;
# `project_id` documents the project number it is assigned to in ProjectsContent.tsx.

PROJECT_IMAGES = [
    {
        "id": "project1_residential_g4",
        "project_id": 1,
        "filename": "residential-g4-housing.webp",
        "prompt": (
            BRAND_STYLE
            + "Four matching modern G+4 residential apartment buildings in a planned housing "
            "development, photographed together from a slightly elevated angle at golden hour. "
            "Crisp white-and-grey facades with continuous balcony lines, large glazing, "
            "landscaped courtyard and paved internal roads between the blocks. A tower crane "
            "still standing beside the nearest block hints at active construction. Warm sunlight "
            "rakes across the facades casting long shadows. Aspirational, orderly, premium."
        ),
    },
    {
        "id": "project2_smart_meters",
        "project_id": 2,
        "filename": "dtc-smart-meters.webp",
        "prompt": (
            BRAND_STYLE
            + "Close, detailed photograph of a field technician in a hi-vis safety vest and "
            "hard hat installing a modern digital smart electricity meter on a distribution "
            "transformer pillar. The meter has a clean LCD display and tidy cable terminations. "
            "Background shows an Indian distribution transformer cubicle and overhead power "
            "lines softly out of focus. Bright daylight, shallow depth of field on the meter, "
            "modern utility infrastructure, precise and technical."
        ),
    },
    {
        "id": "project5_conveyor_system",
        "project_id": 5,
        "filename": "industrial-conveyor-system.webp",
        "prompt": (
            BRAND_STYLE
            + "A long industrial belt conveyor system carrying bulk material, photographed in "
            "dramatic perspective receding into the distance with steel support trusses and "
            "transfer towers. Galvanised steel structure, idler rollers and the moving belt "
            "catching warm rim light. An industrial plant backdrop with silos and stacks under "
            "a moody sky. Heavy engineering scale, strong leading lines, cinematic."
        ),
    },
    {
        "id": "project6_commercial_complex",
        "project_id": 6,
        "filename": "commercial-complex.webp",
        "prompt": (
            BRAND_STYLE
            + "A striking modern commercial complex: a multi-storey glass-and-stone office and "
            "retail building with a sculptural facade, deep reveals and a generous landscaped "
            "forecourt. Shot from street level looking up at golden hour, reflections of a warm "
            "sky in the curtain-wall glazing, gold accent lighting in the lobby. Polished, "
            "high-end commercial real estate, confident and contemporary."
        ),
    },
    {
        "id": "project7_fiber_network",
        "project_id": 7,
        "filename": "middle-mile-fiber-network.webp",
        "prompt": (
            BRAND_STYLE
            + "Macro photograph of a technician's gloved hands splicing brilliant optical "
            "fibre strands inside a fibre distribution enclosure, fine fibres glowing with "
            "points of light. Background shows a fibre-optic cable route and a roadside duct "
            "trench softly out of focus. Cool precise lighting on the fibres with warm ambient "
            "tones, high-tech telecom backbone, intricate and futuristic."
        ),
    },
    {
        "id": "project8_residential_g17",
        "project_id": 8,
        "filename": "residential-g17-tower.webp",
        "prompt": (
            BRAND_STYLE
            + "A single tall modern G+17 residential apartment tower — eighteen storeys — "
            "rising against a deep navy dusk sky, photographed from street level in a slight "
            "low-angle three-quarter view. Crisp contemporary facade with continuous "
            "cantilevered balcony bands, full-height glazing and a slim vertical service core. "
            "Warm gold lobby and balcony lighting glowing as evening falls, landscaped entrance "
            "plaza and driveway below. Slender elegant proportions, premium high-rise living, "
            "aspirational and distinctly residential — not an office building."
        ),
    },
    {
        "id": "project9_residential_g2",
        "project_id": 9,
        "filename": "residential-g2-building.webp",
        "prompt": (
            BRAND_STYLE
            + "A single elegant completed G+2 residential building — three storeys — with a "
            "contemporary facade of clean rendered surfaces, a stone-clad ground floor, "
            "cantilevered balconies and large windows. A neat garden and driveway in front, "
            "photographed at golden hour in three-quarter view. Intimate residential scale, "
            "warm and inviting, distinct from a tall apartment tower."
        ),
    },
    {
        "id": "project10_5g_towers",
        "project_id": 10,
        "filename": "telecom-5g-towers.webp",
        "prompt": (
            BRAND_STYLE
            + "A tall modern galvanised lattice telecommunications tower fitted with plain "
            "white rectangular panel antennas and cylindrical remote radio units mounted on "
            "triangular head-frames, photographed from a low dramatic angle against a deep dusk "
            "sky streaked with gold. A second telecom tower stands smaller in the distance, "
            "suggesting a network rollout across a region. Crisp steel lattice detail, a single "
            "red aviation warning light at the top, clean rural Indian horizon. The antennas "
            "and equipment are completely blank with no printed text, no numbers and no "
            "markings of any kind. Powerful vertical composition, connectivity and reach."
        ),
    },
    {
        "id": "project11_railway_station",
        "project_id": 11,
        "filename": "railway-station.webp",
        "prompt": (
            BRAND_STYLE
            + "A newly constructed modern Indian railway station building: a wide concourse "
            "with a sweeping curved roof canopy, clean stone-and-glass facade, a covered "
            "platform with railway tracks alongside. Photographed at golden hour from the "
            "forecourt, warm light filling the concourse, organised and spacious. Civic-scale "
            "transit architecture, impressive and welcoming."
        ),
    },
]


def list_assets():
    """Print all asset ids and their target files."""
    print(f"{'ID':<28} {'PROJECT':<8} FILE")
    print("-" * 70)
    for img in PROJECT_IMAGES:
        print(f"{img['id']:<28} {img['project_id']:<8} {img['filename']}")


def to_webp(jpg_path, webp_path, quality=86):
    """Convert a JPG to an optimized WebP using cwebp."""
    try:
        subprocess.run(
            ["cwebp", "-q", str(quality), jpg_path, "-o", webp_path],
            capture_output=True,
            check=True,
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"    WebP conversion failed: {str(e)[:150]}")
        return False


def generate_image(img, force=False):
    """Generate one project image and write the optimized WebP to the website."""
    webp_path = os.path.join(WEBP_OUTPUT_DIR, img["filename"])

    if os.path.exists(webp_path) and not force:
        print(f"  SKIP (exists): {img['filename']}")
        return "skipped"

    jpg_path = os.path.join(JPG_OUTPUT_DIR, img["filename"].replace(".webp", ".jpg"))
    os.makedirs(JPG_OUTPUT_DIR, exist_ok=True)
    os.makedirs(WEBP_OUTPUT_DIR, exist_ok=True)

    print(f"  Generating: {img['id']} (project {img['project_id']})")

    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": img["prompt"],
                "aspect_ratio": "16:9",
                "output_format": "jpg",
                "output_quality": 95,
                "safety_tolerance": 2,
            },
        )

        if not output:
            print(f"    No output returned for: {img['id']}")
            return "error"

        # Replicate may return a FileOutput, a URL string, or a list of URLs.
        if hasattr(output, "read"):
            with open(jpg_path, "wb") as f:
                f.write(output.read())
        else:
            import urllib.request

            url = str(output[0] if isinstance(output, list) else output)
            urllib.request.urlretrieve(url, jpg_path)

        if not to_webp(jpg_path, webp_path):
            return "error"

        size_kb = os.path.getsize(webp_path) / 1024
        print(f"    Saved: {img['filename']} ({size_kb:.0f} KB)")
        return "success"

    except Exception as e:
        print(f"    Error: {str(e)[:200]}")
        return "error"


def main():
    args = sys.argv[1:]

    if "--list" in args:
        list_assets()
        return

    force = "--force" in args
    selected = PROJECT_IMAGES
    if "--id" in args:
        idx = args.index("--id")
        if idx + 1 >= len(args):
            print("ERROR: --id requires an asset id")
            sys.exit(1)
        wanted = args[idx + 1]
        selected = [i for i in PROJECT_IMAGES if i["id"] == wanted]
        if not selected:
            print(f"ERROR: unknown id '{wanted}'. Use --list to see ids.")
            sys.exit(1)

    if not shutil.which("cwebp"):
        print("ERROR: cwebp not found. Install with: brew install webp")
        sys.exit(1)

    print("=" * 60)
    print("  Manah Group — Project Image Generator (Replicate)")
    print(f"  Model:  {IMAGE_MODEL}")
    print(f"  Images: {len(selected)}")
    print(f"  Output: {WEBP_OUTPUT_DIR}")
    print("=" * 60)

    results = []
    for i, img in enumerate(selected):
        print(f"\n[{i + 1}/{len(selected)}] {img['id']}")
        status = generate_image(img, force=force)
        results.append(status)
        if status == "success":
            time.sleep(2)

    success = results.count("success")
    errors = results.count("error")
    skipped = results.count("skipped")
    print(f"\n{'=' * 60}")
    print(f"  Done: {success} generated, {skipped} skipped, {errors} errors")
    print("=" * 60)

    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()

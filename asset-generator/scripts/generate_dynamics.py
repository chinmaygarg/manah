#!/usr/bin/env python3
"""
Manah Group — Dynamics Division Image Generator (Replicate / FLUX-2-Pro)

Generates the exclusive imagery for the redesigned /divisions/dynamics page:
the EPC delivery-lifecycle scenes, a richer overview photo, and the EMS
product line-up.

Each asset is generated as a high-quality JPG via Replicate, converted to an
optimized WebP with cwebp, and written straight into the website's image
directory. Model is configurable via .env (REPLICATE_IMAGE_MODEL).

Usage:
    python3 scripts/generate_dynamics.py              # generate all (skip existing)
    python3 scripts/generate_dynamics.py --force      # regenerate even if exists
    python3 scripts/generate_dynamics.py --id ems_ev_charger
    python3 scripts/generate_dynamics.py --list       # list asset ids
"""

import os
import sys
import time
import subprocess
import urllib.request

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
    os.path.dirname(__file__), "..", "output", "replicate", "images", "divisions"
)
WEBP_OUTPUT_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/divisions"

# ─── Brand style directives ───

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold "
    "(#C8A96E) color accents in the lighting and palette. Cinematic lighting with dramatic "
    "shadows, golden-hour warmth. Shot on a medium-format camera, shallow depth of field. "
    "Professional editorial quality, photorealistic, sharp detail. Indian setting. "
    "No text, no logos, no watermarks, no signage. Clean composition with a clear focal point. "
)

PRODUCT_STYLE = (
    "Ultra-premium product photography. A single modern electronic device centred on a "
    "seamless deep navy blue (#0A1628) studio background. Soft key light with a warm gold "
    "(#C8A96E) rim light, gentle reflection beneath the device, dramatic but clean shadows. "
    "Shot on a macro lens, crisp focus, photorealistic, editorial catalogue quality. "
    "Every surface of the device is smooth, plain and completely unmarked — absolutely no "
    "text, no numbers, no letters, no writing, no labels, no engraved or embossed markings, "
    "no logos, no brand names, no icons and no watermarks anywhere on the device or image. "
)

# ─── Asset prompts ───
# `filename` is the final WebP written into WEBP_OUTPUT_DIR.

DYNAMICS_IMAGES = [
    # ── EPC delivery lifecycle ──
    {
        "id": "lifecycle_engineer",
        "filename": "dynamics_lifecycle_engineer.webp",
        "aspect_ratio": "4:3",
        "prompt": (
            BRAND_STYLE
            + "A modern engineering design studio: two engineers studying a large 3D BIM "
            "model of a power substation on a wide curved monitor, rolled technical "
            "drawings and a hard hat on the desk beside them. Cool screen glow balanced "
            "by warm gold ambient light, deep navy interior. Focused, precise, the "
            "design-and-engineering phase of a turnkey EPC project."
        ),
    },
    {
        "id": "lifecycle_procure",
        "filename": "dynamics_lifecycle_procure.webp",
        "aspect_ratio": "4:3",
        "prompt": (
            BRAND_STYLE
            + "A large industrial procurement and logistics yard at golden hour: neatly "
            "stacked steel transmission-tower sections, cable drums, transformers and "
            "crated equipment ready for dispatch, a forklift and a flatbed truck in the "
            "mid-ground. Long warm shadows, organised and methodical. The procurement "
            "and supply-chain phase of a major infrastructure project."
        ),
    },
    {
        "id": "lifecycle_build",
        "filename": "dynamics_lifecycle_build.webp",
        "aspect_ratio": "4:3",
        "prompt": (
            BRAND_STYLE
            + "A large-scale active construction site at golden hour: tower cranes "
            "lifting steel structure, a concrete frame rising, workers in hi-vis vests "
            "and hard hats coordinating on the ground. Dust catching warm sunlight, "
            "dramatic long shadows, scale and energy of heavy construction. The "
            "build-and-construct phase of an EPC project."
        ),
    },
    {
        "id": "lifecycle_commission",
        "filename": "dynamics_lifecycle_commission.webp",
        "aspect_ratio": "4:3",
        "prompt": (
            BRAND_STYLE
            + "Two engineers in hi-vis vests and hard hats commissioning a completed "
            "high-voltage substation — one holding a tablet, the other checking a row of "
            "gas-insulated switchgear and control panels with softly glowing indicator "
            "lights. Clean finished installation, dusk sky with warm gold accent light. "
            "The testing, commissioning and handover phase of an EPC project."
        ),
    },
    # ── Overview secondary image ──
    {
        "id": "overview_secondary",
        "filename": "dynamics_overview_secondary.webp",
        "aspect_ratio": "4:3",
        "prompt": (
            BRAND_STYLE
            + "A confident project director and a site engineer in hi-vis vests and hard "
            "hats reviewing progress on a tablet, standing on an elevated walkway "
            "overlooking a sprawling infrastructure project — transmission towers and a "
            "substation visible behind them at golden hour. Warm directional light, "
            "purposeful and accomplished, single-point project accountability."
        ),
    },
    # ── EMS facility ──
    {
        "id": "ems_facility",
        "filename": "dynamics_ems_facility.webp",
        "aspect_ratio": "4:3",
        "prompt": (
            BRAND_STYLE
            + "Interior of a modern electronics manufacturing facility — a long "
            "surface-mount technology (SMT) production line with automated "
            "pick-and-place machines and conveyors assembling green printed circuit "
            "boards, viewed down the line in dramatic perspective. Technicians in "
            "ESD smocks and caps at workstations. Clean room lighting, deep navy "
            "tones with warm gold accent light glinting off the equipment. "
            "Precision, scale, and high-volume electronics production."
        ),
    },
    # ── EMS product line-up ──
    {
        "id": "ems_energy_meter",
        "filename": "ems_product_energy_meter.webp",
        "aspect_ratio": "1:1",
        "prompt": (
            PRODUCT_STYLE
            + "A modern smart electricity energy meter — a compact rectangular white-and-"
            "grey polycarbonate enclosure with a clean blank dark display panel that "
            "emits a faint blue glow, a small status indicator and tidy terminal cover. "
            "Three-quarter angle, precise industrial-design detail."
        ),
    },
    {
        "id": "ems_water_meter",
        "filename": "ems_product_water_meter.webp",
        "aspect_ratio": "1:1",
        "prompt": (
            PRODUCT_STYLE
            + "A modern smart water meter — a cylindrical brass-and-composite flow body "
            "with inlet and outlet couplings and an integrated digital register module "
            "on top featuring a small blank display with a faint glow. The polished brass "
            "body is perfectly smooth with no engraved text, numbers or markings of any "
            "kind. Three-quarter angle, precise engineering detail, IoT utility metering "
            "device."
        ),
    },
    {
        "id": "ems_ev_charger",
        "filename": "ems_product_ev_charger.webp",
        "aspect_ratio": "1:1",
        "prompt": (
            PRODUCT_STYLE
            + "A modern wall-mounted electric-vehicle charger — a sleek vertical "
            "matte-white-and-dark-grey unit whose glossy front panel is a perfectly plain "
            "dark mirror surface with nothing printed, etched or displayed on it, lit by a "
            "faint gold glow, and a neatly coiled charging cable with a connector "
            "holstered on the side. Three-quarter angle, premium clean-mobility hardware."
        ),
    },
    {
        "id": "ems_room_charger",
        "filename": "ems_product_room_charger.webp",
        "aspect_ratio": "1:1",
        "prompt": (
            PRODUCT_STYLE
            + "A modern compact room charger / power adapter — a small refined "
            "matte-white cube-shaped fast-charging unit with softly rounded edges, "
            "folding pins and one or two USB-C ports, a tiny indicator light. "
            "Three-quarter angle, premium consumer-electronics product shot."
        ),
    },
    {
        "id": "ems_defence_rf",
        "filename": "ems_product_defence_rf.webp",
        "aspect_ratio": "1:1",
        "prompt": (
            PRODUCT_STYLE
            + "A rugged defence-grade RF system module — a machined dark-anodised "
            "aluminium chassis with heat-sink fins, sealed military-style circular "
            "connectors and threaded SMA RF ports, a short stub antenna. The chassis face "
            "around the connectors is bare machined metal with no printed labels, no port "
            "text and no markings. Hard-edged tactical industrial design, three-quarter "
            "angle, high-reliability electronics for defence communication systems."
        ),
    },
]


def list_assets():
    print(f"{'ID':<24} {'ASPECT':<8} FILE")
    print("-" * 64)
    for img in DYNAMICS_IMAGES:
        print(f"{img['id']:<24} {img['aspect_ratio']:<8} {img['filename']}")


def to_webp(jpg_path, webp_path, quality=84):
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
    """Generate one image and write the optimized WebP into the website."""
    webp_path = os.path.join(WEBP_OUTPUT_DIR, img["filename"])

    if os.path.exists(webp_path) and not force:
        print(f"  SKIP (exists): {img['filename']}")
        return "skipped"

    jpg_path = os.path.join(JPG_OUTPUT_DIR, img["filename"].replace(".webp", ".jpg"))
    os.makedirs(JPG_OUTPUT_DIR, exist_ok=True)
    os.makedirs(WEBP_OUTPUT_DIR, exist_ok=True)

    print(f"  Generating: {img['id']} ({img['aspect_ratio']})")

    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": img["prompt"],
                "aspect_ratio": img["aspect_ratio"],
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
            url = str(output[0] if isinstance(output, list) else output)
            urllib.request.urlretrieve(url, jpg_path)

        if not to_webp(jpg_path, webp_path):
            return "error"

        size_kb = os.path.getsize(webp_path) / 1024
        flag = "  ⚠ over 200 KB" if size_kb > 200 else ""
        print(f"    Saved: {img['filename']} ({size_kb:.0f} KB){flag}")
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
    selected = DYNAMICS_IMAGES
    if "--id" in args:
        idx = args.index("--id")
        if idx + 1 >= len(args):
            print("ERROR: --id requires an asset id")
            sys.exit(1)
        wanted = args[idx + 1]
        selected = [i for i in DYNAMICS_IMAGES if i["id"] == wanted]
        if not selected:
            print(f"ERROR: unknown id '{wanted}'. Use --list to see ids.")
            sys.exit(1)

    import shutil

    if not shutil.which("cwebp"):
        print("ERROR: cwebp not found. Install with: brew install webp")
        sys.exit(1)

    print("=" * 60)
    print("  Manah Group — Dynamics Image Generator (Replicate)")
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

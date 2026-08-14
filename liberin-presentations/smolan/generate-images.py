#!/usr/bin/env python3
"""
Liberin — Enterprise AI & Digital Engineering Capabilities Deck
Replicate (FLUX-2-Pro) hero image generator.

Standalone script, self-contained output into liberin-smolan/images/.
Reads REPLICATE_API_TOKEN from ../asset-generator/.env (shared monorepo token).

Usage:
  python3 generate-images.py            # generate all missing images
  python3 generate-images.py --list     # list ids
  python3 generate-images.py --id cover_hero   # regenerate one
  python3 generate-images.py --force    # regenerate even if file exists
"""

import os
import sys
import urllib.request

try:
    import replicate
except ImportError:
    print("ERROR: replicate package not installed. Run: pip3 install replicate python-dotenv")
    sys.exit(1)

from dotenv import load_dotenv

HERE = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(HERE, "..", "asset-generator", ".env"))

REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
if not REPLICATE_TOKEN:
    print("ERROR: REPLICATE_API_TOKEN not set in asset-generator/.env")
    sys.exit(1)
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

IMAGE_MODEL = os.getenv("REPLICATE_IMAGE_MODEL", "black-forest-labs/flux-2-pro")
OUTPUT_DIR = os.path.join(HERE, "images")

# ─── Brand style directive — indigo/amber on charcoal, enterprise-AI tone ───
STYLE = (
    "Ultra-premium enterprise technology photography / 3D render hybrid style. "
    "Deep charcoal-indigo background (#0B0D14 / #12141F). Electric indigo-violet "
    "(#6D5EF5) light accents with warm amber (#F2A93B) rim highlights. Cinematic, "
    "moody, high-contrast lighting. Abstract, conceptual, architectural precision. "
    "No text, no logos, no watermarks, no legible UI text. Clean composition with "
    "a single clear focal point, generous negative space for text overlay. "
    "Editorial quality, ultra high resolution."
)

PROMPTS = [
    {
        "id": "cover_hero",
        "filename": "cover_hero.png",
        "prompt": STYLE + (
            "A vast glowing neural / agentic network of light — thousands of fine "
            "indigo threads converging into a bright core, flowing over a dark "
            "server-hall silhouette beneath. Sense of scale, intelligence, and motion. "
            "Wide cinematic composition."
        ),
    },
    {
        "id": "capabilities_bg",
        "filename": "capabilities_bg.png",
        "prompt": STYLE + (
            "Abstract architectural blueprint made of glowing indigo grid-lines and "
            "amber structural nodes, floating layers suggesting strategy-build-assure-run "
            "pipeline stages. Precision engineering aesthetic, technical drafting feel."
        ),
    },
    {
        "id": "enterprise_ai_bg",
        "filename": "enterprise_ai_bg.png",
        "prompt": STYLE + (
            "A single luminous crystalline brain-like core made of layered indigo glass, "
            "radiating structured light outward in organized rings — representing "
            "purpose-built, structured intelligence versus generic noise. Macro, sharp detail."
        ),
    },
    {
        "id": "septa_bg",
        "filename": "septa_bg.png",
        "prompt": STYLE + (
            "Abstract data-to-intelligence-to-action pipeline: streams of small glowing "
            "particles flowing from scattered chaos on the left into a bright organized "
            "indigo hub in the center, then out as ordered amber beams on the right. "
            "Horizontal flow composition."
        ),
    },
    {
        "id": "usecases_bg",
        "filename": "usecases_bg.png",
        "prompt": STYLE + (
            "Constellation of small glowing orb-shaped AI assistant nodes connected by thin "
            "indigo light threads, each orb a slightly different hue between indigo and "
            "amber, floating in dark space — representing role-based AI assistants across "
            "an enterprise."
        ),
    },
    {
        "id": "implementation_bg",
        "filename": "implementation_bg.png",
        "prompt": STYLE + (
            "Abstract ascending staircase built from glowing translucent indigo glass "
            "steps, each step edge-lit in amber, rising through dark space toward a bright "
            "horizon — representing a structured multi-step delivery journey."
        ),
    },
    {
        "id": "digital_engineering_bg",
        "filename": "digital_engineering_bg.png",
        "prompt": STYLE + (
            "Abstract interlocking mesh of cloud, mobile-device and circuit-board motifs "
            "rendered as glowing indigo wireframe geometry with amber connection points, "
            "suggesting modern cloud-native and connected-device engineering."
        ),
    },
    {
        "id": "assurance_bg",
        "filename": "assurance_bg.png",
        "prompt": STYLE + (
            "Precise glowing indigo grid of small square panels, several illuminated in "
            "amber like passed quality checks, arranged in a vast orderly array receding "
            "into darkness — representing systematic quality engineering at scale."
        ),
    },
    {
        "id": "engagement_bg",
        "filename": "engagement_bg.png",
        "prompt": STYLE + (
            "Abstract modular geometric blocks of glowing indigo glass, some interlocking "
            "and some floating apart, amber light seams between them — representing "
            "flexible, composable engagement and delivery models."
        ),
    },
    {
        "id": "representative_work_bg",
        "filename": "representative_work_bg.png",
        "prompt": STYLE + (
            "Abstract global network: a dark world-map silhouette with glowing indigo "
            "connection arcs linking distant amber-lit nodes across continents — "
            "representing a portfolio of global client engagements."
        ),
    },
    {
        "id": "bfsi_case_bg",
        "filename": "bfsi_case_bg.png",
        "prompt": STYLE + (
            "Abstract financial infrastructure visualization: rows of glowing indigo "
            "ATM-like monolith silhouettes in a vast dark hall, each with a small amber "
            "status light, connected by faint overhead data-light streams — banking scale "
            "and monitoring."
        ),
    },
    {
        "id": "product_case_bg",
        "filename": "product_case_bg.png",
        "prompt": STYLE + (
            "Abstract composite of connected-infrastructure motifs — a glowing indigo "
            "postal/logistics conveyor line merging into a smart-city street-light network "
            "of amber nodes — layered translucent geometry, engineering precision."
        ),
    },
    {
        "id": "ai_in_action_bg",
        "filename": "ai_in_action_bg.png",
        "prompt": STYLE + (
            "Abstract composite of a glowing indigo voice waveform, an envelope-shaped "
            "light trail, and a small bar-chart of amber light bars, all interwoven in "
            "dark space — representing multi-channel AI outcomes: voice, email, analytics."
        ),
    },
    {
        "id": "close_bg",
        "filename": "close_bg.png",
        "prompt": STYLE + (
            "A wide glowing horizon line where deep indigo darkness meets a bright amber "
            "dawn glow, a few fine light particles rising toward it — hopeful, "
            "forward-looking, minimal, spacious composition for closing CTA text."
        ),
    },
]


def generate_image(item, force=False):
    out_path = os.path.join(OUTPUT_DIR, item["filename"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    if os.path.exists(out_path) and not force:
        print(f"  SKIP (exists): {item['filename']}")
        return

    print(f"  Generating: {item['id']} -> {item['filename']}")
    try:
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": item["prompt"],
                "aspect_ratio": "16:9",
                "output_format": "png",
                "safety_tolerance": 2,
                "steps": 30,
            },
        )
        if hasattr(output, "read"):
            with open(out_path, "wb") as f:
                f.write(output.read())
        elif isinstance(output, str):
            urllib.request.urlretrieve(output, out_path)
        elif isinstance(output, list) and len(output) > 0:
            urllib.request.urlretrieve(str(output[0]), out_path)
        else:
            urllib.request.urlretrieve(str(output), out_path)

        size_kb = os.path.getsize(out_path) / 1024
        print(f"    Saved ({size_kb:.0f} KB)")
    except Exception as e:
        print(f"    ERROR: {str(e)[:300]}")


def main():
    args = sys.argv[1:]
    if "--list" in args:
        for item in PROMPTS:
            print(item["id"])
        return

    force = "--force" in args
    only_id = None
    if "--id" in args:
        only_id = args[args.index("--id") + 1]

    targets = [p for p in PROMPTS if (only_id is None or p["id"] == only_id)]
    print(f"Model: {IMAGE_MODEL} | Images: {len(targets)} | Force: {force}")
    for item in targets:
        generate_image(item, force=force)
    print("Done.")


if __name__ == "__main__":
    main()

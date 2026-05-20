#!/usr/bin/env python3
"""
Generate missing assets for the Investments division page.
- Hero image (16:9) — FLUX 2 Pro
- Detail image (4:3) — FLUX 2 Pro
- Reel video (8s) — LTX-2 Fast
Then compress/optimize for web delivery.
"""

import os
import sys
import json
import subprocess
import urllib.request
from pathlib import Path
from datetime import datetime

try:
    import replicate
except ImportError:
    print("ERROR: replicate not installed. Run: pip3 install replicate")
    sys.exit(1)

from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

REPLICATE_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
if not REPLICATE_TOKEN:
    print("ERROR: REPLICATE_API_TOKEN not set in .env")
    sys.exit(1)

os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

IMAGE_MODEL = os.getenv("REPLICATE_IMAGE_MODEL", "black-forest-labs/flux-2-pro")
VIDEO_MODEL = os.getenv("REPLICATE_HERO_VIDEO_MODEL", "lightricks/ltx-2-fast")

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "output", "replicate")
WEBSITE_PUBLIC = "/Users/chinmay/Desktop/Manah/website/public"

# ─── Brand Style ───

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

# ─── Investments Division Prompts ───

IMAGES = [
    {
        "id": "investments_hero",
        "filename": "divisions/manah_investments_hero.png",
        "prompt": (
            BRAND_STYLE
            + "Modern corporate investment boardroom scene at golden hour. Senior Indian business "
            "executives in premium suits reviewing a large infrastructure project model on a sleek "
            "conference table. Floor-to-ceiling glass windows overlooking a panoramic city skyline "
            "with construction cranes and infrastructure projects visible in the distance. Warm amber "
            "and gold accent lighting reflecting off polished surfaces. Documents, tablets, and "
            "financial charts spread across the table. Atmosphere of strategic decision-making, power, "
            "and high-stakes capital deployment. Private equity and venture capital aesthetic. "
            "Premium, confident, purposeful."
        ),
        "aspect_ratio": "16:9",
        "purpose": "Manah Investments division hero background",
    },
    {
        "id": "investments_detail",
        "filename": "divisions/manah_investments_detail.png",
        "prompt": (
            BRAND_STYLE
            + "Indian investment professionals at a construction site performing due diligence. "
            "Two senior executives in amber/gold hard hats and tailored business attire reviewing "
            "architectural blueprints and financial documents on a portable table. A large-scale "
            "infrastructure project under construction visible in the background — steel framework, "
            "cranes, and partially completed building. Golden hour lighting creating warm amber tones. "
            "Conveying hands-on operator-investor approach, where capital meets execution. "
            "Professional, grounded, strategic. Domain expertise meeting financial acumen."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Manah Investments overview/detail section",
    },
]

VIDEO = {
    "id": "investments_reel",
    "filename": "divisions/investments_reel.mp4",
    "prompt": (
        "Cinematic smooth dolly shot through a modern glass-walled corporate office with warm amber "
        "lighting. Camera glides past a conference room where executives review holographic city "
        "models and infrastructure plans, then transitions through floor-to-ceiling windows "
        "revealing a sweeping view of a city skyline at golden hour with construction cranes, "
        "bridges, and infrastructure projects illuminated by warm sunlight. Reflections on polished "
        "surfaces. Deep navy and warm gold color grading. Conveys strategic vision, capital "
        "deployment, and infrastructure investment at scale. Premium, cinematic, atmospheric. "
        "4K quality. Smooth, loopable. 8 seconds."
    ),
    "duration": 8,
    "purpose": "Manah Investments division page hero background video",
}


def download_output(output, dest_path):
    """Download Replicate output to local file."""
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    if hasattr(output, "read"):
        with open(dest_path, "wb") as f:
            f.write(output.read())
    elif isinstance(output, str):
        urllib.request.urlretrieve(output, dest_path)
    elif isinstance(output, list) and len(output) > 0:
        urllib.request.urlretrieve(str(output[0]), dest_path)
    else:
        urllib.request.urlretrieve(str(output), dest_path)


def generate_image(prompt_data):
    """Generate a single image with FLUX 2 Pro."""
    out_path = os.path.join(OUTPUT_DIR, "images", prompt_data["filename"])

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {prompt_data['filename']}")
        return out_path

    print(f"  Generating: {prompt_data['id']}")
    print(f"    Purpose: {prompt_data['purpose']}")

    output = replicate.run(
        IMAGE_MODEL,
        input={
            "prompt": prompt_data["prompt"],
            "aspect_ratio": prompt_data.get("aspect_ratio", "16:9"),
            "output_format": "png",
            "output_quality": 95,
            "safety_tolerance": 2,
            "steps": 30,
        },
    )

    if not output:
        raise RuntimeError(f"No output for {prompt_data['id']}")

    download_output(output, out_path)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  Saved: {out_path} ({size_kb:.0f} KB)")
    return out_path


def build_video_input(model, prompt, duration):
    """Build the model-specific Replicate input dict for a video model."""
    name = model.lower()
    if "ltx" in name:
        # LTX-2: duration enum 6/8/10/...; resolution 1080p/2k/4k; no aspect_ratio
        allowed = (6, 8, 10, 12, 14, 16, 18, 20)
        return {
            "prompt": prompt,
            "duration": min(allowed, key=lambda d: abs(d - duration)),
            "resolution": "1080p",
            "generate_audio": False,
        }
    # veo / seedance and similar accept aspect_ratio + resolution
    return {
        "prompt": prompt,
        "duration": duration,
        "aspect_ratio": "16:9",
        "resolution": "720p",
    }


def generate_video(prompt_data):
    """Generate a video on Replicate using the configured video model."""
    out_path = os.path.join(OUTPUT_DIR, "videos", prompt_data["filename"])

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {prompt_data['filename']}")
        return out_path

    print(f"  Generating: {prompt_data['id']}")
    print(f"    Purpose: {prompt_data['purpose']}")
    print(f"    Duration: {prompt_data.get('duration', 8)}s")

    output = replicate.run(
        VIDEO_MODEL,
        input=build_video_input(
            VIDEO_MODEL, prompt_data["prompt"], prompt_data.get("duration", 8)
        ),
    )

    if not output:
        raise RuntimeError(f"No output for {prompt_data['id']}")

    download_output(output, out_path)
    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"  Saved: {out_path} ({size_mb:.1f} MB)")
    return out_path


def optimize_image_to_png(src_path, dest_path, max_width=1920):
    """Resize and copy image to website public dir."""
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    try:
        subprocess.run(
            ["sips", "--resampleWidth", str(max_width), src_path, "--out", dest_path],
            capture_output=True,
            check=True,
        )
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"    -> {dest_path} ({size_kb:.0f} KB)")
    except (subprocess.CalledProcessError, FileNotFoundError):
        subprocess.run(["cp", src_path, dest_path], capture_output=True)
        print(f"    -> {dest_path} (copied)")


def compress_video(src_path, base_name):
    """Compress video to 720p and 480p for web."""
    dest_dir = os.path.join(WEBSITE_PUBLIC, "videos", "divisions")
    os.makedirs(dest_dir, exist_ok=True)

    for res, width, height, crf in [("720p", 1280, 720, 28), ("480p", 854, 480, 30)]:
        dest = os.path.join(dest_dir, f"{base_name}-{res}.mp4")
        try:
            subprocess.run(
                [
                    "ffmpeg", "-y", "-i", src_path,
                    "-vf", f"scale={width}:{height}:force_original_aspect_ratio=decrease",
                    "-c:v", "libx264", "-preset", "slow", "-crf", str(crf),
                    "-an", "-movflags", "+faststart", "-pix_fmt", "yuv420p",
                    dest,
                ],
                capture_output=True,
                check=True,
            )
            size_mb = os.path.getsize(dest) / (1024 * 1024)
            print(f"    -> {dest} ({size_mb:.1f} MB)")
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"    ffmpeg error for {res}: {str(e)[:100]}")
            subprocess.run(["cp", src_path, dest], capture_output=True)


def main():
    print("=" * 60)
    print("  MANAH INVESTMENTS — Asset Generator")
    print(f"  Image Model: {IMAGE_MODEL}")
    print(f"  Video Model: {VIDEO_MODEL}")
    print("=" * 60)

    # ─── Phase 1: Images ───
    print(f"\n{'─' * 60}")
    print("  PHASE 1: Generating Images (FLUX 2 Pro)")
    print(f"{'─' * 60}\n")

    image_paths = []
    for img in IMAGES:
        try:
            path = generate_image(img)
            image_paths.append(path)
        except Exception as e:
            print(f"  ERROR: {e}")

    # ─── Phase 2: Video ───
    print(f"\n{'─' * 60}")
    print("  PHASE 2: Generating Video (Veo 3 Fast)")
    print(f"{'─' * 60}\n")

    video_path = None
    try:
        video_path = generate_video(VIDEO)
    except Exception as e:
        print(f"  ERROR: {e}")

    # ─── Phase 3: Optimize ───
    print(f"\n{'─' * 60}")
    print("  PHASE 3: Optimizing for Web")
    print(f"{'─' * 60}\n")

    img_dir = os.path.join(WEBSITE_PUBLIC, "images", "divisions")

    for img, path in zip(IMAGES, image_paths):
        basename = os.path.basename(img["filename"])
        dest = os.path.join(img_dir, basename)
        optimize_image_to_png(path, dest)

    if video_path:
        compress_video(video_path, "investments_reel")

    print("\n" + "=" * 60)
    print("  COMPLETE — Investments division assets generated")
    print("=" * 60)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Manah Group — Division Hero Videos (Aerospace + Atomic)
Generates exclusive looping hero reels for the division pages that still use a
static image. Uses Replicate (Google Veo 3.1 Fast) — Google's own API quota is
exhausted; Replicate hosts the model under Replicate billing.

Output: ffmpeg-optimised 720p + 480p H.264 reels written to
website/public/videos/divisions/{id}_reel-{720,480}p.mp4 — matching the
existing dynamics_reel / green_energy_reel / investments_reel / ai_reel naming.
Idempotent: skips a division whose 720p reel already exists.
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

VIDEO_MODEL = os.getenv("AI_VIDEO_MODEL", "google/veo-3.1-fast")
FALLBACK_MODEL = "lightricks/ltx-2-fast"
RAW_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'replicate', 'videos')
VIDEOS_DIR = "/Users/chinmay/Desktop/Manah/website/public/videos/divisions"

DIVISIONS = [
    {
        "id": "aerospace",
        "prompt": (
            "Cinematic 8-second sequence, deep navy blue (#0A1628) and warm gold (#C8A96E) "
            "color grade, professional editorial quality. A slow cinematic dolly glides through "
            "a modern aircraft MRO hangar — a sleek business jet under maintenance, engine "
            "cowlings open, technicians in coveralls working with precision tools, polished "
            "hangar floor with soft reflections, warm gold overhead lighting against cool blue "
            "shadows, atmospheric haze. Premium aviation engineering atmosphere, safe and "
            "precise. No text, no logos, no watermarks. Smooth, loopable camera motion. "
            "4K cinematic quality."
        ),
    },
    {
        "id": "atomic",
        "prompt": (
            "Cinematic 8-second sequence, deep navy blue (#0A1628) and warm gold (#C8A96E) "
            "color grade with subtle violet accents, professional editorial quality. A slow "
            "reveal of a next-generation Small Modular Reactor facility — sleek cylindrical "
            "reactor modules, a high-tech nuclear control room with glowing monitoring "
            "dashboards, clean engineered surfaces, atmospheric haze, cool blue and warm gold "
            "lighting. Safe, advanced, clean-energy atmosphere. No text, no logos, no "
            "watermarks. Smooth, loopable camera motion. 4K cinematic quality."
        ),
    },
]


def build_input(model, prompt):
    name = model.lower()
    if "veo" in name:
        return {"prompt": prompt, "aspect_ratio": "16:9", "resolution": "1080p"}
    if "ltx" in name:
        return {"prompt": prompt, "duration": 8, "resolution": "1080p", "generate_audio": False}
    return {"prompt": prompt, "duration": 8, "aspect_ratio": "16:9", "resolution": "720p"}


def _save(output, raw):
    if hasattr(output, "read"):
        with open(raw, "wb") as f:
            f.write(output.read())
    elif isinstance(output, list) and output:
        urllib.request.urlretrieve(str(output[0]), raw)
    else:
        urllib.request.urlretrieve(str(output), raw)


def generate_raw(div):
    os.makedirs(RAW_DIR, exist_ok=True)
    raw = os.path.join(RAW_DIR, f"{div['id']}_reel_raw.mp4")
    if os.path.exists(raw):
        print(f"  Reusing existing raw: {raw}")
        return raw
    for model in (VIDEO_MODEL, FALLBACK_MODEL):
        try:
            print(f"  Generating {div['id']} reel via {model} ...")
            output = replicate.run(model, input=build_input(model, div["prompt"]))
            if not output:
                raise RuntimeError("no output returned")
            _save(output, raw)
            print(f"  Raw saved: {raw} ({os.path.getsize(raw) / (1024*1024):.1f} MB) via {model}")
            return raw
        except Exception as e:
            print(f"  {model} failed: {str(e)[:200]}")
    raise RuntimeError(f"all video models failed for {div['id']}")


def optimize(div_id, raw):
    os.makedirs(VIDEOS_DIR, exist_ok=True)
    # scale=-2:H keeps aspect ratio and forces an even width (libx264 needs it).
    for fname, scale, crf in (
        (f"{div_id}_reel-720p.mp4", "-2:720", "30"),
        (f"{div_id}_reel-480p.mp4", "-2:480", "32"),
    ):
        out = os.path.join(VIDEOS_DIR, fname)
        subprocess.run([
            "ffmpeg", "-y", "-i", raw,
            "-vf", f"scale={scale}",
            "-c:v", "libx264", "-preset", "slow", "-crf", crf,
            "-an", "-movflags", "+faststart", "-pix_fmt", "yuv420p",
            out,
        ], capture_output=True, check=True)
        print(f"  Optimized: {out} ({os.path.getsize(out) / (1024*1024):.2f} MB)")


def main():
    print("=" * 60)
    print("  Manah Division Hero Videos — Aerospace + Atomic")
    print("=" * 60)
    for div in DIVISIONS:
        print(f"\n[{div['id']}]")
        if os.path.exists(os.path.join(VIDEOS_DIR, f"{div['id']}_reel-720p.mp4")):
            print(f"  SKIP — {div['id']}_reel-720p.mp4 already exists")
            continue
        raw = generate_raw(div)
        optimize(div["id"], raw)
    print("\n" + "=" * 60)
    print("  Done")
    print("=" * 60)


if __name__ == "__main__":
    main()

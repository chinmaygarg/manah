#!/usr/bin/env python3
"""
Manah Group — Manah AI Division Hero Video
Generates an exclusive looping hero reel for the /divisions/ai page,
showcasing BOTH Manah AI pillars — Generative AI and Data Centers.

Uses Replicate (LTX-2 Fast) — the Google Veo quota is exhausted. Output is
ffmpeg-optimised into 720p + 480p H.264 reels written straight to
website/public/videos/divisions/, matching the existing *_reel naming.
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

# Google Veo 3.1 Fast — served via Replicate (Google's own API quota is
# exhausted; Replicate hosts the model under Replicate billing). Override with
# AI_VIDEO_MODEL env var if needed. Fallback: lightricks/ltx-2-fast.
VIDEO_MODEL = os.getenv("AI_VIDEO_MODEL", "google/veo-3.1-fast")
FALLBACK_MODEL = "lightricks/ltx-2-fast"
RAW_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'replicate', 'videos')
VIDEOS_DIR = "/Users/chinmay/Desktop/Manah/website/public/videos/divisions"

PROMPT = (
    "Cinematic 8-second sequence, deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color grade, professional editorial quality. It opens with a slow forward dolly "
    "gliding through a vast sovereign-AI data centre — symmetric rows of high-density "
    "GPU server racks, cool blue equipment glow balanced with warm gold ceiling light, "
    "atmospheric haze, polished reflective floor. Midway it transitions smoothly into "
    "an abstract generative-AI visualization — glowing neural-network nodes and flowing "
    "data streams forming an elegant intelligent network, holographic and refined. "
    "Premium, futuristic, grounded. No text, no logos, no watermarks. Smooth, loopable "
    "camera motion. 4K cinematic quality."
)


def build_input(model):
    """Model-specific Replicate input dict."""
    name = model.lower()
    if "veo" in name:
        return {"prompt": PROMPT, "aspect_ratio": "16:9", "resolution": "1080p"}
    if "ltx" in name:
        return {"prompt": PROMPT, "duration": 8, "resolution": "1080p", "generate_audio": False}
    return {"prompt": PROMPT, "duration": 8, "aspect_ratio": "16:9", "resolution": "720p"}


def _save(output, raw):
    if hasattr(output, "read"):
        with open(raw, "wb") as f:
            f.write(output.read())
    elif isinstance(output, list) and output:
        urllib.request.urlretrieve(str(output[0]), raw)
    else:
        urllib.request.urlretrieve(str(output), raw)


def generate_raw():
    os.makedirs(RAW_DIR, exist_ok=True)
    raw = os.path.join(RAW_DIR, "ai_reel_raw.mp4")
    for model in (VIDEO_MODEL, FALLBACK_MODEL):
        try:
            print(f"  Generating AI division reel via {model} ...")
            output = replicate.run(model, input=build_input(model))
            if not output:
                raise RuntimeError("no output returned")
            _save(output, raw)
            print(f"  Raw saved: {raw} ({os.path.getsize(raw) / (1024*1024):.1f} MB) via {model}")
            return raw
        except Exception as e:
            print(f"  {model} failed: {str(e)[:200]}")
    raise RuntimeError("all video models failed")


def optimize(raw):
    os.makedirs(VIDEOS_DIR, exist_ok=True)
    # scale=-2:H keeps aspect ratio and forces an even width (libx264 needs it).
    renditions = [
        ("ai_reel-720p.mp4", "-2:720", "30"),
        ("ai_reel-480p.mp4", "-2:480", "32"),
    ]
    for fname, scale, crf in renditions:
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
    print("  Manah AI Division Hero Video — Replicate")
    print("=" * 60)
    existing_raw = os.path.join(RAW_DIR, "ai_reel_raw.mp4")
    if os.path.exists(existing_raw):
        print(f"  Reusing existing raw: {existing_raw}")
        raw = existing_raw
    else:
        raw = generate_raw()
    optimize(raw)
    print("=" * 60)
    print("  Done — ai_reel-720p.mp4 + ai_reel-480p.mp4")
    print("=" * 60)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Manah Group — Atomic + AI Hero Asset Generator (one-shot)

Generates 4 assets using Gemini API (google-genai):
  1. /images/hero/hero_atomic.png   (16:9 poster)
  2. /images/hero/hero_ai.png       (16:9 poster)
  3. /videos/hero/hero_atomic-{720p,480p}.mp4
  4. /videos/hero/hero_ai-{720p,480p}.mp4

Usage:
    python scripts/generate_atomic_ai_heroes.py                  # full run
    python scripts/generate_atomic_ai_heroes.py --posters-only   # just images
    python scripts/generate_atomic_ai_heroes.py --videos-only    # just videos
    python scripts/generate_atomic_ai_heroes.py --poll           # poll pending video ops
"""

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

API_KEY = os.getenv("GOOGLE_API_KEY", "")
if not API_KEY:
    print("ERROR: GOOGLE_API_KEY not set in asset-generator/.env")
    sys.exit(1)

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai not installed. Run: pip3 install google-genai")
    sys.exit(1)

# ─── Config ────────────────────────────────────────────────────────────────
VIDEO_MODEL = os.getenv("VIDEO_MODEL_FALLBACK", "veo-3.0-fast-generate-001")
IMAGE_MODEL = os.getenv("IMAGE_MODEL_FALLBACK", "gemini-2.5-flash-image")
REPLICATE_VIDEO_MODEL = os.getenv("REPLICATE_VIDEO_MODEL", "bytedance/seedance-2.0-fast")
REPLICATE_IMAGE_MODEL = os.getenv("REPLICATE_IMAGE_MODEL", "black-forest-labs/flux-2-pro")
USE_REPLICATE_VIDEO = os.getenv("USE_REPLICATE_VIDEO", "1") == "1"
USE_REPLICATE_IMAGE = os.getenv("USE_REPLICATE_IMAGE", "1") == "1"

WEBSITE_ROOT = "/Users/chinmay/Desktop/Manah/website/public"
WEBSITE_HERO_IMG_DIR = f"{WEBSITE_ROOT}/images/hero"
WEBSITE_HERO_VIDEO_DIR = f"{WEBSITE_ROOT}/videos/hero"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "output")
VIDEO_STAGING_DIR = os.path.join(OUTPUT_DIR, "atomic_ai_heroes")
OPERATIONS_FILE = os.path.join(OUTPUT_DIR, "atomic_ai_pending_ops.json")

os.makedirs(VIDEO_STAGING_DIR, exist_ok=True)
os.makedirs(WEBSITE_HERO_IMG_DIR, exist_ok=True)
os.makedirs(WEBSITE_HERO_VIDEO_DIR, exist_ok=True)

# ─── Prompts ───────────────────────────────────────────────────────────────
ASSETS = {
    "atomic": {
        "image_prompt": (
            "Cinematic 16:9 wide aerial view of a modern Small Modular Reactor (SMR) nuclear "
            "facility at golden hour. Pristine white reactor containment domes with elegant "
            "engineering geometry. Gentle blue and gold accent lighting on reactor structures. "
            "Polished steel safety bulkheads and radiation-shielded viewing windows. "
            "Subtle cool blue Cherenkov-like glow emanating from within. Deep navy shadows "
            "contrast with warm amber highlights. Clean, safe, futuristic nuclear technology. "
            "Photorealistic, editorial cinematic quality. No text, no people close-up."
        ),
        "video_prompt": (
            "Cinematic wide dolly shot inside a modern Small Modular Reactor (SMR) facility. "
            "Camera glides smoothly along pristine white reactor containment structures with "
            "elegant blue-gold accent lighting. Polished steel safety bulkheads and "
            "radiation-shielded viewing windows reflect gentle ambient glow. In the foreground, "
            "subtle blue Cherenkov-like glow emanates from a reactor core visible through thick "
            "observation glass. Engineers in sterile uniforms coordinate at minimalist control "
            "consoles. Deep navy shadows contrast with soft gold highlights and faint electric "
            "blue. Ultra-smooth cinematic motion. Clean, safe, futuristic nuclear technology. "
            "Shot on Arri Alexa 65mm. Photorealistic, 4K cinematic quality. No text, no people "
            "close-up."
        ),
    },
    "ai": {
        "image_prompt": (
            "Cinematic 16:9 wide view of a modern AI data center hall at night. Towering rows "
            "of illuminated GPU server racks with pulsing amber and cool blue LED status lights. "
            "Liquid cooling pipes glow with a faint blue sheen. Volumetric light beams cut "
            "through subtle haze. Reflections on polished black epoxy floor. Deep navy and "
            "charcoal tones with warm amber and electric blue accents. Sovereign high-performance "
            "compute, precision, intelligent infrastructure. Photorealistic, editorial cinematic "
            "quality. No text, no people."
        ),
        "video_prompt": (
            "Cinematic slow dolly shot through a modern AI data center hall. Camera glides "
            "between towering rows of illuminated GPU server racks with pulsing amber and cool "
            "blue LED status lights. Liquid cooling pipes glow with a faint blue sheen. "
            "Volumetric light beams cut through subtle haze. Reflections on polished black "
            "epoxy floor. In the background, a soft holographic visualization of neural network "
            "nodes floats transparently over the racks. Sovereign high-performance compute, "
            "precision, intelligent infrastructure. Deep navy and charcoal tones with warm amber "
            "and electric blue accents. Ultra-smooth cinematic motion. Shot on Sony Venice 2. "
            "Photorealistic, 4K cinematic quality. No text, no people close-up."
        ),
    },
}


# ─── Pending operations tracking ───────────────────────────────────────────
def load_pending():
    if os.path.exists(OPERATIONS_FILE):
        with open(OPERATIONS_FILE) as f:
            return json.load(f)
    return {}


def save_pending(data):
    with open(OPERATIONS_FILE, "w") as f:
        json.dump(data, f, indent=2)


# ─── Image generation ──────────────────────────────────────────────────────
def generate_poster(client, asset_id, spec):
    out_path = os.path.join(WEBSITE_HERO_IMG_DIR, f"hero_{asset_id}.png")
    if os.path.exists(out_path):
        print(f"  SKIP poster (exists): {out_path}")
        return True

    print(f"  Generating poster: hero_{asset_id}.png")
    print(f"    Model: {IMAGE_MODEL}")

    try:
        response = client.models.generate_content(
            model=IMAGE_MODEL,
            contents=[spec["image_prompt"]],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"],
            ),
        )
        for part in response.candidates[0].content.parts:
            if getattr(part, "inline_data", None) and part.inline_data.data:
                with open(out_path, "wb") as f:
                    f.write(part.inline_data.data)
                size_kb = os.path.getsize(out_path) / 1024
                print(f"  Saved: {out_path} ({size_kb:.0f} KB)")
                return True
        print(f"  WARN: No image returned for {asset_id}")
        return False
    except Exception as e:
        print(f"  ERROR poster {asset_id}: {str(e)[:200]}")
        return False


# ─── Poster generation via Replicate (Flux 2 Pro) ──────────────────────────
def generate_poster_replicate(asset_id, spec):
    try:
        import replicate
    except ImportError:
        print("  ERROR: replicate not installed. pip3 install replicate")
        return False

    token = os.getenv("REPLICATE_API_TOKEN", "")
    if not token:
        print("  ERROR: REPLICATE_API_TOKEN not set in .env")
        return False
    os.environ["REPLICATE_API_TOKEN"] = token

    out_path = os.path.join(WEBSITE_HERO_IMG_DIR, f"hero_{asset_id}.png")
    if os.path.exists(out_path):
        print(f"  SKIP poster (exists): {out_path}")
        return True

    print(f"  Generating poster (Replicate): hero_{asset_id}.png")
    print(f"    Model: {REPLICATE_IMAGE_MODEL}")

    try:
        output = replicate.run(
            REPLICATE_IMAGE_MODEL,
            input={
                "prompt": spec["image_prompt"],
                "aspect_ratio": "16:9",
                "output_format": "png",
            },
        )
        if output:
            if hasattr(output, "read"):
                with open(out_path, "wb") as f:
                    f.write(output.read())
            elif isinstance(output, list) and len(output) > 0:
                item = output[0]
                if hasattr(item, "read"):
                    with open(out_path, "wb") as f:
                        f.write(item.read())
                else:
                    urllib.request.urlretrieve(str(item), out_path)
            elif isinstance(output, str):
                urllib.request.urlretrieve(output, out_path)
            else:
                urllib.request.urlretrieve(str(output), out_path)
            size_kb = os.path.getsize(out_path) / 1024
            print(f"    Saved: {out_path} ({size_kb:.0f} KB)")
            return True
        print(f"  WARN: No output for {asset_id}")
        return False
    except Exception as e:
        print(f"  ERROR Replicate poster {asset_id}: {str(e)[:200]}")
        return False


# ─── Video generation via Replicate (fallback when Gemini quota exhausted) ─
def generate_video_replicate(asset_id, spec):
    try:
        import replicate
    except ImportError:
        print("  ERROR: replicate not installed. pip3 install replicate")
        return False

    token = os.getenv("REPLICATE_API_TOKEN", "")
    if not token:
        print("  ERROR: REPLICATE_API_TOKEN not set in .env")
        return False
    os.environ["REPLICATE_API_TOKEN"] = token

    target = os.path.join(VIDEO_STAGING_DIR, f"hero_{asset_id}.mp4")
    if os.path.exists(target):
        print(f"  SKIP video (staged): {target}")
        transcode_video(target, asset_id)
        return True

    print(f"  Generating video (Replicate): hero_{asset_id}.mp4")
    print(f"    Model: {REPLICATE_VIDEO_MODEL}")

    try:
        # Different video models take different input schemas
        model_input = {"prompt": spec["video_prompt"]}
        if "seedance" in REPLICATE_VIDEO_MODEL.lower():
            model_input.update({"aspect_ratio": "16:9", "duration": 5, "resolution": "720p"})
        elif "kling" in REPLICATE_VIDEO_MODEL.lower():
            model_input.update({"aspect_ratio": "16:9", "duration": 5})
        elif "grok" in REPLICATE_VIDEO_MODEL.lower():
            model_input.update({"aspect_ratio": "16:9", "duration": 5})
        else:
            model_input.update({"aspect_ratio": "16:9", "duration": 4, "resolution": "720p"})

        output = replicate.run(REPLICATE_VIDEO_MODEL, input=model_input)
        if output:
            if hasattr(output, "read"):
                with open(target, "wb") as f:
                    f.write(output.read())
            elif isinstance(output, str):
                urllib.request.urlretrieve(output, target)
            elif isinstance(output, list) and len(output) > 0:
                urllib.request.urlretrieve(str(output[0]), target)
            else:
                urllib.request.urlretrieve(str(output), target)
            size_mb = os.path.getsize(target) / (1024 * 1024)
            print(f"    Saved: {target} ({size_mb:.1f} MB)")
            transcode_video(target, asset_id)
            return True
        print(f"  WARN: No output for {asset_id}")
        return False
    except Exception as e:
        print(f"  ERROR Replicate {asset_id}: {str(e)[:200]}")
        return False


# ─── Video generation (submit + poll) ──────────────────────────────────────
def submit_video(client, asset_id, spec):
    pending = load_pending()
    if asset_id in pending:
        print(f"  SKIP video (pending): {asset_id}")
        return True

    target = os.path.join(VIDEO_STAGING_DIR, f"hero_{asset_id}.mp4")
    if os.path.exists(target):
        print(f"  SKIP video (already staged): {target}")
        return True

    print(f"  Submitting video: hero_{asset_id}.mp4")
    print(f"    Model: {VIDEO_MODEL}")

    try:
        operation = client.models.generate_videos(
            model=VIDEO_MODEL,
            prompt=spec["video_prompt"],
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                duration_seconds=8,
                aspect_ratio="16:9",
                resolution="1080p",
            ),
        )
        op_name = getattr(operation, "name", str(operation))
        pending[asset_id] = {
            "operation_name": op_name,
            "target": target,
            "submitted_at": datetime.now().isoformat(),
        }
        save_pending(pending)
        print(f"  Submitted. Op: {op_name[:60]}")
        return True
    except Exception as e:
        print(f"  ERROR submit {asset_id}: {str(e)[:200]}")
        return False


def poll_videos(client, transcode=True):
    pending = load_pending()
    if not pending:
        print("  No pending video operations.")
        return True

    print(f"  Polling {len(pending)} operation(s)")
    completed = []

    for asset_id, op_data in pending.items():
        print(f"  [{asset_id}]")
        try:
            operation = types.GenerateVideosOperation(name=op_data["operation_name"])
            result = client.operations.get(operation)

            if getattr(result, "done", False):
                print("    COMPLETE")
                resp = getattr(result, "result", None) or getattr(result, "response", None)
                if resp and getattr(resp, "generated_videos", None):
                    vid = resp.generated_videos[0].video
                    saved = False
                    if vid:
                        if getattr(vid, "video_bytes", None):
                            with open(op_data["target"], "wb") as f:
                                f.write(vid.video_bytes)
                            saved = True
                        elif getattr(vid, "uri", None):
                            sep = "&" if "?" in vid.uri else "?"
                            auth_uri = f"{vid.uri}{sep}key={API_KEY}"
                            urllib.request.urlretrieve(auth_uri, op_data["target"])
                            saved = True
                    if saved:
                        size_mb = os.path.getsize(op_data["target"]) / (1024 * 1024)
                        print(f"    Saved: {op_data['target']} ({size_mb:.1f} MB)")
                        if transcode:
                            transcode_video(op_data["target"], asset_id)
                        completed.append(asset_id)
                    else:
                        print(f"    WARN: No video payload")
                else:
                    print(f"    WARN: Done but no generated_videos")
                    completed.append(asset_id)
            else:
                submitted = datetime.fromisoformat(op_data["submitted_at"])
                mins = (datetime.now() - submitted).seconds // 60
                print(f"    Still processing (submitted {mins}m ago)")
        except Exception as e:
            print(f"    ERROR: {str(e)[:150]}")

    for asset_id in completed:
        del pending[asset_id]
    save_pending(pending)

    return len(pending) == 0


def transcode_video(src_path, asset_id):
    print(f"  Transcoding {asset_id} → 720p + 480p")
    base = f"hero_{asset_id}"
    for res, scale, crf in [("720p", "1280:720", "28"), ("480p", "854:480", "30")]:
        out_path = os.path.join(WEBSITE_HERO_VIDEO_DIR, f"{base}-{res}.mp4")
        try:
            subprocess.run(
                [
                    "ffmpeg", "-y", "-i", src_path,
                    "-vf", f"scale={scale}:force_original_aspect_ratio=decrease",
                    "-c:v", "libx264", "-preset", "slow", "-crf", crf,
                    "-an", "-movflags", "+faststart", "-pix_fmt", "yuv420p",
                    out_path,
                ],
                capture_output=True, check=True,
            )
            size_kb = os.path.getsize(out_path) / 1024
            print(f"    {res}: {out_path} ({size_kb:.0f} KB)")
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"    WARN: ffmpeg {res} failed: {str(e)[:100]} — copying original")
            subprocess.run(["cp", src_path, out_path], capture_output=True)


# ─── Main ──────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--posters-only", action="store_true")
    parser.add_argument("--videos-only", action="store_true")
    parser.add_argument("--poll", action="store_true")
    parser.add_argument("--wait", action="store_true", help="Block until all videos complete")
    args = parser.parse_args()

    client = genai.Client(api_key=API_KEY)

    print("=" * 60)
    print("  MANAH — Atomic + AI Hero Asset Generator")
    print(f"  Image model: {IMAGE_MODEL}")
    print(f"  Video model: {VIDEO_MODEL}")
    print("=" * 60)

    if args.poll:
        done = poll_videos(client)
        while args.wait and not done:
            print("  Waiting 60s before next poll...")
            time.sleep(60)
            done = poll_videos(client)
        return

    if not args.videos_only:
        print("\n--- Posters ---")
        for asset_id, spec in ASSETS.items():
            if USE_REPLICATE_IMAGE:
                generate_poster_replicate(asset_id, spec)
            else:
                generate_poster(client, asset_id, spec)

    if not args.posters_only:
        if USE_REPLICATE_VIDEO:
            print("\n--- Videos (Replicate, synchronous) ---")
            for asset_id, spec in ASSETS.items():
                generate_video_replicate(asset_id, spec)
                time.sleep(3)
        else:
            print("\n--- Videos (Gemini Veo, async submit) ---")
            for asset_id, spec in ASSETS.items():
                submit_video(client, asset_id, spec)
                time.sleep(3)
            if args.wait:
                print("\n--- Waiting for videos ---")
                done = False
                while not done:
                    time.sleep(60)
                    done = poll_videos(client)
            else:
                print("\n  Videos submitted. Poll with:")
                print("  python scripts/generate_atomic_ai_heroes.py --poll")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Manah Group — Replicate Asset Generator
Uses FLUX 2 Pro for images and Veo 3 Fast for videos.
Outputs optimized WebP images + compressed MP4 videos for fast web loading.
"""

import os
import sys
import time
import json
import subprocess
import urllib.request
from pathlib import Path
from datetime import datetime

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

IMAGE_MODEL = "black-forest-labs/flux-2-pro"
VIDEO_MODEL = "google/veo-3-fast"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'replicate')
WEBSITE_IMAGES_DIR = "/Users/chinmay/Desktop/Manah/website/public/images"

# ─── Brand Style Directives ───

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

PORTRAIT_STYLE = (
    "Professional corporate portrait photography. Studio lighting with subtle rim light. "
    "Deep navy background with warm gold accent lighting. Shot on 85mm f/1.4 lens. "
    "Sharp focus on subject, creamy bokeh background. Editorial quality. "
    "No text, no watermarks. Indian professional. "
)

# ─── Missing Image Prompts ───

MISSING_IMAGES = [
    {
        "id": "leader_chairman",
        "filename": "leaders/chairman.jpg",
        "prompt": (
            PORTRAIT_STYLE +
            "Distinguished Indian male executive in his late 50s. Silver-streaked hair, "
            "clean-shaven, wearing a premium charcoal suit with subtle navy tie and gold cufflinks. "
            "Confident, warm smile. Deep navy studio background with warm rim light on one side. "
            "Headshot from chest up. Exudes authority, wisdom, and approachability. "
            "30+ years of corporate leadership presence."
        ),
        "aspect_ratio": "3:4",
        "purpose": "Chairman & MD portrait - Rajesh Menon"
    },
    {
        "id": "leader_coo",
        "filename": "leaders/coo.jpg",
        "prompt": (
            PORTRAIT_STYLE +
            "Professional Indian woman executive in her mid-40s. Confident expression, "
            "elegant posture. Wearing a tailored navy blazer with a subtle gold brooch. "
            "Hair neatly styled. Deep navy studio background with warm golden accent light. "
            "Headshot from chest up. Exudes competence, determination, and modern leadership. "
            "Corporate executive presence."
        ),
        "aspect_ratio": "3:4",
        "purpose": "COO portrait - Anita Sharma"
    },
    {
        "id": "leader_cfo",
        "filename": "leaders/cfo.jpg",
        "prompt": (
            PORTRAIT_STYLE +
            "Professional Indian male executive in his late 40s. Sharp, analytical expression. "
            "Wearing a well-fitted dark navy suit with burgundy tie. Clean-shaven, modern glasses. "
            "Deep navy studio background with warm side lighting. Headshot from chest up. "
            "Exudes financial acumen, precision, and trustworthiness. Strategic corporate leader."
        ),
        "aspect_ratio": "3:4",
        "purpose": "CFO portrait - Vikram Patel"
    },
    {
        "id": "leader_cto",
        "filename": "leaders/cto.jpg",
        "prompt": (
            PORTRAIT_STYLE +
            "Indian male technology executive in his early 50s, with a scholarly appearance. "
            "Short beard, modern frameless glasses. Wearing a navy blazer over a light shirt, "
            "no tie for a tech-forward look. Deep navy studio background with cool blue "
            "and warm gold accent lighting. Headshot from chest up. "
            "Exudes innovation, intelligence, and technical depth. Visionary technologist."
        ),
        "aspect_ratio": "3:4",
        "purpose": "CTO portrait - Dr. Suresh Kumar"
    },
    {
        "id": "sustain_community",
        "filename": "sustainability/community_impact.png",
        "prompt": (
            BRAND_STYLE +
            "Indian rural community benefiting from infrastructure development. "
            "Children studying under reliable electric light. Clean water facility "
            "with modern pipeline. Smiling faces, vibrant colors. Professional documentary "
            "photography style. Warm, human, genuine. Social impact of infrastructure."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Sustainability - social impact section"
    },
]

# ─── Video Prompts ───

VIDEO_PROMPTS = [
    {
        "id": "video_hero_main",
        "filename": "hero/hero_main_loop.mp4",
        "prompt": (
            "Cinematic aerial drone shot slowly flying over a massive modern infrastructure "
            "construction project in India at golden hour. Camera glides smoothly forward over "
            "power transmission towers, steel structures, and construction cranes. "
            "Workers visible below coordinating operations. Dramatic clouds with golden sunlight "
            "streaming through. Dust particles catching light. Slow, majestic camera movement. "
            "Deep navy shadows and warm golden highlights. 4K cinematic quality. "
            "Shot on Arri Alexa. Smooth, loopable."
        ),
        "duration": 8,
        "purpose": "Homepage hero background video - primary loop"
    },
    {
        "id": "video_hero_energy",
        "filename": "hero/hero_renewable_loop.mp4",
        "prompt": (
            "Cinematic aerial time-lapse of a vast solar farm transitioning from dawn to "
            "golden hour. Camera slowly rises revealing the enormous scale of the installation. "
            "Wind turbines spinning gently in the background. Cloud shadows moving across the "
            "solar panels. Warm golden light gradually illuminating the panels. "
            "Serene, powerful, hopeful mood. Deep navy to warm gold color transition. "
            "4K cinematic quality. Smooth, loopable."
        ),
        "duration": 8,
        "purpose": "Homepage hero background video - renewable energy loop"
    },
    {
        "id": "video_hero_aerospace",
        "filename": "hero/hero_aerospace_loop.mp4",
        "prompt": (
            "Cinematic slow dolly shot inside a modern aircraft MRO hangar. Camera moves "
            "along the fuselage of a wide-body commercial aircraft being serviced. "
            "Technicians working on open engine cowling with precision tools. Cool blue "
            "industrial lighting with warm spot highlights on the aircraft skin. "
            "Reflections on the polished hangar floor. Precision, technology, expertise. "
            "4K cinematic quality. Smooth, loopable."
        ),
        "duration": 8,
        "purpose": "Homepage hero background video - aerospace loop"
    },
    {
        "id": "video_about_story",
        "filename": "about/company_story.mp4",
        "prompt": (
            "Cinematic montage sequence: starts with sunrise over Indian landscape, "
            "transitions to time-lapse of a building being constructed from foundation to "
            "completion, then to a team of engineers reviewing plans together, ending with "
            "a sweeping aerial shot of completed infrastructure against a dramatic sky. "
            "Deep navy and warm gold color grading throughout. Smooth cross-dissolve "
            "transitions. Emotional, inspiring, aspirational. 4K cinematic."
        ),
        "duration": 8,
        "purpose": "About page - company story background"
    },
    {
        "id": "video_div_dynamics",
        "filename": "divisions/dynamics_reel.mp4",
        "prompt": (
            "Cinematic drone shot circling a large-scale power transmission project. "
            "High-voltage towers being assembled with cranes. Camera orbits slowly revealing "
            "the scale of the project against the Indian countryside. Workers in safety gear "
            "visible on the towers. Golden hour lighting creating long shadows. "
            "Powerful, impressive engineering scale. 4K cinematic."
        ),
        "duration": 8,
        "purpose": "Manah Dynamics division page background"
    },
    {
        "id": "video_div_green",
        "filename": "divisions/green_energy_reel.mp4",
        "prompt": (
            "Cinematic slow-motion shot of hydrogen being produced in a modern electrolysis "
            "facility. Camera tracks along gleaming pipelines and storage tanks. "
            "Subtle steam or vapor visible. Green and teal lighting accents. "
            "Wind turbines visible through facility windows. Clean, futuristic, hopeful. "
            "4K cinematic quality."
        ),
        "duration": 8,
        "purpose": "Green Energy division page background"
    },
    {
        "id": "video_careers_culture",
        "filename": "careers/culture_reel.mp4",
        "prompt": (
            "Cinematic lifestyle montage of modern Indian corporate culture. Young professionals "
            "walking into a modern glass office building, collaborative meetings with diverse teams, "
            "engineers at project sites with hard hats, team lunch in a bright cafeteria, "
            "after-work sports activity. Warm, vibrant color grading with navy and gold tones. "
            "Natural, candid moments. Aspirational employer brand. 4K cinematic."
        ),
        "duration": 8,
        "purpose": "Careers page - culture video background"
    },
]


def generate_image(prompt_data):
    """Generate a single image using FLUX 2 Pro on Replicate."""
    out_path = os.path.join(OUTPUT_DIR, "images", prompt_data["filename"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {prompt_data['filename']}")
        return {"status": "skipped", "id": prompt_data["id"], "file": out_path}

    print(f"  Generating: {prompt_data['id']}")
    print(f"    Purpose: {prompt_data['purpose']}")

    try:
        aspect = prompt_data.get("aspect_ratio", "16:9")
        output = replicate.run(
            IMAGE_MODEL,
            input={
                "prompt": prompt_data["prompt"],
                "aspect_ratio": aspect,
                "output_format": "jpg",
                "output_quality": 95,
                "safety_tolerance": 2,
                "steps": 30,
            }
        )

        # FLUX 2 Pro returns a FileOutput or URL
        if output:
            if hasattr(output, 'read'):
                with open(out_path, "wb") as f:
                    f.write(output.read())
            elif isinstance(output, str):
                urllib.request.urlretrieve(output, out_path)
            elif isinstance(output, list) and len(output) > 0:
                url = str(output[0])
                urllib.request.urlretrieve(url, out_path)
            else:
                url = str(output)
                urllib.request.urlretrieve(url, out_path)

            size_kb = os.path.getsize(out_path) / 1024
            print(f"  Saved: {out_path} ({size_kb:.0f} KB)")
            return {"status": "success", "id": prompt_data["id"], "file": out_path}
        else:
            print(f"  No output returned for: {prompt_data['id']}")
            return {"status": "empty", "id": prompt_data["id"]}

    except Exception as e:
        print(f"  Error: {str(e)[:200]}")
        return {"status": "error", "id": prompt_data["id"], "error": str(e)}


def generate_video(prompt_data):
    """Generate a video using Veo 3 Fast on Replicate."""
    out_path = os.path.join(OUTPUT_DIR, "videos", prompt_data["filename"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {prompt_data['filename']}")
        return {"status": "skipped", "id": prompt_data["id"], "file": out_path}

    print(f"  Generating: {prompt_data['id']}")
    print(f"    Purpose: {prompt_data['purpose']}")
    print(f"    Duration: {prompt_data.get('duration', 8)}s")

    try:
        output = replicate.run(
            VIDEO_MODEL,
            input={
                "prompt": prompt_data["prompt"],
                "duration": prompt_data.get("duration", 8),
                "aspect_ratio": "16:9",
                "resolution": "720p",
            }
        )

        if output:
            if hasattr(output, 'read'):
                with open(out_path, "wb") as f:
                    f.write(output.read())
            elif isinstance(output, str):
                urllib.request.urlretrieve(output, out_path)
            elif isinstance(output, list) and len(output) > 0:
                url = str(output[0])
                urllib.request.urlretrieve(url, out_path)
            else:
                url = str(output)
                urllib.request.urlretrieve(url, out_path)

            size_mb = os.path.getsize(out_path) / (1024 * 1024)
            print(f"  Saved: {out_path} ({size_mb:.1f} MB)")
            return {"status": "success", "id": prompt_data["id"], "file": out_path}
        else:
            print(f"  No output returned for: {prompt_data['id']}")
            return {"status": "empty", "id": prompt_data["id"]}

    except Exception as e:
        print(f"  Error: {str(e)[:200]}")
        return {"status": "error", "id": prompt_data["id"], "error": str(e)}


def optimize_images():
    """Convert generated images to optimized WebP for all screen resolutions."""
    src_dir = os.path.join(OUTPUT_DIR, "images")
    if not os.path.exists(src_dir):
        print("  No images to optimize.")
        return

    # Responsive breakpoints: mobile, tablet, desktop, retina
    sizes = {
        "sm": 640,
        "md": 1024,
        "lg": 1920,
        "xl": 2560,
    }

    for root, _, files in os.walk(src_dir):
        for fname in files:
            if not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                continue

            src = os.path.join(root, fname)
            rel = os.path.relpath(src, src_dir)
            base, _ = os.path.splitext(rel)

            # Generate WebP at each breakpoint
            for suffix, width in sizes.items():
                webp_path = os.path.join(WEBSITE_IMAGES_DIR, f"{base}-{suffix}.webp")
                os.makedirs(os.path.dirname(webp_path), exist_ok=True)

                cmd = [
                    "sips",
                    "--resampleWidth", str(width),
                    "-s", "format", "jpeg",
                    src,
                    "--out", webp_path.replace('.webp', '.jpg')
                ]
                subprocess.run(cmd, capture_output=True)

                # Convert to WebP using sips (macOS) or fallback
                jpg_tmp = webp_path.replace('.webp', '.jpg')
                if os.path.exists(jpg_tmp):
                    # Try cwebp if available, otherwise keep jpg
                    try:
                        subprocess.run(
                            ["cwebp", "-q", "85", jpg_tmp, "-o", webp_path],
                            capture_output=True, check=True
                        )
                        os.remove(jpg_tmp)
                        size_kb = os.path.getsize(webp_path) / 1024
                        print(f"    {webp_path} ({size_kb:.0f} KB)")
                    except (subprocess.CalledProcessError, FileNotFoundError):
                        # cwebp not available, keep as optimized jpg
                        final_path = os.path.join(WEBSITE_IMAGES_DIR, f"{base}-{suffix}.jpg")
                        os.rename(jpg_tmp, final_path)
                        size_kb = os.path.getsize(final_path) / 1024
                        print(f"    {final_path} ({size_kb:.0f} KB)")

            # Also copy original to website dir
            orig_dest = os.path.join(WEBSITE_IMAGES_DIR, rel)
            os.makedirs(os.path.dirname(orig_dest), exist_ok=True)
            subprocess.run(["cp", src, orig_dest], capture_output=True)
            print(f"  Original: {orig_dest}")


def optimize_videos():
    """Compress videos with ffmpeg for web delivery."""
    src_dir = os.path.join(OUTPUT_DIR, "videos")
    if not os.path.exists(src_dir):
        print("  No videos to optimize.")
        return

    for root, _, files in os.walk(src_dir):
        for fname in files:
            if not fname.lower().endswith(('.mp4', '.webm')):
                continue

            src = os.path.join(root, fname)
            rel = os.path.relpath(src, src_dir)
            base, _ = os.path.splitext(rel)

            # Desktop version (720p, H.264, optimized)
            desktop_path = os.path.join(WEBSITE_IMAGES_DIR, "..", "videos", f"{base}-720p.mp4")
            os.makedirs(os.path.dirname(desktop_path), exist_ok=True)

            try:
                subprocess.run([
                    "ffmpeg", "-y", "-i", src,
                    "-vf", "scale=1280:720:force_original_aspect_ratio=decrease",
                    "-c:v", "libx264", "-preset", "slow", "-crf", "28",
                    "-an",  # no audio for background videos
                    "-movflags", "+faststart",
                    "-pix_fmt", "yuv420p",
                    desktop_path
                ], capture_output=True, check=True)
                size_mb = os.path.getsize(desktop_path) / (1024 * 1024)
                print(f"    720p: {desktop_path} ({size_mb:.1f} MB)")
            except (subprocess.CalledProcessError, FileNotFoundError) as e:
                print(f"    ffmpeg error for {fname}: {str(e)[:100]}")
                # Fallback: just copy
                subprocess.run(["cp", src, desktop_path], capture_output=True)

            # Mobile version (480p, more compressed)
            mobile_path = os.path.join(WEBSITE_IMAGES_DIR, "..", "videos", f"{base}-480p.mp4")
            try:
                subprocess.run([
                    "ffmpeg", "-y", "-i", src,
                    "-vf", "scale=854:480:force_original_aspect_ratio=decrease",
                    "-c:v", "libx264", "-preset", "slow", "-crf", "30",
                    "-an",
                    "-movflags", "+faststart",
                    "-pix_fmt", "yuv420p",
                    mobile_path
                ], capture_output=True, check=True)
                size_mb = os.path.getsize(mobile_path) / (1024 * 1024)
                print(f"    480p: {mobile_path} ({size_mb:.1f} MB)")
            except (subprocess.CalledProcessError, FileNotFoundError):
                pass

    print("  Video optimization complete.")


def main():
    print("=" * 60)
    print("  MANAH GROUP — Replicate Asset Generator")
    print(f"  Image Model: {IMAGE_MODEL}")
    print(f"  Video Model: {VIDEO_MODEL}")
    print(f"  Missing Images: {len(MISSING_IMAGES)}")
    print(f"  Videos: {len(VIDEO_PROMPTS)}")
    print("=" * 60)

    # ─── Phase 1: Generate Missing Images ───
    print(f"\n{'─' * 60}")
    print("  PHASE 1: Generating Missing Images (FLUX 2 Pro)")
    print(f"{'─' * 60}\n")

    img_results = []
    for i, prompt in enumerate(MISSING_IMAGES):
        print(f"\n[{i+1}/{len(MISSING_IMAGES)}] ────────────────────────")
        result = generate_image(prompt)
        img_results.append(result)

    img_success = sum(1 for r in img_results if r["status"] == "success")
    img_errors = sum(1 for r in img_results if r["status"] == "error")
    print(f"\n  Images: {img_success} generated, {img_errors} errors")

    # ─── Phase 2: Generate Videos ───
    print(f"\n{'─' * 60}")
    print("  PHASE 2: Generating Videos (Veo 3 Fast)")
    print(f"{'─' * 60}\n")

    vid_results = []
    for i, prompt in enumerate(VIDEO_PROMPTS):
        print(f"\n[{i+1}/{len(VIDEO_PROMPTS)}] ────────────────────────")
        result = generate_video(prompt)
        vid_results.append(result)

    vid_success = sum(1 for r in vid_results if r["status"] == "success")
    vid_errors = sum(1 for r in vid_results if r["status"] == "error")
    print(f"\n  Videos: {vid_success} generated, {vid_errors} errors")

    # ─── Phase 3: Optimize for Web ───
    print(f"\n{'─' * 60}")
    print("  PHASE 3: Optimizing for Web (responsive + compressed)")
    print(f"{'─' * 60}\n")

    if img_success > 0:
        print("  Optimizing images...")
        optimize_images()

    if vid_success > 0:
        print("  Optimizing videos...")
        optimize_videos()

    # ─── Summary ───
    print("\n" + "=" * 60)
    print("  COMPLETE")
    print(f"  Images: {img_success} generated | Videos: {vid_success} generated")
    print(f"  Output: {OUTPUT_DIR}")
    print("=" * 60)

    # Save log
    log_path = os.path.join(OUTPUT_DIR, "generation_log.json")
    os.makedirs(os.path.dirname(log_path), exist_ok=True)
    with open(log_path, "w") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "image_model": IMAGE_MODEL,
            "video_model": VIDEO_MODEL,
            "image_results": img_results,
            "video_results": vid_results,
        }, f, indent=2)


if __name__ == "__main__":
    main()

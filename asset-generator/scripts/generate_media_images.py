#!/usr/bin/env python3
"""
Manah Group — Media Page Image Generator
Generates blog cover images and gallery photos using FLUX 2 Pro.
Outputs optimized WebP + PNG for fast web loading.
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

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'output', 'replicate', 'images')
WEBSITE_IMAGES_DIR = "/Users/chinmay/Desktop/Manah/website/public/images"

# ─── Brand Style Directives ───

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

EDITORIAL_STYLE = (
    "Magazine editorial photography. Rich, cinematic color grading with deep shadows and warm "
    "highlights. Shallow depth of field. Professional lighting. No text, no logos, no watermarks. "
    "Shot on medium format digital camera. Extremely detailed and sharp. "
)

# ─── Blog Cover Image Prompts ───

BLOG_IMAGES = [
    {
        "id": "blog_green_hydrogen",
        "filename": "blog/green_hydrogen_future.jpg",
        "prompt": (
            EDITORIAL_STYLE +
            "A modern green hydrogen electrolyzer facility at twilight. Gleaming stainless steel "
            "electrolysis stacks with green LED indicators. Hydrogen gas flowing through transparent "
            "pipes with a faint glow. Wind turbines silhouetted against a dramatic sunset sky in "
            "the background. Futuristic, clean energy atmosphere. Teal and gold color accents. "
            "Wide angle lens capturing the full scale of the facility. Industrial yet hopeful."
        ),
        "aspect_ratio": "16:9",
        "purpose": "Blog cover - The Future of Global Green Hydrogen"
    },
    {
        "id": "blog_digital_twins",
        "filename": "blog/digital_twins_infrastructure.jpg",
        "prompt": (
            EDITORIAL_STYLE +
            "A holographic digital twin visualization of a large infrastructure bridge projected "
            "above a modern engineering workstation. Blue wireframe mesh overlaid on a photorealistic "
            "3D model. Multiple data streams and sensor readouts floating around the model. "
            "An engineer's hands visible interacting with the hologram. Dark environment with "
            "blue and gold ambient lighting. Futuristic technology meets civil engineering. "
            "Deep navy atmosphere with gold data points."
        ),
        "aspect_ratio": "16:9",
        "purpose": "Blog cover - Digital Twins in Infrastructure"
    },
    {
        "id": "blog_power_grids",
        "filename": "blog/resilient_power_grids.jpg",
        "prompt": (
            EDITORIAL_STYLE +
            "Dramatic aerial view of a 765kV high-voltage transmission corridor stretching across "
            "the Indian landscape at golden hour. Massive lattice steel towers marching toward the "
            "horizon in perfect formation. Power lines catching golden sunlight, creating a web "
            "against a dramatic cloud-filled sky. Lush green farmland below. The scale of India's "
            "power grid modernization. Epic, grand, powerful. Deep warm golden light."
        ),
        "aspect_ratio": "16:9",
        "purpose": "Blog cover - Building Resilient Power Grids"
    },
]

# ─── Gallery Image Prompts ───

GALLERY_IMAGES = [
    {
        "id": "gallery_transmission_construction",
        "filename": "gallery/transmission_tower_construction.jpg",
        "prompt": (
            BRAND_STYLE +
            "Construction crew assembling a massive 765kV transmission tower at sunset. Workers in "
            "safety harnesses climbing the steel lattice structure. A crane lifting a cross-arm section "
            "into position. Dramatic golden hour light casting long shadows. Indian countryside in "
            "the background. Shot from low angle looking up, emphasizing the tower's immense scale. "
            "Engineering prowess and teamwork."
        ),
        "aspect_ratio": "1:1",
        "purpose": "Gallery featured - Transmission tower construction"
    },
    {
        "id": "gallery_solar_aerial",
        "filename": "gallery/solar_farm_aerial.jpg",
        "prompt": (
            BRAND_STYLE +
            "Stunning aerial drone photograph of a massive solar farm in Rajasthan, India. "
            "Thousands of photovoltaic panels arranged in geometric patterns stretching to the "
            "horizon. A service road winding through the installation. Bright blue sky with "
            "scattered clouds reflected in the panels. The incredible scale of renewable energy "
            "infrastructure. Clean, geometric, powerful."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Solar farm aerial view"
    },
    {
        "id": "gallery_tunnel_boring",
        "filename": "gallery/metro_tunnel_construction.jpg",
        "prompt": (
            BRAND_STYLE +
            "Interior of an active metro tunnel construction site in India. A massive tunnel boring "
            "machine (TBM) visible at the end of the tunnel with its cutting face. Concrete tunnel "
            "segments lining the walls. Construction lights creating dramatic pools of light in the "
            "darkness. Workers in high-vis vests and hard hats. Raw, powerful underground engineering."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Metro tunnel construction"
    },
    {
        "id": "gallery_hydrogen_plant",
        "filename": "gallery/hydrogen_electrolyzer_facility.jpg",
        "prompt": (
            BRAND_STYLE +
            "Interior of a modern PEM hydrogen electrolyzer facility. Rows of gleaming electrolyzer "
            "stacks with polished stainless steel pipes. Green and blue LED status indicators. "
            "A technician in a clean room suit monitoring equipment on a tablet. Ultra-modern, clean, "
            "futuristic industrial environment. Teal accent lighting."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Hydrogen electrolyzer facility"
    },
    {
        "id": "gallery_mro_hangar",
        "filename": "gallery/aircraft_mro_hangar.jpg",
        "prompt": (
            BRAND_STYLE +
            "Wide-angle view of a modern aircraft MRO hangar. A commercial wide-body aircraft with "
            "engine cowlings open, surrounded by maintenance platforms and scaffolding. Technicians "
            "working on the engines with precision tools. High bay industrial lighting creating "
            "dramatic shadows on the aircraft fuselage. The scale and precision of aviation "
            "maintenance. Deep navy shadows with warm work light accents."
        ),
        "aspect_ratio": "1:1",
        "purpose": "Gallery featured - Aircraft MRO hangar"
    },
    {
        "id": "gallery_engineers_site",
        "filename": "gallery/engineers_reviewing_blueprints.jpg",
        "prompt": (
            BRAND_STYLE +
            "Three Indian engineers in hard hats and safety vests reviewing large blueprints spread "
            "on a table at an active construction site. One pointing at the plans, others discussing. "
            "A half-built transmission tower visible behind them. Golden hour natural light. "
            "Collaborative, professional, expertise in action. Candid documentary style."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Engineers at site"
    },
    {
        "id": "gallery_smt_manufacturing",
        "filename": "gallery/electronics_manufacturing_line.jpg",
        "prompt": (
            BRAND_STYLE +
            "High-tech surface mount technology (SMT) production line in a cleanroom environment. "
            "Pick-and-place machines rapidly populating PCB boards. Automated optical inspection "
            "systems with green laser guides. Indian technicians in ESD-safe clothing monitoring "
            "the process. Blue and gold ambient lighting. Ultra-modern electronics manufacturing."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Electronics manufacturing"
    },
    {
        "id": "gallery_boardroom",
        "filename": "gallery/corporate_boardroom_meeting.jpg",
        "prompt": (
            BRAND_STYLE +
            "Modern corporate boardroom with floor-to-ceiling windows overlooking a city skyline. "
            "A diverse team of Indian executives in a strategy meeting around a large conference "
            "table. Large screen showing project data visualizations. Warm natural light streaming "
            "through the windows. Professional, aspirational corporate culture. Candid moment."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Corporate boardroom"
    },
    {
        "id": "gallery_groundbreaking",
        "filename": "gallery/groundbreaking_ceremony.jpg",
        "prompt": (
            BRAND_STYLE +
            "Corporate ground-breaking ceremony at a new infrastructure project site in India. "
            "Executives and dignitaries in formal attire with gold-plated shovels. Red ribbon "
            "and ceremonial setup. Large project billboard visible. Indian flags and corporate "
            "banners. Festive yet professional atmosphere. Documentary event photography style."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Ground-breaking ceremony"
    },
    {
        "id": "gallery_award_ceremony",
        "filename": "gallery/award_ceremony.jpg",
        "prompt": (
            BRAND_STYLE +
            "Corporate awards ceremony on an elegant stage. An Indian executive receiving a trophy "
            "from a dignitary. Gold and navy stage design with professional lighting. Corporate "
            "backdrop with subtle geometric patterns. Audience visible in the foreground. "
            "Achievement, recognition, excellence. Warm gold stage lighting."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Award ceremony"
    },
    {
        "id": "gallery_highway_aerial",
        "filename": "gallery/highway_construction_aerial.jpg",
        "prompt": (
            BRAND_STYLE +
            "Dramatic aerial photograph of a multi-lane expressway flyover under construction "
            "in India. Massive concrete pillars and steel reinforcement. Construction cranes "
            "and equipment visible. The completed section of highway smoothly curving away. "
            "Green landscape surrounding the construction corridor. Shot at golden hour "
            "with warm light on the concrete structures."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Highway construction"
    },
    {
        "id": "gallery_wind_turbines",
        "filename": "gallery/wind_farm_dawn.jpg",
        "prompt": (
            BRAND_STYLE +
            "Row of massive modern wind turbines on a hillside in India at dawn. First light of "
            "sunrise creating silhouettes and long shadows. Mist rolling across the green hillside. "
            "The blades frozen mid-rotation, creating a sense of power and scale. Serene yet "
            "powerful. Warm golden light breaking through clouds."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Wind farm at dawn"
    },
    {
        "id": "gallery_safety_briefing",
        "filename": "gallery/safety_briefing_site.jpg",
        "prompt": (
            BRAND_STYLE +
            "A safety toolbox briefing at a major construction site in India. A safety officer "
            "addressing a group of workers in hard hats and reflective vests. Safety boards and "
            "signage visible. Morning light. Professional, organized, safety-first culture. "
            "Documentary photography style. Diverse team of Indian construction workers."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Safety briefing"
    },
    {
        "id": "gallery_data_center",
        "filename": "gallery/data_center_corridor.jpg",
        "prompt": (
            BRAND_STYLE +
            "A modern data center server room corridor. Rows of server racks with blue LED "
            "status lights stretching into the distance. Cold aisle containment with glass "
            "panels. Cool blue ambient lighting contrasted with warm gold status indicators. "
            "Ultra-clean, precise, high-tech environment. Cable management perfection. "
            "The backbone of digital infrastructure."
        ),
        "aspect_ratio": "4:3",
        "purpose": "Gallery - Data center"
    },
]


def generate_image(prompt_data):
    """Generate a single image using FLUX 2 Pro on Replicate."""
    out_path = os.path.join(OUTPUT_DIR, prompt_data["filename"])
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


def copy_and_optimize(src_path, dest_subpath):
    """Copy source image to website dir and generate responsive WebP variants."""
    sizes = {
        "sm": 640,
        "md": 1024,
        "lg": 1920,
    }

    dest_path = os.path.join(WEBSITE_IMAGES_DIR, dest_subpath)
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

    # Copy original as PNG
    subprocess.run(["cp", src_path, dest_path], capture_output=True)
    print(f"  Original: {dest_path}")

    base, _ = os.path.splitext(dest_subpath)

    for suffix, width in sizes.items():
        webp_path = os.path.join(WEBSITE_IMAGES_DIR, f"{base}-{suffix}.webp")

        # Resize with sips first
        jpg_tmp = webp_path.replace('.webp', '_tmp.jpg')
        subprocess.run(
            ["sips", "--resampleWidth", str(width), "-s", "format", "jpeg", src_path, "--out", jpg_tmp],
            capture_output=True
        )

        if os.path.exists(jpg_tmp):
            try:
                subprocess.run(
                    ["cwebp", "-q", "85", jpg_tmp, "-o", webp_path],
                    capture_output=True, check=True
                )
                os.remove(jpg_tmp)
                size_kb = os.path.getsize(webp_path) / 1024
                print(f"    {suffix}: {size_kb:.0f} KB")
            except (subprocess.CalledProcessError, FileNotFoundError):
                # cwebp not available — rename jpg as fallback
                final = os.path.join(WEBSITE_IMAGES_DIR, f"{base}-{suffix}.jpg")
                os.rename(jpg_tmp, final)
                size_kb = os.path.getsize(final) / 1024
                print(f"    {suffix}: {size_kb:.0f} KB (jpg fallback)")


def main():
    all_images = BLOG_IMAGES + GALLERY_IMAGES

    print("=" * 60)
    print("  MANAH GROUP — Media Page Image Generator")
    print(f"  Model: {IMAGE_MODEL}")
    print(f"  Blog images: {len(BLOG_IMAGES)}")
    print(f"  Gallery images: {len(GALLERY_IMAGES)}")
    print(f"  Total: {len(all_images)}")
    print(f"  Est. cost: ~${len(all_images) * 0.03:.2f}")
    print("=" * 60)

    # ─── Phase 1: Generate Images ───
    print(f"\n{'─' * 60}")
    print("  PHASE 1: Generating Images (FLUX 2 Pro)")
    print(f"{'─' * 60}\n")

    results = []
    for i, prompt in enumerate(all_images):
        print(f"\n[{i+1}/{len(all_images)}] ────────────────────────")
        result = generate_image(prompt)
        results.append(result)

    success = sum(1 for r in results if r["status"] in ("success", "skipped"))
    errors = sum(1 for r in results if r["status"] == "error")
    print(f"\n  Results: {success} ready, {errors} errors")

    # ─── Phase 2: Optimize & Copy to Website ───
    print(f"\n{'─' * 60}")
    print("  PHASE 2: Optimizing for Web (responsive WebP)")
    print(f"{'─' * 60}\n")

    for prompt in all_images:
        src = os.path.join(OUTPUT_DIR, prompt["filename"])
        if os.path.exists(src):
            # Convert filename from .jpg to .png for website
            dest = prompt["filename"].replace(".jpg", ".png")
            copy_and_optimize(src, dest)

    # ─── Summary ───
    print("\n" + "=" * 60)
    print("  COMPLETE")
    print(f"  Generated: {success} images | Errors: {errors}")
    print(f"  Output: {OUTPUT_DIR}")
    print(f"  Website: {WEBSITE_IMAGES_DIR}")
    print("=" * 60)

    # Save log
    log_path = os.path.join(OUTPUT_DIR, "..", "media_generation_log.json")
    os.makedirs(os.path.dirname(log_path), exist_ok=True)
    with open(log_path, "w") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "model": IMAGE_MODEL,
            "results": results,
        }, f, indent=2)


if __name__ == "__main__":
    main()

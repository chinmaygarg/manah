#!/usr/bin/env python3
"""
Manah Group — Project Image Generator
Generates unique images for projects that currently share category-based images.
Uses Google Gemini via AI Studio API.
"""

import os
import sys
import json
import base64
import time
import urllib.request

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
if not GOOGLE_API_KEY:
    print("ERROR: GOOGLE_API_KEY not set in .env")
    sys.exit(1)

IMAGE_MODEL = os.getenv("IMAGE_MODEL", "gemini-3.1-flash-image-preview")
IMAGE_MODEL_FALLBACK = os.getenv("IMAGE_MODEL_FALLBACK", "gemini-2.5-flash-image")
API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

OUTPUT_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/projects"

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

PROJECT_IMAGES = [
    {
        "id": "gis_substation",
        "filename": "gis_substation.png",
        "prompt": (
            BRAND_STYLE +
            "Modern Gas-Insulated Switchgear (GIS) substation interior. Rows of silver metallic "
            "GIS enclosures with bus ducts and cable terminations. Control panels with digital "
            "displays showing SCADA data. Clean, industrial environment with bright overhead "
            "lighting. High-voltage electrical infrastructure. Professional engineering facility. "
            "Aspect ratio: 16:9."
        ),
    },
    {
        "id": "wind_solar_hybrid",
        "filename": "wind_solar_hybrid.png",
        "prompt": (
            BRAND_STYLE +
            "Dramatic aerial view of a hybrid wind-solar renewable energy park. Large wind "
            "turbines spinning above rows of solar panels stretching to the horizon. Battery "
            "energy storage containers visible at the edge. Golden hour with warm sunlight "
            "on the solar panels and long turbine shadows. Vast scale, Indian landscape. "
            "Aspect ratio: 16:9."
        ),
    },
    {
        "id": "component_mro",
        "filename": "component_mro.png",
        "prompt": (
            BRAND_STYLE +
            "Aircraft avionics and hydraulics component repair workshop. Technicians in clean "
            "white coats working at well-organized test benches with precision instruments. "
            "Disassembled aviation components, circuit boards, and hydraulic actuators on work "
            "surfaces. Bright, clean laboratory-like environment. Precision aerospace engineering. "
            "Aspect ratio: 16:9."
        ),
    },
]


def generate_with_model(model, prompt, retries=2):
    """Call Google AI Studio generateContent API for image generation."""
    url = f"{API_BASE}/{model}:generateContent?key={GOOGLE_API_KEY}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }

    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode(),
                headers={"Content-Type": "application/json"}
            )
            resp = urllib.request.urlopen(req, timeout=180)
            data = json.loads(resp.read())

            for part in data.get("candidates", [{}])[0].get("content", {}).get("parts", []):
                if "inlineData" in part:
                    return {
                        "data": base64.b64decode(part["inlineData"]["data"]),
                        "mime": part["inlineData"]["mimeType"],
                    }
            return None

        except urllib.error.HTTPError as e:
            if e.code == 503 and attempt < retries - 1:
                print(f"    503 from {model}, retrying in 5s...")
                time.sleep(5)
                continue
            body = e.read().decode()[:200]
            raise RuntimeError(f"HTTP {e.code}: {body}")

    return None


def generate_image(img_data):
    """Generate a single project image."""
    out_path = os.path.join(OUTPUT_DIR, img_data["filename"])

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {img_data['filename']}")
        return "skipped"

    print(f"  Generating: {img_data['id']}...")

    for model in [IMAGE_MODEL, IMAGE_MODEL_FALLBACK]:
        try:
            print(f"    Trying: {model}")
            result = generate_with_model(model, img_data["prompt"])

            if result:
                os.makedirs(OUTPUT_DIR, exist_ok=True)
                with open(out_path, "wb") as f:
                    f.write(result["data"])

                size_kb = len(result["data"]) / 1024
                print(f"    Saved: {img_data['filename']} ({size_kb:.0f} KB)")
                return "success"
            else:
                print(f"    No image from {model}")

        except Exception as e:
            print(f"    Error with {model}: {str(e)[:150]}")

    return "error"


def main():
    print("=" * 60)
    print("  Generating Unique Project Images (Google Gemini)")
    print(f"  Images: {len(PROJECT_IMAGES)}")
    print(f"  Output: {OUTPUT_DIR}")
    print("=" * 60)

    results = []
    for i, img in enumerate(PROJECT_IMAGES):
        print(f"\n[{i+1}/{len(PROJECT_IMAGES)}] {img['id']}")
        status = generate_image(img)
        results.append(status)
        if status == "success":
            time.sleep(2)

    success = results.count("success")
    errors = results.count("error")
    skipped = results.count("skipped")
    print(f"\n{'=' * 60}")
    print(f"  Done: {success} generated, {skipped} skipped, {errors} errors")
    print("=" * 60)


if __name__ == "__main__":
    main()

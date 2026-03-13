#!/usr/bin/env python3
"""
Manah Group — Sector Image Generator
Generates unique images for division sector cards using Google Gemini.
Outputs directly to website/public/images/sectors/.
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

WEBSITE_SECTORS_DIR = "/Users/chinmay/Desktop/Manah/website/public/images/sectors"

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

SECTOR_IMAGES = [
    {
        "id": "general_aviation",
        "filename": "general_aviation.png",
        "prompt": (
            BRAND_STYLE +
            "Sleek white business jet parked on a private airport tarmac at golden hour. "
            "Small turboprop aircraft visible in the background. Executive aviation terminal "
            "with glass facade reflecting sunset. Ground crew preparing the aircraft. "
            "Polished, exclusive, premium feel. Private aviation luxury. Aspect ratio: 3:4."
        ),
    },
    {
        "id": "helicopter_mro",
        "filename": "helicopter_mro.png",
        "prompt": (
            BRAND_STYLE +
            "Military helicopter undergoing maintenance inside a well-lit industrial hangar. "
            "Rotor blades partially disassembled. Technicians in coveralls inspecting the "
            "engine compartment with specialized tools. Hydraulic lifts and test equipment "
            "surrounding the aircraft. Professional rotary-wing MRO facility. "
            "Precision engineering atmosphere. Aspect ratio: 3:4."
        ),
    },
    {
        "id": "telecom_equipment",
        "filename": "telecom_equipment.png",
        "prompt": (
            BRAND_STYLE +
            "Modern 5G telecommunications tower against a dramatic twilight sky. Close-up "
            "angle showing antenna arrays and radio units. Fiber optic cables with glowing "
            "connection points. City lights visible in the background bokeh. "
            "High-tech infrastructure, connectivity, digital communication. Aspect ratio: 3:4."
        ),
    },
    {
        "id": "industrial_iot",
        "filename": "industrial_iot.png",
        "prompt": (
            BRAND_STYLE +
            "Smart factory floor with robotic arms and IoT sensor arrays. Digital displays "
            "showing real-time production data. Blue LED indicator lights on connected devices. "
            "Automated manufacturing line with precision assembly. Industry 4.0 atmosphere. "
            "Technology-forward, futuristic industrial automation. Aspect ratio: 3:4."
        ),
    },
    {
        "id": "real_estate",
        "filename": "real_estate.png",
        "prompt": (
            BRAND_STYLE +
            "Stunning modern commercial high-rise building at blue hour with interior lights "
            "glowing warm gold. Glass and steel facade reflecting the evening sky. "
            "Landscaped plaza with water features at the base. Premium mixed-use development. "
            "Architectural photography, dramatic upward perspective. Aspect ratio: 3:4."
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
                        "model": model,
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
    """Generate a single sector image."""
    out_path = os.path.join(WEBSITE_SECTORS_DIR, img_data["filename"])

    if os.path.exists(out_path):
        print(f"  SKIP (exists): {img_data['filename']}")
        return "skipped"

    print(f"  Generating: {img_data['id']}...")

    models = [IMAGE_MODEL, IMAGE_MODEL_FALLBACK]
    for model in models:
        try:
            print(f"    Trying: {model}")
            result = generate_with_model(model, img_data["prompt"])

            if result:
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, "wb") as f:
                    f.write(result["data"])

                size_kb = len(result["data"]) / 1024
                print(f"    Saved: {img_data['filename']} ({size_kb:.0f} KB) via {model}")
                return "success"
            else:
                print(f"    No image from {model}")

        except Exception as e:
            print(f"    Error with {model}: {str(e)[:150]}")

    print(f"    FAILED: {img_data['id']}")
    return "error"


def main():
    print("=" * 60)
    print("  Generating Unique Sector Images (Google Gemini)")
    print(f"  Primary: {IMAGE_MODEL}")
    print(f"  Fallback: {IMAGE_MODEL_FALLBACK}")
    print(f"  Images: {len(SECTOR_IMAGES)}")
    print(f"  Output: {WEBSITE_SECTORS_DIR}")
    print("=" * 60)

    results = []
    for i, img in enumerate(SECTOR_IMAGES):
        print(f"\n[{i+1}/{len(SECTOR_IMAGES)}] {img['id']}")
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

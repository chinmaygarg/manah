#!/usr/bin/env python3
"""Generate images for Tech & Manufacturing division slides — Gen AI and Data Center."""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai not installed. Run: pip install google-genai")
    sys.exit(1)

API_KEY = os.getenv("GOOGLE_API_KEY", "")
IMAGE_MODEL = os.getenv("IMAGEN_MODEL", "imagen-4.0-fast-generate-001")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'presentation', 'images')

PROMPTS = [
    {
        "id": "gen_ai_hero",
        "filename": "gen_ai_hero.png",
        "prompt": (
            "A futuristic visualization of generative AI and large language models. "
            "Glowing neural network nodes connected by light streams, holographic data visualization, "
            "a sleek modern server room with blue and gold ambient lighting. "
            "Abstract digital brain with flowing data patterns. "
            "Professional corporate style, dark navy background with gold and blue accents. "
            "Ultra-modern, cinematic lighting, 8K quality, no text or watermarks."
        ),
        "aspect_ratio": "16:9",
    },
    {
        "id": "data_center_hero",
        "filename": "data_center_hero.png",
        "prompt": (
            "A state-of-the-art hyperscale data center facility interior. "
            "Rows of modern server racks with blue LED status lights, "
            "clean raised floor with cold aisle containment, fiber optic cables glowing. "
            "Professional industrial photography, dramatic overhead lighting. "
            "Dark navy and blue tones with warm gold accent lighting. "
            "Ultra-modern colocation facility, cinematic, 8K quality, no text or watermarks."
        ),
        "aspect_ratio": "16:9",
    },
]


def main():
    if not API_KEY:
        print("ERROR: GOOGLE_API_KEY not set in .env")
        sys.exit(1)

    client = genai.Client(api_key=API_KEY)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for p in PROMPTS:
        filepath = os.path.join(OUTPUT_DIR, p["filename"])
        if os.path.exists(filepath):
            print(f"SKIP (exists): {p['filename']}")
            continue

        print(f"Generating: {p['id']}...")
        try:
            response = client.models.generate_images(
                model=IMAGE_MODEL,
                prompt=p["prompt"],
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio=p["aspect_ratio"],
                    safety_filter_level="BLOCK_LOW_AND_ABOVE",
                    person_generation="ALLOW_ADULT",
                    output_mime_type="image/png",
                ),
            )

            if response.generated_images and len(response.generated_images) > 0:
                response.generated_images[0].image.save(filepath)
                size = os.path.getsize(filepath) / 1024
                print(f"Saved: {filepath} ({size:.1f} KB)")
            else:
                print(f"No image returned for: {p['id']}")
        except Exception as e:
            print(f"Error generating {p['id']}: {e}")


if __name__ == "__main__":
    main()

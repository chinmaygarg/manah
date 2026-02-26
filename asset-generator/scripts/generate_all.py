#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════
MANAH GROUP — Master Asset Generation Orchestrator
═══════════════════════════════════════════════════════════════
Generates all images and submits all video generation requests
for the Manah Group website in the optimal order.

Usage:
    python scripts/generate_all.py            # Generate everything
    python scripts/generate_all.py --images   # Images only
    python scripts/generate_all.py --videos   # Videos only
    python scripts/generate_all.py --dry-run  # Preview all prompts
    python scripts/generate_all.py --status   # Check generation status
═══════════════════════════════════════════════════════════════
"""

import os
import sys
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prompts import get_summary, get_all_image_prompts, get_all_video_prompts

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, '..', 'output')


def check_status():
    """Check the current status of all generated assets."""
    img_dir = os.path.join(OUTPUT_DIR, 'images')
    vid_dir = os.path.join(OUTPUT_DIR, 'videos')

    all_images = get_all_image_prompts()
    all_videos = get_all_video_prompts()

    print("\n" + "=" * 60)
    print("  MANAH GROUP — Asset Generation Status")
    print("=" * 60)

    # Check images
    img_done = 0
    img_missing = []
    for p in all_images:
        filepath = os.path.join(img_dir, p["filename"])
        if os.path.exists(filepath):
            img_done += 1
        else:
            img_missing.append(p)

    print(f"\n  📸 Images: {img_done}/{len(all_images)} generated")
    if img_missing:
        print(f"     Missing:")
        for p in img_missing:
            print(f"       - {p['id']} ({p['purpose']})")

    # Check videos
    vid_done = 0
    vid_missing = []
    for p in all_videos:
        filepath = os.path.join(vid_dir, p["filename"])
        if os.path.exists(filepath):
            vid_done += 1
        else:
            vid_missing.append(p)

    print(f"\n  🎬 Videos: {vid_done}/{len(all_videos)} generated")
    if vid_missing:
        print(f"     Missing:")
        for p in vid_missing:
            print(f"       - {p['id']} ({p['purpose']})")

    # Check pending operations
    ops_file = os.path.join(OUTPUT_DIR, 'pending_video_operations.json')
    if os.path.exists(ops_file):
        with open(ops_file) as f:
            pending = json.load(f)
        if pending:
            print(f"\n  ⏳ Pending video operations: {len(pending)}")
            for vid_id, data in pending.items():
                print(f"       - {vid_id} (submitted: {data.get('submitted_at', 'unknown')})")

    # Check logs
    img_log = os.path.join(OUTPUT_DIR, 'image_generation_log.json')
    if os.path.exists(img_log):
        with open(img_log) as f:
            log = json.load(f)
        errors = log.get("errors", 0)
        if errors > 0:
            print(f"\n  ⚠️  Last image run had {errors} error(s)")

    total = len(all_images) + len(all_videos)
    done = img_done + vid_done
    print(f"\n  Overall: {done}/{total} assets ready ({done/total*100:.0f}%)")
    print("=" * 60 + "\n")


def run_generation(images_only=False, videos_only=False, dry_run=False):
    """Run the complete generation pipeline."""
    get_summary()

    scripts_dir = os.path.dirname(os.path.abspath(__file__))
    flag = "--dry-run" if dry_run else ""

    if not videos_only:
        print("\n" + "=" * 60)
        print("  PHASE 1: Image Generation")
        print("=" * 60 + "\n")

        # Generate images in priority order
        priority_order = ["hero", "divisions", "sectors", "about", "sustainability", "careers", "partners", "ui-elements"]
        for category in priority_order:
            print(f"\n  ─── Category: {category.upper()} ───")
            cmd = f"python {os.path.join(scripts_dir, 'generate_images.py')} --category {category} {flag}".strip()
            subprocess.run(cmd, shell=True)

    if not images_only:
        print("\n" + "=" * 60)
        print("  PHASE 2: Video Generation (Async)")
        print("=" * 60 + "\n")

        cmd = f"python {os.path.join(scripts_dir, 'generate_videos.py')} {flag}".strip()
        subprocess.run(cmd, shell=True)

    if not dry_run:
        print("\n" + "=" * 60)
        print("  GENERATION PIPELINE COMPLETE")
        print("=" * 60)
        print("\n  📸 Images are saved to: output/images/")
        print("  🎬 Videos are processing asynchronously.")
        print("     Check video status with:")
        print("     python scripts/generate_videos.py --poll")
        print("     or")
        print("     python scripts/generate_all.py --status")
        print("=" * 60 + "\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manah Group — Master Asset Generator")
    parser.add_argument("--images", "-i", action="store_true", help="Generate images only")
    parser.add_argument("--videos", "-v", action="store_true", help="Generate videos only")
    parser.add_argument("--dry-run", "-d", action="store_true", help="Preview all prompts")
    parser.add_argument("--status", "-s", action="store_true", help="Check generation status")
    args = parser.parse_args()

    if args.status:
        check_status()
    else:
        run_generation(images_only=args.images, videos_only=args.videos, dry_run=args.dry_run)

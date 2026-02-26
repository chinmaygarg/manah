#!/bin/bash
# ═══════════════════════════════════════════════════════════
# MANAH GROUP — Asset Generation Quick Start
# ═══════════════════════════════════════════════════════════
# Run from: /Manah/asset-generator/
# Usage:
#   ./run.sh              → Generate everything (images + videos)
#   ./run.sh images       → Generate images only
#   ./run.sh videos       → Generate videos only
#   ./run.sh dry-run      → Preview without generating
#   ./run.sh copy         → Copy generated assets to website
# ═══════════════════════════════════════════════════════════

set -e
cd "$(dirname "$0")"

# Install deps if needed
pip install -q google-genai python-dotenv 2>/dev/null || pip install -q google-genai python-dotenv --break-system-packages

echo ""
echo "══════════════════════════════════════"
echo "  MANAH GROUP — Asset Generator"
echo "══════════════════════════════════════"
echo ""

case "${1:-all}" in
  images)
    python scripts/generate_images.py
    ;;
  videos)
    python scripts/generate_videos.py
    ;;
  dry-run)
    python scripts/generate_images.py --dry-run
    echo ""
    python scripts/generate_videos.py --dry-run
    ;;
  copy)
    echo "Copying assets to website/public/images..."
    DEST="../website/public/images"
    mkdir -p "$DEST"
    if [ -d "output/images" ]; then
      cp -r output/images/* "$DEST/" 2>/dev/null || true
      echo "✅ Images copied to $DEST"
    else
      echo "⚠️  No images found in output/images/"
    fi
    if [ -d "output/videos" ]; then
      VDEST="../website/public/videos"
      mkdir -p "$VDEST"
      cp -r output/videos/* "$VDEST/" 2>/dev/null || true
      echo "✅ Videos copied to $VDEST"
    else
      echo "⚠️  No videos found in output/videos/"
    fi
    ;;
  all)
    python scripts/generate_images.py
    echo ""
    echo "── Images done. Starting videos... ──"
    echo ""
    python scripts/generate_videos.py
    echo ""
    echo "── All done! Run './run.sh copy' to move assets to website ──"
    ;;
  *)
    echo "Usage: ./run.sh [images|videos|dry-run|copy|all]"
    ;;
esac

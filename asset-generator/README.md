# Manah Group — Website Asset Generator

AI-powered image and video generation pipeline for the Manah Group website using Google's Imagen 3 and Veo 2 models.

## Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Add your API key to .env file
# Open .env and paste your Google AI Studio key

# 3. Preview all prompts (no API calls)
python scripts/generate_all.py --dry-run
```

## Usage

### Generate Everything
```bash
python scripts/generate_all.py          # All images + submit videos
python scripts/generate_all.py --images # Images only
python scripts/generate_all.py --videos # Videos only
```

### Generate by Category
```bash
python scripts/generate_images.py --category hero
python scripts/generate_images.py --category divisions
python scripts/generate_images.py --category sectors
python scripts/generate_videos.py --category hero
```

### Generate Single Asset
```bash
python scripts/generate_images.py --id hero_main_01
python scripts/generate_videos.py --id video_hero_main
```

### Check Status
```bash
python scripts/generate_all.py --status    # Overall status
python scripts/generate_videos.py --poll   # Poll pending videos
```

### List All Assets
```bash
python scripts/generate_images.py --list   # List all image IDs
python scripts/generate_videos.py --list   # List all video IDs
python scripts/prompts.py                  # Print summary
```

## Output Structure

```
output/
├── images/
│   ├── hero/              # 4 homepage hero backgrounds
│   ├── divisions/         # 8 business division images
│   ├── sectors/           # 7 sector page heroes
│   ├── about/             # 4 about page images
│   ├── sustainability/    # 3 sustainability images
│   ├── careers/           # 4 careers page images
│   ├── partners/          # 1 partners page image
│   └── ui-elements/       # 4 background patterns/textures
├── videos/
│   ├── hero/              # 3 homepage hero loops (8s each)
│   ├── about/             # 1 company story video (12s)
│   ├── divisions/         # 2 division background videos
│   └── careers/           # 1 culture reel (12s)
└── image_generation_log.json
```

## Asset Count

| Category       | Images | Videos |
|---------------|--------|--------|
| Hero          | 4      | 3      |
| Divisions     | 8      | 2      |
| Sectors       | 7      | —      |
| About         | 4      | 1      |
| Sustainability| 3      | —      |
| Careers       | 4      | 1      |
| Partners      | 1      | —      |
| UI Elements   | 4      | —      |
| **Total**     | **35** | **7**  |

## Notes

- Images that already exist are skipped (safe to re-run)
- Videos are generated asynchronously — use `--poll` to check
- Rate limiting is built in (10 images/min, 4 videos/min)
- All prompts include Manah brand colors: Navy #0A1628, Gold #C8A96E

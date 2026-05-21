# Manah Group — Website Asset Generator

AI-powered image and video generation pipeline for the Manah Group website.

**Current pipeline: Replicate (FLUX-2-Pro).** New images are generated through
Replicate — see [Replicate pipeline](#replicate-pipeline-current) below. The
legacy Google Imagen / Veo scripts (`generate_images.py`, `generate_videos.py`)
are kept for reference but are no longer the default.

## Setup

```bash
# 1. Install dependencies
pip3 install replicate python-dotenv

# 2. Add credentials to .env
#    Replicate (current):  REPLICATE_API_TOKEN, REPLICATE_IMAGE_MODEL
#    Legacy Google:        GOOGLE_API_KEY

# 3. cwebp is needed to optimize generated images
brew install webp
```

## Replicate pipeline (current)

New imagery is generated with one focused script per feature/batch — each holds
its own prompt list, generates via `replicate.run()` using `REPLICATE_IMAGE_MODEL`
(default `black-forest-labs/flux-2-pro`), converts the result to optimized WebP
with `cwebp`, and writes it **straight into `website/public/images/...`**.

```bash
python3 scripts/generate_dynamics.py            # Dynamics division imagery
python3 scripts/generate_dynamics.py --list     # list this batch's asset ids
python3 scripts/generate_dynamics.py --id <id>  # regenerate one asset
python3 scripts/generate_dynamics.py --force    # regenerate even if it exists
python3 scripts/generate_project_flux.py        # /projects page imagery
python3 scripts/generate_new_sectors.py         # sector hero imagery
```

After generating, run `npm run gen:blur` in `website/` so the new images get
blur placeholders, and commit the updated `src/lib/blur-map.ts`.

To add a new batch, copy `generate_dynamics.py`, swap in new prompts, and point
the output directory at the right `public/images/` subfolder.

## Legacy Google pipeline

The commands below use the older Google Imagen / Veo scripts.

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

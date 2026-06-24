# Manah Group — Monorepo Claude Guide

## Deployments

This repo contains **two independent Vercel deployments**:

| Directory | Deployment | Framework |
|-----------|-----------|-----------|
| `website/` | Main corporate site | Next.js 16 |
| `presentation/` | Investor presentation | Reveal.js (static) |

They deploy and run **independently** — never assume one has access to the other at runtime.

### Presentation build (`presentation/build.js`)

`presentation/` references website assets locally via `../website/public/` paths.
At build time, `build.js`:
- Copies `website/public/images/` → `dist/assets/images/`
- Rewrites all `../website/public/` → `/assets/` in HTML/JS

So the deployed presentation is fully self-contained.

## Image formats

All images in `website/public/images/` are **`.webp`** (optimised by the asset-generator pipeline).
Local presentation-only images in `presentation/images/` are **`.png`** and are fine as-is.

**Never reference `website/public/images/` files with `.png` or `.jpg` extensions** — those don't exist. Always use `.webp`.

See `website/CLAUDE.md` for website-specific guidance (blur maps, Next.js build, SEO).

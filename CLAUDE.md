# Manah Group — Monorepo Claude Guide

## Deployments

This repo contains several **independent Vercel deployments**:

| Directory | Deployment | Framework |
|-----------|-----------|-----------|
| `website/` | Main corporate site | Next.js 16 |
| `presentation/` | Investor presentation | Reveal.js (static) |
| `liberin-presentations/saudi/` | Liberin Saudi deck | Reveal.js (static) |
| `liberin-presentations/smolan/` | Liberin Smolan capabilities deck | Reveal.js (static) |
| `liberin-presentations/technologies/` | Liberin Technologies deck | PDF/screenshot capture only, not deployed |

They deploy and run **independently** — never assume one has access to the other at runtime.

### Presentation build (`presentation/build.js`, `liberin-presentations/saudi/build.js`)

`presentation/` and `liberin-presentations/saudi/` reference website assets locally via a relative `website/public/` path (two levels up from `liberin-presentations/saudi/`, one level up from `presentation/`).
At build time, `build.js`:
- Copies `website/public/images/` → `dist/assets/images/`
- Rewrites all `../website/public/` references → `/assets/` in HTML/JS

So the deployed presentation is fully self-contained. `liberin-presentations/smolan/` is self-contained already (no website asset references), but its `node_modules` is a symlink to `../../presentation/node_modules` — keep that relative depth in mind if it's ever moved again.

## Image formats

All images in `website/public/images/` are **`.webp`** (optimised by the asset-generator pipeline).
Local presentation-only images in `presentation/images/` are **`.png`** and are fine as-is.

**Never reference `website/public/images/` files with `.png` or `.jpg` extensions** — those don't exist. Always use `.webp`.

See `website/CLAUDE.md` for website-specific guidance (blur maps, Next.js build, SEO).

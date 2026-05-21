# Manah Group Website

Corporate marketing site for Manah Group — Next.js 16, React 19, Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run gen:blur` | Regenerate image blur placeholders |

## Images

Content photos use `<BlurImage>` (`src/components/ui/BlurImage.tsx`), which
shows a real blurred preview (LQIP) of the photo while the full image loads.
Previews are stored in the generated file `src/lib/blur-map.ts`.

**After adding or replacing any image in `public/images/`, run:**

```bash
npm run gen:blur
```

`npm run build` runs this automatically (via the `prebuild` script), but run
it manually during development so placeholders show up in `npm run dev`.
Commit the updated `src/lib/blur-map.ts`.

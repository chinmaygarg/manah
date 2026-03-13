/* ═══════════════════════════════════════════════════════════
   Blur placeholder utilities for Next.js Image component
   ═══════════════════════════════════════════════════════════ */

/**
 * Generates a shimmer SVG as a base64-encoded data URL for use
 * as a `blurDataURL` with Next.js `<Image placeholder="blur">`.
 *
 * Uses Manah brand navy (#0A1628) with a subtle shimmer animation
 * encoded directly in the SVG for a polished loading experience.
 */

const toBase64 = (str: string): string =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function shimmerSvg(w: number, h: number): string {
  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A1628" />
      <stop offset="50%" stop-color="#142238" />
      <stop offset="100%" stop-color="#0A1628" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0A1628" />
  <rect width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite" />
  </rect>
</svg>`.trim();
}

/**
 * Returns a base64 data URL for use as `blurDataURL`.
 * The dimensions only affect the SVG viewbox — the placeholder
 * scales to fill the Image container regardless.
 */
export function shimmerBlur(w = 16, h = 9): string {
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg(w, h))}`;
}

/** Pre-computed blur data URL for common use (16:9 aspect ratio) */
export const BLUR_DATA_URL = shimmerBlur();

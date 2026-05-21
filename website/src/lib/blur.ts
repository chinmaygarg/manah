/* ═══════════════════════════════════════════════════════════
   Blur placeholder utilities for Next.js Image component
   ═══════════════════════════════════════════════════════════ */

import { BLUR_MAP } from "./blur-map";

/**
 * Generates a shimmer SVG as a base64-encoded data URL for use
 * as a `blurDataURL` with Next.js `<Image placeholder="blur">`.
 *
 * Uses a soft neutral tone (manah-gray) so a missing-map image
 * never flashes a dark box on light pages — this is the fallback
 * only; real per-image LQIPs come from BLUR_MAP via `blurFor`.
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
      <stop offset="0%" stop-color="#ECECE6" />
      <stop offset="50%" stop-color="#F7F7F2" />
      <stop offset="100%" stop-color="#ECECE6" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ECECE6" />
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

/** Pre-computed neutral shimmer — fallback for images without an LQIP. */
export const BLUR_DATA_URL = shimmerBlur();

/**
 * Resolves the real blurred preview (LQIP) for an image `src`,
 * falling back to the neutral shimmer when no entry exists.
 * String paths are looked up in the auto-generated BLUR_MAP.
 */
export function blurFor(src: unknown): string {
  return typeof src === "string" && BLUR_MAP[src] ? BLUR_MAP[src] : BLUR_DATA_URL;
}

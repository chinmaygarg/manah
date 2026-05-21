import type { NextConfig } from "next";

/* ───────────────────────────────────────────────────────────
   Content Security Policy
   'unsafe-inline' is retained because Next.js injects inline
   bootstrap scripts/styles and is not nonce-based here.
   'unsafe-eval' is removed in production — Next does not need it.
   In development it is added so webpack React Fast Refresh
   (which evaluates HMR payloads via eval) is not blocked by CSP.

   LH_LOCAL_TEST=1 drops HTTPS-only headers (HSTS,
   upgrade-insecure-requests) so the build can be audited over
   plain HTTP on localhost. Never set it in production.
   ─────────────────────────────────────────────────────────── */
const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://www.googletagmanager.com",
].join(" ");

const CSP = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "media-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(process.env.LH_LOCAL_TEST ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
  },
  redirects: async () => [
    { source: "/divisions/technology", destination: "/divisions/ai", permanent: true },
    { source: "/sectors/bess-scada", destination: "/sectors/energy-storage", permanent: true },
    { source: "/sectors/infrastructure", destination: "/sectors/building-roads", permanent: true },
    { source: "/sectors/green-hydrogen", destination: "/divisions/green-energy", permanent: true },
    { source: "/sectors/manufacturing", destination: "/divisions/dynamics", permanent: true },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ...(process.env.LH_LOCAL_TEST
          ? []
          : [
              {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains; preload",
              },
            ]),
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
        },
        { key: "Content-Security-Policy", value: CSP },
      ],
    },
  ],
};

export default nextConfig;

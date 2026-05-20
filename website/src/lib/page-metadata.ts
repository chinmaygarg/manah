import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/* ═══════════════════════════════════════════════════════════
   Shared per-page metadata builder.
   Keeps title / description / canonical / Open Graph / Twitter
   consistent across every route. metadataBase is set in the
   root layout, so relative paths resolve to absolute URLs.
   ═══════════════════════════════════════════════════════════ */

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: SITE_CONFIG.name,
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_CONFIG.shortName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

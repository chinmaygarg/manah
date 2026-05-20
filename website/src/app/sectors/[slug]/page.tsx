import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTOR_DETAILS } from "@/lib/sectors-data";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import SectorDetailContent from "./SectorDetailContent";

// ─── Static Params (pre-render every sector) ───

export function generateStaticParams() {
  return Object.keys(SECTOR_DETAILS).map((slug) => ({ slug }));
}

// ─── SEO Metadata ───

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTOR_DETAILS[slug];

  if (!sector) {
    return { title: "Sector Not Found" };
  }

  const fullTitle = `${sector.title} | ${SITE_CONFIG.shortName}`;

  return {
    title: sector.title,
    description: sector.heroDescription,
    alternates: {
      canonical: `/sectors/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: `${SITE_CONFIG.url}/sectors/${slug}`,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description: sector.heroDescription,
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: sector.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: sector.heroDescription,
      images: ["/og-image.jpg"],
    },
  };
}

// ─── Page (server component) ───

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = SECTOR_DETAILS[slug];

  if (!sector) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Sectors", href: "/sectors" },
          { name: sector.title, href: `/sectors/${slug}` },
        ]}
      />
      <SectorDetailContent slug={slug} />
    </>
  );
}

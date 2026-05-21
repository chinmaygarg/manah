import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DIVISION_DETAILS } from "@/lib/divisions-data";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import DivisionDetailContent from "./DivisionDetailContent";

// ─── Static Params (pre-render every division) ───

export function generateStaticParams() {
  return Object.keys(DIVISION_DETAILS).map((slug) => ({ slug }));
}

// ─── SEO Metadata ───

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = DIVISION_DETAILS[slug];

  if (!division) {
    return { title: "Division Not Found" };
  }

  const fullTitle = `${division.name} | ${SITE_CONFIG.shortName}`;

  return {
    title: division.name,
    description: division.heroDescription,
    alternates: {
      canonical: `/divisions/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: `${SITE_CONFIG.url}/divisions/${slug}`,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description: division.heroDescription,
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: division.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: division.heroDescription,
      images: ["/og-image.jpg"],
    },
  };
}

// ─── Page (server component) ───

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const division = DIVISION_DETAILS[slug];

  if (!division) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Divisions", href: "/divisions" },
          { name: division.name, href: `/divisions/${slug}` },
        ]}
      />
      <ServiceJsonLd
        name={division.name}
        description={division.heroDescription}
        path={`/divisions/${slug}`}
        services={division.services ?? division.pillars?.flatMap((p) => p.services)}
      />
      {division.faqItems && division.faqItems.length > 0 && (
        <FaqJsonLd items={division.faqItems} />
      )}
      <DivisionDetailContent slug={slug} />
    </>
  );
}

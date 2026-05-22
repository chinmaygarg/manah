import { SITE_CONFIG } from "@/lib/constants";

/* ═══════════════════════════════════════════════════════════
   JSON-LD structured data.
   All payloads are built from hardcoded site data — never user
   input. JsonLdScript is the single place that injects raw HTML;
   it escapes "<" so a stray "</script>" in any string can never
   break out of the <script> tag.
   ═══════════════════════════════════════════════════════════ */

function JsonLdScript({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo_250.webp`,
    description: SITE_CONFIG.description,
    slogan: SITE_CONFIG.tagline,
    knowsAbout: [
      "Engineering, Procurement and Construction",
      "Power transmission and distribution",
      "Renewable energy",
      "Green hydrogen",
      "Nuclear energy and Small Modular Reactors",
      "Aviation MRO",
      "Generative AI and data centers",
      "Strategic investments",
    ],
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5th Floor, Trendz Platina, 91/12, Madhapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-73867-45553",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.twitter,
      SITE_CONFIG.socials.youtube,
    ],
    industry: "Engineering, Procurement and Construction",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 500,
      maxValue: 2000,
    },
  };

  return <JsonLdScript data={schema} />;
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };

  return <JsonLdScript data={schema} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };

  return <JsonLdScript data={schema} />;
}

/**
 * Service schema for division and sector detail pages. Each page describes an
 * EPC service offering — `services` is mapped to an OfferCatalog so search and
 * answer engines can surface the individual capabilities.
 */
export function ServiceJsonLd({
  name,
  description,
  path,
  services,
}: {
  name: string;
  description: string;
  path: string;
  services?: readonly { title: string; description: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "Engineering, Procurement and Construction",
    url: `${SITE_CONFIG.url}${path}`,
    areaServed: { "@type": "Country", name: "India" },
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    ...(services && services.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${name} — Services`,
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.title,
                description: s.description,
              },
            })),
          },
        }
      : {}),
  };

  return <JsonLdScript data={schema} />;
}

/** FAQPage schema — reusable across blog posts and landing pages. */
export function FaqJsonLd({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <JsonLdScript data={schema} />;
}

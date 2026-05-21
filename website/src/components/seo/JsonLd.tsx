import { SITE_CONFIG } from "@/lib/constants";

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
      SITE_CONFIG.socials.instagram,
    ],
    industry: "Engineering, Procurement and Construction",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 500,
      maxValue: 2000,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

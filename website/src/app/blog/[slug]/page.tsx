import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, ALL_BLOG_ARTICLES } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import BlogPostContent from "./BlogPostContent";

// ─── Static Params (pre-render all blog posts) ───

export function generateStaticParams() {
  return ALL_BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

// ─── SEO Metadata ───

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES[slug];

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: [...article.metaKeywords],
    authors: [{ name: article.author.name }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      url: `${SITE_CONFIG.url}/blog/${slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.isoDate,
      authors: [article.author.name],
      tags: [...article.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [`${SITE_CONFIG.url}${article.image}`],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

// ─── JSON-LD Structured Data ───
// Note: dangerouslySetInnerHTML is safe here — content is hardcoded from our own
// data files, not user input. This follows the standard Next.js pattern for JSON-LD
// and matches the existing JsonLd.tsx component in this project.

function ArticleJsonLd({
  article,
  slug,
}: {
  article: (typeof ALL_BLOG_ARTICLES)[number];
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: `${SITE_CONFIG.url}${article.image}`,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: {
      "@type": "Organization",
      name: article.author.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
    wordCount: article.content
      .filter((b) => b.type === "text")
      .reduce((sum, b) => sum + (b.type === "text" ? b.content.split(" ").length : 0), 0),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQJsonLd({
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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page Component ───

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = BLOG_ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Structured Data */}
      <ArticleJsonLd article={article} slug={slug} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: article.title, href: `/blog/${slug}` },
        ]}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <FAQJsonLd items={article.faqItems} />
      )}

      {/* Client Content */}
      <BlogPostContent article={article} />
    </>
  );
}

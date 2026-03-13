"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
} from "@/lib/animations";
import MotionSection from "@/components/animations/MotionSection";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsletterCTA from "@/components/sections/NewsletterCTA";
import {
  type BlogArticle,
  type ContentBlock,
  ALL_BLOG_ARTICLES,
} from "@/lib/blog-data";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ChevronRight,
  CheckCircle2,
  Share2,
  Link2,
  ChevronDown,
} from "lucide-react";

// ─── Content Block Renderer ───

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "text":
      return (
        <MotionSection key={index}>
          <p className="text-manah-gray-600 text-body-md leading-relaxed mb-6">
            {block.content}
          </p>
        </MotionSection>
      );

    case "heading":
      return block.level === 2 ? (
        <MotionSection key={index}>
          <h2
            id={block.content
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}
            className="font-display text-heading-xl font-bold text-manah-navy mt-12 mb-4"
          >
            {block.content}
          </h2>
        </MotionSection>
      ) : (
        <MotionSection key={index}>
          <h3
            id={block.content
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}
            className="font-display text-heading-lg font-semibold text-manah-navy mt-8 mb-3"
          >
            {block.content}
          </h3>
        </MotionSection>
      );

    case "image":
      return (
        <MotionSection key={index}>
          <figure className="my-10">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            {block.caption && (
              <figcaption className="mt-3 text-caption text-manah-gray-400 text-center">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </MotionSection>
      );

    case "quote":
      return (
        <MotionSection key={index}>
          <blockquote className="my-10 border-l-4 border-manah-gold bg-manah-gold/5 p-6 md:p-8 rounded-r-xl">
            <p className="text-manah-navy text-body-lg italic leading-relaxed mb-3">
              &ldquo;{block.content}&rdquo;
            </p>
            {block.attribution && (
              <cite className="text-manah-gray-500 text-body-sm not-italic font-medium">
                — {block.attribution}
              </cite>
            )}
          </blockquote>
        </MotionSection>
      );

    case "keyTakeaways":
      return (
        <MotionSection key={index}>
          <div className="my-10 bg-manah-gray-50 rounded-2xl p-8 border border-manah-gray-200/60">
            <h3 className="font-display text-heading-md font-bold text-manah-navy mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-manah-gold" />
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-manah-gold mt-1 shrink-0" />
                  <span className="text-manah-gray-600 text-body-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>
      );

    case "list":
      return (
        <MotionSection key={index}>
          {block.style === "numbered" ? (
            <ol className="my-6 space-y-3 list-none">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-manah-gold/10 text-manah-gold text-caption font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-manah-gray-600 text-body-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="my-6 space-y-2.5">
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-manah-gray-600 text-body-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-manah-gold mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </MotionSection>
      );

    default:
      return null;
  }
}

// ─── Share Buttons ───

function ShareBar({ title }: { readonly title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing — button still provides visual feedback via copied state
    }
  };

  const handleShareLinkedIn = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShareTwitter = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-manah-gray-400 text-body-sm font-medium flex items-center gap-1.5">
        <Share2 className="w-4 h-4" />
        Share
      </span>
      <button
        onClick={handleShareLinkedIn}
        className="w-9 h-9 rounded-full bg-manah-gray-100 hover:bg-manah-gold/10 flex items-center justify-center text-manah-gray-500 hover:text-manah-gold transition-colors duration-300 cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
      <button
        onClick={handleShareTwitter}
        className="w-9 h-9 rounded-full bg-manah-gray-100 hover:bg-manah-gold/10 flex items-center justify-center text-manah-gray-500 hover:text-manah-gold transition-colors duration-300 cursor-pointer"
        aria-label="Share on X (Twitter)"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={handleCopyLink}
        className={`h-9 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
          copied
            ? "bg-manah-gold/10 text-manah-gold px-3 gap-1.5"
            : "bg-manah-gray-100 hover:bg-manah-gold/10 text-manah-gray-500 hover:text-manah-gold w-9"
        }`}
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
        {copied && <span className="text-caption font-medium">Copied!</span>}
      </button>
    </div>
  );
}

// ─── FAQ Accordion (AEO) ───

function FAQSection({
  items,
}: {
  readonly items: readonly { question: string; answer: string }[];
}) {
  return (
    <MotionSection>
      <div className="my-10 bg-manah-gray-50 rounded-2xl p-8 border border-manah-gray-200/60">
        <h2 className="font-display text-heading-lg font-bold text-manah-navy mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-manah-gray-200/60 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer text-manah-navy font-semibold text-body-md hover:text-manah-gold transition-colors duration-300 list-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="w-4 h-4 shrink-0 text-manah-gray-400 group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-5">
                <p className="text-manah-gray-600 text-body-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

// ─── Related Article Card ───

function RelatedArticleCard({ article }: { readonly article: BlogArticle }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-manah-gray-200/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/20 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-manah-navy text-caption font-semibold rounded-full">
            {article.category}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-caption text-manah-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-manah-gray-300" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
          <h3 className="font-display text-heading-md font-bold text-manah-navy mb-3 line-clamp-2 group-hover:text-manah-gold transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-manah-gray-500 text-body-sm line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

// ─── Main Component ───

export default function BlogPostContent({
  article,
}: {
  readonly article: BlogArticle;
}) {
  const relatedArticles = useMemo(() => {
    const sameCategoryArticles = ALL_BLOG_ARTICLES.filter(
      (a) => a.category === article.category && a.slug !== article.slug
    );
    const otherArticles = ALL_BLOG_ARTICLES.filter(
      (a) => a.category !== article.category && a.slug !== article.slug
    );
    return [...sameCategoryArticles, ...otherArticles].slice(0, 3);
  }, [article.category, article.slug]);

  return (
    <main>
      {/* ─── Article Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <Image
          src={article.image}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-manah-navy/80 via-manah-navy/50 to-manah-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/60 via-transparent to-manah-navy/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,169,110,0.12),transparent_60%)]" />

        <div className="relative z-10 section-container py-24 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp}
              className="flex items-center gap-2 text-white/60 text-body-sm mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/blog"
                className="hover:text-white transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white line-clamp-1">{article.title}</span>
            </motion.nav>

            {/* Category Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-block px-3 py-1 bg-manah-gold/20 text-manah-gold text-caption font-semibold rounded-full mb-4">
                {article.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl font-bold mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Metadata */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 text-body-sm text-manah-gray-300"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.isoDate}>{article.date}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author.name}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Article Body ─── */}
      <article className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Content Blocks */}
            {article.content.map((block, i) => renderContentBlock(block, i))}

            {/* FAQ Section (AEO) */}
            {article.faqItems && article.faqItems.length > 0 && (
              <FAQSection items={article.faqItems} />
            )}

            {/* Tags */}
            <MotionSection>
              <div className="mt-12 pt-8 border-t border-manah-gray-200/60">
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-manah-gray-100 text-manah-gray-600 text-caption rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share Bar */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-manah-gold font-semibold text-body-sm hover:gap-3 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </Link>
                  <ShareBar title={article.title} />
                </div>
              </div>
            </MotionSection>

            {/* Author Bio */}
            <MotionSection>
              <div className="mt-12 bg-manah-gray-50 rounded-2xl p-8 border border-manah-gray-200/60 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-manah-navy flex items-center justify-center shrink-0">
                  <span className="text-white font-display font-bold text-heading-md">
                    {article.author.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-manah-navy text-heading-md">
                    {article.author.name}
                  </p>
                  <p className="text-manah-gray-500 text-body-sm">
                    {article.author.role}
                  </p>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </article>

      {/* ─── Related Articles ─── */}
      {relatedArticles.length > 0 && (
        <section className="section-padding bg-manah-gray-50">
          <div className="section-container">
            <SectionHeading
              eyebrow="Related"
              title="You May Also Like"
              description="Continue exploring insights from The Manah Journal."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {relatedArticles.map((related) => (
                <MotionSection key={related.slug}>
                  <RelatedArticleCard article={related} />
                </MotionSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Newsletter CTA ─── */}
      <NewsletterCTA />
    </main>
  );
}

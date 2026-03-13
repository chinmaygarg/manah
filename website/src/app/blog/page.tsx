"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import NewsletterCTA from "@/components/sections/NewsletterCTA";
import {
  FEATURED_BLOG_ARTICLE,
  ALL_BLOG_ARTICLES,
} from "@/lib/blog-data";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const CATEGORIES = [
  "All",
  "Industry Insights",
  "Sustainability",
  "Technology",
  "Company News",
  "Aviation",
] as const;

// Exclude featured article from the grid
const GRID_ARTICLES = ALL_BLOG_ARTICLES.filter(
  (a) => a.slug !== FEATURED_BLOG_ARTICLE.slug
);

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredArticles = useMemo(
    () =>
      activeCategory === "All"
        ? GRID_ARTICLES
        : GRID_ARTICLES.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        {/* Background image */}
        <Image
          src="/images/hero/hero_main_infrastructure.png"
          alt="Manah Group blog — thought leadership and industry insights"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-manah-navy/80 via-manah-navy/50 to-manah-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/60 via-transparent to-manah-navy/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,169,110,0.12),transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 section-container py-24 md:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4"
            >
              Insights &amp; Perspectives
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl font-bold mb-6"
            >
              The Manah{" "}
              <span className="text-gradient-gold">Journal</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg max-w-2xl"
            >
              Thought leadership at the intersection of infrastructure,
              energy, and technology. Expert analysis, project insights, and
              industry outlook from the teams building tomorrow.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Featured"
            title="Editor's Pick"
            align="left"
          />
          <MotionSection>
            <Link
              href={`/blog/${FEATURED_BLOG_ARTICLE.slug}`}
              className="group block"
            >
              <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-manah-gray-200/60 shadow-card group-hover:shadow-card-hover transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                  <Image
                    src={FEATURED_BLOG_ARTICLE.image}
                    alt={FEATURED_BLOG_ARTICLE.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-manah-navy/5" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-manah-gold/10 text-manah-gold text-caption font-semibold rounded-full mb-4 w-fit">
                    {FEATURED_BLOG_ARTICLE.category}
                  </span>
                  <h2 className="font-display text-heading-xl md:text-display-sm font-bold text-manah-navy mb-4 leading-tight group-hover:text-manah-gold transition-colors duration-300">
                    {FEATURED_BLOG_ARTICLE.title}
                  </h2>
                  <p className="text-manah-gray-500 text-body-md mb-6 leading-relaxed">
                    {FEATURED_BLOG_ARTICLE.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-caption text-manah-gray-400 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {FEATURED_BLOG_ARTICLE.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {FEATURED_BLOG_ARTICLE.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {FEATURED_BLOG_ARTICLE.author.name}
                    </span>
                  </div>
                  <span className="btn-primary w-fit">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* ─── Category Filter + Article Grid ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <SectionHeading
            eyebrow="Browse"
            title="All Articles"
            description="Deep dives into the trends, technologies, and milestones shaping global infrastructure."
          />

          {/* Filter Bar */}
          <MotionSection className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-body-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === category
                      ? "bg-manah-gold text-manah-navy shadow-gold"
                      : "bg-white text-manah-gray-500 border border-manah-gray-200/60 hover:border-manah-gold/40 hover:text-manah-navy"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </MotionSection>

          {/* Article Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="bg-white rounded-2xl overflow-hidden border border-manah-gray-200/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 h-full"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        loading="eager"
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

                    {/* Card Content */}
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
                      <p className="text-manah-gray-500 text-body-sm line-clamp-3 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-caption text-manah-gray-400">
                          {article.author.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-manah-gold font-semibold text-body-sm group-hover:gap-2 transition-all duration-300">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 text-manah-gray-300 mx-auto mb-4" />
              <p className="text-manah-gray-500 text-body-lg">
                No articles found in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-manah-gold font-semibold text-body-sm hover:underline cursor-pointer"
              >
                View all articles
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Newsletter CTA ─── */}
      <NewsletterCTA />
    </main>
  );
}

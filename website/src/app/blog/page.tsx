"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Mail,
  Search,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface Article {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly readTime: string;
  readonly author: string;
  readonly excerpt: string;
  readonly image: string;
}

const CATEGORIES = [
  "All",
  "Industry Insights",
  "Sustainability",
  "Technology",
  "Company News",
  "Aviation",
] as const;

const FEATURED_ARTICLE: Article = {
  id: 0,
  title:
    "India's Power Transmission Modernization: A $50 Billion Opportunity",
  category: "Industry Insights",
  date: "February 15, 2026",
  readTime: "8 min read",
  author: "Manah Research Team",
  excerpt:
    "India's power transmission network requires an estimated $50 billion in investment over the next decade to integrate 500 GW of renewable energy capacity. With ageing 220kV corridors struggling to handle bidirectional power flows, the shift to 765kV and HVDC super-highways is no longer optional — it is an engineering imperative that will redefine how the nation moves electrons from source to load.",
  image: "/images/news/power-transmission.jpg",
};

const ARTICLES: readonly Article[] = [
  {
    id: 1,
    title: "Green Hydrogen: The Missing Piece in India's Net Zero Puzzle",
    category: "Sustainability",
    date: "January 28, 2026",
    readTime: "6 min read",
    author: "Manah Green Energy Division",
    excerpt:
      "As India targets 5 million tonnes of green hydrogen production annually by 2030, the EPC ecosystem must rapidly scale electrolyzer manufacturing, water treatment infrastructure, and dedicated renewable energy corridors to make the National Green Hydrogen Mission a reality.",
    image: "/images/news/green-hydrogen.jpg",
  },
  {
    id: 2,
    title:
      "How Defence Electronics Manufacturing is Reshaping Make in India",
    category: "Technology",
    date: "January 15, 2026",
    readTime: "7 min read",
    author: "Manah Technology Division",
    excerpt:
      "The defence electronics segment is witnessing unprecedented growth as India's offset policies drive local manufacturing of radar subsystems, electronic warfare suites, and avionics. Companies with SMT lines capable of military-grade soldering standards are positioned to capture a $12 billion addressable market.",
    image: "/images/sectors/defence_electronics.png",
  },
  {
    id: 3,
    title:
      "765kV Transmission Lines: Engineering Challenges and Solutions",
    category: "Industry Insights",
    date: "January 5, 2026",
    readTime: "10 min read",
    author: "Manah Dynamics Engineering Team",
    excerpt:
      "Designing and constructing 765kV extra-high-voltage transmission lines presents unique engineering challenges — from tower foundation design in varying soil conditions to sag-tension calculations for long-span crossings. This deep-dive explores how modern simulation tools and field engineering practices are overcoming these hurdles.",
    image: "/images/sectors/power_transmission.png",
  },
  {
    id: 4,
    title: "Manah Aerospace Achieves EASA Part 145 Certification",
    category: "Company News",
    date: "December 20, 2025",
    readTime: "4 min read",
    author: "Manah Aerospace Division",
    excerpt:
      "A landmark achievement for our aviation division — EASA Part 145 approval enables Manah Aerospace to service aircraft registered in European Union member states, significantly expanding our addressable MRO market beyond DGCA-registered fleets.",
    image: "/images/news/aerospace-mro.jpg",
  },
  {
    id: 5,
    title:
      "The Future of Solar EPC: Bifacial Modules and Tracker Innovation",
    category: "Sustainability",
    date: "December 8, 2025",
    readTime: "6 min read",
    author: "Manah Renewable Energy Team",
    excerpt:
      "Bifacial solar modules paired with single-axis trackers are delivering 15-25% higher energy yields compared to fixed-tilt monofacial installations. For EPC contractors, this shift demands new design methodologies for ground clearance, albedo optimization, and tracker foundation engineering.",
    image: "/images/sectors/renewable_energy.png",
  },
  {
    id: 6,
    title: "Smart Grid Technologies Transforming Power Distribution",
    category: "Technology",
    date: "November 25, 2025",
    readTime: "8 min read",
    author: "Manah Research Team",
    excerpt:
      "The convergence of IoT sensors, advanced metering infrastructure, and AI-driven load forecasting is transforming passive distribution networks into intelligent, self-healing grids. Utilities investing in these technologies are seeing 30% reductions in aggregate technical and commercial losses.",
    image: "/images/news/power-transmission.jpg",
  },
  {
    id: 7,
    title:
      "Aviation MRO in India: Growth Drivers and Market Outlook",
    category: "Aviation",
    date: "November 12, 2025",
    readTime: "7 min read",
    author: "Manah Aerospace Division",
    excerpt:
      "India's commercial aviation fleet is projected to exceed 1,500 aircraft by 2030, creating a $4 billion annual MRO demand. With over 85% of heavy maintenance currently outsourced overseas, the opportunity for domestic MRO facilities with global certifications is immense and immediate.",
    image: "/images/hero/hero_aviation_mro.png",
  },
  {
    id: 8,
    title: "ESG Reporting: Why Infrastructure Companies Must Lead",
    category: "Sustainability",
    date: "October 30, 2025",
    readTime: "5 min read",
    author: "Manah Corporate Strategy",
    excerpt:
      "With SEBI's BRSR framework mandating ESG disclosures for the top 1,000 listed companies, infrastructure and EPC firms face heightened scrutiny on carbon emissions, water usage, and supply chain ethics. Companies that embed ESG into project delivery — not just annual reports — will win more bids.",
    image: "/images/news/green-hydrogen.jpg",
  },
  {
    id: 9,
    title:
      "From Prototype to Production: Inside Our Electronics Manufacturing Facility",
    category: "Company News",
    date: "October 15, 2025",
    readTime: "6 min read",
    author: "Manah Technology Division",
    excerpt:
      "A behind-the-scenes look at Manah's electronics manufacturing services facility — from eight SMT production lines running 0201 components at 80,000 placements per hour to automated optical inspection systems achieving 99.97% defect detection rates on complex PCB assemblies.",
    image: "/images/sectors/manufacturing.png",
  },
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [email, setEmail] = useState("");

  const filteredArticles = useMemo(
    () =>
      activeCategory === "All"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(200,169,110,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(30,58,95,0.4),transparent_50%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
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
            <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-manah-gray-200/60 shadow-card hover:shadow-card-hover transition-all duration-500">
              {/* Image */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={FEATURED_ARTICLE.image}
                  alt={FEATURED_ARTICLE.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-manah-navy/5" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-manah-gold/10 text-manah-gold text-caption font-semibold rounded-full mb-4 w-fit">
                  {FEATURED_ARTICLE.category}
                </span>
                <h2 className="font-display text-heading-xl md:text-display-sm font-bold text-manah-navy mb-4 leading-tight">
                  {FEATURED_ARTICLE.title}
                </h2>
                <p className="text-manah-gray-500 text-body-md mb-6 leading-relaxed">
                  {FEATURED_ARTICLE.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-caption text-manah-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {FEATURED_ARTICLE.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {FEATURED_ARTICLE.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {FEATURED_ARTICLE.author}
                  </span>
                </div>
                <button className="btn-primary w-fit">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
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
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group bg-white rounded-2xl overflow-hidden border border-manah-gray-200/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
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
                        {article.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-manah-gold font-semibold text-body-sm group-hover:gap-2 transition-all duration-300 cursor-pointer">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
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
      <section className="section-padding bg-manah-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,169,110,0.08),transparent_70%)]" />
        <div className="section-container relative z-10">
          <MotionSection className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-manah-gold-light font-semibold text-body-sm tracking-widest uppercase mb-4">
              Newsletter
            </span>
            <h2 className="font-display text-display-sm md:text-display-md font-bold mb-4">
              Stay Ahead of{" "}
              <span className="text-gradient-gold">Industry Trends</span>
            </h2>
            <p className="text-manah-gray-300 text-body-lg mb-8 max-w-lg mx-auto">
              Subscribe to The Manah Journal for curated insights on
              infrastructure, energy transitions, and technology
              breakthroughs delivered straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-manah-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-manah-gray-400 text-body-sm focus:outline-none focus:border-manah-gold/60 focus:ring-1 focus:ring-manah-gold/30 transition-all duration-300"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-caption text-manah-gray-400">
              Monthly digest. No spam. Unsubscribe anytime.
            </p>
          </MotionSection>
        </div>
      </section>
    </main>
  );
}

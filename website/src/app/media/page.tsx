"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface BlogArticle {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  readonly date: string;
  readonly category: string;
  readonly excerpt: string;
  readonly readTime: string;
  readonly image: string;
}

interface GalleryItem {
  readonly id: number;
  readonly title: string;
  readonly category: "Projects" | "Team" | "Events";
  readonly image: string;
  readonly featured?: boolean;
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const TABS = ["Press Releases", "News", "Blog & Insights", "Gallery"] as const;

const GALLERY_FILTERS = ["All", "Projects", "Team", "Events"] as const;

const PRESS_RELEASES = [
  {
    id: 1,
    title: "Manah Group Secures $12M Transmission Line Contract",
    date: "January 15, 2025",
    excerpt:
      "Manah Dynamics awarded turnkey EPC contract for 400kV double circuit transmission line spanning 180 kilometres.",
  },
  {
    id: 2,
    title: "Manah Aerospace Obtains EASA Part 145 Certification",
    date: "December 8, 2024",
    excerpt:
      "Manah Aerospace achieves European Aviation Safety Agency certification, enabling servicing of international carriers at our facilities.",
  },
  {
    id: 3,
    title: "Green Energy Division Commissions 5 TPD Hydrogen Pilot Plant",
    date: "November 20, 2024",
    excerpt:
      "Our latest green hydrogen facility begins operations with PEM electrolyzer technology.",
  },
  {
    id: 4,
    title:
      "Manah Group Named 'Fastest Growing EPC Company' at Infrastructure Awards",
    date: "October 5, 2024",
    excerpt:
      "Recognition for 500%+ year-over-year growth and diversified project portfolio spanning multiple sectors.",
  },
] as const;

const NEWS = [
  {
    id: 1,
    title:
      "The Global Green Hydrogen Push Creates Opportunities for EPC Players",
    source: "Economic Times",
    date: "January 22, 2025",
    excerpt:
      "Leading EPC companies including Manah Group are positioning to capitalize on green hydrogen missions worldwide.",
  },
  {
    id: 2,
    title: "Strategic Manufacturing: Defence Electronics Sees Record Growth",
    source: "Business Standard",
    date: "December 15, 2024",
    excerpt:
      "Electronics manufacturing services companies report surging orders as defence indigenization accelerates.",
  },
  {
    id: 3,
    title: "Global MRO Industry Poised for Exponential Growth",
    source: "Aviation Week",
    date: "November 10, 2024",
    excerpt:
      "The burgeoning global aviation sector drives demand for expanded MRO capabilities and infrastructure.",
  },
] as const;

const BLOG: readonly BlogArticle[] = [
  {
    id: 1,
    title: "The Future of Global Green Hydrogen: Challenges and Opportunities",
    author: "Mr. Mohendra Kumar Pati",
    date: "January 28, 2025",
    category: "Green Energy",
    excerpt:
      "An analysis of global green hydrogen ambitions, the technology landscape, and the role of EPC companies in building hydrogen infrastructure.",
    readTime: "8 min read",
    image: "/images/blog/green_hydrogen_future.png",
  },
  {
    id: 2,
    title: "Digital Twins in Infrastructure: Transforming Asset Management",
    author: "Mr. Prem Kumar",
    date: "December 20, 2024",
    category: "Technology",
    excerpt:
      "How digital twin technology is revolutionizing how we design, build, and manage large-scale infrastructure assets.",
    readTime: "6 min read",
    image: "/images/blog/digital_twins_infrastructure.png",
  },
  {
    id: 3,
    title: "Building Resilient Power Grids for the Global Energy Transition",
    author: "Cdr. Pravin Sharad Dixit (Retd.)",
    date: "November 15, 2024",
    category: "Infrastructure",
    excerpt:
      "The critical role of transmission infrastructure in integrating renewable energy into power grids worldwide.",
    readTime: "7 min read",
    image: "/images/blog/resilient_power_grids.png",
  },
];

const GALLERY: readonly GalleryItem[] = [
  {
    id: 1,
    title: "765kV Transmission Tower Construction",
    category: "Projects",
    image: "/images/gallery/transmission_tower_construction.png",
    featured: true,
  },
  {
    id: 2,
    title: "Solar Farm — Aerial View",
    category: "Projects",
    image: "/images/gallery/solar_farm_aerial.png",
  },
  {
    id: 3,
    title: "Metro Tunnel Construction",
    category: "Projects",
    image: "/images/gallery/metro_tunnel_construction.png",
  },
  {
    id: 4,
    title: "Green Hydrogen Electrolyzer Facility",
    category: "Projects",
    image: "/images/gallery/hydrogen_electrolyzer_facility.png",
  },
  {
    id: 5,
    title: "Aircraft MRO Hangar",
    category: "Projects",
    image: "/images/gallery/aircraft_mro_hangar.png",
    featured: true,
  },
  {
    id: 6,
    title: "Engineers Reviewing Blueprints",
    category: "Team",
    image: "/images/gallery/engineers_reviewing_blueprints.png",
  },
  {
    id: 7,
    title: "Electronics Manufacturing Line",
    category: "Team",
    image: "/images/gallery/electronics_manufacturing_line.png",
  },
  {
    id: 8,
    title: "Corporate Strategy Meeting",
    category: "Team",
    image: "/images/gallery/corporate_boardroom_meeting.png",
  },
  {
    id: 9,
    title: "Ground-Breaking Ceremony",
    category: "Events",
    image: "/images/gallery/groundbreaking_ceremony.png",
  },
  {
    id: 10,
    title: "Infrastructure Excellence Awards",
    category: "Events",
    image: "/images/gallery/award_ceremony.png",
  },
  {
    id: 11,
    title: "Expressway Flyover Construction",
    category: "Projects",
    image: "/images/gallery/highway_construction_aerial.png",
  },
  {
    id: 12,
    title: "Wind Farm at Dawn",
    category: "Projects",
    image: "/images/gallery/wind_farm_dawn.png",
  },
  {
    id: 13,
    title: "Safety Toolbox Briefing",
    category: "Team",
    image: "/images/gallery/safety_briefing_site.png",
  },
  {
    id: 14,
    title: "Data Center Server Room",
    category: "Projects",
    image: "/images/gallery/data_center_corridor.png",
  },
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<string>("Press Releases");
  const [galleryFilter, setGalleryFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery =
    galleryFilter === "All"
      ? GALLERY
      : GALLERY.filter((item) => item.category === galleryFilter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: 1 | -1) => {
      if (lightboxIndex === null) return;
      const next = lightboxIndex + direction;
      if (next >= 0 && next < filteredGallery.length) {
        setLightboxIndex(next);
      }
    },
    [lightboxIndex, filteredGallery.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        {/* Background image */}
        <Image
          src="/images/hero/hero_main_infrastructure.png"
          alt="Manah Group media centre — infrastructure projects and industry insights"
          fill
          className="object-cover"
          priority
          sizes="100vw"
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
              Media Centre
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl font-bold mb-6"
            >
              News &{" "}
              <span className="text-gradient-gold">Insights</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg max-w-2xl"
            >
              Stay updated with the latest from Manah Group — press releases,
              industry news, thought leadership, and media coverage.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Tab Navigation ─── */}
      <section className="bg-white border-b border-manah-gray-200 sticky top-[var(--nav-height)] z-20">
        <div className="section-container">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-body-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "border-manah-gold text-manah-navy"
                    : "border-transparent text-manah-gray-500 hover:text-manah-navy"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tab Content ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <AnimatePresence mode="wait">
            {/* ── Press Releases ── */}
            {activeTab === "Press Releases" && (
              <motion.div
                key="press"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {PRESS_RELEASES.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:shadow-card-hover transition-all duration-400"
                  >
                    <div className="flex items-center gap-2 text-caption text-manah-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                      <span className="px-2 py-0.5 bg-manah-gold/10 text-manah-gold rounded-full text-caption font-medium">
                        Press Release
                      </span>
                    </div>
                    <h3 className="font-display text-heading-md font-bold text-manah-navy mb-2 hover:text-manah-gold transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-manah-gray-500 text-body-sm">
                      {item.excerpt}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── News ── */}
            {activeTab === "News" && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {NEWS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:shadow-card-hover transition-all duration-400"
                  >
                    <div className="flex items-center gap-2 text-caption text-manah-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                      <span className="flex items-center gap-1 text-manah-accent-blue">
                        <ExternalLink className="w-3 h-3" /> {item.source}
                      </span>
                    </div>
                    <h3 className="font-display text-heading-md font-bold text-manah-navy mb-2 hover:text-manah-gold transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-manah-gray-500 text-body-sm">
                      {item.excerpt}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── Blog & Insights ── */}
            {activeTab === "Blog & Insights" && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {BLOG.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-manah-gray-200/60 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-manah-navy/10 to-manah-gold/5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/20 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-manah-navy text-caption font-semibold rounded-full">
                        {item.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-caption text-manah-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-manah-gray-300" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-heading-md font-bold text-manah-navy mb-3 line-clamp-2 group-hover:text-manah-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-manah-gray-500 text-body-sm line-clamp-3 mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-caption text-manah-gray-400">
                          <User className="w-3 h-3" />
                          {item.author}
                        </span>
                        <Link
                          href="/blog"
                          className="inline-flex items-center gap-1 text-manah-gold font-semibold text-body-sm group-hover:gap-2 transition-all duration-300"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {/* View All CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="md:col-span-2 lg:col-span-3 flex justify-center pt-4"
                >
                  <Link
                    href="/blog"
                    className="btn-primary"
                  >
                    View All Articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* ── Gallery ── */}
            {activeTab === "Gallery" && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Gallery Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <Filter className="w-4 h-4 text-manah-gray-400" />
                  {GALLERY_FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setGalleryFilter(filter)}
                      className={`px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-300 cursor-pointer ${
                        galleryFilter === filter
                          ? "bg-manah-gold text-manah-navy shadow-gold"
                          : "bg-white text-manah-gray-500 border border-manah-gray-200/60 hover:border-manah-gold/40 hover:text-manah-navy"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryFilter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {filteredGallery.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => openLightbox(i)}
                        className={`group relative rounded-xl overflow-hidden cursor-pointer ${
                          item.featured
                            ? "col-span-2 row-span-2"
                            : ""
                        }`}
                      >
                        <div
                          className={`relative w-full bg-gradient-to-br from-manah-navy/10 to-manah-gold/5 ${
                            item.featured ? "aspect-square" : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            sizes={
                              item.featured
                                ? "(max-width: 768px) 100vw, 50vw"
                                : "(max-width: 768px) 50vw, 25vw"
                            }
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/80 via-manah-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                            <span className="px-2.5 py-0.5 bg-manah-gold/90 text-manah-navy text-caption font-semibold rounded-full w-fit mb-2">
                              {item.category}
                            </span>
                            <h4 className="text-white font-display font-bold text-body-sm md:text-body-md leading-snug">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Gallery Lightbox ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-manah-navy/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation — Previous */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Navigation — Next */}
            {lightboxIndex < filteredGallery.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <span className="px-3 py-1 bg-manah-gold/90 text-manah-navy text-caption font-semibold rounded-full">
                {filteredGallery[lightboxIndex].category}
              </span>
              <h4 className="text-white font-display font-bold text-heading-md mt-3">
                {filteredGallery[lightboxIndex].title}
              </h4>
              <p className="text-white/60 text-caption mt-1">
                {lightboxIndex + 1} of {filteredGallery.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";

/* ═══════════════════════════════════════════════════
   NEWS DATA
   ═══════════════════════════════════════════════════ */

const NEWS_ITEMS = [
  {
    id: 1,
    category: "Press Release",
    date: "Feb 20, 2026",
    title: "Manah Dynamics Secures $20M Power Transmission Contract",
    excerpt:
      "The project involves 220kV transmission line construction spanning 180km across the Thar Desert region.",
    href: "/media/press-1",
    image: "/images/news/power-transmission.jpg",
  },
  {
    id: 2,
    category: "Company News",
    date: "Feb 12, 2026",
    title:
      "Manah Aerospace Achieves EASA Part-145 Certification for Wide-Body Aircraft",
    excerpt:
      "A significant milestone positioning Manah as a premier MRO destination for international carriers.",
    href: "/media/news-2",
    image: "/images/news/aerospace-mro.jpg",
  },
  {
    id: 3,
    category: "Sustainability",
    date: "Jan 30, 2026",
    title: "Green Hydrogen Pilot Plant Achieves 100 TPD Production Milestone",
    excerpt:
      "The electrolyzer facility in Gujarat has successfully demonstrated commercial-scale green H\u2082 production.",
    href: "/media/news-3",
    image: "/images/news/green-hydrogen.jpg",
  },
];

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroCardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

const stackedCardVariants = {
  hidden: { opacity: 0, x: 30, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const goldBarVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO },
  },
};

const pillVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.5, ease: EASE_OUT_EXPO },
  },
};

/* ═══════════════════════════════════════════════════
   HERO CARD — Large featured story (left)
   ═══════════════════════════════════════════════════ */

function HeroCard({ item }: { item: (typeof NEWS_ITEMS)[0] }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <motion.div ref={cardRef} variants={heroCardVariants} className="h-full">
      <Link href={item.href} className="group block h-full">
        <motion.article
          className="relative h-full min-h-[520px] lg:min-h-[600px] rounded-2xl overflow-hidden cursor-pointer"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          {/* Parallax image */}
          <motion.div
            className="absolute inset-0 -inset-y-[12%]"
            style={{ y: imageY }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent" />

          {/* Hover shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Category pill */}
          <motion.div className="absolute top-5 left-5 z-10" variants={pillVariants}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-caption font-semibold rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-manah-gold animate-pulse" />
              {item.category}
            </span>
          </motion.div>

          {/* Text content — bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
            <div className="flex items-center gap-2 text-caption text-white/70 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              {item.date}
            </div>

            <h3 className="font-display text-heading-lg lg:text-display-sm font-bold text-white mb-3 leading-tight group-hover:text-manah-gold-light transition-colors duration-300">
              {item.title}
            </h3>

            <p className="text-body-sm text-white/70 leading-relaxed line-clamp-2 mb-4 max-w-md">
              {item.excerpt}
            </p>

            <div className="inline-flex items-center gap-2 text-manah-gold text-body-sm font-semibold">
              <span className="relative">
                Read Full Story
                <span className="absolute bottom-0 left-0 w-0 h-px bg-manah-gold group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   STACKED CARD — Compact story (right side)
   ═══════════════════════════════════════════════════ */

function StackedCard({
  item,
  index,
}: {
  item: (typeof NEWS_ITEMS)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={stackedCardVariants}
      custom={index}
      className="flex-1"
    >
      <Link href={item.href} className="group block h-full">
        <motion.article
          className="relative h-full min-h-[248px] lg:min-h-[280px] rounded-2xl overflow-hidden cursor-pointer"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/25 to-transparent" />

          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Category pill */}
          <motion.div className="absolute top-4 left-4 z-10" variants={pillVariants}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-manah-gold animate-pulse" />
              {item.category}
            </span>
          </motion.div>

          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
            <div className="flex items-center gap-2 text-[11px] text-white/60 mb-2">
              <Calendar className="w-3 h-3" />
              {item.date}
            </div>

            <h3 className="font-display text-heading-sm lg:text-heading-md font-bold text-white leading-tight line-clamp-2 group-hover:text-manah-gold-light transition-colors duration-300">
              {item.title}
            </h3>

            <div className="flex items-center gap-1.5 mt-3 text-manah-gold text-[13px] font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Read More
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════ */

export default function NewsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [heroItem, ...stackedItems] = NEWS_ITEMS;

  return (
    <section ref={sectionRef} className="section-padding bg-manah-gray-50">
      <div className="section-container">
        {/* ─── Header ─── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={headingVariants}>
            <span className="inline-block text-caption font-semibold uppercase tracking-[0.15em] mb-4 text-manah-gold">
              Making Headlines
            </span>
            <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold leading-[1.08] tracking-tight text-manah-navy">
              The Momentum Continues
            </h2>
            <p className="text-body-lg text-manah-gray-600 leading-relaxed mt-4 max-w-xl">
              Latest milestones, project wins, and industry recognition driving Manah Group forward.
            </p>
            <motion.div
              className="h-1 w-12 bg-manah-gold rounded-full mt-5 origin-left"
              variants={goldBarVariants}
            />
          </motion.div>

          <motion.div variants={headingVariants}>
            <Link
              href="/media"
              className="btn-secondary shrink-0 self-start sm:self-auto"
            >
              View All News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── Magazine Grid ─── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Hero card — spans 7 columns */}
          <div className="md:col-span-7">
            <HeroCard item={heroItem} />
          </div>

          {/* Stacked cards — spans 5 columns */}
          <div className="md:col-span-5 flex flex-col gap-5 lg:gap-6">
            {stackedItems.map((item, i) => (
              <StackedCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

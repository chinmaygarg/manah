"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MILESTONES = [
  {
    year: "2018",
    text: "Incorporated with a vision to engineer at scale",
    accent: "Origin",
  },
  {
    year: "2020",
    text: "First landmark EPC project delivered",
    accent: "Breakthrough",
  },
  {
    year: "2023",
    text: "Diversified multi-division enterprise",
    accent: "Scale",
  },
  {
    year: "2026",
    text: "Multi-continent presence & global partnerships",
    accent: "Horizon",
  },
];

export default function StorySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-manah-gray-50"
    >
      {/* ── Background layers ── */}
      {/* Subtle geometric crosshatch — pure CSS, no image dependency */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0A1628 1px, transparent 1px), linear-gradient(225deg, #0A1628 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Warm radial glow — gives the section depth without feeling flat */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-manah-gold/[0.04] rounded-full blur-[180px] translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-manah-accent-blue/[0.03] rounded-full blur-[140px] -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Fine dot grid — architectural blueprint feel */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0A1628 0.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-container relative z-10 py-24 lg:py-32 xl:py-40">
        {/* ── Top: Editorial header ── */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO_EASE }}
          >
            <div className="w-10 h-[2px] bg-manah-gold rounded-full" />
            <span className="text-manah-gold text-body-sm font-semibold tracking-[0.2em] uppercase">
              Our Story
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-semibold text-manah-navy leading-[1.08] tracking-tight mb-6"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: EXPO_EASE }}
          >
            Extraordinary Teams{" "}
            <span className="relative">
              <span className="text-gradient-gold">
                Building Inspiring Projects.
              </span>
              {/* Underline flourish */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-manah-gold via-manah-gold-light to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.7, ease: EXPO_EASE }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </motion.h2>
        </div>

        {/* ── Middle: Asymmetric content grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-start mb-20 lg:mb-28">
          {/* Left column — narrative (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.p
              className="text-body-lg text-manah-gray-600 leading-[1.7] mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: EXPO_EASE }}
            >
              When the world committed to transforming its infrastructure, energy,
              and defence landscape, Manah Group was already there — engineering
              critical systems at a pace the industry had never seen.
            </motion.p>

            <motion.p
              className="text-body-lg text-manah-gray-600 leading-[1.7] mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EXPO_EASE }}
            >
              From high-voltage transmission corridors spanning continents
              to green hydrogen facilities powering the clean energy revolution
              — we don&apos;t just build infrastructure.{" "}
              <span className="text-manah-navy font-semibold">
                We build what&apos;s next.
              </span>
            </motion.p>

            <motion.p
              className="text-body-lg text-manah-gray-600 leading-[1.7] mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: EXPO_EASE }}
            >
              Leveraging domain knowledge across sectors, we address the shift
              to clean energy and meet ambitious Net Zero goals while delivering
              projects on time and on budget.
            </motion.p>

            {/* Pillars */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EXPO_EASE }}
            >
              {["Sustainable Solutions", "Global Expertise", "On-Time Delivery", "Innovation Driven"].map((pillar) => (
                <span
                  key={pillar}
                  className="px-4 py-2 text-body-sm font-medium text-manah-navy bg-manah-gold/10 border border-manah-gold/20 rounded-full"
                >
                  {pillar}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EXPO_EASE }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-manah-navy font-semibold text-body-md hover:text-manah-gold transition-colors duration-300"
              >
                <span className="relative">
                  Discover Our Journey
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-manah-gold group-hover:w-full transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }} />
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-manah-gold/30 group-hover:bg-manah-gold group-hover:border-manah-gold transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-manah-gold group-hover:text-manah-navy transition-colors duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right column — typographic stat anchor (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 xl:col-start-8">
            <motion.div
              className="relative p-8 sm:p-10 rounded-2xl bg-white border border-manah-gray-200/80 shadow-card"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: EXPO_EASE }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-[2px] h-10 bg-manah-gold rounded-full" />
                <div className="absolute top-0 left-0 h-[2px] w-10 bg-manah-gold rounded-full" />
              </div>

              {/* Big stat number */}
              <div className="mb-6">
                <motion.span
                  className="font-display text-[4.5rem] sm:text-[5.5rem] lg:text-[6rem] font-bold leading-none tracking-tight"
                  style={{
                    background: "linear-gradient(160deg, #0A1628 30%, #C8A96E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease: EXPO_EASE }}
                >
                  500%+
                </motion.span>
              </div>

              {/* Thin separator */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-manah-gold/40 via-manah-gray-200 to-transparent mb-6"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: EXPO_EASE }}
                style={{ transformOrigin: "left" }}
              />

              <p className="font-display text-heading-md font-semibold text-manah-navy leading-snug mb-2">
                Multiple divisions. One global vision.
              </p>
              <p className="text-body-md text-manah-gray-500 leading-relaxed">
                Growth in under eight years — driven by{" "}
                <span className="text-manah-gold font-semibold">
                  Mindful Enterprising
                </span>
                , our philosophy of building with purpose, precision, and
                enduring accountability across every market we serve.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom: Milestones as progressive cards ── */}
        <div className="relative">
          {/* Thin separator */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-manah-gray-200 via-manah-gold/30 to-manah-gray-200 mb-14"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: EXPO_EASE }}
          />

          {/* Connecting timeline bar — draws across behind the cards */}
          <div className="hidden lg:block absolute top-[calc(50%+28px)] left-[5%] right-[5%] z-0">
            <motion.div
              className="h-[2px] bg-gradient-to-r from-manah-gray-200 via-manah-gold/40 to-manah-gold rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.8, ease: EXPO_EASE }}
              style={{ transformOrigin: "left" }}
            />
            {/* Animated dot traveling along the timeline */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-manah-gold shadow-[0_0_12px_rgba(200,169,110,0.6)]"
              initial={{ left: "0%", opacity: 0 }}
              animate={isInView ? { left: "100%", opacity: [0, 1, 1, 0] } : {}}
              transition={{ duration: 1.8, delay: 0.9, ease: EXPO_EASE }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 relative z-10">
            {MILESTONES.map((milestone, i) => {
              const isLatest = i === MILESTONES.length - 1;
              return (
                <motion.div
                  key={milestone.year}
                  className={`group relative rounded-2xl p-6 sm:p-7 border overflow-hidden ${
                    isLatest
                      ? "bg-manah-navy border-manah-navy shadow-glass-lg"
                      : "bg-white border-manah-gray-200/60 shadow-card hover:border-manah-gold/30"
                  }`}
                  initial={{ opacity: 0, y: 36, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.7 + i * 0.15,
                    ease: EXPO_EASE,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { duration: 0.35, ease: EXPO_EASE },
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ willChange: "transform" }}
                >
                  {/* Hover glow overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isLatest
                        ? "bg-gradient-to-br from-manah-gold/10 via-transparent to-transparent"
                        : "bg-gradient-to-br from-manah-gold/[0.06] via-transparent to-transparent"
                    }`}
                  />

                  {/* Shimmer sweep on the latest card */}
                  {isLatest && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(200,169,110,0.08) 45%, rgba(200,169,110,0.15) 50%, rgba(200,169,110,0.08) 55%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 3.5s linear infinite",
                        animationDelay: "2s",
                      }}
                    />
                  )}

                  {/* Accent pill */}
                  <motion.span
                    className={`relative inline-block text-caption font-semibold tracking-[0.15em] uppercase mb-4 px-2.5 py-1 rounded-full ${
                      isLatest
                        ? "bg-manah-gold/20 text-manah-gold"
                        : "bg-manah-gold/10 text-manah-gold/70 group-hover:bg-manah-gold/15 group-hover:text-manah-gold transition-colors duration-300"
                    }`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.9 + i * 0.15,
                      ease: EXPO_EASE,
                    }}
                  >
                    {milestone.accent}
                  </motion.span>

                  {/* Year — grows in visual weight with each milestone */}
                  <motion.span
                    className={`block font-display font-bold mb-2 leading-none ${
                      isLatest
                        ? "text-[2.75rem] sm:text-[3.25rem] text-manah-gold"
                        : "text-[2.25rem] sm:text-[2.75rem] text-manah-navy group-hover:text-manah-navy/90 transition-colors duration-300"
                    }`}
                    style={
                      isLatest
                        ? undefined
                        : { opacity: 0.6 + i * 0.15 }
                    }
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={isInView ? { opacity: isLatest ? 1 : 0.6 + i * 0.15, y: 0, filter: "blur(0px)" } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 1.0 + i * 0.15,
                      ease: EXPO_EASE,
                    }}
                  >
                    {milestone.year}
                  </motion.span>

                  {/* Description */}
                  <motion.p
                    className={`text-body-sm leading-relaxed mt-3 ${
                      isLatest ? "text-white/60" : "text-manah-gray-400 group-hover:text-manah-gray-500 transition-colors duration-300"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 1.1 + i * 0.15,
                      ease: EXPO_EASE,
                    }}
                  >
                    {milestone.text}
                  </motion.p>

                  {/* Timeline dot indicator on hover */}
                  <div
                    className={`absolute bottom-3 right-3 w-2 h-2 rounded-full transition-all duration-500 ${
                      isLatest
                        ? "bg-manah-gold/60 shadow-[0_0_8px_rgba(200,169,110,0.4)]"
                        : "bg-manah-gold/0 group-hover:bg-manah-gold/40 group-hover:shadow-[0_0_6px_rgba(200,169,110,0.3)]"
                    }`}
                  />

                  {/* Decorative corner line on latest */}
                  {isLatest && (
                    <motion.div
                      className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden rounded-br-2xl"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.4, ease: EXPO_EASE }}
                    >
                      <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-manah-gold/40 rounded-full" />
                      <div className="absolute bottom-0 right-0 h-[2px] w-8 bg-manah-gold/40 rounded-full" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Top border — subtle transition from hero's dark bg */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gray-200 to-transparent" />

      {/* Bottom gold accent line — transition into next dark section */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.8, ease: EXPO_EASE }}
      />
    </section>
  );
}

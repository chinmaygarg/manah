"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  PenTool,
  Package,
  HardHat,
  Settings,
  CheckCircle2,
} from "lucide-react";

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Phase {
  step: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  details: string[];
  tools: string[];
  color: string;
}

const PHASES: Phase[] = [
  {
    step: "01",
    title: "Engineer",
    subtitle: "Design Excellence",
    icon: PenTool,
    description:
      "Multi-discipline design engineering with BIM/3D modelling, value engineering, and digital twin integration.",
    details: [
      "Structural, electrical & mechanical design",
      "PLS-CADD, ETAP, PVsyst modelling",
      "3D BIM coordination & clash detection",
    ],
    tools: ["AutoCAD", "ETAP", "PVsyst", "STAAD Pro"],
    color: "#C8A96E",
  },
  {
    step: "02",
    title: "Procure",
    subtitle: "Strategic Sourcing",
    icon: Package,
    description:
      "Global supply chain management with vendor qualification, competitive sourcing, and logistics optimisation.",
    details: [
      "Vendor qualification & performance tracking",
      "Global sourcing for critical materials",
      "Third-party inspection at source (TPI)",
    ],
    tools: ["SAP MM", "Oracle", "TradeIndia"],
    color: "#0D9488",
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Construction at Scale",
    icon: HardHat,
    description:
      "Safety-first execution with modular construction, digital project controls, and real-time schedule tracking.",
    details: [
      "HV/EHV tower erection & conductor stringing",
      "Solar plant mounting & commissioning",
      "Heavy civil & electromechanical works",
    ],
    tools: ["Primavera P6", "Procore", "MS Project"],
    color: "#1E3A5F",
  },
  {
    step: "04",
    title: "Operate",
    subtitle: "Optimise & Sustain",
    icon: Settings,
    description:
      "Comprehensive O&M, IoT-enabled monitoring, predictive analytics, and digital twins for asset longevity.",
    details: [
      "Preventive & predictive maintenance",
      "24/7 SCADA monitoring & drone inspections",
      "AI/ML analytics & performance benchmarking",
    ],
    tools: ["Azure IoT", "SCADA", "Power BI"],
    color: "#7C3AED",
  },
];

/* ─── Extracted PhaseCard — isolates hover re-renders to single card ─── */
function PhaseCard({
  phase,
  index,
  isInView,
}: {
  phase: Phase;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = phase.icon;

  return (
    <motion.div
      className="group relative"
      role="button"
      tabIndex={0}
      aria-expanded={isHovered}
      aria-label={`Phase ${phase.step}: ${phase.title} — ${phase.subtitle}`}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.9 + index * 0.15,
        ease: EXPO_EASE,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsHovered(false);
        }
      }}
    >
      <motion.div
        className={`relative rounded-2xl border overflow-hidden transition-colors duration-500 ${
          isHovered
            ? "bg-white/[0.08] border-manah-gold/40"
            : "bg-white/[0.03] border-white/[0.08]"
        }`}
        animate={
          isHovered
            ? { y: -8, transition: { duration: 0.35, ease: EXPO_EASE } }
            : { y: 0, transition: { duration: 0.35, ease: EXPO_EASE } }
        }
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${phase.color}15, transparent 70%)`,
          }}
        />

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
          style={{ backgroundColor: phase.color, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={
            isHovered
              ? { scaleX: 1, transition: { duration: 0.4, ease: EXPO_EASE } }
              : { scaleX: 0, transition: { duration: 0.3, ease: EXPO_EASE } }
          }
        />

        <div className="relative p-7 sm:p-8">
          {/* Step number */}
          <motion.span
            className={`block font-display text-[3.5rem] font-bold leading-none tracking-tight mb-4 transition-colors duration-500 ${
              isHovered ? "text-manah-gold" : "text-white/10"
            }`}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 1.0 + index * 0.15,
              ease: EXPO_EASE,
            }}
            aria-hidden="true"
          >
            {phase.step}
          </motion.span>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
              style={{ backgroundColor: `${phase.color}20` }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: phase.color }}
                aria-hidden="true"
              />
            </div>
            <h3 className="font-display text-heading-lg font-bold text-white">
              {phase.title}
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-caption font-semibold uppercase tracking-[0.15em] text-manah-gold/60 mb-4">
            {phase.subtitle}
          </p>

          {/* Description */}
          <p className="text-body-sm text-white/50 leading-relaxed mb-4">
            {phase.description}
          </p>

          {/* Expandable details — uses clipPath for GPU-composited animation */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.35, ease: EXPO_EASE }}
              >
                {/* Detail bullets */}
                <div className="space-y-2.5 mb-5 pt-4 border-t border-white/[0.06]">
                  {phase.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: phase.color }}
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-white/60">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tool tags */}
                <div className="flex flex-wrap gap-1.5">
                  {phase.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-caption rounded-full border border-white/10 text-white/40 bg-white/[0.03]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Corner accent */}
        <div
          className={`absolute bottom-3 right-3 w-2 h-2 rounded-full transition-all duration-500 ${
            isHovered
              ? "shadow-[0_0_10px_rgba(200,169,110,0.5)]"
              : "bg-transparent"
          }`}
          style={{
            backgroundColor: isHovered ? phase.color : "transparent",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function CapabilitiesPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="capabilities-preview-heading"
      className="relative overflow-hidden bg-manah-navy"
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #C8A96E 0.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-manah-gold/[0.04] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-manah-accent-blue/[0.06] rounded-full blur-[160px] translate-x-1/4" />
      </div>

      <div className="section-container relative z-10 py-24 lg:py-32 xl:py-40">
        {/* ── Header: Editorial left-aligned ── */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO_EASE }}
          >
            <div className="w-10 h-[2px] bg-manah-gold rounded-full" />
            <span className="text-manah-gold text-body-sm font-semibold tracking-[0.2em] uppercase">
              Concept to Commissioning
            </span>
          </motion.div>

          <motion.h2
            id="capabilities-preview-heading"
            className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold text-white leading-[1.08] tracking-tight mb-6"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: EXPO_EASE }}
          >
            How We{" "}
            <span className="text-gradient-gold">Deliver</span>
          </motion.h2>

          <motion.p
            className="text-white/60 text-body-lg leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EXPO_EASE }}
          >
            Every project is a promise kept — from the first blueprint to the
            final handover, our integrated EPC capabilities cover the complete
            lifecycle.
          </motion.p>
        </div>

        {/* ── Desktop Timeline ── */}
        <div className="hidden lg:block">
          {/* Progress line container */}
          <div className="relative mb-4">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-white/[0.08] rounded-full" />
            <motion.div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] rounded-full bg-gradient-to-r from-manah-gold via-manah-gold-light to-manah-gold"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 1.8, delay: 0.6, ease: EXPO_EASE }}
            />
            {/* Traveling dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-manah-gold shadow-[0_0_16px_rgba(200,169,110,0.6)]"
              initial={{ left: "0%", opacity: 0 }}
              animate={
                isInView
                  ? { left: "100%", opacity: [0, 1, 1, 0] }
                  : {}
              }
              transition={{ duration: 2.2, delay: 0.7, ease: EXPO_EASE }}
            />

            {/* Step dots on the line */}
            <div className="relative grid grid-cols-4 gap-6">
              {PHASES.map((phase, i) => (
                <motion.div
                  key={phase.step}
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.2,
                    ease: EXPO_EASE,
                  }}
                >
                  <div className="w-4 h-4 rounded-full border-2 transition-all duration-500 bg-manah-navy border-manah-gold/40 group-hover:bg-manah-gold group-hover:border-manah-gold" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Phase Cards — items-start prevents row height from shifting on expand */}
          <div className="grid grid-cols-4 gap-6 mt-10 items-start">
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.step}
                phase={phase}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile Timeline (Vertical) ── */}
        <div className="lg:hidden">
          <div className="relative pl-8 sm:pl-12">
            {/* Vertical gold line */}
            <motion.div
              className="absolute left-3 sm:left-5 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-manah-gold via-manah-gold/50 to-manah-gold/20"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: EXPO_EASE }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-8">
              {PHASES.map((phase, i) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={phase.step}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.7 + i * 0.2,
                      ease: EXPO_EASE,
                    }}
                  >
                    {/* Dot on the line */}
                    <div className="absolute -left-8 sm:-left-12 top-8 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-manah-gold border-[3px] border-manah-navy shadow-[0_0_12px_rgba(200,169,110,0.4)]" />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-6 sm:p-7">
                      {/* Step + Title */}
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-display text-[2rem] font-bold text-manah-gold/30 leading-none" aria-hidden="true">
                          {phase.step}
                        </span>
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${phase.color}20` }}
                        >
                          <Icon
                            className="w-[18px] h-[18px]"
                            style={{ color: phase.color }}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-heading-md font-bold text-white">
                            {phase.title}
                          </h3>
                          <p className="text-caption text-manah-gold/50 font-medium uppercase tracking-wider">
                            {phase.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-body-sm text-white/50 leading-relaxed mb-4">
                        {phase.description}
                      </p>

                      {/* Always visible details on mobile */}
                      <div className="space-y-2 mb-4 pt-3 border-t border-white/[0.06]">
                        {phase.details.map((detail) => (
                          <div
                            key={detail}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2
                              className="w-3.5 h-3.5 shrink-0 mt-0.5"
                              style={{ color: phase.color }}
                              aria-hidden="true"
                            />
                            <span className="text-body-sm text-white/50">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {phase.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 text-caption rounded-full border border-white/10 text-white/35"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6, ease: EXPO_EASE }}
        >
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-3 text-manah-gold font-semibold text-body-md hover:text-manah-gold-light transition-colors duration-300"
          >
            <span className="link-underline">
              Explore All Capabilities
            </span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-manah-gold/30 group-hover:bg-manah-gold group-hover:border-manah-gold transition-all duration-300">
              <ArrowRight className="w-3.5 h-3.5 text-manah-gold group-hover:text-manah-navy transition-colors duration-300" aria-hidden="true" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── Section transition lines ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.8, ease: EXPO_EASE }}
      />
    </section>
  );
}

"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, DollarSign, LayoutGrid, Handshake } from "lucide-react";
import CounterAnimation from "@/components/animations/CounterAnimation";
import { STATS, DIVISIONS } from "@/lib/constants";

const DYNAMIC_STATS = [
  ...STATS.slice(0, 2),
  { value: DIVISIONS.length, suffix: "+", label: "Business Divisions" } as const,
  ...STATS.slice(2),
];

const STAT_ICONS = [TrendingUp, DollarSign, LayoutGrid, Handshake] as const;

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StatCard({
  stat,
  index,
  isInView,
  total,
}: {
  stat: (typeof DYNAMIC_STATS)[number];
  index: number;
  isInView: boolean;
  total: number;
}) {
  const [counterDone, setCounterDone] = useState(false);
  const Icon = STAT_ICONS[index] ?? TrendingUp;

  const handleCounterComplete = useCallback(() => {
    setCounterDone(true);
  }, []);

  const staggerDelay = 0.3 + index * 0.12;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: staggerDelay, ease: EXPO_EASE }}
    >
      {/* Card */}
      <div className="relative flex flex-col items-center text-center px-4 py-8 sm:py-10 rounded-2xl transition-all duration-500 group-hover:bg-white/[0.04]">
        {/* Icon container */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: staggerDelay + 0.15, ease: EXPO_EASE }}
        >
          {/* Outer ring */}
          <div className="w-14 h-14 rounded-xl bg-manah-gold/[0.08] border border-manah-gold/[0.15] flex items-center justify-center transition-all duration-500 group-hover:bg-manah-gold/[0.12] group-hover:border-manah-gold/25 group-hover:scale-110">
            <Icon className="w-6 h-6 text-manah-gold" strokeWidth={1.5} />
          </div>

          {/* Ambient glow on hover */}
          <div className="absolute inset-0 rounded-xl bg-manah-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Counter value */}
        <div className="relative mb-2">
          <CounterAnimation
            value={stat.value}
            prefix={"prefix" in stat ? (stat as { prefix: string }).prefix : ""}
            suffix={stat.suffix}
            className="font-display text-display-sm sm:text-display-md font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 tabular-nums"
            onComplete={handleCounterComplete}
          />
          {/* Shimmer sweep */}
          {counterDone && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <motion.div
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-manah-gold/25 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "400%" }}
                transition={{ duration: 1, ease: EXPO_EASE }}
              />
            </motion.div>
          )}
        </div>

        {/* Gold accent line */}
        <motion.div
          className="w-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-manah-gold to-transparent mb-3"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: staggerDelay + 0.4, ease: EXPO_EASE }}
        />

        {/* Label */}
        <p className="text-caption sm:text-body-sm text-white/50 font-medium uppercase tracking-[0.18em] group-hover:text-white/70 transition-colors duration-300">
          {stat.label}
        </p>
      </div>

      {/* Vertical divider (not on last item) */}
      {index < total - 1 && (
        <motion.div
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(200,169,110,0.2), transparent)",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.6, delay: staggerDelay + 0.3, ease: EXPO_EASE }}
        />
      )}
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-manah-navy overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(200,169,110,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(30,58,95,0.3),transparent_50%)]" />

      {/* Top and bottom subtle border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gold/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gold/15 to-transparent" />

      {/* Section heading */}
      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EXPO_EASE }}
        >
          <p className="text-manah-gold text-body-sm font-semibold tracking-widest uppercase mb-3">
            The Numbers Speak
          </p>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold leading-[1.08] tracking-tight text-white">
            Growth That Defines a Generation
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {DYNAMIC_STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isInView={isInView}
              total={DYNAMIC_STATS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

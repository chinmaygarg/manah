"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DIVISIONS } from "@/lib/constants";

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function DivisionsSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const division = DIVISIONS[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-manah-navy overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(200,169,110,0.5) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header row */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EXPO_EASE }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-px bg-manah-gold" />
              <span className="text-manah-gold text-caption font-semibold tracking-widest uppercase">
                Our Divisions
              </span>
            </div>
            <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold text-white leading-[1.08] tracking-tight">
              Where We Build
            </h2>
          </div>
          <p className="text-body-lg text-white/70 leading-relaxed max-w-md lg:text-right">
            Integrated divisions working as one to deliver at every frontier of
            global transformation.
          </p>
        </motion.div>

        {/* Division tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EXPO_EASE }}
        >
          {DIVISIONS.map((div, i) => {
            const isActive = i === active;
            return (
              <button
                key={div.id}
                onClick={() => setActive(i)}
                className={`relative px-5 py-2.5 rounded-full text-body-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-manah-navy"
                    : "text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDivisionTab"
                    className="absolute inset-0 bg-manah-gold rounded-full"
                    transition={{ duration: 0.4, ease: EXPO_EASE }}
                  />
                )}
                <span className="relative z-10">
                  {div.name}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Active division showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={division.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EXPO_EASE }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
              {/* Left: Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={division.image}
                  alt={division.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right: Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Tagline */}
                <div
                  className="inline-flex self-start px-3 py-1 rounded-full text-caption font-semibold mb-6"
                  style={{
                    backgroundColor: `${division.color}20`,
                    color: `color-mix(in srgb, ${division.color} 50%, white)`,
                  }}
                >
                  {division.tagline}
                </div>

                {/* Name */}
                <h3 className="font-display text-display-sm font-bold text-white mb-4">
                  {division.name}
                </h3>

                {/* Description */}
                <p className="text-body-lg text-white/60 leading-relaxed mb-8">
                  {division.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-white/10 mb-8">
                  {division.stats.map((stat) => (
                    <div key={stat.label}>
                      <p
                        className="font-display text-heading-xl font-bold mb-1"
                        style={{ color: `color-mix(in srgb, ${division.color} 50%, white)` }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-caption text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={division.href}
                  className="inline-flex items-center gap-2 self-start text-manah-gold font-semibold text-body-md group"
                >
                  Explore {division.name}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { DIVISIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function DivisionsPage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,110,0.12),transparent_60%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              Business Divisions
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Many Divisions.{" "}
              <span className="text-gradient-gold">One Vision.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg max-w-2xl">
              Manah Group operates through specialized divisions, each a centre of excellence delivering world-class solutions in its domain.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Division Cards ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="space-y-20">
            {DIVISIONS.map((division, i) => (
              <motion.div
                key={division.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
                style={{ direction: i % 2 !== 0 ? "rtl" : "ltr" }}
              >
                {/* Image placeholder */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-manah-gray-100" style={{ direction: "ltr" }}>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: `linear-gradient(135deg, ${division.color}, transparent)` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-manah-gray-400 text-body-sm">
                    {division.name} Image
                  </div>
                </div>

                {/* Content */}
                <div style={{ direction: "ltr" }}>
                  <div
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ backgroundColor: division.color }}
                  />
                  <p className="text-body-sm font-semibold tracking-widest uppercase mb-2" style={{ color: division.color }}>
                    {division.tagline}
                  </p>
                  <h2 className="font-display text-display-sm font-bold text-manah-navy mb-4">
                    {division.name}
                  </h2>
                  <p className="text-manah-gray-500 text-body-md mb-6">
                    {division.description}
                  </p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {division.stats.map((stat) => (
                      <div key={stat.label} className="text-center p-3 bg-manah-gray-50 rounded-lg">
                        <p className="font-display font-bold text-manah-navy text-heading-md">{stat.value}</p>
                        <p className="text-manah-gray-500 text-caption mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={division.href}
                    className="inline-flex items-center gap-2 font-semibold transition-colors duration-300 hover:gap-3"
                    style={{ color: division.color }}
                  >
                    Explore {division.name}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-manah-navy text-white text-center">
        <div className="section-container max-w-2xl">
          <SectionHeading
            eyebrow="Partner With Us"
            title="Ready to Start Your Project?"
            description="Our teams across every division are ready to bring your vision to life."
            mode="dark"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

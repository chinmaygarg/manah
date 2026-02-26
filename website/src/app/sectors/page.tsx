"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import { ArrowRight, Zap, Sun, Building2, Shield, Plane, Atom, Cpu } from "lucide-react";

const SECTORS = [
  {
    icon: Zap,
    slug: "power-transmission",
    title: "Power Transmission",
    description: "Design, engineering, and construction of 66kV to 765kV HV/EHV transmission lines, substations, and distribution infrastructure worldwide.",
    color: "#1E3A5F",
    highlights: ["765kV Transmission Lines", "AIS & GIS Substations", "Underground Cable Systems", "Grid Modernization"],
    image: "/images/sectors/power_transmission.png",
  },
  {
    icon: Sun,
    slug: "renewable-energy",
    title: "Renewable Energy",
    description: "Utility-scale solar parks, wind farms, and hybrid renewable energy solutions — from feasibility to commissioning and O&M.",
    color: "#F59E0B",
    highlights: ["Solar EPC (100 MW+)", "Wind Farm Development", "Hybrid Plants", "Energy Storage"],
    image: "/images/sectors/renewable_energy.png",
  },
  {
    icon: Building2,
    slug: "infrastructure",
    title: "Infrastructure",
    description: "Roads, bridges, industrial structures, and urban development projects executed with precision and adherence to the highest quality standards.",
    color: "#6B7280",
    highlights: ["Highway Construction", "Bridge Engineering", "Industrial Buildings", "Urban Infrastructure"],
    image: "/images/sectors/infrastructure.png",
  },
  {
    icon: Shield,
    slug: "defence",
    title: "Defence Electronics",
    description: "Mission-critical electronic systems for defence forces globally — from PCB assembly to complete system integration meeting military standards.",
    color: "#059669",
    highlights: ["Radar Sub-systems", "Communication Equipment", "Weapon Electronics", "Surveillance Systems"],
    image: "/images/sectors/defence_electronics.png",
  },
  {
    icon: Plane,
    slug: "aviation",
    title: "Aviation",
    description: "Aircraft MRO services, airport infrastructure, and aviation support systems ensuring safety and operational efficiency.",
    color: "#0D9488",
    highlights: ["Aircraft MRO", "Airport Infrastructure", "Ground Support", "Aviation Training"],
    image: "/images/sectors/aviation.png",
  },
  {
    icon: Atom,
    slug: "green-hydrogen",
    title: "Green Hydrogen",
    description: "Electrolyzer manufacturing, green hydrogen production facilities, and hydrogen distribution infrastructure for global net-zero goals.",
    color: "#16A34A",
    highlights: ["PEM Electrolyzers", "Hydrogen Plants", "Storage Solutions", "Fuel Cells"],
    image: "/images/sectors/green_hydrogen.png",
  },
  {
    icon: Cpu,
    slug: "manufacturing",
    title: "Manufacturing",
    description: "Electronics manufacturing services with advanced SMT lines, precision assembly, and stringent quality controls for diverse industrial applications.",
    color: "#7C3AED",
    highlights: ["SMT Assembly", "Box Build", "Testing & Validation", "NPI Support"],
    image: "/images/sectors/manufacturing.png",
  },
];

export default function SectorsPage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <Image src="/images/sectors/power_transmission.png" alt="" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(200,169,110,0.12),transparent_60%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              Sectors
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Industries We{" "}
              <span className="text-gradient-gold">Transform</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg">
              Deep sectoral expertise across power, renewables, defence, aviation, and advanced manufacturing — powering progress across industries worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Sector Grid ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECTORS.map((sector, i) => (
              <motion.div
                key={sector.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/sectors/${sector.slug}`}
                  className="group block h-full bg-white rounded-2xl border border-manah-gray-200/60 overflow-hidden hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  <div className="p-7 pt-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 -mt-10 relative bg-white shadow-card"
                    style={{ backgroundColor: `${sector.color}12` }}
                  >
                    <sector.icon className="w-7 h-7" style={{ color: sector.color }} />
                  </div>
                  <h2 className="font-display text-heading-lg font-bold text-manah-navy mb-3 group-hover:text-manah-gold transition-colors duration-300">
                    {sector.title}
                  </h2>
                  <p className="text-manah-gray-500 text-body-sm mb-5 leading-relaxed">
                    {sector.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {sector.highlights.map((h) => (
                      <span key={h} className="px-2.5 py-1 bg-manah-gray-50 text-manah-gray-600 text-caption rounded-md">
                        {h}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-manah-gold group-hover:gap-2.5 transition-all duration-300">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <MotionSection className="section-padding bg-manah-gray-50">
        <div className="section-container text-center max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Work With Us"
            title="Need Sector-Specific Solutions?"
            description="Our multidisciplinary teams bring deep domain expertise to every engagement."
          />
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}

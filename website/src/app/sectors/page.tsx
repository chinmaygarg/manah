"use client";

import Link from "next/link";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import { ArrowRight, Zap, Sun, Building2, Shield, Plane, Radio, Flame, Pickaxe, Droplets } from "lucide-react";

const SECTORS = [
  {
    icon: Zap,
    slug: "power-transmission",
    title: "Power T&D",
    description: "66kV to 765kV HV/EHV transmission lines, AIS/GIS substations, underground cable systems, and grid modernization across 15+ states.",
    color: "#1E3A5F",
    highlights: ["765kV Transmission Lines", "AIS & GIS Substations", "Underground Cable Systems", "Grid Modernization"],
    image: "/images/sectors/power_transmission.png",
  },
  {
    icon: Sun,
    slug: "renewable-energy",
    title: "Renewables",
    description: "Utility-scale solar parks, wind farms, and hybrid renewable energy plants — from feasibility through commissioning to long-term O&M.",
    color: "#F59E0B",
    highlights: ["Solar EPC (100 MW+)", "Wind Farm Development", "Hybrid Plants", "BESS Integration"],
    image: "/images/sectors/renewable_energy.png",
  },
  {
    icon: Building2,
    slug: "building-roads",
    title: "Building & Roads",
    description: "Roads, bridges, residential and industrial buildings, and urban infrastructure — built to international standards of safety and longevity.",
    color: "#6B7280",
    highlights: ["Highway Construction", "Bridge Engineering", "Residential & Military", "Urban Infrastructure"],
    image: "/images/sectors/infrastructure.png",
  },
  {
    icon: Shield,
    slug: "defence",
    title: "Defence",
    description: "Tactical communication, radar sub-systems, electronic warfare, and mission-critical defence electronics — indigenous, MIL-STD and JSS compliant.",
    color: "#059669",
    highlights: ["Tactical Comms", "Radar & EW", "Surveillance Systems", "Weapon Electronics"],
    image: "/images/sectors/defence_electronics.png",
  },
  {
    icon: Plane,
    slug: "aviation",
    title: "Aviation & MRO",
    description: "DGCA-certified business jet MRO, CAR 147 training, and aviation consultancy across 6 locations in India.",
    color: "#0D9488",
    highlights: ["Aircraft MRO", "CAR 147 Training", "Aviation Consultancy", "Jet Aviation Dubai Partner"],
    image: "/images/sectors/aviation.png",
  },
  {
    icon: Radio,
    slug: "telecom",
    title: "Telecom",
    description: "Towers, BharatNet fiber, OFC laying, and active network integration — connectivity backbone for digital India.",
    color: "#0EA5E9",
    highlights: ["GBT / RTT Towers", "BharatNet OFC", "RAN Integration", "Site O&M & NOC"],
    image: "/images/sectors/telecom_equipment.png",
  },
  {
    icon: Flame,
    slug: "oil-gas",
    title: "Oil & Gas",
    description: "Refinery allied works, cross-country pipelines, LNG terminal BoP, storage terminals, and process packages for downstream operators.",
    color: "#A16207",
    highlights: ["Refinery Allied", "Pipelines & Terminals", "LNG BoP", "Process Packages"],
    image: "/images/sectors/manufacturing.png",
  },
  {
    icon: Pickaxe,
    slug: "mining",
    title: "Mining",
    description: "Mine infrastructure, mineral processing plants, overburden removal, and overland conveyors for coal, iron ore, and non-ferrous operators.",
    color: "#92400E",
    highlights: ["Mine Infrastructure", "Processing Plants", "Conveyor Systems", "Mine Closure"],
    image: "/images/sectors/manufacturing.png",
  },
  {
    icon: Droplets,
    slug: "irrigation-water",
    title: "Irrigation & Water",
    description: "Water treatment, lift irrigation, canal networks, and sewage treatment — aligned with Jal Jeevan Mission and urban water security.",
    color: "#0891B2",
    highlights: ["Water Treatment (WTP)", "Sewage Treatment (STP)", "Lift Irrigation", "SCADA Automation"],
    image: "/images/sectors/infrastructure.png",
  },
];

export default function SectorsPage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero/hero_construction_site.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero/hero_technology-720p.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-manah-navy/80 via-manah-navy/50 to-manah-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/60 via-transparent to-manah-navy/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,169,110,0.12),transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 section-container py-24 md:py-32">
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
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
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

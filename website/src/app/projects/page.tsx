"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import CounterAnimation from "@/components/animations/CounterAnimation";
import { MapPin, Calendar, ChevronDown } from "lucide-react";

/* ─── Category → Image mapping ─── */
const CATEGORY_IMAGES: Record<string, string> = {
  "Power Transmission": "/images/sectors/power_transmission.png",
  "Renewable Energy": "/images/sectors/renewable_energy.png",
  "Infrastructure": "/images/sectors/infrastructure.png",
  "Aerospace": "/images/divisions/manah_aerospace_hero.png",
  "Green Hydrogen": "/images/sectors/green_hydrogen.png",
  "Manufacturing": "/images/sectors/manufacturing.png",
};

const FALLBACK_IMAGE = "/images/hero/hero_main_infrastructure.png";

function getProjectImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? FALLBACK_IMAGE;
}

const FILTERS = [
  "All",
  "Power Transmission",
  "Renewable Energy",
  "Infrastructure",
  "Aerospace",
  "Green Hydrogen",
  "Manufacturing",
];

const PROJECTS = [
  {
    id: 1,
    title: "400kV Double Circuit Transmission Line — Rajasthan",
    category: "Power Transmission",
    location: "Rajasthan, India",
    year: "2024",
    value: "$12M",
    description:
      "Design, supply, erection, testing, and commissioning of 180 km 400kV D/C transmission line with lattice towers.",
    featured: true,
  },
  {
    id: 2,
    title: "100 MW Solar Park EPC — Gujarat",
    category: "Renewable Energy",
    location: "Gujarat, India",
    year: "2024",
    value: "$8M",
    description:
      "Turnkey EPC for 100 MW ground-mounted solar photovoltaic plant with tracker systems and 220kV pooling station.",
    featured: true,
  },
  {
    id: 3,
    title: "DGCA-Approved MRO Hangar Facility",
    category: "Aerospace",
    location: "Hyderabad, India",
    year: "2023",
    value: "$6M",
    description:
      "Design and construction of 25,000 sq ft MRO hangar with component workshops and NDT facility.",
    featured: true,
  },
  {
    id: 4,
    title: "Green Hydrogen Pilot Plant — 5 TPD",
    category: "Green Hydrogen",
    location: "Maharashtra, India",
    year: "2024",
    value: "$4M",
    description:
      "PEM electrolyzer-based green hydrogen production facility with solar captive power and hydrogen compression.",
    featured: false,
  },
  {
    id: 5,
    title: "220kV GIS Substation — Madhya Pradesh",
    category: "Power Transmission",
    location: "Madhya Pradesh, India",
    year: "2023",
    value: "$5.5M",
    description:
      "Turnkey construction of 220kV Gas-Insulated Switchgear substation with SCADA integration.",
    featured: false,
  },
  {
    id: 6,
    title: "Defence Electronics Manufacturing Line",
    category: "Manufacturing",
    location: "Bangalore, India",
    year: "2023",
    value: "$3.5M",
    description:
      "Setup of dedicated defence electronics SMT line meeting MIL-STD quality requirements for radar sub-assemblies.",
    featured: false,
  },
  {
    id: 7,
    title: "50 MW Hybrid Wind-Solar Park",
    category: "Renewable Energy",
    location: "Karnataka, India",
    year: "2024",
    value: "$7.5M",
    description:
      "Integrated wind-solar hybrid power plant with battery energy storage system and grid-interactive inverters.",
    featured: false,
  },
  {
    id: 8,
    title: "State Highway Widening — NH-48 Section",
    category: "Infrastructure",
    location: "Rajasthan, India",
    year: "2023",
    value: "$9.5M",
    description:
      "Widening of 45 km state highway section to 4-lane divided carriageway with drainage and safety infrastructure.",
    featured: false,
  },
  {
    id: 9,
    title: "Aircraft Component MRO Centre",
    category: "Aerospace",
    location: "Delhi NCR, India",
    year: "2024",
    value: "$2M",
    description:
      "Establishment of avionics and hydraulics component repair and overhaul shop with test bench facilities.",
    featured: false,
  },
];

const HERO_STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 300, prefix: "$", suffix: "M+", label: "Portfolio Value" },
  { value: 6, suffix: "", label: "Sectors" },
  { value: 10, suffix: "+", label: "States Covered" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] bg-manah-navy text-white overflow-hidden -mt-20 pt-20 flex flex-col">
        {/* Background image */}
        <Image
          src="/images/hero/hero_main_infrastructure.png"
          alt="Transmission towers at sunset — representing Manah Group's infrastructure portfolio"
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
        <div className="relative z-10 section-container flex-1 flex flex-col justify-center pb-32 md:pb-40">
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
              Our Portfolio
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl lg:text-[4.5rem] font-bold mb-6 tracking-tight"
            >
              We Build{" "}
              <span className="text-gradient-gold">History</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-body-lg md:text-heading-lg font-light leading-relaxed max-w-2xl"
            >
              From mega transmission lines to green hydrogen plants, our
              portfolio spans the nation&apos;s most ambitious infrastructure
              endeavors.
            </motion.p>
          </motion.div>
        </div>

        {/* Stats bar — anchored to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 border-t border-white/10 bg-manah-navy/60 backdrop-blur-md"
        >
          <div className="section-container py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-display text-display-md md:text-display-lg font-bold text-white">
                    <CounterAnimation
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <p className="text-white/40 text-caption md:text-body-sm tracking-wide uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section id="featured" className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Highlights"
            title="Featured Projects"
            description="Our most impactful work across business divisions."
          />
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {PROJECTS.filter((p) => p.featured).map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-manah-gray-200/60 overflow-hidden hover:shadow-card-hover transition-all duration-500"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-manah-gray-100">
                  <Image
                    src={getProjectImage(project.category)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/40 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-manah-navy/90 text-white text-caption rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-heading-md font-bold text-manah-navy mb-3 group-hover:text-manah-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-manah-gray-500 text-body-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 text-caption text-manah-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {project.year}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-manah-gray-200/50">
                    <span className="font-display font-bold text-manah-navy">
                      {project.value}
                    </span>
                    <span className="text-manah-gray-400 text-caption ml-1">
                      Project Value
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── All Projects with Filter ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <SectionHeading
            eyebrow="Complete Portfolio"
            title="All Projects"
            description="Filter by sector to explore our diverse project portfolio."
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mt-8 mb-10">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-body-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-manah-navy text-white"
                    : "bg-white text-manah-gray-600 border border-manah-gray-200 hover:border-manah-gold/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-xl border border-manah-gray-200/60 overflow-hidden hover:shadow-card-hover transition-all duration-400"
                >
                  <div className="aspect-[2/1] relative overflow-hidden bg-manah-gray-100">
                    <Image
                      src={getProjectImage(project.category)}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/30 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-block px-2.5 py-1 bg-manah-navy/90 text-white text-caption rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2 group-hover:text-manah-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-manah-gray-500 text-body-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-caption text-manah-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {project.location}
                      </span>
                      <span className="font-semibold text-manah-navy">
                        {project.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

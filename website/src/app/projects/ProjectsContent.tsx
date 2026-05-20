"use client";

// Ongoing project portfolio — sourced from the client-approved Manah deck.

import { useState } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import CounterAnimation from "@/components/animations/CounterAnimation";
import { MapPin, Calendar, ChevronDown } from "lucide-react";

/* ─── Per-project image mapping ─── */
const PROJECT_IMAGES: Record<number, string> = {
  1: "/images/sectors/infrastructure.webp",                 // MES residential buildings
  2: "/images/sectors/power_transmission.webp",             // HESCOM smart meters
  3: "/images/projects/substation-switchyard.webp",         // PGCIL GIS substation
  4: "/images/projects/transmission-line-corridor.webp",    // PGCIL transmission line
  5: "/images/sectors/manufacturing.webp",                  // Morocco conveyor system
  6: "/images/sectors/real_estate.webp",                    // Singrauli commercial complex
  7: "/images/sectors/telecom_equipment.webp",              // BharatNet middle-mile
  8: "/images/projects/substation-control-building.webp",   // Terna Trust G+17 building
  9: "/images/sectors/infrastructure.webp",                 // MES G+2 building
  10: "/images/sectors/telecom_equipment.webp",             // BSNL 5G towers
  11: "/images/sectors/infrastructure.webp",                // NWR railway station
};

const FALLBACK_IMAGE = "/images/hero/hero_main_infrastructure.webp";

function getProjectImage(projectId: number): string {
  return PROJECT_IMAGES[projectId] ?? FALLBACK_IMAGE;
}

const FILTERS = [
  "All",
  "Civil",
  "Power Transmission",
  "Telecom",
  "Power & Metering",
  "Industrial",
  "Real Estate",
];

/* ─── Project Footprints gallery — real site photographs from the deck ─── */
const GALLERY = [
  { src: "/images/projects/kipic-storage-tank.webp", caption: "KIPIC Storage Tank — 25,000 MT Capacity" },
  { src: "/images/projects/tank-shell-erection.webp", caption: "Tank Shell Erection — Crane-Assisted Plate Lifting" },
  { src: "/images/projects/solar-panel-array.webp", caption: "Solar Panel Array — Renewable Energy Project" },
  { src: "/images/projects/storage-tank-construction.webp", caption: "Storage Tank Under Construction" },
  { src: "/images/projects/transmission-line-corridor.webp", caption: "High-Voltage Transmission Line Corridor" },
  { src: "/images/projects/substation-control-building.webp", caption: "Power Substation Control Building" },
  { src: "/images/projects/water-treatment-plant.webp", caption: "Water Treatment Plant — Settling & Filtration" },
  { src: "/images/projects/gis-switchgear-siemens.webp", caption: "Siemens GIS Switchgear Installation" },
  { src: "/images/projects/pipeline-construction.webp", caption: 'Pipeline Construction — 24", 30", 34", 36" Diameter' },
  { src: "/images/projects/transmission-tower-lines.webp", caption: "Transmission Tower & Power Lines" },
  { src: "/images/projects/gis-power-infrastructure.webp", caption: "GIS Equipment & Power Infrastructure" },
  { src: "/images/projects/substation-switchyard.webp", caption: "High-Voltage Substation Switchyard" },
  { src: "/images/projects/steel-tubular-pole.webp", caption: "Steel Tubular Transmission Pole" },
  { src: "/images/projects/pipeline-450km.webp", caption: "450 KM Pipeline — Large-Diameter Laying & Welding" },
];

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  location: string;
  status: string;
  value?: string;
  description: string;
  featured: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Four G+4 Residential Buildings — Narangi Military Station",
    category: "Civil",
    client: "Military Engineer Services (MES)",
    location: "Guwahati, Assam",
    status: "Ongoing",
    value: "₹53 Cr",
    description:
      "Construction of four G+4 residential buildings at Narangi Military Station under GE Guwahati (MES) for defence personnel housing.",
    featured: true,
  },
  {
    id: 2,
    title: "48,893 DTC Smart Meters — 6 Districts",
    category: "Power & Metering",
    client: "HESCOM",
    location: "Karnataka",
    status: "Ongoing",
    value: "₹171 Cr",
    description:
      "Supply and installation of 48,893 DTC smart meters across six districts in Karnataka, with a 5-year operations and maintenance contract under HESCOM.",
    featured: true,
  },
  {
    id: 3,
    title: "400/220 kV GIS Substation",
    category: "Power Transmission",
    client: "PGCIL, Roorkee",
    location: "Roorkee, Uttarakhand",
    status: "Ongoing",
    description:
      "Construction of a 400/220 kV gas-insulated switchgear (GIS) substation for the Power Grid Corporation of India.",
    featured: true,
  },
  {
    id: 4,
    title: "Transmission Line & Towers — 400/220 kV",
    category: "Power Transmission",
    client: "PGCIL, Roorkee",
    location: "Roorkee, Uttarakhand",
    status: "Ongoing",
    description:
      "Construction of transmission line and towers feeding the 400/220 kV GIS substation for the Power Grid Corporation of India.",
    featured: false,
  },
  {
    id: 5,
    title: "Conveyor System Construction",
    category: "Industrial",
    client: "Morocco",
    location: "Morocco",
    status: "Ongoing",
    description:
      "Construction of an industrial conveyor system — an international project delivery in Morocco.",
    featured: false,
  },
  {
    id: 6,
    title: "Commercial Complex Development",
    category: "Real Estate",
    client: "Singrauli, MP",
    location: "Singrauli, Madhya Pradesh",
    status: "Ongoing",
    description:
      "Construction and development of a commercial complex at Singrauli, Madhya Pradesh.",
    featured: false,
  },
  {
    id: 7,
    title: "Middle-Mile Network — DBOM Basis",
    category: "Telecom",
    client: "BharatNet",
    location: "India",
    status: "Ongoing",
    description:
      "Development of the middle-mile network on a Design-Build-Operate-Maintain (DBOM) basis under the BharatNet programme.",
    featured: false,
  },
  {
    id: 8,
    title: "G+17 Building, Mumbai",
    category: "Civil",
    client: "Terna Trust",
    location: "Mumbai, Maharashtra",
    status: "Ongoing",
    description:
      "Construction of a G+17 multi-storey building in Mumbai for Terna Trust.",
    featured: false,
  },
  {
    id: 9,
    title: "G+2 Building, Ahilyanagar",
    category: "Civil",
    client: "Military Engineer Services (MES)",
    location: "Ahilyanagar, Maharashtra",
    status: "Ongoing",
    description:
      "Construction of a G+2 building in Ahilyanagar for Military Engineer Services (MES).",
    featured: false,
  },
  {
    id: 10,
    title: "5G Towers across 6 States",
    category: "Telecom",
    client: "BSNL",
    location: "Six States, India",
    status: "Ongoing",
    description:
      "Construction of 5G telecom towers across six states for BSNL — strengthening the national connectivity backbone.",
    featured: false,
  },
  {
    id: 11,
    title: "Ambhaji Railway Station",
    category: "Civil",
    client: "North Western Railway (NWR)",
    location: "India",
    status: "Ongoing",
    description:
      "Construction of the Ambhaji railway station for North Western Railway (NWR).",
    featured: false,
  },
];

const HERO_STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20000, prefix: "₹", suffix: "+ Cr", label: "Project Pipeline" },
  { value: 10, suffix: "", label: "Sectors" },
  { value: 15, suffix: "+", label: "States Covered" },
];

export default function ProjectsContent() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

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
          poster="/images/hero/hero_construction_site.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero/hero_infrastructure-720p.mp4" type="video/mp4" />
        </video>

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
              Our Portfolio
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl font-bold mb-6"
            >
              We Build{" "}
              <span className="text-gradient-gold">History</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg max-w-2xl"
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
                    src={getProjectImage(project.id)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
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
                      <Calendar className="w-3.5 h-3.5" /> {project.status}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-manah-gray-200/50 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="font-display font-bold text-manah-navy">
                        {project.client}
                      </span>
                      <span className="text-manah-gray-400 text-caption ml-1">
                        Client
                      </span>
                    </div>
                    {project.value && (
                      <span className="font-display font-bold text-manah-gold whitespace-nowrap">
                        {project.value}
                      </span>
                    )}
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
                      src={getProjectImage(project.id)}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
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
                    <div className="flex items-center justify-between gap-3 text-caption text-manah-gray-400">
                      <span className="flex items-center gap-1 min-w-0">
                        <MapPin className="w-3 h-3 shrink-0" /> {project.location}
                      </span>
                      <span className="font-semibold text-manah-navy whitespace-nowrap">
                        {project.value ?? project.client}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Project Footprints Gallery ─── */}
      <section className="section-padding bg-manah-navy">
        <div className="section-container">
          <SectionHeading
            eyebrow="Project Footprints"
            title="Real Projects. Real Impact."
            description="On-site execution across India and the Middle East — power, water, oil & gas, and heavy infrastructure."
            light
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-manah-navy via-manah-navy/30 to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-white/90 text-caption leading-snug">
                  {item.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

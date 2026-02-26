"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  scaleIn,
} from "@/lib/animations";
import MotionSection from "@/components/animations/MotionSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { DIVISION_DETAILS } from "@/lib/divisions-data";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Shield,
} from "lucide-react";
import Image from "next/image";

const DIVISION_IMAGES: Record<string, { hero: string; detail: string; video?: string; videoMobile?: string }> = {
  dynamics: {
    hero: "/images/divisions/manah_dynamics_hero.png",
    detail: "/images/divisions/manah_dynamics_projects.png",
    video: "/videos/divisions/dynamics_reel-720p.mp4",
    videoMobile: "/videos/divisions/dynamics_reel-480p.mp4",
  },
  aerospace: {
    hero: "/images/divisions/manah_aerospace_hero.png",
    detail: "/images/divisions/manah_aerospace_detail.png",
  },
  "green-energy": {
    hero: "/images/divisions/green_energy_hero.png",
    detail: "/images/divisions/green_energy_hydrogen.png",
    video: "/videos/divisions/green_energy_reel-720p.mp4",
    videoMobile: "/videos/divisions/green_energy_reel-480p.mp4",
  },
  technology: {
    hero: "/images/divisions/tech_manufacturing_hero.png",
    detail: "/images/divisions/tech_manufacturing_pcb.png",
  },
  investments: {
    hero: "/images/divisions/manah_investments_hero.png",
    detail: "/images/divisions/manah_investments_detail.png",
    video: "/videos/divisions/investments_reel-720p.mp4",
    videoMobile: "/videos/divisions/investments_reel-480p.mp4",
  },
};

export default function DivisionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const division = DIVISION_DETAILS[slug];

  if (!division) {
    notFound();
  }

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative text-white overflow-hidden -mt-20 pt-20 bg-manah-navy">
        {/* Background image/video */}
        {DIVISION_IMAGES[slug] && (
          DIVISION_IMAGES[slug].video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={DIVISION_IMAGES[slug].hero}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={DIVISION_IMAGES[slug].video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={DIVISION_IMAGES[slug].hero}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )
        )}
        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-manah-navy/80 via-manah-navy/50 to-manah-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/70 via-transparent to-manah-navy/40" />
        {/* Subtle division color accent */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ background: `radial-gradient(ellipse at 70% 30%, ${division.color}, transparent 60%)` }}
        />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-white/60 text-body-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/divisions" className="hover:text-white transition-colors">Divisions</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{division.name}</span>
            </motion.nav>

            <motion.p
              variants={fadeUp}
              className="text-body-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: division.color === "#1E3A5F" ? "#C8A96E" : division.color.replace(")", ",0.8)").replace("rgb", "rgba") }}
            >
              {division.tagline}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              {division.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 text-body-lg max-w-2xl">
              {division.heroDescription}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link href={division.cta.href} className="btn-primary">
                {division.cta.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Key Stats ─── */}
      <section className="bg-white border-b border-manah-gray-200">
        <div className="section-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {division.keyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-display text-heading-xl font-bold text-manah-navy">{stat.value}</p>
                <p className="text-manah-gray-500 text-body-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Overview ─── */}
      <MotionSection className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionHeading
                eyebrow="Overview"
                title={`About ${division.name}`}
                align="left"
              />
              <div className="mt-6 space-y-4 text-manah-gray-500 text-body-md">
                {division.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Certifications */}
              <div className="mt-8">
                <h4 className="font-semibold text-manah-navy text-body-md mb-3">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {division.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-manah-gray-100 text-manah-gray-600 text-body-sm rounded-full"
                    >
                      <Shield className="w-3.5 h-3.5 text-manah-gold" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-manah-gray-100"
            >
              {DIVISION_IMAGES[slug] ? (
                <Image
                  src={DIVISION_IMAGES[slug].detail}
                  alt={`${division.name} facility`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-manah-gray-400 text-body-sm">
                  {division.name} Facility Image
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* ─── Services ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Do"
            title="Services & Capabilities"
            description={`Comprehensive ${division.tagline.toLowerCase()} solutions delivered with engineering excellence.`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {division.services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-500"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${division.color}15` }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: division.color }} />
                </div>
                <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-manah-gray-500 text-body-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sectors Served ─── */}
      <section className="section-padding bg-manah-navy text-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Industries"
            title="Sectors We Serve"
            mode="dark"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {division.sectors.map((sector, i) => (
              <motion.div
                key={sector}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors duration-300"
              >
                <p className="font-display font-semibold text-white">{sector}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/contact" className="btn-primary">
              Discuss Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

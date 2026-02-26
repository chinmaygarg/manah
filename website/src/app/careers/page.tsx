"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import {
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  Users,
  Heart,
  Rocket,
  GraduationCap,
  ChevronDown,
  Search,
} from "lucide-react";
const BENEFITS = [
  { icon: Rocket, title: "Growth Opportunities", description: "Fast-track your career in one of the fastest-growing EPC enterprises globally." },
  { icon: GraduationCap, title: "Learning & Development", description: "Continuous training programs, certifications, and mentorship from industry leaders." },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical insurance, wellness programs, and mental health support." },
  { icon: Users, title: "Inclusive Culture", description: "A diverse, meritocratic workplace where every voice is valued and heard." },
];

const DEPARTMENTS = ["All", "Engineering", "Project Management", "Operations", "Technology", "Corporate"];

const OPENINGS = [
  {
    id: 1,
    title: "Senior Design Engineer — Transmission",
    department: "Engineering",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    experience: "5-8 years",
    description: "Lead design engineering for HV/EHV transmission line projects including tower design, foundation engineering, and sag-tension analysis.",
  },
  {
    id: 2,
    title: "Project Manager — Solar EPC",
    department: "Project Management",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
    experience: "8-12 years",
    description: "End-to-end project management for utility-scale solar EPC projects from planning through commissioning.",
  },
  {
    id: 3,
    title: "Licensed Aircraft Maintenance Engineer (B1)",
    department: "Operations",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "3-6 years",
    description: "DGCA-licensed AME for line and base maintenance of commercial aircraft at our MRO facility.",
  },
  {
    id: 4,
    title: "Hydrogen Process Engineer",
    department: "Engineering",
    location: "Pune, Maharashtra",
    type: "Full-time",
    experience: "4-7 years",
    description: "Process engineering for PEM electrolyzer systems and green hydrogen production plants.",
  },
  {
    id: 5,
    title: "SMT Production Manager",
    department: "Operations",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "6-10 years",
    description: "Manage electronics manufacturing operations including SMT assembly, testing, and quality control.",
  },
  {
    id: 6,
    title: "Full-Stack Developer",
    department: "Technology",
    location: "Remote / Delhi NCR",
    type: "Full-time",
    experience: "3-5 years",
    description: "Build internal digital platforms and IoT dashboards for project monitoring and asset management.",
  },
  {
    id: 7,
    title: "Procurement Lead — Power & Renewables",
    department: "Operations",
    location: "Delhi NCR, India",
    type: "Full-time",
    experience: "6-10 years",
    description: "Strategic sourcing of towers, conductors, solar modules, and BOS components for EPC projects.",
  },
  {
    id: 8,
    title: "HR Business Partner",
    department: "Corporate",
    location: "Delhi NCR, India",
    type: "Full-time",
    experience: "5-8 years",
    description: "Drive HR strategy, talent acquisition, and culture-building across business divisions.",
  },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = activeDept === "All"
    ? OPENINGS
    : OPENINGS.filter((o) => o.department === activeDept);

  return (
    <main className="pt-[var(--nav-height)]">
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/careers/careers_hero.png"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        >
          <source src="/videos/careers/culture_reel-720p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(200,169,110,0.12),transparent_60%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              Careers
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Build the Future{" "}
              <span className="text-gradient-gold">With Us</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg">
              Join a team of innovators, engineers, and leaders shaping the global infrastructure, energy, and technology landscape.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <a href="#openings" className="btn-primary">
                View Open Positions <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Why Manah ─── */}
      <MotionSection className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Why Join Us"
            title="Life at Manah Group"
            description="We invest in our people because they are the foundation of everything we build."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-manah-gray-200/60 text-center hover:shadow-card-hover transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-manah-gold/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-manah-gold" />
                </div>
                <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-manah-gray-500 text-body-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ─── Open Positions ─── */}
      <section id="openings" className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <SectionHeading
            eyebrow="Open Positions"
            title="Current Openings"
            description="Find the role that matches your passion and expertise."
          />

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mt-8 mb-10">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 text-body-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeDept === dept
                    ? "bg-manah-navy text-white"
                    : "bg-white text-manah-gray-600 border border-manah-gray-200 hover:border-manah-gold/50"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-manah-gray-200/60 overflow-hidden hover:border-manah-gold/30 transition-colors duration-300"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-heading-md font-semibold text-manah-navy truncate">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-body-sm text-manah-gray-500">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.experience}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-manah-gray-400 shrink-0 ml-4 transition-transform duration-300 ${
                        expandedId === job.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedId === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 border-t border-manah-gray-200/50">
                          <p className="text-manah-gray-500 text-body-md mt-4 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-manah-gray-50 text-manah-gray-600 text-caption rounded-full">{job.type}</span>
                            <span className="px-3 py-1 bg-manah-gray-50 text-manah-gray-600 text-caption rounded-full">{job.experience}</span>
                          </div>
                          <div className="mt-6">
                            <Link href={`/contact?subject=Application: ${job.title}`} className="btn-primary text-body-sm">
                              Apply Now <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-manah-gray-400">
                  <Search className="w-10 h-10 mx-auto mb-4 opacity-50" />
                  <p className="text-body-md">No openings found in this department. Check back soon!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

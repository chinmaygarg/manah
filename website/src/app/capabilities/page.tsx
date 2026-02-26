"use client";

import Link from "next/link";
import Image from "next/image";
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
import {
  Building2,
  Compass,
  Package,
  HardHat,
  Settings,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Radio,
  ScanLine,
  FlaskConical,
  Wrench,
  TestTube2,
  Factory,
  Crosshair,
  ShieldCheck,
  Server,
} from "lucide-react";

/* ─── Core Capabilities Data ─── */
const CAPABILITIES = [
  {
    icon: Building2,
    title: "EPC Turnkey Solutions",
    description:
      "Complete engineering, procurement, and construction solutions with single-point accountability. We manage every aspect of project delivery — from concept through commissioning — ensuring seamless coordination and optimized outcomes.",
    deliverables: [
      "Feasibility Studies",
      "Detailed Engineering",
      "Equipment Procurement",
      "Construction & Commissioning",
    ],
  },
  {
    icon: Compass,
    title: "Engineering & Design",
    description:
      "Multidisciplinary engineering services covering civil, structural, electrical, and mechanical design. Our engineering teams use advanced CAD/CAE tools and BIM methodologies to deliver designs that optimize performance, constructability, and cost.",
    deliverables: [
      "Concept Design",
      "Detailed Engineering Drawings",
      "3D Modeling & BIM",
      "Design Reviews & Value Engineering",
    ],
  },
  {
    icon: Package,
    title: "Procurement & Supply Chain",
    description:
      "Global procurement capabilities with established vendor networks across 15+ countries. We source equipment, materials, and services through rigorous qualification processes that balance quality, cost, and delivery timelines.",
    deliverables: [
      "Vendor Qualification",
      "Expediting & Inspection",
      "Logistics Management",
      "Inventory Optimization",
    ],
  },
  {
    icon: HardHat,
    title: "Construction Management",
    description:
      "Field construction execution with modern equipment fleets, skilled workforces, and digital project management. Our construction teams maintain the highest safety standards while meeting aggressive project schedules.",
    deliverables: [
      "Site Mobilization",
      "Quality Assurance",
      "Safety Management",
      "Schedule Optimization",
    ],
  },
  {
    icon: Settings,
    title: "Operations & Maintenance",
    description:
      "Comprehensive O&M services for power, energy, and infrastructure assets. We extend asset life, maximize availability, and optimize performance through predictive maintenance, condition monitoring, and skilled technician teams.",
    deliverables: [
      "Preventive Maintenance",
      "Condition Monitoring",
      "Spare Parts Management",
      "Performance Optimization",
    ],
  },
  {
    icon: BarChart3,
    title: "Project Management",
    description:
      "End-to-end project management using PMI-aligned methodologies with digital dashboards for real-time visibility. Our PMs bring domain expertise and stakeholder management skills to deliver complex multi-site programs.",
    deliverables: [
      "Planning & Scheduling",
      "Cost Control",
      "Risk Management",
      "Stakeholder Reporting",
    ],
  },
];

/* ─── Technology Features Data ─── */
const TECH_FEATURES = [
  {
    icon: Cpu,
    title: "BIM & Digital Twins",
    description:
      "3D modeling and simulation for clash detection, constructability analysis, and lifecycle management.",
  },
  {
    icon: ScanLine,
    title: "Drone Surveying",
    description:
      "Aerial mapping, progress monitoring, and volumetric analysis using LiDAR-equipped UAVs.",
  },
  {
    icon: Radio,
    title: "IoT & Smart Monitoring",
    description:
      "Real-time sensor networks for structural health monitoring, equipment tracking, and environmental compliance.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Testing",
    description:
      "Non-destructive testing, EMI/EMC compliance, environmental stress screening, and reliability analysis.",
  },
];

/* ─── Methodology Steps Data ─── */
const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Assess",
    description:
      "Feasibility study, site investigation, and requirements analysis to define project scope and technical approach.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Multidisciplinary engineering design with constructability reviews, value engineering, and regulatory compliance.",
  },
  {
    step: "03",
    title: "Procure",
    description:
      "Strategic sourcing, vendor management, expediting, and quality inspection of all equipment and materials.",
  },
  {
    step: "04",
    title: "Build",
    description:
      "Construction execution with real-time monitoring, safety management, and quality assurance at every stage.",
  },
  {
    step: "05",
    title: "Deliver",
    description:
      "Testing, commissioning, performance guarantee, handover documentation, and post-project support.",
  },
];

/* ─── Equipment & Resources Data ─── */
const RESOURCES = [
  {
    icon: Wrench,
    title: "Heavy Construction Equipment",
    description:
      "Cranes (50-500 ton), excavators, piling rigs, batching plants, and specialized erection equipment.",
  },
  {
    icon: TestTube2,
    title: "Testing & Measurement",
    description:
      "Relay test sets, power analyzers, cable fault locators, insulation testers, and thermography equipment.",
  },
  {
    icon: Factory,
    title: "Manufacturing Infrastructure",
    description:
      "8+ SMT lines, wave/selective soldering, conformal coating, environmental test chambers, and clean rooms.",
  },
  {
    icon: Crosshair,
    title: "Survey Equipment",
    description:
      "Total stations, DGPS, drone platforms, LiDAR scanners, and GIS mapping workstations.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Systems",
    description:
      "Full-body harnesses, fall protection, confined space equipment, gas detectors, and fire suppression systems.",
  },
  {
    icon: Server,
    title: "IT Infrastructure",
    description:
      "Enterprise ERP, project management software, BIM platforms, document control systems, and secure networks.",
  },
];

export default function CapabilitiesPage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <Image
          src="/images/hero/hero_main_infrastructure.png"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(200,169,110,0.12),transparent_60%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
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
              Our Capabilities
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl font-bold mb-6"
            >
              Engineering{" "}
              <span className="text-gradient-gold">Excellence</span> at Scale
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg max-w-2xl"
            >
              Integrated EPC capabilities spanning design, engineering,
              procurement, construction, and lifecycle management — delivering
              complex projects across power, energy, infrastructure, aviation,
              and advanced manufacturing.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/divisions" className="btn-primary">
                Explore Our Divisions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Core Capabilities Grid ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Do"
            title="End-to-End Project Delivery"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-8 border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-manah-navy flex items-center justify-center mb-6 group-hover:bg-manah-gold/10 transition-colors duration-500">
                  <cap.icon className="w-7 h-7 text-manah-gold" />
                </div>
                <h3 className="font-display text-heading-lg font-bold text-manah-navy mb-3">
                  {cap.title}
                </h3>
                <p className="text-manah-gray-500 text-body-sm leading-relaxed mb-6">
                  {cap.description}
                </p>
                <div className="space-y-2.5">
                  {cap.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-manah-gold" />
                      <span className="text-manah-gray-600 text-body-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technology & Innovation ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading
                eyebrow="Technology"
                title="Innovation-Driven Execution"
                align="left"
                className="mb-8 lg:mb-8"
              />
              <p className="text-manah-gray-500 text-body-md leading-relaxed">
                We invest in technology that makes our projects faster, safer,
                and more efficient. From drone-based surveying to digital twin
                modeling, our technology stack enables precision engineering and
                real-time project intelligence.
              </p>
            </motion.div>

            {/* Right: 2x2 feature grid */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {TECH_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card transition-all duration-400"
                >
                  <div className="w-11 h-11 rounded-lg bg-manah-gold/10 flex items-center justify-center mb-4">
                    <feat.icon className="w-5 h-5 text-manah-gold" />
                  </div>
                  <h4 className="font-display text-heading-sm font-semibold text-manah-navy mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-manah-gray-500 text-body-sm leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Methodology ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Approach"
            title="From Concept to Commissioning"
          />

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block mt-12">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-manah-gray-200" />
              <div className="grid grid-cols-5 gap-6">
                {METHODOLOGY_STEPS.map((step, i) => (
                  <motion.div
                    key={step.step}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="relative text-center"
                  >
                    {/* Step number circle */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-manah-navy text-manah-gold font-display font-bold text-heading-md flex items-center justify-center mx-auto mb-6 ring-4 ring-white">
                      {step.step}
                    </div>
                    <h4 className="font-display text-heading-md font-bold text-manah-navy mb-3">
                      {step.title}
                    </h4>
                    <p className="text-manah-gray-500 text-body-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: vertical timeline */}
          <div className="lg:hidden mt-12">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-manah-gray-200" />
              <div className="space-y-10">
                {METHODOLOGY_STEPS.map((step, i) => (
                  <motion.div
                    key={step.step}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Step number circle */}
                    <div className="relative z-10 w-16 h-16 shrink-0 rounded-full bg-manah-navy text-manah-gold font-display font-bold text-heading-md flex items-center justify-center ring-4 ring-white">
                      {step.step}
                    </div>
                    <div className="pt-3">
                      <h4 className="font-display text-heading-md font-bold text-manah-navy mb-2">
                        {step.title}
                      </h4>
                      <p className="text-manah-gray-500 text-body-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Equipment & Resources ─── */}
      <section className="section-padding bg-manah-navy text-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Infrastructure"
            title="Resources & Infrastructure"
            mode="dark"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map((resource, i) => (
              <motion.div
                key={resource.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-manah-gold/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-manah-gold/10 flex items-center justify-center mb-4 group-hover:bg-manah-gold/20 transition-colors duration-300">
                  <resource.icon className="w-6 h-6 text-manah-gold" />
                </div>
                <h3 className="font-display text-heading-md font-semibold text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-manah-gray-300 text-body-sm leading-relaxed">
                  {resource.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <MotionSection className="section-padding bg-manah-gray-50">
        <div className="section-container text-center max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Get Started"
            title="Let's Build Something Extraordinary"
            description="Have a project in mind? We'd love to discuss how our capabilities can bring your vision to life."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Our Projects
            </Link>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}

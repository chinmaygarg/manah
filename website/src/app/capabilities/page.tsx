"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import {
  PenTool,
  Package,
  HardHat,
  ClipboardList,
  Wrench,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const CAPABILITIES = [
  {
    id: "engineering",
    icon: PenTool,
    title: "Engineering & Design",
    color: "#1E3A5F",
    description: "World-class design engineering capabilities spanning structural, electrical, mechanical, and process disciplines.",
    details: [
      "Transmission line tower design (lattice, tubular, monopole)",
      "Substation layout and protection scheme design",
      "Solar plant detailed engineering with PVsyst modelling",
      "Structural analysis and foundation engineering",
      "3D modelling, BIM, and digital twin integration",
      "Value engineering for cost optimization",
    ],
    tools: ["AutoCAD", "ETAP", "PLS-CADD", "PVsyst", "STAAD Pro", "Tekla"],
  },
  {
    id: "procurement",
    icon: Package,
    title: "Strategic Procurement",
    color: "#0D9488",
    description: "Global supply chain management ensuring quality materials, competitive pricing, and on-time delivery.",
    details: [
      "Vendor qualification and performance monitoring",
      "Global sourcing for towers, conductors, transformers",
      "Solar module and inverter procurement",
      "Expediting and logistics coordination",
      "Quality inspection at source (TPI)",
      "Customs clearance and import management",
    ],
    tools: ["SAP MM", "Oracle Procurement", "TradeIndia", "Alibaba"],
  },
  {
    id: "construction",
    icon: HardHat,
    title: "Construction Excellence",
    color: "#F59E0B",
    description: "Large-scale construction execution with rigorous safety, quality, and schedule adherence.",
    details: [
      "Tower erection and conductor stringing for HV/EHV lines",
      "Substation civil and electromechanical works",
      "Solar plant mounting, cabling, and commissioning",
      "Heavy civil construction — roads, bridges, buildings",
      "Mechanical erection and piping for process plants",
      "Crane operations and heavy-lift management",
    ],
    tools: ["Primavera P6", "MS Project", "Procore", "Field Management Apps"],
  },
  {
    id: "pm",
    icon: ClipboardList,
    title: "Project Management",
    color: "#7C3AED",
    description: "End-to-end project delivery assurance with real-time monitoring, risk management, and stakeholder communication.",
    details: [
      "WBS-driven project planning and scheduling",
      "Earned Value Management (EVM) tracking",
      "Risk identification, analysis, and mitigation",
      "HSE management and incident reporting",
      "Client reporting and dashboard analytics",
      "Contract administration and claims management",
    ],
    tools: ["Primavera P6", "Power BI", "SharePoint", "Custom Dashboards"],
  },
  {
    id: "om",
    icon: Wrench,
    title: "Operations & Maintenance",
    color: "#059669",
    description: "Comprehensive O&M services maximizing asset performance, availability, and lifespan.",
    details: [
      "Preventive and predictive maintenance programs",
      "24/7 remote monitoring and SCADA integration",
      "Thermal imaging and drone-based inspections",
      "Spare parts management and inventory optimization",
      "Performance benchmarking and reporting",
      "Emergency response and repair services",
    ],
    tools: ["SCADA Systems", "CMMS", "Drone Platforms", "IoT Sensors"],
  },
  {
    id: "digital",
    icon: Cpu,
    title: "Digital & Technology",
    color: "#1E3A5F",
    description: "Leveraging IoT, AI, and digital twins to enhance project delivery and asset management.",
    details: [
      "IoT-based asset monitoring and alerting",
      "AI/ML for predictive maintenance analytics",
      "Digital twin development for infrastructure assets",
      "Drone surveying and LiDAR mapping",
      "Mobile workforce management applications",
      "Cybersecurity for industrial control systems",
    ],
    tools: ["Azure IoT", "Python/TensorFlow", "Power BI", "DJI Enterprise"],
  },
];

export default function CapabilitiesPage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(200,169,110,0.12),transparent_60%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              Capabilities
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Engineering{" "}
              <span className="text-gradient-gold">Excellence</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg">
              Integrated EPC capabilities spanning the full project lifecycle — from conceptual design to long-term operations and maintenance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Capabilities Detail ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="space-y-20">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                id={cap.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
                  {/* Content */}
                  <div className="lg:[direction:ltr]">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${cap.color}12` }}
                      >
                        <cap.icon className="w-7 h-7" style={{ color: cap.color }} />
                      </div>
                      <div>
                        <h2 className="font-display text-display-sm font-bold text-manah-navy">
                          {cap.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-manah-gray-500 text-body-md mb-6">{cap.description}</p>

                    <div className="space-y-3">
                      {cap.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: cap.color }} />
                          <span className="text-manah-gray-600 text-body-sm">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tools */}
                    <div className="mt-6">
                      <p className="text-body-sm font-medium text-manah-gray-700 mb-2">Tools & Platforms</p>
                      <div className="flex flex-wrap gap-2">
                        {cap.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 bg-manah-gray-50 text-manah-gray-600 text-caption rounded-full border border-manah-gray-200/60">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual placeholder */}
                  <div className="lg:[direction:ltr] relative aspect-[4/3] rounded-2xl overflow-hidden bg-manah-gray-100">
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{ background: `linear-gradient(135deg, ${cap.color}, transparent)` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-manah-gray-400 text-body-sm">
                      {cap.title} Visual
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {i < CAPABILITIES.length - 1 && (
                  <div className="mt-20 border-t border-manah-gray-200/50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-manah-navy text-white text-center">
        <div className="section-container max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Work With Us"
            title="Leverage Our Capabilities"
            description="From concept to commissioning, our integrated EPC capabilities deliver projects on time, on budget, and to the highest standards."
            mode="dark"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Discuss Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

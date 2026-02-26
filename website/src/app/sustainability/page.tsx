"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, scaleIn } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import CounterAnimation from "@/components/animations/CounterAnimation";
import {
  Leaf,
  Droplets,
  Sun,
  Recycle,
  Shield,
  Users,
  TreePine,
  Factory,
  ArrowRight,
  Target,
} from "lucide-react";

const ESG_PILLARS = [
  {
    icon: Leaf,
    title: "Environmental",
    color: "#16A34A",
    items: [
      "Green hydrogen production reducing 100K+ tons CO₂ annually",
      "1,200+ MW renewable energy capacity installed",
      "Zero-discharge manufacturing processes",
      "Waste reduction and circular economy practices",
    ],
  },
  {
    icon: Users,
    title: "Social",
    color: "#1E3A5F",
    items: [
      "1,000+ direct employment opportunities",
      "Community development programs in project areas",
      "Skill development and training for local workforce",
      "Diversity and inclusion commitment across divisions",
    ],
  },
  {
    icon: Shield,
    title: "Governance",
    color: "#C8A96E",
    items: [
      "ISO 9001, 14001, 45001 certified operations",
      "Independent board oversight and audit committee",
      "Anti-corruption and whistleblower policies",
      "Transparent reporting and stakeholder communication",
    ],
  },
];

const SUSTAINABILITY_STATS = [
  { value: 100, suffix: "K+", label: "Tons CO₂ Offset", icon: Factory },
  { value: 1200, suffix: "+", label: "MW Clean Energy", icon: Sun },
  { value: 50, suffix: "K+", label: "Trees Planted", icon: TreePine },
  { value: 0, suffix: "%", label: "Zero Discharge", icon: Droplets, displayValue: "100" },
];

const INITIATIVES = [
  {
    title: "Green Hydrogen Mission",
    description: "Building 500 TPD green hydrogen production capacity to support national green hydrogen initiatives and decarbonize heavy industry worldwide.",
    icon: Droplets,
  },
  {
    title: "Solar & Wind EPC",
    description: "Constructing utility-scale renewable energy infrastructure — contributing over 1,200 MW of clean power capacity across multiple regions.",
    icon: Sun,
  },
  {
    title: "Sustainable Manufacturing",
    description: "Implementing lean manufacturing, zero-discharge processes, and recycling programs in our electronics manufacturing facilities.",
    icon: Recycle,
  },
  {
    title: "Community Development",
    description: "Skill development programs, local hiring initiatives, and community infrastructure projects in areas surrounding our operations.",
    icon: Users,
  },
];

export default function SustainabilityPage() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <Image src="/images/sustainability/sustainability_hero.png" alt="" fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(22,163,74,0.15),transparent_60%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-manah-accent-green font-semibold text-body-sm tracking-widest uppercase mb-4">
              Sustainability
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Building a{" "}
              <span className="text-gradient-gold">Greener Tomorrow</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg">
              Sustainability isn&apos;t a department at Manah Group — it&apos;s woven into every project, every process, and every decision we make.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section className="bg-white border-b border-manah-gray-200">
        <div className="section-container py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {SUSTAINABILITY_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-manah-accent-green/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-manah-accent-green" />
                </div>
                <p className="font-display text-heading-xl font-bold text-manah-navy">
                  {stat.displayValue ? stat.displayValue : <CounterAnimation to={stat.value} />}{stat.suffix}
                </p>
                <p className="text-manah-gray-500 text-body-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ESG Framework ─── */}
      <MotionSection className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Framework"
            title="ESG Commitment"
            description="Environmental, Social, and Governance principles guiding our operations."
          />
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {ESG_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-manah-gray-50 rounded-2xl p-7 border border-manah-gray-200/40"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                </div>
                <h3 className="font-display text-heading-lg font-bold text-manah-navy mb-4">
                  {pillar.title}
                </h3>
                <ul className="space-y-3">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-manah-gray-500 text-body-sm">
                      <Target className="w-4 h-4 text-manah-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ─── Community Impact ─── */}
      <MotionSection className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/sustainability/community_impact.png"
                  alt="Community development and social impact"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionHeading
                eyebrow="Social Impact"
                title="Empowering Communities"
                description="Our projects create lasting impact beyond infrastructure — bringing education, clean water, and economic opportunity to communities across our operating regions."
                align="left"
              />
              <ul className="mt-6 space-y-3">
                {[
                  "Reliable electricity powering schools and hospitals in rural areas",
                  "Clean water infrastructure serving thousands of families",
                  "Skill development programs creating local employment",
                  "Community welfare initiatives in all project areas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-manah-gray-500 text-body-sm">
                    <Target className="w-4 h-4 text-manah-gold shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* ─── Key Initiatives ─── */}
      <section className="section-padding bg-manah-navy text-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="In Action"
            title="Sustainability Initiatives"
            description="Concrete actions driving measurable environmental and social impact."
            mode="dark"
          />
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {INITIATIVES.map((initiative, i) => (
              <motion.div
                key={initiative.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-7 border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <initiative.icon className="w-8 h-8 text-manah-gold mb-4" />
                <h3 className="font-display text-heading-md font-semibold text-white mb-3">
                  {initiative.title}
                </h3>
                <p className="text-manah-gray-300 text-body-sm leading-relaxed">
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <MotionSection className="section-padding bg-white text-center">
        <div className="section-container max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Partner With Us"
            title="Join Our Sustainability Journey"
            description="Collaborate with Manah Group to build a more sustainable future for communities worldwide."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/divisions/green-energy" className="btn-secondary border-manah-navy text-manah-navy hover:bg-manah-navy hover:text-white">
              Green Energy Division
            </Link>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}

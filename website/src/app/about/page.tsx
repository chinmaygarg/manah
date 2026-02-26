"use client";

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
import CounterAnimation from "@/components/animations/CounterAnimation";
import { Award, Target, Eye, Heart, Shield, Users, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { LEADERS } from "@/lib/constants";

/* ─── Timeline Data ─── */
const MILESTONES = [
  { year: "2015", title: "Foundation", description: "Manah Group established with a vision to deliver world-class infrastructure solutions." },
  { year: "2017", title: "First Major EPC Contract", description: "Secured landmark power transmission project, marking entry into large-scale EPC." },
  { year: "2019", title: "Aerospace Division Launch", description: "Established Manah Aerospace with DGCA-approved MRO facility." },
  { year: "2020", title: "Green Energy Initiative", description: "Entered green hydrogen and renewable energy sector with PEM electrolyzer technology." },
  { year: "2022", title: "Tech & Manufacturing", description: "Launched Electronics Manufacturing Services division with 8 SMT production lines." },
  { year: "2023", title: "$300M+ Portfolio", description: "Crossed $300M in cumulative project value with 500%+ YoY growth." },
  { year: "2024", title: "Global Expansion", description: "Expanded operations to Middle East and Southeast Asia with strategic partnerships." },
  { year: "2025", title: "Industry Recognition", description: "Awarded 'Fastest Growing EPC Company' and achieved ISO 9001, 14001, 45001 certifications." },
];

/* ─── Awards ─── */
const AWARDS = [
  { title: "Fastest Growing EPC Company", org: "Infrastructure Awards 2025", icon: Award },
  { title: "ISO 9001:2015", org: "Quality Management System", icon: Shield },
  { title: "ISO 14001:2015", org: "Environmental Management", icon: Globe },
  { title: "ISO 45001:2018", org: "Occupational Health & Safety", icon: Heart },
  { title: "DGCA Approved MRO", org: "Directorate General of Civil Aviation", icon: Shield },
  { title: "Strategic Manufacturing Leader", org: "Industry Excellence Recognition", icon: Award },
];

/* ─── Values ─── */
const VALUES = [
  { icon: Target, title: "Excellence", description: "We pursue the highest standards in every project, every process, and every interaction." },
  { icon: Shield, title: "Integrity", description: "Transparent and ethical business practices form the foundation of all our relationships." },
  { icon: Heart, title: "Sustainability", description: "Building a greener future through responsible practices and clean energy solutions." },
  { icon: Users, title: "Collaboration", description: "Partnering with clients, communities, and stakeholders to create shared value." },
  { icon: Eye, title: "Innovation", description: "Leveraging cutting-edge technology and fresh thinking to solve complex challenges." },
  { icon: Clock, title: "Reliability", description: "Delivering on commitments with precision, on time, and within budget." },
];

export default function AboutPage() {
  return (
    <main>
      {/* ─── Hero Banner ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/about/team_collaboration.png"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/videos/about/company_story-720p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(200,169,110,0.15),transparent_70%)]" />
        <div className="section-container py-24 md:py-32 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              About Manah Group
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Mindful Enterprising.{" "}
              <span className="text-gradient-gold">Building What&apos;s Next.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg max-w-2xl">
              A diversified EPC enterprise delivering excellence across Projects &amp; Infrastructure,
              Aviation &amp; MRO, Green Energy, and Technology &amp; Manufacturing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Company Overview ─── */}
      <MotionSection className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionHeading
                eyebrow="Our Story"
                title="Engineering Tomorrow, Today"
                description="Founded with a vision to transform the global infrastructure landscape, Manah Group has rapidly grown into a multi-division enterprise trusted by government agencies, public utilities, and private corporations across continents."
                align="left"
              />
              <div className="mt-8 space-y-4 text-manah-gray-500 text-body-md">
                <p>
                  From high-voltage power transmission corridors stretching across regions to green hydrogen production facilities powering the clean energy revolution, our work shapes the physical and technological backbone of modern infrastructure.
                </p>
                <p>
                  With a project portfolio exceeding $300M and 500%+ year-over-year growth, we combine the agility of a new-age enterprise with the engineering rigour of established industry leaders.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-manah-gray-100"
            >
              <Image
                src="/images/about/about_hero.png"
                alt="Manah Group company overview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-manah-navy/10 to-manah-gold/5" />
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* ─── Vision & Mission ─── */}
      <section className="relative bg-manah-navy overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-manah-gold/[0.04] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-manah-accent-blue/[0.06] rounded-full blur-[150px]" />

        {/* ── Vision Block ── */}
        <div className="relative section-container" style={{ paddingTop: "var(--section-padding)", paddingBottom: "0" }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-6"
            >
              Our Vision
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-md md:text-display-lg lg:text-display-xl font-bold text-white leading-[1.1] mb-8"
            >
              To be the world&apos;s most{" "}
              <span className="text-gradient-gold">trusted and innovative</span>{" "}
              EPC enterprise.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg md:text-heading-lg font-light leading-relaxed max-w-3xl"
            >
              Delivering world-class infrastructure and technology solutions that power sustainable development across markets worldwide.
            </motion.p>
          </motion.div>
        </div>

        {/* ── Separator ── */}
        <div className="section-container py-16 md:py-20">
          <div className="h-px bg-gradient-to-r from-transparent via-manah-gold/30 to-transparent" />
        </div>

        {/* ── Mission Block ── */}
        <div className="relative section-container" style={{ paddingTop: "0", paddingBottom: "var(--section-padding)" }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-4xl ml-auto text-right"
          >
            <motion.p
              variants={fadeUp}
              className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-6"
            >
              Our Mission
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-display-md md:text-display-lg lg:text-display-xl font-bold text-white leading-[1.1] mb-8"
            >
              Engineering excellence through{" "}
              <span className="text-gradient-gold">mindful enterprising.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg md:text-heading-lg font-light leading-relaxed max-w-3xl ml-auto"
            >
              Combining cutting-edge technology, sustainable practices, and unwavering commitment to quality in every project we undertake.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <MotionSection className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Core Values"
            description="The principles that guide every decision and define who we are."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-manah-gold/10 flex items-center justify-center mb-4 group-hover:bg-manah-gold/20 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-manah-gold" />
                </div>
                <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-manah-gray-500 text-body-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ─── Leadership ─── */}
      <section id="leadership" className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet Our Team"
            description="Experienced leaders driving Manah Group's vision of excellence."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {LEADERS.map((leader, i) => (
              <motion.div
                key={leader.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-manah-gray-200 mb-5">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-display text-heading-md font-bold text-manah-navy">
                  {leader.name}
                </h3>
                <p className="text-manah-gold font-medium text-body-sm mb-2">{leader.title}</p>
                <p className="text-manah-gray-500 text-body-sm">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── History Timeline ─── */}
      <section id="history" className="section-padding bg-manah-navy text-white overflow-hidden relative">
        <Image src="/images/about/timeline_background.png" alt="" fill className="object-cover opacity-10" />
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Journey"
            title="History & Milestones"
            description="A decade of relentless growth and transformative achievements."
            mode="dark"
          />
          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-manah-gold/30" />

            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0
                    ? "md:flex-row md:text-right"
                    : "md:flex-row-reverse md:text-left"
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-manah-gold border-4 border-manah-navy z-10 mt-1.5" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}>
                  <span className="text-manah-gold font-display font-bold text-heading-lg">
                    {milestone.year}
                  </span>
                  <h3 className="font-display text-heading-md font-semibold text-white mt-1 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-manah-gray-300 text-body-sm">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Awards & Certifications ─── */}
      <section id="awards" className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards & Certifications"
            description="Industry recognition for our commitment to excellence, safety, and sustainability."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card transition-all duration-400"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-manah-navy flex items-center justify-center">
                  <award.icon className="w-6 h-6 text-manah-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-manah-navy text-body-md">{award.title}</h3>
                  <p className="text-manah-gray-500 text-body-sm mt-1">{award.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-manah-navy py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: "%+", label: "YoY Growth" },
              { value: 300, prefix: "$", suffix: "M+", label: "Project Portfolio" },
              { value: 15, suffix: "+", label: "Regions Covered" },
              { value: 1000, suffix: "+", label: "Team Members" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="stat-number">
                  {stat.prefix}
                  <CounterAnimation to={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-manah-gray-300 text-body-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

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
import BlurImage from "@/components/ui/BlurImage";
import { LEADERS } from "@/lib/constants";

/* ─── Timeline Data ─── */
const MILESTONES = [
  { year: "2018", title: "Incorporated", description: "Manah Group incorporated with a vision to deliver world-class infrastructure solutions." },
  { year: "2020", title: "First Landmark EPC", description: "Secured landmark power transmission project, marking entry into large-scale EPC execution." },
  { year: "2021", title: "Aerospace Division Launch", description: "Established Manah Aerospace with DGCA-approved MRO facility at Begumpet, Hyderabad, in partnership with AAI." },
  { year: "2022", title: "Green Energy Initiative", description: "Entered green hydrogen with ARB & Electrolysis technology and an MoU with the Government of Madhya Pradesh for 18,000 MTPA production at Bina." },
  { year: "2023", title: "Electronics Manufacturing", description: "Launched a 30,000 sq ft EMS facility at Cherlapally, Hyderabad — now operating as part of Manah Dynamics." },
  { year: "2025", title: "Manah Atomic Launched", description: "Entered nuclear energy with focus on Small Modular Reactors (SMRs), advanced nuclear fuel cycle, and reactor safety & compliance." },
  { year: "2025", title: "Manah AI Launched", description: "Generative AI and sovereign data centre division established — agentic AI, LLM/SLM training, and India-native AI compute." },
  { year: "2026", title: "Scale & Recognition", description: "Group reaches six divisions, 20+ strategic partners, 1000+ team members, and ISO 9001 / 14001 / 45001 certifications across core divisions." },
];

/* ─── Policies (compact list) ─── */
const POLICIES = [
  "Code of Conduct",
  "Anti-Corruption Policy",
  "Whistleblower Policy",
  "HSE Policy",
  "CSR Policy",
  "Quality Policy",
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

/* ─── Leader Card ─── */
function LeaderCard({
  leader,
  index,
  featured = false,
}: {
  leader: (typeof LEADERS)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className={`group ${featured ? "lg:flex lg:flex-row lg:items-center lg:gap-8" : ""}`}
    >
      <div
        className={`relative aspect-[3/4] rounded-2xl overflow-hidden bg-manah-gray-200 mb-5 ${
          featured ? "lg:mb-0 lg:w-1/2 lg:shrink-0" : ""
        }`}
      >
        <BlurImage
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className={featured ? "lg:flex-1" : ""}>
        <h3 className="font-display text-heading-md font-bold text-manah-navy">
          {leader.name}
        </h3>
        <p className="text-manah-gold font-medium text-body-sm mb-2">{leader.title}</p>
        <p className="text-manah-gray-500 text-body-sm">{leader.bio}</p>
      </div>
    </motion.div>
  );
}

export default function AboutContent() {
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
          poster="/images/about/team_collaboration.webp"
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
              A diversified enterprise group delivering excellence across six divisions — Manah Dynamics,
              Manah Green Energy, Manah Atomic, Manah Aerospace, Manah AI, and Manah Investments.
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
                  With a ₹20,000+ Cr project pipeline and 500%+ year-over-year growth, we combine the agility of a new-age enterprise with the engineering rigour of established industry leaders.
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
              <BlurImage
                src="/images/about/about_hero.webp"
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

      {/* ─── The Opportunity — $9 Trillion Infrastructure Gap ─── */}
      <MotionSection className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-manah-gray-100 order-2 lg:order-1"
            >
              <BlurImage
                src="/images/hero/hero_construction_site.webp"
                alt="Global infrastructure construction"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/80 via-manah-navy/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-display text-display-md md:text-display-lg font-bold text-white leading-none">
                  $9 Trillion
                </div>
                <p className="text-white/70 text-body-sm tracking-wide uppercase mt-2">
                  Global infrastructure gap
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <SectionHeading
                eyebrow="The Opportunity"
                title="A Global Infrastructure Gap"
                align="left"
              />
              <div className="mt-8 space-y-4 text-manah-gray-500 text-body-md">
                <p>
                  The world is racing to modernise — smart cities, energy transition, transport networks, and industrial corridors. Across emerging and developed economies alike, governments are committing record capital to close the infrastructure deficit.
                </p>
                <p>
                  The challenge? Delivering complex, large-scale projects on time, on budget, and to international standards. With a proven track record across 11 sectors and a vision rooted in sustainable, technology-led execution — Manah Group was built for exactly this.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* ─── Vision & Mission — Bento Grid ─── */}
      <section id="mission" className="relative bg-manah-navy overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-manah-gold/[0.04] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-manah-accent-blue/[0.06] rounded-full blur-[150px]" />

        <div className="relative section-container section-padding">
          {/* Eyebrow */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-8 bg-manah-gold/40" />
              <p className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase">
                What Guides Us
              </p>
              <div className="h-px w-8 bg-manah-gold/40" />
            </motion.div>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-[1.4fr_0.6fr] gap-4"
          >
            {/* ── Vision Card (spans full width) ── */}
            <motion.div
              variants={fadeUp}
              className="relative lg:col-span-2 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-manah-gold/[0.07] to-manah-gold/[0.01] border border-manah-gold/15 overflow-hidden"
            >
              {/* Background image */}
              <BlurImage
                src="/images/about/vision_mission_bg.webp"
                alt=""
                fill
                className="object-cover opacity-30"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/90 via-manah-navy/75 to-manah-navy/50" />

              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-manah-gold/[0.08]" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-manah-accent-blue/[0.06]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-5 h-5 text-manah-gold" />
                  <p className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase">
                    Our Vision
                  </p>
                </div>
                <h2 className="font-display text-display-md md:text-display-lg lg:text-display-xl font-bold text-white leading-[1.1] mb-6">
                  To be the world&apos;s most{" "}
                  <span className="text-gradient-gold">trusted and innovative</span>{" "}
                  EPC enterprise.
                </h2>
                <p className="text-manah-gray-300 text-body-lg md:text-heading-lg font-light leading-relaxed max-w-3xl">
                  Delivering world-class infrastructure and technology solutions that power sustainable development across markets worldwide.
                </p>
              </div>
            </motion.div>

            {/* ── Mission Card (bottom-left) ── */}
            <motion.div
              variants={fadeUp}
              className="relative rounded-2xl p-8 md:p-10 bg-white/[0.03] border border-white/[0.07] hover:border-manah-gold/20 transition-colors duration-500 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-5 h-5 text-manah-gold" />
                  <p className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase">
                    Our Mission
                  </p>
                </div>
                <h3 className="font-display text-heading-lg md:text-display-sm font-bold text-white leading-[1.15] mb-4">
                  Engineering excellence through{" "}
                  <span className="text-manah-gold">mindful enterprising.</span>
                </h3>
                <p className="text-manah-gray-300 text-body-md font-light leading-relaxed">
                  Combining cutting-edge technology, sustainable practices, and unwavering commitment to quality in every project we undertake.
                </p>
              </div>
            </motion.div>

            {/* ── Brand Quote Accent Cell (bottom-right) ── */}
            <motion.div
              variants={fadeUp}
              className="relative rounded-2xl p-8 md:p-10 bg-gradient-to-br from-manah-gold/[0.06] to-manah-gold/[0.02] border border-manah-gold/[0.12] overflow-hidden flex flex-col justify-center"
            >
              {/* Gold left-border accent */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-manah-gold/30 to-transparent" />

              {/* Opening quote mark */}
              <span className="absolute top-4 left-6 text-7xl font-serif text-manah-gold/[0.15] leading-none select-none" aria-hidden="true">
                &ldquo;
              </span>

              <div className="relative z-10 pl-4">
                <p className="font-serif italic text-white/75 text-body-lg leading-relaxed mb-4">
                  Building tomorrow&apos;s infrastructure with integrity, innovation, and a relentless drive to achieve the extraordinary.
                </p>
                <p className="text-manah-gold/60 text-body-sm tracking-widest uppercase">
                  <span className="inline-block w-4 h-px bg-manah-gold/40 mr-2 align-middle" />
                  Brand Ethos
                </p>
              </div>

              {/* Closing quote mark */}
              <span className="absolute bottom-4 right-6 text-7xl font-serif text-manah-gold/[0.15] leading-none select-none" aria-hidden="true">
                &rdquo;
              </span>
            </motion.div>
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
          {/* Row 1 — Managing Director, featured wide card */}
          <div className="flex justify-center mt-12">
            <div className="w-full sm:w-1/2">
              <LeaderCard leader={LEADERS[0]} index={0} featured />
            </div>
          </div>
          {/* Row 2 — remaining directors */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {LEADERS.slice(1).map((leader, i) => (
              <LeaderCard key={leader.name} leader={leader} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── History Timeline ─── */}
      <section id="history" className="section-padding bg-manah-navy text-white overflow-hidden relative">
        <BlurImage src="/images/about/timeline_background.webp" alt="" fill className="object-cover opacity-10" />
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
                key={milestone.title}
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

      {/* ─── Governance & Recognition ─── */}
      <section id="governance" className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Trust & Excellence"
            title="Governance & Recognition"
            description="Built on strong governance frameworks and recognized for our commitment to excellence."
          />

          {/* Policies — compact pill/badge layout */}
          <div className="mt-12 mb-16">
            <h3 className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-6">
              Policies &amp; Charters
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {POLICIES.map((policy, i) => (
                <motion.div
                  key={policy}
                  variants={fadeUp}
                  transition={{ delay: i * 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                    border border-manah-gray-200 hover:border-manah-gold/30
                    hover:bg-manah-gold/[0.04] transition-all duration-300 cursor-default"
                >
                  <Shield className="w-4 h-4 text-manah-navy/60" />
                  <span className="text-manah-navy text-body-sm font-medium">{policy}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Awards — navy cards with gold accents */}
          <h3 className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-6">
            Awards &amp; Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-manah-navy
                  hover:bg-manah-navy/95 transition-colors duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-manah-gold/15 flex items-center justify-center">
                  <award.icon className="w-6 h-6 text-manah-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-body-md">{award.title}</h3>
                  <p className="text-manah-gray-300 text-body-sm mt-1">{award.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Investor Relations ─── */}
      <section id="investors" className="bg-manah-navy py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { value: 500, suffix: "%+", label: "YoY Growth" },
              { value: 20000, prefix: "₹", suffix: "+ Cr", label: "Project Pipeline" },
              { value: 6, suffix: "", label: "Divisions" },
              { value: 20, suffix: "+", label: "Strategic Partners" },
              { value: 1000, suffix: "+", label: "Team Members" },
              { value: 15, suffix: "+", label: "States Active" },
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
                  <span className="stat-suffix">{stat.suffix}</span>
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

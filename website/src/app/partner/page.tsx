"use client";

import { useState } from "react";
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
import Select, { type SelectOption } from "@/components/ui/Select";
import {
  ArrowRight,
  Download,
  Users,
  Cpu,
  Link2,
  Shield,
  Globe,
  TrendingUp,
  Layers,
  CheckCircle2,
  Mail,
  Phone,
  Send,
} from "lucide-react";

/* ─── Partnership Models ─── */
const PARTNERSHIP_MODELS = [
  {
    icon: Users,
    title: "Joint Ventures & Consortia",
    description:
      "We form strategic joint ventures with complementary firms to bid on and execute large-scale infrastructure, energy, and defence projects. Our JV partnerships combine local expertise with global capabilities to win and deliver complex mandates.",
    highlights: [
      "Power Transmission EPC",
      "Renewable Energy Projects",
      "Defence Manufacturing Programs",
      "Infrastructure Development",
    ],
  },
  {
    icon: Cpu,
    title: "Technology Partners",
    description:
      "We collaborate with global technology leaders to bring cutting-edge solutions to emerging markets. From electrolyzer technology to advanced avionics, our technology partnerships bridge innovation with execution at scale.",
    highlights: [
      "Green Hydrogen Technology",
      "Electronics Manufacturing",
      "Aviation MRO Systems",
      "Smart Grid Solutions",
    ],
  },
  {
    icon: Link2,
    title: "Subcontracting & Supply Chain",
    description:
      "We engage specialized subcontractors, OEMs, and material suppliers across all our divisions. Our procurement processes are transparent, merit-based, and designed to build long-term vendor relationships.",
    highlights: [
      "EPC Subcontracting",
      "Equipment Supply",
      "Material Procurement",
      "Logistics & Warehousing",
    ],
  },
] as const;

/* ─── Value Propositions ─── */
const VALUE_PROPS = [
  {
    icon: Layers,
    title: "Multi-Sector Expertise",
    description:
      "Access capabilities across 5 business divisions and 7 industry sectors \u2014 from power transmission to aerospace MRO.",
  },
  {
    icon: Shield,
    title: "Proven Execution",
    description:
      "Over $300M in delivered project value with a 99.2% safety record and on-time delivery track record.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Operations and partnerships across 15+ regions with established supply chains and regulatory relationships.",
  },
  {
    icon: TrendingUp,
    title: "Growth Oriented",
    description:
      "500%+ year-on-year growth trajectory with an expanding portfolio of strategic opportunities.",
  },
] as const;

/* ─── Stats ─── */
const STATS = [
  { value: "$300M+", label: "Portfolio Value" },
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Regions" },
  { value: "12+", label: "Strategic Partners" },
] as const;

/* ─── Engagement Process ─── */
const PROCESS_STEPS = [
  {
    step: 1,
    title: "Submit Your Proposal",
    description:
      "Tell us about your organization, capabilities, and areas of interest through our partnership inquiry form.",
  },
  {
    step: 2,
    title: "Initial Assessment",
    description:
      "Our partnerships team reviews your proposal and evaluates alignment with current and upcoming opportunities.",
  },
  {
    step: 3,
    title: "Capability Discussion",
    description:
      "Shortlisted partners are invited for detailed capability presentations and mutual exploration of synergies.",
  },
  {
    step: 4,
    title: "Formal Agreement",
    description:
      "Upon mutual agreement, we formalize the partnership through appropriate legal and commercial frameworks.",
  },
] as const;

/* ─── Partner Logos ─── */
const PARTNER_LOGOS = [
  { src: "/images/partners/logos/powergrid.png", alt: "PowerGrid Corporation of India" },
  { src: "/images/partners/logos/ap-transco.png", alt: "AP Transco" },
  { src: "/images/partners/logos/tgtransco.png", alt: "TG Transco" },
  { src: "/images/partners/logos/apsfl.png", alt: "APSFL" },
  { src: "/images/partners/logos/sohhytec.png", alt: "SoHHytec" },
  { src: "/images/partners/logos/keltron.png", alt: "Keltron" },
  { src: "/images/partners/logos/cdac.png", alt: "C-DAC" },
  { src: "/images/partners/logos/tcil.png", alt: "TCIL" },
  { src: "/images/partners/logos/seci.png", alt: "SECI" },
  { src: "/images/partners/logos/mes.png", alt: "MES" },
  { src: "/images/partners/logos/bsnl.png", alt: "BSNL" },
] as const;

/* ─── Form Select Options ─── */
const PARTNERSHIP_TYPE_OPTIONS: readonly SelectOption[] = [
  { value: "Joint Venture", label: "Joint Venture" },
  { value: "Technology Partner", label: "Technology Partner" },
  { value: "Subcontractor", label: "Subcontractor" },
  { value: "Supplier", label: "Supplier" },
  { value: "Other", label: "Other" },
];

const INTEREST_AREA_OPTIONS: readonly SelectOption[] = [
  { value: "Power Transmission", label: "Power Transmission" },
  { value: "Renewable Energy", label: "Renewable Energy" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Defence Electronics", label: "Defence Electronics" },
  { value: "Aviation", label: "Aviation" },
  { value: "Green Hydrogen", label: "Green Hydrogen" },
  { value: "Manufacturing", label: "Manufacturing" },
];

/* ─── Initial Form State ─── */
const INITIAL_FORM_STATE = {
  organization: "",
  contactPerson: "",
  email: "",
  phone: "",
  partnershipType: "",
  areaOfInterest: "",
  message: "",
};

export default function PartnerPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-[var(--nav-height)]">
      {/* ═══ 1. Hero Section ═══ */}
      <section className="relative bg-manah-navy text-white overflow-hidden">
        <Image
          src="/images/partners/partners_hero.png"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(200,169,110,0.12),transparent_65%)]" />
        <div className="section-container py-24 md:py-32 lg:py-40 relative z-10">
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
              Collaborate With Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg md:text-display-xl font-bold mb-6"
            >
              Let&apos;s Build Something{" "}
              <span className="text-gradient-gold">
                Extraordinary Together
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-manah-gray-300 text-body-lg max-w-2xl"
            >
              We partner with visionary organizations worldwide to deliver
              projects that make a lasting, meaningful difference. Explore how
              we can create value together.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a href="#inquiry" className="btn-primary">
                Submit a Proposal <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="btn-secondary">
                <Download className="w-4 h-4" />
                Download Partnership Brochure
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. Partnership Models ═══ */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Partnership Models"
            title="How We Collaborate"
            description="We offer flexible partnership structures tailored to the scale, complexity, and strategic goals of each engagement."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {PARTNERSHIP_MODELS.map((model, i) => (
              <motion.div
                key={model.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group bg-white rounded-2xl p-8 border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-manah-navy flex items-center justify-center mb-6 group-hover:bg-manah-navy-light transition-colors duration-300">
                  <model.icon className="w-7 h-7 text-manah-gold" />
                </div>
                <h3 className="font-display text-heading-xl font-bold text-manah-navy mb-4">
                  {model.title}
                </h3>
                <p className="text-manah-gray-500 text-body-md leading-relaxed mb-6">
                  {model.description}
                </p>
                <ul className="space-y-2.5">
                  {model.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 text-body-sm text-manah-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-manah-gold shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. Why Partner With Manah ═══ */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Value Propositions */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading
                eyebrow="Why Partner With Us"
                title="A Partnership Built on Strength"
                description="Manah Group brings multi-sector capabilities, proven execution, and a growth trajectory that creates value for every stakeholder."
                align="left"
              />
              <div className="space-y-8 mt-10">
                {VALUE_PROPS.map((prop, i) => (
                  <motion.div
                    key={prop.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-manah-gold/10 flex items-center justify-center">
                      <prop.icon className="w-6 h-6 text-manah-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-1">
                        {prop.title}
                      </h3>
                      <p className="text-manah-gray-500 text-body-sm leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Stats Grid */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-manah-gray-200/60 text-center shadow-card hover:shadow-card-hover transition-all duration-500"
                >
                  <p className="font-display text-display-sm md:text-display-md font-bold text-manah-gold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-manah-gray-500 text-body-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 4. Engagement Process ═══ */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="How It Works"
            title="Our Engagement Process"
            description="A structured, transparent pathway from initial inquiry to formal partnership."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {PROCESS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {/* Connector line (hidden on last item and on mobile) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-manah-gold/30" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-manah-navy text-manah-gold font-display font-bold text-heading-lg mb-5">
                    {item.step}
                  </div>
                  <h3 className="font-display text-heading-md font-semibold text-manah-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-manah-gray-500 text-body-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. Current Partners Showcase ═══ */}
      <section className="section-padding bg-manah-navy">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Partners"
            title="Trusted By Industry Leaders"
            description="We are proud to collaborate with leading public and private sector organizations across India and beyond."
            mode="dark"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
            {PARTNER_LOGOS.map((logo, i) => (
              <motion.div
                key={logo.alt}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-center bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors duration-300 aspect-[3/2]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 max-h-12"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. Partnership Inquiry Form ═══ */}
      <section id="inquiry" className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Intro */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <SectionHeading
                eyebrow="Get In Touch"
                title="Start the Conversation"
                align="left"
              />
              <div className="space-y-5 text-manah-gray-500 text-body-md mt-6">
                <p>
                  Whether you are a technology licensor, an EPC subcontractor,
                  an equipment OEM, or a strategic investor, we would love to
                  explore how our capabilities align with your goals.
                </p>
                <p>
                  Fill out the form and our partnerships team will respond within
                  48 business hours with next steps.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:partnerships@manah.com"
                  className="flex items-center gap-3 text-manah-gray-600 hover:text-manah-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-manah-navy flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-manah-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-manah-navy">
                      Email
                    </p>
                    <p className="text-body-sm">partnerships@manah.com</p>
                  </div>
                </a>
                <a
                  href="tel:+919676902243"
                  className="flex items-center gap-3 text-manah-gray-600 hover:text-manah-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-manah-navy flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-manah-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-manah-navy">
                      Phone
                    </p>
                    <p className="text-body-sm">+91 96769 02243</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-glass p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-heading-lg font-bold text-manah-navy mb-2">
                    Proposal Received!
                  </h3>
                  <p className="text-manah-gray-500 text-body-md max-w-md mx-auto">
                    Thank you for your interest in partnering with Manah Group.
                    Our team will review your submission and respond within 48
                    business hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl shadow-glass p-8 md:p-10 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                      >
                        Organization Name *
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all"
                        placeholder="Your organization name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactPerson"
                        className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                      >
                        Contact Person *
                      </label>
                      <input
                        id="contactPerson"
                        name="contactPerson"
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="partnershipType"
                        className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                      >
                        Partnership Type *
                      </label>
                      <Select
                        id="partnershipType"
                        name="partnershipType"
                        required
                        options={PARTNERSHIP_TYPE_OPTIONS}
                        value={formData.partnershipType}
                        onChange={handleSelectChange("partnershipType")}
                        placeholder="Select partnership type"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="areaOfInterest"
                        className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                      >
                        Areas of Interest *
                      </label>
                      <Select
                        id="areaOfInterest"
                        name="areaOfInterest"
                        required
                        options={INTEREST_AREA_OPTIONS}
                        value={formData.areaOfInterest}
                        onChange={handleSelectChange("areaOfInterest")}
                        placeholder="Select area of interest"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-body-sm font-medium text-manah-gray-700 mb-1.5"
                    >
                      Message / Proposal Summary *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all resize-none"
                      placeholder="Describe your organization, capabilities, and how you envision a partnership with Manah Group..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-4 h-4" />
                    Submit Partnership Inquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

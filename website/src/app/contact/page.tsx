"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import {
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Globe,
  CheckCircle2,
} from "lucide-react";
import Select, { type SelectOption } from "@/components/ui/Select";
import WorldMap from "@/components/ui/WorldMap";

const OFFICES = [
  {
    city: "New Delhi",
    type: "Corporate Headquarters",
    address: "Manah House, Plot 12, Sector 44, Gurugram, Haryana 122003",
    phone: "+91 96769 02243",
    email: "info@manah.com",
  },
  {
    city: "Jaipur",
    type: "EPC & Projects Office",
    address: "Tower C, World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017",
    phone: "+91 96769 02243",
    email: "projects@manah.com",
  },
  {
    city: "Hyderabad",
    type: "Aerospace Division",
    address: "Manah Aerospace, Shamshabad, Ranga Reddy, Telangana 501218",
    phone: "+91 96769 02243",
    email: "aerospace@manah.com",
  },
  {
    city: "Bangalore",
    type: "Technology & Manufacturing",
    address: "Electronic City Phase II, Hosur Road, Bangalore, Karnataka 560100",
    phone: "+91 96769 02243",
    email: "tech@manah.com",
  },
];

const INQUIRY_TYPE_OPTIONS: readonly SelectOption[] = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Project / EPC Inquiry", label: "Project / EPC Inquiry" },
  { value: "Partnership Opportunity", label: "Partnership Opportunity" },
  { value: "Careers", label: "Careers" },
  { value: "Media / Press", label: "Media / Press" },
  { value: "Investor Relations", label: "Investor Relations" },
];

const DIVISION_OPTIONS: readonly SelectOption[] = [
  { value: "dynamics", label: "Manah Dynamics" },
  { value: "aerospace", label: "Manah Aerospace" },
  { value: "green-energy", label: "Green Energy" },
  { value: "technology", label: "Tech & Manufacturing" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    division: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would call an API endpoint
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative bg-manah-navy text-white overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,169,110,0.1),transparent_60%)]" />
        <div className="section-container py-24 md:py-28 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-4">
              Contact Us
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-display-lg md:text-display-xl font-bold mb-6">
              Let&apos;s Build{" "}
              <span className="text-gradient-gold">Together</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-manah-gray-300 text-body-lg">
              Whether you have a project in mind, a partnership to explore, or just want to learn more — we&apos;d love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Form + Info ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="font-display text-heading-xl font-bold text-manah-navy mb-2">
                Send Us a Message
              </h2>
              <p className="text-manah-gray-500 text-body-md mb-8">
                Fill in the form below and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-manah-gray-50 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-heading-lg font-bold text-manah-navy mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-manah-gray-500 text-body-md">
                    Thank you for reaching out. Our team will review your inquiry and respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
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
                    <div>
                      <label htmlFor="company" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="type" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
                        Inquiry Type *
                      </label>
                      <Select
                        id="type"
                        name="type"
                        required
                        options={INQUIRY_TYPE_OPTIONS}
                        value={formData.type}
                        onChange={handleSelectChange("type")}
                        placeholder="Select type"
                      />
                    </div>
                    <div>
                      <label htmlFor="division" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
                        Division of Interest
                      </label>
                      <Select
                        id="division"
                        name="division"
                        options={DIVISION_OPTIONS}
                        value={formData.division}
                        onChange={handleSelectChange("division")}
                        placeholder="Select division"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-body-sm font-medium text-manah-gray-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-manah-gray-200 text-body-md text-manah-gray-700 focus:outline-none focus:ring-2 focus:ring-manah-gold/40 focus:border-manah-gold transition-all resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-manah-navy rounded-2xl p-7 text-white">
                <h3 className="font-display text-heading-lg font-bold mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+919676902243" className="flex items-center gap-3 text-manah-gray-300 hover:text-manah-gold transition-colors">
                    <Phone className="w-5 h-5 text-manah-gold shrink-0" />
                    <span className="text-body-sm">+91 96769 02243</span>
                  </a>
                  <a href="mailto:info@manah.com" className="flex items-center gap-3 text-manah-gray-300 hover:text-manah-gold transition-colors">
                    <Mail className="w-5 h-5 text-manah-gold shrink-0" />
                    <span className="text-body-sm">info@manah.com</span>
                  </a>
                  <div className="flex items-start gap-3 text-manah-gray-300">
                    <Clock className="w-5 h-5 text-manah-gold shrink-0 mt-0.5" />
                    <span className="text-body-sm">Mon – Sat: 9:00 AM – 6:00 PM IST</span>
                  </div>
                  <div className="flex items-start gap-3 text-manah-gray-300">
                    <Globe className="w-5 h-5 text-manah-gold shrink-0 mt-0.5" />
                    <span className="text-body-sm">www.manah.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-manah-gray-50 rounded-2xl p-7">
                <h3 className="font-display text-heading-md font-bold text-manah-navy mb-4">For Specific Queries</h3>
                <div className="space-y-3 text-body-sm">
                  <div>
                    <p className="font-medium text-manah-navy">Business Development</p>
                    <a href="mailto:bd@manah.com" className="text-manah-gold hover:underline">bd@manah.com</a>
                  </div>
                  <div>
                    <p className="font-medium text-manah-navy">Careers & HR</p>
                    <a href="mailto:careers@manah.com" className="text-manah-gold hover:underline">careers@manah.com</a>
                  </div>
                  <div>
                    <p className="font-medium text-manah-navy">Media & Press</p>
                    <a href="mailto:media@manah.com" className="text-manah-gold hover:underline">media@manah.com</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Office Locations ─── */}
      <section className="section-padding bg-manah-gray-50">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Offices"
            title="Our Global Offices"
            description="Visit any of our offices for in-person meetings and discussions."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-manah-gray-200/60 hover:shadow-card-hover transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-manah-navy flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-manah-gold" />
                </div>
                <h3 className="font-display text-heading-md font-bold text-manah-navy">{office.city}</h3>
                <p className="text-manah-gold text-body-sm font-medium mb-3">{office.type}</p>
                <p className="text-manah-gray-500 text-body-sm mb-3">{office.address}</p>
                <div className="space-y-1.5 text-body-sm">
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-manah-gray-500 hover:text-manah-navy transition-colors">
                    <Phone className="w-3.5 h-3.5" /> {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-manah-gray-500 hover:text-manah-navy transition-colors">
                    <Mail className="w-3.5 h-3.5" /> {office.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Global Presence Map ─── */}
      <section className="section-padding bg-manah-navy">
        <div className="section-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-manah-gold font-semibold text-body-sm tracking-widest uppercase mb-3">
              Our Reach
            </p>
            <h2 className="font-display text-heading-xl md:text-display-sm font-bold text-white">
              Global Presence
            </h2>
            <p className="text-manah-gray-300 text-body-md mt-3 max-w-xl mx-auto">
              From headquarters to regional offices, our teams are strategically positioned across key technology and industrial hubs.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <WorldMap
              eyebrow="Manah Group"
              title="Our Global Presence"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Youtube, Twitter, Instagram, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import MotionSection from "@/components/animations/MotionSection";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-manah-navy text-white/80">
      {/* CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-manah-navy-dark via-manah-navy to-manah-dark">
        {/* Diagonal gold streaks */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[200px] bg-gradient-to-r from-transparent via-manah-gold/[0.07] to-transparent rotate-[-35deg]" />
          <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[150px] bg-gradient-to-r from-transparent via-manah-gold/[0.05] to-transparent rotate-[-35deg]" />
          <div className="absolute top-1/4 right-1/3 w-[400px] h-[100px] bg-gradient-to-r from-transparent via-manah-gold/[0.04] to-transparent rotate-[-35deg]" />
        </div>
        {/* Ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-manah-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-manah-accent-blue/10 rounded-full blur-[100px]" />
        </div>
        <div className="section-container section-padding relative">
          <MotionSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold leading-[1.08] tracking-tight text-white mb-4">
              Let&apos;s Build Together
            </h2>
            <p className="text-body-lg text-white/70 mb-8">
              The next chapter of global transformation is being written now. Partner with Manah Group to make it yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                View Our Projects
              </Link>
            </div>
          </MotionSection>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <Image
                src="/images/logo.avif"
                alt="Manah Group of Companies"
                width={180}
                height={48}
                className="h-10 w-auto brightness-0 invert transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
            <p className="text-body-sm text-white/50 mb-6 leading-relaxed">
              {SITE_CONFIG.tagline}. A diversified enterprise driving excellence across infrastructure, aviation, green energy, and technology.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: SITE_CONFIG.socials.linkedin },
                { icon: Twitter, href: SITE_CONFIG.socials.twitter },
                { icon: Youtube, href: SITE_CONFIG.socials.youtube },
                { icon: Instagram, href: SITE_CONFIG.socials.instagram },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-manah-gold hover:text-manah-navy transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-display font-semibold text-white text-body-md mb-5">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-white/50 hover:text-manah-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sectors */}
          <div>
            <h4 className="font-display font-semibold text-white text-body-md mb-5">Sectors</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.sectors.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-white/50 hover:text-manah-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-body-md mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-manah-gold mt-1 shrink-0" />
                <span className="text-body-sm text-white/50">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-manah-gold mt-1 shrink-0" />
                <a href="tel:+919676902243" className="text-body-sm text-white/50 hover:text-manah-gold transition-colors">+91 96769 02243</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-manah-gold mt-1 shrink-0" />
                <a href="mailto:info@manah.com" className="text-body-sm text-white/50 hover:text-manah-gold transition-colors">info@manah.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-caption text-white/40">
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link key={link.href} href={link.href} className="text-caption text-white/40 hover:text-manah-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PARTNERS = [
  { name: "Generic Engineering Construction & Projects Ltd.", logo: "/images/partners/logos/generic.png" },
  { name: "KELTRON", logo: "/images/partners/logos/keltron.png" },
  { name: "PowerGrid Corporation of India", logo: "/images/partners/logos/powergrid.png" },
  { name: "SoHHytec", logo: "/images/partners/logos/sohhytec.png" },
  { name: "SECI - Solar Energy Corporation of India", logo: "/images/partners/logos/seci.png" },
  { name: "APSFL - Andhra Pradesh State FiberNet Ltd.", logo: "/images/partners/logos/apsfl.png" },
  { name: "TGTRANSCO", logo: "/images/partners/logos/tgtransco.png" },
  { name: "C-DAC", logo: "/images/partners/logos/cdac.png" },
  { name: "BSNL", logo: "/images/partners/logos/bsnl.png" },
  { name: "AP TRANSCO", logo: "/images/partners/logos/ap-transco.png" },
  { name: "Military Engineering Service (MES)", logo: "/images/partners/logos/mes.png" },
  { name: "TCIL", logo: "/images/partners/logos/tcil.png" },
] as const;

function LogoItem({ partner }: { partner: (typeof PARTNERS)[number] }) {
  return (
    <div
      className="flex-shrink-0 relative w-[180px] h-[100px] sm:w-[220px] sm:h-[120px] lg:w-[260px] lg:h-[140px] mx-2 sm:mx-3 lg:mx-4"
      title={partner.name}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
        className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        unoptimized
      />
    </div>
  );
}

export default function StrategicPartnersSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-white overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gray-200 to-transparent" />

      {/* Heading */}
      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EXPO_EASE }}
        >
          <p className="text-manah-gold text-body-sm font-semibold tracking-widest uppercase mb-3">
            Trusted By Industry Leaders
          </p>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold leading-[1.08] tracking-tight text-manah-navy mb-4">
            Strategic Partners
          </h2>
          <p className="text-body-md sm:text-body-lg text-manah-gray-600 max-w-2xl mx-auto">
            Powering India&apos;s critical infrastructure alongside the nation&apos;s most
            trusted government agencies, defence organizations, and energy leaders.
          </p>
          <div className="gold-bar mt-6 mx-auto" />
        </motion.div>
      </div>

      {/* Marquee container */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EXPO_EASE }}
      >
        {/* Edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {/* First set */}
          <div className="flex items-center shrink-0">
            {PARTNERS.map((partner) => (
              <LogoItem key={partner.name} partner={partner} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {PARTNERS.map((partner) => (
              <LogoItem key={`dup-${partner.name}`} partner={partner} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-manah-gray-200 to-transparent" />
    </section>
  );
}

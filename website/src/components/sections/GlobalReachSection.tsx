"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, Users, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import GridNetworkBackground from "@/components/animations/GridNetworkBackground";
import ParallaxWrapper from "@/components/animations/ParallaxWrapper";
import CounterAnimation from "@/components/animations/CounterAnimation";
import WorldMap, { type MapLocation } from "@/components/ui/WorldMap";

const GLOBAL_STATS = [
  { icon: Briefcase, value: 6, suffix: "", label: "Global Offices" },
  { icon: MapPin, value: 15, suffix: "+", label: "States Active" },
  { icon: Globe, value: 50, suffix: "+", label: "Major Projects" },
  { icon: Users, value: 1000, suffix: "+", label: "Team Members" },
];

// Real [lon, lat] coordinates
const LOCATIONS: MapLocation[] = [
  { id: "hyderabad", label: "Hyderabad", sublabel: "Corporate HQ", coordinates: [78.487, 17.385] },
  { id: "gurugram", label: "New Delhi (Gurugram)", sublabel: "Regional Office", coordinates: [77.029, 28.457] },
  { id: "dubai", label: "Dubai", sublabel: "International Business", coordinates: [55.296, 25.276] },
  { id: "vishakhapatnam", label: "Vishakhapatnam", sublabel: "Regional Office", coordinates: [83.301, 17.686] },
  { id: "bhopal", label: "Bhopal", sublabel: "Regional Office", coordinates: [77.412, 23.259] },
  { id: "bangalore", label: "Bangalore", sublabel: "Regional Office", coordinates: [77.594, 12.972] },
];

export default function GlobalReachSection() {
  return (
    <section className="section-padding bg-manah-navy relative overflow-hidden">
      {/* Animated grid-network backdrop — echoes the global-footprint theme */}
      <GridNetworkBackground />

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="Global Footprint"
          title="Our Reach, Your Advantage"
          description="What started as a single office now spans regions and continents — delivering engineering excellence wherever the next great project demands it."
          light
        />

        {/* Map + Description/Stats row */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — Map (half width on desktop) */}
          <MotionSection direction="left">
            <ParallaxWrapper speed={0.3}>
            <WorldMap
              locations={LOCATIONS}
              eyebrow="Manah Group"
              title="Global Presence"
            />
            </ParallaxWrapper>
          </MotionSection>

          {/* Right — Description + Stats */}
          <div>
            <MotionSection direction="right">
              <h3 className="font-display text-[1.75rem] sm:text-[2rem] font-semibold text-white mb-4">
                Expanding Horizons
              </h3>
              <p className="text-body-lg text-white/70 leading-relaxed mb-10">
                With operations spanning multiple regions and growing international partnerships,
                Manah Group is rapidly establishing itself as a trusted name in the global EPC landscape.
              </p>
            </MotionSection>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {GLOBAL_STATS.map((stat, i) => (
                <MotionSection key={i} delay={0.2 + i * 0.1} direction="right">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-manah-gold/20 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-manah-gold mb-2" />
                    <div className="font-display text-[1.75rem] font-bold text-white">
                      <CounterAnimation value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-body-sm text-white/60 mt-1">{stat.label}</p>
                  </div>
                </MotionSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

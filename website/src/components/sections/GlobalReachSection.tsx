"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, Users, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionSection from "@/components/animations/MotionSection";
import CounterAnimation from "@/components/animations/CounterAnimation";
import WorldMap, { type MapLocation } from "@/components/ui/WorldMap";

const GLOBAL_STATS = [
  { icon: MapPin, value: 15, suffix: "+", label: "Operating Regions" },
  { icon: Globe, value: 5, suffix: "+", label: "Countries" },
  { icon: Briefcase, value: 50, suffix: "+", label: "Major Projects" },
  { icon: Users, value: 1000, suffix: "+", label: "Team Members" },
];

// Real [lon, lat] coordinates
const LOCATIONS: MapLocation[] = [
  { id: "hyderabad", label: "Hyderabad", sublabel: "Global Headquarters", coordinates: [78.487, 17.385] },
  { id: "mumbai", label: "Mumbai", sublabel: "Regional Office", coordinates: [72.877, 19.076] },
  { id: "delhi", label: "Delhi NCR", sublabel: "Regional Office", coordinates: [77.209, 28.614] },
  { id: "chennai", label: "Chennai", sublabel: "Operations Hub", coordinates: [80.270, 13.083] },
  { id: "dubai", label: "Dubai", sublabel: "Middle East Office", coordinates: [55.296, 25.276] },
];

export default function GlobalReachSection() {
  return (
    <section className="section-padding bg-manah-navy relative overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(200,169,110,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="section-container relative">
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
            <WorldMap
              locations={LOCATIONS}
              eyebrow="Manah Group"
              title="Global Presence"
            />
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

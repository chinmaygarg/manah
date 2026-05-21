"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import BlurImage from "@/components/ui/BlurImage";
import SectionHeading from "@/components/ui/SectionHeading";
import type { DivisionDetail } from "@/lib/divisions-data";

type Lifecycle = NonNullable<DivisionDetail["deliveryLifecycle"]>;

interface DivisionLifecycleProps {
  lifecycle: Lifecycle;
}

/**
 * Image-led EPC lifecycle walkthrough — one card per phase, rendered on a dark
 * navy band so the cinematic phase photography carries the section. Gold is
 * used for accents (the division navy accent would vanish on this background).
 */
export default function DivisionLifecycle({ lifecycle }: DivisionLifecycleProps) {
  return (
    <section className="section-padding bg-manah-navy text-white relative overflow-hidden">
      {/* Soft gold accent glow */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 82% 0%, #C8A96E, transparent 58%)",
        }}
      />
      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow={lifecycle.eyebrow}
          title={lifecycle.title}
          description={lifecycle.description}
          mode="dark"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {lifecycle.phases.map((phase) => (
            <motion.div key={phase.step} variants={fadeUp} className="group">
              {/* Phase image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                <BlurImage
                  src={phase.image}
                  alt={`${phase.title} — ${phase.subtitle}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-manah-navy via-manah-navy/25 to-transparent" />
                <span className="absolute top-3 left-4 font-display text-display-sm font-bold leading-none text-manah-gold">
                  {phase.step}
                </span>
              </div>

              {/* Phase content */}
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-manah-gold/15">
                    <phase.icon className="w-5 h-5 text-manah-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-heading-md font-semibold text-white leading-tight">
                      {phase.title}
                    </h3>
                    <p className="text-caption uppercase tracking-wider text-manah-gold/80">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-body-sm text-white/65 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

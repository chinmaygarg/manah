"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from "@/lib/animations";
import BlurImage from "@/components/ui/BlurImage";
import type { DivisionPillar } from "@/lib/divisions-data";

interface DivisionPillarsProps {
  pillars: DivisionPillar[];
  /** Division accent colour — applied to eyebrow labels and service icons. */
  color: string;
}

/**
 * Renders a division's capability areas as alternating image/content sections —
 * one full section per pillar. Used in place of the flat services grid for
 * divisions whose data defines `pillars` (currently Manah AI).
 */
export default function DivisionPillars({ pillars, color }: DivisionPillarsProps) {
  return (
    <>
      {pillars.map((pillar, p) => {
        const imageLeft = p % 2 === 0;
        const sectionBg = imageLeft ? "bg-manah-gray-50" : "bg-white";
        const cardBg = imageLeft ? "bg-white" : "bg-manah-gray-50";

        return (
          <section key={pillar.name} className={`section-padding ${sectionBg}`}>
            <div className="section-container">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* ─── Pillar image ─── */}
                <motion.div
                  variants={imageLeft ? fadeLeft : fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-manah-gray-100 ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <BlurImage
                    src={pillar.image}
                    alt={pillar.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 opacity-[0.14]"
                    style={{ background: `linear-gradient(135deg, ${color}, transparent 70%)` }}
                  />
                </motion.div>

                {/* ─── Pillar content ─── */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={imageLeft ? "lg:order-2" : "lg:order-1"}
                >
                  <motion.span
                    variants={fadeUp}
                    className="inline-block text-caption font-semibold uppercase tracking-[0.15em] mb-3"
                    style={{ color }}
                  >
                    Pillar {String(p + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3rem] font-semibold leading-[1.1] tracking-tight text-manah-navy"
                  >
                    {pillar.name}
                  </motion.h2>
                  <motion.div variants={fadeUp} className="gold-bar mt-5" />
                  <motion.p
                    variants={fadeUp}
                    className="mt-5 text-body-lg text-manah-gray-600 leading-relaxed"
                  >
                    {pillar.tagline}
                  </motion.p>

                  <motion.div variants={staggerContainer} className="mt-8 space-y-3">
                    {pillar.services.map((service) => (
                      <motion.div
                        key={service.title}
                        variants={fadeUp}
                        className={`flex gap-4 p-4 sm:p-5 rounded-xl border border-manah-gray-200/60 hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-300 ${cardBg}`}
                      >
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <service.icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <h3 className="font-display text-heading-md font-semibold text-manah-navy">
                              {service.title}
                            </h3>
                            {service.inPipeline && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-manah-gold/12 text-manah-gold border border-manah-gold/25">
                                <span className="w-1.5 h-1.5 rounded-full bg-manah-gold" />
                                In Pipeline
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-body-sm text-manah-gray-500 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

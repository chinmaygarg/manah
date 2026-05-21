"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from "@/lib/animations";
import BlurImage from "@/components/ui/BlurImage";
import SectionHeading from "@/components/ui/SectionHeading";
import type { DivisionDetail } from "@/lib/divisions-data";

type Ems = NonNullable<DivisionDetail["ems"]>;

interface DivisionEmsShowcaseProps {
  ems: Ems;
  /** Division accent colour — used for the value-chain step markers. */
  color: string;
}

/**
 * Electronics Manufacturing Services showcase — pairs a facility photo with the
 * value-chain steps, then presents the manufactured product line-up as an
 * image-led grid. Degrades gracefully when `facilityImage` / `products` are
 * absent, so the component is safe for any division carrying an `ems` block.
 */
export default function DivisionEmsShowcase({
  ems,
  color,
}: DivisionEmsShowcaseProps) {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <SectionHeading
          eyebrow="Electronics Manufacturing"
          title={ems.heading}
          description={ems.intro}
        />

        {/* ─── Facility + value chain ─── */}
        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {ems.facilityImage && (
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-manah-gray-100"
            >
              <BlurImage
                src={ems.facilityImage}
                alt={`${ems.heading} facility`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  background: `linear-gradient(135deg, ${color}, transparent 70%)`,
                }}
              />
            </motion.div>
          )}

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={ems.facilityImage ? "" : "lg:col-span-2"}
          >
            {ems.phases.map((phase, i) => {
              const isLast = i === ems.phases.length - 1;
              return (
                <motion.li
                  key={phase.title}
                  variants={fadeUp}
                  className="flex gap-4"
                >
                  {/* Step marker + connecting rail */}
                  <div className="flex flex-col items-center">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center font-display text-body-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: `${color}14`, color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!isLast && (
                      <span className="w-px flex-1 bg-manah-gray-200 mt-1" />
                    )}
                  </div>
                  <div className={isLast ? "" : "pb-6"}>
                    <h3 className="font-display text-heading-md font-semibold text-manah-navy">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-manah-gray-500 text-body-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        {/* ─── Product line-up ─── */}
        {ems.products && ems.products.length > 0 && (
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-body-sm font-semibold uppercase tracking-widest text-manah-gold">
                Product Portfolio
              </p>
              <h3 className="mt-2 font-display text-heading-xl font-bold text-manah-navy">
                What We Build
              </h3>
              <p className="mt-2 text-manah-gray-500 text-body-md">
                In-house manufacturing across smart metering, e-mobility, and
                defence electronics.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {ems.products.map((product) => (
                <motion.div
                  key={product.name}
                  variants={fadeRight}
                  className="group bg-white rounded-xl border border-manah-gray-200/60 overflow-hidden hover:border-manah-gold/30 hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="relative aspect-square bg-manah-navy overflow-hidden">
                    <BlurImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-body-md font-semibold text-manah-navy">
                      {product.name}
                    </h4>
                    <p className="mt-1 text-manah-gray-500 text-body-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

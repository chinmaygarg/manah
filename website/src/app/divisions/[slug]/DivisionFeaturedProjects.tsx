"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import BlurImage from "@/components/ui/BlurImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";
import type { DivisionDetail } from "@/lib/divisions-data";

type Featured = NonNullable<DivisionDetail["featuredProjects"]>;

interface DivisionFeaturedProjectsProps {
  featured: Featured;
}

/** Bento spans — the first project is the hero tile, the last is a wide banner. */
const SPAN_BY_INDEX = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-3",
];

/**
 * Flagship projects shown as an asymmetric bento grid — a large hero tile, two
 * stacked tiles, and a full-width banner — each a photo with category, value,
 * and status overlaid. Tiles link through to the filtered projects page.
 */
export default function DivisionFeaturedProjects({
  featured,
}: DivisionFeaturedProjectsProps) {
  return (
    <section className="section-padding bg-manah-gray-50">
      <div className="section-container">
        <SectionHeading
          eyebrow={featured.eyebrow}
          title={featured.title}
          description={featured.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[15rem]"
        >
          {featured.projects.map((project, i) => {
            const isHero = i === 0;
            return (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className={SPAN_BY_INDEX[i] ?? "lg:col-span-1"}
              >
                <Link
                  href={featured.cta.href}
                  className="group relative block w-full h-full min-h-[15rem] rounded-2xl overflow-hidden"
                >
                  <BlurImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      isHero
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 1024px) 100vw, 33vw"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-manah-navy via-manah-navy/45 to-transparent" />

                  {/* Category chip */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-caption">
                    {project.category}
                  </span>

                  {/* Value badge */}
                  {project.value && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-manah-gold text-manah-navy font-display font-bold text-body-sm">
                      {project.value}
                    </span>
                  )}

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-2 text-manah-gold text-caption uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-manah-gold" />
                      {project.status}
                    </div>
                    <h3
                      className={`font-display font-semibold text-white ${
                        isHero ? "text-heading-lg" : "text-heading-md"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-white/70 text-body-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href={featured.cta.href} className="btn-primary">
            {featured.cta.text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

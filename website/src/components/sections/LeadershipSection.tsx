"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { LEADERS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="section-padding bg-manah-gray-50">
      <div className="section-container">
        <SectionHeading
          eyebrow="Leadership"
          title="The Minds Behind Manah"
          description="Seasoned leaders with decades of military, engineering, and corporate experience steering our vision of excellence."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {LEADERS.map((leader, i) => (
            <motion.div
              key={leader.name}
              variants={fadeUp}
              transition={{ delay: i * 0.12 }}
              className="group"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-manah-gray-200 mb-5">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <h3 className="font-display text-heading-md font-bold text-manah-navy">
                {leader.name}
              </h3>
              <p className="text-manah-gold font-medium text-body-sm mb-2">
                {leader.title}
              </p>
              <p className="text-manah-gray-500 text-body-sm">
                {leader.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/about#leadership"
            className="inline-flex items-center gap-2 text-manah-navy font-semibold text-body-md hover:text-manah-gold transition-colors duration-300 group/link"
          >
            Meet the Full Team
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

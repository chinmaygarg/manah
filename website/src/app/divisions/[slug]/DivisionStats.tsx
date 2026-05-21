"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import CounterAnimation from "@/components/animations/CounterAnimation";
import type { DivisionDetail } from "@/lib/divisions-data";

interface DivisionStatsProps {
  stats: DivisionDetail["keyStats"];
}

/**
 * Headline metrics strip. A stat carrying a numeric `count` animates up from
 * zero on scroll; stats without one (e.g. "1M+") render their `value` verbatim,
 * so the component stays backward compatible for every division.
 */
export default function DivisionStats({ stats }: DivisionStatsProps) {
  return (
    <section className="bg-white border-b border-manah-gray-200">
      <div className="section-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-heading-xl font-bold text-manah-navy">
                {stat.count != null ? (
                  <CounterAnimation
                    value={stat.count}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-manah-gray-500 text-body-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

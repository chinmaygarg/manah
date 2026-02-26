"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DivisionCardProps {
  name: string;
  tagline: string;
  description: string;
  href: string;
  color: string;
  index: number;
}

export default function DivisionCard({
  name,
  tagline,
  description,
  href,
  color,
  index,
}: DivisionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-manah-navy p-8 lg:p-10 h-full min-h-[320px] flex flex-col justify-between"
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Accent gradient corner */}
          <div
            className="absolute top-0 right-0 w-40 h-40 opacity-20 blur-3xl rounded-full transition-opacity duration-500 group-hover:opacity-40"
            style={{ backgroundColor: color }}
          />

          <div>
            {/* Division icon dot */}
            <div
              className="w-3 h-3 rounded-full mb-6"
              style={{ backgroundColor: color }}
            />

            <h3 className="text-heading-xl font-display font-bold text-white mb-2">
              {name}
            </h3>
            <p
              className="text-body-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color }}
            >
              {tagline}
            </p>
            <p className="text-body-md text-manah-gray-400 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-8 text-manah-gold group-hover:gap-3 transition-all duration-300">
            <span className="text-body-sm font-semibold">Explore Division</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
            style={{ backgroundColor: color }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

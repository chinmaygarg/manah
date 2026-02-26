"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/constants";

interface MegaMenuPanelProps {
  item: NavItem;
  onClose: () => void;
}

export default function MegaMenuPanel({ item, onClose }: MegaMenuPanelProps) {
  const children = item.children ?? [];
  const featuredItems = children.filter((c) => c.featured);
  const textLinks = children.filter((c) => !c.featured);
  const { megaMenu } = item;

  const gridCols =
    featuredItems.length <= 2
      ? "grid-cols-2"
      : featuredItems.length <= 3
        ? "grid-cols-3"
        : featuredItems.length <= 4
          ? "grid-cols-2 lg:grid-cols-4"
          : featuredItems.length <= 5
            ? "grid-cols-3 lg:grid-cols-5"
            : "grid-cols-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 right-0 top-full z-50"
      onMouseLeave={onClose}
    >
      {/* Gold accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-manah-gold to-transparent" />

      <div className="bg-white shadow-glass-lg border-b border-manah-gray-200/40">
        <div className="section-container py-8">
          <div className={cn("flex gap-10", megaMenu ? "" : "justify-center")}>
            {/* Left Panel — heading + description + CTA */}
            {megaMenu && (
              <div className="w-64 shrink-0 flex flex-col justify-center pr-6 border-r border-manah-gray-200/60">
                <h3 className="font-display font-bold text-heading-md text-manah-navy mb-3 leading-snug">
                  {megaMenu.heading}
                </h3>
                <p className="text-body-sm text-manah-gray-500 mb-5 leading-relaxed">
                  {megaMenu.description}
                </p>
                <Link
                  href={megaMenu.ctaHref}
                  onClick={onClose}
                  className="group/cta inline-flex items-center gap-2 text-body-sm font-semibold text-manah-gold hover:text-manah-gold-dark transition-colors"
                >
                  {megaMenu.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                </Link>
              </div>
            )}

            {/* Right Panel — image cards grid */}
            <div className="flex-1 min-w-0">
              <div className={cn("grid gap-4", gridCols)}>
                {featuredItems.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="group/card flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
                  >
                    {child.image && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-manah-gray-100">
                        <Image
                          src={child.image}
                          alt={child.label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          sizes="(max-width: 1024px) 50vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-manah-navy/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <div className="py-2.5 px-1">
                      <span className="text-body-sm font-semibold text-manah-gray-700 group-hover/card:text-manah-navy transition-colors">
                        {child.label}
                      </span>
                      {child.description && (
                        <p className="text-caption text-manah-gray-400 mt-0.5 group-hover/card:text-manah-gray-500 transition-colors">
                          {child.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Text links row for non-featured items */}
              {textLinks.length > 0 && (
                <div className="mt-5 pt-4 border-t border-manah-gray-200/60 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {textLinks.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="group/link inline-flex items-center gap-1.5 text-body-sm text-manah-gray-500 hover:text-manah-navy transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-manah-gold/60 group-hover/link:bg-manah-gold transition-colors" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

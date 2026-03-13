"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type TransitionVariant = "line" | "gradient" | "dots";
type TransitionColor = "gold" | "navy" | "white";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  color?: TransitionColor;
  className?: string;
}

const colorMap: Record<TransitionColor, string> = {
  gold: "from-transparent via-manah-gold/40 to-transparent",
  navy: "from-transparent via-manah-navy/20 to-transparent",
  white: "from-transparent via-white/20 to-transparent",
};

const dotColorMap: Record<TransitionColor, string> = {
  gold: "bg-manah-gold/50",
  navy: "bg-manah-navy/30",
  white: "bg-white/30",
};

const gradientBandMap: Record<TransitionColor, string> = {
  gold: "from-manah-gold/0 via-manah-gold/[0.07] to-manah-gold/0",
  navy: "from-manah-navy/0 via-manah-navy/[0.05] to-manah-navy/0",
  white: "from-white/0 via-white/[0.05] to-white/0",
};

export default function SectionTransition({
  variant = "line",
  color = "gold",
  className,
}: SectionTransitionProps) {
  const reducedMotion = useReducedMotion();

  if (variant === "line") {
    return (
      <div className={cn("relative py-2", className)}>
        <motion.div
          className={cn(
            "h-px bg-gradient-to-r mx-auto max-w-5xl",
            colorMap[color],
          )}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={
            reducedMotion
              ? { duration: 0.1 }
              : { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }
          style={{ transformOrigin: "center" }}
        />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <motion.div
        className={cn(
          "h-16 bg-gradient-to-b",
          gradientBandMap[color],
          className,
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={
          reducedMotion ? { duration: 0.1 } : { duration: 0.8 }
        }
      />
    );
  }

  // dots
  return (
    <div className={cn("flex items-center justify-center gap-2 py-6", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn("w-1.5 h-1.5 rounded-full", dotColorMap[color])}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={
            reducedMotion
              ? { duration: 0.1 }
              : { duration: 0.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
          }
        />
      ))}
    </div>
  );
}

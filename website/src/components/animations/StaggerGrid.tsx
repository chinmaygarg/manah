"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, scaleIn, fadeIn, reducedMotionFade } from "@/lib/animations";

type AnimationType = "fadeUp" | "scaleIn" | "fadeIn";

interface StaggerGridProps {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: AnimationType;
  className?: string;
  once?: boolean;
}

const animationMap: Record<AnimationType, Variants> = {
  fadeUp,
  scaleIn,
  fadeIn,
};

export default function StaggerGrid({
  children,
  staggerDelay = 0.1,
  animation = "fadeUp",
  className,
  once = true,
}: StaggerGridProps) {
  const reducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = reducedMotion
    ? reducedMotionFade
    : animationMap[animation];

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

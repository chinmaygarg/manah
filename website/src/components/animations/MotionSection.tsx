"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none" | "blur" | "scale" | "clipReveal";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
}

function getAnimationStates(direction: Direction) {
  switch (direction) {
    case "blur":
      return {
        initial: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
        duration: 0.7,
      };
    case "scale":
      return {
        initial: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        duration: 0.8,
      };
    case "clipReveal":
      return {
        initial: { clipPath: "inset(0 100% 0 0)" },
        visible: { clipPath: "inset(0 0% 0 0)" },
        duration: 0.8,
      };
    case "up":
      return { initial: { opacity: 0, y: 50 }, visible: { opacity: 1, x: 0, y: 0 }, duration: 0.8 };
    case "down":
      return { initial: { opacity: 0, y: -50 }, visible: { opacity: 1, x: 0, y: 0 }, duration: 0.8 };
    case "left":
      return { initial: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, y: 0 }, duration: 0.8 };
    case "right":
      return { initial: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, y: 0 }, duration: 0.8 };
    case "none":
      return { initial: { opacity: 0 }, visible: { opacity: 1, x: 0, y: 0 }, duration: 0.8 };
  }
}

export default function MotionSection({
  children,
  className,
  id,
  delay = 0,
  direction = "up",
  once = true,
}: MotionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <motion.div
        ref={ref}
        id={id}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.15, delay }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }

  const { initial, visible, duration } = getAnimationStates(direction);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={initial}
      animate={isInView ? visible : initial}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealDirection = "left" | "right" | "top" | "bottom" | "center";

interface ScrollRevealImageProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  once?: boolean;
  className?: string;
}

const clipPathMap: Record<RevealDirection, { hidden: string; visible: string }> =
  {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
    top: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
    bottom: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    center: {
      hidden: "inset(50% 50% 50% 50%)",
      visible: "inset(0% 0% 0% 0%)",
    },
  };

export default function ScrollRevealImage({
  children,
  direction = "left",
  once = true,
  className,
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [hasRevealed, setHasRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  // Track when the reveal completes for `once` behavior
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (once && !hasRevealed && latest >= 0.98) {
      setHasRevealed(true);
    }
  });

  const clip = clipPathMap[direction];
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [clip.hidden, clip.visible],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  if (reducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  // Once fully revealed, lock to visible state
  if (hasRevealed) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ clipPath, opacity }}
    >
      {children}
    </motion.div>
  );
}

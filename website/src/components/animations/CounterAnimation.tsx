"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CounterAnimationProps {
  value?: number;
  to?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}

export default function CounterAnimation({
  value: valueProp,
  to,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  onComplete,
}: CounterAnimationProps) {
  const value = valueProp ?? to ?? 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onComplete,
      });
      const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, count, rounded, duration, onComplete]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

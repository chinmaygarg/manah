"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "y" | "x";
  className?: string;
}

function useWindowWidth(): number {
  const [width, setWidth] = useState(1024); // SSR-safe default (desktop)

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
    let timeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResize, 150);
    };
    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleResize]);

  return width;
}

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  direction = "y",
  className,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const windowWidth = useWindowWidth();

  const effectiveSpeed =
    reducedMotion || windowWidth < 480
      ? 0
      : windowWidth < 768
        ? speed * 0.5
        : speed;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = 100 * effectiveSpeed;
  const rawValue: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [range, -range],
  );

  const smoothValue = useSpring(rawValue, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.5,
  });

  // Dynamic will-change via IntersectionObserver
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || effectiveSpeed === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [effectiveSpeed]);

  if (effectiveSpeed === 0) {
    return <div className={className}>{children}</div>;
  }

  const motionStyle =
    direction === "y" ? { y: smoothValue } : { x: smoothValue };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...motionStyle,
        willChange: isVisible ? "transform" : "auto",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MANAH GROUP — Framer Motion Animation Variants
   Reusable animation presets for consistent micro-interactions
   ═══════════════════════════════════════════════════════════ */

import type { Variants, Transition } from "framer-motion";

// ─── Shared Transitions ───
export const smoothSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const snappySpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const easeOutExpo: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

// ─── Fade Variants ───
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Scale Variants ───
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothSpring,
  },
};

// ─── Stagger Container ───
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Card Hover ───
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 2px 16px rgba(10, 22, 40, 0.06)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 12px 40px rgba(10, 22, 40, 0.14)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Image Zoom on Hover ───
export const imageZoom = {
  rest: { scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  hover: { scale: 1.08, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Navigation ───
export const menuSlideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const mobileMenuOverlay: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export const mobileMenuPanel: Variants = {
  hidden: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const mobileNavItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Page Transition ───
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3 },
  },
};

// ─── Counter Animation Config ───
export const counterConfig = {
  duration: 2,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

// ─── Scroll-triggered reveal ───
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

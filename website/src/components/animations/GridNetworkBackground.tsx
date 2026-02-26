"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GRID_COLS = 9;
const GRID_ROWS = 5;
const CELL_SIZE = 80;

const WIDTH = GRID_COLS * CELL_SIZE;
const HEIGHT = GRID_ROWS * CELL_SIZE;

export default function GridNetworkBackground() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const horizontalLines = Array.from({ length: GRID_ROWS + 1 }, (_, i) => i);
  const verticalLines = Array.from({ length: GRID_COLS + 1 }, (_, i) => i);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-manah-navy)_70%)]" />

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal grid lines */}
        {horizontalLines.map((i) => (
          <motion.line
            key={`h-${i}`}
            x1={0}
            y1={i * CELL_SIZE}
            x2={WIDTH}
            y2={i * CELL_SIZE}
            stroke="var(--color-manah-gold)"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.08 } : { opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Vertical grid lines */}
        {verticalLines.map((i) => (
          <motion.line
            key={`v-${i}`}
            x1={i * CELL_SIZE}
            y1={0}
            x2={i * CELL_SIZE}
            y2={HEIGHT}
            stroke="var(--color-manah-gold)"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.08 } : { opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5 + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Connection spine - horizontal line through the middle */}
        <motion.line
          x1={CELL_SIZE}
          y1={HEIGHT / 2}
          x2={WIDTH - CELL_SIZE}
          y2={HEIGHT / 2}
          stroke="var(--color-manah-gold)"
          strokeWidth={1.5}
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 0.35 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.4, delay: 0.8 },
          }}
        />

        {/* Glow filter for the spine and nodes */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="var(--color-manah-gold)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-manah-gold)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
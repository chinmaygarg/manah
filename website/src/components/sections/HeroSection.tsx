"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParallaxWrapper from "@/components/animations/ParallaxWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Spells M-A-N-A-H — one letter per division, mirroring the presentation
// cover slide. Order is authoritative (presentation deck); Investments has
// no letter and is shown elsewhere on the site, not in this hero strip.
const DIVISIONS = [
  {
    letter: "M",
    label: "Dynamics",
    video: "/videos/hero/hero_infrastructure",
    poster: "/images/hero/hero_main_infrastructure.webp",
  },
  {
    letter: "A",
    label: "Aerospace",
    video: "/videos/hero/hero_aerospace",
    poster: "/images/hero/hero_aviation_mro.webp",
  },
  {
    letter: "N",
    label: "Green Energy",
    video: "/videos/hero/hero_green_energy",
    poster: "/images/hero/hero_renewable_energy.webp",
  },
  {
    letter: "A",
    label: "Atomic",
    video: "/videos/hero/hero_atomic",
    poster: "/images/hero/hero_atomic.webp",
  },
  {
    letter: "H",
    label: "AI",
    video: "/videos/hero/hero_ai",
    poster: "/images/hero/hero_ai.webp",
  },
] as const;

const CROSSFADE_DURATION = 4000; // ms per video

function getVideoSrc(basePath: string, isMobile: boolean): string {
  return isMobile ? `${basePath}-480p.mp4` : `${basePath}-720p.mp4`;
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCrossfade = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DIVISIONS.length);
    }, CROSSFADE_DURATION);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setIsLoaded(true);
    startCrossfade();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCrossfade]);

  // Play/pause videos based on active index
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    });
  }, [activeIndex]);

  return (
    <section
      className="relative h-dvh min-h-[700px] max-h-[1100px] overflow-hidden -mt-20 bg-manah-navy"
      aria-label="Manah Group hero"
    >
      {/* Video backgrounds with crossfade */}
      <ParallaxWrapper speed={0.3} className="absolute inset-0 bg-manah-navy">
        {DIVISIONS.map((div, i) => (
          <div
            key={div.label}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              autoPlay={i === 0}
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              poster={div.poster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={getVideoSrc(div.video, isMobile)} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-manah-navy/70 via-manah-navy/40 to-manah-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/50 via-transparent to-manah-navy/50" />
      </ParallaxWrapper>

      {/* Content — centered, Essar-inspired */}
      <div className="relative h-full section-container flex flex-col items-center justify-center text-center pt-20 pb-56 sm:pb-52">
        {/* Headline — lowercase, calm, confident.
            Rendered visible on first paint (no opacity:0 in SSR) so it can
            serve as the LCP element; only a subtle slide-up on hydration. */}
        <motion.h1
          initial={{ y: 24 }}
          animate={isLoaded ? { y: 0 } : { y: 24 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[3.3rem] leading-[1.1] sm:text-[4.25rem] lg:text-[5.5rem] lg:leading-[1.05] xl:text-[6.5rem] font-bold text-white mb-6 max-w-5xl tracking-tight lowercase"
        >
          building what the{" "}
          <br className="hidden sm:block" />
          world needs next.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-body-md sm:text-body-lg lg:text-heading-lg text-white/60 max-w-2xl mb-12 font-light leading-relaxed"
        >
          We partner with visionary clients to deliver projects that make a
          lasting, meaningful difference for people and communities around the
          world.
        </motion.p>

        {/* Bottom: Division indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0"
        >
          {/* Thin separator line */}
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

            {/* MANAH letter strip — each letter glows gold in sync with the
                background-video crossfade; clicking jumps to that division */}
            <div className="flex items-end justify-center gap-x-3 sm:gap-x-8 lg:gap-x-12">
              {DIVISIONS.map((div, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={div.label}
                    onClick={() => {
                      setActiveIndex(i);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      startCrossfade();
                    }}
                    aria-label={`Show ${div.label}`}
                    aria-pressed={active}
                    className="flex flex-col items-center gap-1.5 sm:gap-2"
                  >
                    <span
                      className={`font-display font-extrabold leading-none text-4xl sm:text-5xl lg:text-6xl transition-all duration-500 ${
                        active
                          ? "text-manah-gold scale-110"
                          : "text-white/25 sm:text-white/15 scale-100 hover:text-white/40"
                      }`}
                      style={
                        active
                          ? { textShadow: "0 0 24px rgba(200,169,110,0.45)" }
                          : undefined
                      }
                    >
                      {div.letter}
                    </span>
                    <span
                      className={`hidden sm:block text-caption tracking-[0.15em] uppercase transition-colors duration-500 ${
                        active ? "text-manah-gold font-medium" : "text-white/30"
                      }`}
                    >
                      {div.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile-only: single active division label below the strip */}
            <div className="sm:hidden mt-3 h-4 text-center">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-caption tracking-[0.15em] uppercase text-manah-gold font-medium"
              >
                {DIVISIONS[activeIndex].label}
              </motion.span>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-1 mt-6"
            animate={reducedMotion ? {} : { y: [0, 6, 0] }}
            transition={reducedMotion ? {} : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

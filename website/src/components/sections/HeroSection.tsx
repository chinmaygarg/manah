"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";

const DIVISIONS = [
  {
    label: "Infrastructure",
    video: "/videos/hero/hero_infrastructure",
    poster: "/images/hero/hero_main_infrastructure.png",
  },
  {
    label: "Aerospace",
    video: "/videos/hero/hero_aerospace",
    poster: "/images/hero/hero_aviation_mro.png",
  },
  {
    label: "Green Energy",
    video: "/videos/hero/hero_green_energy",
    poster: "/images/hero/hero_renewable_energy.png",
  },
  {
    label: "Technology",
    video: "/videos/hero/hero_technology",
    poster: "/images/hero/hero_construction_site.png",
  },
  {
    label: "Investments",
    video: "/videos/hero/hero_investments",
    poster: "/images/hero/hero_construction_site.png",
  },
] as const;

const CROSSFADE_DURATION = 4000; // ms per video
const TRANSITION_DURATION = 1200; // ms for crossfade

function getVideoSrc(basePath: string): string {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return `${basePath}-480p.mp4`;
  }
  return `${basePath}-720p.mp4`;
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCrossfade = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DIVISIONS.length);
    }, CROSSFADE_DURATION);
  }, []);

  useEffect(() => {
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
      className="relative h-dvh min-h-[700px] max-h-[1100px] overflow-hidden -mt-20"
      aria-label="Manah Group hero"
    >
      {/* Video backgrounds with crossfade */}
      <div className="absolute inset-0 bg-manah-navy">
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
              <source src={getVideoSrc(div.video)} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-manah-navy/70 via-manah-navy/40 to-manah-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-manah-navy/50 via-transparent to-manah-navy/50" />
      </div>

      {/* Content — centered, Essar-inspired */}
      <div className="relative h-full section-container flex flex-col items-center justify-center text-center pt-20 pb-44 sm:pb-40">
        {/* Headline — lowercase, calm, confident */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-md sm:text-display-lg lg:text-[5.5rem] lg:leading-[1.05] xl:text-[6.5rem] font-bold text-white mb-6 max-w-5xl tracking-tight lowercase"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-body-md font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02]">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-manah-gold/20 group-hover:bg-manah-gold/30 transition-colors">
              <Play className="w-4 h-4 text-manah-gold fill-manah-gold" />
            </span>
            Watch Our Story
          </button>
        </motion.div>

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

            {/* Division names */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8 lg:gap-x-10">
              {DIVISIONS.map((div, i) => (
                <button
                  key={div.label}
                  onClick={() => {
                    setActiveIndex(i);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    startCrossfade();
                  }}
                  className={`text-caption sm:text-body-sm tracking-[0.15em] uppercase transition-all duration-500 ${
                    i === activeIndex
                      ? "text-manah-gold font-medium"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {div.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-1 mt-6"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

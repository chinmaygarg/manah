"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="pt-[var(--nav-height)] min-h-[80vh] flex items-center justify-center bg-manah-gray-50">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center px-4"
      >
        <motion.p
          variants={fadeUp}
          className="font-display text-[8rem] md:text-[12rem] font-bold text-manah-gold/20 leading-none select-none"
        >
          404
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display text-display-sm md:text-display-md font-bold text-manah-navy -mt-8 md:-mt-12"
        >
          Page Not Found
        </motion.h1>
        <motion.p variants={fadeUp} className="text-manah-gray-500 text-body-lg mt-4 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary border-manah-navy text-manah-navy hover:bg-manah-navy hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}

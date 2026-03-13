"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import MotionSection from "@/components/animations/MotionSection";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  return (
    <section className="section-padding bg-manah-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,169,110,0.08),transparent_70%)]" />
      <div className="section-container relative z-10">
        <MotionSection className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-manah-gold-light font-semibold text-body-sm tracking-widest uppercase mb-4">
            Newsletter
          </span>
          <h2 className="font-display text-display-sm md:text-display-md font-bold mb-4">
            Stay Ahead of{" "}
            <span className="text-gradient-gold">Industry Trends</span>
          </h2>
          <p className="text-manah-gray-300 text-body-lg mb-8 max-w-lg mx-auto">
            Subscribe to The Manah Journal for curated insights on
            infrastructure, energy transitions, and technology breakthroughs
            delivered straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-manah-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your work email"
                className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-manah-gray-400 text-body-sm focus:outline-none focus:border-manah-gold/60 focus:ring-1 focus:ring-manah-gold/30 transition-all duration-300"
              />
            </div>
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-caption text-manah-gray-400">
            Monthly digest. No spam. Unsubscribe anytime.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}

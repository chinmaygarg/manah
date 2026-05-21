"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import MotionSection from "@/components/animations/MotionSection";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import HoneypotField from "@/components/forms/HoneypotField";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const { status, error, submit } = useFormSubmit("/api/newsletter");
  const subscribed = status === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;
    await submit({ email, company_website: honeypot, turnstileToken });
  };

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

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 text-manah-gold-light">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-body-md">
                You&apos;re subscribed. Watch your inbox.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-3 max-w-md mx-auto mb-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-manah-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your work email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-manah-gray-400 text-body-sm focus:outline-none focus:border-manah-gold/60 focus:ring-1 focus:ring-manah-gold/30 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting" || !turnstileToken}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Subscribing…" : "Subscribe"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <TurnstileWidget
                onVerify={setTurnstileToken}
                onReset={() => setTurnstileToken("")}
              />

              {status === "error" && error && (
                <p role="alert" className="text-body-sm text-red-300">
                  {error}
                </p>
              )}
            </form>
          )}

          <p className="text-caption text-manah-gray-400">
            Monthly digest. No spam. Unsubscribe anytime.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import MotionSection from "@/components/animations/MotionSection";
import SectionHeading from "@/components/ui/SectionHeading";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Reusable FAQ accordion. Native <details>/<summary> keeps it keyboard- and
 * screen-reader-accessible and SSR-friendly. Pair with <FaqJsonLd> on the
 * server page so the same Q&A is exposed as FAQPage structured data (AEO).
 */
export default function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Frequently Asked Questions",
  description,
  className = "bg-white",
}: {
  readonly items: readonly FaqItem[];
  readonly eyebrow?: string;
  readonly title?: string;
  readonly description?: string;
  readonly className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className={`section-padding ${className}`}>
      <div className="section-container">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => (
            <MotionSection key={i}>
              <details className="group bg-manah-gray-50 rounded-xl border border-manah-gray-200/60 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer text-manah-navy font-semibold text-body-md hover:text-manah-gold transition-colors duration-300 list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown className="w-4 h-4 shrink-0 text-manah-gray-400 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-manah-gray-600 text-body-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </details>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}

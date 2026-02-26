import { cn } from "@/lib/utils";
import MotionSection from "@/components/animations/MotionSection";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  mode?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  mode,
  className,
}: SectionHeadingProps) {
  const isLight = light || mode === "dark";
  return (
    <MotionSection
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center max-w-3xl mx-auto",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-caption font-semibold uppercase tracking-[0.15em] mb-4",
            isLight ? "text-manah-gold-light" : "text-manah-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold leading-[1.08] tracking-tight mb-4",
          isLight ? "text-white" : "text-manah-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-body-lg max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            isLight ? "text-white/70" : "text-manah-gray-600"
          )}
        >
          {description}
        </p>
      )}
      <div className={cn("gold-bar mt-6", align === "center" && "mx-auto")} />
    </MotionSection>
  );
}

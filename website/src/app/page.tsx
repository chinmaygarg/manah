import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";

import DivisionsSection from "@/components/sections/DivisionsSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import GlobalReachSection from "@/components/sections/GlobalReachSection";
import CapabilitiesPreview from "@/components/sections/CapabilitiesPreview";
import StrategicPartnersSection from "@/components/sections/StrategicPartnersSection";
import NewsSection from "@/components/sections/NewsSection";

// Root layout supplies title / description / Open Graph; the homepage
// only needs its own canonical so it is not inferred from a child route.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <DivisionsSection />
      <LeadershipSection />
      <GlobalReachSection />
      <CapabilitiesPreview />
      <StrategicPartnersSection />
      <NewsSection />
    </>
  );
}

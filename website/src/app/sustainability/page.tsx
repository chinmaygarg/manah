import { pageMetadata } from "@/lib/page-metadata";
import SustainabilityContent from "./SustainabilityContent";

export const metadata = pageMetadata({
  title: "Sustainability & ESG",
  description: "Manah Group's commitment to environmental stewardship, social responsibility, and strong governance across every division.",
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return <SustainabilityContent />;
}

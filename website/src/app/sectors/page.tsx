import { pageMetadata } from "@/lib/page-metadata";
import SectorsContent from "./SectorsContent";

export const metadata = pageMetadata({
  title: "Sectors We Serve",
  description: "Manah Group delivers EPC solutions across power transmission, building & roads, telecom, defence, renewables, mining, oil & gas, irrigation, and disaster management.",
  path: "/sectors",
});

export default function SectorsPage() {
  return <SectorsContent />;
}

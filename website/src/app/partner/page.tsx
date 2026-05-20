import { pageMetadata } from "@/lib/page-metadata";
import PartnerContent from "./PartnerContent";

export const metadata = pageMetadata({
  title: "Partner With Us",
  description: "Partner with Manah Group on infrastructure, energy, and technology projects. Explore joint ventures, supply, and strategic collaboration.",
  path: "/partner",
});

export default function PartnerPage() {
  return <PartnerContent />;
}

import { pageMetadata } from "@/lib/page-metadata";
import CapabilitiesContent from "./CapabilitiesContent";

export const metadata = pageMetadata({
  title: "Capabilities",
  description: "End-to-end engineering, procurement, and construction capabilities — design engineering, manufacturing, turnkey project delivery, and lifecycle services.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}

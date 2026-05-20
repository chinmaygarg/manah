import { pageMetadata } from "@/lib/page-metadata";
import PrivacyContent from "./PrivacyContent";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Manah Group collects, uses, stores, and protects your personal data, and your rights under applicable data protection law.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}

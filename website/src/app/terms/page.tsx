import { pageMetadata } from "@/lib/page-metadata";
import TermsContent from "./TermsContent";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions governing the use of the Manah Group website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsContent />;
}

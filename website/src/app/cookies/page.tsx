import { pageMetadata } from "@/lib/page-metadata";
import CookiesContent from "./CookiesContent";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How Manah Group uses cookies and similar technologies, and how you can manage your cookie preferences.",
  path: "/cookies",
});

export default function CookiesPage() {
  return <CookiesContent />;
}

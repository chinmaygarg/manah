import { pageMetadata } from "@/lib/page-metadata";
import AboutContent from "./AboutContent";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Manah Group is a diversified enterprise founded in 2018, delivering EPC and engineering excellence across six divisions — Dynamics, Green Energy, Atomic, Aerospace, AI, and Investments.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}

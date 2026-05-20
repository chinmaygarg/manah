import { pageMetadata } from "@/lib/page-metadata";
import CareersContent from "./CareersContent";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build your career with Manah Group. Explore openings across engineering, energy, aerospace, AI, and project management.",
  path: "/careers",
});

export default function CareersPage() {
  return <CareersContent />;
}

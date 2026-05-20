import { pageMetadata } from "@/lib/page-metadata";
import ProjectsContent from "./ProjectsContent";

export const metadata = pageMetadata({
  title: "Landmark Projects",
  description: "Explore Manah Group's portfolio of landmark EPC projects across power transmission, infrastructure, energy, telecom, and defence.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsContent />;
}

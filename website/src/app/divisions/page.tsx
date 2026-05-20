import { pageMetadata } from "@/lib/page-metadata";
import DivisionsContent from "./DivisionsContent";

export const metadata = pageMetadata({
  title: "Our Divisions",
  description: "Six divisions, one vision — Manah Dynamics, Manah Green Energy, Manah Atomic, Manah Aerospace, Manah AI, and Manah Investments.",
  path: "/divisions",
});

export default function DivisionsPage() {
  return <DivisionsContent />;
}

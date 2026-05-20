import { pageMetadata } from "@/lib/page-metadata";
import BlogListContent from "./BlogListContent";

export const metadata = pageMetadata({
  title: "Blog & Insights",
  description: "Insights and analysis on EPC delivery, energy transition, infrastructure, defence electronics, and technology from Manah Group.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogListContent />;
}

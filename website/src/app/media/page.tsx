import { pageMetadata } from "@/lib/page-metadata";
import MediaContent from "./MediaContent";

export const metadata = pageMetadata({
  title: "Media & News",
  description: "Latest news, press releases, awards, and media coverage from Manah Group.",
  path: "/media",
});

export default function MediaPage() {
  return <MediaContent />;
}

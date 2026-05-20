import { pageMetadata } from "@/lib/page-metadata";
import ContactContent from "./ContactContent";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Get in touch with Manah Group. Reach our Hyderabad headquarters for project inquiries, partnerships, and career opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}

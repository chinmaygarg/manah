import type { MetadataRoute } from "next";
import { ALL_BLOG_ARTICLES } from "@/lib/blog-data";

const BASE_URL = "https://www.manah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/divisions", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/divisions/dynamics", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/aerospace", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/green-energy", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/technology", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sectors", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sectors/power-transmission", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/renewable-energy", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/infrastructure", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/defence", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/aviation", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/green-hydrogen", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/manufacturing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/capabilities", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sustainability", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/media", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    ...ALL_BLOG_ARTICLES.map((article) => ({
      path: `/blog/${article.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

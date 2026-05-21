import type { MetadataRoute } from "next";
import { ALL_BLOG_ARTICLES } from "@/lib/blog-data";

const BASE_URL = "https://www.manah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/divisions", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/divisions/dynamics", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/green-energy", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/atomic", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/aerospace", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/ai", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/divisions/investments", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sectors", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sectors/power-transmission", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/building-roads", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/telecom", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/bess-scada", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/defence", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/irrigation-water", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/mining", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/oil-gas", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/renewable-energy", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sectors/disaster-management", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/capabilities", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sustainability", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/media", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/partner", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
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

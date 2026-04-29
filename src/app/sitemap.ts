import { MetadataRoute } from "next";
import { getAllPrompts } from "@/lib/prompt-service";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";
  const staticPages = ["", "/catalog", "/create", "/search", "/knowledge", "/research"];
  const dynamicPages = getAllPrompts().map((item) => `/prompts/${item.id}`);

  return [...staticPages, ...dynamicPages].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}

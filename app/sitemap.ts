import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** One URL per page; locale is cookie-driven (no `/en` in public URLs). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const paths = ["", "/privacy", "/terms"] as const;

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}

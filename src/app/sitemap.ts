import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

const SITE_URL = "https://be-found.online";

// All static pages with their last modified dates
const staticPages = [
  { path: "/", lastModified: "2026-02-17", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", lastModified: "2026-02-17", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", lastModified: "2026-02-17", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/products/bloffee", lastModified: "2026-02-17", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/products/geo-score", lastModified: "2026-02-17", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/pricing", lastModified: "2026-02-17", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", lastModified: "2026-02-17", changeFrequency: "yearly" as const, priority: 0.6 },
  { path: "/faq", lastModified: "2026-02-17", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/privacy", lastModified: "2026-02-17", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", lastModified: "2026-02-17", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/cookies", lastModified: "2026-02-17", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/impressum", lastModified: "2026-02-17", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    // Build alternates for all locales
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      languages[locale] = `${SITE_URL}${prefix}${page.path}`;
    }
    languages["x-default"] = `${SITE_URL}${page.path}`;

    // English (default) — no prefix
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    });

    // Other locales — with prefix
    for (const locale of locales) {
      if (locale === "en") continue;
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}

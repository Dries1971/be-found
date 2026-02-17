import type { Metadata } from "next";
import { getOgMetadata } from "./og";

const SITE_URL = "https://be-found.online";
const locales = ["en", "nl", "de", "fr", "es", "pt"] as const;

type OgType = "default" | "blog" | "pillar" | "service" | "report";

interface PageMetadataParams {
  locale: string;
  path: string;
  title: string;
  description: string;
  ogType?: OgType;
  ogSubtitle?: string;
  ogStat?: string;
}

/**
 * Generate consistent metadata for a page including:
 * - title, description
 * - canonical URL
 * - hreflang alternates for all 6 locales
 * - OpenGraph + Twitter Card images via /api/og
 */
export function generatePageMetadata({
  locale,
  path,
  title,
  description,
  ogType = "default",
  ogSubtitle,
  ogStat,
}: PageMetadataParams): Metadata {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const url = `${SITE_URL}${prefix}${path}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    const locPrefix = loc === "en" ? "" : `/${loc}`;
    languages[loc] = `${SITE_URL}${locPrefix}${path}`;
  }
  languages["x-default"] = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    ...getOgMetadata({
      title,
      description,
      url,
      type: ogType,
      subtitle: ogSubtitle,
      stat: ogStat,
    }),
  };
}

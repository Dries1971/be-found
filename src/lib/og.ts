const SITE_URL = "https://be-found.online";

type OgType = "default" | "blog" | "pillar" | "service" | "report";

interface OgImageParams {
  title: string;
  type?: OgType;
  subtitle?: string;
  stat?: string;
}

/**
 * Generate an OG image URL pointing to /api/og.
 * Used in generateMetadata() across all pages.
 */
export function getOgImageUrl({
  title,
  type = "default",
  subtitle,
  stat,
}: OgImageParams): string {
  const params = new URLSearchParams({ title, type });
  if (subtitle) params.set("subtitle", subtitle);
  if (stat) params.set("stat", stat);
  return `${SITE_URL}/api/og?${params.toString()}`;
}

/**
 * Generate OpenGraph + Twitter metadata for a page.
 * Provides consistent OG image configuration across all pages.
 */
export function getOgMetadata({
  title,
  description,
  url,
  type = "default",
  subtitle,
  stat,
}: {
  title: string;
  description: string;
  url: string;
  type?: OgType;
  subtitle?: string;
  stat?: string;
}) {
  const imageUrl = getOgImageUrl({ title, type, subtitle, stat });

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: "Be-Found.online",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [imageUrl],
    },
  };
}

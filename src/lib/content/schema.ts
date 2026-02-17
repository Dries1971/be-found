import { z } from "zod";

/**
 * Zod schema for pillar page frontmatter.
 *
 * Every MDX file in content/pillar-pages/ must include
 * these fields in its YAML frontmatter block.
 */
export const pillarFrontmatterSchema = z.object({
  /** URL slug for this locale (e.g., "geo-statistics-2026") */
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),

  /** Canonical ID shared across translations (usually the EN slug) */
  canonicalId: z.string(),

  /** Locale this content is written in */
  locale: z.enum(["en", "nl", "de", "fr", "es", "pt"]),

  /** Page title (used in <title> and H1) */
  title: z.string().min(10).max(100),

  /** Meta description for SEO (120-155 chars per MASTERPLAN) */
  description: z.string().min(80).max(200),

  /** Publication date (ISO 8601) */
  publishedAt: z.string().datetime({ offset: true }).or(z.string().date()),

  /** Last modification date (ISO 8601) — shown on page per GEO best practice */
  updatedAt: z.string().datetime({ offset: true }).or(z.string().date()),

  /** Author name */
  author: z.string().default("Dries de Gelder"),

  /** Author role/title for E-E-A-T */
  authorRole: z.string().default("Founder & GEO Strategist"),

  /** Content tags for categorization */
  tags: z.array(z.string()).min(1),

  /** Target keywords for this page */
  keywords: z.array(z.string()).min(1),

  /** GEO-Score (tracked, target 85+ for pillar pages) */
  geoScore: z.number().min(0).max(100).optional(),

  /** OG image path (relative to public/) */
  image: z.string().optional(),

  /** Content type for schema.org and rendering decisions */
  contentType: z.enum(["pillar", "statistics", "comparison", "guide"]).default("pillar"),

  /** Content license — statistics/research = CC BY 4.0, rest = All Rights Reserved */
  license: z.enum(["cc-by-4.0", "all-rights-reserved"]).default("all-rights-reserved"),

  /** Draft status — drafts are excluded from production builds */
  draft: z.boolean().default(false),
});

export type PillarFrontmatter = z.infer<typeof pillarFrontmatterSchema>;

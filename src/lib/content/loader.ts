import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { pillarFrontmatterSchema, type PillarFrontmatter } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "src/content/pillar-pages");

export interface PillarPage {
  frontmatter: PillarFrontmatter;
  content: string; // raw MDX body (without frontmatter)
}

/**
 * Get a single pillar page by locale and slug.
 * Returns null if not found or if the page is a draft in production.
 */
export function getPillarPage(
  locale: string,
  slug: string
): PillarPage | null {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) return null;

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const parsed = pillarFrontmatterSchema.safeParse(data);

    if (!parsed.success) {
      console.warn(`[MDX] Invalid frontmatter in ${filePath}:`, parsed.error.format());
      continue;
    }

    if (parsed.data.slug === slug) {
      // Skip drafts in production
      if (parsed.data.draft && process.env.NODE_ENV === "production") {
        return null;
      }

      return { frontmatter: parsed.data, content };
    }
  }

  return null;
}

/**
 * Get all pillar pages for a locale.
 * In production, drafts are excluded.
 */
export function getAllPillarPages(locale: string): PillarPage[] {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) return [];

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith(".mdx"));
  const pages: PillarPage[] = [];

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const parsed = pillarFrontmatterSchema.safeParse(data);

    if (!parsed.success) {
      console.warn(`[MDX] Invalid frontmatter in ${filePath}:`, parsed.error.format());
      continue;
    }

    // Skip drafts in production
    if (parsed.data.draft && process.env.NODE_ENV === "production") {
      continue;
    }

    pages.push({ frontmatter: parsed.data, content });
  }

  return pages;
}

/**
 * Get all slugs across all locales for generateStaticParams.
 */
export function getAllPillarSlugs(): Array<{ locale: string; slug: string }> {
  const locales = ["en", "nl", "de", "fr", "es", "pt"];
  const result: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const pages = getAllPillarPages(locale);
    for (const page of pages) {
      result.push({ locale, slug: page.frontmatter.slug });
    }
  }

  return result;
}

/**
 * Get alternate locale versions of a pillar page (for hreflang).
 * Finds all pages sharing the same canonicalId.
 */
export function getAlternateLocales(
  canonicalId: string
): Array<{ locale: string; slug: string }> {
  const locales = ["en", "nl", "de", "fr", "es", "pt"];
  const alternates: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const pages = getAllPillarPages(locale);
    const match = pages.find((p) => p.frontmatter.canonicalId === canonicalId);
    if (match) {
      alternates.push({ locale, slug: match.frontmatter.slug });
    }
  }

  return alternates;
}

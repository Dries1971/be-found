import { describe, it, expect } from "vitest";
import { pillarFrontmatterSchema } from "@/lib/content/schema";

describe("pillarFrontmatterSchema", () => {
  const validFrontmatter = {
    slug: "geo-statistics-2026",
    canonicalId: "geo-statistics-2026",
    locale: "en",
    title: "GEO Statistics 2026: 60+ Data Points on AI Search Visibility",
    description:
      "Verified statistics on Generative Engine Optimization (GEO) in 2026. AI search usage, zero-click rates, citation data.",
    publishedAt: "2026-02-17",
    updatedAt: "2026-02-17",
    author: "Dries de Gelder",
    authorRole: "Founder & GEO Strategist",
    tags: ["GEO", "Statistics"],
    keywords: ["geo statistics", "ai search statistics 2026"],
    geoScore: 92,
    contentType: "statistics",
    license: "cc-by-4.0",
    draft: false,
  };

  it("validates correct frontmatter", () => {
    const result = pillarFrontmatterSchema.safeParse(validFrontmatter);
    expect(result.success).toBe(true);
  });

  it("rejects invalid slug (uppercase)", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      slug: "GEO-Statistics",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid slug (spaces)", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      slug: "geo statistics",
    });
    expect(result.success).toBe(false);
  });

  it("rejects unsupported locale", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      locale: "ja",
    });
    expect(result.success).toBe(false);
  });

  it("accepts all 6 supported locales", () => {
    for (const locale of ["en", "nl", "de", "fr", "es", "pt"]) {
      const result = pillarFrontmatterSchema.safeParse({
        ...validFrontmatter,
        locale,
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects title shorter than 10 chars", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      title: "Short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description shorter than 80 chars", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      description: "Too short for SEO meta description.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty tags array", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      tags: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects geoScore above 100", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      geoScore: 150,
    });
    expect(result.success).toBe(false);
  });

  it("rejects geoScore below 0", () => {
    const result = pillarFrontmatterSchema.safeParse({
      ...validFrontmatter,
      geoScore: -10,
    });
    expect(result.success).toBe(false);
  });

  it("accepts all content types", () => {
    for (const contentType of ["pillar", "statistics", "comparison", "guide"]) {
      const result = pillarFrontmatterSchema.safeParse({
        ...validFrontmatter,
        contentType,
      });
      expect(result.success).toBe(true);
    }
  });

  it("defaults author to Dries de Gelder", () => {
    const { author, ...withoutAuthor } = validFrontmatter;
    void author;
    const result = pillarFrontmatterSchema.parse(withoutAuthor);
    expect(result.author).toBe("Dries de Gelder");
  });

  it("defaults draft to false", () => {
    const { draft, ...withoutDraft } = validFrontmatter;
    void draft;
    const result = pillarFrontmatterSchema.parse(withoutDraft);
    expect(result.draft).toBe(false);
  });
});

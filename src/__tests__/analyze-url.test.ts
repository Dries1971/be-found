import { describe, it, expect } from "vitest";
import { normalizeAnalysisUrl } from "@/lib/analyze-url";

describe("normalizeAnalysisUrl", () => {
  it("accepts full https URLs and strips the fragment", () => {
    expect(normalizeAnalysisUrl("https://example.com/page#top")).toBe(
      "https://example.com/page",
    );
  });

  it("adds https:// when the scheme is missing", () => {
    expect(normalizeAnalysisUrl("  www.example.nl/product ")).toBe(
      "https://www.example.nl/product",
    );
  });

  it("keeps http URLs", () => {
    expect(normalizeAnalysisUrl("http://example.com/")).toBe("http://example.com/");
  });

  it.each([
    "",
    "not a url",
    "ftp://example.com/file",
    "javascript:alert(1)",
    "https://localhost/",
    "https://intranet/",
    "https://192.168.1.10/",
    "https://[::1]/",
    "https://printer.local/",
    "https://user:pass@example.com/",
    "https://example.com:8080/",
    `https://example.com/${"a".repeat(2100)}`,
  ])("rejects %s", (input) => {
    expect(normalizeAnalysisUrl(input)).toBeNull();
  });
});

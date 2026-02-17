import { describe, it, expect } from "vitest";
import { generatePageMetadata } from "@/lib/metadata";

describe("generatePageMetadata()", () => {
  it("generates correct canonical URL for EN (no prefix)", () => {
    const meta = generatePageMetadata({
      locale: "en",
      path: "/about",
      title: "About",
      description: "About page",
    });
    expect(meta.alternates?.canonical).toBe("https://be-found.online/about");
  });

  it("generates correct canonical URL for NL (with prefix)", () => {
    const meta = generatePageMetadata({
      locale: "nl",
      path: "/about",
      title: "Over ons",
      description: "Over ons pagina",
    });
    expect(meta.alternates?.canonical).toBe("https://be-found.online/nl/about");
  });

  it("generates hreflang alternates for all 6 locales + x-default", () => {
    const meta = generatePageMetadata({
      locale: "en",
      path: "/services",
      title: "Services",
      description: "Our services",
    });
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages).toBeDefined();
    expect(Object.keys(languages)).toHaveLength(7); // 6 locales + x-default
    expect(languages.en).toBe("https://be-found.online/services");
    expect(languages.nl).toBe("https://be-found.online/nl/services");
    expect(languages.de).toBe("https://be-found.online/de/services");
    expect(languages.fr).toBe("https://be-found.online/fr/services");
    expect(languages.es).toBe("https://be-found.online/es/services");
    expect(languages.pt).toBe("https://be-found.online/pt/services");
    expect(languages["x-default"]).toBe("https://be-found.online/services");
  });

  it("includes title and description in metadata", () => {
    const meta = generatePageMetadata({
      locale: "en",
      path: "/",
      title: "Home",
      description: "Welcome to Be-Found",
    });
    expect(meta.title).toBe("Home");
    expect(meta.description).toBe("Welcome to Be-Found");
  });

  it("handles root path correctly for EN", () => {
    const meta = generatePageMetadata({
      locale: "en",
      path: "/",
      title: "Home",
      description: "Home page",
    });
    expect(meta.alternates?.canonical).toBe("https://be-found.online/");
  });

  it("handles root path correctly for DE", () => {
    const meta = generatePageMetadata({
      locale: "de",
      path: "/",
      title: "Startseite",
      description: "Startseite",
    });
    expect(meta.alternates?.canonical).toBe("https://be-found.online/de/");
  });
});

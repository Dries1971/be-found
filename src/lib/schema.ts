import type {
  Organization,
  Person,
  BreadcrumbList,
} from "schema-dts";

const SITE_URL = "https://be-found.online";

/* ─── Core Entity IDs (stable, referenced across pages) ─── */

export const entityIds = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  personDries: `${SITE_URL}/#person-dries`,
} as const;

/* ─── Organization ─── */

export function generateOrganization(): Organization {
  return {
    "@type": "Organization",
    "@id": entityIds.organization,
    name: "Be-Found",
    alternateName: "Be-Found.online",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: "512",
      height: "512",
    },
    description:
      "The authority hub for Generative Engine Optimization (GEO) & AI visibility. Parent brand of Bloffee and GEO-Score.",
    foundingDate: "1996",
    founder: { "@id": entityIds.personDries },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 2,
    },
    knowsAbout: [
      "Generative Engine Optimization",
      "GEO",
      "AI SEO",
      "Search Engine Optimization",
      "AI Visibility",
      "Content Strategy",
      "Agentic Commerce",
    ],
    sameAs: [
      "https://linkedin.com/in/driesdegelder",
      "https://linkedin.com/company/be-found-online",
      "https://bsky.app/profile/be-found.online",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@be-found.online",
      availableLanguage: ["English", "Dutch", "German"],
    },
    areaServed: ["US", "GB", "AE", "NL", "DE"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GEO & AI Visibility Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GEO Consulting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Content Strategy",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GEO Audit",
          },
        },
      ],
    },
  };
}

/* ─── WebSite (uses Record due to Google's non-standard "query-input") ─── */

export function generateWebSite(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": entityIds.website,
    url: SITE_URL,
    name: "Be-Found.online",
    description:
      "The authority hub for Generative Engine Optimization (GEO) & AI visibility",
    publisher: { "@id": entityIds.organization },
    inLanguage: ["en", "nl", "de", "fr", "es", "pt"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─── Person (Dries de Gelder) ─── */

export function generatePersonDries(): Person {
  return {
    "@type": "Person",
    "@id": entityIds.personDries,
    name: "Dries de Gelder",
    jobTitle: "Founder & GEO Strategist",
    worksFor: { "@id": entityIds.organization },
    knowsAbout: [
      "Generative Engine Optimization",
      "SEO",
      "AI Visibility",
      "eCommerce",
      "Agentic Commerce",
    ],
    description:
      "30+ years in digital strategy, SEO and AI. Founder of Be-Found, Bloffee, and GEO-Score.",
    sameAs: [
      "https://linkedin.com/in/driesdegelder",
      `${SITE_URL}/about`,
    ],
    image: `${SITE_URL}/images/dries-de-gelder.jpg`,
  };
}

/* ─── BreadcrumbList (dynamic per route) ─── */

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function generateBreadcrumbs(
  items: BreadcrumbItem[],
  locale?: string
): BreadcrumbList {
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      ...(item.href
        ? { item: `${SITE_URL}${prefix}${item.href}` }
        : {}),
    })),
  };
}

/* ─── Global @graph (every page) ─── */

export function generateGlobalGraph(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganization(),
      generateWebSite(),
      generatePersonDries(),
    ],
  };
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getLocale } from "next-intl/server";
import { ArticleLayout } from "@/components/layouts/ArticleLayout";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/schema/JsonLd";
import { entityIds } from "@/lib/schema";
import {
  getPillarPage,
  getAllPillarSlugs,
  getAlternateLocales,
} from "@/lib/content/loader";
import { getMdxComponents } from "@/lib/content/mdx-components";

const SITE_URL = "https://be-found.online";

interface PillarPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllPillarSlugs();
}

export async function generateMetadata({
  params,
}: PillarPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getPillarPage(locale, slug);

  if (!page) return {};

  const { frontmatter: fm } = page;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const url = `${SITE_URL}${prefix}/${fm.slug}`;

  // Build alternates for hreflang
  const alternates = getAlternateLocales(fm.canonicalId);
  const languages: Record<string, string> = {};
  for (const alt of alternates) {
    const altPrefix = alt.locale === "en" ? "" : `/${alt.locale}`;
    languages[alt.locale] = `${SITE_URL}${altPrefix}/${alt.slug}`;
  }

  return {
    title: fm.title,
    description: fm.description,
    keywords: fm.keywords,
    authors: [{ name: fm.author }],
    openGraph: {
      title: fm.title,
      description: fm.description,
      url,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      authors: [fm.author],
      tags: fm.tags,
      ...(fm.image ? { images: [{ url: `${SITE_URL}${fm.image}` }] } : {}),
    },
    alternates: {
      canonical: url,
      languages,
    },
  };
}

export default async function PillarPageRoute({ params }: PillarPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getPillarPage(locale, slug);

  if (!page) notFound();

  const { frontmatter: fm, content } = page;
  const prefix = locale === "en" ? "" : `/${locale}`;

  // Article Schema.org
  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt,
    author: { "@id": entityIds.personDries },
    publisher: { "@id": entityIds.organization },
    mainEntityOfPage: `${SITE_URL}${prefix}/${fm.slug}`,
    keywords: fm.keywords.join(", "),
    inLanguage: fm.locale,
    ...(fm.image
      ? { image: { "@type": "ImageObject", url: `${SITE_URL}${fm.image}` } }
      : {}),
    ...(fm.license === "cc-by-4.0"
      ? { license: "https://creativecommons.org/licenses/by/4.0/" }
      : {}),
  };

  // Sidebar: Table of Contents placeholder + metadata
  const sidebar = (
    <div className="space-y-6">
      {/* Article metadata */}
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
          Author
        </p>
        <div>
          <p className="font-semibold text-foreground">{fm.author}</p>
          <p className="text-sm text-foreground-muted">{fm.authorRole}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
          Last updated
        </p>
        <time
          dateTime={fm.updatedAt}
          className="text-sm font-medium text-foreground"
        >
          {new Date(fm.updatedAt).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
          Topics
        </p>
        <div className="flex flex-wrap gap-2">
          {fm.tags.map((tag) => (
            <Badge key={tag} intent="tag">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* GEO-Score */}
      {fm.geoScore != null && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
            GEO-Score
          </p>
          <Badge intent="geo-score">{fm.geoScore}/100</Badge>
        </div>
      )}

      {/* License */}
      {fm.license === "cc-by-4.0" && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
            License
          </p>
          <p className="text-xs text-foreground-muted">
            CC BY 4.0 — cite with attribution
          </p>
        </div>
      )}
    </div>
  );

  return (
    <ArticleLayout sidebar={sidebar}>
      <JsonLd data={articleSchema} />

      {/* Article header */}
      <header className="not-prose mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {fm.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} intent="category">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {fm.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
          {fm.description}
        </p>
        <div className="mt-6 flex items-center gap-4 text-sm text-foreground-muted">
          <span>{fm.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={fm.updatedAt}>
            Updated{" "}
            {new Date(fm.updatedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      {/* MDX content */}
      <MDXRemote source={content} components={getMdxComponents()} />
    </ArticleLayout>
  );
}

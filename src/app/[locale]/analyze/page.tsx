import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, ListChecks, Gauge } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { JsonLd } from "@/components/schema/JsonLd";
import { AnalyzeForm } from "@/components/analyze/AnalyzeForm";
import { GEO_SCORE_CTA_URL } from "@/components/analyze/AnalysisReport";
import { generateBreadcrumbs, entityIds } from "@/lib/schema";
import { generatePageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "analyze" });
  return generatePageMetadata({
    locale,
    path: "/analyze",
    title: t("page_title"),
    description: t("page_description"),
    ogType: "service",
    ogSubtitle: "Free AI visibility check",
  });
}

export default async function AnalyzePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("analyze");
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY ?? "";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("page_title"),
    description: t("page_description"),
    url: `https://be-found.online${locale === "en" ? "" : `/${locale}`}/analyze`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    provider: { "@id": entityIds.organization },
    breadcrumb: generateBreadcrumbs([{ name: "Home", href: "/" }, { name: t("page_title") }]),
  };

  const points = [
    { icon: Bot, title: t("point1_title"), text: t("point1_text") },
    { icon: ListChecks, title: t("point2_title"), text: t("point2_text") },
    { icon: Gauge, title: t("point3_title"), text: t("point3_text") },
  ];

  return (
    <PageLayout narrow>
      <JsonLd data={schema} />
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t("page_title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {t("page_description")}
        </p>
      </header>

      <Card padding="md" className="sm:p-8">
        <CardContent>
          <AnalyzeForm turnstileSiteKey={turnstileSiteKey} />
        </CardContent>
      </Card>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {points.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <Icon className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-3 font-semibold">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-center text-sm text-foreground-muted">
        {t.rich("powered_by", {
          link: (chunks) => (
            <a href={GEO_SCORE_CTA_URL} className="text-gold hover:underline">
              {chunks}
            </a>
          ),
        })}
      </p>
    </PageLayout>
  );
}

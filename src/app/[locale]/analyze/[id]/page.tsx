import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { AnalysisReport } from "@/components/analyze/AnalysisReport";
import { WaitForResult } from "@/components/analyze/WaitForResult";
import { isKnownAnalysis, recordStatus } from "@/lib/analyze-guard";
import {
  analysisLanguageFor,
  getAnalysis,
  getKnowledge,
  isAnalysisId,
  type Knowledge,
} from "@/lib/page-analysis";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "analyze" });
  // Reports are personal, short-lived results: keep them out of search indexes.
  return { title: t("report_meta_title"), robots: { index: false, follow: false } };
}

export default async function AnalysisResultPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale as Locale);

  // Only show analyses this site created, never an arbitrary id from the URL.
  if (!isAnalysisId(id) || !(await isKnownAnalysis(id))) notFound();

  const t = await getTranslations("analyze");
  const analysis = await getAnalysis(id);
  await recordStatus(id, analysis.status, analysis.result?.overall_score ?? null);

  if (analysis.status === "queued" || analysis.status === "running") {
    return (
      <PageLayout narrow>
        <Card padding="md" className="text-center sm:p-8">
          <CardContent className="space-y-4" aria-live="polite">
            <div
              className="mx-auto size-10 animate-spin rounded-full border-4 border-gold/20 border-t-gold motion-reduce:animate-none"
              aria-hidden="true"
            />
            <h1 className="text-2xl font-bold">{t("wait_title")}</h1>
            <p className="text-foreground-muted">{t("wait_text")}</p>
            <p className="text-sm font-medium">
              {analysis.status === "queued" ? t("wait_queued") : t("wait_running")}
            </p>
            <p className="break-all text-sm text-foreground-muted">{analysis.url}</p>
            <WaitForResult id={id} />
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  if (analysis.status === "failed" || !analysis.result) {
    return (
      <PageLayout narrow>
        <Card padding="md" className="sm:p-8">
          <CardContent className="space-y-4">
            <h1 className="text-2xl font-bold">{t("failed_title")}</h1>
            {/* The API's friendly sorry is already in the analysis language. */}
            <p className="text-foreground-muted">{analysis.error?.message ?? t("error_generic")}</p>
            <p className="break-all text-sm text-foreground-muted">{analysis.url}</p>
            <Link
              href="/analyze"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-gold px-5 text-sm font-medium text-midnight hover:bg-gold-hover"
            >
              {t("try_again")}
            </Link>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  let knowledge: Knowledge | null = null;
  try {
    knowledge = await getKnowledge(analysisLanguageFor(locale));
  } catch (err) {
    console.error("[analyze] knowledge fetch failed", err); // the report works without it
  }

  return (
    <PageLayout narrow>
      <AnalysisReport result={analysis.result} knowledge={knowledge} locale={locale} />
      <p className="mt-10 text-center">
        <Link href="/analyze" className="text-sm text-gold hover:underline">
          {t("new_analysis")}
        </Link>
      </p>
    </PageLayout>
  );
}

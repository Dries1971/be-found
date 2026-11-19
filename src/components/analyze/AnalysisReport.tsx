import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import {
  bandFor,
  type AnalysisResult,
  type Knowledge,
  type Metric,
  type MetricKnowledge,
  type MetricStatus,
} from "@/lib/page-analysis";

export const GEO_SCORE_CTA_URL =
  "https://geo-score.online/?utm_source=be-found.online&utm_medium=referral&utm_campaign=analyze";

type Band = "pass" | "warn" | "fail";
type Translate = Awaited<ReturnType<typeof getTranslations<"analyze">>>;

const bandText: Record<Band, string> = {
  pass: "text-success",
  warn: "text-warning",
  fail: "text-destructive",
};
const bandProgress = { pass: "success", warn: "gold", fail: "destructive" } as const;
const statusBadge = {
  pass: "success",
  warn: "warning",
  fail: "destructive",
  not_applicable: "default",
} as const;

function StatusBadge({ status, t }: { status: MetricStatus | Band; t: Translate }) {
  return (
    <Badge intent={statusBadge[status]} size="sm">
      {t(`status_${status}`)}
    </Badge>
  );
}

/** Full report: score, pillars, top recommendations, then every metric grouped by pillar. */
export async function AnalysisReport({
  result,
  knowledge,
  locale,
}: {
  result: AnalysisResult;
  knowledge: Knowledge | null;
  locale: string;
}) {
  const t = await getTranslations("analyze");
  const band = bandFor(result.overall_score);
  const byMetric = new Map((knowledge?.metrics ?? []).map((m) => [m.id, m]));
  const analyzedAt = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(result.analyzed_at));

  return (
    <div className="space-y-8">
      <Card padding="md" className="sm:p-8">
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-foreground-muted">{t("report_title")}</p>
            <h1 className="mt-1 break-all text-lg font-semibold sm:text-xl">{result.url}</h1>
            <p
              className={cn("mt-4 text-6xl font-extrabold tabular-nums", bandText[band])}
              role="img"
              aria-label={`${t("overall")}: ${result.overall_score}/100`}
            >
              {result.overall_score}
              <span className="text-2xl font-semibold text-foreground-muted">/100</span>
            </p>
            <div className="mt-3">
              <StatusBadge status={band} t={t} />
            </div>
          </div>

          <ul className="space-y-4">
            {result.pillars.map((pillar) => (
              <li key={pillar.id}>
                <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">{pillar.name}</span>
                  <span className="tabular-nums text-foreground-muted">{pillar.score}/100</span>
                </div>
                <Progress
                  value={pillar.score}
                  intent={bandProgress[bandFor(pillar.score)]}
                  aria-label={`${pillar.name}: ${pillar.score}/100`}
                />
              </li>
            ))}
          </ul>

          <p className="text-center text-xs text-foreground-muted">
            {t("analyzed_at", { date: analyzedAt })}
          </p>
        </CardContent>
      </Card>

      {result.top_recommendations.length > 0 && (
        <section aria-labelledby="top-recs">
          <h2 id="top-recs" className="mb-4 text-2xl font-bold">
            {t("top_recs")}
          </h2>
          <ol className="space-y-3">
            {result.top_recommendations.slice(0, 5).map((rec, index) => (
              <li key={rec.metric_id}>
                <Card padding="md">
                  <CardContent className="flex gap-4">
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{rec.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                        {rec.recommendation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </section>
      )}

      <GeoScoreCta t={t} />

      <section aria-labelledby="all-metrics">
        <h2 id="all-metrics" className="mb-4 text-2xl font-bold">
          {t("all_metrics", { count: result.metrics.length })}
        </h2>
        <div className="space-y-6">
          {result.pillars.map((pillar) => (
            <div key={pillar.id}>
              <h3 className="mb-2 text-lg font-semibold">{pillar.name}</h3>
              <ul className="divide-y divide-border rounded-[var(--radius-md)] border border-border">
                {result.metrics
                  .filter((m) => m.pillar === pillar.id)
                  .map((metric) => (
                    <li key={metric.id}>
                      <MetricRow metric={metric} knowledge={byMetric.get(metric.id)} t={t} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricRow({
  metric,
  knowledge,
  t,
}: {
  metric: Metric;
  knowledge?: MetricKnowledge;
  t: Translate;
}) {
  const score = metric.score;
  const range =
    score === null
      ? undefined
      : knowledge?.improvement_steps.find((r) => score >= r.min_score && score <= r.max_score);

  return (
    <details className="group">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <span className="flex-1 text-sm font-medium">{metric.name}</span>
        <span className="tabular-nums text-sm text-foreground-muted">{score ?? "–"}</span>
        <StatusBadge status={metric.status} t={t} />
      </summary>
      <div className="space-y-3 px-4 pb-4 text-sm leading-relaxed">
        <p>{metric.explanation}</p>
        {metric.recommendation && (
          <p className="rounded-[var(--radius-md)] bg-gold/10 p-3">{metric.recommendation}</p>
        )}
        {knowledge && score !== null && (
          <div>
            <h4 className="font-semibold">{t("why")}</h4>
            <p className="text-foreground-muted">{knowledge.why_it_matters}</p>
          </div>
        )}
        {range && range.steps.length > 0 && (
          <div>
            <h4 className="font-semibold">{t("how")}</h4>
            <ol className="mt-1 list-decimal space-y-2 pl-5 text-foreground-muted">
              {range.steps.map((step) => (
                <li key={step.title}>
                  <strong className="text-foreground">{step.title}</strong> {step.text}
                  {step.code && (
                    <pre className="mt-2 overflow-x-auto rounded-[var(--radius-md)] bg-background-secondary p-3 text-xs">
                      <code>{step.code}</code>
                    </pre>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </details>
  );
}

export function GeoScoreCta({ t }: { t: Translate }) {
  return (
    <Card padding="md" className="border-gold/40 sm:p-8">
      <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{t("cta_title")}</p>
          <p className="mt-1 text-sm text-foreground-muted">{t("cta_text")}</p>
        </div>
        <a
          href={GEO_SCORE_CTA_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-gold px-5 text-sm font-medium text-midnight hover:bg-gold-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("cta_button")}
          <ExternalLink className="size-4" aria-hidden="true" />
          <span className="sr-only">{t("opens_new_tab")}</span>
        </a>
      </CardContent>
    </Card>
  );
}

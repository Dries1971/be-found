import "server-only";

/**
 * Typed client for the GEO-Score page analysis API (v1).
 * `server-only` makes the build fail if this file is ever imported into a
 * client component, so the API key can never reach the browser bundle.
 */

const BASE =
  process.env.PAGE_ANALYSIS_API_BASE ?? "https://api.geo-score.online/v1";

export type AnalysisLanguage = "nl" | "en";
export type JobStatus = "queued" | "running" | "completed" | "failed";
export type MetricStatus = "pass" | "warn" | "fail" | "not_applicable";

export interface Submitted {
  id: string;
  status: JobStatus;
  url: string;
  created_at: string;
  links: { self: string };
  message?: string;
}

export interface Metric {
  id: string;
  name: string;
  pillar: string;
  score: number | null;
  status: MetricStatus;
  explanation: string;
  recommendation: string | null;
  priority: "high" | "medium" | "low" | null;
}

export interface AnalysisResult {
  url: string;
  analyzed_at: string;
  methodology_version: string;
  page_type: string;
  overall_score: number;
  pillars: { id: string; name: string; score: number }[];
  metrics: Metric[];
  top_recommendations: {
    metric_id: string;
    title: string;
    recommendation: string;
    priority: string;
  }[];
}

export interface Analysis {
  id: string;
  status: JobStatus;
  url: string;
  language: AnalysisLanguage;
  created_at: string;
  completed_at: string | null;
  error: { code: string; message?: string; blocked_by?: string } | null;
  result: AnalysisResult | null;
}

export interface MetricKnowledge {
  id: string;
  why_it_matters: string;
  quick_wins: { title: string; text: string; impact: string }[];
  improvement_steps: {
    min_score: number;
    max_score: number;
    steps: {
      title: string;
      text: string;
      difficulty: string;
      code: string | null;
    }[];
  }[];
}

export interface Knowledge {
  methodology_version: string;
  language: AnalysisLanguage;
  metrics: MetricKnowledge[];
}

/** problem+json from the API. Branch on `code`, never on the message. */
export class PageAnalysisError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    detail: string,
    readonly requestId?: string,
  ) {
    super(detail);
    this.name = "PageAnalysisError";
  }
}

const ANALYSIS_ID = /^an_[0-9a-f]{24}$/;

export function isAnalysisId(id: string): boolean {
  return ANALYSIS_ID.test(id);
}

async function call<T>(
  path: string,
  init: RequestInit & { revalidate?: number } = {},
): Promise<T> {
  const key = process.env.PAGE_ANALYSIS_API_KEY;
  if (!key) {
    throw new PageAnalysisError(0, "missing_key", "PAGE_ANALYSIS_API_KEY is not set");
  }
  const { revalidate, ...rest } = init;
  const res = await fetch(BASE + path, {
    ...rest,
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      ...(rest.headers ?? {}),
    },
    // Analyses change: never cache them. Knowledge is static per version.
    ...(revalidate ? { next: { revalidate } } : { cache: "no-store" }),
    signal: AbortSignal.timeout(15_000),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new PageAnalysisError(
      res.status,
      body?.code ?? "unknown",
      body?.detail ?? res.statusText,
      body?.request_id,
    );
  }
  return body as T;
}

export function createAnalysis(
  url: string,
  language: AnalysisLanguage,
  idempotencyKey: string,
): Promise<Submitted> {
  return call("/analyses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ url, language }),
  });
}

export function getAnalysis(id: string): Promise<Analysis> {
  if (!isAnalysisId(id)) {
    throw new PageAnalysisError(404, "not_found", "Unknown analysis.");
  }
  return call(`/analyses/${id}`);
}

/** Static content per language + methodology version: cache it for a day. */
export function getKnowledge(language: AnalysisLanguage): Promise<Knowledge> {
  return call(`/knowledge?language=${language}`, { revalidate: 86_400 });
}

/** The API speaks nl and en; every other site locale gets English. */
export function analysisLanguageFor(locale: string): AnalysisLanguage {
  return locale === "nl" ? "nl" : "en";
}

/** Same bands as the API: 75+ pass, 50-74 warn, below 50 fail. */
export function bandFor(score: number): "pass" | "warn" | "fail" {
  return score >= 75 ? "pass" : score >= 50 ? "warn" : "fail";
}

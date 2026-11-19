import { getTranslations } from "next-intl/server";
import { AnalyzeForm } from "./AnalyzeForm";

/** Compact analysis form for embedding on landing pages. */
export async function AnalyzeTeaser() {
  const t = await getTranslations("analyze");
  return (
    <section aria-labelledby="analyze-teaser" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-gold/40 bg-background-secondary p-6 sm:p-8">
        <h2 id="analyze-teaser" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home_title")}
        </h2>
        <p className="mt-2 text-foreground-muted">{t("home_text")}</p>
        <AnalyzeForm
          turnstileSiteKey={process.env.TURNSTILE_SITE_KEY ?? ""}
          variant="compact"
          className="mt-6"
        />
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <PageLayout narrow>
      {/* Page header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t("page_title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {t("page_description")}
        </p>
      </header>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          {t("mission_title")}
        </h2>
        <p className="mb-4 text-foreground-muted leading-relaxed">
          {t("mission_p1")}
        </p>
        <p className="text-foreground-muted leading-relaxed">
          {t("mission_p2")}
        </p>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          {t("team_title")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Dries */}
          <Card intent="featured" padding="lg">
            <CardContent className="space-y-3">
              <h3 className="text-xl font-bold">Dries de Gelder</h3>
              <Badge intent="category">{t("dries_role")}</Badge>
              <p className="text-sm leading-relaxed text-foreground-muted">
                {t("dries_bio")}
              </p>
              <p className="text-xs text-foreground-muted/70">
                {t("dries_credentials")}
              </p>
            </CardContent>
          </Card>

          {/* Joost */}
          <Card intent="featured" padding="lg">
            <CardContent className="space-y-3">
              <h3 className="text-xl font-bold">Joost Winnink</h3>
              <Badge intent="category">{t("joost_role")}</Badge>
              <p className="text-sm leading-relaxed text-foreground-muted">
                {t("joost_bio")}
              </p>
              <p className="text-xs text-foreground-muted/70">
                {t("joost_credentials")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          {t("story_title")}
        </h2>
        <div className="space-y-4 text-foreground-muted leading-relaxed">
          <p>{t("story_p1")}</p>
          <p>{t("story_p2")}</p>
          <p>{t("story_p3")}</p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          {t("values_title")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {(
            [
              ["value_data_title", "value_data_description"],
              ["value_transparent_title", "value_transparent_description"],
              ["value_results_title", "value_results_description"],
            ] as const
          ).map(([titleKey, descKey]) => (
            <Card key={titleKey} padding="md">
              <CardContent>
                <h3 className="mb-2 font-semibold">{t(titleKey)}</h3>
                <p className="text-sm text-foreground-muted">{t(descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          {t("cta_title")}
        </h2>
        <p className="mb-6 text-foreground-muted">
          {t("cta_description")}
        </p>
        <Button intent="primary" size="lg" asChild>
          <Link href="/contact">{t("cta_button")}</Link>
        </Button>
      </section>
    </PageLayout>
  );
}

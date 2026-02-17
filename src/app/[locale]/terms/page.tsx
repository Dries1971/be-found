import { getTranslations } from "next-intl/server";
import { PageLayout } from "@/components/layouts/PageLayout";

export default async function TermsPage() {
  const t = await getTranslations("legal");

  return (
    <PageLayout narrow>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>{t("terms_title")}</h1>
        <p className="text-sm text-foreground-muted">{t("terms_effective")}</p>

        <p>{t("terms_intro")}</p>

        <h2>{t("terms_use_title")}</h2>
        <p>{t("terms_use_p1")}</p>

        <h2>{t("terms_content_title")}</h2>
        <p>{t("terms_content_p1")}</p>
        <p>{t("terms_content_p2")}</p>

        <h2>{t("terms_disclaimer_title")}</h2>
        <p>{t("terms_disclaimer_p1")}</p>

        <h2>{t("terms_liability_title")}</h2>
        <p>{t("terms_liability_p1")}</p>

        <h2>{t("terms_law_title")}</h2>
        <p>{t("terms_law_p1")}</p>

        <h2>{t("terms_changes_title")}</h2>
        <p>{t("terms_changes_p1")}</p>

        <h2>{t("terms_contact_title")}</h2>
        <p>{t("terms_contact_p1")}</p>
      </article>
    </PageLayout>
  );
}

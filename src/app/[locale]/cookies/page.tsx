import { getTranslations } from "next-intl/server";
import { PageLayout } from "@/components/layouts/PageLayout";

export default async function CookiePage() {
  const t = await getTranslations("legal");

  return (
    <PageLayout narrow>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>{t("cookies_title")}</h1>

        <p className="font-semibold text-success">{t("cookies_intro")}</p>

        <h2>{t("cookies_what_title")}</h2>
        <p>{t("cookies_what_p1")}</p>

        <h2>{t("cookies_functional_title")}</h2>
        <p>{t("cookies_functional_p1")}</p>

        <h2>{t("cookies_external_title")}</h2>
        <p>{t("cookies_external_p1")}</p>

        <h2>{t("cookies_contact_title")}</h2>
        <p>{t("cookies_contact_p1")}</p>
      </article>
    </PageLayout>
  );
}

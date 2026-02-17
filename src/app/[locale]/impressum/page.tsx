import { getTranslations } from "next-intl/server";
import { PageLayout } from "@/components/layouts/PageLayout";

export default async function ImpressumPage() {
  const t = await getTranslations("legal");

  return (
    <PageLayout narrow>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>{t("impressum_title")}</h1>

        <h2>{t("impressum_provider")}</h2>
        <p>
          {t("impressum_name")}
          <br />
          {t("impressum_address")}
          <br />
          {t("impressum_country")}
        </p>

        <h2>{t("impressum_contact")}</h2>
        <p>
          <a href={`mailto:${t("impressum_email")}`}>{t("impressum_email")}</a>
        </p>

        <h2>{t("impressum_responsible")}</h2>
        <p>{t("impressum_responsible_name")}</p>

        <h2>{t("impressum_liability_title")}</h2>
        <p>{t("impressum_liability_p1")}</p>

        <h2>{t("impressum_editorial")}</h2>
        <p>{t("impressum_editorial_names")}</p>
      </article>
    </PageLayout>
  );
}

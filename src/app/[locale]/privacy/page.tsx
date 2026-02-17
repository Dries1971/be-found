import { getTranslations } from "next-intl/server";
import { PageLayout } from "@/components/layouts/PageLayout";

export default async function PrivacyPage() {
  const t = await getTranslations("legal");

  return (
    <PageLayout narrow>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>{t("privacy_title")}</h1>
        <p className="text-sm text-foreground-muted">{t("privacy_effective")}</p>

        <p>{t("privacy_intro")}</p>
        <p className="font-semibold text-success">{t("privacy_no_cookies")}</p>

        <h2>{t("privacy_collect_title")}</h2>
        <ul>
          <li>{t("privacy_collect_contact")}</li>
          <li>{t("privacy_collect_analytics")}</li>
          <li>{t("privacy_collect_functional")}</li>
        </ul>

        <h2>{t("privacy_use_title")}</h2>
        <p>{t("privacy_use_p1")}</p>

        <h2>{t("privacy_rights_title")}</h2>
        <p>{t("privacy_rights_p1")}</p>
        <p>{t("privacy_rights_p2")}</p>

        <h2>{t("privacy_retention_title")}</h2>
        <p>{t("privacy_retention_p1")}</p>

        <h2>{t("privacy_security_title")}</h2>
        <p>{t("privacy_security_p1")}</p>

        <h2>{t("privacy_changes_title")}</h2>
        <p>{t("privacy_changes_p1")}</p>

        <h2>{t("privacy_contact_title")}</h2>
        <p>{t("privacy_contact_p1")}</p>
      </article>
    </PageLayout>
  );
}

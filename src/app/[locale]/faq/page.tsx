import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageLayout } from "@/components/layouts/PageLayout";
import { FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/schema/JsonLd";

export default async function FAQPage() {
  const t = await getTranslations("faq");

  const faqItems = [
    // GEO
    { id: "geo-1", question: t("geo_1_q"), answer: t("geo_1_a") },
    { id: "geo-2", question: t("geo_2_q"), answer: t("geo_2_a") },
    { id: "geo-3", question: t("geo_3_q"), answer: t("geo_3_a") },
    // Services
    { id: "svc-1", question: t("services_1_q"), answer: t("services_1_a") },
    { id: "svc-2", question: t("services_2_q"), answer: t("services_2_a") },
    { id: "svc-3", question: t("services_3_q"), answer: t("services_3_a") },
    // Tools
    { id: "tools-1", question: t("tools_1_q"), answer: t("tools_1_a") },
    { id: "tools-2", question: t("tools_2_q"), answer: t("tools_2_a") },
    // Engagement
    { id: "eng-1", question: t("engagement_1_q"), answer: t("engagement_1_a") },
    { id: "eng-2", question: t("engagement_2_q"), answer: t("engagement_2_a") },
  ];

  // FAQPage Schema.org
  const faqSchema: Record<string, unknown> = {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageLayout narrow>
      <JsonLd data={{ "@context": "https://schema.org", ...faqSchema }} />

      {/* Page header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t("page_title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {t("page_description")}
        </p>
      </header>

      {/* FAQ accordion */}
      <FAQSection items={faqItems} />

      {/* CTA */}
      <section className="mt-16 text-center">
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

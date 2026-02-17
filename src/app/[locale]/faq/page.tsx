import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageLayout } from "@/components/layouts/PageLayout";
import { FAQSection } from "@/components/sections";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/schema/JsonLd";
import { generateBreadcrumbs } from "@/lib/schema";
import { generatePageMetadata } from "@/lib/metadata";

import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "faq" });
  return generatePageMetadata({
    locale,
    path: "/faq",
    title: t("page_title"),
    description: t("page_description"),
  });
}

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
    name: t("page_title"),
    description: t("page_description"),
    datePublished: "2026-02-17",
    dateModified: "2026-02-17",
    breadcrumb: generateBreadcrumbs([
      { name: "Home", href: "/" },
      { name: t("page_title") },
    ]),
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

      {/* Related links */}
      <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" aria-label="Related pages">
        <Link href="/services" className="text-gold hover:underline">Services</Link>
        <Link href="/pricing" className="text-gold hover:underline">Pricing</Link>
        <Link href="/products/bloffee" className="text-gold hover:underline">Bloffee</Link>
        <Link href="/products/geo-score" className="text-gold hover:underline">GEO-Score</Link>
      </nav>

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

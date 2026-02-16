import { getTranslations } from "next-intl/server";
import { Search, FileText, CheckCircle, Settings } from "lucide-react";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import {
  HeroSection,
  ServiceGrid,
  ComparisonTable,
  FAQSection,
  CTASection,
} from "@/components/sections";

export default async function ServicesPage() {
  const t = await getTranslations("services");

  return (
    <LandingLayout>
      {/* Hero */}
      <HeroSection
        variant="dark"
        badge={t("hero_badge")}
        headline={t("hero_headline")}
        headlineHighlight={t("hero_highlight")}
        description={t("hero_description")}
        primaryCTA={t("cta_button")}
        primaryHref="/contact"
      />

      {/* Service grid */}
      <ServiceGrid
        title={t("overview_title")}
        subtitle={t("overview_subtitle")}
        services={[
          {
            name: t("geo_name"),
            description: t("geo_description"),
            icon: <Search size={20} />,
            href: "/services/geo-consulting",
          },
          {
            name: t("content_name"),
            description: t("content_description"),
            icon: <FileText size={20} />,
            href: "/services/ai-content-strategy",
          },
          {
            name: t("audit_name"),
            description: t("audit_description"),
            icon: <CheckCircle size={20} />,
            href: "/services/geo-audit",
          },
          {
            name: t("seo_name"),
            description: t("seo_description"),
            icon: <Settings size={20} />,
            href: "/services/technical-seo",
          },
        ]}
      />

      {/* GEO vs SEO comparison */}
      <ComparisonTable
        title={t("comparison_title")}
        subtitle={t("comparison_subtitle")}
        columns={[t("comparison_col_seo"), t("comparison_col_geo")]}
        highlightColumn={1}
        rows={[
          {
            label: t("comparison_row_goal"),
            values: [t("comparison_val_seo_goal"), t("comparison_val_geo_goal")],
          },
          {
            label: t("comparison_row_metrics"),
            values: [t("comparison_val_seo_metrics"), t("comparison_val_geo_metrics")],
          },
          {
            label: t("comparison_row_content"),
            values: [t("comparison_val_seo_content"), t("comparison_val_geo_content")],
          },
          {
            label: t("comparison_row_speed"),
            values: [t("comparison_val_seo_speed"), t("comparison_val_geo_speed")],
          },
          {
            label: t("comparison_row_future"),
            values: [t("comparison_val_seo_future"), t("comparison_val_geo_future")],
          },
        ]}
      />

      {/* FAQ */}
      <FAQSection
        title={t("faq_title")}
        subtitle={t("faq_subtitle")}
        items={[
          { id: "faq-1", question: t("faq_1_q"), answer: t("faq_1_a") },
          { id: "faq-2", question: t("faq_2_q"), answer: t("faq_2_a") },
          { id: "faq-3", question: t("faq_3_q"), answer: t("faq_3_a") },
          { id: "faq-4", question: t("faq_4_q"), answer: t("faq_4_a") },
        ]}
      />

      {/* CTA */}
      <CTASection
        variant="audit"
        headline={t("cta_headline")}
        description={t("cta_description")}
        buttonText={t("cta_button")}
        buttonHref="/contact"
        subtext={t("cta_subtext")}
      />
    </LandingLayout>
  );
}

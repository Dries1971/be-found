import { getTranslations } from "next-intl/server";
import { Search, Shield, Users, Lightbulb } from "lucide-react";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import {
  HeroSection,
  ServiceGrid,
  StatGrid,
  FAQSection,
  CTASection,
} from "@/components/sections";

export default async function GeoScorePage() {
  const t = await getTranslations("products");

  return (
    <LandingLayout>
      {/* Hero */}
      <HeroSection
        variant="featured"
        badge={t("geoscore_hero_badge")}
        headline={t("geoscore_hero_headline")}
        headlineHighlight={t("geoscore_hero_highlight")}
        description={t("geoscore_hero_description")}
        primaryCTA={t("geoscore_cta_button")}
        primaryHref="https://geo-score.online"
        secondaryCTA={t("geoscore_faq_title")}
        secondaryHref="#faq"
      />

      {/* Features */}
      <ServiceGrid
        title={t("geoscore_features_title")}
        subtitle={t("geoscore_features_subtitle")}
        services={[
          {
            name: t("geoscore_f1_name"),
            description: t("geoscore_f1_desc"),
            icon: <Search size={20} />,
          },
          {
            name: t("geoscore_f2_name"),
            description: t("geoscore_f2_desc"),
            icon: <Shield size={20} />,
          },
          {
            name: t("geoscore_f3_name"),
            description: t("geoscore_f3_desc"),
            icon: <Users size={20} />,
          },
          {
            name: t("geoscore_f4_name"),
            description: t("geoscore_f4_desc"),
            icon: <Lightbulb size={20} />,
          },
        ]}
      />

      {/* Stats */}
      <StatGrid
        stats={[
          { value: t("geoscore_stat_scores"), label: t("geoscore_stat_scores_label") },
          { value: t("geoscore_stat_countries"), label: t("geoscore_stat_countries_label") },
          { value: t("geoscore_stat_range"), label: t("geoscore_stat_range_label") },
        ]}
        columns={3}
      />

      {/* FAQ */}
      <FAQSection
        title={t("geoscore_faq_title")}
        items={[
          { id: "gs-1", question: t("geoscore_faq_1_q"), answer: t("geoscore_faq_1_a") },
          { id: "gs-2", question: t("geoscore_faq_2_q"), answer: t("geoscore_faq_2_a") },
          { id: "gs-3", question: t("geoscore_faq_3_q"), answer: t("geoscore_faq_3_a") },
        ]}
        className="scroll-mt-20"
      />

      {/* CTA */}
      <CTASection
        variant="audit"
        headline={t("geoscore_cta_headline")}
        description={t("geoscore_cta_description")}
        buttonText={t("geoscore_cta_button")}
        buttonHref="https://geo-score.online"
        subtext={t("geoscore_cta_subtext")}
      />
    </LandingLayout>
  );
}

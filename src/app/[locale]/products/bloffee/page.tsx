import { getTranslations } from "next-intl/server";
import { FileText, Globe, Clock, BarChart3 } from "lucide-react";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import {
  HeroSection,
  ServiceGrid,
  StatGrid,
  FAQSection,
  CTASection,
} from "@/components/sections";

export default async function BloffeePage() {
  const t = await getTranslations("products");

  return (
    <LandingLayout>
      {/* Hero */}
      <HeroSection
        variant="featured"
        badge={t("bloffee_hero_badge")}
        headline={t("bloffee_hero_headline")}
        headlineHighlight={t("bloffee_hero_highlight")}
        description={t("bloffee_hero_description")}
        primaryCTA={t("bloffee_cta_button")}
        primaryHref="https://bloffee.com"
        secondaryCTA={t("bloffee_faq_title")}
        secondaryHref="#faq"
      />

      {/* Features */}
      <ServiceGrid
        title={t("bloffee_features_title")}
        subtitle={t("bloffee_features_subtitle")}
        services={[
          {
            name: t("bloffee_f1_name"),
            description: t("bloffee_f1_desc"),
            icon: <FileText size={20} />,
          },
          {
            name: t("bloffee_f2_name"),
            description: t("bloffee_f2_desc"),
            icon: <Globe size={20} />,
          },
          {
            name: t("bloffee_f3_name"),
            description: t("bloffee_f3_desc"),
            icon: <Clock size={20} />,
          },
          {
            name: t("bloffee_f4_name"),
            description: t("bloffee_f4_desc"),
            icon: <BarChart3 size={20} />,
          },
        ]}
      />

      {/* Stats */}
      <StatGrid
        stats={[
          { value: t("bloffee_stat_blogs"), label: t("bloffee_stat_blogs_label") },
          { value: t("bloffee_stat_languages"), label: t("bloffee_stat_languages_label") },
          { value: t("bloffee_stat_countries"), label: t("bloffee_stat_countries_label") },
        ]}
        columns={3}
      />

      {/* FAQ */}
      <FAQSection
        title={t("bloffee_faq_title")}
        items={[
          { id: "bf-1", question: t("bloffee_faq_1_q"), answer: t("bloffee_faq_1_a") },
          { id: "bf-2", question: t("bloffee_faq_2_q"), answer: t("bloffee_faq_2_a") },
          { id: "bf-3", question: t("bloffee_faq_3_q"), answer: t("bloffee_faq_3_a") },
        ]}
        className="scroll-mt-20"
      />

      {/* CTA */}
      <CTASection
        variant="audit"
        headline={t("bloffee_cta_headline")}
        description={t("bloffee_cta_description")}
        buttonText={t("bloffee_cta_button")}
        buttonHref="https://bloffee.com"
        subtext={t("bloffee_cta_subtext")}
      />
    </LandingLayout>
  );
}

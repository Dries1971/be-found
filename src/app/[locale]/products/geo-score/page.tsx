import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Search, Shield, Users, Lightbulb } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import { JsonLd } from "@/components/schema/JsonLd";
import { generateBreadcrumbs, entityIds } from "@/lib/schema";
import { generatePageMetadata } from "@/lib/metadata";
import {
  HeroSection,
  ServiceGrid,
  StatGrid,
  FAQSection,
  CTASection,
} from "@/components/sections";
import { FadeIn } from "@/components/ui/FadeIn";

import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "products" });
  return generatePageMetadata({
    locale,
    path: "/products/geo-score",
    title: t("geoscore_hero_headline"),
    description: t("geoscore_hero_description"),
    ogType: "service",
    ogSubtitle: "AI Visibility Analysis",
  });
}

export default async function GeoScorePage() {
  const t = await getTranslations("products");

  const geoScoreSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GEO-Score",
    applicationCategory: "AnalyticsApplication",
    operatingSystem: "Web",
    description: "AI visibility analysis tool measuring how well your brand performs in generative engines.",
    url: "https://geo-score.online",
    datePublished: "2026-02-17",
    dateModified: "2026-02-17",
    provider: { "@id": entityIds.organization },
    breadcrumb: generateBreadcrumbs([
      { name: "Home", href: "/" },
      { name: "Products", href: "/products/geo-score" },
      { name: "GEO-Score" },
    ]),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "section > div > p"],
    },
  };

  return (
    <LandingLayout>
      <JsonLd data={geoScoreSchema} />
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
      <FadeIn animation="fade-in-up">
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
      </FadeIn>

      {/* Stats */}
      <FadeIn animation="fade-in-up" delay={100}>
        <StatGrid
          stats={[
            { value: t("geoscore_stat_scores"), label: t("geoscore_stat_scores_label") },
            { value: t("geoscore_stat_countries"), label: t("geoscore_stat_countries_label") },
            { value: t("geoscore_stat_range"), label: t("geoscore_stat_range_label") },
          ]}
          columns={3}
        />
      </FadeIn>

      {/* FAQ */}
      <FadeIn animation="fade-in-up" delay={100}>
        <FAQSection
          title={t("geoscore_faq_title")}
          items={[
            { id: "gs-1", question: t("geoscore_faq_1_q"), answer: t("geoscore_faq_1_a") },
            { id: "gs-2", question: t("geoscore_faq_2_q"), answer: t("geoscore_faq_2_a") },
            { id: "gs-3", question: t("geoscore_faq_3_q"), answer: t("geoscore_faq_3_a") },
          ]}
          className="scroll-mt-20"
        />
      </FadeIn>

      {/* Related links */}
      <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 py-8 text-sm" aria-label="Related pages">
        <Link href="/products/bloffee" className="text-gold hover:underline">Bloffee</Link>
        <Link href="/services" className="text-gold hover:underline">Services</Link>
        <Link href="/pricing" className="text-gold hover:underline">Pricing</Link>
      </nav>

      {/* CTA */}
      <FadeIn animation="scale-in">
        <CTASection
          variant="audit"
          headline={t("geoscore_cta_headline")}
          description={t("geoscore_cta_description")}
          buttonText={t("geoscore_cta_button")}
          buttonHref="https://geo-score.online"
          subtext={t("geoscore_cta_subtext")}
        />
      </FadeIn>
    </LandingLayout>
  );
}

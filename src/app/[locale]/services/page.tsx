import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Search, FileText, CheckCircle, Settings } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import { JsonLd } from "@/components/schema/JsonLd";
import { generateBreadcrumbs, entityIds } from "@/lib/schema";
import { generatePageMetadata } from "@/lib/metadata";
import {
  HeroSection,
  ServiceGrid,
  ComparisonTable,
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
  const t = await getTranslations({ locale: locale as Locale, namespace: "services" });
  return generatePageMetadata({
    locale,
    path: "/services",
    title: t("hero_headline"),
    description: t("hero_description"),
    ogType: "service",
  });
}

export default async function ServicesPage() {
  const t = await getTranslations("services");

  const serviceSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Be-Found — GEO & AI Visibility Services",
    provider: { "@id": entityIds.organization },
    areaServed: ["US", "GB", "AE", "NL", "DE"],
    serviceType: "Generative Engine Optimization",
    datePublished: "2026-02-17",
    dateModified: "2026-02-17",
    breadcrumb: generateBreadcrumbs([
      { name: "Home", href: "/" },
      { name: "Services" },
    ]),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "section > div > p"],
    },
  };

  return (
    <LandingLayout>
      <JsonLd data={serviceSchema} />
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
      <FadeIn animation="fade-in-up">
        <ServiceGrid
          title={t("overview_title")}
          subtitle={t("overview_subtitle")}
          services={[
            {
              name: t("geo_name"),
              description: t("geo_description"),
              icon: <Search size={20} />,
            },
            {
              name: t("content_name"),
              description: t("content_description"),
              icon: <FileText size={20} />,
            },
            {
              name: t("audit_name"),
              description: t("audit_description"),
              icon: <CheckCircle size={20} />,
            },
            {
              name: t("seo_name"),
              description: t("seo_description"),
              icon: <Settings size={20} />,
            },
          ]}
        />
      </FadeIn>

      {/* GEO vs SEO comparison */}
      <FadeIn animation="fade-in-up" delay={100}>
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
      </FadeIn>

      {/* FAQ */}
      <FadeIn animation="fade-in-up" delay={100}>
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
      </FadeIn>

      {/* Related links */}
      <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 py-8 text-sm" aria-label="Related pages">
        <Link href="/pricing" className="text-gold hover:underline">Pricing</Link>
        <Link href="/products/bloffee" className="text-gold hover:underline">Bloffee</Link>
        <Link href="/products/geo-score" className="text-gold hover:underline">GEO-Score</Link>
        <Link href="/faq" className="text-gold hover:underline">FAQ</Link>
      </nav>

      {/* CTA */}
      <FadeIn animation="scale-in">
        <CTASection
          variant="audit"
          headline={t("cta_headline")}
          description={t("cta_description")}
          buttonText={t("cta_button")}
          buttonHref="/contact"
          subtext={t("cta_subtext")}
        />
      </FadeIn>
    </LandingLayout>
  );
}

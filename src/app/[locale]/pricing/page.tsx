import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import { JsonLd } from "@/components/schema/JsonLd";
import { generateBreadcrumbs, entityIds } from "@/lib/schema";
import { generatePageMetadata } from "@/lib/metadata";
import {
  HeroSection,
  PricingSection,
  FAQSection,
  CTASection,
} from "@/components/sections";

import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "pricing" });
  return generatePageMetadata({
    locale,
    path: "/pricing",
    title: t("hero_headline"),
    description: t("hero_description"),
    ogType: "service",
  });
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  const h = await getTranslations("home");

  const pricingSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing — Be-Found.online",
    description: t("hero_description"),
    url: "https://be-found.online/pricing",
    datePublished: "2026-02-17",
    dateModified: "2026-02-17",
    isPartOf: { "@id": entityIds.website },
    breadcrumb: generateBreadcrumbs([
      { name: "Home", href: "/" },
      { name: "Pricing" },
    ]),
  };

  return (
    <LandingLayout>
      <JsonLd data={pricingSchema} />
      {/* Hero */}
      <HeroSection
        variant="dark"
        badge={t("hero_badge")}
        headline={t("hero_headline")}
        headlineHighlight={t("hero_highlight")}
        description={t("hero_description")}
      />

      {/* Pricing tiers — reuse home namespace keys */}
      <PricingSection
        title={h("pricing_title")}
        subtitle={h("pricing_subtitle")}
        monthlyLabel={h("pricing_monthly")}
        annualLabel={h("pricing_annual")}
        customPriceLabel={h("pricing_custom")}
        tiers={[
          {
            name: h("pricing_tier1_name"),
            tagline: h("pricing_tier1_tagline"),
            monthlyPrice: 2500,
            ctaText: h("pricing_tier1_cta"),
            ctaHref: "/contact",
            features: [
              h("pricing_tier1_f1"),
              h("pricing_tier1_f2"),
              h("pricing_tier1_f3"),
              h("pricing_tier1_f4"),
            ],
          },
          {
            name: h("pricing_tier2_name"),
            tagline: h("pricing_tier2_tagline"),
            monthlyPrice: 5000,
            highlighted: true,
            ctaText: h("pricing_tier2_cta"),
            ctaHref: "/contact",
            features: [
              h("pricing_tier2_f1"),
              h("pricing_tier2_f2"),
              h("pricing_tier2_f3"),
              h("pricing_tier2_f4"),
              h("pricing_tier2_f5"),
            ],
          },
          {
            name: h("pricing_tier3_name"),
            tagline: h("pricing_tier3_tagline"),
            monthlyPrice: 10000,
            ctaText: h("pricing_tier3_cta"),
            ctaHref: "/contact",
            features: [
              h("pricing_tier3_f1"),
              h("pricing_tier3_f2"),
              h("pricing_tier3_f3"),
              h("pricing_tier3_f4"),
              h("pricing_tier3_f5"),
            ],
          },
          {
            name: h("pricing_tier4_name"),
            tagline: h("pricing_tier4_tagline"),
            monthlyPrice: 0,
            ctaText: h("pricing_tier4_cta"),
            ctaHref: "/contact",
            features: [
              h("pricing_tier4_f1"),
              h("pricing_tier4_f2"),
              h("pricing_tier4_f3"),
              h("pricing_tier4_f4"),
            ],
          },
        ]}
      />

      {/* FAQ */}
      <FAQSection
        title={t("faq_title")}
        items={[
          { id: "pf-1", question: t("faq_1_q"), answer: t("faq_1_a") },
          { id: "pf-2", question: t("faq_2_q"), answer: t("faq_2_a") },
          { id: "pf-3", question: t("faq_3_q"), answer: t("faq_3_a") },
          { id: "pf-4", question: t("faq_4_q"), answer: t("faq_4_a") },
          { id: "pf-5", question: t("faq_5_q"), answer: t("faq_5_a") },
        ]}
      />

      {/* Related links */}
      <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 py-8 text-sm" aria-label="Related pages">
        <Link href="/services" className="text-gold hover:underline">Services</Link>
        <Link href="/faq" className="text-gold hover:underline">FAQ</Link>
        <Link href="/about" className="text-gold hover:underline">About</Link>
      </nav>

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

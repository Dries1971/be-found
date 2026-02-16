import { getTranslations } from "next-intl/server";
import { Search, FileText, CheckCircle, Settings } from "lucide-react";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import {
  HeroSection,
  AuthorityBar,
  ProblemSolution,
  EcosystemSection,
  ServiceGrid,
  DataShowcase,
  TestimonialSection,
  TeamSection,
  LatestInsights,
  CTASection,
} from "@/components/sections";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <LandingLayout>
      {/* 1. Hero */}
      <HeroSection
        variant="featured"
        badge={t("hero_badge")}
        headline={t("hero_headline")}
        headlineHighlight={t("hero_highlight")}
        description={t("hero_description")}
        primaryCTA={t("cta_button")}
        primaryHref="/contact"
        secondaryCTA={t("data_cta")}
        secondaryHref="/services"
      />

      {/* 2. Authority bar */}
      <AuthorityBar
        metrics={[
          { value: t("authority_since") },
          { value: t("authority_blogs") },
          { value: t("authority_scores") },
          { value: t("authority_clients") },
        ]}
      />

      {/* 3. Problem / Solution */}
      <ProblemSolution
        problemBadge={t("problem_badge")}
        problemStat={t("problem_stat")}
        problemStatLabel={t("problem_stat_label")}
        problemHeadline={t("problem_headline")}
        problemDescription={t("problem_description")}
        solutionBadge={t("solution_badge")}
        solutionStat={t("solution_stat")}
        solutionStatLabel={t("solution_stat_label")}
        solutionHeadline={t("solution_headline")}
        solutionDescription={t("solution_description")}
      />

      {/* 4. Ecosystem — Bloffee + GEO-Score */}
      <EcosystemSection
        title={t("ecosystem_title")}
        subtitle={t("ecosystem_subtitle")}
        products={[
          {
            name: t("bloffee_name"),
            badge: t("bloffee_badge"),
            description: t("bloffee_description"),
            metrics: [
              { label: t("bloffee_metric_blogs_label"), value: t("bloffee_metric_blogs") },
              { label: t("bloffee_metric_languages_label"), value: t("bloffee_metric_languages") },
              { label: t("bloffee_metric_geo_label"), value: t("bloffee_metric_geo") },
              { label: t("bloffee_metric_cited_label"), value: t("bloffee_metric_cited") },
            ],
            ctaText: t("bloffee_cta"),
            ctaHref: "https://bloffee.com",
          },
          {
            name: t("geoscore_name"),
            badge: t("geoscore_badge"),
            description: t("geoscore_description"),
            metrics: [
              { label: t("geoscore_metric_scores_label"), value: t("geoscore_metric_scores") },
              { label: t("geoscore_metric_countries_label"), value: t("geoscore_metric_countries") },
              { label: t("geoscore_metric_range_label"), value: t("geoscore_metric_range") },
              { label: t("geoscore_metric_metrics_label"), value: t("geoscore_metric_metrics") },
            ],
            ctaText: t("geoscore_cta"),
            ctaHref: "https://geo-score.online",
          },
        ]}
      />

      {/* 5. Services */}
      <ServiceGrid
        title={t("services_title")}
        subtitle={t("services_subtitle")}
        services={[
          {
            name: t("service_geo_name"),
            description: t("service_geo_description"),
            icon: <Search size={20} />,
            href: "/services/geo-consulting",
          },
          {
            name: t("service_ai_content_name"),
            description: t("service_ai_content_description"),
            icon: <FileText size={20} />,
            href: "/services/ai-content-strategy",
          },
          {
            name: t("service_geo_audit_name"),
            description: t("service_geo_audit_description"),
            icon: <CheckCircle size={20} />,
            href: "/services/geo-audit",
          },
          {
            name: t("service_seo_name"),
            description: t("service_seo_description"),
            icon: <Settings size={20} />,
            href: "/services/technical-seo",
          },
        ]}
      />

      {/* 6. Data showcase */}
      <DataShowcase
        title={t("data_title")}
        subtitle={t("data_subtitle")}
        highlights={[
          {
            value: t("data_zero_click_value"),
            label: t("data_zero_click_label"),
            description: t("data_zero_click_description"),
          },
          {
            value: t("data_conversion_value"),
            label: t("data_conversion_label"),
            description: t("data_conversion_description"),
          },
          {
            value: t("data_scores_value"),
            label: t("data_scores_label"),
            description: t("data_scores_description"),
          },
          {
            value: t("data_countries_value"),
            label: t("data_countries_label"),
            description: t("data_countries_description"),
          },
        ]}
        ctaText={t("data_cta")}
        ctaHref="/research"
      />

      {/* 7. Social proof — Testimonials */}
      <TestimonialSection
        title={t("testimonials_title")}
        subtitle={t("testimonials_subtitle")}
        testimonials={[
          {
            quote: "Be-Found transformed our AI visibility. We went from invisible to cited in ChatGPT within 3 months.",
            author: "Marketing Director",
            title: "Head of Digital",
            company: "European SaaS Company",
          },
          {
            quote: "The GEO audit revealed blind spots we never knew existed. Our organic traffic from AI referrals tripled.",
            author: "CEO",
            title: "Chief Executive",
            company: "Tech Startup",
          },
          {
            quote: "Finally, a team that understands AI search. Their data-driven approach delivered measurable results.",
            author: "Growth Lead",
            title: "VP Growth",
            company: "Digital Agency",
          },
        ]}
      />

      {/* 8. Team */}
      <TeamSection
        title={t("team_title")}
        subtitle={t("team_subtitle")}
        members={[
          {
            name: "Dries de Gelder",
            role: t("team_dries_role"),
            credentials: t("team_dries_credentials"),
            linkedIn: "https://www.linkedin.com/in/driesdegelder/",
          },
          {
            name: "Joost Winnink",
            role: t("team_joost_role"),
            credentials: t("team_joost_credentials"),
          },
        ]}
      />

      {/* 9. Latest insights — mock data for Phase 1 */}
      <LatestInsights
        title={t("insights_title")}
        subtitle={t("insights_subtitle")}
        posts={[
          {
            title: "What Is GEO? The Complete Guide to Generative Engine Optimization",
            excerpt: "Everything you need to know about optimizing for AI-powered search engines in 2026.",
            href: "https://cited.be-found.online/what-is-geo",
            publishedAt: "2026-02-01",
            readingTime: 12,
            tags: ["GEO"],
          },
          {
            title: "AI Citations vs Backlinks: Why Being Cited Matters More Than Ever",
            excerpt: "How AI citation signals are replacing traditional link authority in search rankings.",
            href: "https://cited.be-found.online/ai-citations-vs-backlinks",
            publishedAt: "2026-01-25",
            readingTime: 8,
            tags: ["Research"],
          },
          {
            title: "GEO Score Methodology: How We Measure AI Visibility",
            excerpt: "A deep dive into the scoring methodology behind our GEO-Score analysis tool.",
            href: "https://cited.be-found.online/geo-score-methodology",
            publishedAt: "2026-01-18",
            readingTime: 10,
            tags: ["Data"],
          },
        ]}
        viewAllHref="https://cited.be-found.online"
        viewAllText={t("insights_view_all")}
      />

      {/* 10. Final CTA */}
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

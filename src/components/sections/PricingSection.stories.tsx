import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PricingSection } from "./PricingSection";

const meta = {
  title: "Sections/PricingSection",
  component: PricingSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Transparent Pricing",
    subtitle: "Choose the plan that fits your business.",
    tiers: [
      {
        name: "Starter",
        tagline: "For small businesses",
        monthlyPrice: 2500,
        ctaText: "Get Started",
        ctaHref: "/contact",
        features: [
          "GEO Audit",
          "Monthly Report",
          "Schema.org Setup",
          "Email Support",
        ],
      },
      {
        name: "Professional",
        tagline: "Most popular choice",
        monthlyPrice: 5000,
        highlighted: true,
        ctaText: "Get Started",
        ctaHref: "/contact",
        features: [
          "Everything in Starter",
          "Content Optimization",
          "Weekly Reports",
          "Priority Support",
          "GEO-Score Access",
        ],
      },
      {
        name: "Enterprise",
        tagline: "For large organizations",
        monthlyPrice: 10000,
        ctaText: "Contact Us",
        ctaHref: "/contact",
        features: [
          "Everything in Professional",
          "Custom Strategy",
          "Dedicated Manager",
          "API Access",
          "SLA Guarantee",
        ],
      },
      {
        name: "Custom",
        tagline: "Tailored to your needs",
        monthlyPrice: 0,
        ctaText: "Let's Talk",
        ctaHref: "/contact",
        features: [
          "Custom Scope",
          "Flexible Billing",
          "Multi-brand Support",
          "White-label Options",
        ],
      },
    ],
  },
};

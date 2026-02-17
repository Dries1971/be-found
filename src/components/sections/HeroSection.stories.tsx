import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./HeroSection";

const meta = {
  title: "Sections/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "select", options: ["dark", "light", "featured"] },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    variant: "dark",
    badge: "GEO Authority Hub",
    headline: "Get Found by AI Search Engines",
    headlineHighlight: "AI Search Engines",
    description:
      "Expert guidance on Generative Engine Optimization (GEO) and AI visibility.",
    primaryCTA: "Free GEO Audit",
    primaryHref: "/contact",
    secondaryCTA: "Our Services",
    secondaryHref: "/services",
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    badge: "Services",
    headline: "Comprehensive GEO Services",
    headlineHighlight: "GEO Services",
    description:
      "From strategy to implementation, we cover every aspect of AI visibility.",
  },
};

export const Featured: Story = {
  args: {
    variant: "featured",
    badge: "New Product",
    headline: "Introducing GEO-Score",
    headlineHighlight: "GEO-Score",
    description:
      "Measure and improve your AI search visibility with our proprietary tool.",
    primaryCTA: "Try GEO-Score",
    primaryHref: "/products/geo-score",
  },
};

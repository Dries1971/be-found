import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CTASection } from "./CTASection";

const meta = {
  title: "Sections/CTASection",
  component: CTASection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "select", options: ["audit", "newsletter", "download"] },
  },
} satisfies Meta<typeof CTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Audit: Story = {
  args: {
    variant: "audit",
    headline: "Ready to Get Found by AI?",
    description:
      "Get a free GEO audit and discover how AI search engines see your business.",
    buttonText: "Get Your Free Audit",
    buttonHref: "/contact",
    subtext: "No commitment required",
  },
};

export const Newsletter: Story = {
  args: {
    variant: "newsletter",
    headline: "Stay Ahead of AI Search",
    description:
      "Weekly insights on GEO, AI visibility, and search engine trends.",
    buttonText: "Subscribe",
    buttonHref: "#newsletter",
  },
};

export const Download: Story = {
  args: {
    variant: "download",
    headline: "Download the GEO Guide",
    description: "Our comprehensive guide to Generative Engine Optimization.",
    buttonText: "Download Free Guide",
    buttonHref: "#",
    subtext: "PDF, 45 pages",
  },
};

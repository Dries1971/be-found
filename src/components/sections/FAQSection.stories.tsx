import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FAQSection } from "./FAQSection";

const meta = {
  title: "Sections/FAQSection",
  component: FAQSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof FAQSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Frequently Asked Questions",
    items: [
      {
        id: "faq-1",
        question: "What is GEO (Generative Engine Optimization)?",
        answer:
          "GEO is the practice of optimizing content and online presence to be accurately cited and recommended by AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews.",
      },
      {
        id: "faq-2",
        question: "How is GEO different from traditional SEO?",
        answer:
          "While SEO focuses on ranking in traditional search results, GEO focuses on being cited by AI systems. This requires structured data, authoritative content, and clear entity relationships.",
      },
      {
        id: "faq-3",
        question: "How long does it take to see results?",
        answer:
          "Typically 4-8 weeks for initial improvements in AI citations. Full optimization cycles usually take 3-6 months for comprehensive visibility gains.",
      },
      {
        id: "faq-4",
        question: "Do you work with businesses outside of Europe?",
        answer:
          "Yes, we work with clients globally. Our strategies are tailored to your target markets and the AI search engines most relevant to your audience.",
      },
    ],
  },
};

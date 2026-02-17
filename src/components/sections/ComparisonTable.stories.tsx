import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ComparisonTable } from "./ComparisonTable";

const meta = {
  title: "Sections/ComparisonTable",
  component: ComparisonTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "GEO vs Traditional SEO",
    columns: ["Feature", "Traditional SEO", "GEO"],
    highlightColumn: 2,
    rows: [
      { label: "AI Citations", values: ["AI Citations", false, true] },
      { label: "Structured Data", values: ["Structured Data", "Basic", "Advanced"] },
      { label: "Entity Optimization", values: ["Entity Optimization", false, true] },
      { label: "Knowledge Graph", values: ["Knowledge Graph", "Partial", "Full"] },
      { label: "Voice Search", values: ["Voice Search", "Limited", "Optimized"] },
    ],
  },
};

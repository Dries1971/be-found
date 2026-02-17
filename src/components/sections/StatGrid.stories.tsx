import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatGrid } from "./StatGrid";

const meta = {
  title: "Sections/StatGrid",
  component: StatGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof StatGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    columns: 4,
    stats: [
      { value: "150+", label: "Clients", trend: { value: "+23%", direction: "up" } },
      { value: "85%", label: "Avg. GEO Score", trend: { value: "+12%", direction: "up" } },
      { value: "2.4M", label: "Citations", trend: { value: "+45%", direction: "up" } },
      { value: "99.9%", label: "Uptime", trend: { value: "0%", direction: "neutral" } },
    ],
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    stats: [
      { value: "40%", label: "AI Search Share" },
      { value: "68%", label: "Zero-Click Rate" },
      { value: "3.2x", label: "Citation Impact" },
    ],
  },
};

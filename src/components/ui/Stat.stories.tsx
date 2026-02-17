import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stat } from "./Stat";

const meta = {
  title: "UI/Stat",
  component: Stat,
  tags: ["autodocs"],
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: "2.4M", label: "Monthly Visitors" },
};

export const WithTrendUp: Story = {
  args: {
    value: "85%",
    label: "GEO Score",
    trend: { value: "+12%", direction: "up" },
  },
};

export const WithTrendDown: Story = {
  args: {
    value: "23%",
    label: "Bounce Rate",
    trend: { value: "-5%", direction: "down" },
  },
};

export const Neutral: Story = {
  args: {
    value: "99.9%",
    label: "Uptime",
    trend: { value: "0%", direction: "neutral" },
  },
};

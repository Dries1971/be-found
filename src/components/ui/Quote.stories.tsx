import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Quote } from "./Quote";

const meta = {
  title: "UI/Quote",
  component: Quote,
  tags: ["autodocs"],
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "GEO is no longer optional. It is the future of online visibility.",
    author: "Dries de Gelder",
    role: "GEO Strategist",
  },
};

export const WithSource: Story = {
  args: {
    text: "By 2026, AI-powered search will account for over 40% of all search traffic.",
    author: "Gartner",
    source: "Gartner Research 2025",
  },
};

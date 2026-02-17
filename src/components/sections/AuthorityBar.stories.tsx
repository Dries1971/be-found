import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorityBar } from "./AuthorityBar";

const meta = {
  title: "Sections/AuthorityBar",
  component: AuthorityBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthorityBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metrics: [
      { value: "150+", label: "Clients Served" },
      { value: "85%", label: "Avg. GEO Score" },
      { value: "2.4M", label: "AI Citations" },
      { value: "30+", label: "Years Experience" },
    ],
  },
};

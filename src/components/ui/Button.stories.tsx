import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["primary", "secondary", "ghost", "link", "destructive"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { intent: "primary", children: "Get Started" },
};

export const Secondary: Story = {
  args: { intent: "secondary", children: "Learn More" },
};

export const Ghost: Story = {
  args: { intent: "ghost", children: "Cancel" },
};

export const Link: Story = {
  args: { intent: "link", children: "Read more" },
};

export const Destructive: Story = {
  args: { intent: "destructive", children: "Delete" },
};

export const Small: Story = {
  args: { intent: "primary", size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { intent: "primary", size: "lg", children: "Large Button" },
};

export const Disabled: Story = {
  args: { intent: "primary", children: "Disabled", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button intent="primary">Primary</Button>
      <Button intent="secondary">Secondary</Button>
      <Button intent="ghost">Ghost</Button>
      <Button intent="link">Link</Button>
      <Button intent="destructive">Destructive</Button>
    </div>
  ),
};

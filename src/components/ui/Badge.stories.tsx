import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: [
        "default", "status", "category", "tag", "geo-score",
        "success", "warning", "destructive", "info",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Default" },
};

export const Category: Story = {
  args: { intent: "category", children: "GEO" },
};

export const GeoScore: Story = {
  args: { intent: "geo-score", children: "Score: 85" },
};

export const Success: Story = {
  args: { intent: "success", children: "Active" },
};

export const Warning: Story = {
  args: { intent: "warning", children: "Pending" },
};

export const Destructive: Story = {
  args: { intent: "destructive", children: "Error" },
};

export const Info: Story = {
  args: { intent: "info", children: "Beta" },
};

export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge intent="default">Default</Badge>
      <Badge intent="status">Status</Badge>
      <Badge intent="category">Category</Badge>
      <Badge intent="tag">Tag</Badge>
      <Badge intent="geo-score">GEO 85</Badge>
      <Badge intent="success">Success</Badge>
      <Badge intent="warning">Warning</Badge>
      <Badge intent="destructive">Error</Badge>
      <Badge intent="info">Info</Badge>
    </div>
  ),
};

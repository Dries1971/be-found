import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import { Button } from "./Button";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "featured", "stat", "product", "tech"],
    },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
      <CardFooter>
        <Button intent="primary" size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Featured: Story = {
  render: () => (
    <Card intent="featured" className="max-w-sm">
      <CardHeader>
        <CardTitle>Featured Card</CardTitle>
        <CardDescription>Gold border accent for emphasis.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Highlighted content area.</p>
      </CardContent>
    </Card>
  ),
};

export const Product: Story = {
  render: () => (
    <Card intent="product" className="max-w-sm">
      <CardHeader>
        <CardTitle>GEO-Score</CardTitle>
        <CardDescription>AI visibility analysis tool.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Measure and improve your AI search presence.</p>
      </CardContent>
      <CardFooter>
        <Button intent="primary" size="sm">Learn More</Button>
      </CardFooter>
    </Card>
  ),
};

export const Stat: Story = {
  render: () => (
    <Card intent="stat" className="max-w-xs">
      <CardContent className="text-center">
        <p className="text-3xl font-bold text-gold">95%</p>
        <p className="text-sm text-foreground-muted">Accuracy Rate</p>
      </CardContent>
    </Card>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(["default", "featured", "stat", "product", "tech"] as const).map(
        (intent) => (
          <Card key={intent} intent={intent}>
            <CardHeader>
              <CardTitle>{intent}</CardTitle>
              <CardDescription>Intent: {intent}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content</p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  ),
};

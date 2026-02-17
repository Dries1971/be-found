import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "./Progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "gold", "teal", "success", "destructive"],
    },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 65, label: "Progress" },
};

export const Gold: Story = {
  args: { value: 85, intent: "gold", label: "GEO Score", showValue: true },
};

export const Teal: Story = {
  args: { value: 72, intent: "teal", label: "Visibility", showValue: true },
};

export const Success: Story = {
  args: { value: 100, intent: "success", label: "Complete", showValue: true },
};

export const Destructive: Story = {
  args: { value: 25, intent: "destructive", label: "Critical", showValue: true },
};

export const AllIntents: Story = {
  args: { value: 65 },
  render: () => (
    <div className="w-80 space-y-4">
      {(["default", "gold", "teal", "success", "destructive"] as const).map(
        (intent) => (
          <Progress
            key={intent}
            value={65}
            intent={intent}
            label={intent}
            showValue
          />
        ),
      )}
    </div>
  ),
};

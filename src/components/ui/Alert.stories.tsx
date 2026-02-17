import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  render: () => (
    <Alert intent="info">
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>This is an informational message.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert intent="success">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your form has been submitted.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert intent="warning">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Please review before proceeding.</AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert intent="error">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {(["info", "success", "warning", "error"] as const).map((intent) => (
        <Alert key={intent} intent={intent}>
          <AlertTitle>{intent.charAt(0).toUpperCase() + intent.slice(1)}</AlertTitle>
          <AlertDescription>Alert with {intent} intent.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

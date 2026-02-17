import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search, BarChart3, Globe, FileText, Shield, Zap } from "lucide-react";
import { ServiceGrid } from "./ServiceGrid";

const meta = {
  title: "Sections/ServiceGrid",
  component: ServiceGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ServiceGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Our Services",
    subtitle: "Comprehensive GEO and AI visibility solutions.",
    services: [
      {
        name: "GEO Strategy",
        description: "Custom AI search optimization roadmap tailored to your business.",
        icon: <Search className="h-6 w-6" />,
        href: "/services",
      },
      {
        name: "GEO Audit",
        description: "Deep analysis of your current AI search visibility.",
        icon: <BarChart3 className="h-6 w-6" />,
        href: "/services",
      },
      {
        name: "International GEO",
        description: "Multi-language AI optimization for global markets.",
        icon: <Globe className="h-6 w-6" />,
      },
      {
        name: "Content Optimization",
        description: "AI-ready content that gets cited and recommended.",
        icon: <FileText className="h-6 w-6" />,
      },
      {
        name: "Schema.org Implementation",
        description: "Structured data for better AI understanding.",
        icon: <Shield className="h-6 w-6" />,
      },
      {
        name: "Performance Monitoring",
        description: "Track your AI visibility metrics over time.",
        icon: <Zap className="h-6 w-6" />,
      },
    ],
  },
};

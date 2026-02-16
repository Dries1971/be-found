import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
}

export function Stat({ value, label, trend, className, ...props }: StatProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-[var(--radius-lg)]",
        "border border-border bg-background-secondary p-6 text-center",
        className
      )}
      {...props}
    >
      <span className="text-3xl font-bold tabular-nums text-gold">
        {value}
      </span>
      <span className="text-sm text-foreground-muted">{label}</span>
      {trend && <StatTrend value={trend.value} direction={trend.direction} />}
    </div>
  );
}

const trendColors = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-foreground-muted",
} as const;

const trendArrows = {
  up: "\u2191",
  down: "\u2193",
  neutral: "\u2192",
} as const;

function StatTrend({
  value,
  direction,
}: {
  value: string;
  direction: "up" | "down" | "neutral";
}) {
  return (
    <span
      className={cn("mt-1 text-xs font-medium tabular-nums", trendColors[direction])}
    >
      {trendArrows[direction]} {value}
    </span>
  );
}

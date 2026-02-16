import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number;
  /** Optional label above bar */
  label?: string;
  /** Show percentage text */
  showValue?: boolean;
  /** Bar color variant */
  intent?: "default" | "gold" | "teal" | "success" | "destructive";
}

const intentColors = {
  default: "bg-foreground-muted",
  gold: "bg-gold",
  teal: "bg-teal",
  success: "bg-success",
  destructive: "bg-destructive",
} as const;

/**
 * Progress bar with optional label and percentage.
 *
 * Used for GEO scores, audit results, and loading states.
 */
export function Progress({
  value,
  label,
  showValue = false,
  intent = "gold",
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-sm tabular-nums text-foreground-muted">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-background-secondary"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            intentColors[intent]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

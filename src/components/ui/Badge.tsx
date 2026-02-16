import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center",
    "rounded-[var(--radius-full)] font-medium",
    "transition-colors duration-[var(--duration-fast)]",
  ],
  {
    variants: {
      intent: {
        default: "bg-foreground/10 text-foreground",
        status: "bg-gold/15 text-gold",
        category: "bg-teal/15 text-teal",
        tag: "border border-border text-foreground-muted",
        "geo-score": [
          "bg-gold text-midnight font-bold",
          "tabular-nums",
        ],
        success: "bg-success-bg text-success",
        warning: "bg-warning-bg text-warning",
        destructive: "bg-destructive-bg text-destructive",
        info: "bg-info-bg text-info",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, intent, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ intent, size }), className)} {...props} />
  );
}

export { badgeVariants };

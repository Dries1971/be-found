import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  [
    "relative w-full",
    "rounded-[var(--radius-lg)] border p-4",
    "text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current",
    "[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  ],
  {
    variants: {
      intent: {
        info: "border-info/30 bg-info-bg text-info",
        success: "border-success/30 bg-success-bg text-success",
        warning: "border-warning/30 bg-warning-bg text-warning",
        error: "border-destructive/30 bg-destructive-bg text-destructive",
      },
    },
    defaultVariants: {
      intent: "info",
    },
  }
);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, intent, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ intent }), className)}
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-relaxed opacity-90", className)}
      {...props}
    />
  );
}

export { alertVariants };

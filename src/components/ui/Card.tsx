import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "rounded-[var(--radius-lg)] border border-border",
    "bg-background-secondary",
    "transition-shadow duration-[var(--duration-normal)] ease-[var(--ease-default)]",
  ],
  {
    variants: {
      intent: {
        default: "shadow-[var(--shadow-sm)]",
        featured: [
          "border-gold/40 shadow-[var(--shadow-gold)]",
          "hover:shadow-[var(--shadow-lg)]",
        ],
        stat: "text-center",
        product: [
          "shadow-[var(--shadow-md)]",
          "hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5",
          "transition-[shadow,transform] duration-[var(--duration-normal)]",
        ],
        tech: "border-teal/30",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      intent: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, intent, padding, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ intent, padding }), className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-foreground-muted", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  );
}

export { cardVariants };

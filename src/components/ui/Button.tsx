"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-[var(--radius-md)] font-medium",
    "transition-colors duration-[var(--duration-normal)] ease-[var(--ease-default)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
    "cursor-pointer",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-gold text-midnight",
          "hover:bg-gold-hover",
          "active:bg-gold-active",
        ],
        secondary: [
          "border border-gold/40 text-gold bg-transparent",
          "hover:bg-gold/10",
          "active:bg-gold/20",
        ],
        ghost: [
          "text-foreground-muted bg-transparent",
          "hover:bg-foreground/5 hover:text-foreground",
          "active:bg-foreground/10",
        ],
        link: [
          "text-gold underline-offset-4 bg-transparent",
          "hover:underline",
          "active:text-gold-active",
          "p-0 h-auto",
        ],
        destructive: [
          "bg-destructive text-white",
          "hover:bg-destructive/90",
          "active:bg-destructive/80",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, intent, size, asChild = false, ...props }, ref) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ intent, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export { buttonVariants };

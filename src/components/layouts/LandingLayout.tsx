import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LandingLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Landing page layout: full-width sections with no max-width constraint.
 * Each section component controls its own max-width and padding.
 * Used for homepage, service pages, product pages.
 * Header + Footer are provided by the locale layout.
 */
export function LandingLayout({ children, className }: LandingLayoutProps) {
  return (
    <main id="main-content" className={cn("flex flex-col", className)}>
      {children}
    </main>
  );
}

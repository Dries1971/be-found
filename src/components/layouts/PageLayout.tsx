import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  /** Narrower max-width for text-heavy pages (legal, about) */
  narrow?: boolean;
}

/**
 * Basic page layout: centered content with consistent padding.
 * Used for info pages, legal pages, and general content.
 * Header + Footer are provided by the locale layout.
 */
export function PageLayout({ children, className, narrow }: PageLayoutProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </main>
  );
}

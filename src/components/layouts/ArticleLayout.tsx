import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ArticleLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

/**
 * Article layout: prose content area with optional sidebar.
 * Used for pillar pages, guides, and long-form content.
 * Content area uses max-w-prose for optimal reading width.
 * Header + Footer are provided by the locale layout.
 */
export function ArticleLayout({ children, sidebar, className }: ArticleLayoutProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
        className
      )}
    >
      <div className={cn("flex flex-col gap-12", sidebar && "lg:flex-row lg:gap-16")}>
        {/* Article content */}
        <article
          className={cn(
            "min-w-0 flex-1",
            "prose prose-lg max-w-prose",
            "prose-headings:text-foreground prose-headings:font-bold",
            "prose-p:text-foreground-muted prose-p:leading-relaxed",
            "prose-a:text-gold prose-a:no-underline hover:prose-a:underline",
            "prose-strong:text-foreground",
            "prose-code:rounded-[var(--radius-sm)] prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm",
            "prose-blockquote:border-l-gold prose-blockquote:text-foreground-muted",
            "prose-img:rounded-[var(--radius-lg)]",
            "prose-hr:border-border"
          )}
        >
          {children}
        </article>

        {/* Optional sidebar */}
        {sidebar && (
          <aside className="w-full shrink-0 lg:w-72 xl:w-80">
            <div className="sticky top-24 space-y-8">
              {sidebar}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

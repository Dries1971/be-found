import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface QuoteProps extends HTMLAttributes<HTMLDivElement> {
  /** Quote text */
  text: string;
  /** Author name */
  author: string;
  /** Author role or title */
  role?: string;
  /** Source publication or URL */
  source?: string;
}

/**
 * Blockquote with author attribution and gold accent.
 *
 * Used for testimonials and expert quotes on content pages.
 */
export function Quote({
  text,
  author,
  role,
  source,
  className,
  ...props
}: QuoteProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border-l-4 border-gold bg-background-secondary p-6",
        className
      )}
      {...props}
    >
      <blockquote>
        <p className="text-base italic leading-relaxed text-foreground">
          &ldquo;{text}&rdquo;
        </p>
      </blockquote>
      <footer className="mt-4">
        <p className="text-sm font-semibold text-foreground">{author}</p>
        {role && (
          <p className="text-xs text-foreground-muted">{role}</p>
        )}
        {source && (
          <p className="mt-1 text-xs text-foreground-muted">
            &mdash; {source}
          </p>
        )}
      </footer>
    </div>
  );
}

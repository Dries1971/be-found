import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface DataHighlight {
  /** The prominent value (e.g. "58%", "10,000+") */
  value: string;
  /** Label describing the metric */
  label: string;
  /** Optional longer description */
  description?: string;
}

export interface DataShowcaseProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Data highlights to display */
  highlights: DataHighlight[];
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaHref?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Data showcase section displaying research highlights.
 *
 * Phase 1: Static highlights (hardcoded data).
 * Phase 2+: Live data from GEO-Score API.
 *
 * Used on homepage to demonstrate authority through data.
 */
export function DataShowcase({
  title,
  subtitle,
  highlights,
  ctaText,
  ctaHref,
  className,
}: DataShowcaseProps) {
  return (
    <section className={cn("w-full bg-navy py-16 text-snow sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-snow/70">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            highlights.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {highlights.map((highlight, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-lg)] border border-snow/10 bg-midnight/50 p-6"
            >
              <p className="text-3xl font-bold tabular-nums text-gold sm:text-4xl">
                {highlight.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-snow">
                {highlight.label}
              </p>
              {highlight.description && (
                <p className="mt-1 text-sm leading-relaxed text-snow/50">
                  {highlight.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {ctaText && ctaHref && (
          <div className="mt-12 text-center">
            <Button intent="primary" size="lg" asChild>
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

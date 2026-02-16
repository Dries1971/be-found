import { cn } from "@/lib/utils";

export interface AuthorityMetric {
  /** The metric value/text */
  value: string;
  /** Optional label below the value */
  label?: string;
}

export interface AuthorityBarProps {
  /** Array of metrics to display */
  metrics: AuthorityMetric[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Authority bar displaying key trust metrics.
 *
 * Compact horizontal bar — pure data, no decoration.
 * Used on homepage, landing pages, and service pages.
 *
 * Example metrics: "Since 1996", "10,000+ blogs", "45 countries"
 */
export function AuthorityBar({ metrics, className }: AuthorityBarProps) {
  return (
    <section
      className={cn(
        "w-full border-y border-border/50 bg-navy/50 dark:bg-navy/30",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12 lg:gap-x-16">
          {metrics.map((metric, i) => (
            <li
              key={i}
              className="flex items-center gap-x-8 sm:gap-x-12 lg:gap-x-16"
            >
              {/* Separator dot (not before first item) */}
              {i > 0 && (
                <span
                  className="hidden text-gold/60 sm:inline"
                  aria-hidden="true"
                >
                  •
                </span>
              )}
              <div className="text-center">
                <span className="text-sm font-semibold text-snow sm:text-base">
                  {metric.value}
                </span>
                {metric.label && (
                  <span className="ml-1 text-sm text-snow/50">
                    {metric.label}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";
import { Stat } from "@/components/ui/Stat";

export interface StatGridItem {
  value: string | number;
  label: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
}

export interface StatGridProps {
  /** Array of stats to display */
  stats: StatGridItem[];
  /** Number of columns at desktop (default 4) */
  columns?: 3 | 4;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Responsive grid of Stat cards.
 *
 * Used on homepage, about page, and data pages.
 * Mobile: 1 col, tablet: 2 cols, desktop: 3 or 4 cols.
 */
export function StatGrid({ stats, columns = 4, className }: StatGridProps) {
  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {stats.map((stat, i) => (
            <Stat
              key={i}
              value={stat.value}
              label={stat.label}
              trend={stat.trend}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

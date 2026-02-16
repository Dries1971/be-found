import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ComparisonRow {
  /** Row label (feature name) */
  label: string;
  /** Values for each column */
  values: (string | boolean | ReactNode)[];
}

export interface ComparisonTableProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Column header labels */
  columns: string[];
  /** Comparison data rows */
  rows: ComparisonRow[];
  /** Index of highlighted (recommended) column (0-based, excludes label column) */
  highlightColumn?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Comparison table for side-by-side feature comparison.
 *
 * Used on pillar pages (e.g., GEO vs SEO).
 * Responsive: horizontal scroll on mobile.
 */
export function ComparisonTable({
  title,
  subtitle,
  columns,
  rows,
  highlightColumn,
  className,
}: ComparisonTableProps) {
  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-background-secondary">
                <th className="px-4 py-3 font-semibold text-foreground" />
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={cn(
                      "px-4 py-3 font-semibold text-foreground",
                      highlightColumn === i && "bg-gold/5 text-gold"
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-border/50",
                    rowIdx % 2 === 1 && "bg-background-secondary/50"
                  )}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.label}
                  </td>
                  {row.values.map((value, colIdx) => (
                    <td
                      key={colIdx}
                      className={cn(
                        "px-4 py-3 text-foreground-muted",
                        highlightColumn === colIdx && "bg-gold/5"
                      )}
                    >
                      {typeof value === "boolean" ? (
                        <span
                          className={value ? "text-success" : "text-destructive"}
                          aria-label={value ? "Yes" : "No"}
                        >
                          {value ? "\u2713" : "\u2717"}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

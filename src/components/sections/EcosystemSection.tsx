import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface ProductMetric {
  label: string;
  value: string | number;
}

export interface ProductItem {
  /** Product name */
  name: string;
  /** Short description */
  description: string;
  /** Badge text (e.g. "AI Blog Automation") */
  badge?: string;
  /** Icon element */
  icon?: ReactNode;
  /** Key metrics */
  metrics: ProductMetric[];
  /** CTA text */
  ctaText?: string;
  /** CTA link (external) */
  ctaHref?: string;
}

export interface EcosystemSectionProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Product cards to display */
  products: ProductItem[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Product ecosystem section showcasing Be-Found's products.
 *
 * Displays Bloffee and GEO-Score as featured cards with metrics.
 * Used on homepage section #4.
 */
export function EcosystemSection({
  title,
  subtitle,
  products,
  className,
}: EcosystemSectionProps) {
  return (
    <section className={cn("w-full bg-midnight py-16 text-snow sm:py-20 lg:py-24", className)}>
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

        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <Card
              key={product.name}
              intent="featured"
              padding="lg"
              className="h-full bg-navy/50"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {product.icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-gold/10 text-gold">
                      {product.icon}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-snow">
                      {product.name}
                    </CardTitle>
                    {product.badge && (
                      <Badge intent="category" className="mt-1">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                {product.description && (
                  <CardDescription className="mt-3 text-snow/60">
                    {product.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  {product.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs text-snow/50">{metric.label}</dt>
                      <dd className="mt-0.5 text-lg font-bold tabular-nums text-gold">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>

              {product.ctaText && product.ctaHref && (
                <CardFooter className="mt-2">
                  <Button intent="secondary" size="md" asChild>
                    <a
                      href={product.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.ctaText}
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

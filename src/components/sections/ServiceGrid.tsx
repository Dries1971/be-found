import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";

export interface ServiceItem {
  /** Service name */
  name: string;
  /** Short description */
  description: string;
  /** Icon element (e.g. Lucide icon) */
  icon: ReactNode;
  /** Link to service detail page */
  href: string;
}

export interface ServiceGridProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Array of services to display */
  services: ServiceItem[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Grid of service offering cards with icons.
 *
 * Used on homepage and services overview page.
 * Mobile: 1 col, tablet: 2 cols, desktop: 3-4 cols (auto based on count).
 */
export function ServiceGrid({
  title,
  subtitle,
  services,
  className,
}: ServiceGridProps) {
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

        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            services.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {services.map((service) => (
            <a
              key={service.name}
              href={service.href}
              className="group block"
            >
              <Card
                intent="product"
                className="h-full"
              >
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-gold/10 text-gold">
                    {service.icon}
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="text-sm font-medium text-gold group-hover:underline">
                    Learn more &rarr;
                  </span>
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

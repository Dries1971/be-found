"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface PricingTier {
  /** Tier name */
  name: string;
  /** Short tagline */
  tagline: string;
  /** Monthly price in EUR (0 = "Let's discuss") */
  monthlyPrice: number;
  /** Annual price in EUR (optional, for annual discount) */
  annualPrice?: number;
  /** Whether this tier is highlighted/recommended */
  highlighted?: boolean;
  /** List of included features */
  features: string[];
  /** CTA button text */
  ctaText: string;
  /** CTA button link */
  ctaHref: string;
}

export interface PricingSectionProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Pricing tiers */
  tiers: PricingTier[];
  /** Label for monthly toggle */
  monthlyLabel?: string;
  /** Label for annual toggle */
  annualLabel?: string;
  /** Custom price label (e.g., "Let's discuss") for 0-price tiers */
  customPriceLabel?: string;
  /** Currency symbol */
  currency?: string;
  /** Per-month suffix text */
  perMonthText?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Pricing section with tiered cards and monthly/annual toggle.
 *
 * Client component (toggle state requires interactivity).
 * Transparent pricing per Nielsen Norman research — hiding price = "evasive and untrustworthy".
 */
export function PricingSection({
  title,
  subtitle,
  tiers,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  customPriceLabel = "Let\u2019s discuss",
  currency = "\u20AC",
  perMonthText = "/mo",
  className,
}: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const hasAnnual = tiers.some((t) => t.annualPrice != null);

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

        {/* Monthly/Annual toggle */}
        {hasAnnual && (
          <div className="mb-10 flex items-center justify-center gap-3">
            <span
              className={cn(
                "text-sm font-medium",
                !isAnnual ? "text-foreground" : "text-foreground-muted"
              )}
            >
              {monthlyLabel}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                isAnnual ? "bg-gold" : "bg-border"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-snow shadow-sm transition-transform",
                  isAnnual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium",
                isAnnual ? "text-foreground" : "text-foreground-muted"
              )}
            >
              {annualLabel}
            </span>
          </div>
        )}

        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            tiers.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {tiers.map((tier) => {
            const price = isAnnual && tier.annualPrice != null
              ? tier.annualPrice
              : tier.monthlyPrice;
            const isCustom = tier.monthlyPrice === 0;

            return (
              <Card
                key={tier.name}
                intent={tier.highlighted ? "featured" : "default"}
                padding="lg"
                className={cn("flex flex-col", tier.highlighted && "relative")}
              >
                {tier.highlighted && (
                  <Badge
                    intent="category"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Recommended
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.tagline}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mb-6">
                    {isCustom ? (
                      <p className="text-2xl font-bold text-gold">
                        {customPriceLabel}
                      </p>
                    ) : (
                      <p className="text-foreground">
                        <span className="text-4xl font-extrabold tabular-nums text-gold">
                          {currency}{price.toLocaleString()}
                        </span>
                        <span className="text-sm text-foreground-muted">
                          {perMonthText}
                        </span>
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground-muted">
                        <span className="mt-0.5 text-gold" aria-hidden="true">
                          &#10003;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-6">
                  <Button
                    intent={tier.highlighted ? "primary" : "secondary"}
                    size="md"
                    className="w-full"
                    asChild
                  >
                    <a href={tier.ctaHref}>{tier.ctaText}</a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

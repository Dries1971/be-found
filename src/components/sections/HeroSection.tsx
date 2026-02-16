import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const heroVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      variant: {
        dark: "bg-midnight text-snow",
        light: "bg-background text-foreground",
        featured: "bg-midnight text-snow",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
);

export interface HeroSectionProps extends VariantProps<typeof heroVariants> {
  /** Small badge text above headline */
  badge?: string;
  /** Main headline (supports line breaks via \n or React nodes) */
  headline: string;
  /** Highlighted portion of headline (rendered in gold) */
  headlineHighlight?: string;
  /** Supporting description text */
  description: string;
  /** Primary CTA button text */
  primaryCTA?: string;
  /** Primary CTA href */
  primaryHref?: string;
  /** Secondary CTA button text */
  secondaryCTA?: string;
  /** Secondary CTA href */
  secondaryHref?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero section for landing pages.
 *
 * Variants:
 * - dark: Navy background (default, homepage)
 * - light: Theme background (service pages)
 * - featured: Navy + decorative gradient accent
 */
export function HeroSection({
  variant,
  badge,
  headline,
  headlineHighlight,
  description,
  primaryCTA,
  primaryHref = "#",
  secondaryCTA,
  secondaryHref = "#",
  className,
}: HeroSectionProps) {
  return (
    <section className={cn(heroVariants({ variant }), className)}>
      {/* Decorative gradient for featured variant */}
      {variant === "featured" && (
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -10%, var(--color-gold) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <Badge
              intent="category"
              className="mb-6"
            >
              {badge}
            </Badge>
          )}

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {headlineHighlight ? (
              <>
                {headline}{" "}
                <span className="text-gold">{headlineHighlight}</span>
              </>
            ) : (
              headline
            )}
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl",
              variant === "light"
                ? "text-foreground-muted"
                : "text-snow/70"
            )}
          >
            {description}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCTA && (
                <Button intent="primary" size="lg" asChild>
                  <a href={primaryHref}>{primaryCTA}</a>
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  intent={variant === "light" ? "ghost" : "secondary"}
                  size="lg"
                  asChild
                >
                  <a href={secondaryHref}>{secondaryCTA}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

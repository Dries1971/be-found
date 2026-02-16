import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const ctaVariants = cva(
  "w-full py-16 sm:py-20 lg:py-24",
  {
    variants: {
      variant: {
        audit: "bg-midnight text-snow",
        newsletter: "bg-navy text-snow",
        download: "bg-background text-foreground border-y border-border/50",
      },
    },
    defaultVariants: {
      variant: "audit",
    },
  }
);

export interface CTASectionProps extends VariantProps<typeof ctaVariants> {
  /** Section headline */
  headline: string;
  /** Supporting description */
  description: string;
  /** CTA button text */
  buttonText: string;
  /** CTA button href */
  buttonHref?: string;
  /** Optional secondary text below button (e.g., "No credit card required") */
  subtext?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Call-to-action section.
 *
 * Variants:
 * - audit: Dark navy, gold CTA (default — "Get your free GEO audit")
 * - newsletter: Slightly lighter navy (newsletter signup)
 * - download: Light theme background (report download)
 */
export function CTASection({
  variant,
  headline,
  description,
  buttonText,
  buttonHref = "#",
  subtext,
  className,
}: CTASectionProps) {
  return (
    <section className={cn(ctaVariants({ variant }), className)}>
      {/* Decorative gold gradient accent for audit variant */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {variant === "audit" && (
          <div
            className="absolute -top-20 left-1/2 h-40 w-[600px] -translate-x-1/2 opacity-10"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-gold) 0%, transparent 70%)",
            }}
          />
        )}

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-lg leading-relaxed",
              variant === "download"
                ? "text-foreground-muted"
                : "text-snow/70"
            )}
          >
            {description}
          </p>

          <div className="mt-8">
            <Button
              intent="primary"
              size="lg"
              asChild
            >
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          </div>

          {subtext && (
            <p
              className={cn(
                "mt-4 text-sm",
                variant === "download"
                  ? "text-foreground-muted/70"
                  : "text-snow/50"
              )}
            >
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

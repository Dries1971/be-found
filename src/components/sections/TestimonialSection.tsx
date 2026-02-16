import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export interface Testimonial {
  /** Quote text (max 2 sentences) */
  quote: string;
  /** Author name */
  author: string;
  /** Author job title */
  title: string;
  /** Company name */
  company: string;
  /** Optional avatar image path */
  image?: string;
}

export interface TestimonialSectionProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Testimonials to display */
  testimonials: Testimonial[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Testimonial section displaying customer quotes.
 *
 * Social proof for conversion — "Without social proof, a consulting website doesn't convert."
 * Phase 1: prepared for data collection. Phase 2: live testimonials.
 */
export function TestimonialSection({
  title,
  subtitle,
  testimonials,
  className,
}: TestimonialSectionProps) {
  return (
    <section className={cn("w-full bg-background-secondary py-16 sm:py-20 lg:py-24", className)}>
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} intent="default" padding="md" className="flex flex-col">
              <blockquote className="flex-1">
                <p className="text-base leading-relaxed text-foreground before:content-['\u201C'] after:content-['\u201D']">
                  {testimonial.quote}
                </p>
              </blockquote>
              <footer className="mt-4 flex items-center gap-3 border-t border-border/50 pt-4">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

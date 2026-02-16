import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

export interface FAQItem {
  /** Unique ID */
  id: string;
  /** Question text */
  question: string;
  /** Answer text (supports React nodes for rich content) */
  answer: string;
}

export interface FAQSectionProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** FAQ items */
  items: FAQItem[];
  /** Optional CTA below FAQs */
  ctaText?: string;
  /** Optional CTA href */
  ctaHref?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FAQ section wrapping Accordion UI component.
 *
 * Used on FAQ page, service pages, and homepage.
 * Provides structured FAQ data for Schema.org FAQPage markup.
 */
export function FAQSection({
  title,
  subtitle,
  items,
  ctaText,
  ctaHref,
  className,
}: FAQSectionProps) {
  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
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

        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {ctaText && ctaHref && (
          <div className="mt-10 text-center">
            <p className="mb-4 text-sm text-foreground-muted">
              {ctaText}
            </p>
            <Button intent="primary" size="md" asChild>
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

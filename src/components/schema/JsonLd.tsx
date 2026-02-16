export interface JsonLdProps {
  /** JSON-LD data to render (any valid schema.org structure) */
  data: Record<string, unknown>;
}

/**
 * Server Component that renders JSON-LD structured data.
 * Must be SSR — AI crawlers don't execute JavaScript.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

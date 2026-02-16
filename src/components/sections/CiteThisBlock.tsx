"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";

export interface CitationData {
  /** Page or article title */
  title: string;
  /** Full URL */
  url: string;
  /** Author names */
  authors: string[];
  /** Publish date (ISO string) */
  publishDate: string;
}

export interface CiteThisBlockProps {
  /** Citation source data */
  data: CitationData;
  /** Available formats */
  formats?: ("apa" | "bibtex" | "plain")[];
  /** Additional CSS classes */
  className?: string;
}

function formatAPA(data: CitationData): string {
  const date = new Date(data.publishDate);
  const year = date.getFullYear();
  const authors = data.authors.join(", ");
  const today = new Date().toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${authors} (${year}). ${data.title}. Be-Found. Retrieved ${today}, from ${data.url}`;
}

function formatBibTeX(data: CitationData): string {
  const date = new Date(data.publishDate);
  const year = date.getFullYear();
  const key = data.authors[0]?.split(" ").pop()?.toLowerCase() ?? "befound";
  return `@misc{${key}${year},
  title={${data.title}},
  author={${data.authors.join(" and ")}},
  year={${year}},
  url={${data.url}},
  publisher={Be-Found}
}`;
}

function formatPlain(data: CitationData): string {
  return `${data.title} — ${data.url}`;
}

const formatters = {
  apa: formatAPA,
  bibtex: formatBibTeX,
  plain: formatPlain,
};

const formatLabels = {
  apa: "APA",
  bibtex: "BibTeX",
  plain: "Plain text",
};

/**
 * Citation block for pillar pages (CC BY 4.0 content).
 *
 * Shows APA/BibTeX/plain-text citations with copy-to-clipboard.
 * Client component (clipboard API + tabs state).
 */
export function CiteThisBlock({
  data,
  formats = ["apa", "bibtex", "plain"],
  className,
}: CiteThisBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      intent="featured"
      padding="lg"
      className={cn("w-full", className)}
    >
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Cite this page
      </h3>

      <Tabs defaultValue={formats[0]}>
        <TabsList>
          {formats.map((format) => (
            <TabsTrigger key={format} value={format}>
              {formatLabels[format]}
            </TabsTrigger>
          ))}
        </TabsList>

        {formats.map((format) => {
          const citation = formatters[format](data);
          return (
            <TabsContent key={format} value={format}>
              <div className="relative">
                <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-background-secondary p-4 font-mono text-xs leading-relaxed text-foreground-muted">
                  {citation}
                </pre>
                <button
                  type="button"
                  onClick={() => handleCopy(citation)}
                  className={cn(
                    "absolute right-2 top-2 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium transition-colors",
                    copied
                      ? "bg-success/10 text-success"
                      : "bg-background text-foreground-muted hover:text-foreground"
                  )}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
}

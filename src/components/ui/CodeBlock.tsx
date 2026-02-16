"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  /** Code content */
  code: string;
  /** Language label (e.g., "json", "html") */
  language?: string;
  /** Optional filename displayed in header */
  filename?: string;
  /** Show copy button */
  copyable?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Code block with syntax label and copy-to-clipboard.
 *
 * Uses JetBrains Mono (--font-mono).
 * No syntax highlighting library — keep it lean for Phase 1.
 */
export function CodeBlock({
  code,
  language,
  filename,
  copyable = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-midnight",
        className
      )}
    >
      {(language || filename || copyable) && (
        <div className="flex items-center justify-between border-b border-snow/10 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs font-medium text-snow/70">
                {filename}
              </span>
            )}
            {language && !filename && (
              <span className="text-xs font-medium uppercase text-snow/50">
                {language}
              </span>
            )}
          </div>
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-medium transition-colors",
                copied
                  ? "text-success"
                  : "text-snow/50 hover:text-snow"
              )}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm leading-relaxed text-snow/90">
          {code}
        </code>
      </pre>
    </div>
  );
}

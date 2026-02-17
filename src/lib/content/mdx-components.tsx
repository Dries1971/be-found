import type { MDXComponents } from "mdx/types";
import { Quote } from "@/components/ui/Quote";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { CiteThisBlock } from "@/components/sections/CiteThisBlock";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { StatGrid } from "@/components/sections/StatGrid";

/**
 * Custom MDX component mapping for pillar pages.
 *
 * Standard HTML elements (h1, h2, p, etc.) inherit ArticleLayout
 * prose styling. These overrides add our design system components
 * for rich content patterns.
 */
export function getMdxComponents(): MDXComponents {
  return {
    // ─── Custom components available in MDX ───
    Quote,
    Alert,
    AlertTitle,
    AlertDescription,
    CodeBlock,
    CiteThisBlock,
    ComparisonTable,
    StatGrid,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,

    // ─── Enhanced HTML elements ───

    // Tables: wrap in our responsive Table component
    table: ({ children, ...props }) => (
      <Table {...props}>{children}</Table>
    ),
    thead: ({ children, ...props }) => (
      <TableHeader {...props}>{children}</TableHeader>
    ),
    tbody: ({ children, ...props }) => (
      <TableBody {...props}>{children}</TableBody>
    ),
    tr: ({ children, ...props }) => (
      <TableRow {...props}>{children}</TableRow>
    ),
    th: ({ children, ...props }) => (
      <TableHead {...props}>{children}</TableHead>
    ),
    td: ({ children, ...props }) => (
      <TableCell {...props}>{children}</TableCell>
    ),

    // Code blocks with copy button
    pre: ({ children, ...props }) => {
      // Extract language from className (e.g., "language-javascript")
      const child = children as React.ReactElement<{
        className?: string;
        children?: string;
      }>;
      const className = child?.props?.className || "";
      const language = className.replace("language-", "") || undefined;
      const code =
        typeof child?.props?.children === "string"
          ? child.props.children.trim()
          : "";

      if (code) {
        return <CodeBlock code={code} language={language} />;
      }

      return <pre {...props}>{children}</pre>;
    },

    // Blockquotes: use our Quote component for styled quotes
    blockquote: ({ children, ...props }) => (
      <Quote {...props}>{children}</Quote>
    ),

    // Links: external links open in new tab
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...props}
        >
          {children}
        </a>
      );
    },
  };
}

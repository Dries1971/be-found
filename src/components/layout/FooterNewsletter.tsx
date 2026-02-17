"use client";

import { useState, useRef } from "react";

interface FooterNewsletterProps {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  locale: string;
}

export function FooterNewsletter({
  title,
  description,
  placeholder,
  buttonText,
  successMessage,
  errorMessage,
  locale,
}: FooterNewsletterProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const website = formData.get("website") as string; // honeypot

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, website }),
      });

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-success" role="status" aria-live="polite">
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{description}</p>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-4 flex gap-2">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 opacity-0"
        />
        <label htmlFor="footer-newsletter-email" className="sr-only">
          {placeholder}
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          required
          placeholder={placeholder}
          disabled={status === "sending"}
          className="h-9 flex-1 rounded-[var(--radius-md)] border border-border bg-background px-3 text-sm text-foreground placeholder:text-foreground-muted/60 disabled:opacity-[var(--disabled-opacity)]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-9 rounded-[var(--radius-md)] bg-gold px-3 text-sm font-medium text-midnight transition-colors hover:bg-gold-hover disabled:opacity-[var(--disabled-opacity)]"
        >
          {status === "sending" ? "..." : buttonText}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive" role="alert" aria-live="assertive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

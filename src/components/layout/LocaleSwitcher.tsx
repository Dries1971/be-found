"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  nl: "NL",
  de: "DE",
  fr: "FR",
  es: "ES",
  pt: "PT",
};

const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      router.replace(pathname, { locale: newLocale });
      setOpen(false);
    },
    [router, pathname]
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-[var(--radius-md)] px-2",
          "text-sm font-medium text-foreground-muted",
          "hover:text-foreground hover:bg-foreground/5",
          "transition-colors duration-[var(--duration-fast)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "cursor-pointer"
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {localeLabels[locale]}
        <svg className={cn("h-3 w-3 transition-transform duration-[var(--duration-fast)]", open && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className={cn(
            "absolute right-0 top-full z-50 mt-1",
            "min-w-[140px] rounded-[var(--radius-md)]",
            "border border-border bg-background-secondary",
            "shadow-[var(--shadow-lg)] py-1",
            "animate-in fade-in"
          )}
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchLocale(l)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm",
                  "transition-colors duration-[var(--duration-fast)]",
                  "cursor-pointer",
                  l === locale
                    ? "text-gold font-medium"
                    : "text-foreground-muted hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <span className="w-6 font-mono text-xs">{localeLabels[l]}</span>
                <span>{localeNames[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

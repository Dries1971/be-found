"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

type NavKey = "home" | "about" | "services" | "products" | "blog" | "faq" | "pricing" | "contact";

interface NavItem {
  key: NavKey;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "products", href: "/products/bloffee" },
  { key: "blog", href: "https://cited.be-found.online", external: true },
  { key: "faq", href: "/faq" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
];

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open, close]);

  return (
    <>
      {/* Hamburger / Close button */}
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] lg:hidden",
          "text-foreground-muted hover:text-foreground hover:bg-foreground/5",
          "transition-colors duration-[var(--duration-fast)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "cursor-pointer"
        )}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-midnight/60 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <nav
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72",
          "bg-background-secondary border-l border-border",
          "shadow-[var(--shadow-xl)]",
          "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-default)]",
          "lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        {/* Close button inside panel */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            type="button"
            onClick={close}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]",
              "text-foreground-muted hover:text-foreground hover:bg-foreground/5",
              "transition-colors duration-[var(--duration-fast)]",
              "cursor-pointer"
            )}
            aria-label="Close menu"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-2 py-4">
          {navItems.map((item) => (
            <li key={item.key}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className={cn(
                    "flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-2.5",
                    "text-sm text-foreground-muted",
                    "hover:text-foreground hover:bg-foreground/5",
                    "transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  {t(item.key)}
                  <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "flex items-center rounded-[var(--radius-md)] px-3 py-2.5",
                    "text-sm text-foreground-muted",
                    "hover:text-foreground hover:bg-foreground/5",
                    "transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  {t(item.key)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border px-4 py-4">
          <div className="flex items-center justify-between">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

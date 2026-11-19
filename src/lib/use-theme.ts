"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

/**
 * The source of truth is the `dark` class on <html>, set before paint by
 * the inline theme script. Reading it via useSyncExternalStore (instead of
 * a useState initializer) gives React a server snapshot during hydration,
 * so the server HTML and the first client render always match; React then
 * switches to the real value without a hydration mismatch.
 */
function subscribeToThemeClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getResolvedTheme(): ResolvedTheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Matches the server render; the real value is applied right after hydration. */
function getServerResolvedTheme(): ResolvedTheme {
  return "dark";
}

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage blocked (private mode, policies): fall back to system.
  }
  return "system";
}

function applyTheme(newTheme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = newTheme === "dark" || (newTheme === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
  try {
    if (newTheme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", newTheme);
  } catch {
    // Theme still applies for this page view.
  }
}

export function useTheme() {
  const resolvedTheme = useSyncExternalStore(
    subscribeToThemeClass,
    getResolvedTheme,
    getServerResolvedTheme,
  );

  const setTheme = useCallback((newTheme: Theme) => applyTheme(newTheme), []);

  const toggleTheme = useCallback(() => {
    applyTheme(getResolvedTheme() === "dark" ? "light" : "dark");
  }, []);

  // Follow OS changes while the visitor has not picked a theme.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (getStoredTheme() === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { resolvedTheme, setTheme, toggleTheme };
}

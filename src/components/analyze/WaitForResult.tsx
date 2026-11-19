"use client";

import { useEffect } from "react";

/**
 * Polls OUR route (/api/analyses/[id]), never the API directly, with a
 * growing interval (2s → max 10s) and gives up after 5 minutes.
 *
 * Once the analysis is final we reload the page so the server renders the
 * report. Not router.refresh(): in a Next 16.1 production build the
 * refreshed RSC payload (verified complete) is not applied to the waiting
 * screen, while a full server render always is. Dev mode hides the bug.
 */
export function WaitForResult({ id }: { id: string }) {
  useEffect(() => {
    let delay = 2000;
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;
    const started = Date.now();

    const schedule = () => {
      if (stopped || Date.now() - started > 300_000) return;
      delay = Math.min(delay * 1.5, 10_000);
      timer = setTimeout(check, delay);
    };

    const check = async () => {
      try {
        const res = await fetch(`/api/analyses/${id}`, { cache: "no-store" });
        const { status } = (await res.json()) as { status: string };
        if (status === "completed" || status === "failed") {
          window.location.reload();
          return;
        }
      } catch {
        // Network hiccup: try again on the next tick.
      }
      schedule();
    };

    timer = setTimeout(check, delay);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [id]);

  return null;
}

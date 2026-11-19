"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

/**
 * Polls OUR route (/api/analyses/[id]), never the API directly, with a
 * growing interval (2s → max 10s) and gives up after 5 minutes. Once the
 * analysis is final the server component re-renders with the report.
 */
export function WaitForResult({ id }: { id: string }) {
  const router = useRouter();

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
          router.refresh();
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
  }, [id, router]);

  return null;
}

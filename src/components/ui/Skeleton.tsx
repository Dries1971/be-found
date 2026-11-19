import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton loading placeholder with pulse animation.
 * Use for content that is loading asynchronously.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        // max-w-full: fixed widths (w-96 …) must never widen the page on phones
        "max-w-full rounded-md bg-foreground-muted/20",
        "animate-[skeleton-pulse_1.5s_ease-in-out_infinite]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

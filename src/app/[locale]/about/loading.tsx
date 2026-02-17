import { Skeleton } from "@/components/ui";

/** About page loading skeleton — matches PageLayout narrow */
export default function AboutLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Header */}
      <Skeleton className="mb-3 h-10 w-48" />
      <Skeleton className="mb-10 h-5 w-full max-w-md" />

      {/* Mission section */}
      <Skeleton className="mb-4 h-7 w-32" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="mb-10 h-4 w-3/4" />

      {/* Team cards */}
      <Skeleton className="mb-4 h-7 w-24" />
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>

      {/* Values */}
      <Skeleton className="mb-4 h-7 w-28" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </main>
  );
}

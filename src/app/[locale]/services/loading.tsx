import { Skeleton } from "@/components/ui";

/** Services page loading skeleton — matches LandingLayout */
export default function ServicesLoading() {
  return (
    <main className="flex flex-col">
      {/* Hero skeleton */}
      <div className="w-full bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-4 h-6 w-32 rounded-full" />
          <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
          <Skeleton className="mx-auto h-6 w-2/3" />
        </div>
      </div>

      {/* Service grid skeleton */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Comparison table skeleton */}
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-8 h-8 w-64" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </main>
  );
}

import { Skeleton } from "@/components/ui";

/** GEO-Score product page loading skeleton — matches LandingLayout */
export default function GeoScoreLoading() {
  return (
    <main className="flex flex-col">
      {/* Hero skeleton */}
      <div className="w-full bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-4 h-6 w-32 rounded-full" />
          <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
          <Skeleton className="mx-auto mb-8 h-6 w-2/3" />
          <Skeleton className="mx-auto h-12 w-40 rounded-lg" />
        </div>
      </div>

      {/* Features grid skeleton */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-8 h-8 w-48" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="w-full bg-background-secondary py-12">
        <div className="mx-auto flex max-w-5xl justify-center gap-8 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="mx-auto mb-1 h-8 w-16" />
              <Skeleton className="mx-auto h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

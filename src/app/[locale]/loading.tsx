import { Skeleton } from "@/components/ui";

/** Homepage loading skeleton — matches LandingLayout with hero + sections */
export default function HomeLoading() {
  return (
    <main className="flex flex-col">
      {/* Hero skeleton */}
      <div className="w-full bg-navy py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-4 h-6 w-32 rounded-full" />
          <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
          <Skeleton className="mx-auto mb-8 h-6 w-2/3" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Authority bar skeleton */}
      <div className="w-full bg-navy/90 py-6">
        <div className="mx-auto flex max-w-5xl justify-center gap-8 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="mx-auto mb-1 h-8 w-16" />
              <Skeleton className="mx-auto h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="mx-auto mb-4 h-8 w-64" />
            <Skeleton className="mx-auto mb-8 h-5 w-96" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

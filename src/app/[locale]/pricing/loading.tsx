import { Skeleton } from "@/components/ui";

/** Pricing page loading skeleton — matches LandingLayout */
export default function PricingLoading() {
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

      {/* Pricing tiers skeleton */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-2 h-8 w-48" />
        <Skeleton className="mx-auto mb-8 h-5 w-72" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      </div>

      {/* FAQ skeleton */}
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-8 h-8 w-32" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  );
}

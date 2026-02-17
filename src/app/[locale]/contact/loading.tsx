import { Skeleton } from "@/components/ui";

/** Contact page loading skeleton — matches PageLayout narrow */
export default function ContactLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Header */}
      <Skeleton className="mb-3 h-10 w-48" />
      <Skeleton className="mb-10 h-5 w-full max-w-sm" />

      {/* Form skeleton */}
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="mb-2 h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="mb-2 h-4 w-20" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </main>
  );
}

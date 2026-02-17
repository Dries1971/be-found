import { Skeleton } from "@/components/ui";

/** FAQ page loading skeleton — matches PageLayout narrow */
export default function FAQLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Header */}
      <Skeleton className="mb-3 h-10 w-64" />
      <Skeleton className="mb-10 h-5 w-full max-w-sm" />

      {/* FAQ items */}
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-lg" />
        ))}
      </div>
    </main>
  );
}

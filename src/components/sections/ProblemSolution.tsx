import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface ProblemSolutionProps {
  /** Badge text for the problem side */
  problemBadge?: string;
  /** Problem headline */
  problemHeadline: string;
  /** Problem description */
  problemDescription: string;
  /** Optional problem stat (e.g., "58%") */
  problemStat?: string;
  /** Optional problem stat label */
  problemStatLabel?: string;
  /** Badge text for the solution side */
  solutionBadge?: string;
  /** Solution headline */
  solutionHeadline: string;
  /** Solution description */
  solutionDescription: string;
  /** Optional solution stat */
  solutionStat?: string;
  /** Optional solution stat label */
  solutionStatLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Problem/Solution section — creates urgency then presents the answer.
 *
 * Two-column layout on desktop, stacked on mobile.
 * Problem side has a subtle destructive accent, solution side has success.
 */
export function ProblemSolution({
  problemBadge,
  problemHeadline,
  problemDescription,
  problemStat,
  problemStatLabel,
  solutionBadge,
  solutionHeadline,
  solutionDescription,
  solutionStat,
  solutionStatLabel,
  className,
}: ProblemSolutionProps) {
  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Problem */}
          <div className="rounded-[var(--radius-lg)] border border-destructive/20 bg-destructive-bg/50 p-6 sm:p-8 lg:p-10">
            {problemBadge && (
              <Badge intent="destructive" className="mb-4">
                {problemBadge}
              </Badge>
            )}

            {problemStat && (
              <p className="mb-3 text-4xl font-extrabold text-destructive sm:text-5xl">
                {problemStat}
              </p>
            )}
            {problemStatLabel && (
              <p className="mb-4 text-sm font-medium text-destructive/80">
                {problemStatLabel}
              </p>
            )}

            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {problemHeadline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
              {problemDescription}
            </p>
          </div>

          {/* Solution */}
          <div className="rounded-[var(--radius-lg)] border border-success/20 bg-success-bg/50 p-6 sm:p-8 lg:p-10">
            {solutionBadge && (
              <Badge intent="success" className="mb-4">
                {solutionBadge}
              </Badge>
            )}

            {solutionStat && (
              <p className="mb-3 text-4xl font-extrabold text-success sm:text-5xl">
                {solutionStat}
              </p>
            )}
            {solutionStatLabel && (
              <p className="mb-4 text-sm font-medium text-success/80">
                {solutionStatLabel}
              </p>
            )}

            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {solutionHeadline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
              {solutionDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

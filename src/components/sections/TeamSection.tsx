import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export interface TeamMember {
  /** Member name */
  name: string;
  /** Job title / role */
  role: string;
  /** Short bio or credentials */
  credentials?: string;
  /** Path to headshot image */
  image?: string;
  /** LinkedIn profile URL */
  linkedIn?: string;
}

export interface TeamSectionProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Team members to display */
  members: TeamMember[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Team section displaying member cards with photos and credentials.
 *
 * E-E-A-T trust signal — shows the people behind Be-Found.
 * Used on about page and homepage.
 */
export function TeamSection({
  title,
  subtitle,
  members,
  className,
}: TeamSectionProps) {
  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "mx-auto grid gap-8",
            members.length <= 2
              ? "max-w-2xl sm:grid-cols-2"
              : "max-w-4xl sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {members.map((member) => (
            <Card key={member.name} intent="default" padding="none" className="overflow-hidden">
              {member.image && (
                <div className="aspect-[4/5] overflow-hidden bg-navy/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <CardHeader className="p-6">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="font-medium text-gold">
                  {member.role}
                </CardDescription>
                {member.credentials && (
                  <p className="mt-2 text-sm text-foreground-muted">
                    {member.credentials}
                  </p>
                )}
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-medium text-gold hover:underline"
                  >
                    LinkedIn &rarr;
                  </a>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

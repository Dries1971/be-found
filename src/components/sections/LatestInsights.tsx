import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export interface BlogPost {
  /** Post title */
  title: string;
  /** Short excerpt */
  excerpt: string;
  /** Featured image path */
  image?: string;
  /** Full URL to the post (on cited.be-found.online) */
  href: string;
  /** Publish date (ISO string) */
  publishedAt: string;
  /** Reading time in minutes */
  readingTime?: number;
  /** Tags */
  tags?: string[];
}

export interface LatestInsightsProps {
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
  /** Blog posts to display */
  posts: BlogPost[];
  /** Link to view all posts */
  viewAllHref?: string;
  /** "View all" link text */
  viewAllText?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Latest insights section showing recent blog articles.
 *
 * Demonstrates content authority. Links to cited.be-found.online.
 * Phase 1: mock data. Phase 2: live from Bloffee API.
 */
export function LatestInsights({
  title,
  subtitle,
  posts,
  viewAllHref,
  viewAllText,
  className,
}: LatestInsightsProps) {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card intent="product" padding="none" className="h-full overflow-hidden">
                {post.image && (
                  <div className="aspect-[16/9] overflow-hidden bg-navy/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardHeader className="p-5">
                  <div className="flex items-center gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} intent="tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="mt-2 line-clamp-2 group-hover:text-gold">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                  <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    {post.readingTime && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime} min read</span>
                      </>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>

        {viewAllHref && viewAllText && (
          <div className="mt-10 text-center">
            <a
              href={viewAllHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gold hover:underline"
            >
              {viewAllText} &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

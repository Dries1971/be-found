import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("company")}</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/about">{t("about")}</FooterLink>
              <FooterLink href="/about/editorial-process">{t("editorial_process")}</FooterLink>
              <FooterLink href="/about/ai-policy">{t("ai_policy")}</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("services_heading")}</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/services/geo-consulting">{t("geo_consulting")}</FooterLink>
              <FooterLink href="/services/ai-content-strategy">{t("ai_content_strategy")}</FooterLink>
              <FooterLink href="/services/geo-audit">{t("geo_audit")}</FooterLink>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("products_heading")}</h3>
            <ul className="mt-4 space-y-3">
              <FooterExternalLink href="https://bloffee.com">{t("bloffee")}</FooterExternalLink>
              <FooterExternalLink href="https://geo-score.online">{t("geo_score")}</FooterExternalLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("resources")}</h3>
            <ul className="mt-4 space-y-3">
              <FooterExternalLink href="https://cited.be-found.online">{t("blog")}</FooterExternalLink>
              <FooterLink href="/geo-statistics">{t("research")}</FooterLink>
              <FooterLink href="/pricing">{t("pricing")}</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">{t("newsletter_title")}</h3>
            <p className="mt-2 text-sm text-foreground-muted">{t("newsletter_description")}</p>
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder={t("newsletter_placeholder")}
                disabled
                className="h-9 flex-1 rounded-[var(--radius-md)] border border-border bg-background px-3 text-sm text-foreground placeholder:text-foreground-muted/60 disabled:opacity-[var(--disabled-opacity)]"
              />
              <button
                type="button"
                disabled
                className="h-9 rounded-[var(--radius-md)] bg-gold px-3 text-sm font-medium text-midnight disabled:opacity-[var(--disabled-opacity)]"
              >
                {t("newsletter_button")}
              </button>
            </div>
            <p className="mt-2 text-xs text-foreground-muted/60 italic">{t("newsletter_coming_soon")}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
          {/* Left: logo + copyright */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <Logo variant="icon" size="sm" animated={false} />
              <span>
                <span className="text-foreground">Be-Found</span>
                <span className="text-gold">.</span>
              </span>
            </Link>
            <span className="text-sm text-foreground-muted">
              &copy; {year} {t("copyright")}
            </span>
          </div>

          {/* Center: privacy badge */}
          <div className="flex items-center gap-1.5 rounded-[var(--radius-full)] border border-success/30 bg-success-bg px-3 py-1">
            <svg className="h-3.5 w-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs font-medium text-success">{t("privacy_badge")}</span>
          </div>

          {/* Right: legal links + socials */}
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="text-xs text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground">
              {t("terms")}
            </Link>
            <Link href="/impressum" className="text-xs text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground">
              {t("impressum")}
            </Link>
            <span className="text-border">|</span>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/driesdegelder/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Bluesky */}
            <a
              href="https://bsky.app/profile/be-found.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
              aria-label="Bluesky"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.6 3.476 6.162 3.225-4.27.423-8.003 2.07-3.398 7.316 5.168 5.168 7.14.795 8.612-2.45.238-.527.35-.79.35-.576 0-.213.112.049.35.576 1.472 3.245 3.444 7.618 8.612 2.45 4.605-5.246.872-6.893-3.398-7.316 2.562.251 5.377-.598 6.162-3.225.246-.829.624-5.789.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Helper components ─── */

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
      >
        {children}
        <svg className="h-3 w-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </li>
  );
}

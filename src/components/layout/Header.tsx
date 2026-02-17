import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

type NavKey = "home" | "about" | "services" | "products" | "blog" | "faq" | "pricing" | "contact";

interface NavItem {
  key: NavKey;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "products", href: "/products/bloffee" },
  { key: "blog", href: "https://cited.be-found.online", external: true },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Logo variant="icon" size="sm" animated />
          <span>
            <span className="text-foreground">Be-Found</span>
            <span className="text-gold">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground hover:bg-foreground/5"
              >
                {t(item.key)}
                <svg className="h-3 w-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-[var(--radius-md)] px-3 py-2 text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground hover:bg-foreground/5"
              >
                {t(item.key)}
              </Link>
            )
          )}
        </nav>

        {/* Right side: locale + theme + mobile toggle */}
        <div className="flex items-center gap-1">
          <LocaleSwitcher className="hidden lg:block" />
          <ThemeToggle className="hidden lg:inline-flex" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

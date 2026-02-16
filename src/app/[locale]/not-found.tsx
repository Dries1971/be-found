import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <PageLayout narrow className="text-center">
      <div className="py-12">
        <p className="text-6xl font-extrabold text-gold">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("not_found_title")}
        </h1>
        <p className="mt-4 text-lg text-foreground-muted">
          {t("not_found_description")}
        </p>

        <div className="mt-10">
          <Button intent="primary" size="lg" asChild>
            <Link href="/">{t("not_found_back")}</Link>
          </Button>
        </div>

        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">
            {t("not_found_links_title")}
          </h2>
          <nav className="mt-4 flex flex-col items-center gap-2">
            <Link href="/services" className="text-gold hover:underline">
              {t("not_found_link_services")}
            </Link>
            <Link href="/about" className="text-gold hover:underline">
              {t("not_found_link_about")}
            </Link>
            <Link href="/contact" className="text-gold hover:underline">
              {t("not_found_link_contact")}
            </Link>
          </nav>
        </div>
      </div>
    </PageLayout>
  );
}

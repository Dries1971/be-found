import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/schema/JsonLd";
import { generateBreadcrumbs, entityIds } from "@/lib/schema";
import { generatePageMetadata } from "@/lib/metadata";

import type { Locale } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "contact" });
  return generatePageMetadata({
    locale,
    path: "/contact",
    title: t("page_title"),
    description: t("page_description"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const contactSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Be-Found",
    url: "https://be-found.online/contact",
    mainEntity: { "@id": entityIds.organization },
    breadcrumb: generateBreadcrumbs([
      { name: "Home", href: "/" },
      { name: "Contact" },
    ]),
  };

  return (
    <PageLayout narrow>
      <JsonLd data={contactSchema} />
      {/* Page header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t("page_title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {t("page_description")}
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact info */}
        <div>
          <Card padding="lg">
            <CardContent className="space-y-4">
              <h2 className="text-lg font-semibold">{t("info_title")}</h2>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("info_email_label")}
                </p>
                <a
                  href={`mailto:${t("info_email")}`}
                  className="text-sm text-gold hover:underline"
                >
                  {t("info_email")}
                </a>
              </div>
              <p className="text-sm text-foreground-muted">
                {t("info_response")}
              </p>
              <a
                href="https://www.linkedin.com/in/driesdegelder/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-gold hover:underline"
              >
                {t("info_linkedin")}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related links */}
      <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" aria-label="Related pages">
        <Link href="/faq" className="text-gold hover:underline">FAQ</Link>
        <Link href="/services" className="text-gold hover:underline">Services</Link>
        <Link href="/pricing" className="text-gold hover:underline">Pricing</Link>
      </nav>
    </PageLayout>
  );
}

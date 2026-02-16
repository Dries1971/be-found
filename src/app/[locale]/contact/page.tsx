import { getTranslations } from "next-intl/server";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { ContactForm } from "@/components/sections/ContactForm";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <PageLayout narrow>
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
    </PageLayout>
  );
}

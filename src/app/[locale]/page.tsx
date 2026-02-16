import { getTranslations } from "next-intl/server";
import { ComponentShowcase } from "./component-showcase";

export default async function Home() {
  const t = await getTranslations("hero");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-foreground-muted">
        {t("subtitle")}
      </p>
      <ComponentShowcase />
    </main>
  );
}

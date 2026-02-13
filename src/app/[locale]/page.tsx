import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("hero");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-foreground/60">
        {t("subtitle")}
      </p>
    </main>
  );
}

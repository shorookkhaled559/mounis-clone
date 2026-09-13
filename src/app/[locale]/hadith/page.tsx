import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { getCollectionsSummary } from "@/lib/hadith";
import { HadithCollectionCard } from "@/components/sections/hadith-collection-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "hadith");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.hadith" });

  const collections = await getCollectionsSummary();

  // Group collections by type
  const primaryCollections = collections.filter((c) => c.type === "primary");
  const compilationCollections = collections.filter((c) => c.type === "compilation");
  const duaCollections = collections.filter((c) => c.type === "dua");

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />
      <Container className="py-8 space-y-10">
        {/* Primary Collections */}
        {primaryCollections.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">
              {locale === "ar" ? "الكتب الستة والمسانيد" : "Primary Collections"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {primaryCollections.map((collection) => (
                <HadithCollectionCard
                  key={collection.id}
                  collection={collection}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {/* Compilation Collections */}
        {compilationCollections.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">
              {locale === "ar" ? "المختارات والمجاميع" : "Compilation Collections"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {compilationCollections.map((collection) => (
                <HadithCollectionCard
                  key={collection.id}
                  collection={collection}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {/* Du'a Collections */}
        {duaCollections.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">
              {locale === "ar" ? "مجاميع الأدعية" : "Du'a Collections"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {duaCollections.map((collection) => (
                <HadithCollectionCard
                  key={collection.id}
                  collection={collection}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}

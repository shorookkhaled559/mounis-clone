import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function buildPageMetadata(
  locale: string,
  pageKey:
    | "prayer"
    | "zakat"
    | "hadith"
    | "thisDay"
    | "fatwas"
    | "about"
    | "contact"
    | "privacy"
    | "terms"
    | "cookies"
    | "articles",
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `pages.${pageKey}` });
  const title = t("title");
  const hasDescription = ["prayer", "zakat", "hadith", "thisDay", "fatwas", "about", "contact"].includes(
    pageKey,
  );
  const description = hasDescription ? t("description") : undefined;

  return { title, description };
}

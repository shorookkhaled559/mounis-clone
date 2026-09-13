import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { FeaturedArticle } from "@/components/sections/featured-article";
import { PreviousArticles } from "@/components/sections/previous-articles";
import { CommentsSection } from "@/components/sections/comments-section";
import { HadithOfDaySection } from "@/components/sections/hadith-of-day";
import { AppTeaser } from "@/components/sections/app-teaser";
import { Newsletter } from "@/components/sections/newsletter";
import { Container } from "@/components/ui/container";
import { AdSlot } from "@/components/ui/ad-slot";
import { articles, getLatestArticles } from "@/lib/data/articles";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [featured, ...rest] = articles;
  const previous = getLatestArticles(4).filter((a) => a.slug !== featured.slug).slice(0, 3);
  void rest;

  return (
    <>
      <Container className="flex flex-wrap items-center justify-center gap-4 py-3">
        <AdSlot width={728} height={90} className="hidden sm:flex" />
        <AdSlot width={320} height={100} className="flex sm:hidden" />
      </Container>
      <Hero />
      <FeaturedArticle article={featured} />
      <Container className="max-w-3xl py-6">
        <AdSlot width={336} height={280} />
      </Container>
      <PreviousArticles articles={previous} />
      <CommentsSection />
      <HadithOfDaySection />
      <AppTeaser />
      <Newsletter />
    </>
  );
}

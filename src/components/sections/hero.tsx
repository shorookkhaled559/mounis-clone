import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

function getTodayLabel(locale: string) {
  const gregorian = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const hijri = new Intl.DateTimeFormat(`${locale}-u-ca-islamic`, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return { gregorian, hijri };
}

export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const { gregorian, hijri } = getTodayLabel(locale);

  const quickLinks = [
    { key: "prayer", href: "/prayer" },
    { key: "hadith", href: "/hadith" },
    { key: "zakat", href: "/zakat" },
    { key: "thisDay", href: "/this-day" },
  ] as const;

  return (
    <section className="border-b border-border">
      <Container className="py-14 sm:py-20">
        <p className="text-sm font-medium text-accent">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {t("heroDescription")}
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          {gregorian} · {hijri}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t(`quickLinks.${link.key}`)}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { AdSlot } from "@/components/ui/ad-slot";
import { footerExploreNav, footerAboutNav } from "@/lib/nav";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-6">
        <AdSlot width={728} height={90} />
      </Container>

      <Container className="grid gap-10 pb-12 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image src="/brand/logo.png" alt="" width={28} height={28} />
            <span className="font-display text-base text-primary">
              {tMeta("siteName")}
            </span>
          </div>
          <p className="max-w-xs text-sm text-ink-muted">{t("tagline")}</p>
        </div>

        <nav aria-label={t("exploreHeading")}>
          <h2 className="mb-3 text-sm font-semibold text-ink">
            {t("exploreHeading")}
          </h2>
          <ul className="space-y-2">
            {footerExploreNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-primary"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("aboutHeading")}>
          <h2 className="mb-3 text-sm font-semibold text-ink">
            {t("aboutHeading")}
          </h2>
          <ul className="space-y-2">
            {footerAboutNav.map((item) => (
              <li key={item.labelKey}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-primary"
                >
                  {item.labelKey === "about" ? tNav("about") : t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="border-t border-border py-6">
        <p className="text-center text-xs text-ink-muted">{t("note")}</p>
      </Container>
    </footer>
  );
}

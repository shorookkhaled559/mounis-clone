"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav } from "@/lib/nav";
import { LanguageSwitch } from "./language-switch";
import { SearchButton } from "./search-button";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Brand */}
        <Link href="/" className="brand-link">
          <Image
            src="/brand/logo.png"
            alt={tMeta("siteName")}
            width={112}
            height={150}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label={t("home")} className="desktop-nav">
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <SearchButton />
          <LanguageSwitch />
        </div>
      </div>

      {/* Ad banner — removed, shown per-page instead */}
    </header>
  );
}

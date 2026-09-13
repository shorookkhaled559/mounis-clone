"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function Newsletter() {
  const t = useTranslations("home.newsletter");

  return (
    <section className="border-t border-border py-10 sm:py-14">
      <Container className="max-w-xl text-center">
        <h2 className="font-display text-xl text-ink sm:text-2xl">
          {t("heading")}
        </h2>
        <p className="mt-3 text-sm text-ink-muted">{t("description")}</p>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t("placeholder")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={t("placeholder")}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-ink"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("submit")}
          </button>
        </form>
      </Container>
    </section>
  );
}

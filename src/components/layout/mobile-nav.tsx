"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("openMenu")}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 start-0 z-50 flex w-72 max-w-[85vw] flex-col gap-1 bg-surface p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="font-display text-lg text-primary">
              {t("home")}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t("closeMenu")}
                className="rounded-md p-2 text-ink-muted"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label={t("home")} className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                pathname === "/"
                  ? "bg-primary/8 font-medium text-primary"
                  : "text-ink hover:bg-background",
              ].join(" ")}
            >
              {t("home")}
            </Link>
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-primary/8 font-medium text-primary"
                      : "text-ink hover:bg-background",
                  ].join(" ")}
                >
                  <Icon
                    aria-hidden="true"
                    className={[
                      "h-4 w-4 shrink-0",
                      isActive ? "text-primary" : "text-ink-muted",
                    ].join(" ")}
                  />
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

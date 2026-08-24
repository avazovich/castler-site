"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseIcon, PhoneIcon } from "./icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { Wordmark } from "./Wordmark";

export function MobileMenu({
  open,
  onOpenChange,
  links,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: { href: string; label: string }[];
}) {
  const t = useTranslations("Nav");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-overlay fixed inset-0 z-50 bg-ink" />
        <Dialog.Content className="mobile-panel fixed inset-0 z-50 flex flex-col justify-between p-6 text-paper outline-none sm:p-10">
          <Dialog.Title className="sr-only">{t("menu")}</Dialog.Title>
          <div className="flex items-center justify-between">
            <Wordmark variant="cream" height={22} />
            <Dialog.Close className="pill flex items-center gap-1.5 border border-paper/30 text-paper hover:bg-paper/10">
              <CloseIcon className="icon-rotate h-4 w-4" />
              {t("close")}
            </Dialog.Close>
          </div>
          <nav className="flex flex-1 flex-col items-start justify-center gap-1">
            {links.map((link) => (
              <Dialog.Close asChild key={link.href}>
                <Link
                  href={link.href}
                  className="font-display block text-[15vw] leading-[1.1] text-paper transition-all duration-300 hover:translate-x-3 hover:text-gold-light sm:text-6xl"
                >
                  {link.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-paper/15 pt-5">
            <a href="tel:+998000000000" className="flex items-center gap-2 text-sm text-paper/80">
              <PhoneIcon className="h-4 w-4" /> {t("callUs")}
            </a>
            <LanguageSwitch tone="cream" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

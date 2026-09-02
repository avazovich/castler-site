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
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("Nav");
  const tFooter = useTranslations("Footer");

  const groups = [
    {
      label: tFooter("workHeading"),
      links: [
        { href: "/", label: t("home") },
        { href: "/work", label: t("work") },
      ],
    },
    {
      label: tFooter("officeHeading"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/journal", label: t("journal") },
        { href: "/careers", label: t("careers") },
        { href: "/contact", label: t("contact") },
      ],
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-overlay fixed inset-0 z-50 bg-ink" />
        <Dialog.Content className="mobile-panel fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto p-6 text-paper outline-none sm:p-10">
          <Dialog.Title className="sr-only">{t("menu")}</Dialog.Title>
          <div className="flex items-center justify-between">
            <Wordmark variant="cream" height={22} />
            <Dialog.Close className="pill flex items-center gap-1.5 border border-paper/30 text-paper hover:bg-paper/10">
              <CloseIcon className="icon-rotate h-4 w-4" />
              {t("close")}
            </Dialog.Close>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-8 py-10">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="label-mono text-paper/45">{group.label}</p>
                <div className="mt-2 flex flex-col items-start">
                  {group.links.map((link) => (
                    <Dialog.Close asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="font-display block text-[13vw] leading-[1.15] text-paper transition-all duration-300 hover:translate-x-3 hover:text-gold-light sm:text-5xl"
                      >
                        {link.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </div>
              </div>
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

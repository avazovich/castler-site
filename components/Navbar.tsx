"use client";

import { useLenis } from "lenis/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { MenuIcon, PhoneIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLenis((lenis) => {
    setScrolled(lenis.scroll > 8);
  });

  const links = [
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? "border-line bg-paper/70 backdrop-blur-xl"
            : "border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 py-1">
            <Image src="/brand/mark-ink.png" alt="" width={22} height={22} className="h-6 w-auto" />
            <Wordmark height={20} />
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`pill ${active ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-line"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="tel:+998000000000"
              aria-label={t("callUs")}
              className="pill flex items-center bg-paper-2 text-ink transition-colors hover:bg-line"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
            </a>
            <LanguageSwitch />
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className="pill flex items-center gap-1.5 bg-paper-2 text-ink md:hidden"
            aria-label={t("menu")}
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}

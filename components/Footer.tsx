import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BackToTop } from "./BackToTop";
import { FooterLanguageRow } from "./FooterLanguageRow";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-paper">
      <div className="relative px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-20">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-sm">
              <Image
                src="/brand/wordmark-cream.png"
                alt="Castler"
                width={220}
                height={55}
                className="h-10 w-auto sm:h-12"
              />
              <p className="mt-5 text-base text-paper/60">{t("tagline")}</p>
            </div>
            <BackToTop />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div>
              <p className="label-mono text-paper/45">{t("workHeading")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/" className="pill bg-paper/10 text-paper transition-colors hover:bg-paper/20">
                  {tNav("home")}
                </Link>
                <Link href="/work" className="pill bg-paper/10 text-paper transition-colors hover:bg-paper/20">
                  {tNav("work")}
                </Link>
              </div>
            </div>

            <div>
              <p className="label-mono text-paper/45">{t("officeHeading")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/about" className="pill bg-paper/10 text-paper transition-colors hover:bg-paper/20">
                  {tNav("about")}
                </Link>
                <Link href="/contact" className="pill bg-paper/10 text-paper transition-colors hover:bg-paper/20">
                  {tNav("contact")}
                </Link>
              </div>
            </div>

            <div>
              <p className="label-mono text-paper/45">{t("newsHeading")}</p>
              <div className="mt-5">
                <NewsletterSignup signUpLabel={t("signUp")} />
                <p className="mt-2 text-xs text-paper/40">{t("newsConsent")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center">
            <p>
              © {year} Castler. {t("rights")}
            </p>
            <FooterLanguageRow />
          </div>
        </div>
      </div>
    </footer>
  );
}

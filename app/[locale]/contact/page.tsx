import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { ContactForm } from "@/components/ContactForm";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");
  return { title: `${t("eyebrow")} — Castler` };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <div className="pt-24 sm:pt-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 sm:px-10 sm:pb-32 md:grid-cols-2 md:gap-20">
        <div>
          <RevealOnScroll>
            <p className="label-mono text-ink-soft">{t("eyebrow")}</p>
            <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              <AnimatedText text={t("title")} />
            </h1>
            <p className="mt-5 max-w-md text-ink-soft">{t("body")}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="mt-10 border-t border-line pt-8">
            <p className="label-mono text-ink-soft">{t("quickContact")}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+998000000000"
                className="group flex flex-1 items-center justify-between gap-3 rounded-2xl border border-line bg-paper-2 px-6 py-5 transition-all duration-200 hover:scale-[1.02] hover:border-ink hover:bg-ink hover:text-paper active:scale-[0.98]"
              >
                <div>
                  <p className="label-mono text-ink-soft group-hover:text-paper/70">{t("phoneLabel")}</p>
                  <p className="font-display mt-1 text-lg sm:text-xl">+998 00 000 00 00</p>
                </div>
                <PhoneIcon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              </a>
              <a
                href="mailto:hello@castler.uz"
                className="group flex flex-1 items-center justify-between gap-3 rounded-2xl border border-line bg-paper-2 px-6 py-5 transition-all duration-200 hover:scale-[1.02] hover:border-ink hover:bg-ink hover:text-paper active:scale-[0.98]"
              >
                <div>
                  <p className="label-mono text-ink-soft group-hover:text-paper/70">{t("emailLabel")}</p>
                  <p className="font-display mt-1 truncate text-lg sm:text-xl">hello@castler.uz</p>
                </div>
                <MailIcon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
              </a>
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("studioLabel")}</span>
              <span>{t("studioValue")}</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-14">
            <p className="label-mono mb-6 flex items-center gap-2 text-ink-soft">
              <ArrowRightIcon className="h-3.5 w-3.5 rotate-90" />
              {t("orSendDetails")}
            </p>
            <ContactForm
              labels={{
                name: t("formName"),
                email: t("formEmail"),
                message: t("formMessage"),
                submit: t("formSubmit"),
                hint: t("formHint"),
              }}
            />
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1} className="relative hidden aspect-[3/4] overflow-hidden md:block">
          <PlaceholderImage seed="contact-studio" className="h-full w-full" />
        </RevealOnScroll>
      </div>
    </div>
  );
}

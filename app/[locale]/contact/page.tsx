import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { ContactForm } from "@/components/ContactForm";
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

          <RevealOnScroll delay={0.1} className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
            <div className="flex gap-4">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("studioLabel")}</span>
              <span>{t("studioValue")}</span>
            </div>
            <div className="flex gap-4">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("emailLabel")}</span>
              <a href="mailto:hello@castler.uz" className="hover:text-gold">
                hello@castler.uz
              </a>
            </div>
            <div className="flex gap-4">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("phoneLabel")}</span>
              <a href="tel:+998000000000" className="hover:text-gold">
                +998 00 000 00 00
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-14">
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

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Careers");
  return { title: `${t("eyebrow")} — Castler` };
}

export default async function CareersPage() {
  const t = await getTranslations("Careers");
  const roles = t.raw("roles") as { title: string; body: string }[];

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:px-10 sm:pt-28">
      <RevealOnScroll>
        <p className="label-mono text-ink-soft">{t("eyebrow")}</p>
        <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
          <AnimatedText text={t("heading")} />
        </h1>
        <p className="mt-5 max-w-lg text-ink-soft">{t("body")}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-16 border-t border-line pt-10">
        <p className="label-mono text-ink-soft">{t("rolesHeading")}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <div key={role.title} className="rounded-2xl border border-line bg-paper-2 p-6">
              <h3 className="font-display text-xl">{role.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{role.body}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15} className="mt-16 border-t border-line pt-10">
        <p className="label-mono text-ink-soft">{t("applyEyebrow")}</p>
        <h2 className="font-display mt-2 text-3xl sm:text-4xl">{t("applyHeading")}</h2>
        <p className="mt-4 max-w-lg text-ink-soft">{t("applyBody")}</p>
        <a
          href="mailto:hello@castler.uz?subject=Job%20application"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide text-paper transition-all duration-200 hover:scale-[1.03] hover:opacity-85 active:scale-[0.97]"
        >
          <MailIcon className="h-4 w-4" />
          {t("applyCta")}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </RevealOnScroll>
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { RoleNotifyForm } from "@/components/RoleNotifyForm";
import { openRoles, TELEGRAM_APPLY_URL } from "@/content/roles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Careers");
  return { title: `${t("eyebrow")} — Castler` };
}

export default async function CareersPage() {
  const t = await getTranslations("Careers");
  const tHome = await getTranslations("Home");
  const tWork = await getTranslations("Work");
  const tContact = await getTranslations("Contact");

  return (
    <div className="pt-24 sm:pt-28">
      {/* Hero */}
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <RevealOnScroll>
          <p className="label-mono text-ink-soft">{t("eyebrow")}</p>
          <h1 className="font-display mt-4 text-4xl leading-tight sm:text-6xl">
            <AnimatedText text={t("heading")} />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft">{t("body")}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#open-roles"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide text-paper transition-all duration-200 hover:scale-[1.03] hover:opacity-85 active:scale-[0.97]"
          >
            {t("viewOpenRolesCta")}
          </a>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-paper-2 active:scale-[0.97]"
          >
            {t("aboutUsCta")}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.15} className="mx-auto mt-14 max-w-5xl px-6 sm:px-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <PlaceholderImage seed="careers-hero" className="h-full w-full" />
        </div>
      </RevealOnScroll>

      {/* Open Roles */}
      <div id="open-roles" className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-6 sm:mt-32 sm:px-10">
        <RevealOnScroll>
          <h2 className="font-display text-4xl sm:text-5xl">{t("openRolesHeading")}</h2>
          <p className="mt-5 max-w-2xl text-ink-soft">{t("openRolesIntro1")}</p>
          <p className="mt-3 max-w-2xl text-ink-soft">{t("openRolesIntro2")}</p>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <RevealOnScroll delay={0.05}>
            <h3 className="font-display text-2xl">{t("officeHeading")}</h3>
            <div className="mt-4 border-t border-line">
              {openRoles.map((role, i) => (
                <RevealOnScroll
                  key={role.slug}
                  delay={Math.min(i * 0.04, 0.2)}
                  className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="font-display text-lg">{role.title}</p>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/careers/${role.slug}`}
                      className="pill flex items-center gap-1.5 bg-paper-2 text-ink transition-colors hover:bg-line"
                    >
                      {t("learnMoreCta")}
                    </Link>
                    <a
                      href={TELEGRAM_APPLY_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="pill flex items-center gap-1.5 bg-ink text-paper transition-opacity hover:opacity-85"
                    >
                      {t("applyCta")}
                    </a>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            <p className="mt-6 max-w-xl text-sm italic text-ink-soft/70">{t("tashkentNote")}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <RoleNotifyForm
              heading={t("notifyHeading")}
              placeholder={t("notifyPlaceholder")}
              submitLabel={t("notifySubmit")}
              consent={t("notifyConsent")}
            />
          </RevealOnScroll>
        </div>
      </div>

      {/* Teasers */}
      <div className="mx-auto mt-24 max-w-6xl px-6 pb-24 sm:mt-32 sm:px-10 sm:pb-32">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          <RevealOnScroll>
            <Link href="/about" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <PlaceholderImage
                  seed="careers-team"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="font-display mt-4 text-xl">{tHome("teamHeading")}</h3>
              <p className="mt-2 text-sm text-ink-soft">{tHome("teamBody")}</p>
              <p className="label-mono mt-4 inline-flex items-center gap-1.5 text-ink transition-all duration-200 group-hover:translate-x-1">
                {t("teaserTeamCta")}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </p>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <Link href="/work" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <PlaceholderImage
                  seed="careers-work"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="font-display mt-4 text-xl">{tWork("title")}</h3>
              <p className="mt-2 text-sm text-ink-soft">{tWork("body")}</p>
              <p className="label-mono mt-4 inline-flex items-center gap-1.5 text-ink transition-all duration-200 group-hover:translate-x-1">
                {t("teaserWorkCta")}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </p>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <Link href="/contact" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <PlaceholderImage
                  seed="careers-contact"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="font-display mt-4 text-xl">{tContact("title")}</h3>
              <p className="mt-2 text-sm text-ink-soft">{tContact("body")}</p>
              <p className="label-mono mt-4 inline-flex items-center gap-1.5 text-ink transition-all duration-200 group-hover:translate-x-1">
                {t("teaserContactCta")}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </p>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}

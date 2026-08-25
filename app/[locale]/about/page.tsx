import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AboutHero } from "@/components/AboutHero";
import { ArrowRightIcon } from "@/components/icons";
import { AwardsSection } from "@/components/AwardsSection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { awards } from "@/content/awards";
import { getProject } from "@/content/projects";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return { title: `${t("eyebrow")} — Castler` };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const tAwards = await getTranslations("Awards");
  const resolvedAwards = awards.map((entry) => ({
    award: tAwards(entry.id),
    project: getProject(entry.projectSlug)?.title ?? entry.projectSlug,
    year: entry.year,
  }));

  return (
    <div>
      <AboutHero heading={t("heroHeading")} cta={t("heroCta")} />

      <AwardsSection
        eyebrow={t("awardsEyebrow")}
        heading={t("awardsHeading")}
        notice={t("awardsNotice")}
        awards={resolvedAwards}
      />

      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10 sm:py-28">
          <RevealOnScroll>
            <h2 className="font-display text-3xl sm:text-4xl">{t("joinTitle")}</h2>
            <p className="mt-4 max-w-md text-paper/70">{t("joinBody")}</p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-paper hover:text-ink active:scale-[0.97]"
            >
              {t("joinCta")}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

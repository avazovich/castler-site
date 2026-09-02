import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AboutHero } from "@/components/AboutHero";
import { AboutNarrative } from "@/components/AboutNarrative";
import { ArrowRightIcon } from "@/components/icons";
import { AwardsSection } from "@/components/AwardsSection";
import { FAQSection } from "@/components/FAQSection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { awards } from "@/content/awards";
import { getProject } from "@/content/projects";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("about.title"), description: t("about.description") };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const tAwards = await getTranslations("Awards");
  const tNarrative = await getTranslations("AboutNarrative");
  const tFaq = await getTranslations("FAQ");
  const resolvedAwards = awards.map((entry) => ({
    award: tAwards(entry.id),
    project: getProject(entry.projectSlug)?.title ?? entry.projectSlug,
    year: entry.year,
  }));

  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <AboutHero heading={t("heroHeading")} cta={t("heroCta")} />

      <AboutNarrative
        heading={tNarrative("heading")}
        intro={tNarrative.raw("intro")}
        sections={tNarrative.raw("sections")}
      />

      <AwardsSection
        eyebrow={t("awardsEyebrow")}
        heading={t("awardsHeading")}
        notice={t("awardsNotice")}
        awards={resolvedAwards}
      />

      <FAQSection heading={tFaq("heading")} items={faqItems} />

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

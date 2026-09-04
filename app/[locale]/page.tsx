import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { OfficeTeaser } from "@/components/OfficeTeaser";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectImage } from "@/components/ProjectImage";
import { AnimatedText } from "@/components/AnimatedText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionSnapScroll } from "@/components/SectionSnapScroll";
import { WorkSpansAccordion } from "@/components/WorkSpansAccordion";
import { ArrowRightIcon } from "@/components/icons";
import { categories, heroProjects, photographedProjects } from "@/content/projects";
import { getCardShapes, type CardShape } from "@/lib/projectCardShape";
import { FOUNDER_NAME, FOUNDING_YEAR, INSTAGRAM_URL, SITE_URL } from "@/lib/siteConfig";

/**
 * Tile span for one featured-grid cell, chosen from the photo's own shape
 * rather than a fixed pattern: portrait/square photos take a tall 1x2 cell,
 * landscape photos a short 1x1 one, and the first project — the featured
 * slot — widens to 2x2 when its photo is landscape. With `auto-rows` at
 * 240px a 1x2 cell lands at ~0.81 and a 1x1 at ~1.65, which is within a few
 * percent of the two shapes the photography actually comes in, so
 * `object-cover` trims edges instead of cutting the subject apart.
 * `grid-flow-dense` (below) backfills whatever gaps the mix leaves.
 * Below `lg` the grid collapses to a 2-col (md) / 1-col (mobile) stack.
 */
function tileSpan(shape: CardShape, isFeatured: boolean): string {
  if (shape === "tall") return "lg:row-span-2";
  return isFeatured ? "lg:col-span-2 lg:row-span-2" : "";
}

/**
 * Below `lg` the mosaic gives way to a plain 1–2 column stack, where each card
 * is sized by its own photo's proportions instead of a shared row height —
 * that fits exactly at any width, which fixed rows can't.
 */
function cardAspect(shape: CardShape): string {
  return shape === "tall" ? "aspect-[4/5] lg:aspect-auto" : "aspect-[4/3] lg:aspect-auto";
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: { canonical: SITE_URL },
  };
}

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tCategories = await getTranslations("Categories");
  const cardShapes = getCardShapes(photographedProjects);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Castler",
    alternateName: "Castler Group",
    description:
      "Architecture and design company based in Namangan, Uzbekistan, founded in 2013, focused on commercial projects. Approximately 200,000 m² realised across residential and commercial work, including Afsona Mall, a 20,000 m² shopping centre. Full-service design from concept to construction supervision.",
    foundingDate: FOUNDING_YEAR,
    founder: { "@type": "Person", name: FOUNDER_NAME },
    address: { "@type": "PostalAddress", addressLocality: "Namangan", addressCountry: "UZ" },
    areaServed: "Uzbekistan",
    url: SITE_URL,
    sameAs: [INSTAGRAM_URL],
    priceRange: "$$$",
    serviceType: ["Commercial Architecture", "Interior Design", "Architectural Design"],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "CreativeWork",
        name: "Afsona Mall",
        description:
          "A 20,000 m² shopping centre designed by Castler, selected in competition with an international contractor, currently in construction supervision.",
      },
    },
  };

  return (
    <>
      <SectionSnapScroll />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero: swipable carousel. Full-bleed on mobile — screen space is
          scarce there, and a rounded, gutter-inset card reads small and
          decorative rather than as the dominant hero image it should be.
          From sm up there's room to spare, so it insets to the same gutter
          as the mosaic below. */}
      <section data-snap className="mx-auto max-w-[1600px] pt-20 sm:px-6">
        <HeroCarousel slides={heroProjects} />
      </section>

      {/* Tagline + stats strip */}
      <section data-snap className="mx-auto max-w-[1600px] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <RevealOnScroll className="text-center">
          <p className="font-display text-3xl sm:text-4xl">{t("tagline")}</p>
        </RevealOnScroll>
        <RevealOnScroll
          delay={0.05}
          className="mt-10 grid grid-cols-1 gap-y-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-4"
        >
          <div className="text-center">
            <p className="font-display text-3xl sm:text-4xl">{t("statYears")}</p>
            <p className="label-mono mt-2 text-ink-soft">{t("statYearsLabel")}</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl sm:text-4xl">{t("statArea")}</p>
            <p className="label-mono mt-2 text-ink-soft">{t("statAreaLabel")}</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl sm:text-4xl">{t("statLargest")}</p>
            <p className="label-mono mt-2 text-ink-soft">{t("statLargestLabel")}</p>
          </div>
        </RevealOnScroll>
      </section>

      {/* Featured works — hand-placed 3x7 mosaic. data-snap-free: this section
          is much taller than one screen, so it's exempted from wheel-jack
          snapping while the viewport sits inside it (see SectionSnapScroll) —
          only its top edge is still a snap target when approached from above. */}
      <section
        data-snap
        data-snap-free
        className="mx-auto max-w-[1600px] px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32"
      >
        <RevealOnScroll className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label-mono text-ink-soft">{t("featuredEyebrow")}</p>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl">{t("featuredTitle")}</h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-ink hover:text-paper active:scale-[0.97]"
          >
            {t("viewAll")}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[240px] lg:grid-flow-row-dense xl:auto-rows-[280px]">
          {photographedProjects.map((project, i) => (
            <RevealOnScroll
              key={project.slug}
              delay={Math.min(i * 0.04, 0.3)}
              className={tileSpan(cardShapes[i], i === 0)}
            >
              <ProjectCard
                project={project}
                categoryLabel={tCategories(project.category)}
                aspectClassName={cardAspect(cardShapes[i])}
                className="h-full"
                imageOverride={project.coverImage}
              />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-ink hover:text-paper active:scale-[0.97]"
          >
            {t("viewAll")}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>
      </section>

      {/* Founder statement */}
      <section data-snap className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-[220px_1fr]">
          <RevealOnScroll className="flex flex-row items-center gap-3 md:flex-col md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-2">
              <Image src="/brand/mark-ink.png" alt="" width={26} height={26} className="h-6 w-auto" />
            </div>
            <div>
              <p className="font-medium text-ink">{t("statementName")}</p>
              <p className="label-mono text-ink-soft">{t("statementByline")}</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="font-display text-3xl leading-snug sm:text-4xl lg:text-5xl">
              <AnimatedText text={t("statementBody")} />
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Our work spans — accordion fold on hover */}
      <section data-snap className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <RevealOnScroll>
          <p className="label-mono text-ink-soft">{t("spansEyebrow")}</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="mt-8">
          <WorkSpansAccordion categoryList={categories} />
        </RevealOnScroll>
      </section>

      {/* Intro teaser — heading + copy + CTA stacked left, photo right */}
      <OfficeTeaser
        snap
        title={t("officeTeaserTitle")}
        body={t("officeTeaserBody")}
        cta={t("officeTeaserCta")}
      />

      {/* Team */}
      <section data-snap className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
          <RevealOnScroll className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="font-display text-3xl sm:text-4xl">{t("teamHeading")}</h2>
            <div className="flex flex-col items-start gap-5 sm:max-w-xs">
              <p className="text-ink-soft">{t("teamBody")}</p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-ink hover:text-paper active:scale-[0.97]"
              >
                {t("teamCta")}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="relative mt-12 aspect-[21/9] overflow-hidden">
            <ProjectImage
              slug="team-photo"
              title={t("teamHeading")}
              image="/projects/mustang-showroom-hero.jpg"
              className="h-full w-full"
            />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

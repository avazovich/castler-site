import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { OfficeTeaser } from "@/components/OfficeTeaser";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedText } from "@/components/AnimatedText";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionSnapScroll } from "@/components/SectionSnapScroll";
import { WorkSpansAccordion } from "@/components/WorkSpansAccordion";
import { ArrowRightIcon } from "@/components/icons";
import { categories, heroProjects, projects } from "@/content/projects";

/**
 * Explicit tile placement for the featured mosaic, index-aligned to `projects`.
 * The layout is a deliberate 3-column x 7-row tessellation (21 cells, no holes),
 * so each tile is positioned by hand rather than left to auto-flow — dense
 * auto-placement can't reproduce this arrangement reliably.
 * Below `lg` the grid collapses to a simple 2-col (md) / 1-col (mobile) stack.
 */
const GRID_POSITIONS = [
  // Index 0 is the featured (first) project — a wide 2x2 box suits a
  // landscape hero photo far better than a narrow tall one.
  "lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2",
  "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "lg:col-start-1 lg:col-span-2 lg:row-start-3 lg:row-span-2",
  "lg:col-start-3 lg:row-start-3",
  "lg:col-start-3 lg:row-start-4 lg:row-span-2",
  "lg:col-start-1 lg:row-start-5",
  "lg:col-start-2 lg:row-start-5 lg:row-span-2",
  "lg:col-start-1 lg:row-start-6 lg:row-span-2",
  "lg:col-start-3 lg:row-start-6",
  "lg:col-start-2 lg:row-start-[7]",
  "lg:col-start-3 lg:row-start-[7]",
  "lg:col-start-1 lg:col-span-2 lg:row-start-[8] lg:row-span-2",
];

export default async function HomePage() {
  const t = await getTranslations("Home");
  const tCategories = await getTranslations("Categories");

  return (
    <>
      <SectionSnapScroll />

      {/* Hero: swipable carousel, inset to the same gutter as the mosaic below */}
      <section data-snap className="mx-auto max-w-[1600px] px-4 pt-20 sm:px-6">
        <HeroCarousel slides={heroProjects} />
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

        <div className="mt-12 grid grid-cols-1 gap-2 md:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-3 lg:auto-rows-[300px]">
          {projects.map((project, i) => (
            <RevealOnScroll
              key={project.slug}
              delay={Math.min(i * 0.04, 0.3)}
              className={GRID_POSITIONS[i]}
            >
              <ProjectCard
                project={project}
                categoryLabel={tCategories(project.category)}
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
            <PlaceholderImage seed="team-photo" className="h-full w-full" />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

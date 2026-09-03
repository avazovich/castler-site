import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { OfficeTeaser } from "@/components/OfficeTeaser";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { WorkGallery } from "@/components/WorkGallery";
import { categories, photographedProjects, type ProjectCategory } from "@/content/projects";
import { getCardShapes } from "@/lib/projectCardShape";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: t("work.title"), description: t("work.description") };
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const t = await getTranslations("Work");
  const tHome = await getTranslations("Home");
  const tCategories = await getTranslations("Categories");
  const { category } = await searchParams;
  const initialCategory = categories.includes(category as ProjectCategory)
    ? (category as ProjectCategory)
    : undefined;

  const visibleCategories = categories.filter((c) =>
    photographedProjects.some((p) => p.category === c),
  );
  const categoryLabels = Object.fromEntries(
    categories.map((c) => [c, tCategories(c)]),
  ) as Record<ProjectCategory, string>;

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:px-10 sm:pt-28">
        <RevealOnScroll>
          <p className="label-mono text-ink-soft">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">
            <AnimatedText text={t("title")} />
          </h1>
          <p className="mt-4 max-w-lg text-ink-soft">{t("body")}</p>
        </RevealOnScroll>

        <div className="mt-10">
          <WorkGallery
            projects={photographedProjects}
            shapes={getCardShapes(photographedProjects, "hero")}
            categoryList={visibleCategories}
            initialCategory={initialCategory}
            allLabel={t("filterAll")}
            categoryLabels={categoryLabels}
          />
        </div>
      </div>

      <OfficeTeaser
        title={tHome("officeTeaserTitle")}
        body={tHome("officeTeaserBody")}
        cta={tHome("officeTeaserCta")}
      />
    </>
  );
}

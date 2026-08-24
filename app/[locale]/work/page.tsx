import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { BlogSection } from "@/components/BlogSection";
import { OfficeTeaser } from "@/components/OfficeTeaser";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { WorkGallery } from "@/components/WorkGallery";
import { blogPosts } from "@/content/blog";
import { categories, projects, type ProjectCategory } from "@/content/projects";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Work");
  return { title: `${t("title")} — Castler` };
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const t = await getTranslations("Work");
  const tHome = await getTranslations("Home");
  const tBlog = await getTranslations("Blog");
  const tCategories = await getTranslations("Categories");
  const { category } = await searchParams;
  const initialCategory = categories.includes(category as ProjectCategory)
    ? (category as ProjectCategory)
    : undefined;

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
          <p className="mt-2 max-w-lg text-sm italic text-ink-soft/70">{t("placeholderNotice")}</p>
        </RevealOnScroll>

        <div className="mt-10">
          <WorkGallery
            projects={projects}
            categoryList={categories}
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

      <BlogSection
        eyebrow={tBlog("eyebrow")}
        heading={tBlog("heading")}
        notice={tBlog("notice")}
        posts={blogPosts}
      />
    </>
  );
}

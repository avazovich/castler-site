import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnimatedText } from "@/components/AnimatedText";
import { ProjectCard } from "@/components/ProjectCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { categories, photographedProjects, type ProjectCategory } from "@/content/projects";
import { getCardShape } from "@/lib/projectCardShape";

function isCategory(value: string): value is ProjectCategory {
  return (categories as string[]).includes(value);
}

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return { title: "Castler" };
  const tCategories = await getTranslations("Categories");
  return { title: `${tCategories(category)} — Castler` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const t = await getTranslations("Work");
  const tCategories = await getTranslations("Categories");
  const filtered = photographedProjects.filter((p) => p.category === category);
  const visibleCategories = categories.filter((c) =>
    photographedProjects.some((p) => p.category === c),
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:px-10 sm:pt-28">
      <RevealOnScroll>
        <div className="flex flex-wrap gap-2">
          <Link href="/work" className="pill bg-paper-2 text-ink transition-colors hover:bg-line">
            {t("filterAll")}
          </Link>
          {visibleCategories.map((c) => (
            <Link
              key={c}
              href={`/work/category/${c}`}
              className={`pill ${c === category ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-line"}`}
            >
              {tCategories(c)}
            </Link>
          ))}
        </div>

        <p className="label-mono mt-10 text-ink-soft">{t("eyebrow")}</p>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl">
          <AnimatedText text={tCategories(category)} />
        </h1>
      </RevealOnScroll>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={Math.min(i * 0.06, 0.3)}>
            <ProjectCard
              project={project}
              categoryLabel={tCategories(project.category)}
              aspectClassName={
                getCardShape(project, "hero") === "tall" ? "aspect-[4/5]" : "aspect-[4/3]"
              }
            />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

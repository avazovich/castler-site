import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnimatedText } from "@/components/AnimatedText";
import { ArrowRightIcon } from "@/components/icons";
import { ImageSlider, type GalleryItem } from "@/components/ImageSlider";
import { ParallaxImage } from "@/components/ParallaxImage";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getProject, photographedProjects, projects } from "@/content/projects";
import { getImageDimensions } from "@/lib/imageDimensions";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} — Castler` : "Castler" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("Project");
  const tCategories = await getTranslations("Categories");

  const currentIndex = photographedProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex === -1
      ? photographedProjects[0]
      : photographedProjects[(currentIndex + 1) % photographedProjects.length];

  const galleryImages: GalleryItem[] = project.gallery
    ? project.gallery.map((src, i) => ({ key: `g-${i}`, src, ...getImageDimensions(src) }))
    : Array.from({ length: Math.max(project.galleryCount - 1, 0) }).map((_, i) => ({
        key: `g-${i}`,
        seed: `${project.slug}-${i}`,
      }));

  return (
    <div className="pt-20 lg:pt-24">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[420px_1fr]">
        {/* Left panel */}
        <div className="px-6 py-10 sm:px-10 lg:sticky lg:top-24 lg:h-fit lg:py-16">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            {t("back")}
          </Link>

          <RevealOnScroll className="mt-6">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">
              <AnimatedText text={project.title} />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05} className="mt-6 space-y-2 text-sm">
            <div className="flex gap-3">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("location")}</span>
              <span>{project.location}</span>
            </div>
            <div className="flex gap-3">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("category")}</span>
              <span>{tCategories(project.category)}</span>
            </div>
            <div className="flex gap-3">
              <span className="label-mono w-20 shrink-0 text-ink-soft">{t("year")}</span>
              <span>{project.year}</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="mt-8 space-y-4 text-ink-soft">
            {project.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-10 border-t border-line pt-6">
            <p className="label-mono text-ink-soft">{t("nextProject")}</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group mt-2 inline-flex items-center gap-2 font-display text-2xl transition-colors hover:text-gold"
            >
              {nextProject.title}
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealOnScroll>
        </div>

        {/* Right: hero + gallery */}
        <div>
          <ParallaxImage
            slug={project.slug}
            title={project.title}
            image={project.image}
            className="aspect-[4/3] sm:aspect-[16/10]"
          />
          {galleryImages.length > 0 && (
            <RevealOnScroll>
              <ImageSlider
                images={galleryImages}
                project={project}
                className="mt-3 h-[50vh] bg-paper-2 sm:mt-4 sm:h-[60vh]"
                imageHeightClass="h-[42vh] sm:h-[52vh]"
              />
            </RevealOnScroll>
          )}
        </div>
      </div>
    </div>
  );
}

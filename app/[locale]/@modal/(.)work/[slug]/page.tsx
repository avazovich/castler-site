import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProjectModal } from "@/components/ProjectModal";
import { getProject } from "@/content/projects";
import { buildGalleryItems } from "@/lib/projectImages";
import { getLocalizedProjectContent } from "@/lib/projectContent";

export default async function InterceptedProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("Project");
  const tCategories = await getTranslations("Categories");
  const { description } = await getLocalizedProjectContent(project);

  return (
    <ProjectModal
      key={project.slug}
      project={project}
      description={description}
      images={buildGalleryItems(project)}
      categoryLabel={tCategories(project.category)}
      labels={{
        location: t("location"),
        category: t("category"),
        year: t("year"),
        gallery: t("gallery"),
        readMore: t("readMore"),
        close: t("close"),
      }}
    />
  );
}

import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@/content/projects";

type LocalizedProjectContent = { summary: string; description: string[] };

/**
 * Resolves a project's summary/description in the current request locale,
 * falling back to the English copy in content/projects.ts when no
 * translation exists yet for that project (e.g. a still-unphotographed one).
 */
export async function getLocalizedProjectContent(project: Project): Promise<LocalizedProjectContent> {
  const locale = await getLocale();
  const fallback: LocalizedProjectContent = { summary: project.summary, description: project.description };
  if (locale === "en") return fallback;

  const t = await getTranslations();
  try {
    const raw = t.raw(`Projects.${project.slug}`) as LocalizedProjectContent | undefined;
    if (raw?.summary && raw?.description) return raw;
  } catch {
    // No translation yet for this project — fall back to English.
  }
  return fallback;
}

import { getLocale, getMessages } from "next-intl/server";
import type { Project } from "@/content/projects";

type LocalizedProjectContent = { summary: string; description: string[] };

/**
 * Resolves a project's summary/description in the current request locale,
 * falling back to the English copy in content/projects.ts when no
 * translation exists yet for that project (e.g. a still-unphotographed one).
 * Reads the raw messages object directly (not t.raw) so a missing entry is
 * a plain undefined instead of triggering next-intl's MISSING_MESSAGE error.
 */
export async function getLocalizedProjectContent(project: Project): Promise<LocalizedProjectContent> {
  const locale = await getLocale();
  const fallback: LocalizedProjectContent = { summary: project.summary, description: project.description };
  if (locale === "en") return fallback;

  const messages = await getMessages();
  const projects = messages.Projects as Record<string, LocalizedProjectContent> | undefined;
  const raw = projects?.[project.slug];
  if (raw?.summary && raw?.description) return raw;
  return fallback;
}

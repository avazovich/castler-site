import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getArticles } from "@/content/articles";
import { categories, getPhotographedProjects } from "@/content/projects";
import { openRoles } from "@/content/roles";
import { SITE_URL } from "@/lib/siteConfig";
import { client } from "@/sanity/lib/client";

const STATIC_PATHS = ["", "/work", "/about", "/contact", "/news", "/careers"];

/** Real per-document edit timestamps, so the sitemap tells Google which
 *  pages actually changed instead of stamping every URL with "now" on every
 *  build — that blanket timestamp gave Google no way to prioritize
 *  re-crawling the pages an editor just touched. */
async function getLastModifiedBySlug(type: "project" | "article"): Promise<Record<string, string>> {
  const rows = await client.fetch<{ slug: string; updatedAt: string }[] | null>(
    `*[_type == $type]{ "slug": slug.current, "updatedAt": _updatedAt }`,
    { type },
  );
  return Object.fromEntries((rows ?? []).map((r) => [r.slug, r.updatedAt]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [photographedProjects, articles, projectDates, articleDates] = await Promise.all([
    getPhotographedProjects(),
    getArticles(),
    getLastModifiedBySlug("project"),
    getLastModifiedBySlug("article"),
  ]);
  const visibleCategories = categories.filter((c) => photographedProjects.some((p) => p.category === c));
  const now = new Date();

  const entries = [
    ...STATIC_PATHS.map((path) => ({ path, lastModified: now })),
    ...photographedProjects.map((p) => ({
      path: `/work/${p.slug}`,
      lastModified: projectDates[p.slug] ? new Date(projectDates[p.slug]) : now,
    })),
    ...visibleCategories.map((c) => ({ path: `/work/category/${c}`, lastModified: now })),
    ...openRoles.map((r) => ({ path: `/careers/${r.slug}`, lastModified: now })),
    ...articles.map((a) => ({
      path: `/news/${a.slug}`,
      lastModified: articleDates[a.slug] ? new Date(articleDates[a.slug]) : now,
    })),
  ];

  return entries.flatMap(({ path, lastModified }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}

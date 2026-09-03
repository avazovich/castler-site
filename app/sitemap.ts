import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { articles } from "@/content/articles";
import { categories, photographedProjects } from "@/content/projects";
import { openRoles } from "@/content/roles";
import { SITE_URL } from "@/lib/siteConfig";

const STATIC_PATHS = ["", "/work", "/about", "/about/story", "/contact", "/news", "/careers"];

export default function sitemap(): MetadataRoute.Sitemap {
  const visibleCategories = categories.filter((c) => photographedProjects.some((p) => p.category === c));

  const paths = [
    ...STATIC_PATHS,
    ...photographedProjects.map((p) => `/work/${p.slug}`),
    ...visibleCategories.map((c) => `/work/category/${c}`),
    ...openRoles.map((r) => `/careers/${r.slug}`),
    ...articles.map((a) => `/news/${a.slug}`),
  ];

  const lastModified = new Date();

  return paths.flatMap((path) =>
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

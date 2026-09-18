import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";

export type ProjectCategory = "architecture" | "interior" | "urban" | "concept";

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  description: string[];
  galleryCount: number;
  /** Real photo URL (Sanity CDN). Falls back to the abstract PlaceholderImage
   *  gradient when unset. */
  image?: string;
  imageDimensions?: { width: number; height: number };
  /** Additional real photos beyond `image`, shown in the gallery/slider. */
  gallery?: { src: string; width: number; height: number }[];
  /** Alternate photo shown on the Home featured grid, when it should differ
   *  from `image`. Falls back to `image` when unset. */
  coverImage?: string;
  coverImageDimensions?: { width: number; height: number };
  /** CSS object-position, when a plain center crop cuts off the part of the
   *  photo that matters — only ever set on the hero-carousel copy of a
   *  project, via Home settings' per-slide override in Sanity. */
  objectPosition?: string;
}

type Localized<T> = { en: T; uz?: T; ru?: T };

function resolve<T>(field: Localized<T> | undefined, locale: Locale, fallback: T): T {
  if (!field) return fallback;
  return (locale !== "en" && field[locale]) || field.en;
}

const PROJECT_PROJECTION = /* groq */ `{
  "slug": slug.current,
  title,
  location,
  year,
  category,
  summary,
  description,
  galleryCount,
  "image": image.asset->url,
  "imageDimensions": image.asset->metadata.dimensions,
  "gallery": gallery[]{ "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
  "coverImage": coverImage.asset->url,
  "coverImageDimensions": coverImage.asset->metadata.dimensions,
}`;

interface RawProject {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  summary: Localized<string>;
  description: Localized<string[]>;
  galleryCount: number;
  image?: string;
  imageDimensions?: { width: number; height: number };
  gallery?: { src: string; width: number; height: number }[];
  coverImage?: string;
  coverImageDimensions?: { width: number; height: number };
}

async function toProject(raw: RawProject, locale: Locale, objectPosition?: string): Promise<Project> {
  return {
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    year: raw.year,
    category: raw.category,
    summary: resolve(raw.summary, locale, raw.summary?.en ?? ""),
    description: resolve(raw.description, locale, raw.description?.en ?? []),
    galleryCount: raw.galleryCount,
    image: raw.image,
    imageDimensions: raw.imageDimensions,
    gallery: raw.gallery,
    coverImage: raw.coverImage,
    coverImageDimensions: raw.coverImageDimensions,
    objectPosition,
  };
}

/** Every project slug — locale-independent (slugs don't vary by language),
 *  for generateStaticParams, which runs with no request/locale context at
 *  all and must never call locale-resolving functions like getLocale(). */
export async function getProjectSlugs(): Promise<string[]> {
  const raw = await client.fetch<string[] | null>(`*[_type == "project"].slug.current`);
  return raw ?? [];
}

/** Every project, in the current request's locale. */
export async function getProjects(): Promise<Project[]> {
  const locale = (await getLocale()) as Locale;
  const raw = await client.fetch<RawProject[] | null>(`*[_type == "project"]${PROJECT_PROJECTION}`);
  return Promise.all((raw ?? []).map((p) => toProject(p, locale)));
}

/** A single project by slug, in the current request's locale. */
export async function getProject(slug: string): Promise<Project | undefined> {
  const locale = (await getLocale()) as Locale;
  const raw = await client.fetch<RawProject | null>(
    `*[_type == "project" && slug.current == $slug][0]${PROJECT_PROJECTION}`,
    { slug },
  );
  return raw ? toProject(raw, locale) : undefined;
}

export const categories: ProjectCategory[] = ["architecture", "interior", "urban", "concept"];

interface RawHeroSlide {
  project: RawProject;
  imageOverride?: string;
  objectPositionOverride?: string;
}

/** Home hero carousel — curated in Sanity (Home page settings), in display order. */
export async function getHeroProjects(): Promise<Project[]> {
  const locale = (await getLocale()) as Locale;
  const raw = await client.fetch<RawHeroSlide[] | null>(
    `*[_type == "homeSettings"][0].heroProjects[]{
      "project": project->${PROJECT_PROJECTION},
      "imageOverride": imageOverride.asset->url,
      objectPositionOverride,
    }`,
  );
  return Promise.all(
    (raw ?? [])
      .filter((slide) => slide.project)
      .map(async (slide) => {
        const project = await toProject(slide.project, locale, slide.objectPositionOverride);
        return slide.imageOverride ? { ...project, image: slide.imageOverride } : project;
      }),
  );
}

/** Curated selection for the Home page's featured mosaic grid, in order —
 *  distinct from `getPhotographedProjects`, which is every real project
 *  (used on the /work listing, where nothing is curated). */
export async function getFeaturedProjects(): Promise<Project[]> {
  const locale = (await getLocale()) as Locale;
  const raw = await client.fetch<RawProject[] | null>(
    `*[_type == "homeSettings"][0].featuredProjects[]->${PROJECT_PROJECTION}`,
  );
  return Promise.all((raw ?? []).map((p) => toProject(p, locale)));
}

/** Projects with real photography — the only ones shown on public listings,
 *  so a still-unphotographed project never renders as an empty placeholder
 *  card. Unlisted projects keep their detail route for when photos arrive. */
export async function getPhotographedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.image);
}

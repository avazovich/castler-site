import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";

export type ArticleCategory = "projects" | "philosophy" | "company";

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string; linkText?: string; linkSlug?: string }
  | { type: "quote"; text: string; attribution?: string };

export interface Article {
  slug: string;
  category: ArticleCategory;
  /** ISO date, used for both display and the Article schema's datePublished. */
  date: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  body: ArticleBlock[];
  /** Slugs of 1-2 other articles linked at the end of this one. */
  related: string[];
}

type Localized<T> = { en: T; uz?: T; ru?: T };

function resolve<T>(field: Localized<T> | undefined, locale: Locale, fallback: T): T {
  if (!field) return fallback;
  return (locale !== "en" && field[locale]) || field.en;
}

interface RawBlock {
  _type: "articleHeading" | "articleParagraph" | "articleQuote";
  text: string;
  linkText?: string;
  linkSlug?: string;
  attribution?: string;
}

function toBlocks(raw: RawBlock[] | undefined): ArticleBlock[] {
  if (!raw) return [];
  return raw.map((b) => {
    if (b._type === "articleHeading") return { type: "heading", text: b.text };
    if (b._type === "articleQuote") return { type: "quote", text: b.text, attribution: b.attribution };
    return { type: "paragraph", text: b.text, linkText: b.linkText, linkSlug: b.linkSlug };
  });
}

const BODY_BLOCK_FIELDS = /* groq */ `_type, text, linkText, "linkSlug": linkSlug->slug.current, attribution`;

const ARTICLE_PROJECTION = /* groq */ `{
  "slug": slug.current,
  category,
  date,
  title,
  excerpt,
  metaTitle,
  metaDescription,
  "body": body{ "en": en[]{${BODY_BLOCK_FIELDS}}, "uz": uz[]{${BODY_BLOCK_FIELDS}}, "ru": ru[]{${BODY_BLOCK_FIELDS}} },
  "related": related[]->slug.current,
}`;

interface RawArticle {
  slug: string;
  category: ArticleCategory;
  date: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  body: Localized<RawBlock[]>;
  related: string[];
}

function toArticle(raw: RawArticle, locale: Locale): Article {
  return {
    slug: raw.slug,
    category: raw.category,
    date: raw.date,
    title: resolve(raw.title, locale, raw.title?.en ?? ""),
    excerpt: resolve(raw.excerpt, locale, raw.excerpt?.en ?? ""),
    metaTitle: resolve(raw.metaTitle, locale, raw.metaTitle?.en ?? ""),
    metaDescription: resolve(raw.metaDescription, locale, raw.metaDescription?.en ?? ""),
    body: toBlocks(resolve(raw.body, locale, raw.body?.en ?? [])),
    related: raw.related ?? [],
  };
}

/** Every article slug — locale-independent, for generateStaticParams (which
 *  runs with no request/locale context and must never call getLocale()). */
export async function getArticleSlugs(): Promise<string[]> {
  const raw = await client.fetch<string[] | null>(`*[_type == "article"].slug.current`);
  return raw ?? [];
}

/** Every article, newest first, in the current request's locale. */
export async function getArticles(): Promise<Article[]> {
  const locale = (await getLocale()) as Locale;
  const raw = await client.fetch<RawArticle[] | null>(
    `*[_type == "article"] | order(date desc)${ARTICLE_PROJECTION}`,
  );
  return (raw ?? []).map((a) => toArticle(a, locale));
}

/** A single article by slug, in the current request's locale. */
export async function getArticle(slug: string): Promise<Article | undefined> {
  const locale = (await getLocale()) as Locale;
  const raw = await client.fetch<RawArticle | null>(
    `*[_type == "article" && slug.current == $slug][0]${ARTICLE_PROJECTION}`,
    { slug },
  );
  return raw ? toArticle(raw, locale) : undefined;
}

export const articleCategories: ArticleCategory[] = ["projects", "philosophy", "company"];

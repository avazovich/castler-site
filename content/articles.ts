import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";

export type ArticleCategory = "projects" | "philosophy" | "company";

export type ArticleBlock =
  | { type: "heading"; text: string }
  | {
      type: "paragraph";
      text: string;
      linkText?: string;
      linkSlug?: string;
      /** Words in `text` that link to a page on this site ("/about") or another site ("https://…"). */
      links?: { text: string; href: string }[];
    }
  | { type: "list"; ordered: boolean; items: { lead?: string; text: string }[] }
  | { type: "image"; src: string; width: number; height: number; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "faq"; items: { question: string; answer: string }[] };

export interface Article {
  slug: string;
  category: ArticleCategory;
  /** ISO date, used for both display and the Article schema's datePublished. */
  date: string;
  /** When the article was last edited in Studio — the Article schema's dateModified. */
  updatedAt: string;
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
  _type:
    | "articleHeading"
    | "articleParagraph"
    | "articleQuote"
    | "articleList"
    | "articleImage"
    | "articleFaq";
  text?: string;
  linkText?: string;
  linkSlug?: string;
  attribution?: string;
  links?: { text: string; href: string }[];
  ordered?: boolean;
  items?: { lead?: string; text?: string; question?: string; answer?: string }[];
  alt?: string;
  caption?: string;
  image?: { url: string; width: number; height: number };
}

function toBlocks(raw: RawBlock[] | undefined): ArticleBlock[] {
  if (!raw) return [];
  const blocks: ArticleBlock[] = [];
  for (const b of raw) {
    if (b._type === "articleHeading") blocks.push({ type: "heading", text: b.text ?? "" });
    else if (b._type === "articleQuote")
      blocks.push({ type: "quote", text: b.text ?? "", attribution: b.attribution });
    else if (b._type === "articleList")
      blocks.push({
        type: "list",
        ordered: Boolean(b.ordered),
        items: (b.items ?? []).map((i) => ({ lead: i.lead ?? undefined, text: i.text ?? "" })),
      });
    else if (b._type === "articleFaq")
      blocks.push({
        type: "faq",
        items: (b.items ?? []).map((i) => ({ question: i.question ?? "", answer: i.answer ?? "" })),
      });
    else if (b._type === "articleImage") {
      if (b.image?.url) {
        blocks.push({
          type: "image",
          src: b.image.url,
          width: b.image.width,
          height: b.image.height,
          alt: b.alt ?? "",
          caption: b.caption ?? undefined,
        });
      }
    } else
      blocks.push({
        type: "paragraph",
        text: b.text ?? "",
        linkText: b.linkText,
        linkSlug: b.linkSlug,
        links: b.links ?? undefined,
      });
  }
  return blocks;
}

const BODY_BLOCK_FIELDS = /* groq */ `_type, text, linkText, "linkSlug": linkSlug->slug.current, attribution,
  links[]{ text, href }, ordered, items[]{ lead, text, question, answer }, alt, caption,
  "image": image.asset->{ "url": url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }`;

const ARTICLE_PROJECTION = /* groq */ `{
  "slug": slug.current,
  category,
  date,
  "updatedAt": _updatedAt,
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
  updatedAt: string;
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
    updatedAt: raw.updatedAt,
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

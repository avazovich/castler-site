import { getLocale, getMessages } from "next-intl/server";
import type { Article, ArticleBlock } from "@/content/articles";

type LocalizedArticleFields = {
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  body: ArticleBlock[];
};

/**
 * Resolves an article's title/excerpt/meta/body in the current request
 * locale, falling back to the English copy in content/articles.ts when no
 * translation exists yet (Russian, for now). Reads the raw messages object
 * directly (not t.raw) so a missing entry is a plain undefined instead of
 * triggering next-intl's MISSING_MESSAGE error — same pattern as
 * lib/projectContent.ts.
 */
export async function getLocalizedArticleContent(article: Article): Promise<LocalizedArticleFields> {
  const locale = await getLocale();
  const fallback: LocalizedArticleFields = {
    title: article.title,
    excerpt: article.excerpt,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    body: article.body,
  };
  if (locale === "en") return fallback;

  const messages = await getMessages();
  const articlesMap = messages.Articles as Record<string, LocalizedArticleFields> | undefined;
  const raw = articlesMap?.[article.slug];
  if (raw?.title && raw?.body) return raw;
  return fallback;
}

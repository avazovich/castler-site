import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryTag } from "@/components/CategoryTag";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { articles, getArticle } from "@/content/articles";
import { getLocalizedArticleContent } from "@/lib/articleContent";
import { formatArticleDate } from "@/lib/formatArticleDate";
import { SITE_URL } from "@/lib/siteConfig";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Castler" };

  const { metaTitle, metaDescription } = await getLocalizedArticleContent(article);
  const locale = await getLocale();
  const canonical = `${SITE_URL}/${locale}/news/${slug}`;
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations("News");
  const tCategories = await getTranslations("ArticleCategories");
  const locale = await getLocale();
  const { title, metaTitle, metaDescription, body } = await getLocalizedArticleContent(article);

  const related = await Promise.all(
    article.related.map(async (relatedSlug) => {
      const relatedArticle = getArticle(relatedSlug);
      if (!relatedArticle) return undefined;
      const localized = await getLocalizedArticleContent(relatedArticle);
      return { ...relatedArticle, title: localized.title, excerpt: localized.excerpt };
    }),
  );
  const relatedArticles = related.filter((a) => a !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metaTitle,
    description: metaDescription,
    author: { "@type": "Organization", name: "Castler" },
    publisher: { "@type": "Organization", name: "Castler", url: SITE_URL },
    datePublished: article.date,
    mainEntityOfPage: `${SITE_URL}/${locale}/news/${slug}`,
  };

  return (
    <div className="pt-24 sm:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <RevealOnScroll>
          <nav aria-label="Breadcrumb" className="label-mono flex items-center gap-2 text-ink-soft">
            <Link href="/news" className="transition-colors hover:text-ink">
              {t("breadcrumbHome")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-ink">{title}</span>
          </nav>

          <div className="mt-6 flex items-center justify-between gap-3">
            <CategoryTag category={article.category} label={tCategories(article.category)} />
            <time dateTime={article.date} className="label-mono text-ink-soft">
              {formatArticleDate(article.date, locale)}
            </time>
          </div>

          <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
            <AnimatedText text={title} />
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05} className="mt-10 pb-24 sm:pb-32">
          <article>
            <ArticleBody blocks={body} />
          </article>

          <div className="mt-16 max-w-[680px] border-t border-line pt-8">
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 font-display text-2xl transition-colors hover:text-gold"
            >
              {t("moreArticles")}
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {relatedArticles.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedArticles.map((a) => (
                  <ArticleCard
                    key={a.slug}
                    slug={a.slug}
                    category={a.category}
                    categoryLabel={tCategories(a.category)}
                    date={a.date}
                    locale={locale}
                    title={a.title}
                    excerpt={a.excerpt}
                    readMoreLabel={t("readMore")}
                  />
                ))}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

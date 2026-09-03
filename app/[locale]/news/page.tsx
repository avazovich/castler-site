import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { ArticleCard } from "@/components/ArticleCard";
import { OfficeTeaser } from "@/components/OfficeTeaser";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { articles } from "@/content/articles";
import { getLocalizedArticleContent } from "@/lib/articleContent";
import { SITE_URL } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return {
    title: t("news.title"),
    description: t("news.description"),
    alternates: { canonical: `${SITE_URL}/news` },
  };
}

export default async function NewsPage() {
  const t = await getTranslations("News");
  const tCategories = await getTranslations("ArticleCategories");
  const tHome = await getTranslations("Home");
  const locale = await getLocale();

  const cards = await Promise.all(
    articles.map(async (article) => {
      const { title, excerpt } = await getLocalizedArticleContent(article);
      return { ...article, title, excerpt };
    }),
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-10 sm:pt-28">
        <RevealOnScroll>
          <p className="label-mono text-ink-soft">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">
            <AnimatedText text={t("heading")} />
          </h1>
          <p className="mt-4 max-w-lg text-ink-soft">{t("body")}</p>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((article, i) => (
            <RevealOnScroll key={article.slug} delay={Math.min(i * 0.06, 0.3)}>
              <ArticleCard
                slug={article.slug}
                category={article.category}
                categoryLabel={tCategories(article.category)}
                date={article.date}
                locale={locale}
                title={article.title}
                excerpt={article.excerpt}
                readMoreLabel={t("readMore")}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <OfficeTeaser
        title={tHome("officeTeaserTitle")}
        body={tHome("officeTeaserBody")}
        cta={tHome("officeTeaserCta")}
      />
    </>
  );
}

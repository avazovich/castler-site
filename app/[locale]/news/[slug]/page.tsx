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
import { getArticle, getArticleSlugs, type Article } from "@/content/articles";
import { formatArticleDate } from "@/lib/formatArticleDate";
import { localizedAlternates, SITE_URL } from "@/lib/siteConfig";

const OG_LOCALE: Record<string, string> = { en: "en_US", uz: "uz_UZ", ru: "ru_RU" };

/** The article's first picture, if it has one — used as the social-share image. */
function leadImage(article: Article) {
  const image = article.body.find((b) => b.type === "image");
  if (!image || image.type !== "image") return undefined;
  // Share previews want a 1200x630 JPEG; ask Sanity for exactly that rather
  // than handing crawlers the multi-megabyte original.
  const src = image.src.includes("cdn.sanity.io")
    ? `${image.src.split("?")[0]}?w=1200&h=630&fit=crop&fm=jpg&q=80`
    : image.src;
  return { src, alt: image.alt };
}

/** JSON for a <script type="application/ld+json"> tag — "<" escaped so article text can never close the tag. */
function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [article, locale] = await Promise.all([getArticle(slug), getLocale()]);
  if (!article) return { title: "Castler" };

  const image = leadImage(article);
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: localizedAlternates(locale, `/news/${slug}`),
    openGraph: {
      type: "article",
      siteName: "Castler",
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${SITE_URL}/${locale}/news/${slug}`,
      locale: OG_LOCALE[locale] ?? locale,
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      authors: ["Castler"],
      images: image ? [{ url: image.src, width: 1200, height: 630, alt: image.alt }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: article.metaTitle,
      description: article.metaDescription,
      images: image ? [image.src] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, locale] = await Promise.all([getArticle(slug), getLocale()]);
  if (!article) notFound();

  const t = await getTranslations("News");
  const tCategories = await getTranslations("ArticleCategories");

  const related = await Promise.all(article.related.map((relatedSlug) => getArticle(relatedSlug)));
  const relatedArticles = related.filter((a) => a !== undefined);

  const tNav = await getTranslations("Nav");
  const url = `${SITE_URL}/${locale}/news/${slug}`;
  const image = leadImage(article);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    inLanguage: locale,
    articleSection: tCategories(article.category),
    author: { "@type": "Organization", name: "Castler", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Castler",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo.png` },
    },
    datePublished: article.date,
    dateModified: article.updatedAt,
    mainEntityOfPage: url,
    ...(image ? { image: [image.src] } : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tNav("home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: tNav("news"), item: `${SITE_URL}/${locale}/news` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  // Built from the same questions and answers shown on the page, as Google requires.
  const faqItems = article.body.flatMap((b) => (b.type === "faq" ? b.items : []));
  const faqLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <div className="pt-24 sm:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqLd) }} />}

      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <RevealOnScroll>
          <nav aria-label="Breadcrumb" className="label-mono flex items-center gap-2 text-ink-soft">
            <Link href="/news" className="transition-colors hover:text-ink">
              {t("breadcrumbHome")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-ink">{article.title}</span>
          </nav>

          <div className="mt-6 flex items-center justify-between gap-3">
            <CategoryTag category={article.category} label={tCategories(article.category)} />
            <time dateTime={article.date} className="label-mono text-ink-soft">
              {formatArticleDate(article.date, locale)}
            </time>
          </div>

          <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
            <AnimatedText text={article.title} />
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05} className="mt-10 pb-24 sm:pb-32">
          <article>
            <ArticleBody blocks={article.body} />
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

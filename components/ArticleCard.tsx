import { Link } from "@/i18n/navigation";
import type { ArticleCategory } from "@/content/articles";
import { CategoryTag } from "./CategoryTag";
import { ArrowRightIcon } from "./icons";
import { formatArticleDate } from "@/lib/formatArticleDate";

/**
 * News list-page card — deliberately text-only (no image): a category tag,
 * title, date, and excerpt in a bordered panel. The photography-led
 * ProjectCard pattern doesn't fit here since these are opinion/news pieces,
 * not project photo sets, and a placeholder gradient would read as an
 * unfinished project rather than an intentional editorial layout.
 */
export function ArticleCard({
  slug,
  category,
  categoryLabel,
  date,
  locale,
  title,
  excerpt,
  readMoreLabel,
}: {
  slug: string;
  category: ArticleCategory;
  categoryLabel: string;
  date: string;
  locale: string;
  title: string;
  excerpt: string;
  readMoreLabel: string;
}) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-paper p-6 transition-colors duration-200 hover:border-ink hover:bg-paper-2"
    >
      <div className="flex items-center justify-between gap-3">
        <CategoryTag category={category} label={categoryLabel} />
        <time dateTime={date} className="label-mono shrink-0 text-ink-soft">
          {formatArticleDate(date, locale)}
        </time>
      </div>
      <h3 className="font-display mt-4 text-xl leading-tight sm:text-2xl">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{excerpt}</p>
      <p className="label-mono mt-5 inline-flex items-center gap-1.5 text-ink transition-transform duration-200 group-hover:translate-x-1">
        {readMoreLabel}
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </p>
    </Link>
  );
}

import type { ArticleCategory } from "@/content/articles";

const CATEGORY_COLOR: Record<ArticleCategory, string> = {
  projects: "var(--gold)",
  philosophy: "var(--moss)",
  company: "var(--ink-soft)",
};

/** Thin colored left border, not a filled pill — same status-tag language
 *  used for role/category chips elsewhere on the site, applied here to
 *  News categories (gold/moss/concrete, one per category). */
export function CategoryTag({ category, label }: { category: ArticleCategory; label: string }) {
  return (
    <span
      className="label-mono inline-flex items-center border-l-2 py-0.5 pl-2.5 text-ink-soft"
      style={{ borderColor: CATEGORY_COLOR[category] }}
    >
      {label}
    </span>
  );
}

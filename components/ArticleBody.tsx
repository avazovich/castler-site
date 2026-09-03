import type { ArticleBlock } from "@/content/articles";
import { Link } from "@/i18n/navigation";

/**
 * Renders an article's block list as semantic HTML: `<h2>` for subsections
 * (crawlers and AI engines read heading structure, not just prose) and
 * `<p>` for body copy, both server-rendered so the full text is present in
 * the page source rather than injected client-side. A `quote` block gets
 * the pull-quote treatment — larger, italic, thin gold left border — and a
 * `paragraph` can carry one inline link to another article via
 * `linkText`/`linkSlug`, used for the cross-links between articles.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="max-w-[680px]">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="font-display mt-10 text-2xl first:mt-0 sm:text-3xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={i} className="mt-8 border-l-2 border-gold py-1 pl-6">
              <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                “{block.text}”
              </p>
              {block.attribution && (
                <cite className="label-mono mt-3 block not-italic text-ink-soft">
                  — {block.attribution}
                </cite>
              )}
            </blockquote>
          );
        }
        return (
          <p key={i} className="mt-5 text-lg leading-relaxed text-ink-soft first:mt-0">
            {renderParagraph(block)}
          </p>
        );
      })}
    </div>
  );
}

function renderParagraph(block: Extract<ArticleBlock, { type: "paragraph" }>) {
  if (!block.linkText || !block.linkSlug || !block.text.includes(block.linkText)) {
    return block.text;
  }
  const idx = block.text.indexOf(block.linkText);
  const before = block.text.slice(0, idx);
  const after = block.text.slice(idx + block.linkText.length);
  return (
    <>
      {before}
      <Link href={`/news/${block.linkSlug}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
        {block.linkText}
      </Link>
      {after}
    </>
  );
}

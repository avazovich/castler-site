import Image from "next/image";
import type { ArticleBlock } from "@/content/articles";
import { Link } from "@/i18n/navigation";
import { PlusIcon } from "./icons";

const LINK_CLASS = "text-ink underline decoration-line underline-offset-4 hover:decoration-ink";

/**
 * Renders an article's block list as semantic HTML, all server-rendered so the
 * full text is in the page source rather than injected client-side:
 * `<h2>` for subsections (crawlers and AI engines read heading structure, not
 * just prose), `<p>` for body copy, `<ul>`/`<ol>` for lists, `<figure>` with a
 * real alt text for images, and native `<details>` for FAQ answers so every
 * answer is present in the HTML even for crawlers that never run JavaScript.
 * A `quote` block gets the pull-quote treatment — larger, italic, thin gold
 * left border. A `paragraph` can carry inline links to other pages, articles
 * or other sites.
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
        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List
              key={i}
              className={`mt-5 space-y-2.5 pl-6 text-lg leading-relaxed text-ink-soft marker:text-gold ${
                block.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item, j) => (
                <li key={j} className="pl-1">
                  {item.lead && <strong className="font-medium text-ink">{item.lead} </strong>}
                  {item.text}
                </li>
              ))}
            </List>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={i} className="mt-8">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(min-width: 768px) 680px, 100vw"
                className="h-auto w-full rounded-xl"
              />
              {block.caption && (
                <figcaption className="label-mono mt-3 text-ink-soft">{block.caption}</figcaption>
              )}
            </figure>
          );
        }
        if (block.type === "faq") {
          return (
            <div key={i} className="mt-6 divide-y divide-line border-y border-line">
              {block.items.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
                    <h3 className="text-lg font-normal text-ink">{item.question}</h3>
                    <PlusIcon className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.answer}</p>
                </details>
              ))}
            </div>
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
  // The older single-article link (linkText/linkSlug) is just one more link.
  const links = [
    ...(block.links ?? []),
    ...(block.linkText && block.linkSlug ? [{ text: block.linkText, href: `/news/${block.linkSlug}` }] : []),
  ];

  const found = links
    .map((link) => ({ ...link, at: block.text.indexOf(link.text) }))
    .filter((link) => link.at >= 0 && link.text.length > 0)
    .sort((a, b) => a.at - b.at);
  if (found.length === 0) return block.text;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const link of found) {
    if (link.at < cursor) continue; // overlaps a link already placed
    parts.push(block.text.slice(cursor, link.at));
    parts.push(
      link.href.startsWith("/") ? (
        <Link key={link.at} href={link.href} className={LINK_CLASS}>
          {link.text}
        </Link>
      ) : (
        <a key={link.at} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {link.text}
        </a>
      ),
    );
    cursor = link.at + link.text.length;
  }
  parts.push(block.text.slice(cursor));
  return parts;
}

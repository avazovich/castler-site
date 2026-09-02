import { RevealOnScroll } from "./RevealOnScroll";
import { PlusIcon } from "./icons";

/**
 * Uses native <details>/<summary> rather than a JS-driven accordion so the
 * full question/answer text is always present in the HTML — crawlers that
 * don't execute JavaScript (some AI/GEO bots) still see every answer.
 */
export function FAQSection({
  heading,
  items,
}: {
  heading: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="font-display text-4xl sm:text-5xl">{heading}</h2>
        </RevealOnScroll>

        <div className="mt-10 divide-y divide-line border-t border-line">
          {items.map((item, i) => (
            <RevealOnScroll key={item.question} delay={Math.min(i * 0.03, 0.2)}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg text-ink marker:content-none">
                  {item.question}
                  <PlusIcon className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-2xl text-ink-soft">{item.answer}</p>
              </details>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

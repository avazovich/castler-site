import { RevealOnScroll } from "./RevealOnScroll";

export function AboutNarrative({
  heading,
  intro,
  sections,
}: {
  heading: string;
  intro: string[];
  sections: { title: string; body: string[] }[];
}) {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="font-display text-4xl sm:text-5xl">{heading}</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </RevealOnScroll>

        {sections.map((section) => (
          <RevealOnScroll key={section.title} className="mt-14 border-t border-line pt-10">
            <h3 className="font-display text-2xl">{section.title}</h3>
            <div className="mt-4 space-y-4 text-ink-soft">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

import type { AwardEntry } from "@/content/awards";
import { RevealOnScroll } from "./RevealOnScroll";

export function AwardsSection({
  eyebrow,
  heading,
  notice,
  awards,
}: {
  eyebrow: string;
  heading: string;
  notice: string;
  awards: AwardEntry[];
}) {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p className="label-mono text-ink-soft">{eyebrow}</p>
          <h2 className="font-display mt-2 text-4xl sm:text-5xl">{heading}</h2>
          <p className="mt-2 max-w-lg text-sm italic text-ink-soft/70">{notice}</p>
        </RevealOnScroll>

        <div className="mt-10 border-t border-line">
          {awards.map((entry, i) => (
            <RevealOnScroll
              key={`${entry.award}-${entry.project}`}
              delay={Math.min(i * 0.03, 0.3)}
              className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <p className="text-ink">{entry.award}</p>
              <div className="flex items-center gap-4 text-sm text-ink-soft sm:shrink-0">
                <span className="label-mono">{entry.project}</span>
                <span className="label-mono w-12 text-right">{entry.year}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

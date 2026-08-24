import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "./icons";
import { PlaceholderImage } from "./PlaceholderImage";
import { RevealOnScroll } from "./RevealOnScroll";

export function OfficeTeaser({
  title,
  body,
  cta,
  seed = "office-teaser",
  snap = false,
}: {
  title: string;
  body: string;
  cta: string;
  seed?: string;
  snap?: boolean;
}) {
  return (
    <section {...(snap ? { "data-snap": true } : {})} className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-2 md:items-center md:gap-16">
        <RevealOnScroll className="flex flex-col items-start gap-6">
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="max-w-md text-ink-soft">{body}</p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-ink hover:text-paper active:scale-[0.97]"
          >
            {cta}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <PlaceholderImage seed={seed} className="h-full w-full" />
        </RevealOnScroll>
      </div>
    </section>
  );
}

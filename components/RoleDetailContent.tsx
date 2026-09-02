import { ArrowRightIcon } from "./icons";
import { ProjectImage } from "./ProjectImage";
import { ShareButton } from "./ShareButton";

/** Real photography per role — reused across the four roles rather than
 *  needing a distinct "office life" shot for each one. */
const ROLE_IMAGES: Record<string, string> = {
  "architectural-designer": "/projects/qodirxon-pavilion.jpg",
  "interior-designer": "/projects/afsona-mall-hero.jpg",
  "facade-designer": "/projects/qodirxon-pavilion.jpg",
  "visualization-artist": "/projects/mustang-showroom-hero.jpg",
};

export function RoleDetailContent({
  slug,
  title,
  location,
  intro,
  requirements,
  howToApply,
  applyUrl,
  labels,
}: {
  slug: string;
  title: string;
  location: string;
  intro: string;
  requirements: string[];
  howToApply: string;
  applyUrl: string;
  labels: {
    location: string;
    whatWereLookingFor: string;
    howToApply: string;
    apply: string;
    share: string;
    shareCopied: string;
  };
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-24 lg:h-fit">
        <ProjectImage slug={slug} title={title} image={ROLE_IMAGES[slug]} className="h-full w-full" />
      </div>

      <div>
        <p className="label-mono text-ink-soft">{labels.location}</p>
        <p className="mt-1 text-sm text-ink-soft">{location}</p>

        <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">{title}</h1>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={applyUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide text-paper transition-all duration-200 hover:scale-[1.03] hover:opacity-85 active:scale-[0.97]"
          >
            {labels.apply}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <ShareButton label={labels.share} copiedLabel={labels.shareCopied} />
        </div>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink">{intro}</p>

        <div className="mt-10 border-t border-line pt-8">
          <p className="label-mono text-ink-soft">{labels.whatWereLookingFor}</p>
          <ul className="mt-4 max-w-2xl space-y-3">
            {requirements.map((req, i) => (
              <li key={i} className="flex gap-3 text-ink-soft">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-soft" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <p className="label-mono text-ink-soft">{labels.howToApply}</p>
          <p className="mt-4 max-w-2xl text-ink-soft">{howToApply}</p>
          <a
            href={applyUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide text-paper transition-all duration-200 hover:scale-[1.03] hover:opacity-85 active:scale-[0.97]"
          >
            {labels.apply}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

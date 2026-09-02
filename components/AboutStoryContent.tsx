import { ProjectImage } from "./ProjectImage";

export type StoryContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  paragraphs: string[];
  sections: { title: string; seed: string; body: string }[];
};

/** Real photography standing in for each editorial image, keyed by the
 *  section's seed — reuses our own project work rather than generic art. */
const STORY_IMAGES: Record<string, string> = {
  "story-intro": "/projects/axsikent-hero.jpg",
  "story-disciplines": "/projects/megaton-office-hero.jpg",
  "story-programs": "/projects/mashad-hero.jpg",
  "story-values": "/projects/inolla-office-hero.jpg",
};

export function AboutStoryContent({ content }: { content: StoryContent }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="label-mono text-ink-soft">{content.eyebrow}</p>
      <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{content.heading}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">{content.intro}</p>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
        <ProjectImage slug="story-intro" title={content.heading} image={STORY_IMAGES["story-intro"]} className="h-full w-full" />
      </div>

      <div className="mt-8 space-y-5 text-ink-soft">
        {content.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {content.sections.map((section) => (
        <div key={section.title} className="mt-16 border-t border-line pt-10">
          <p className="label-mono text-ink-soft">{section.title}</p>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <ProjectImage slug={section.seed} title={section.title} image={STORY_IMAGES[section.seed]} className="h-full w-full" />
          </div>
          <p className="mt-6 text-ink-soft">{section.body}</p>
        </div>
      ))}
    </div>
  );
}

import { storyContent } from "@/content/story";
import { PlaceholderImage } from "./PlaceholderImage";

export function AboutStoryContent() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="label-mono text-ink-soft">{storyContent.eyebrow}</p>
      <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{storyContent.heading}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">{storyContent.intro}</p>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
        <PlaceholderImage seed="story-intro" className="h-full w-full" />
      </div>

      <div className="mt-8 space-y-5 text-ink-soft">
        {storyContent.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {storyContent.sections.map((section) => (
        <div key={section.title} className="mt-16 border-t border-line pt-10">
          <p className="label-mono text-ink-soft">{section.title}</p>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <PlaceholderImage seed={section.seed} className="h-full w-full" />
          </div>
          <p className="mt-6 text-ink-soft">{section.body}</p>
        </div>
      ))}
    </div>
  );
}

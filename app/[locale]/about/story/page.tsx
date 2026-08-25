import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutStoryContent, type StoryContent } from "@/components/AboutStoryContent";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Story");
  return { title: `${t("heading")} — Castler` };
}

export default async function AboutStoryPage() {
  const t = await getTranslations("Story");
  const content: StoryContent = {
    eyebrow: t("eyebrow"),
    heading: t("heading"),
    intro: t("intro"),
    paragraphs: t.raw("paragraphs"),
    sections: t.raw("sections"),
  };

  return (
    <div className="px-6 pb-24 pt-24 sm:px-10 sm:pt-28">
      <RevealOnScroll>
        <AboutStoryContent content={content} />
      </RevealOnScroll>
    </div>
  );
}

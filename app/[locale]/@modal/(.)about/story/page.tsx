import { getTranslations } from "next-intl/server";
import { AboutStoryModal } from "@/components/AboutStoryModal";
import type { StoryContent } from "@/components/AboutStoryContent";

export default async function InterceptedAboutStoryModal() {
  const t = await getTranslations("Project");
  const tStory = await getTranslations("Story");
  const content: StoryContent = {
    eyebrow: tStory("eyebrow"),
    heading: tStory("heading"),
    intro: tStory("intro"),
    paragraphs: tStory.raw("paragraphs"),
    sections: tStory.raw("sections"),
  };

  return <AboutStoryModal closeLabel={t("close")} content={content} />;
}

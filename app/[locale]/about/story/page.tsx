import type { Metadata } from "next";
import { AboutStoryContent } from "@/components/AboutStoryContent";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { storyContent } from "@/content/story";

export const metadata: Metadata = {
  title: `${storyContent.heading} — Castler`,
};

export default function AboutStoryPage() {
  return (
    <div className="px-6 pb-24 pt-24 sm:px-10 sm:pt-28">
      <RevealOnScroll>
        <AboutStoryContent />
      </RevealOnScroll>
    </div>
  );
}

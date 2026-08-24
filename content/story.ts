export interface StorySection {
  title: string;
  seed: string;
  body: string;
}

/**
 * Placeholder "About Us" narrative shown in the story modal/page — structure
 * (intro, story, disciplines, program types, values) is final; copy is a
 * stand-in until the studio supplies the real text.
 */
export const storyContent = {
  eyebrow: "Our Story",
  heading: "About Castler",
  intro:
    "Castler is an architectural design studio working across architecture, interiors, and urban design to create environments where the built form connects deeply with the people who use it.",
  paragraphs: [
    "Founded by Otabek Isoqjonov, Castler is based in Tashkent and works across residential, commercial, and public projects, from early concept through construction. The studio approaches each project through its relationship to site, climate, and the people who will use it.",
    "Placeholder — a fuller studio history, notable projects, and press mentions will be added here once available.",
  ],
  sections: [
    {
      title: "Disciplines",
      seed: "story-disciplines",
      body: "We work across architecture, interior design, and urban planning, approaching each project as a single continuous idea carried from massing down to material and detail. Placeholder text — final copy to follow.",
    },
    {
      title: "Program Types",
      seed: "story-programs",
      body: "Our portfolio spans villas and private residences, hospitality interiors, cultural and civic buildings, and early-stage urban concepts. Placeholder text — final copy to follow.",
    },
    {
      title: "Values",
      seed: "story-values",
      body: "We believe good design comes from close collaboration with clients and contractors, an iterative process, and a discipline that stays responsive to site, climate, and local context. Placeholder text — final copy to follow.",
    },
  ] satisfies StorySection[],
};

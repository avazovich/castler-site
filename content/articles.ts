export type ArticleCategory = "projects" | "philosophy" | "company";

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string; linkText?: string; linkSlug?: string }
  | { type: "quote"; text: string; attribution?: string };

export interface Article {
  slug: string;
  category: ArticleCategory;
  /** ISO date, used for both display and the Article schema's datePublished. */
  date: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  body: ArticleBlock[];
  /** Slugs of 1-2 other articles linked at the end of this one. */
  related: string[];
}

/**
 * The site's first real News content — English base copy, mirrored into
 * messages/uz.json under "Articles" (Uzbek is the primary audience; the
 * translation there carries the full, human-written Uzbek article, not a
 * literal pass over this). No Russian translation yet, so ru falls back to
 * this English copy via getLocalizedArticleContent, same as an
 * untranslated project.
 */
export const articles: Article[] = [
  {
    slug: "afsona-mall",
    category: "projects",
    date: "2026-09-03",
    title: "Afsona Mall: How Castler Took On What an International Contractor Could Not",
    excerpt:
      "Afsona Mall is a 50,000 m² shopping centre selected in competition with an international contractor. Currently in construction supervision, led by Castler from concept to completion.",
    metaTitle: "Afsona Mall — A 50,000 m² Shopping Centre Designed by Castler",
    metaDescription:
      "Afsona Mall is a 50,000 m² shopping centre selected in competition with an international contractor. Currently in construction supervision, led by Castler from concept to completion.",
    body: [
      {
        type: "paragraph",
        text: "Among the largest commercial projects currently underway in Namangan is Afsona Mall, a 50,000 m² shopping centre — and one of the clearest examples of Castler's capability in commercial architecture.",
      },
      { type: "heading", text: "The brief" },
      {
        type: "paragraph",
        text: "The brief was not simple: manage a large, complex commercial development end to end, deliver a result that meets international standards, and do it with a local team, in a local context. An international contractor had originally been engaged for the project, but the work stalled. Afsona Holding then turned to Castler.",
      },
      { type: "heading", text: "Why Castler was chosen" },
      {
        type: "paragraph",
        text: "Castler's team was selected after a competitive review — not on price alone, but on demonstrated capability and trust.",
      },
      { type: "heading", text: "Where the project stands today" },
      {
        type: "paragraph",
        text: "The project is now in construction supervision. Castler's team has carried it from concept through structural solutions and engineering coordination to daily on-site oversight — the clearest real-world example of the company's full-ownership approach in action. The client did not need to coordinate multiple separate contractors; they worked with one accountable team throughout.",
      },
      { type: "heading", text: "What's next" },
      {
        type: "paragraph",
        text: "Afsona Mall's opening is approaching. Once complete, Castler will document the project in full, positioning it as a defining piece of the company's commercial portfolio.",
      },
      {
        type: "quote",
        text: "What did this project prove? That managing a large, complex commercial building doesn't require an international name — it requires real accountability, a systematic process, and commitment to the result.",
        attribution: "The Castler team",
      },
    ],
    related: ["boshidan-oxirigacha", "ishlaydigan-arxitektura"],
  },
  {
    slug: "kelajak-rejalari",
    category: "company",
    date: "2026-09-03",
    title: "Castler's Future Plans: From Namangan to a National Scale",
    excerpt:
      "Castler is expanding, with plans to open a new office in Tashkent as the company enters its next phase in commercial architecture.",
    metaTitle: "Castler's Future Plans — Expanding to Tashkent",
    metaDescription:
      "Castler is expanding, with plans to open a new office in Tashkent as the company enters its next phase in commercial architecture.",
    body: [
      {
        type: "paragraph",
        text: "Over more than twelve years, Castler has built a solid foundation in Namangan — projects spanning more than 200,000 m², a trusted team, and clear operating systems. The next step is taking that foundation further.",
      },
      { type: "heading", text: "A step toward Tashkent" },
      {
        type: "paragraph",
        text: "Castler's next phase includes plans to open a new office in Tashkent — a move driven by the company's ambition to be closer to major commercial clients across Uzbekistan and to take part more actively in the capital's growing commercial construction market.",
      },
      { type: "heading", text: "A deeper focus on commercial work" },
      {
        type: "paragraph",
        text: "Looking ahead, Castler is placing particular focus on commercial developments — shopping centres, business centres, hospitality projects, and mixed-use developments. This is a natural continuation of the experience the company has built on large-scale projects like Afsona Mall.",
        linkText: "Afsona Mall",
        linkSlug: "afsona-mall",
      },
      { type: "heading", text: "What stays the same" },
      {
        type: "paragraph",
        text: "Through this growth, Castler's core principles remain unchanged: full accountability on every project, a design philosophy that starts with people, and — increasingly — close attention to how well every project performs and delivers value for its owner.",
      },
      {
        type: "quote",
        text: "For Castler, growth isn't just about more cities. It's about bringing the same quality and the same trust to more clients.",
      },
    ],
    related: ["ishlaydigan-arxitektura", "afsona-mall"],
  },
  {
    slug: "ishlaydigan-arxitektura",
    category: "philosophy",
    date: "2026-09-03",
    title: "“Design That Performs” — Castler's Next Chapter",
    excerpt:
      "For Castler, good design has to do two things at once: look right, and work. Here's what that means in practice.",
    metaTitle: "“Design That Performs” — Castler's Next Chapter",
    metaDescription:
      "For Castler, good design has to do two things at once: look right, and work. Here's what that means in practice.",
    body: [
      {
        type: "paragraph",
        text: "Architecture is often treated as a conversation about beauty alone. For Castler, that's not enough.",
      },
      { type: "heading", text: "Two questions, one answer" },
      {
        type: "paragraph",
        text: "On every project, Castler asks two questions at once: how should this place look, and how should this place perform? The first is a matter of design skill. The second is a matter of business thinking. Both matter equally.",
      },
      {
        type: "paragraph",
        text: "For a commercial client, a building looking good isn't enough — it has to generate revenue, remain flexible, and stay useful over time. For a private client, the same logic applies differently: a home shouldn't just please the eye, it should genuinely be good to live in.",
      },
      { type: "heading", text: "Why this matters" },
      {
        type: "paragraph",
        text: "Unlike studios built around a single style or material, Castler shapes each project around its actual purpose. That approach is what has let the company work successfully across such a wide range — from a private home to a large shopping centre.",
      },
      { type: "heading", text: "What this looks like in practice" },
      {
        type: "paragraph",
        text: "This philosophy runs through how Castler actually works: every square metre of a project is accounted for, design decisions are grounded in practical reasoning, and a project is expected to deliver its intended result not just in a presentation, but in daily use.",
      },
      {
        type: "paragraph",
        text: "Castler's manifesto — to look upon the world with the aim of making places prosper and people rejoice — is really the root of this idea: prosperity was never only about surface beauty. It's about genuine, working value.",
      },
      {
        type: "paragraph",
        text: "This thinking is also what's behind Castler's plans for what comes next.",
        linkText: "what comes next",
        linkSlug: "kelajak-rejalari",
      },
      { type: "quote", text: "Design that performs." },
    ],
    related: ["kelajak-rejalari", "boshidan-oxirigacha"],
  },
  {
    slug: "boshidan-oxirigacha",
    category: "company",
    date: "2026-09-03",
    title: "Why Castler Manages Every Project From Concept to Completion",
    excerpt:
      "Why Castler takes full ownership of a project, from concept to construction supervision, and what that means for the client.",
    metaTitle: "Why Castler Manages Every Project From Concept to Completion",
    metaDescription:
      "Why Castler takes full ownership of a project, from concept to construction supervision, and what that means for the client.",
    body: [
      {
        type: "paragraph",
        text: "One of the biggest risks in large construction projects is the gap that opens up when different companies handle different stages. One firm designs, another builds, a third supervises — and when something goes wrong, no one is fully accountable.",
      },
      {
        type: "paragraph",
        text: "Castler solved this problem differently from the start: one team carries the project from beginning to end.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "paragraph",
        text: "From concept and design through structural and engineering solutions, documentation, and daily on-site supervision — everything is coordinated within Castler. The client isn't left managing a dozen separate contractors and consultants.",
      },
      { type: "heading", text: "What this means for the client" },
      {
        type: "paragraph",
        text: "The practical benefit is straightforward: when an issue comes up, responsibility can't be passed off to “another company.” The original design intent doesn't get lost during construction, because the team that created it is the same team seeing it through. And most importantly, the client agrees terms once, then works with one accountable partner for the entire process.",
      },
      { type: "heading", text: "Proof in practice" },
      {
        type: "paragraph",
        text: "The clearest example of this principle in action is Afsona Mall, currently in construction supervision — from concept through daily site oversight, carried entirely by one Castler team.",
        linkText: "Afsona Mall",
        linkSlug: "afsona-mall",
      },
      {
        type: "quote",
        text: "For Castler, this isn't just a service model — it's a definition of responsibility: a project isn't finished when it's handed over. It's finished when it's actually working.",
      },
    ],
    related: ["afsona-mall", "ishlaydigan-arxitektura"],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const articleCategories: ArticleCategory[] = ["projects", "philosophy", "company"];

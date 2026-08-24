export interface BlogPost {
  slug: string;
  tag: string;
  title: string;
  date: string;
  seed: string;
}

/**
 * Placeholder studio news/journal entries — illustrative only, standing in
 * until there's real press/news content to publish. Rendered with
 * PlaceholderImage, same convention as content/projects.ts.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "afsona-villa-completion",
    tag: "Completion",
    title: "Afsona Villa completes construction in Namangan",
    date: "August 2026",
    seed: "blog-afsona-villa",
  },
  {
    slug: "penthouse-feature",
    tag: "Feature",
    title: "Tashkent penthouse featured in a regional interior journal",
    date: "July 2026",
    seed: "blog-penthouse",
  },
  {
    slug: "studio-award",
    tag: "Award",
    title: "Castler shortlisted at a Central Asian design awards program",
    date: "June 2026",
    seed: "blog-award",
  },
  {
    slug: "hotel-room-groundbreaking",
    tag: "Event",
    title: "Samarkand hotel interior breaks ground",
    date: "May 2026",
    seed: "blog-groundbreaking",
  },
];

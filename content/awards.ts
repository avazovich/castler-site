export interface AwardEntry {
  /** Key into the `Awards` translation namespace for the award title. */
  id: string;
  /** Slug of the real, photographed project this award refers to. */
  projectSlug: string;
  year: string;
}

/**
 * Placeholder recognition list for the About page's Awards table — entries
 * reference real, currently-listed projects for plausibility, but the
 * awards themselves are illustrative only until the studio supplies its
 * real history. Award titles live in the `Awards` translation namespace so
 * each locale reads naturally rather than falling back to English.
 */
export const awards: AwardEntry[] = [
  { id: "flagshipMall", projectSlug: "afsona-mall", year: "2026" },
  { id: "centralAsianDesign", projectSlug: "afsona-villa", year: "2026" },
  { id: "regionalInteriorJournal", projectSlug: "tashkent-penthouse", year: "2026" },
  { id: "emergingStudios", projectSlug: "exclusive-signature-restaurant", year: "2026" },
  { id: "workplaceDesign", projectSlug: "inolla-office", year: "2026" },
  { id: "residentialInterior", projectSlug: "samarkand-hotel-room", year: "2025" },
  { id: "hospitalityDigest", projectSlug: "yorokobi-wok-and-noodles", year: "2025" },
  { id: "residentialInteriorsPrize", projectSlug: "turakorgan-residence", year: "2025" },
  { id: "retailConceptShowcase", projectSlug: "mustang-showroom", year: "2026" },
];

export interface AwardEntry {
  /** Key into the `Awards` translation namespace for the award title. */
  id: string;
  /** Slug of the real, photographed project this award refers to. */
  projectSlug: string;
  year: string;
}

/**
 * Real, verified recognition only — awards, press mentions, nominations,
 * or certifications Castler has actually received. Empty until the studio
 * supplies verified history; do not add illustrative/placeholder entries
 * here. AwardsSection (see app/[locale]/about/page.tsx) renders nothing
 * when this list is empty, rather than showing a "coming soon" section.
 *
 * To add a real entry once verified: push { id, projectSlug, year } and add
 * the matching title under the `Awards` namespace in each messages/*.json
 * file. If a future entry isn't tied to one of the existing project slugs,
 * or needs an organization/category/link/image, extend this interface
 * accordingly rather than forcing it into the current shape.
 */
export const awards: AwardEntry[] = [];

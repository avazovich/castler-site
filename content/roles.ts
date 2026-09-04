export interface RoleEntry {
  slug: string;
  title: string;
}

/**
 * Open roles at the Namangan studio — titles are real/current; full
 * descriptions live in the Careers translation namespace (per-locale,
 * keyed by slug) since they're long-form copy, not just labels.
 */
export const openRoles: RoleEntry[] = [
  { slug: "architectural-designer", title: "Architectural Designer" },
  { slug: "interior-designer", title: "Interior Designer" },
  { slug: "facade-designer", title: "Exterior & Facade Designer" },
  { slug: "visualization-artist", title: "3D Visualization Artist" },
];

export function getRole(slug: string) {
  return openRoles.find((r) => r.slug === slug);
}

/** Same-origin path to the dedicated application form (app/apply) — not
 *  under app/[locale]/, so this is a plain absolute path, not a locale-aware
 *  route. Used to be a direct link to the studio's Telegram group before the
 *  form existed. */
export const APPLY_URL = "/apply";

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

export const TELEGRAM_APPLY_URL = "https://t.me/castler_group";

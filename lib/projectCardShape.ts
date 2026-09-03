import type { Project } from "@/content/projects";
import { getImageDimensions } from "./imageDimensions";

/** Tile proportion a listing card should take, derived from its photo. */
export type CardShape = "tall" | "wide";

/**
 * Which photo the listing actually renders — the home grid passes the project's
 * `coverImage` through to the card, every other listing shows `image`. The
 * shape has to be measured from whichever one is on screen, or a project whose
 * cover and hero are shaped differently gets a tile that fits neither.
 */
export type ShownPhoto = "cover" | "hero";

/**
 * Decides whether a project's listing tile should be tall or wide by reading
 * the real proportions of the photo it shows (server-only: reads from public/).
 *
 * Listing tiles crop with `object-cover`, so a tile whose shape fights the
 * photo's own shape cuts the subject in half — a portrait interior forced into
 * a wide tile loses the sofa, the ceiling, or both. Matching the tile to the
 * photo keeps the crop down to a sliver off the edges. The threshold sits at
 * 1.15 rather than 1.0 so square-ish photos land in the tall tile, where they
 * lose less than they would in a short, wide one.
 */
export function getCardShape(project: Project, shows: ShownPhoto = "cover"): CardShape {
  const src = shows === "cover" ? project.coverImage ?? project.image : project.image;
  if (!src) return "tall";
  const { width, height } = getImageDimensions(src);
  return width / height >= 1.15 ? "wide" : "tall";
}

/** Card shapes for a list of projects, index-aligned to the input. */
export function getCardShapes(projects: Project[], shows: ShownPhoto = "cover"): CardShape[] {
  return projects.map((p) => getCardShape(p, shows));
}

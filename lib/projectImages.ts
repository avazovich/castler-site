import type { GalleryItem } from "@/components/ImageSlider";
import type { Project } from "@/content/projects";

/**
 * Builds the full hero + gallery image list for a project. Each photo's real
 * dimensions already travel with it from Sanity (stored image metadata,
 * fetched alongside the URL — see content/projects.ts), so this is a plain
 * reshape, no file reads. Shared by the project modal and the full detail
 * page so both get the same, correctly-sized image data.
 */
export function buildGalleryItems(project: Project): GalleryItem[] {
  const hero: GalleryItem =
    project.image && project.imageDimensions
      ? { key: "hero", src: project.image, ...project.imageDimensions }
      : { key: "hero", seed: project.slug };

  const rest: GalleryItem[] = project.gallery
    ? project.gallery.map((g, i) => ({ key: `g-${i}`, src: g.src, width: g.width, height: g.height }))
    : Array.from({ length: Math.max(project.galleryCount - 1, 0) }).map((_, i) => ({
        key: `g-${i}`,
        seed: `${project.slug}-${i}`,
      }));

  return [hero, ...rest];
}

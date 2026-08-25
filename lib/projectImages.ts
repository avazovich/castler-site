import type { GalleryItem } from "@/components/ImageSlider";
import type { Project } from "@/content/projects";
import { getImageDimensions } from "./imageDimensions";

/**
 * Builds the full hero + gallery image list for a project, resolving each
 * real photo's actual dimensions server-side (server-only: reads from
 * public/ via fs). Shared by the project modal and the full detail page so
 * both get the same, correctly-sized image data.
 */
export function buildGalleryItems(project: Project): GalleryItem[] {
  const hero: GalleryItem = project.image
    ? { key: "hero", src: project.image, ...getImageDimensions(project.image) }
    : { key: "hero", seed: project.slug };

  const rest: GalleryItem[] = project.gallery
    ? project.gallery.map((src, i) => ({ key: `g-${i}`, src, ...getImageDimensions(src) }))
    : Array.from({ length: Math.max(project.galleryCount - 1, 0) }).map((_, i) => ({
        key: `g-${i}`,
        seed: `${project.slug}-${i}`,
      }));

  return [hero, ...rest];
}

import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return undefined;
  return builder.image(source);
}

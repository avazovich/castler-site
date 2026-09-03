import Image from "next/image";
import { PlaceholderImage } from "./PlaceholderImage";

/**
 * Renders a project's real photo when `image` is set, falling back to the
 * abstract PlaceholderImage gradient otherwise. Swapping in real photography
 * is then just adding the `image` path in content/projects.ts — no component
 * changes needed at any call site.
 */
export function ProjectImage({
  slug,
  title,
  image,
  className,
  priority,
  /** CSS object-position (e.g. "50% 70%"), for a crop that needs to favor
   *  one part of the photo over a plain center crop — the frame this image
   *  fills isn't always the photo's own aspect ratio. Defaults to center. */
  objectPosition,
  ref,
}: {
  slug: string;
  title: string;
  image?: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  if (image) {
    return (
      <div ref={ref} className={`relative overflow-hidden bg-ink ${className ?? ""}`}>
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      </div>
    );
  }

  return <PlaceholderImage ref={ref} seed={slug} className={className} />;
}

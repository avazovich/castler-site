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
  ref,
}: {
  slug: string;
  title: string;
  image?: string;
  className?: string;
  priority?: boolean;
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
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      </div>
    );
  }

  return <PlaceholderImage ref={ref} seed={slug} className={className} />;
}

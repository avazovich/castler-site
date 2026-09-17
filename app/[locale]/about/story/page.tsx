import { getLocale } from "next-intl/server";
import { permanentRedirect } from "@/i18n/navigation";

/**
 * /about/story never had finished content (placeholder copy only) and isn't
 * part of the current information architecture — the About page is the
 * canonical destination. Kept as a permanent redirect, rather than deleted
 * outright, so old links/bookmarks/indexed URLs land somewhere real instead
 * of 404ing.
 */
export default async function AboutStoryPage() {
  const locale = await getLocale();
  permanentRedirect({ href: "/about", locale });
}

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published content only, no drafts — this site has no preview mode.
  // useCdn: false reads straight from the live API rather than Sanity's
  // CDN, which caches for up to a minute — for a site where the whole
  // point is a non-technical editor seeing their change land, that lag is
  // worse than the small latency difference.
  useCdn: false,
  perspective: "published",
});

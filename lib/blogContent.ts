import { getLocale, getMessages } from "next-intl/server";
import { blogPosts, type BlogPost } from "@/content/blog";

type LocalizedBlogFields = { tag: string; title: string; date: string };

/**
 * Resolves the journal/blog post list in the current request locale,
 * falling back to the English copy in content/blog.ts for any post
 * missing a translation. Reads the raw messages object directly (not
 * t.raw) so a missing entry is a plain undefined instead of triggering
 * next-intl's MISSING_MESSAGE error.
 */
export async function getLocalizedBlogPosts(): Promise<BlogPost[]> {
  const locale = await getLocale();
  if (locale === "en") return blogPosts;

  const messages = await getMessages();
  const blog = messages.Blog as { posts?: Record<string, LocalizedBlogFields> } | undefined;
  return blogPosts.map((post) => {
    const raw = blog?.posts?.[post.slug];
    if (raw?.tag && raw?.title && raw?.date) return { ...post, ...raw };
    return post;
  });
}

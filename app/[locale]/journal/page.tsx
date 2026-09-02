import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimatedText } from "@/components/AnimatedText";
import { OfficeTeaser } from "@/components/OfficeTeaser";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getLocalizedBlogPosts } from "@/lib/blogContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Blog");
  return { title: `${t("heading")} — Castler` };
}

export default async function JournalPage() {
  const t = await getTranslations("Blog");
  const tHome = await getTranslations("Home");
  const posts = await getLocalizedBlogPosts();

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-10 sm:pt-28">
        <RevealOnScroll>
          <p className="label-mono text-ink-soft">{t("eyebrow")}</p>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">
            <AnimatedText text={t("heading")} />
          </h1>
          <p className="mt-4 max-w-lg text-ink-soft">{t("body")}</p>
          <p className="mt-2 max-w-lg text-sm italic text-ink-soft/70">{t("notice")}</p>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <RevealOnScroll key={post.slug} delay={Math.min(i * 0.05, 0.3)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <PlaceholderImage seed={post.seed} className="h-full w-full" />
                <span className="label-mono absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-paper backdrop-blur">
                  {post.tag}
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg leading-snug">{post.title}</h3>
              <p className="label-mono mt-2 text-ink-soft">{post.date}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <OfficeTeaser
        title={tHome("officeTeaserTitle")}
        body={tHome("officeTeaserBody")}
        cta={tHome("officeTeaserCta")}
      />
    </>
  );
}

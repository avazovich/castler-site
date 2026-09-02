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

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {posts.map((post, i) => (
            <RevealOnScroll key={post.slug} delay={Math.min(i * 0.05, 0.3)}>
              <div className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-lg transition-transform duration-200 active:scale-[0.98]">
                <PlaceholderImage
                  seed={post.seed}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3 w-fit max-w-[calc(100%-1.5rem)] translate-y-3 rounded-xl bg-ink/55 px-4 py-3 text-paper opacity-0 backdrop-blur-md transition-all duration-[600ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="label-mono truncate text-paper/70">
                    {post.tag} · {post.date}
                  </p>
                  <h3 className="font-display mt-1 text-lg leading-snug">{post.title}</h3>
                </div>
              </div>
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

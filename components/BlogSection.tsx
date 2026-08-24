"use client";

import { useRef } from "react";
import type { BlogPost } from "@/content/blog";
import { ArrowRightIcon } from "./icons";
import { PlaceholderImage } from "./PlaceholderImage";
import { RevealOnScroll } from "./RevealOnScroll";

export function BlogSection({
  eyebrow,
  heading,
  notice,
  posts,
}: {
  eyebrow: string;
  heading: string;
  notice: string;
  posts: BlogPost[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCards(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-mono text-ink-soft">{eyebrow}</p>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl">{heading}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollByCards(-1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:scale-110 hover:bg-paper-2 active:scale-90"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:scale-110 hover:bg-paper-2 active:scale-90"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </RevealOnScroll>
        <p className="mt-2 max-w-lg text-sm italic text-ink-soft/70">{notice}</p>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post, i) => (
            <RevealOnScroll key={post.slug} delay={Math.min(i * 0.05, 0.2)} className="w-[280px] shrink-0 sm:w-[340px]">
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
    </section>
  );
}

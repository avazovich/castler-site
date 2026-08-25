"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/content/projects";
import { ArrowRightIcon } from "./icons";
import { PlaceholderImage } from "./PlaceholderImage";

export type GalleryItem = { key: string; src?: string; width?: number; height?: number; seed?: string };

/**
 * Horizontal slider used for a project's images — real photos are placed at
 * their natural aspect ratio (height-bound, width auto) rather than cropped
 * into a fixed box, so a vertical shot stays vertical and a wide one stays
 * wide. Uses next/image (not a raw <img>) with each photo's real width/height
 * so Next can serve a compressed, appropriately-sized file instead of the
 * original multi-megabyte source — the width/height props only feed the
 * aspect ratio and srcset; CSS still controls the actual rendered size, so
 * nothing is cropped or stretched. Placeholder (non-real) slides fall back
 * to a fixed 4:3 box since a generated gradient has no "natural" size.
 */
export function ImageSlider({
  images,
  project,
  className,
  imageHeightClass = "h-full",
  showArrows = true,
}: {
  images: GalleryItem[];
  project: Project;
  className?: string;
  imageHeightClass?: string;
  showArrows?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={scrollerRef}
        data-lenis-prevent
        className="flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4 py-4 sm:gap-6 sm:px-6"
      >
        {images.map((item) =>
          item.src ? (
            <Image
              key={item.key}
              src={item.src}
              alt={project.title}
              width={item.width ?? 1600}
              height={item.height ?? 1200}
              sizes="80vw"
              className={`${imageHeightClass} w-auto shrink-0 snap-center rounded-xl object-contain`}
            />
          ) : (
            <div key={item.key} className={`${imageHeightClass} aspect-[4/3] shrink-0 snap-center`}>
              <PlaceholderImage seed={item.seed!} className="h-full w-full rounded-xl" />
            </div>
          ),
        )}
      </div>

      {showArrows && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-end gap-2 px-4 sm:px-6">
          <button
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink shadow-md transition-all duration-200 hover:scale-110 active:scale-90"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => scrollByAmount(1)}
            aria-label="Next"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink shadow-md transition-all duration-200 hover:scale-110 active:scale-90"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

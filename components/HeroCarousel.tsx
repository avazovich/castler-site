"use client";

import { motion, type PanInfo } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "./icons";
import { ProjectImage } from "./ProjectImage";

const SLIDE_DURATION_MS = 3000;

export function HeroCarousel({ slides }: { slides: Project[] }) {
  const t = useTranslations("Home");
  const tCategories = useTranslations("Categories");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  function handleDragEnd(_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const threshold = 80;
    if (info.offset.x < -threshold) setIndex((i) => (i + 1) % slides.length);
    else if (info.offset.x > threshold) setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  // Mobile (< sm): square corners, caption as its own card below the image.
  // Desktop (sm+): unchanged from before — rounded card, caption overlaid on
  // the photo. Only the mobile layout was ever meant to change here.
  return (
    <div className="relative">
      <div
        className="relative h-[72vh] min-h-[440px] w-full overflow-hidden rounded-t-2xl sm:h-[80vh] sm:min-h-[420px] sm:rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* All slides stay mounted and preloaded from the start, switching by
            opacity only (no transition property) — a true instant cut with no
            per-slide fetch/decode flash, rather than remounting the image on
            every rotation. */}
        {slides.map((s, i) => (
          <motion.div
            key={s.slug}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
            drag={i === index ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            <ProjectImage
              slug={s.slug}
              title={s.title}
              image={s.image}
              objectPosition={s.objectPosition}
              priority
              className="pointer-events-none h-full w-full"
            />
          </motion.div>
        ))}

        {/* Only needed at sm+, where the caption overlays the photo. */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-transparent to-transparent sm:block" />
      </div>

      <Link
        href={`/work/${slide.slug}`}
        className="flex flex-col gap-3 rounded-b-2xl bg-paper-2 px-5 py-4 text-ink transition-colors hover:bg-line sm:absolute sm:bottom-4 sm:left-4 sm:right-auto sm:w-[420px] sm:rounded-xl sm:bg-ink/85 sm:text-paper sm:backdrop-blur sm:hover:bg-ink"
      >
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <span key={s.slug} className="h-[2px] flex-1 overflow-hidden rounded-full bg-ink/12 sm:bg-paper/25">
              {i < index && <span className="block h-full w-full bg-ink/50 sm:bg-paper" />}
              {i === index && (
                <span
                  key={index}
                  className="block h-full origin-left bg-ink sm:bg-paper"
                  style={{
                    animation: `carousel-progress ${SLIDE_DURATION_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </span>
          ))}
        </div>

        {/* Stacked on mobile so the location never truncates mid-word to make
            room for the CTA pill beside it — there's no good short form for
            "ARCHITECTURE · NAMANGAN, UZBEKISTAN" at that width. From `sm` up
            there's enough room for the original single-row layout. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="font-display truncate text-lg">{slide.title}</p>
            <p className="label-mono text-ink-soft sm:text-paper/60 sm:truncate">
              {tCategories(slide.category)} · {slide.location}
            </p>
          </div>
          <span className="pill flex w-fit shrink-0 items-center gap-1.5 bg-ink text-paper sm:bg-paper sm:text-ink">
            {t("heroCta")}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}

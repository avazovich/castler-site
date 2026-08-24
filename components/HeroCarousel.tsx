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

  return (
    <div
      className="relative h-[80vh] min-h-[420px] w-full overflow-hidden rounded-2xl sm:h-[85vh] sm:rounded-3xl"
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
            priority
            className="pointer-events-none h-full w-full"
          />
        </motion.div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <Link
        href={`/work/${slide.slug}`}
        className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-3 rounded-xl bg-ink/85 px-5 py-4 text-paper backdrop-blur transition-colors hover:bg-ink sm:right-auto sm:w-[420px]"
      >
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <span key={s.slug} className="h-[2px] flex-1 overflow-hidden rounded-full bg-paper/25">
              {i < index && <span className="block h-full w-full bg-paper" />}
              {i === index && (
                <span
                  key={index}
                  className="block h-full origin-left bg-paper"
                  style={{
                    animation: `carousel-progress ${SLIDE_DURATION_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display truncate text-lg">{slide.title}</p>
            <p className="label-mono truncate text-paper/60">
              {tCategories(slide.category)} · {slide.location}
            </p>
          </div>
          <span className="pill flex shrink-0 items-center gap-1.5 bg-paper text-ink">
            {t("heroCta")}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}

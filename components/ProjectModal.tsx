"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Project } from "@/content/projects";
import { useLenis } from "lenis/react";
import { useRouter } from "@/i18n/navigation";
import { AnimatedText } from "./AnimatedText";
import { CloseIcon, GalleryIcon, PlusIcon } from "./icons";
import { ImageSlider, type GalleryItem } from "./ImageSlider";

type Labels = {
  location: string;
  category: string;
  year: string;
  gallery: string;
  readMore: string;
  close: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectModal({
  project,
  categoryLabel,
  labels,
  images,
  description,
}: {
  project: Project;
  categoryLabel: string;
  labels: Labels;
  images: GalleryItem[];
  description: string[];
}) {
  const router = useRouter();
  const lenis = useLenis();
  const [view, setView] = useState<"info" | "gallery">("info");
  const [expanded, setExpanded] = useState(false);

  const close = () => router.back();

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    lenis?.stop();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${view === "gallery" ? "" : "p-2 sm:p-6"}`}>
      <motion.button
        aria-label={labels.close}
        onClick={close}
        className="absolute inset-0 bg-ink/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <motion.div
        className={`relative z-10 flex w-full flex-col overflow-hidden bg-paper shadow-2xl lg:flex-row ${
          view === "gallery" ? "h-full max-w-none" : "h-[96vh] max-w-[1800px] rounded-[28px] lg:h-[90vh]"
        }`}
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.995 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {view === "info" ? (
          <>
            {/* Left: title, meta, description */}
            <div
              data-lenis-prevent
              className="flex max-h-[45vh] shrink-0 flex-col overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 lg:h-full lg:w-[420px] lg:max-h-none lg:py-10"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={close}
                  aria-label={labels.close}
                  className="pill flex items-center bg-paper-2 text-ink transition-colors hover:bg-line"
                >
                  <CloseIcon className="icon-rotate h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView("gallery")}
                  className="pill flex items-center gap-1.5 bg-paper-2 text-ink transition-colors hover:bg-line"
                >
                  <GalleryIcon className="h-3.5 w-3.5" />
                  {labels.gallery}
                </button>
              </div>

              <h1 className="font-display mt-8 text-3xl leading-tight sm:text-4xl">
                <AnimatedText text={project.title} />
              </h1>

              <div className="mt-6 space-y-1">
                <p className="label-mono text-ink-soft">{project.location}</p>
                <p className="label-mono text-ink-soft">{categoryLabel}</p>
                <p className="label-mono text-ink-soft">{project.year}</p>
              </div>

              <div className={`mt-6 space-y-4 text-ink-soft ${expanded ? "" : "line-clamp-5"}`}>
                {description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {!expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="label-mono mt-4 inline-flex items-center gap-1.5 self-start text-ink transition-all duration-200 hover:translate-x-0.5 hover:text-gold"
                >
                  {labels.readMore}
                  <PlusIcon className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Right: slidable strip, images at their real aspect ratio */}
            <ImageSlider
              images={images}
              project={project}
              className="min-h-0 flex-1 bg-paper-2 lg:h-full"
              imageHeightClass="h-[42vh] sm:h-[55vh] lg:h-full"
            />
          </>
        ) : (
          <div className="relative h-full w-full bg-ink">
            <button
              onClick={() => setView("info")}
              className="pill absolute left-4 top-4 z-10 flex items-center gap-1.5 bg-paper text-ink"
            >
              <CloseIcon className="icon-rotate h-3.5 w-3.5" />
              {labels.close}
            </button>
            <ImageSlider images={images} project={project} className="h-full" imageHeightClass="h-[75vh] sm:h-[82vh]" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

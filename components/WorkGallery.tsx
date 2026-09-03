"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import type { CardShape } from "@/lib/projectCardShape";
import { Link } from "@/i18n/navigation";
import { GridViewIcon, ListViewIcon } from "./icons";
import { ProjectCard } from "./ProjectCard";
import { ProjectImage } from "./ProjectImage";

type View = "grid" | "list";

/**
 * Tile span for one project, taken from the shape of the photo it shows
 * (resolved server-side in `shapes`) rather than a repeating pattern: a
 * portrait photo forced into a short, wide tile gets its subject cropped in
 * half, which is exactly what the fixed pattern used to do. With `auto-rows`
 * at 240px a 1x2 tile lands at ~0.81 and a 1x1 at ~1.65 — close enough to the
 * two shapes the photography comes in that `object-cover` only trims edges.
 * `grid-flow-dense` backfills the gaps the mix leaves behind.
 */
function tileSpan(shape: CardShape): string {
  return shape === "tall" ? "lg:row-span-2" : "";
}

/**
 * Below `lg` the mosaic gives way to a plain 1–2 column stack, where each card
 * is sized by its own photo's proportions instead of a shared row height —
 * that fits exactly at any width, which fixed rows can't.
 */
function cardAspect(shape: CardShape): string {
  return shape === "tall" ? "aspect-[4/5] lg:aspect-auto" : "aspect-[4/3] lg:aspect-auto";
}

export function WorkGallery({
  projects,
  shapes,
  categoryList,
  initialCategory,
  allLabel,
  categoryLabels,
}: {
  projects: Project[];
  /** Tile shape per project, index-aligned to `projects` (resolved server-side). */
  shapes: CardShape[];
  categoryList: ProjectCategory[];
  initialCategory?: ProjectCategory;
  allLabel: string;
  categoryLabels: Record<ProjectCategory, string>;
}) {
  const [active, setActive] = useState<ProjectCategory | "all">(initialCategory ?? "all");
  const [view, setView] = useState<View>("grid");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);
  // Keyed by slug, not index: filtering reorders the list the tiles render from.
  const shapeBySlug = new Map(projects.map((p, i) => [p.slug, shapes[i] ?? "tall"]));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <FilterTab label={allLabel} active={active === "all"} onClick={() => setActive("all")} />
          {categoryList.map((category) => (
            <FilterTab
              key={category}
              label={categoryLabels[category]}
              active={active === category}
              onClick={() => setActive(category)}
            />
          ))}
        </div>

        <div className="flex gap-1.5">
          <ViewToggleButton label="Grid view" active={view === "grid"} onClick={() => setView("grid")}>
            <GridViewIcon className="h-4 w-4" />
          </ViewToggleButton>
          <ViewToggleButton label="List view" active={view === "list"} onClick={() => setView("list")}>
            <ListViewIcon className="h-4 w-4" />
          </ViewToggleButton>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-flow-dense grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 lg:auto-rows-[220px] xl:auto-rows-[240px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  className={tileSpan(shapeBySlug.get(project.slug) ?? "tall")}
                >
                  <ProjectCard
                    project={project}
                    categoryLabel={categoryLabels[project.category]}
                    aspectClassName={cardAspect(shapeBySlug.get(project.slug) ?? "tall")}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-t border-line"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.3), ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:bg-paper-2 sm:gap-6 sm:py-5"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
                      <ProjectImage
                        slug={project.slug}
                        title={project.title}
                        image={project.image}
                        className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-display flex-1 text-base leading-tight sm:text-2xl">{project.title}</h3>
                    <p className="label-mono hidden text-ink-soft sm:block sm:w-36">
                      {categoryLabels[project.category]}
                    </p>
                    <p className="hidden text-sm text-ink-soft md:block md:w-48">{project.location}</p>
                    <p className="label-mono w-14 shrink-0 text-right text-ink-soft">{project.year}</p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`font-display text-lg transition-all duration-200 hover:scale-[1.04] sm:text-xl ${
        active ? "text-ink" : "text-ink-soft hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function ViewToggleButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-90 ${
        active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

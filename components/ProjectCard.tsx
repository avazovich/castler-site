"use client";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import { ProjectImage } from "./ProjectImage";

export function ProjectCard({
  project,
  categoryLabel,
  className,
  aspectClassName = "aspect-[4/3] md:aspect-auto",
  imageOverride,
}: {
  project: Project;
  categoryLabel: string;
  className?: string;
  aspectClassName?: string;
  /** Show a different photo than `project.image` for this listing — e.g. a
   *  distinct cover for the home grid vs. the work page. */
  imageOverride?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative block overflow-hidden rounded-lg ${aspectClassName} ${className ?? ""}`}
    >
      <ProjectImage
        slug={project.slug}
        title={project.title}
        image={imageOverride ?? project.image}
        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute bottom-3 left-3 w-fit max-w-[calc(100%-1.5rem)] translate-y-3 rounded-xl bg-ink/55 px-4 py-3 text-paper opacity-0 backdrop-blur-md transition-all duration-[600ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="label-mono truncate text-paper/70">
          {categoryLabel} · {project.year}
        </p>
        <h3 className="font-display mt-1 truncate text-lg">{project.title}</h3>
        <p className="truncate text-xs text-paper/60">{project.location}</p>
      </div>
    </Link>
  );
}

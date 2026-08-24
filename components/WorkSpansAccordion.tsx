"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { ProjectCategory } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "./icons";
import { PlaceholderImage } from "./PlaceholderImage";

export function WorkSpansAccordion({ categoryList }: { categoryList: ProjectCategory[] }) {
  const tCategories = useTranslations("Categories");
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex h-[380px] gap-2 sm:h-[520px]">
      {categoryList.map((category, i) => {
        const active = hovered === i;
        const dimmed = hovered !== null && !active;
        return (
          <Link
            key={category}
            href={`/work/category/${category}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex min-w-0 flex-col"
            style={{
              flexGrow: hovered === null ? 1 : active ? 2.6 : 0.5,
              flexBasis: 0,
              transition: "flex-grow 750ms cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          >
            <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl">
              <PlaceholderImage
                seed={category}
                className={`absolute inset-0 h-full w-full transition-all duration-700 ease-out ${
                  active ? "scale-[1.06]" : dimmed ? "scale-100 brightness-[0.55] saturate-[0.65]" : "scale-100"
                }`}
              />
            </div>
            <span className="mt-4 flex items-center gap-2">
              <span
                className={`font-display whitespace-nowrap text-lg transition-colors duration-300 sm:text-xl ${
                  dimmed ? "text-ink-soft" : "text-ink"
                }`}
              >
                {tCategories(category)}
              </span>
              <ArrowRightIcon
                className={`h-4 w-4 shrink-0 text-gold transition-all duration-500 ease-out ${
                  active ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0"
                }`}
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

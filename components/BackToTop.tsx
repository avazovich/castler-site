"use client";

import { useLenis } from "lenis/react";
import { ArrowRightIcon } from "./icons";

export function BackToTop() {
  const lenis = useLenis();

  return (
    <button
      onClick={() => lenis?.scrollTo(0, { duration: 1.2 })}
      aria-label="Back to top"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink transition-all duration-200 hover:-translate-y-1 hover:scale-110 hover:bg-paper active:scale-95"
    >
      <ArrowRightIcon className="h-4 w-4 -rotate-90" />
    </button>
  );
}

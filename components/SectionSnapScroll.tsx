"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

/**
 * Deliberate, one-gesture-per-section scroll: a decisive wheel tick jumps to
 * the next/previous `[data-snap]` section and locks input until the animation
 * finishes, like Apple/Stripe-style full-page scrolling. Sections marked
 * `[data-snap-free]` (the tall featured-work grid) are exempted while the
 * viewport center sits inside them, so that content can be browsed normally —
 * only the short, single-screen sections snap.
 *
 * Disabled on touch/small screens and under prefers-reduced-motion, where a
 * hijacked scroll gesture reads as broken rather than deliberate.
 */
export function SectionSnapScroll() {
  const lenis = useLenis();
  const locked = useRef(false);

  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) return;
    const lenisInstance = lenis;

    function navOffset() {
      const nav = document.querySelector("header");
      return nav ? nav.getBoundingClientRect().height : 0;
    }

    function getSections() {
      return Array.from(document.querySelectorAll<HTMLElement>("[data-snap]"))
        .map((el) => ({ el, top: el.getBoundingClientRect().top + window.scrollY - navOffset() }))
        .sort((a, b) => a.top - b.top);
    }

    function insideFreeZone(scrollY: number) {
      const centerY = scrollY + window.innerHeight / 2;
      const zones = document.querySelectorAll<HTMLElement>("[data-snap-free]");
      for (const zone of zones) {
        const rect = zone.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        if (centerY > top && centerY < bottom) return true;
      }
      return false;
    }

    function onWheel(e: WheelEvent) {
      if (locked.current) {
        e.preventDefault();
        return;
      }

      const y = window.scrollY;
      if (insideFreeZone(y)) return;

      const sections = getSections();
      if (!sections.length) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      let targetIdx = -1;
      if (dir > 0) {
        targetIdx = sections.findIndex((s) => s.top > y + 2);
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].top < y - 2) {
            targetIdx = i;
            break;
          }
        }
      }
      if (targetIdx === -1) return;

      e.preventDefault();
      locked.current = true;
      // Safety net: if onComplete is ever missed (interrupted animation,
      // Lenis edge case), don't leave wheel input permanently locked.
      const unlockTimer = window.setTimeout(() => {
        locked.current = false;
      }, 1400);
      lenisInstance.scrollTo(sections[targetIdx].top, {
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        onComplete: () => {
          window.clearTimeout(unlockTimer);
          locked.current = false;
        },
      });
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [lenis]);

  return null;
}

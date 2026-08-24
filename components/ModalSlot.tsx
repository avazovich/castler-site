"use client";

import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the @modal parallel-route slot in AnimatePresence so ProjectModal's
 * `exit` animation gets to play before the route swaps the slot to its
 * `default.tsx` (null) on close, instead of vanishing instantly.
 */
export function ModalSlot({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

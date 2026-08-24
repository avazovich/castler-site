"use client";

import { motion } from "motion/react";

/**
 * Splits text into words, each masked behind its own overflow-hidden wrapper
 * and slid up into place on scroll — the word-by-word reveal used for major
 * headlines and the founder quote. `pb`/`-mb` on the mask compensates for
 * descenders (g, y, p) that would otherwise clip against the mask edge.
 */
export function AnimatedText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block -mb-[0.2em] overflow-hidden pb-[0.2em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.025 }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

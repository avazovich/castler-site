"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ProjectImage } from "./ProjectImage";

export function ParallaxImage({
  slug,
  title,
  image,
  className,
}: {
  slug: string;
  title: string;
  image?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <ProjectImage slug={slug} title={title} image={image} priority className="h-full w-full" />
      </motion.div>
    </div>
  );
}

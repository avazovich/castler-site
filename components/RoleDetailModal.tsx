"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { useRouter } from "@/i18n/navigation";
import { RoleDetailContent } from "./RoleDetailContent";
import { CloseIcon } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function RoleDetailModal({
  closeLabel,
  ...contentProps
}: { closeLabel: string } & React.ComponentProps<typeof RoleDetailContent>) {
  const router = useRouter();
  const lenis = useLenis();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      <motion.button
        aria-label={closeLabel}
        onClick={close}
        className="absolute inset-0 bg-ink/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <motion.div
        data-lenis-prevent
        className="relative z-10 h-[96vh] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-paper shadow-2xl lg:h-[90vh]"
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.995 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="sticky top-0 z-10 bg-paper/90 px-6 py-4 backdrop-blur sm:px-10">
          <button
            onClick={close}
            aria-label={closeLabel}
            className="pill flex items-center bg-paper-2 text-ink transition-colors hover:bg-line"
          >
            <CloseIcon className="icon-rotate h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-6 pb-16 sm:px-10">
          <RoleDetailContent {...contentProps} />
        </div>
      </motion.div>
    </div>
  );
}

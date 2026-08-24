"use client";

import * as Popover from "@radix-ui/react-popover";
import { useLocale } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ChevronDownIcon } from "./icons";

const LABELS: Record<string, string> = { en: "EN", uz: "UZ", ru: "RU" };

export function LanguageSwitch({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={`pill flex items-center gap-1 border shadow-sm backdrop-blur ${
            tone === "cream"
              ? "border-paper/30 bg-transparent text-paper hover:bg-paper/10"
              : "border-line bg-paper/90 text-ink hover:bg-ink hover:text-paper"
          }`}
        >
          {LABELS[locale]}
          <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" sideOffset={10} className="z-50">
          <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-xl">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => {
                  router.replace(pathname, { locale: l });
                  setOpen(false);
                }}
                className={`block w-full px-5 py-2.5 text-left text-sm transition-colors ${
                  l === locale ? "bg-ink text-paper" : "text-ink hover:bg-paper-2"
                }`}
              >
                {LABELS[l]}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", uz: "UZ", ru: "RU" };

export function FooterLanguageRow() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 text-xs">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-3">
          {i > 0 && <span className="text-paper/30">·</span>}
          <button
            onClick={() => router.replace(pathname, { locale: l })}
            className={l === locale ? "text-paper" : "text-paper/50 hover:text-paper/80"}
          >
            {LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}

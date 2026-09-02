"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./icons";

export function ShareButton({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently no-op rather than throw.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:bg-paper-2 active:scale-[0.97]"
    >
      {copied ? copiedLabel : label}
      {!copied && <ArrowRightIcon className="h-4 w-4 rotate-[-45deg] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </button>
  );
}

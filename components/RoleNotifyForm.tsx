"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function RoleNotifyForm({
  heading,
  placeholder,
  submitLabel,
  consent,
}: {
  heading: string;
  placeholder: string;
  submitLabel: string;
  consent: string;
}) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("careers_notify_signup");
    window.location.href = `mailto:hello@castler.uz?subject=${encodeURIComponent(
      "Notify me about new roles",
    )}&body=${encodeURIComponent(`Please notify ${email} when a new role opens at Castler.`)}`;
  }

  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-6">
      <p className="text-sm font-medium leading-snug text-ink">{heading}</p>
      <form onSubmit={handleSubmit} className="mt-4 flex overflow-hidden rounded-full border border-line bg-paper">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft"
        />
        <button
          type="submit"
          className="shrink-0 whitespace-nowrap bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-paper transition-opacity hover:opacity-85"
        >
          {submitLabel}
        </button>
      </form>
      <p className="mt-3 text-xs text-ink-soft">{consent}</p>
    </div>
  );
}

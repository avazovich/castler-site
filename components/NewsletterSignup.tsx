"use client";

import { useState } from "react";

export function NewsletterSignup({ signUpLabel }: { signUpLabel: string }) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `mailto:hello@castler.uz?subject=${encodeURIComponent(
      "Newsletter signup",
    )}&body=${encodeURIComponent(`Please add ${email} to the Castler mailing list.`)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex overflow-hidden rounded-full bg-paper/10">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-paper outline-none placeholder:text-paper/40"
      />
      <button
        type="submit"
        className="shrink-0 whitespace-nowrap bg-paper px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-ink transition-opacity hover:opacity-85"
      >
        {signUpLabel}
      </button>
    </form>
  );
}

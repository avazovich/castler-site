"use client";

import { useState } from "react";

export function ContactForm({
  labels,
}: {
  labels: { name: string; email: string; message: string; submit: string; hint: string };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:hello@castler.uz?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="label-mono text-ink-soft">
          {labels.name}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="email" className="label-mono text-ink-soft">
          {labels.email}
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="message" className="label-mono text-ink-soft">
          {labels.message}
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="mt-2 w-full resize-none border-b border-line bg-transparent py-2 text-lg outline-none transition-colors focus:border-ink"
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium uppercase tracking-wide text-paper transition-all duration-200 hover:scale-[1.02] hover:opacity-85 active:scale-[0.98] sm:w-auto sm:py-3"
        >
          {labels.submit}
        </button>
        <p className="mt-3 text-xs text-ink-soft">{labels.hint}</p>
      </div>
    </form>
  );
}

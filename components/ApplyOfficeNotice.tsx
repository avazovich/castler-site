/**
 * The one thing an applicant from another city must not miss: the office is in
 * Namangan and the work is done there in person. Shown large above the fold
 * and compact next to the "where are you from" question, so it is read before
 * anyone spends three minutes on the form.
 */
export function ApplyOfficeNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border border-gold/50 bg-gold/10 ${
        compact ? "px-4 py-3" : "px-5 py-4"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`mt-0.5 shrink-0 text-gold-light ${compact ? "h-4 w-4" : "h-6 w-6"}`}
      >
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <div>
        <p className={`font-medium leading-snug text-paper ${compact ? "text-sm" : "text-lg"}`}>
          Ofisimiz Namangan shahrida — ish offline, ofisda.
        </p>
        <p className={`mt-1 text-paper/60 ${compact ? "text-xs" : "text-sm"}`}>
          Masofaviy (remote) ish yo&apos;q: jamoa ofisda birga ishlaydi.
        </p>
      </div>
    </div>
  );
}

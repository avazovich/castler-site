function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Stand-in artwork used until real project photography is ready. Deterministic
 * per `seed` (e.g. a project slug) so the same project always renders the same
 * gradient/angle instead of a random one on every render.
 */
export function PlaceholderImage({
  seed,
  label,
  className,
  ref,
}: {
  seed: string;
  label?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const h = hashSeed(seed);
  const angle = 15 + (h % 90);
  const midStop = 30 + (h % 30);
  const patternId = `castler-lines-${h}`;

  return (
    <div ref={ref} className={`relative overflow-hidden bg-ink ${className ?? ""}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${angle}deg, var(--ink) 0%, var(--ink-2) ${midStop}%, var(--gold) 145%)`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.22]" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern
            id={patternId}
            width="36"
            height="36"
            patternTransform={`rotate(${angle})`}
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="36" stroke="var(--paper)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      {/* soft off-center glow so large tiles read as an image, not a flat block */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(60% 50% at ${20 + (h % 60)}% ${20 + ((h >> 3) % 60)}%, color-mix(in srgb, var(--gold) 30%, transparent) 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
      {label && (
        <span className="label-mono absolute bottom-3 left-4 text-paper/75">{label}</span>
      )}
    </div>
  );
}

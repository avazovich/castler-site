"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Classic "sticky footer reveal": the footer sits fixed behind everything at
 * the bottom of the viewport. The rest of the page (navbar + main content) is
 * an opaque white panel stacked above it, with bottom MARGIN equal to the
 * footer's height. Margin (not padding) is required here: padding is inside
 * the panel's own border box and gets painted with its opaque background, so
 * it would hide the footer completely instead of revealing it. Margin sits
 * outside the box and is transparent, so scrolling into it uncovers the fixed
 * footer underneath. The "gate" is the page itself, not a separate layer.
 *
 * A bare margin-bottom on the last in-flow child of <body> can collapse
 * through to body's own edge and silently fail to extend the document's
 * scroll height — <body> carries `flow-root` (see app/[locale]/layout.tsx)
 * to establish a block formatting context and stop that collapse.
 *
 * The initial height is measured synchronously in useLayoutEffect (not just
 * via ResizeObserver's async callback) so the reserved space is correct on
 * first paint rather than only after a later resize notification.
 */
export function FooterRevealLayout({ footer, children }: { footer: ReactNode; children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const measure = () => setFooterHeight(el.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        {footer}
      </div>
      <div
        className="relative z-10 flex min-h-full flex-col bg-paper"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </div>
    </>
  );
}

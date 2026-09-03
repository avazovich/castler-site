"use client";

import { trackEvent } from "@/lib/analytics";

/** A plain <a> that fires a GA4 event on click before navigating away — for
 *  lead-generation actions (phone, email, Telegram apply) that live inside
 *  otherwise-server-rendered pages. */
export function TrackedLink({
  href,
  eventName,
  eventParams,
  children,
  className,
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  eventName: string;
  eventParams?: Record<string, unknown>;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  );
}

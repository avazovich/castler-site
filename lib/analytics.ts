/** Fires a GA4 custom event. Safe to call from anywhere — no-ops if gtag hasn't loaded yet. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

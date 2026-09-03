"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/siteConfig";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Loads gtag.js once, then fires an explicit page_view on every render of
 * this effect (initial load included — the bootstrap config call below
 * disables gtag's own automatic pageview via send_page_view: false, so
 * there's exactly one source of truth for page views instead of two).
 * This avoids relying on gtag's history-based auto-tracking, which can miss
 * transitions in apps with custom route-change animation (this site's
 * PageTransition + Lenis).
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

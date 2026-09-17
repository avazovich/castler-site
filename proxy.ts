import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const LOCALE_PREFIX_RE = new RegExp(`^/(${routing.locales.join("|")})(?:/|$)`);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy, non-locale-prefixed URLs (old links, bookmarks, previously
  // indexed pages — e.g. "/about", "/work/afsona-mall") must land on a
  // single, deterministic destination: the English version, via a
  // permanent redirect. This intentionally bypasses next-intl's own
  // Accept-Language-based locale detection for this case, since SEO
  // redirects need to be the same for every visitor and every crawler, not
  // vary by browser language.
  if (!LOCALE_PREFIX_RE.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${routing.defaultLocale}` : `/${routing.defaultLocale}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip API routes, Next internals, static files (images, fonts, etc.), and
  // /apply — a standalone, no-locale-prefix ad landing page that lives
  // outside the [locale] tree on purpose (see app/apply/layout.tsx), so it
  // must never get locale-redirected or wrapped in the main site chrome.
  matcher: ["/((?!api|_next|_vercel|apply|.*\\..*).*)"],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, static files (images, fonts, etc.), and
  // /apply — a standalone, no-locale-prefix ad landing page that lives
  // outside the [locale] tree on purpose (see app/apply/layout.tsx), so it
  // must never get locale-redirected or wrapped in the main site chrome.
  matcher: ["/((?!api|_next|_vercel|apply|.*\\..*).*)"],
};

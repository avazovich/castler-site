import { routing } from "@/i18n/routing";

// www is the canonical host — the bare apex domain 308-redirects here, so
// every URL we emit (sitemap, robots, canonical, structured data) should
// point straight at the final destination rather than through a redirect.
export const SITE_URL = "https://www.castler.uz";

/**
 * Per-locale canonical + hreflang alternates for a path under [locale].
 * Each locale must self-canonicalize (never collapse to one "shared" URL)
 * — otherwise Google treats the other locales as duplicates of whichever
 * one the bare/no-locale URL redirects to and drops them from the index.
 */
export function localizedAlternates(locale: string, path = "") {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
  };
}
export const INSTAGRAM_URL = "https://www.instagram.com/castler.uz";
export const FOUNDING_YEAR = "2013";
export const FOUNDER_NAME = "Otabek Isoqjonov";
// Otabek's personal account (395K followers as of Sep 2026, bio: "@castler.uz
// asoschi") — kept separate from INSTAGRAM_URL (the company account) since
// they're different profiles. Used as a sameAs on the founder's Person
// schema and in the About narrative, so Google/LLMs can tie the company to
// an independently-recognized public figure rather than just a claimed name.
export const FOUNDER_INSTAGRAM_URL = "https://www.instagram.com/otabekmemor/";
export const AREA_REALIZED = "~200,000 m²";
export const GA_MEASUREMENT_ID = "G-SGD7GM3MFT";

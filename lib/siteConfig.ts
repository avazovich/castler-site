// www is the canonical host — the bare apex domain 308-redirects here, so
// every URL we emit (sitemap, robots, canonical, structured data) should
// point straight at the final destination rather than through a redirect.
export const SITE_URL = "https://www.castler.uz";
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

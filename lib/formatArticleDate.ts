/** Month + year, localized (e.g. "September 2026" / "sentyabr 2026"). */
export function formatArticleDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(iso));
}

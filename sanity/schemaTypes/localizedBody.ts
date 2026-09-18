import { defineType } from "sanity";

const bodyArray = {
  type: "array" as const,
  of: [{ type: "articleHeading" }, { type: "articleParagraph" }, { type: "articleQuote" }],
};

/** An article's body — same optional-Uzbek/Russian, falls-back-to-English
 *  pattern as the other localized* types, applied to the whole block array. */
export default defineType({
  name: "localizedBody",
  title: "Localized body",
  type: "object",
  fields: [
    { name: "en", title: "English", ...bodyArray, validation: (Rule) => Rule.required().min(1) },
    { name: "uz", title: "Uzbek (optional — falls back to English)", ...bodyArray },
    { name: "ru", title: "Russian (optional — falls back to English)", ...bodyArray },
  ],
});

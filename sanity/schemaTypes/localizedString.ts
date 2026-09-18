import { defineType } from "sanity";

/**
 * One-line text with an English original plus optional Uzbek/Russian
 * overrides — falls back to English when untranslated (see the `resolve`
 * helper in content/projects.ts / content/articles.ts).
 */
export default defineType({
  name: "localizedString",
  title: "Localized text",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() },
    { name: "uz", title: "Uzbek (optional — falls back to English)", type: "string" },
    { name: "ru", title: "Russian (optional — falls back to English)", type: "string" },
  ],
  preview: { select: { title: "en" } },
});

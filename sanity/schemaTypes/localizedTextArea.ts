import { defineType } from "sanity";

/** Multi-line text (a paragraph), same fallback-to-English behavior as localizedString. */
export default defineType({
  name: "localizedTextArea",
  title: "Localized paragraph",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "text", rows: 4, validation: (Rule) => Rule.required() },
    { name: "uz", title: "Uzbek (optional — falls back to English)", type: "text", rows: 4 },
    { name: "ru", title: "Russian (optional — falls back to English)", type: "text", rows: 4 },
  ],
  preview: { select: { title: "en" } },
});

import { defineType } from "sanity";

/**
 * A project's description — an array of paragraph strings — with the same
 * optional Uzbek/Russian override pattern as the other localized* types.
 */
export default defineType({
  name: "localizedStringList",
  title: "Localized paragraphs",
  type: "object",
  fields: [
    {
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "uz",
      title: "Uzbek (optional — falls back to English)",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    },
    {
      name: "ru",
      title: "Russian (optional — falls back to English)",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    },
  ],
});

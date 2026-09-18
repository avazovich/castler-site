import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "News article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["projects", "philosophy", "company"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", type: "localizedTextArea", validation: (Rule) => Rule.required() }),
    defineField({ name: "metaTitle", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "metaDescription",
      type: "localizedTextArea",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "body", type: "localizedBody", validation: (Rule) => Rule.required() }),
    defineField({
      name: "related",
      title: "Related articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }], weak: true }],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "category" },
  },
});

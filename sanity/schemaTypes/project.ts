import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      description: 'e.g. "Namangan, Uzbekistan" — same for every language.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "year", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["architecture", "interior", "urban", "concept"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "summary", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      type: "localizedStringList",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main photo",
      type: "image",
      description: "Used on the project's own page and most listing tiles.",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImage",
      title: "Home grid photo (optional)",
      type: "image",
      description: "Only needed if the Home featured grid should show a different photo than the main one.",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "galleryCount",
      title: "Gallery slot count",
      type: "number",
      description: "How many gallery slots this project has in total, including any not yet photographed.",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});

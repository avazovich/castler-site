import { defineField, defineType } from "sanity";

/**
 * A singleton (see sanity/structure.ts, which hides "Create new" for this
 * type and only ever opens this one document) — controls which projects
 * appear on the Home page, and in what order. Tile size in the featured
 * grid stays automatic (derived from each photo's own shape), not editable
 * here, by design.
 */
export default defineType({
  name: "homeSettings",
  title: "Home page settings",
  type: "document",
  fields: [
    defineField({
      name: "heroProjects",
      title: "Hero carousel",
      description: "Projects shown in the swipeable hero banner, in this order.",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          fields: [
            { name: "project", type: "reference", to: [{ type: "project" }], validation: (Rule) => Rule.required() },
            {
              name: "imageOverride",
              title: "Different photo for this banner (optional)",
              type: "image",
              options: { hotspot: true },
              description: "Only needed if the project's main photo isn't the right shape for this wide banner.",
            },
            {
              name: "objectPositionOverride",
              title: "Crop focus override (optional)",
              type: "string",
              description: 'e.g. "50% 80%" — only needed together with a photo override above.',
            },
          ],
          preview: {
            select: { title: "project.title", media: "project.image" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured grid",
      description: "Projects shown in the Home page's mosaic grid, in this order.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page settings" }),
  },
});

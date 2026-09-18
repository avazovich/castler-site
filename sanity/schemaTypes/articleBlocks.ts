import { defineType } from "sanity";

/** The three block kinds an article body is built from — matches
 *  content/articles.ts's ArticleBlock union exactly. */
export const headingBlock = defineType({
  name: "articleHeading",
  title: "Heading",
  type: "object",
  fields: [{ name: "text", type: "string", validation: (Rule) => Rule.required() }],
  preview: { select: { title: "text" }, prepare: ({ title }) => ({ title: `Heading: ${title}` }) },
});

export const paragraphBlock = defineType({
  name: "articleParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    { name: "text", type: "text", rows: 4, validation: (Rule) => Rule.required() },
    {
      name: "linkText",
      title: "Link text (optional)",
      type: "string",
      description: "Words inside the paragraph that should link to another article.",
    },
    {
      name: "linkSlug",
      title: "Linked article (optional)",
      type: "reference",
      to: [{ type: "article" }],
      weak: true,
      hidden: ({ parent }) => !parent?.linkText,
    },
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: `Paragraph: ${String(title).slice(0, 60)}…` }),
  },
});

export const quoteBlock = defineType({
  name: "articleQuote",
  title: "Quote",
  type: "object",
  fields: [
    { name: "text", type: "text", rows: 2, validation: (Rule) => Rule.required() },
    { name: "attribution", title: "Attribution (optional)", type: "string" },
  ],
  preview: { select: { title: "text" }, prepare: ({ title }) => ({ title: `Quote: ${title}` }) },
});

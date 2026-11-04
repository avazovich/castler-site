import { defineType } from "sanity";

/** The block kinds an article body is built from — matches
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
    {
      name: "links",
      title: "Other links in this paragraph (optional)",
      description:
        'Words that must appear exactly as written in the text above. Address is a page on this site (e.g. "/about", "/contact", "/news/some-article") or a full https:// link to another website.',
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", title: "Words to link", type: "string", validation: (Rule) => Rule.required() },
            {
              name: "href",
              title: "Address",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  !value || /^(\/|https:\/\/)/.test(String(value))
                    ? true
                    : 'Start with "/" for a page on this site, or "https://" for another website.',
                ),
            },
          ],
          preview: { select: { title: "text", subtitle: "href" } },
        },
      ],
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

export const listBlock = defineType({
  name: "articleList",
  title: "List",
  type: "object",
  fields: [
    {
      name: "ordered",
      title: "Numbered list",
      type: "boolean",
      initialValue: false,
      description: "Off = bullet points. On = 1, 2, 3…",
    },
    {
      name: "items",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "lead",
              title: "Bold opening words (optional)",
              type: "string",
              description: 'e.g. "Hudud:" — shown in bold before the text.',
            },
            { name: "text", type: "text", rows: 2, validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: "lead", subtitle: "text" } },
        },
      ],
    },
  ],
  preview: {
    select: { items: "items", ordered: "ordered" },
    prepare: ({ items, ordered }) => ({
      title: `${ordered ? "Numbered list" : "List"}: ${(items ?? []).length} items`,
    }),
  },
});

export const imageBlock = defineType({
  name: "articleImage",
  title: "Image",
  type: "object",
  fields: [
    { name: "image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() },
    {
      name: "alt",
      title: "Alt text (describes the picture — required for search engines)",
      type: "string",
      validation: (Rule) => Rule.required().min(10),
    },
    { name: "caption", title: "Caption (optional)", type: "string" },
  ],
  preview: {
    select: { title: "alt", media: "image" },
    prepare: ({ title, media }) => ({ title: `Image: ${title}`, media }),
  },
});

export const faqBlock = defineType({
  name: "articleFaq",
  title: "FAQ (questions & answers)",
  type: "object",
  description:
    "Shown as expandable questions on the page and also given to Google and AI assistants as structured data.",
  fields: [
    {
      name: "items",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", validation: (Rule) => Rule.required() },
            { name: "answer", type: "text", rows: 3, validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    },
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({ title: `FAQ: ${(items ?? []).length} questions` }),
  },
});

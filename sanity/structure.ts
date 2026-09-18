import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk structure: homeSettings is a singleton (one document, "Home
 * page settings", editable but never duplicated or deleted via the UI) — a
 * regular document-type list would let editors create multiple "Home
 * settings" documents, which makes no sense for a page that only has one.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page settings")
        .id("homeSettings")
        .child(
          S.document()
            .schemaType("homeSettings")
            .documentId("homeSettings")
            .title("Home page settings"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("article").title("News articles"),
    ]);

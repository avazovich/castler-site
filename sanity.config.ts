import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const SINGLETON_TYPES = new Set(["homeSettings"]);

export default defineConfig({
  name: "castler",
  title: "Castler",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Home page settings is a singleton (see sanity/structure.ts) — exclude
    // it from the global "create new document" menu and from "duplicate",
    // so there's no way to end up with a second one by accident.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter((action) => action.action !== "duplicate")
        : prev,
  },
});

import type { SchemaTypeDefinition } from "sanity";
import article from "./article";
import { faqBlock, headingBlock, imageBlock, listBlock, paragraphBlock, quoteBlock } from "./articleBlocks";
import homeSettings from "./homeSettings";
import localizedBody from "./localizedBody";
import localizedString from "./localizedString";
import localizedStringList from "./localizedStringList";
import localizedTextArea from "./localizedTextArea";
import project from "./project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    article,
    homeSettings,
    localizedString,
    localizedTextArea,
    localizedStringList,
    localizedBody,
    headingBlock,
    paragraphBlock,
    quoteBlock,
    listBlock,
    imageBlock,
    faqBlock,
  ],
};

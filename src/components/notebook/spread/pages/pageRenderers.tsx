import type { ReactElement } from "react";

import type { NotebookNote } from "@/data/notebook/notebookOne";
import type { NotebookPageDefinition } from "@/data/notebook/pages";
import type { NotebookSpreadDefinition } from "@/data/notebook/spreadDefinitions";

import { StandardNotebookPage } from "./StandardNotebookPage";
import { HiddenLayerPage } from "./HiddenLayerPage";
import { ContinuationSupportPage } from "./ContinuationSupportPage";

export type PageRenderContext = {
  pageDefinition: NotebookPageDefinition;
  notes: NotebookNote[];
  spread: NotebookSpreadDefinition;
  pageNumber: number;
};

type PageRenderer = (context: PageRenderContext) => ReactElement;

const standardPage: PageRenderer = ({ pageDefinition, notes, spread, pageNumber }) => (
  <StandardNotebookPage
    title={pageDefinition.title}
    pageNumber={pageNumber}
    notes={notes}
    components={pageDefinition.components}
    provenance={pageDefinition.provenance}
    paperTone={spread.paperTone}
    residueDensity={spread.residueDensity}
  />
);

/**
 * Maps an authored notebook page's role to the component that renders it.
 * This is the data-defined replacement for the previous component-level
 * ternary chain: adding a new special-case page layout means registering
 * a renderer here rather than branching inside the reader.
 *
 * Roles not present in this map fall back to the default
 * StandardNotebookPage shell.
 */
const pageRenderersByRole: Partial<
  Record<NotebookPageDefinition["role"], PageRenderer>
> = {
  "recovered-rules": () => <HiddenLayerPage />,
  "continuation-support": ({ notes, spread }) => (
    <ContinuationSupportPage notes={notes} residueDensity={spread.residueDensity} />
  ),
};

export function renderNotebookPage(context: PageRenderContext): ReactElement {
  const renderer = pageRenderersByRole[context.pageDefinition.role] ?? standardPage;
  return renderer(context);
}

import { getArchiveDocument } from "./archiveDocuments";
import { getNotebookPage } from "@/data/notebook/pages";

export function getDocumentPages(documentId: string) {
  const document = getArchiveDocument(documentId);

  return document.pageIds.map((pageId) => getNotebookPage(pageId));
}

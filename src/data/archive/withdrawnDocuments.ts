const withdrawnDocumentIds = new Set<string>(["eli-interview-note"]);

export function isWithdrawnDocument(id: string) {
  return withdrawnDocumentIds.has(id);
}

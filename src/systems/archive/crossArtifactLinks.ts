export type CrossArtifactLink = {
  id: string;
  fromDocumentId: string;
  toDocumentId: string;
  relationship:
    | "recovered-beside"
    | "copied-after"
    | "contaminated-by"
    | "reconstructed-against"
    | "ethically-adjacent";
  confidence: "low" | "medium" | "high" | "unknown";
  note: string;
};

export const crossArtifactLinks: CrossArtifactLink[] = [
  {
    id: "link-notebook-flood-001",
    fromDocumentId: "notebook-one-shared",
    toDocumentId: "flood-recovery-packet-001",
    relationship: "contaminated-by",
    confidence: "medium",
    note:
      "Notebook map edges appear to have been reviewed against flood recovery fragments.",
  },
  {
    id: "link-flood-mara-001",
    fromDocumentId: "flood-recovery-packet-001",
    toDocumentId: "mara-private-journal-fragment",
    relationship: "recovered-beside",
    confidence: "low",
    note:
      "Private journal material appears in recovery handling notes, but original adjacency is not reliable.",
  },
  {
    id: "link-meeting-flood-001",
    fromDocumentId: "council-meeting-fragments",
    toDocumentId: "flood-recovery-packet-001",
    relationship: "reconstructed-against",
    confidence: "unknown",
    note:
      "Meeting fragments may have been reorganized using packet labels added after drying.",
  },
  {
    id: "link-flood-mara-002",
    fromDocumentId: "flood-recovery-packet-001",
    toDocumentId: "mara-private-journal-fragment",
    relationship: "ethically-adjacent",
    confidence: "medium",
    note:
      "Recovery placed this packet close enough to private material that handling one now implicates handling the other.",
  },
  {
    id: "link-flood-archivist-note-001",
    fromDocumentId: "flood-recovery-packet-001",
    toDocumentId: "archivist-internal-note-001",
    relationship: "contaminated-by",
    confidence: "medium",
    note:
      "Written during the second flood packet review. The packet's uncertainty appears to have carried into material that was never meant to enter the index.",
  },
];

export function getLinksForDocument(documentId: string) {
  return crossArtifactLinks.filter(
    (link) =>
      link.fromDocumentId === documentId || link.toDocumentId === documentId
  );
}

export type ArchivistFingerprint = {
  id: string;
  documentId: string;
  markType:
    | "crossed-label"
    | "provenance-rewrite"
    | "uncertainty-grade"
    | "temporary-grouping"
    | "relationship-downgrade"
    | "exhaustion-copy";
  label: string;
  text: string;
  emotionalLeak?: string;
};

export const archivistFingerprints: ArchivistFingerprint[] = [
  {
    id: "fingerprint-flood-001",
    documentId: "flood-recovery-packet-001",
    markType: "temporary-grouping",
    label: "temporary grouping",
    text:
      "Keep together only until drying order can be checked against original shelf notes.",
    emotionalLeak:
      "I grouped them because they were touching. That may have been the first mistake.",
  },
  {
    id: "fingerprint-flood-002",
    documentId: "flood-recovery-packet-001",
    markType: "relationship-downgrade",
    label: "relationship downgraded",
    text:
      "Do not treat physical adjacency as narrative adjacency without secondary confirmation.",
    emotionalLeak:
      "The packet keeps making stories out of damage.",
  },
  {
    id: "fingerprint-flood-003",
    documentId: "flood-recovery-packet-001",
    markType: "exhaustion-copy",
    label: "copied during exhaustion",
    text:
      "Copied after second overnight review. Handwriting pressure inconsistent.",
    emotionalLeak:
      "I remember thinking it was better to copy badly than lose it completely.",
  },
  {
    id: "fingerprint-notebook-001",
    documentId: "notebook-one-shared",
    markType: "provenance-rewrite",
    label: "provenance rewritten",
    text:
      "Earlier map notes rechecked after flood packet recovery changed confidence grade.",
    emotionalLeak:
      "The notebook looked safer before the packet was opened.",
  },
];

export function getArchivistFingerprintsForDocument(documentId: string) {
  return archivistFingerprints.filter(
    (fingerprint) => fingerprint.documentId === documentId
  );
}

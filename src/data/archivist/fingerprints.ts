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
  {
    id: "fingerprint-flood-004",
    documentId: "flood-recovery-packet-001",
    markType: "uncertainty-grade",
    label: "uncertainty regraded",
    text:
      "Confidence lowered a second time. First grading assumed good faith. Second grading did not.",
    emotionalLeak:
      "I keep grading my own memory of handling this packet, not just the packet.",
  },
  {
    id: "fingerprint-flood-005",
    documentId: "flood-recovery-packet-001",
    markType: "crossed-label",
    label: "label crossed out",
    text:
      "Original grouping label crossed through and rewritten in my own hand, dated the same day.",
    emotionalLeak:
      "I do not remember deciding to change it.",
  },
];

export function getArchivistFingerprintsForDocument(documentId: string) {
  return archivistFingerprints.filter(
    (fingerprint) => fingerprint.documentId === documentId
  );
}

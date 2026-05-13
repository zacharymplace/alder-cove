export type FloodRecoveryClusterEntry = {
  id: string;
  type:
    | "drying-note"
    | "recovery-inventory"
    | "adjacency-fragment"
    | "archivist-annotation";
  title: string;
  condition:
    | "water-damaged"
    | "flattened"
    | "copied-later"
    | "unstable";
  text: string;
  emotionalPressure?: string;
};

export const floodRecoveryClusterPhase1: FloodRecoveryClusterEntry[] = [
  {
    id: "drying-note-001",
    type: "drying-note",
    title: "Drying Note — Tray 4",
    condition: "flattened",
    text:
      "Several notebook scraps adhered to unrelated meeting copies during overnight drying.",
    emotionalPressure:
      "Original ordering may no longer be recoverable.",
  },

  {
    id: "recovery-inventory-001",
    type: "recovery-inventory",
    title: "Recovery Inventory — Box 1",
    condition: "copied-later",
    text:
      "Contents relabeled after lower storage room collapse shifted multiple packets together.",
    emotionalPressure:
      "Recovery labels may now describe recovery behavior more than original placement.",
  },

  {
    id: "adjacency-fragment-001",
    type: "adjacency-fragment",
    title: "Adjacency Fragment",
    condition: "water-damaged",
    text:
      "Private journal graphite appears pressed into a copied shoreline map fragment.",
    emotionalPressure:
      "Recovered contact does not imply original narrative connection.",
  },

  {
    id: "archivist-annotation-001",
    type: "archivist-annotation",
    title: "Archivist Annotation",
    condition: "unstable",
    text:
      "The packet keeps creating relationships between fragments that may never have touched before recovery.",
    emotionalPressure:
      "I no longer trust adjacency as evidence.",
  },
];

export const floodRecoveryClusterPhase2: FloodRecoveryClusterEntry[] = [
  {
    id: "label-conflict-001",
    type: "recovery-inventory",
    title: "Conflicting Label — Box 1 / Tray 4",
    condition: "unstable",
    text:
      "Box label identifies these scraps as shoreline map material. Drying tray label identifies the same grouping as meeting overflow.",
    emotionalPressure:
      "One label may describe where the fragments came from. The other may describe where we placed them after panic.",
  },

  {
    id: "downgraded-adjacency-001",
    type: "archivist-annotation",
    title: "Adjacency Claim Downgraded",
    condition: "copied-later",
    text:
      "Do not cite recovered contact as evidence of original contact. Water pressure may have created the relationship.",
    emotionalPressure:
      "This connection became less certain the longer I studied it.",
  },

  {
    id: "misgrouped-fragment-001",
    type: "adjacency-fragment",
    title: "Fragment Removed From Grouping",
    condition: "water-damaged",
    text:
      "Private graphite transfer was initially grouped with shoreline material, then removed after handwriting pressure failed to match.",
    emotionalPressure:
      "It should not have been placed here. But now that it was, I cannot stop seeing the connection.",
  },

  {
    id: "uncertainty-increased-001",
    type: "archivist-annotation",
    title: "Uncertainty Increased After Review",
    condition: "unstable",
    text:
      "Second review did not clarify sequence. It widened the number of possible histories.",
    emotionalPressure:
      "Review made the archive less stable, not more.",
  },
];

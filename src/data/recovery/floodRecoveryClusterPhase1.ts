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

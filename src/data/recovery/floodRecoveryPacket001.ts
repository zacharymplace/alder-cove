export type RecoveryPacketFragment = {
  id: string;
  sourceType:
    | "shared-notebook"
    | "private-journal"
    | "meeting-copy"
    | "unknown";
  recoveredFrom: string;
  condition:
    | "water-damaged"
    | "partially-fused"
    | "copied-later"
    | "flattened";
  summary: string;
  archivistConcern?: string;
};

export const floodRecoveryPacket001: RecoveryPacketFragment[] = [
  {
    id: "flood-fragment-001",
    sourceType: "shared-notebook",
    recoveredFrom: "lower storage room",
    condition: "water-damaged",
    summary:
      "Map fragment recovered beside unrelated meeting scraps after flood sorting.",
    archivistConcern:
      "Original adjacency cannot be confidently reconstructed.",
  },

  {
    id: "flood-fragment-002",
    sourceType: "private-journal",
    recoveredFrom: "unlabeled drying tray",
    condition: "partially-fused",
    summary:
      "Several lines appear physically fused to copied testimony material.",
    archivistConcern:
      "Fragments may now imply relationships that never originally existed.",
  },

  {
    id: "flood-fragment-003",
    sourceType: "unknown",
    recoveredFrom: "box 1 reassembly stack",
    condition: "copied-later",
    summary:
      "Later graphite labels appear to reorganize fragments after drying.",
    archivistConcern:
      "Recovery handling may now be inseparable from the preserved record.",
  },
];

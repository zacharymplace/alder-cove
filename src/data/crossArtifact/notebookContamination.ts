export type NotebookContaminationNote = {
  id: string;
  affectedPage: number;
  contaminationSource:
    | "flood-recovery-packet"
    | "later-copy"
    | "drying-tray"
    | "archivist-reconstruction";
  note: string;
  visibility:
    | "faint"
    | "recoverable"
    | "clear";
};

export const notebookContaminationNotes: NotebookContaminationNote[] = [
  {
    id: "contamination-001",
    affectedPage: 18,
    contaminationSource: "flood-recovery-packet",
    visibility: "faint",
    note:
      "Map edge appears graphically reconstructed after flood sorting.",
  },

  {
    id: "contamination-002",
    affectedPage: 19,
    contaminationSource: "later-copy",
    visibility: "recoverable",
    note:
      "Some Eli wording may now reflect later handling language.",
  },

  {
    id: "contamination-003",
    affectedPage: 19,
    contaminationSource: "archivist-reconstruction",
    visibility: "faint",
    note:
      "Original adjacency confidence degraded after repeated preservation review.",
  },
];

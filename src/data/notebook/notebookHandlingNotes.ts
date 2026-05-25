export type NotebookHandlingNote = {
  id: string;
  page: number;
  type:
    | "later-copy"
    | "archivist-review"
    | "reconstruction"
    | "flood-review"
    | "softened-language";
  note: string;
  visibility: "faint" | "visible" | "heavy";
};

export const notebookHandlingNotes: NotebookHandlingNote[] = [
  {
    id: "handling-001",
    page: 18,
    type: "later-copy",
    visibility: "faint",
    note:
      "Opening page appears recopied after lower storage review.",
  },

  {
    id: "handling-002",
    page: 19,
    type: "softened-language",
    visibility: "visible",
    note:
      "Some Eli wording appears emotionally softened in later copies.",
  },

  {
    id: "handling-003",
    page: 19,
    type: "reconstruction",
    visibility: "visible",
    note:
      "Recovered version keeps repeating scared with difficult certainty.",
  },

  {
    id: "handling-004",
    page: 18,
    type: "flood-review",
    visibility: "faint",
    note:
      "Map edges reviewed against flood recovery packet fragments.",
  },

  {
    id: "handling-005",
    page: 19,
    type: "archivist-review",
    visibility: "heavy",
    note:
      "Repeated handling introduced disagreement about original phrasing order.",
  },
];

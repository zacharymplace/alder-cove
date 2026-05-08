export type PrivateJournalPage = {
  id: string;
  title: string;
  handlingState:
    | "sealed"
    | "partially-opened"
    | "withheld"
    | "under-review";
  preservationNote: string;
  readable: boolean;
};

export const maraJournalPages: PrivateJournalPage[] = [
  {
    id: "mara-fragment-001",
    title: "Fragment 001",
    handlingState: "sealed",
    preservationNote:
      "Page remains physically present in the archive but has not been prepared for reading.",
    readable: false,
  },
  {
    id: "mara-fragment-002",
    title: "Fragment 002",
    handlingState: "under-review",
    preservationNote:
      "Later handling notes suggest the wording was recopied after water exposure.",
    readable: false,
  },
];

export function getMaraJournalPage(id: string) {
  const page = maraJournalPages.find((candidate) => candidate.id === id);

  if (!page) {
    throw new Error(`Unknown Mara journal page: ${id}`);
  }

  return page;
}

export type NotebookPageId =
  | "opening-left"
  | "opening-right"
  | "recovered-left"
  | "recovered-right"
  | "summer-left"
  | "summer-right";

export type NotebookSpreadId = "opening" | "recovered" | "summer";

export type NotebookPageDefinition = {
  id: NotebookPageId;
  spreadId: NotebookSpreadId;
  side: "left" | "right";
  title: string;
  role:
    | "opening-map"
    | "eli-chain"
    | "recovered-rules"
    | "continuation-support";
  noteIds: string[];
  components?: Array<"map" | "cannerySketch" | "symbolLegend" | "checkInLog" | "missingPhoto">;
  provenance?: {
    source: "original notebook" | "flood recovery" | "archivist copy" | "reconstructed packet";
    confidence: "high" | "medium" | "low" | "disputed";
    handledBy?: string;
    note?: string;
    conflictingSource?: string;
  };
};

export const notebookPages: NotebookPageDefinition[] = [
  {
    id: "opening-left",
    spreadId: "opening",
    side: "left",
    title: "written before forgetting",
    role: "opening-map",
    noteIds: ["founding-phrase"],
    components: ["map"],
    provenance: {
      source: "original notebook",
      confidence: "medium",
      handledBy: "unknown",
      note: "opening page appears carefully preserved",
      conflictingSource: "someone later added page numbering in different graphite",
    },
  },
  {
    id: "opening-right",
    spreadId: "opening",
    side: "right",
    title: "first Eli chain",
    role: "eli-chain",
    noteIds: [
      "eli-childhood-memory",
      "cannery-sketch",
    ],
    components: ["cannerySketch"],
    provenance: {
      source: "later copied version",
      confidence: "uncertain",
      handledBy: "copied later by someone from town",
      note: "later copies soften some of the Eli wording",
      conflictingSource: "one recovered version keeps replacing scared with difficult",
    },
  },
  {
    id: "recovered-left",
    spreadId: "recovered",
    side: "left",
    title: "unstable recovered page",
    role: "recovered-rules",
    noteIds: [],
  },
  {
    id: "recovered-right",
    spreadId: "recovered",
    side: "right",
    title: "missing facing page",
    role: "continuation-support",
    noteIds: [
      "stop-saying-that",
      "eli-contradiction-a",
      "later-rule",
      "eli-contradiction-b",
      "going-salt-first",
      "cannery-line",
    ],
  },
  {
    id: "summer-left",
    spreadId: "summer",
    side: "left",
    title: "summer rules",
    role: "eli-chain",
    noteIds: ["summer-rules", "dock-dares", "ferry-bet"],
  },
  {
    id: "summer-right",
    spreadId: "summer",
    side: "right",
    title: "summer margin notes",
    role: "eli-chain",
    noteIds: ["nickname-list", "cannery-game", "tiny-drift-line"],
  },
];

export function getNotebookPage(id: NotebookPageId) {
  const page = notebookPages.find((candidate) => candidate.id === id);

  if (!page) {
    throw new Error(`Unknown notebook page: ${id}`);
  }

  return page;
}

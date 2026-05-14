export type NotebookPageId =
  | "opening-left"
  | "opening-right"
  | "recovered-left"
  | "recovered-right"
  | "summer-left"
  | "summer-right"
  | "rules-left"
  | "rules-right"
  | "copy-left"
  | "copy-right";

export type NotebookSpreadId = "opening" | "recovered" | "summer" | "rules" | "copy";

export type NotebookPageDefinition = {
  id: NotebookPageId;
  spreadId: NotebookSpreadId;
  side: "left" | "right";
  title: string;
  role:
    | "opening-map"
    | "eli-chain"
    | "recovered-rules"
    | "continuation-support"
    | "group-rules"
    | "copy-drift";
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
  {
    id: "rules-left",
    spreadId: "rules",
    side: "left",
    title: "group rules circle",
    role: "group-rules",
    noteIds: ["group-rule-circle", "mara-care-rule", "cal-joke-rule"],
    components: ["checkInLog", "symbolLegend"],
    provenance: {
      source: "original notebook",
      confidence: "medium",
      handledBy: "unknown",
      note: "rule page appears copied around original child handwriting",
      conflictingSource: "later check marks do not align with original spacing",
    },
  },
  {
    id: "rules-right",
    spreadId: "rules",
    side: "right",
    title: "missing check mark",
    role: "group-rules",
    noteIds: ["missing-check-mark", "going-salt-first", "stop-saying-that"],
    components: ["missingPhoto"],
    provenance: {
      source: "archivist copy",
      confidence: "low",
      handledBy: "archivist",
      note: "missing check mark reconstructed from pressure marks",
      conflictingSource: "one copied version omits the missing mark entirely",
    },
  },
  {
    id: "copy-left",
    spreadId: "copy",
    side: "left",
    title: "later copied version",
    role: "copy-drift",
    noteIds: ["softened-copy-note", "eli-contradiction-a", "eli-contradiction-b"],
    provenance: {
      source: "archivist copy",
      confidence: "disputed",
      handledBy: "archivist",
      note: "copy sequence preserves disagreement more than certainty",
      conflictingSource: "earlier pressure marks suggest harsher wording",
    },
  },
  {
    id: "copy-right",
    spreadId: "copy",
    side: "right",
    title: "torn index trace",
    role: "copy-drift",
    noteIds: ["page-torn-index", "cannery-line", "tiny-drift-line"],
    components: ["missingPhoto"],
    provenance: {
      source: "reconstructed packet",
      confidence: "low",
      handledBy: "copied later by someone from town",
      note: "page removal inferred from numbering gap",
      conflictingSource: "flood packet labels disagree about sequence",
    },
  },

];

export function getNotebookPage(id: NotebookPageId) {
  const page = notebookPages.find((candidate) => candidate.id === id);

  if (!page) {
    throw new Error(`Unknown notebook page: ${id}`);
  }

  return page;
}

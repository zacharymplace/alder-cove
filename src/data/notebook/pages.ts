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
  | "copy-right"
  | "mara-boundary-left"
  | "mara-boundary-right"
  | "eli-adjacent-left"
  | "eli-adjacent-right"
  | "index-closure-left"
  | "index-closure-right";

export type NotebookSpreadId =
  | "opening"
  | "recovered"
  | "summer"
  | "rules"
  | "copy"
  | "mara-boundary"
  | "eli-adjacent"
  | "index-closure";

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
    | "copy-drift"
    | "privacy-boundary"
    | "incident-adjacent"
    | "missing-index";
  noteIds: string[];
  components?: Array<"map" | "cannerySketch" | "symbolLegend" | "checkInLog" | "missingPhoto">;
  provenance?: {
    source: "original notebook" | "flood recovery" | "archivist copy" | "reconstructed packet" | "later copied version";
    confidence: "high" | "medium" | "low" | "disputed" | "uncertain";
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

  {
    id: "mara-boundary-left",
    spreadId: "mara-boundary",
    side: "left",
    title: "folded corner rule",
    role: "privacy-boundary",
    noteIds: ["mara-boundary-rule", "mara-folded-corner"],
    components: ["symbolLegend"],
    provenance: {
      source: "archivist copy",
      confidence: "disputed",
      handledBy: "archivist",
      note: "privacy rule copied into shared notebook record after private fragment was indexed",
      conflictingSource: "Mara fragment remains sealed",
    },
  },
  {
    id: "mara-boundary-right",
    spreadId: "mara-boundary",
    side: "right",
    title: "name rewritten lighter",
    role: "privacy-boundary",
    noteIds: ["mara-crossed-name", "chameleon-first-note", "page-torn-index"],
    provenance: {
      source: "reconstructed packet",
      confidence: "low",
      handledBy: "copied later by someone from town",
      note: "name pressure appears overwritten after first copy",
      conflictingSource: "private material may have shaped the shared record",
    },
  },
  {
    id: "eli-adjacent-left",
    spreadId: "eli-adjacent",
    side: "left",
    title: "incident-adjacent wording",
    role: "incident-adjacent",
    noteIds: ["eli-incident-adjacent", "storm-counting"],
    components: ["checkInLog"],
    provenance: {
      source: "flood recovery",
      confidence: "low",
      handledBy: "archivist",
      note: "page is adjacent to incident language without confirming sequence",
      conflictingSource: "later copy softens wait into hesitation",
    },
  },
  {
    id: "eli-adjacent-right",
    spreadId: "eli-adjacent",
    side: "right",
    title: "three-day gap",
    role: "incident-adjacent",
    noteIds: ["nobody-wrote-after", "softened-copy-note", "cannery-line"],
    provenance: {
      source: "archivist copy",
      confidence: "medium",
      handledBy: "archivist",
      note: "writing gap appears consistent across copies",
      conflictingSource: "reason for gap remains unconfirmed",
    },
  },
  {
    id: "index-closure-left",
    spreadId: "index-closure",
    side: "left",
    title: "missing page closure",
    role: "missing-index",
    noteIds: ["torn-index-closure", "last-shared-line"],
    components: ["missingPhoto"],
    provenance: {
      source: "reconstructed packet",
      confidence: "low",
      handledBy: "archivist",
      note: "index closure assembled from missing-page trace",
      conflictingSource: "no recovered copy confirms page contents",
    },
  },
  {
    id: "index-closure-right",
    spreadId: "index-closure",
    side: "right",
    title: "assembled ending",
    role: "missing-index",
    noteIds: ["archivist-final-copy-note", "mara-boundary-rule"],
    provenance: {
      source: "archivist copy",
      confidence: "disputed",
      handledBy: "archivist",
      note: "ending preserves uncertainty rather than resolving it",
      conflictingSource: "original order not recoverable",
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

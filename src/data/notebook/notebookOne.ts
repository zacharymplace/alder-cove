export type NotebookNote = {
  id: string;
  text: string;
  author?: string;
  variant?:
    | "founding"
    | "map"
    | "log"
    | "symbol"
    | "contradiction"
    | "warning"
    | "margin";
  relatedNoteIds?: string[];
  memoryPressure?: "low" | "medium" | "high";
};

export const notebookOneSpread = {
  title: "Notebook One — First Spread",

  leftPage: [
    {
      id: "founding-phrase",
      variant: "founding",
      text: "WRITE IT DOWN BEFORE YOU FORGET",
      author: "co-author",
      memoryPressure: "high",
    },

    {
      id: "later-rule",
      variant: "margin",
      text: "The town changes things when nobody checks.",
      author: "archivist",
      memoryPressure: "medium",
    },

    {
      id: "map-labels",
      variant: "map",
      text: "Alder Cove map",
      relatedNoteIds: [
        "cannery-sketch",
        "eli-contradiction-a",
      ],
      memoryPressure: "medium",
    },

    {
      id: "symbol-legend",
      variant: "symbol",
      text: "Blue fish = someone checked already.",
      memoryPressure: "low",
    },

    {
      id: "checkin-log",
      variant: "log",
      text: "check-in system",
      relatedNoteIds: ["going-salt-first"],
      memoryPressure: "medium",
    },
  ] satisfies NotebookNote[],

  rightPage: [
    {
      id: "cannery-sketch",
      variant: "map",
      text: "water moves weird after storms",
      relatedNoteIds: [
        "eli-contradiction-a",
        "eli-contradiction-b",
        "cannery-line",
      ],
      memoryPressure: "high",
    },

    {
      id: "stop-saying-that",
      variant: "margin",
      text: "stop saying that",
      author: "skeptic",
      memoryPressure: "medium",
    },

    {
      id: "eli-contradiction-a",
      variant: "contradiction",
      text: "Eli hates the tunnels after rain now.",
      relatedNoteIds: [
        "eli-contradiction-b",
        "cannery-sketch",
      ],
      memoryPressure: "high",
    },

    {
      id: "eli-contradiction-b",
      variant: "contradiction",
      text: "no he doesnt. he always wanted to go first",
      relatedNoteIds: [
        "eli-contradiction-a",
      ],
      memoryPressure: "high",
    },

    {
      id: "going-salt-first",
      variant: "warning",
      text: "Mara says my dad's going salt because he forgot the dock fire but I think he just lies now",
      relatedNoteIds: ["checkin-log"],
      memoryPressure: "medium",
    },

    {
      id: "cannery-line",
      variant: "margin",
      text: "The cannery gives things back wrong sometimes.",
      relatedNoteIds: [
        "cannery-sketch",
        "eli-contradiction-a",
      ],
      memoryPressure: "high",
    },
  ] satisfies NotebookNote[],
};

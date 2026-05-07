export type NotebookNote = {
  id: string;
  text: string;
  author?: string;
  variant?: "founding" | "map" | "log" | "symbol" | "contradiction" | "warning" | "margin";
};

export const notebookOneSpread = {
  title: "Notebook One — First Spread",
  leftPage: [
    {
      id: "founding-phrase",
      variant: "founding",
      text: "WRITE IT DOWN BEFORE YOU FORGET",
      author: "co-author",
    },
    {
      id: "later-rule",
      variant: "margin",
      text: "The town changes things when nobody checks.",
      author: "archivist",
    },
    {
      id: "map-labels",
      variant: "map",
      text: "Alder Cove map: ferry dock, cannery, cliff trail, safe rocks, tunnel entrance, echo place, fast way home, DON'T GO IF FOG.",
    },
    {
      id: "symbol-legend",
      variant: "symbol",
      text: "Blue fish = someone checked already. Silver star = still feels normal. Lighthouse = checked in. Tide slash = don't go alone.",
    },
    {
      id: "checkin-log",
      variant: "log",
      text: "Eli → cannery roof w/ Mara → before lights\nJune → ferry hill alone → after dinner\nNora → tide pools w/ Ben → when horn goes\nCal → lower trail → dont tell parents → probably late",
    },
  ] satisfies NotebookNote[],
  rightPage: [
    {
      id: "cannery-sketch",
      variant: "map",
      text: "Flooded lower level circled: WATERLINE ROOM. water moves weird after storms.",
    },
    {
      id: "stop-saying-that",
      variant: "margin",
      text: "stop saying that",
      author: "skeptic",
    },
    {
      id: "eli-contradiction-a",
      variant: "contradiction",
      text: "Eli hates the tunnels after rain now.",
    },
    {
      id: "eli-contradiction-b",
      variant: "contradiction",
      text: "no he doesnt. he always wanted to go first",
    },
    {
      id: "going-salt-first",
      variant: "warning",
      text: "Mara says my dad's going salt because he forgot the dock fire but I think he just lies now",
    },
    {
      id: "cannery-line",
      variant: "margin",
      text: "The cannery gives things back wrong sometimes.",
    },
  ] satisfies NotebookNote[],
};

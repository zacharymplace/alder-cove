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
  pressureReveal?: string;
  originalText?: string;
  reconstructedText?: string;
  handwriting?: "coauthor" | "archivist" | "skeptic" | "sibling" | "chameleon";
  copiedBy?: string;
  recoveredFrom?: string;
  authenticity?: "original" | "copied" | "damaged" | "reconstructed";
  contradictionChain?: "eli-tunnels";
  collapseStage?: number;
  yearPhase?: "childhood" | "early-adolescence" | "late-adolescence";
};

export const notebookOneSpread = {
  title: "Notebook One — First Spread",

  leftPage: [
    {
      id: "founding-phrase",
      variant: "founding",
      text: "WRITE IT DOWN BEFORE YOU FORGET",
      author: "co-author",
      handwriting: "coauthor",
      recoveredFrom: "flood box 3",
      authenticity: "damaged",
      contradictionChain: "eli-tunnels",
      collapseStage: 3,
      yearPhase: "childhood",
      memoryPressure: "high",
    },

    {
      id: "later-rule",
      variant: "margin",
      text: "The town changes things when nobody checks.",
      pressureReveal: "people too",
      author: "archivist",
      handwriting: "archivist",
      authenticity: "original",
      yearPhase: "childhood",
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
    id: "summer-rules",
    variant: "margin",
    text: "SUMMER RULES:\n1. nobody leaves someone at the dock alone\n2. no dares during fog\n3. dont tell parents about the roof ladder",
    handwriting: "coauthor",
    authenticity: "original",
    yearPhase: "childhood",
    memoryPressure: "low",
  },
  {
    id: "dock-dares",
    variant: "margin",
    text: "Cal owes Mara 3 sodas because he wouldnt jump from the third post",
    handwriting: "sibling",
    authenticity: "original",
    yearPhase: "childhood",
    memoryPressure: "low",
  },
  {
    id: "ferry-bet",
    variant: "margin",
    text: "Eli said he could tell the ferry horn apart from every other boat even during storms",
    handwriting: "coauthor",
    authenticity: "damaged",
    yearPhase: "childhood",
    memoryPressure: "medium",
    pressureReveal: "he was right every time",
  },
  {
    id: "nickname-list",
    variant: "margin",
    text: "Worst nicknames:\n- gull boy\n- fish hands\n- cannery goblin\n- ferry brain",
    handwriting: "sibling",
    authenticity: "original",
    yearPhase: "childhood",
    memoryPressure: "low",
  },
  {
    id: "cannery-game",
    variant: "margin",
    text: "game:\nwhoever gets caught by the flashlight in the lower hall loses and has to carry batteries next time",
    handwriting: "coauthor",
    authenticity: "copied",
    yearPhase: "childhood",
    memoryPressure: "medium",
  },
  {
    id: "tiny-drift-line",
    variant: "margin",
    text: "Eli stopped playing after the tunnel argument",
    handwriting: "archivist",
    authenticity: "reconstructed",
    yearPhase: "early-adolescence",
    memoryPressure: "medium",
    pressureReveal: "nobody wrote down why",
  },


    {
      id: "eli-childhood-memory",
      variant: "margin",
      text: "Eli said the tunnels sounded wrong after storms.",
      originalText: "he said they sounded wrong not dangerous",
      reconstructedText: "Eli always tried to scare us after storms.",
      handwriting: "coauthor",
      authenticity: "damaged",
      contradictionChain: "eli-tunnels",
      collapseStage: 0,
      yearPhase: "childhood",
      memoryPressure: "medium",
      pressureReveal: "he wasnt trying to scare us",
      relatedNoteIds: [
        "eli-contradiction-a",
        "eli-contradiction-b",
        "cannery-line"
      ],
    },
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
      handwriting: "skeptic",
      yearPhase: "early-adolescence",
      memoryPressure: "medium",
    },

    {
      id: "eli-contradiction-a",
      variant: "contradiction",
      text: "Eli hates the tunnels after rain now.",
      originalText: "Eli hates the tunnels after what happened",
      reconstructedText: "Eli doesnt go below after storms anymore.",
      handwriting: "archivist",
      copiedBy: "archivist",
      recoveredFrom: "damaged lower-level page",
      authenticity: "copied",
      contradictionChain: "eli-tunnels",
      collapseStage: 1,
      yearPhase: "late-adolescence",
      pressureReveal: "after what happened after storms",
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
      originalText: "he said he wasnt scared but he was",
      reconstructedText: "he always wanted to go first",
      handwriting: "sibling",
      recoveredFrom: "pressure marks only",
      authenticity: "reconstructed",
      contradictionChain: "eli-tunnels",
      collapseStage: 2,
      yearPhase: "late-adolescence",
      pressureReveal: "he said he wasnt scared but he was",
      relatedNoteIds: [
        "eli-contradiction-a",
      ],
      memoryPressure: "high",
    },

    {
      id: "going-salt-first",
      variant: "warning",
      text: "Mara says my dad's going salt because he forgot the dock fire but I think he just lies now",
      handwriting: "sibling",
      yearPhase: "early-adolescence",
      relatedNoteIds: ["checkin-log"],
      memoryPressure: "medium",
    },

    {
      id: "cannery-line",
      variant: "margin",
      text: "The cannery gives things back wrong sometimes.",
      originalText: "The cannery gives people back wrong sometimes.",
      reconstructedText: "The cannery gives things back wrong sometimes.",
      handwriting: "coauthor",
      yearPhase: "childhood",
      pressureReveal: "not things. people.",
      relatedNoteIds: [
        "cannery-sketch",
        "eli-contradiction-a",
      ],
      memoryPressure: "high",
    },

  {
    id: "group-rule-circle",
    variant: "margin",
    text: "GROUP RULE CIRCLE:\n- say where you are going\n- say who is going with you\n- say when someone should come looking",
    handwriting: "coauthor",
    authenticity: "original",
    yearPhase: "childhood",
    memoryPressure: "medium",
    pressureReveal: "the last rule was added after Eli",
  },
  {
    id: "mara-care-rule",
    variant: "margin",
    text: "Mara says rules only count if someone remembers to check them.",
    handwriting: "coauthor",
    authenticity: "copied",
    yearPhase: "childhood",
    memoryPressure: "medium",
  },
  {
    id: "cal-joke-rule",
    variant: "margin",
    text: "Cal added: if nobody comes looking you owe everyone fries.",
    handwriting: "sibling",
    authenticity: "original",
    yearPhase: "childhood",
    memoryPressure: "low",
  },
  {
    id: "missing-check-mark",
    variant: "warning",
    text: "one check mark missing from the night before the fog came in",
    handwriting: "archivist",
    authenticity: "reconstructed",
    yearPhase: "early-adolescence",
    memoryPressure: "high",
    pressureReveal: "someone noticed before they admitted it",
  },
  {
    id: "softened-copy-note",
    variant: "contradiction",
    text: "later copy says Eli forgot. earlier pressure marks suggest Eli refused.",
    originalText: "Eli refused",
    reconstructedText: "Eli forgot",
    handwriting: "archivist",
    copiedBy: "archivist",
    recoveredFrom: "copied margin sequence",
    authenticity: "copied",
    contradictionChain: "eli-tunnels",
    collapseStage: 3,
    yearPhase: "late-adolescence",
    memoryPressure: "high",
    pressureReveal: "forgot is softer than refused",
    relatedNoteIds: ["eli-contradiction-a", "eli-contradiction-b"],
  },
  {
    id: "page-torn-index",
    variant: "warning",
    text: "page removed here before numbering was added",
    handwriting: "archivist",
    authenticity: "damaged",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
  },


  {
    id: "mara-boundary-rule",
    variant: "warning",
    text: "Mara wrote: dont copy private things just because they explain public things",
    handwriting: "coauthor",
    authenticity: "copied",
    yearPhase: "early-adolescence",
    memoryPressure: "high",
    pressureReveal: "someone copied this anyway",
  },
  {
    id: "mara-folded-corner",
    variant: "margin",
    text: "folded corner means ask first",
    handwriting: "coauthor",
    authenticity: "original",
    yearPhase: "childhood",
    memoryPressure: "medium",
  },
  {
    id: "mara-crossed-name",
    variant: "warning",
    text: "Mara's name crossed out here, then written again lighter",
    handwriting: "archivist",
    authenticity: "reconstructed",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
    pressureReveal: "lighter is not the same as kinder",
  },
  {
    id: "eli-incident-adjacent",
    variant: "contradiction",
    text: "Eli said wait. Later copy says Eli hesitated.",
    originalText: "Eli said wait",
    reconstructedText: "Eli hesitated",
    handwriting: "archivist",
    copiedBy: "archivist",
    recoveredFrom: "page edge pressure marks",
    authenticity: "copied",
    contradictionChain: "eli-tunnels",
    collapseStage: 4,
    yearPhase: "late-adolescence",
    memoryPressure: "high",
    pressureReveal: "wait is not the same as afraid",
    relatedNoteIds: ["eli-contradiction-a", "softened-copy-note"],
  },
  {
    id: "storm-counting",
    variant: "log",
    text: "storm count: 3 horns, 2 lights, 1 person still below",
    handwriting: "sibling",
    authenticity: "damaged",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
  },
  {
    id: "nobody-wrote-after",
    variant: "margin",
    text: "nobody wrote for three days after this",
    handwriting: "archivist",
    authenticity: "reconstructed",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
  },
  {
    id: "torn-index-closure",
    variant: "warning",
    text: "index says page 31 existed. no recovered copy confirms contents.",
    handwriting: "archivist",
    authenticity: "reconstructed",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
    pressureReveal: "absence became part of the record",
  },
  {
    id: "last-shared-line",
    variant: "founding",
    text: "IF WE CAN'T AGREE, WRITE BOTH",
    handwriting: "coauthor",
    authenticity: "damaged",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
  },
  {
    id: "archivist-final-copy-note",
    variant: "margin",
    text: "This ending is assembled from surviving order, not original order.",
    handwriting: "archivist",
    authenticity: "copied",
    yearPhase: "late-adolescence",
    memoryPressure: "high",
    pressureReveal: "assembled is not restored",
  },

  ] satisfies NotebookNote[],
};

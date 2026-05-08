import type { NotebookPageId, NotebookSpreadId } from "./pages";

export type NotebookSpreadDefinition = {
  id: NotebookSpreadId;
  title: string;
  leftPageId: NotebookPageId;
  rightPageId: NotebookPageId;
  emotionalFunction: string;
  revealCadence: "slow" | "medium" | "late";
  preservationState:
    | "careful-opening"
    | "flood-recovered"
    | "warm-precollapse";
  paperTone: "aged" | "water-damaged" | "warm";
  residueDensity: "light" | "heavy" | "soft";
};

export const spreadDefinitions: NotebookSpreadDefinition[] = [
  {
    id: "opening",
    title: "Opening Spread",
    leftPageId: "opening-left",
    rightPageId: "opening-right",
    emotionalFunction:
      "Establish care systems, Alder Cove geography, and the first Eli contradiction.",
    revealCadence: "slow",
    preservationState: "careful-opening",
    paperTone: "aged",
    residueDensity: "light",
  },
  {
    id: "recovered",
    title: "Recovered Spread",
    leftPageId: "recovered-left",
    rightPageId: "recovered-right",
    emotionalFunction:
      "Move overflow, recovered rules, and preservation residue into explicit continuation pages.",
    revealCadence: "late",
    preservationState: "flood-recovered",
    paperTone: "water-damaged",
    residueDensity: "heavy",
  },

  {
    id: "summer",
    title: "Summer Spread",
    leftPageId: "summer-left",
    rightPageId: "summer-right",
    emotionalFunction:
      "Preserve warmth, humor, rituals, and pre-collapse companionship.",
    revealCadence: "slow",
    preservationState: "warm-precollapse",
    paperTone: "warm",
    residueDensity: "soft",
  },

];

export function getSpreadDefinition(index: number) {
  const spread = spreadDefinitions[index];

  if (!spread) {
    throw new Error(`Unknown spread index: ${index}`);
  }

  return spread;
}

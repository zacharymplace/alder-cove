import { create } from "zustand";

import { spreadDefinitions } from "@/data/notebook/spreadDefinitions";

export const TOTAL_NOTEBOOK_SPREADS = spreadDefinitions.length;

export type NotebookState = {
  selectedId: string | null;
  memoryLayer: "recovered" | "original" | "reconstructed";
  flashlight: boolean;
  foldedOpen: boolean;
  pinnedEvidence: string[];
  instabilityLevel: number;
  collapseTriggered: boolean;
  spreadIndex: number;
  zoomedPage: "left" | "right" | null;
  pageTurnDirection: "previous" | "next" | null;
  activeDocumentId: string;
  select: (id: string | null) => void;
  setMemoryLayer: (
    layer: "recovered" | "original" | "reconstructed"
  ) => void;
  toggleFlashlight: () => void;
  toggleFolded: () => void;
  pinEvidence: (evidence: string) => void;
  increaseInstability: () => void;
  triggerCollapse: () => void;
  nextSpread: () => void;
  previousSpread: () => void;
  setZoomedPage: (page: "left" | "right" | null) => void;
  clearPageTurn: () => void;
  setActiveDocumentId: (id: string) => void;
};

export const useNotebookState = create<NotebookState>((set) => ({
  selectedId: null,
  memoryLayer: "recovered",
  flashlight: false,
  foldedOpen: false,
  pinnedEvidence: [],
  instabilityLevel: 0,
  collapseTriggered: false,
  spreadIndex: 0,
  zoomedPage: null,
  pageTurnDirection: null,
  activeDocumentId: "notebook-one-shared",

  select: (id) => set({ selectedId: id }),

  setMemoryLayer: (layer) =>
    set({
      memoryLayer: layer,
    }),

  toggleFlashlight: () =>
    set((state) => ({
      flashlight: !state.flashlight,
    })),

  toggleFolded: () =>
    set((state) => ({
      foldedOpen: !state.foldedOpen,
    })),

  pinEvidence: (evidence) =>
    set((state) => ({
      pinnedEvidence: state.pinnedEvidence.includes(evidence)
        ? state.pinnedEvidence
        : [...state.pinnedEvidence, evidence],
    })),

  increaseInstability: () =>
    set((state) => ({
      instabilityLevel: Math.min(state.instabilityLevel + 1, 5),
    })),

  triggerCollapse: () =>
    set({
      collapseTriggered: true,
      instabilityLevel: 5,
    }),

  nextSpread: () =>
    set((state) => ({
      spreadIndex: Math.min(state.spreadIndex + 1, TOTAL_NOTEBOOK_SPREADS - 1),
      zoomedPage: null,
      pageTurnDirection: "next",
    })),

  previousSpread: () =>
    set((state) => ({
      spreadIndex: Math.max(state.spreadIndex - 1, 0),
      zoomedPage: null,
      pageTurnDirection: "previous",
    })),

  setZoomedPage: (page) =>
    set({
      zoomedPage: page,
    }),

  clearPageTurn: () =>
    set({
      pageTurnDirection: null,
    }),

  setActiveDocumentId: (id) =>
    set({
      activeDocumentId: id,
      spreadIndex: 0,
      zoomedPage: null,
    }),
}));

import { create } from "zustand";

import { spreadDefinitions } from "@/data/notebook/spreadDefinitions";

export const TOTAL_NOTEBOOK_SPREADS = spreadDefinitions.length;

export type NotebookState = {
  selectedId: string | null;
  unstable: boolean;
  memoryLayer: "recovered" | "original" | "reconstructed";
  flashlight: boolean;
  foldedOpen: boolean;
  pinnedEvidence: string[];
  instabilityLevel: number;
  collapseTriggered: boolean;
  mutationPhase: number;
  revisionPhase: number;
  spreadIndex: number;
  zoomedPage: "left" | "right" | null;
  pageTurnDirection: "previous" | "next" | null;
  lingerReveal: boolean;
  rememberedDrift: boolean;
  activeDocumentId: string;
  select: (id: string | null) => void;
  toggleUnstable: () => void;
  setMemoryLayer: (
    layer: "recovered" | "original" | "reconstructed"
  ) => void;
  toggleFlashlight: () => void;
  toggleFolded: () => void;
  pinEvidence: (evidence: string) => void;
  increaseInstability: () => void;
  triggerCollapse: () => void;
  advanceMutation: () => void;
  advanceRevision: () => void;
  nextSpread: () => void;
  previousSpread: () => void;
  setZoomedPage: (page: "left" | "right" | null) => void;
  clearPageTurn: () => void;
  setLingerReveal: (value: boolean) => void;
  setRememberedDrift: (value: boolean) => void;
  setActiveDocumentId: (id: string) => void;
};

export const useNotebookState = create<NotebookState>((set) => ({
  selectedId: null,
  unstable: false,
  memoryLayer: "recovered",
  flashlight: false,
  foldedOpen: false,
  pinnedEvidence: [],
  instabilityLevel: 0,
  collapseTriggered: false,
  mutationPhase: 0,
  revisionPhase: 0,
  spreadIndex: 0,
  zoomedPage: null,
  pageTurnDirection: null,
  lingerReveal: false,
  rememberedDrift: false,
  activeDocumentId: "notebook-one-shared",

  select: (id) => set({ selectedId: id }),

  toggleUnstable: () =>
    set((state) => ({
      unstable: !state.unstable,
    })),

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

  advanceMutation: () =>
    set((state) => ({
      mutationPhase: Math.min(state.mutationPhase + 1, 5),
    })),

  advanceRevision: () =>
    set((state) => ({
      revisionPhase: Math.min(state.revisionPhase + 1, 5),
    })),

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

  setLingerReveal: (value) =>
    set({
      lingerReveal: value,
    }),

  setRememberedDrift: (value) =>
    set({
      rememberedDrift: value,
    }),

  setActiveDocumentId: (id) =>
    set({
      activeDocumentId: id,
      spreadIndex: 0,
      zoomedPage: null,
    }),
}));

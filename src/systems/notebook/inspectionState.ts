import { create } from "zustand";

export type NotebookState = {
  selectedId: string | null;
  unstable: boolean;
  memoryLayer: "recovered" | "original" | "reconstructed";
  flashlight: boolean;
  foldedOpen: boolean;
  pinnedEvidence: string[];
  instabilityLevel: number;
  collapseTriggered: boolean;
  revisionPhase: number;
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
  advanceRevision: () => void;
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
  spreadIndex: 0,
  zoomedPage: null,
  pageTurnDirection: null,

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

  nextSpread: () =>
    set((state) => ({
      spreadIndex: Math.min(state.spreadIndex + 1, 1),
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
}));

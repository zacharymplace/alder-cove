import { beforeEach, describe, expect, test } from "vitest";

import { TOTAL_NOTEBOOK_SPREADS, useNotebookState } from "./inspectionState";

const initialState = useNotebookState.getState();

beforeEach(() => {
  useNotebookState.setState(initialState, true);
});

describe("instability", () => {
  test("increaseInstability stops at 5", () => {
    for (let i = 0; i < 10; i += 1) {
      useNotebookState.getState().increaseInstability();
    }
    expect(useNotebookState.getState().instabilityLevel).toBe(5);
  });

  test("triggerCollapse forces instability to 5 and sets collapseTriggered", () => {
    useNotebookState.getState().triggerCollapse();
    const state = useNotebookState.getState();
    expect(state.collapseTriggered).toBe(true);
    expect(state.instabilityLevel).toBe(5);
  });
});

describe("spread navigation bounds", () => {
  test("previousSpread does not go below 0", () => {
    useNotebookState.getState().previousSpread();
    expect(useNotebookState.getState().spreadIndex).toBe(0);
  });

  test("nextSpread does not exceed the last spread", () => {
    for (let i = 0; i < TOTAL_NOTEBOOK_SPREADS + 5; i += 1) {
      useNotebookState.getState().nextSpread();
    }
    expect(useNotebookState.getState().spreadIndex).toBe(
      TOTAL_NOTEBOOK_SPREADS - 1
    );
  });

  test("nextSpread and previousSpread clear the zoomed page and set turn direction", () => {
    useNotebookState.getState().setZoomedPage("left");
    useNotebookState.getState().nextSpread();
    expect(useNotebookState.getState().zoomedPage).toBeNull();
    expect(useNotebookState.getState().pageTurnDirection).toBe("next");

    useNotebookState.getState().setZoomedPage("right");
    useNotebookState.getState().previousSpread();
    expect(useNotebookState.getState().zoomedPage).toBeNull();
    expect(useNotebookState.getState().pageTurnDirection).toBe("previous");
  });
});

describe("pinEvidence", () => {
  test("adds new evidence", () => {
    useNotebookState.getState().pinEvidence("graphite-mark");
    expect(useNotebookState.getState().pinnedEvidence).toEqual([
      "graphite-mark",
    ]);
  });

  test("does not add duplicate evidence", () => {
    useNotebookState.getState().pinEvidence("graphite-mark");
    useNotebookState.getState().pinEvidence("graphite-mark");
    expect(useNotebookState.getState().pinnedEvidence).toEqual([
      "graphite-mark",
    ]);
  });
});

describe("setActiveDocumentId", () => {
  test("resets spreadIndex and zoomedPage when switching documents", () => {
    useNotebookState.getState().nextSpread();
    useNotebookState.getState().setZoomedPage("left");

    useNotebookState.getState().setActiveDocumentId("flood-recovery-packet-001");

    const state = useNotebookState.getState();
    expect(state.activeDocumentId).toBe("flood-recovery-packet-001");
    expect(state.spreadIndex).toBe(0);
    expect(state.zoomedPage).toBeNull();
  });
});

import { describe, expect, test } from "vitest";

import { resolveNoteText, type NoteTextDriftState } from "./noteTextDrift";
import type { NotebookNote } from "@/data/notebook/notebookOne";

const baseState: NoteTextDriftState = {
  unstable: false,
  memoryLayer: "recovered",
  instabilityLevel: 0,
  collapseTriggered: false,
  revisionPhase: 0,
};

function makeNote(overrides: Partial<NotebookNote> = {}): NotebookNote {
  return {
    id: "some-note",
    text: "default text",
    ...overrides,
  };
}

describe("resolveNoteText", () => {
  test("returns the default text when nothing has drifted", () => {
    const note = makeNote({ text: "he was scared before we were" });
    expect(resolveNoteText(note, baseState)).toBe("he was scared before we were");
  });

  test("prefers originalText when memoryLayer is original", () => {
    const note = makeNote({ text: "current", originalText: "original wording" });
    expect(
      resolveNoteText(note, { ...baseState, memoryLayer: "original" })
    ).toBe("original wording");
  });

  test("prefers reconstructedText when memoryLayer is reconstructed", () => {
    const note = makeNote({
      text: "current",
      reconstructedText: "reconstructed wording",
    });
    expect(
      resolveNoteText(note, { ...baseState, memoryLayer: "reconstructed" })
    ).toBe("reconstructed wording");
  });

  test("eli-contradiction-a drifts once unstable is toggled on", () => {
    const note = makeNote({ id: "eli-contradiction-a", text: "original" });
    expect(resolveNoteText(note, { ...baseState, unstable: true })).toBe(
      "Eli doesnt go below after storms anymore."
    );
  });

  test("collapseTriggered overrides the unstable-only wording for eli-contradiction-a", () => {
    const note = makeNote({ id: "eli-contradiction-a", text: "original" });
    expect(
      resolveNoteText(note, { ...baseState, unstable: true, collapseTriggered: true })
    ).toBe("Eli said the tunnels remembered things wrong.");
  });

  test("later revisionPhase thresholds take precedence over earlier instabilityLevel drift", () => {
    const note = makeNote({ id: "eli-contradiction-a", text: "original" });
    expect(
      resolveNoteText(note, {
        ...baseState,
        unstable: true,
        instabilityLevel: 3,
        revisionPhase: 4,
      })
    ).toBe("Eli said the tunnels remembered things wrong.");
  });

  test("unrelated notes are unaffected by drift thresholds", () => {
    const note = makeNote({ id: "unrelated-note", text: "steady text" });
    expect(
      resolveNoteText(note, {
        ...baseState,
        unstable: true,
        instabilityLevel: 5,
        collapseTriggered: true,
        revisionPhase: 5,
      })
    ).toBe("steady text");
  });
});

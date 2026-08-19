import { describe, expect, test } from "vitest";

import { resolveNoteText, type NoteTextDriftState } from "./noteTextDrift";
import type { NotebookNote } from "@/data/notebook/notebookOne";

const baseState: NoteTextDriftState = {
  memoryLayer: "recovered",
  instabilityLevel: 0,
  collapseTriggered: false,
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

  test("eli-contradiction-b drifts once instabilityLevel reaches 2", () => {
    const note = makeNote({ id: "eli-contradiction-b", text: "original" });
    expect(
      resolveNoteText(note, { ...baseState, instabilityLevel: 2 })
    ).toBe("he always wanted to go first");
  });

  test("collapseTriggered overrides the instabilityLevel wording for eli-contradiction-b", () => {
    const note = makeNote({ id: "eli-contradiction-b", text: "original" });
    expect(
      resolveNoteText(note, {
        ...baseState,
        instabilityLevel: 2,
        collapseTriggered: true,
      })
    ).toBe("he wasnt scared until after the cannery");
  });

  test("collapseTriggered resolves eli-childhood-memory even at instabilityLevel 0", () => {
    const note = makeNote({ id: "eli-childhood-memory", text: "original" });
    expect(
      resolveNoteText(note, { ...baseState, collapseTriggered: true })
    ).toBe("maybe we already decided what he was becoming.");
  });

  test("unrelated notes are unaffected by drift thresholds", () => {
    const note = makeNote({ id: "unrelated-note", text: "steady text" });
    expect(
      resolveNoteText(note, {
        ...baseState,
        instabilityLevel: 5,
        collapseTriggered: true,
      })
    ).toBe("steady text");
  });
});

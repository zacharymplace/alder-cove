import type { NotebookNote } from "@/data/notebook/notebookOne";

/**
 * The subset of notebook inspection state that influences which wording
 * variant a note currently displays. Kept separate from the full
 * NotebookState so this resolution logic can be tested in isolation.
 */
export type NoteTextDriftState = {
  unstable: boolean;
  memoryLayer: "recovered" | "original" | "reconstructed";
  instabilityLevel: number;
  collapseTriggered: boolean;
  revisionPhase: number;
};

/**
 * Resolves which line of text a note should currently render.
 *
 * Notes preserve competing wordings across memory layers (recovered,
 * original, reconstructed) and drift further as instability/revision
 * thresholds are crossed or the contradiction chain collapses. Later
 * checks intentionally take precedence over earlier ones, mirroring the
 * original inline resolution order in NotebookSpread.
 */
export function resolveNoteText(
  note: NotebookNote,
  state: NoteTextDriftState
): string {
  const { unstable, memoryLayer, instabilityLevel, collapseTriggered, revisionPhase } = state;

  let unstableText = note.text;

  if (memoryLayer === "original" && note.originalText) {
    unstableText = note.originalText;
  }

  if (memoryLayer === "reconstructed" && note.reconstructedText) {
    unstableText = note.reconstructedText;
  }

  if (unstable && note.id === "eli-contradiction-a") {
    unstableText = "Eli doesnt go below after storms anymore.";
  }

  if (instabilityLevel >= 2 && note.id === "eli-contradiction-b") {
    unstableText = "he always wanted to go first";
  }

  if (instabilityLevel >= 3 && note.id === "cannery-line") {
    unstableText = "The cannery gives people back wrong sometimes.";
  }

  if (instabilityLevel >= 4 && note.id === "later-rule") {
    unstableText = "The town changes people when nobody checks.";
  }

  if (collapseTriggered && note.id === "eli-contradiction-a") {
    unstableText = "Eli said the tunnels remembered things wrong.";
  }

  if (collapseTriggered && note.id === "eli-contradiction-b") {
    unstableText = "he wasnt scared until after the cannery";
  }

  if (collapseTriggered && note.id === "cannery-line") {
    unstableText = "The cannery gives people back wrong sometimes.";
  }

  if (revisionPhase >= 1 && note.id === "stop-saying-that") {
    unstableText = "stop writing that down";
  }

  if (revisionPhase >= 2 && note.id === "later-rule") {
    unstableText = "The town changes people when nobody checks.";
  }

  if (revisionPhase >= 3 && note.id === "going-salt-first") {
    unstableText =
      "Mara said my dad remembered the dock fire wrong before he started going salt.";
  }

  if (revisionPhase >= 4 && note.id === "eli-contradiction-a") {
    unstableText = "Eli said the tunnels remembered things wrong.";
  }

  if (revisionPhase >= 5 && note.id === "eli-contradiction-b") {
    unstableText = "he wasnt scared until after the cannery";
  }

  if (revisionPhase >= 5 && note.id === "eli-childhood-memory") {
    unstableText = "maybe we already decided what he was becoming.";
  }

  if (collapseTriggered && note.id === "going-salt-first") {
    unstableText =
      "Mara said my dad remembered the dock fire wrong before he started going salt.";
  }

  if (instabilityLevel >= 4 && note.id === "stop-saying-that") {
    unstableText = "stop writing that down";
  }

  return unstableText;
}

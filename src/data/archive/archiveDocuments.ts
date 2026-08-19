import type { NotebookPageId } from "@/data/notebook/pages";

export type ArchiveDocumentType =
  | "shared-notebook"
  | "private-journal"
  | "folded-letter"
  | "recovery-packet"
  | "copied-fragment"
  | "interview-note"
  | "archivist-internal-note";

export type ArchiveAccessClass =
  | "shared"
  | "semi-private"
  | "private"
  | "illicitly-acquired";

export type ArchiveAcquisitionMethod =
  | "kept-by-group"
  | "given-for-copying"
  | "found-after-flood"
  | "recovered-from-box"
  | "copied-with-permission"
  | "copied-without-permission"
  | "taken-from-private-place"
  | "reconstructed-from-memory";

export type ArchiveDocument = {
  id: string;
  title: string;
  type: ArchiveDocumentType;
  accessClass: ArchiveAccessClass;
  acquisitionMethod: ArchiveAcquisitionMethod;
  emotionalRisk: "low" | "medium" | "high" | "intrusive";
  handlingState:
    | "stable"
    | "drying"
    | "over-handled"
    | "reconstructed"
    | "awaiting-review"
    | "sealed";
  pageIds: NotebookPageId[];
  description: string;
  ethicalPressure?: string;
  /**
   * A line that surfaces after the document has stayed "in hand" (the
   * inspection panel open) long enough — the archive's equivalent of the
   * notebook's pressureReveal. Optional and authored sparingly, not
   * present on every document.
   */
  sustainedInspectionReveal?: string;
};

export const archiveDocuments: ArchiveDocument[] = [
  {
    id: "notebook-one-shared",
    title: "Notebook One — Shared Group Notebook",
    type: "shared-notebook",
    accessClass: "shared",
    acquisitionMethod: "kept-by-group",
    emotionalRisk: "medium",
    handlingState: "over-handled",
    pageIds: [
      "opening-left",
      "opening-right",
      "recovered-left",
      "recovered-right",
      "summer-left",
      "summer-right",
    ],
    description:
      "Shared childhood notebook containing maps, rules, group rituals, copied fragments, and later handling traces.",
    ethicalPressure:
      "The notebook was shared, but later reconstruction may include material the group did not intend to preserve permanently.",
  },

  {
    id: "flood-recovery-packet-001",
    title: "Flood Recovery Packet — Box 1",
    type: "recovery-packet",
    accessClass: "semi-private",
    acquisitionMethod: "found-after-flood",
    emotionalRisk: "high",
    handlingState: "drying",
    pageIds: [],
    description:
      "A drying packet of separated pages, copied labels, and flattened scraps recovered after the waterline reached the lower storage room.",
    ethicalPressure:
      "The packet preserves fragments that were never meant to sit together, but became adjacent during recovery.",
  },

  {
    id: "mara-private-journal-fragment",
    title: "Mara — Private Journal Fragment",
    type: "private-journal",
    accessClass: "private",
    acquisitionMethod: "copied-without-permission",
    emotionalRisk: "intrusive",
    handlingState: "awaiting-review",
    pageIds: [],
    description:
      "A sealed private journal fragment preserved as a presence in the archive without being made readable.",
    ethicalPressure:
      "The archive can acknowledge that the fragment exists without treating existence as permission.",
    sustainedInspectionReveal:
      "The longer this stays in hand, the more it feels like reading over someone's shoulder.",
  },

  {
    id: "archivist-internal-note-001",
    title: "Archivist Internal Note",
    type: "archivist-internal-note",
    accessClass: "private",
    acquisitionMethod: "recovered-from-box",
    emotionalRisk: "high",
    handlingState: "awaiting-review",
    pageIds: [],
    description:
      "A private processing note, filed into the shared index by mistake. It was not written for anyone to read.",
    ethicalPressure:
      "The archive cannot un-file something once it has been filed. Removing it now would be its own kind of decision.",
    sustainedInspectionReveal:
      "The longer this stays in hand, the more it reads like something meant to be crossed out.",
  },

];

const archiveDocumentAliases: Record<string, string> = {
  "mara-private-fragment": "mara-private-journal-fragment",
};

export function getArchiveDocument(id: string) {
  const normalizedId = archiveDocumentAliases[id] ?? id;
  const document = archiveDocuments.find(
    (candidate) => candidate.id === normalizedId
  );

  if (!document) {
    throw new Error(`Unknown archive document: ${id}`);
  }

  return document;
}

export type ArchiveProgressionStage =
  | "orientation"
  | "softening"
  | "partial-legibility"
  | "preservation-conflict"
  | "archivist-instability"
  | "provenance-collapse";

export type ArchiveRevealId =
  | "archive-preface"
  | "unresolved-wording"
  | "partial-fragment"
  | "private-journal-presence";

export type ArchiveRevealDefinition = {
  id: ArchiveRevealId;
  label: string;
  stage: ArchiveProgressionStage;
  emotionalSeverity: 1 | 2 | 3 | 4 | 5;
  archivistInstability: number;
  description: string;
};

export const archiveRevealDefinitions: ArchiveRevealDefinition[] = [
  {
    id: "archive-preface",
    label: "Archivist Preface",
    stage: "orientation",
    emotionalSeverity: 1,
    archivistInstability: 0,
    description:
      "Initial preservation framing and archive emotional orientation.",
  },

  {
    id: "unresolved-wording",
    label: "Unresolved Wording",
    stage: "softening",
    emotionalSeverity: 2,
    archivistInstability: 1,
    description:
      "Introduces softened emotional wording and unstable memory handling.",
  },

  {
    id: "partial-fragment",
    label: "Partial Fragment",
    stage: "partial-legibility",
    emotionalSeverity: 3,
    archivistInstability: 2,
    description:
      "Partial readability event with damaged preservation state.",
  },

  {
    id: "private-journal-presence",
    label: "Private Journal Presence",
    stage: "preservation-conflict",
    emotionalSeverity: 4,
    archivistInstability: 3,
    description:
      "Introduces ethically unstable preservation boundaries.",
  },
];

export function getRevealDefinition(id: ArchiveRevealId) {
  const reveal = archiveRevealDefinitions.find(
    (candidate) => candidate.id === id
  );

  if (!reveal) {
    throw new Error(`Unknown archive reveal: ${id}`);
  }

  return reveal;
}

export function getHighestUnlockedStage(
  unlockedRevealIds: ArchiveRevealId[]
): ArchiveProgressionStage {
  const reveals = archiveRevealDefinitions.filter((definition) =>
    unlockedRevealIds.includes(definition.id)
  );

  if (reveals.some((r) => r.stage === "provenance-collapse")) {
    return "provenance-collapse";
  }

  if (reveals.some((r) => r.stage === "archivist-instability")) {
    return "archivist-instability";
  }

  if (reveals.some((r) => r.stage === "preservation-conflict")) {
    return "preservation-conflict";
  }

  if (reveals.some((r) => r.stage === "partial-legibility")) {
    return "partial-legibility";
  }

  if (reveals.some((r) => r.stage === "softening")) {
    return "softening";
  }

  return "orientation";
}

export function calculateArchivistInstability(
  unlockedRevealIds: ArchiveRevealId[]
) {
  return archiveRevealDefinitions
    .filter((definition) => unlockedRevealIds.includes(definition.id))
    .reduce(
      (total, definition) => total + definition.archivistInstability,
      0
    );
}

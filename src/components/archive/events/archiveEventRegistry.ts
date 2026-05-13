import type { ComponentType } from "react";

import { PartialFragmentReveal } from "./PartialFragmentReveal";
import { UnresolvedWordingReveal } from "./UnresolvedWordingReveal";

export type ArchiveEventId =
  | "unresolved-wording"
  | "partial-fragment";

export type ArchiveEventDefinition = {
  id: ArchiveEventId;
  label: string;
  stage:
    | "orientation"
    | "softening"
    | "partial-legibility"
    | "preservation-conflict"
    | "archivist-instability";
  emotionalSeverity: 1 | 2 | 3 | 4 | 5;
  archivistInstabilityImpact: number;
  repeatable: boolean;
  visibleAfter?: ArchiveEventId;
  Component: ComponentType<{
    onClose: () => void;
  }>;
};

export const archiveEventRegistry: ArchiveEventDefinition[] = [
  {
    id: "unresolved-wording",
    label: "Unresolved Wording",
    stage: "softening",
    emotionalSeverity: 2,
    archivistInstabilityImpact: 1,
    repeatable: false,
    Component: UnresolvedWordingReveal,
  },

  {
    id: "partial-fragment",
    label: "Partial Fragment",
    stage: "partial-legibility",
    emotionalSeverity: 3,
    archivistInstabilityImpact: 2,
    repeatable: false,
    visibleAfter: "unresolved-wording",
    Component: PartialFragmentReveal,
  },
];

export function getArchiveEvent(id: ArchiveEventId) {
  const event = archiveEventRegistry.find(
    (candidate) => candidate.id === id
  );

  if (!event) {
    throw new Error(`Unknown archive event: ${id}`);
  }

  return event;
}

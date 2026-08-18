import { useEffect, useState } from "react";

import type { ArchiveEventId } from "@/components/archive/events/archiveEventRegistry";

import {
  ARCHIVE_REVEAL_STORAGE_KEY,
  parseStoredArchiveReveals,
} from "./archiveRevealStorage";

function readStoredReveals() {
  if (typeof window === "undefined") {
    return {};
  }

  return parseStoredArchiveReveals(
    window.localStorage.getItem(ARCHIVE_REVEAL_STORAGE_KEY)
  );
}

/**
 * Owns the archive's persisted reveal/handling state: whether the
 * archivist preface has been dismissed, which reveal events have been
 * seen, and which artifacts have been handled. All three are persisted
 * to localStorage under a single key so a return visit resumes archive
 * handling where it left off.
 *
 * Deliberately does not own `activeEventId` — that's presentation state
 * for which event overlay (if any) is currently open, not persisted
 * progress, and stays in the page alongside the reveal-progression UI
 * that reads it.
 */
export function useArchiveRevealState() {
  const [prefaceDismissed, setPrefaceDismissed] = useState(() =>
    Boolean(readStoredReveals().prefaceDismissed)
  );

  const [seenEventIds, setSeenEventIds] = useState<ArchiveEventId[]>(() => {
    const stored = readStoredReveals().seenEventIds;
    return Array.isArray(stored) ? (stored as ArchiveEventId[]) : [];
  });

  const [handledArtifactIds, setHandledArtifactIds] = useState<Set<string>>(
    () => {
      const stored = readStoredReveals().handledArtifactIds;
      return Array.isArray(stored) ? new Set(stored) : new Set();
    }
  );

  const normalizedSeenEventIds = Array.isArray(seenEventIds)
    ? seenEventIds
    : [];
  const seenEventIdKey = [...normalizedSeenEventIds].sort().join("|");
  const handledArtifactIdKey = Array.from(handledArtifactIds).sort().join("|");

  useEffect(() => {
    window.localStorage.setItem(
      ARCHIVE_REVEAL_STORAGE_KEY,
      JSON.stringify({
        prefaceDismissed,
        seenEventIds: seenEventIdKey ? seenEventIdKey.split("|") : [],
        handledArtifactIds: handledArtifactIdKey
          ? handledArtifactIdKey.split("|")
          : [],
      })
    );
  }, [prefaceDismissed, seenEventIdKey, handledArtifactIdKey]);

  function markHandled(id: string) {
    setHandledArtifactIds((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  function resetHandling() {
    window.localStorage.removeItem(ARCHIVE_REVEAL_STORAGE_KEY);
    setPrefaceDismissed(false);
    setSeenEventIds([]);
    setHandledArtifactIds(new Set());
  }

  return {
    prefaceDismissed,
    setPrefaceDismissed,
    seenEventIds,
    normalizedSeenEventIds,
    setSeenEventIds,
    handledArtifactIds,
    markHandled,
    resetHandling,
  };
}

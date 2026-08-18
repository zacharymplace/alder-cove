export const ARCHIVE_REVEAL_STORAGE_KEY = "alder-cove.archive.reveals";

export type StoredArchiveReveals = {
  prefaceDismissed?: boolean;
  seenEventIds?: string[];
  handledArtifactIds?: string[];
};

/**
 * Parses the raw localStorage value for archive reveal/handling state.
 * Returns an empty object for missing or malformed data so callers can
 * apply their own per-field defaults, matching how archive/page.tsx
 * originally handled a missing/corrupt value inline at each call site.
 */
export function parseStoredArchiveReveals(
  raw: string | null
): StoredArchiveReveals {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

import { ArchivePrefaceOverlay } from "@/components/archive/ArchivePrefaceOverlay";

import {
  archiveEventRegistry,
  getArchiveEvent,
  type ArchiveEventId,
} from "./archiveEventRegistry";

export type ArchiveRevealProgressionProps = {
  prefaceDismissed: boolean;
  normalizedSeenEventIds: ArchiveEventId[];
  activeEventId: ArchiveEventId | null;
  archiveStage: string;
  archivistInstability: number;
  onTriggerEvent: (id: ArchiveEventId) => void;
  onEventClose: (id: ArchiveEventId) => void;
  onResetHandling: () => void;
  onDismissPreface: () => void;
};

/**
 * Owns the archive's reveal-progression UI: the archivist preface gate,
 * the floating buttons that trigger each not-yet-seen reveal event (in
 * registry order, respecting `visibleAfter`), the "archive handling
 * resumed" status once every event has been seen, the reset-handling
 * control, and the active event's overlay itself.
 *
 * All progress state (which events are seen, whether the preface is
 * dismissed) lives in the caller via useArchiveRevealState; this
 * component is purely presentational plus event dispatch.
 */
export function ArchiveRevealProgression({
  prefaceDismissed,
  normalizedSeenEventIds,
  activeEventId,
  archiveStage,
  archivistInstability,
  onTriggerEvent,
  onEventClose,
  onResetHandling,
  onDismissPreface,
}: ArchiveRevealProgressionProps) {
  return (
    <>
      {prefaceDismissed &&
        archiveEventRegistry.map((event) => {
          const alreadySeen = normalizedSeenEventIds.includes(event.id);

          const visible =
            !alreadySeen &&
            (!event.visibleAfter ||
              normalizedSeenEventIds.includes(event.visibleAfter));

          if (!visible) {
            return null;
          }

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onTriggerEvent(event.id)}
              className={[
                "fixed left-1/2 z-50 -translate-x-1/2 border bg-black/40 px-5 py-3 text-[10px] uppercase tracking-[0.3em] shadow-2xl backdrop-blur-sm transition hover:bg-black/60",
                event.id === "partial-fragment"
                  ? "bottom-24 border-red-100/10 text-red-100/55"
                  : "bottom-8 border-amber-100/15 text-neutral-300",
              ].join(" ")}
            >
              {event.label}
            </button>
          );
        })}

      {prefaceDismissed &&
        archiveEventRegistry.every((event) =>
          normalizedSeenEventIds.includes(event.id)
        ) &&
        !activeEventId && (
          <div className="pointer-events-none fixed bottom-8 left-1/2 z-40 -translate-x-1/2 border border-neutral-800 bg-black/25 px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-neutral-500 backdrop-blur-sm">
            archive handling resumed · {archiveStage.replaceAll("-", " ")} · instability {archivistInstability}
          </div>
        )}

      {prefaceDismissed && (
        <button
          type="button"
          onClick={onResetHandling}
          className="fixed left-8 top-8 z-50 border border-neutral-800 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-500 backdrop-blur-sm transition hover:text-neutral-300"
        >
          reset handling
        </button>
      )}

      {activeEventId &&
        (() => {
          const event = getArchiveEvent(activeEventId);
          const EventComponent = event.Component;

          return (
            <EventComponent onClose={() => onEventClose(activeEventId)} />
          );
        })()}

      {!prefaceDismissed && (
        <ArchivePrefaceOverlay onDismiss={onDismissPreface} />
      )}
    </>
  );
}

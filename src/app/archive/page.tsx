"use client";

import { useEffect, useState } from "react";
import {
  calculateArchivistInstability,
  getHighestUnlockedStage,
  type ArchiveRevealId,
} from "@/systems/archive/progression";

import { archiveDocuments } from "@/data/archive/archiveDocuments";
import { ArchiveAmbientLayer } from "@/components/archive/ArchiveAmbientLayer";
import { ArchivePrefaceOverlay } from "@/components/archive/ArchivePrefaceOverlay";
import {
  archiveEventRegistry,
  getArchiveEvent,
  type ArchiveEventId,
} from "@/components/archive/events/archiveEventRegistry";
import { ArchiveAtmosphereClutter } from "@/components/archive/artifactGrid/ArchiveAtmosphereClutter";
import { ArchiveSidebar } from "@/components/archive/artifactGrid/ArchiveSidebar";
import { ArtifactGrid } from "@/components/archive/artifactGrid/ArtifactGrid";
import { InspectionPanel } from "@/components/archive/artifactGrid/InspectionPanel";
import { FocusHint } from "@/components/archive/artifactGrid/FocusHint";

export default function ArchiveIndexPage() {
  const [clientReady, setClientReady] = useState(false);
  const [focusedArtifactId, setFocusedArtifactId] = useState<string | null>(null);
  const [handledArtifactIds, setHandledArtifactIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }

    try {
      const saved = window.localStorage.getItem("alder-cove.archive.reveals");
      const parsed = saved ? JSON.parse(saved) : {};
      return Array.isArray(parsed.handledArtifactIds)
        ? new Set(parsed.handledArtifactIds)
        : new Set();
    } catch {
      return new Set();
    }
  });
  const [inspectionIntentId, setInspectionIntentId] = useState<string | null>(
    null
  );
  const [accessFilter, setAccessFilter] = useState<string>("all");
  const [prefaceDismissed, setPrefaceDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      const saved = window.localStorage.getItem("alder-cove.archive.reveals");
      const parsed = saved ? JSON.parse(saved) : {};
      return Boolean(parsed.prefaceDismissed);
    } catch {
      return false;
    }
  });
  const [activeEventId, setActiveEventId] =
    useState<ArchiveEventId | null>(null);
  const [seenEventIds, setSeenEventIds] = useState<ArchiveEventId[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const saved = window.localStorage.getItem("alder-cove.archive.reveals");

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed?.seenEventIds)
        ? parsed.seenEventIds
        : [];
    } catch {
      return [];
    }
  });

  const handledArtifactIdList = Array.from(handledArtifactIds).sort();
  const handledArtifactIdKey = handledArtifactIdList.join("|");
  const normalizedSeenEventIds = Array.isArray(seenEventIds)
    ? seenEventIds
    : [];

  const seenEventIdKey = [...normalizedSeenEventIds].sort().join("|");

  useEffect(() => {
    window.localStorage.setItem(
      "alder-cove.archive.reveals",
      JSON.stringify({
        prefaceDismissed,
        seenEventIds: seenEventIdKey ? seenEventIdKey.split("|") : [],
        handledArtifactIds: handledArtifactIdKey
          ? handledArtifactIdKey.split("|")
          : [],
      })
    );
  }, [prefaceDismissed, seenEventIdKey, handledArtifactIdKey]);

   const unlockedRevealIds: ArchiveRevealId[] = [
    "archive-preface",
    ...(normalizedSeenEventIds.includes("unresolved-wording") ? (["unresolved-wording"] as ArchiveRevealId[]) : []),
    ...(normalizedSeenEventIds.includes("partial-fragment") ? (["partial-fragment"] as ArchiveRevealId[]) : []),
  ];

  const archiveStage = getHighestUnlockedStage(unlockedRevealIds);

  const archivistInstability =
    calculateArchivistInstability(unlockedRevealIds);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setInspectionIntentId(null);
      setActiveEventId(null);
      
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setClientReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  function markHandled(id: string) {
    setHandledArtifactIds((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }

  const privateJournal =
    archiveDocuments.find(
      (document) => document.id === "mara-private-journal-fragment"
    ) ?? {
      id: "mara-private-journal-fragment",
      title: "Mara — Private Journal Fragment",
      type: "private-journal",
      accessClass: "private",
      acquisitionMethod: "copied-without-permission",
      emotionalRisk: "intrusive",
      pageIds: [],
      description:
        "Loose private journal fragments believed to belong to Mara.",
      ethicalPressure:
        "The archive contains material that may never have been intended for anyone else to read.",
    };

  const displayArtifacts = [
    ...archiveDocuments.filter(
      (document) => document.id !== "mara-private-journal-fragment"
    ),

    privateJournal,

    {
      id: "east-shore-shelter-map",
      title: "East Shore — Shelter Map Draft",
      type: "copied-fragment",
      accessClass: "semi-private",
      acquisitionMethod: "copied-with-permission",
      emotionalRisk: "low",
      handlingState: "drying",
      pageIds: ["opening-left"],
      description:
        "A copied map draft with shoreline marks and higher-ground notes.",
      ethicalPressure: undefined,
    },

    {
      id: "council-meeting-fragments",
      title: "Council Meeting Fragments",
      type: "interview-note",
      accessClass: "semi-private",
      acquisitionMethod: "copied-with-permission",
      emotionalRisk: "medium",
      handlingState: "awaiting-review",
      pageIds: ["recovered-left", "recovered-right"],
      description:
        "Loose notes from a meeting that later copies reference indirectly.",
      ethicalPressure: undefined,
    },
  ];

  const visibleArtifacts =
    accessFilter === "all"
      ? displayArtifacts
      : displayArtifacts.filter(
          (document) => document.accessClass === accessFilter
        );

  const focusedArtifact = visibleArtifacts.find(
    (document) => document.id === focusedArtifactId
  );

  const inspectedArtifact = visibleArtifacts.find(
    (document) => document.id === inspectionIntentId
  );

  if (!clientReady) {
    return (
      <main className="min-h-screen bg-[#080706] text-neutral-100" />
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-neutral-100">

      <div className="relative min-h-screen px-8 py-7">
        <ArchiveAmbientLayer />
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
                onClick={() => setActiveEventId(event.id)}
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
            onClick={() => {
              window.localStorage.removeItem("alder-cove.archive.reveals");
              setPrefaceDismissed(false);
              setActiveEventId(null);
              setSeenEventIds([]);

              setHandledArtifactIds(new Set());
            }}
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
              <EventComponent
                onClose={() => {
                  setSeenEventIds((current) => [
                    ...new Set([...current, activeEventId]),
                  ]);

                  setActiveEventId(null);
                }}
              />
            );
          })()}

        {!prefaceDismissed && (
          <ArchivePrefaceOverlay onDismiss={() => setPrefaceDismissed(true)} />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_20%,rgba(255,205,120,0.12),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(80,45,20,0.28),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:36px_36px]" />

        <div
          className={[
            "relative mx-auto grid max-w-[1500px] grid-cols-[310px_1fr] gap-10 transition duration-700",
            prefaceDismissed ? "opacity-100 blur-0" : "opacity-35 blur-[1px]",
          ].join(" ")}
        >
          <ArchiveSidebar
            accessFilter={accessFilter}
            onSelectFilter={(item) => {
              setAccessFilter(item);
              setFocusedArtifactId(null);
              setInspectionIntentId(null);
            }}
          />

          <ArtifactGrid
            artifacts={visibleArtifacts}
            focusedArtifactId={focusedArtifactId}
            inspectionIntentId={inspectionIntentId}
            prefaceDismissed={prefaceDismissed}
            handledArtifactIds={handledArtifactIds}
            onHover={(id) => setFocusedArtifactId(id)}
            onToggleInspect={(id) =>
              setInspectionIntentId((current) => (current === id ? null : id))
            }
            onPickUp={(id) => markHandled(id)}
          />
        </div>

        <ArchiveAtmosphereClutter />

        {inspectionIntentId && (
          <button
            type="button"
            onClick={() => {
              setInspectionIntentId(null);
              setFocusedArtifactId(null);
            }}
            className="fixed right-8 bottom-8 z-[60] border border-amber-100/15 bg-black/45 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-neutral-300 shadow-2xl backdrop-blur-sm transition hover:bg-black/65"
          >
            set object down
          </button>
        )}

        {inspectedArtifact && (
          <InspectionPanel
            artifact={inspectedArtifact}
            onSetDown={() => {
              setInspectionIntentId(null);
              setFocusedArtifactId(null);
            }}
          />
        )}

        {focusedArtifact && !inspectionIntentId && (
          <FocusHint artifact={focusedArtifact} />
        )}

        <div className="absolute bottom-8 right-10 flex gap-7 text-xs text-neutral-400/70">
          <span>select</span>
          <span>archivist notes</span>
          <span>filter</span>
          <span>back</span>
        </div>
      </div>
    </main>
  );
}

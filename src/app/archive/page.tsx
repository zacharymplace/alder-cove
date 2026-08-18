"use client";

import { useEffect, useState } from "react";
import {
  calculateArchivistInstability,
  getHighestUnlockedStage,
  type ArchiveRevealId,
} from "@/systems/archive/progression";
import Link from "next/link";

import { archiveDocuments } from "@/data/archive/archiveDocuments";
import { ArchiveAmbientLayer } from "@/components/archive/ArchiveAmbientLayer";
import { ArchivePrefaceOverlay } from "@/components/archive/ArchivePrefaceOverlay";
import {
  archiveEventRegistry,
  getArchiveEvent,
  type ArchiveEventId,
} from "@/components/archive/events/archiveEventRegistry";
import {
  artifactInteractionClass,
  dotClass,
  focusLanguage,
  handlingStateClass,
  handlingStateLabel,
} from "@/components/archive/artifactGrid/artifactPresentation";
import { ArtifactVisual } from "@/components/archive/artifactGrid/ArtifactVisual";
import { ArchiveAtmosphereClutter } from "@/components/archive/artifactGrid/ArchiveAtmosphereClutter";

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
          <aside className="pt-3">
            <p className="text-xs uppercase tracking-[0.45em] text-amber-100/55">
              Alder Cove Archive
            </p>

            <h1 className="mt-20 font-serif text-6xl leading-[0.95] text-neutral-100">
              Preserved
              <br />
              Materials
            </h1>

            <p className="mt-8 max-w-[250px] text-base leading-relaxed text-neutral-300/80">
              Not every document entered the archive the same way. Some were
              shared. Some were copied later. Some may not have been meant to
              survive.
            </p>

            <div className="mt-14 h-px w-60 bg-neutral-700/40" />

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Filter by access
              </p>

              <div className="mt-5 space-y-3 text-sm text-neutral-300/80">
                {["all", "shared", "semi-private", "private", "illicitly-acquired"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setAccessFilter(item);
                        setFocusedArtifactId(null);
                        setInspectionIntentId(null);
                      }}
                      className={[
                        "flex w-full items-center gap-3 rounded px-2 py-1 text-left transition",
                        accessFilter === item
                          ? "bg-neutral-100/10 text-neutral-100"
                          : "hover:bg-neutral-100/5",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-3 w-3 rounded-full",
                          item === "all" ? "bg-neutral-300" : dotClass(item),
                        ].join(" ")}
                      />
                      <span>{item.replaceAll("-", " ")}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-20 rotate-[-2deg] border border-amber-100/15 bg-[#ad9666] p-6 text-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
              <p className="font-serif text-2xl italic">Archivist Note</p>
              <p className="mt-5 font-serif text-lg italic leading-relaxed">
                Some items remain unprocessed. Not all should be read.
              </p>
            </div>
          </aside>

          <section className="relative rounded-[2rem] border border-amber-950/45 bg-[#20140d]/80 px-10 pb-16 pt-10 shadow-[0_45px_140px_rgba(0,0,0,0.85)]">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_45%_25%,rgba(255,218,150,0.09),transparent_30%)]" />

            <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.06] mix-blend-overlay">
              <div className="absolute left-[20%] top-[15%] h-40 w-40 rounded-full bg-black blur-3xl" />
              <div className="absolute right-[15%] top-[25%] h-52 w-52 rounded-full bg-black blur-3xl" />
              <div className="absolute bottom-[20%] left-[40%] h-44 w-44 rounded-full bg-black blur-3xl" />
            </div>

            <div className="relative grid gap-x-14 gap-y-16 xl:grid-cols-3">
              {visibleArtifacts.map((document) => (
                <article
                  style={{
                    pointerEvents: prefaceDismissed ? "auto" : "none",
                  }}
                  key={document.id}
                  onMouseEnter={() => setFocusedArtifactId(document.id)}
                  onMouseLeave={() => setFocusedArtifactId(null)}
                  onFocus={() => setFocusedArtifactId(document.id)}
                  onBlur={() => setFocusedArtifactId(null)}
                  onClick={() =>
                    setInspectionIntentId((current) =>
                      current === document.id ? null : document.id
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setInspectionIntentId((current) =>
                        current === document.id ? null : document.id
                      );
                    }
                  }}
                  tabIndex={0}
                  className={[
                    "group relative outline-none transition duration-300",
                    focusedArtifactId === document.id ? "z-30 scale-[1.015]" : "",
                    inspectionIntentId === document.id ? "z-40 scale-[1.025]" : "",
                    document.type === "private-journal"
                      ? "mt-16"
                      : document.type === "interview-note"
                      ? "mt-24"
                      : "",
                  ].join(" ")}
                >
                  {inspectionIntentId === document.id && (
                    <>
                      <div className="pointer-events-none absolute inset-x-4 top-[-10px] z-30 h-px bg-amber-100/30" />
                      <div className="pointer-events-none absolute left-6 top-[-34px] z-40 border border-amber-100/15 bg-black/55 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-neutral-300 shadow-xl">
                        object in hand
                      </div>
                    </>
                  )}

                  {document.accessClass === "private" && (
                    <div className="pointer-events-none absolute inset-x-8 top-8 z-20 h-px bg-red-100/10" />
                  )}

                  {document.accessClass === "illicitly-acquired" && (
                    <div className="pointer-events-none absolute inset-6 z-20 border border-violet-200/10" />
                  )}

                  <div className="absolute right-6 top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-950/40 bg-black/25 shadow">
                    <span
                      className={`h-4 w-4 rounded-full ${dotClass(
                        document.accessClass
                      )}`}
                    />
                  </div>

                  <div
                    className={[
                      "relative z-10 transition",
                      artifactInteractionClass(document),
                      inspectionIntentId === document.id
                        ? "translate-y-[-10px] rotate-[0.4deg] drop-shadow-2xl"
                        : focusedArtifactId === document.id
                        ? "drop-shadow-2xl"
                        : "",
                    ].join(" ")}
                  >
                    <ArtifactVisual type={document.type} title={document.title} />
                  </div>

                  <div className={[
                      "relative z-20 mx-7 mt-[-18px] min-h-[138px] border border-neutral-900/20 bg-[#d4c4a4] p-4 font-mono text-xs text-neutral-950 shadow-[0_15px_40px_rgba(0,0,0,0.35)]",
                      document.type === "private-journal"
                        ? "rotate-[0.8deg]"
                        : document.type === "interview-note"
                        ? "rotate-[-1.4deg]"
                        : "rotate-[-0.4deg]",
                    ].join(" ")}>

                    <div className="absolute right-4 top-3 h-4 w-14 rotate-[4deg] rounded-sm bg-white/10" />
                    <div className="absolute left-4 top-[-10px] h-5 w-20 rotate-[-3deg] bg-[#f1e2bb]/35 shadow-sm" />
                    <div className="absolute bottom-3 right-4 text-[8px] uppercase tracking-[0.18em] text-neutral-950/10">
                      revised
                    </div>
                    <div className="absolute left-3 bottom-2 h-px w-16 rotate-[-2deg] bg-neutral-950/10" />
                    <div className="absolute left-4 top-[-10px] h-5 w-20 rotate-[-3deg] bg-[#f1e2bb]/35 shadow-sm" />

                    <h2 className="font-sans text-base font-semibold leading-snug">
                      {document.title}
                    </h2>

                    <p className="mt-3 text-[11px] leading-relaxed text-neutral-700">
                      <span className="text-amber-900">
                        {document.accessClass.replaceAll("-", " ")}
                      </span>{" "}
                      · {document.acquisitionMethod.replaceAll("-", " ")} · risk:{" "}
                      {document.emotionalRisk}
                    </p>

                    <div className="my-4 h-px bg-neutral-900/20" />

                    <p className="text-[11px] text-neutral-700">
                      {document.pageIds.length} pages indexed
                    </p>

                    <p
                      className={[
                        "mt-3 text-[10px] uppercase tracking-[0.24em]",
                        handlingStateClass("handlingState" in document ? document.handlingState : "awaiting-review"),
                      ].join(" ")}
                    >
                      {"handlingState" in document ? handlingStateLabel(document.handlingState) : handlingStateLabel("awaiting-review")}
                    </p>

                    {(focusedArtifactId === document.id ||
                      inspectionIntentId === document.id) && (
                      <p className="mt-3 border-l border-neutral-900/20 pl-3 text-[10px] italic leading-relaxed text-neutral-800/55">
                        {focusLanguage(document)}
                      </p>
                    )}

                    {inspectionIntentId === document.id &&
                      document.id !== "notebook-one-shared" && (
                        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-red-900/60">
                          review withheld
                        </p>
                      )}

                    <Link
                      href={`/archive/${document.id}`}
                      onClick={() => markHandled(document.id)}
                      className={[
                        "mt-4 inline-block uppercase tracking-[0.28em] underline-offset-4 hover:underline",
                        document.id === "notebook-one-shared"
                          ? "text-neutral-900"
                          : "text-red-900/70",
                      ].join(" ")}
                    >
                      {document.id === "notebook-one-shared"
                        ? handledArtifactIds.has(document.id)
                          ? "return to artifact"
                          : "pick up"
                        : "approach artifact"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
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
          <aside className="fixed right-8 top-24 z-50 max-h-[calc(100vh-8rem)] w-[380px] overflow-y-auto border border-amber-100/15 bg-[#11100d]/95 p-5 text-sm text-neutral-200 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-amber-100/45">
                object in hand
              </p>

              <button
                type="button"
                onClick={() => {
                  setInspectionIntentId(null);
                  setFocusedArtifactId(null);
                }}
                className="border border-amber-100/15 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-300 transition hover:bg-black/50"
              >
                set down
              </button>
            </div>

            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-100/45">
              handling note
            </p>

            <h2 className="mt-3 font-serif text-2xl italic text-neutral-100">
              {inspectedArtifact.title}
            </h2>

            <p className="mt-4 leading-relaxed text-neutral-400">
              {inspectedArtifact.description}
            </p>

            {inspectedArtifact.ethicalPressure && (
              <p className="mt-4 border-l border-red-200/15 pl-4 italic leading-relaxed text-red-100/55">
                {inspectedArtifact.ethicalPressure}
              </p>
            )}

            <div className="mt-5 space-y-2 border-t border-neutral-800 pt-4 text-xs text-neutral-500">
              <p>access: {inspectedArtifact.accessClass.replaceAll("-", " ")}</p>
              <p>
                acquisition:{" "}
                {inspectedArtifact.acquisitionMethod.replaceAll("-", " ")}
              </p>
              <p>
                handling:{" "}
                {handlingStateLabel("handlingState" in inspectedArtifact ? inspectedArtifact.handlingState : undefined)}
              </p>
              <p>risk: {inspectedArtifact.emotionalRisk}</p>
              <p>{inspectedArtifact.pageIds.length} pages indexed</p>
            </div>
          </aside>
        )}

        {focusedArtifact && !inspectionIntentId && (
          <div className="pointer-events-none fixed right-8 top-24 z-40 max-w-[320px] rounded border border-amber-100/10 bg-black/35 px-4 py-3 text-xs text-neutral-300/80 shadow-2xl backdrop-blur-sm">
            <p className="uppercase tracking-[0.28em] text-amber-100/45">
              handling focus
            </p>
            <p className="mt-2 font-serif text-lg italic text-neutral-100/80">
              {focusedArtifact.title}
            </p>
            <p className="mt-2 leading-relaxed text-neutral-400">
              {focusedArtifact.accessClass.replaceAll("-", " ")} ·{" "}
              {handlingStateLabel("handlingState" in focusedArtifact ? focusedArtifact.handlingState : undefined)}
              {focusedArtifact.accessClass === "private"
                ? " · approach slowly"
                : focusedArtifact.accessClass === "illicitly-acquired"
                ? " · acquisition unclear"
                : " · paper shifts slightly"}
            </p>
          </div>
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

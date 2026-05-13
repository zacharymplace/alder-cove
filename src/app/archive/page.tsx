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
import { UnresolvedWordingReveal } from "@/components/archive/events/UnresolvedWordingReveal";
import { PartialFragmentReveal } from "@/components/archive/events/PartialFragmentReveal";

function dotClass(accessClass: string) {
  switch (accessClass) {
    case "shared":
      return "bg-amber-200";
    case "semi-private":
      return "bg-blue-300";
    case "private":
      return "bg-red-700";
    case "illicitly-acquired":
      return "bg-violet-400";
    default:
      return "bg-neutral-400";
  }
}


function handlingStateClass(state: string) {
  switch (state) {
    case "stable":
      return "text-emerald-200/70";
    case "drying":
      return "text-amber-200/70";
    case "over-handled":
      return "text-red-200/70";
    case "reconstructed":
      return "text-violet-200/70";
    case "awaiting-review":
      return "text-blue-200/70";
    case "sealed":
      return "text-neutral-300/65";
    default:
      return "text-neutral-300/60";
  }
}

function handlingStateLabel(state?: string) {
  return (state ?? "awaiting-review").replaceAll("-", " ");
}


function artifactInteractionClass(document: {
  accessClass: string;
  type: string;
  handlingState?: string;
}) {
  if (document.accessClass === "private") {
    return "duration-700 ease-out group-hover:translate-y-[-3px] group-hover:rotate-[-0.3deg]";
  }

  if (document.accessClass === "illicitly-acquired") {
    return "duration-1000 ease-out group-hover:translate-y-[-2px] group-hover:rotate-[0.2deg]";
  }

  if (document.handlingState === "over-handled") {
    return "duration-300 ease-out group-hover:translate-y-[-7px] group-hover:rotate-[0.4deg]";
  }

  return "duration-300 ease-out group-hover:translate-y-[-5px]";
}

function focusLanguage(document: {
  accessClass: string;
  type: string;
  handlingState?: string;
}) {
  if (document.accessClass === "private") {
    return "the archive slows before this one";
  }

  if (document.accessClass === "illicitly-acquired") {
    return "the record does not explain how this arrived";
  }

  if (document.handlingState === "drying") {
    return "paper still remembers water";
  }

  if (document.handlingState === "over-handled") {
    return "edges lift slightly from repeated handling";
  }

  return "handling notes shift into view";
}

function artifactVisual(type: string, title: string) {
  if (type === "shared-notebook") {
    return (
      <div className="relative h-[350px] rounded-lg border border-neutral-900/30 bg-[#b99f69] shadow-[0_35px_90px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-y-0 left-0 w-10 rounded-l-lg bg-neutral-950/55" />
        <div className="absolute inset-y-0 left-12 w-2 bg-neutral-900/35" />
        <div className="absolute inset-y-0 left-[70px] flex flex-col justify-around py-6">
          {Array.from({ length: 13 }).map((_, index) => (
            <span
              key={index}
              className="h-5 w-5 rounded-full border border-neutral-950/60 bg-black/45"
            />
          ))}
        </div>

        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_65%_80%,rgba(80,40,10,0.22),transparent_35%)]" />
        <div className="absolute right-0 top-16 h-28 w-3 rounded-l-full bg-neutral-950/10" />
        <div className="absolute bottom-0 left-24 h-3 w-40 rounded-t-full bg-neutral-950/8" />

        <div className="absolute left-[88px] top-[120px] h-[180px] w-[2px] bg-black/12 blur-[1px]" />

        <div className="absolute left-[145px] bottom-[55px] h-10 w-28 rounded-full bg-black/8 blur-xl" />

        <div className="absolute right-[24px] top-[110px] h-20 w-3 rounded-l-full bg-white/6" />

        <div className="absolute left-[88px] top-[120px] h-[180px] w-[2px] bg-black/12 blur-[1px]" />

        <div className="absolute left-[145px] bottom-[55px] h-10 w-28 rounded-full bg-black/8 blur-xl" />

        <div className="absolute right-[24px] top-[110px] h-20 w-3 rounded-l-full bg-white/6" />

        <div className="absolute left-32 top-24 rotate-[-1deg] font-serif text-4xl italic leading-tight text-neutral-950">
          Notebook
          <br />
          One
        </div>

        <p className="absolute left-32 top-44 rotate-[-1deg] text-sm italic text-neutral-800">
          Shared Group Notebook
        </p>

        <div className="absolute bottom-16 left-32 right-14 h-px bg-neutral-900/20" />

        <div className="absolute bottom-24 left-36 rotate-[-2deg] rounded bg-[#d8c7a2]/80 px-6 py-2 text-sm italic text-neutral-900 shadow">
          shared copy
        </div>

        <div className="absolute right-8 bottom-9 h-12 w-20 rotate-[8deg] bg-[#e2d1aa]/45 shadow-md" />

        <div className="absolute right-8 bottom-9 h-12 w-20 rotate-[8deg] bg-[#e2d1aa]/45 shadow-md" />

        <div className="absolute right-10 top-20 rotate-[6deg] text-[10px] uppercase tracking-[0.25em] text-red-950/40">
          repeatedly handled
        </div>

        <div className="absolute right-8 top-28 rotate-[6deg] text-[9px] uppercase tracking-[0.22em] text-red-950/22">
          handled again
        </div>

        <div className="absolute right-7 top-34 rotate-[6deg] text-[8px] uppercase tracking-[0.2em] text-red-950/14">
          again
        </div>
      </div>
    );
  }

  if (type === "private-journal") {
    return (
      <div className="relative h-[350px] rounded-lg border border-neutral-800/70 bg-[#171412] shadow-[0_35px_90px_rgba(0,0,0,0.75)]">
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_70%_85%,rgba(0,0,0,0.45),transparent_38%)]" />
        <div className="absolute left-0 top-20 h-32 w-2 rounded-r-full bg-white/5" />
        <div className="absolute right-0 bottom-16 h-28 w-2 rounded-l-full bg-black/30" />

        <div className="absolute inset-6 rounded border border-red-900/10" />

        <div className="absolute bottom-12 left-1/2 h-px w-28 -translate-x-1/2 bg-red-100/10" />

        <div className="absolute top-14 left-14 right-14 h-px bg-white/6" />

        <div className="absolute inset-6 rounded border border-red-900/10" />

        <div className="absolute bottom-12 left-1/2 h-px w-28 -translate-x-1/2 bg-red-100/10" />

        <div className="absolute top-14 left-14 right-14 h-px bg-white/6" />
        <div className="absolute inset-x-10 top-1/2 h-2 rounded-full bg-black/65" />
        <div className="absolute inset-y-10 left-1/2 w-2 rounded-full bg-black/60" />

        <div className="absolute left-12 top-20 h-16 w-28 rotate-[8deg] bg-[#d8c7a2]/20 shadow" />

        <div className="absolute left-12 top-20 h-16 w-28 rotate-[8deg] bg-[#d8c7a2]/20 shadow" />

        <div className="absolute left-16 right-16 top-24 rotate-[-4deg] bg-[#c9b995] px-5 py-5 text-center font-serif text-2xl italic leading-tight text-neutral-950 shadow-lg">
          Mara
          <br />
          private
          <br />
          fragment
        </div>

        <div className="absolute right-8 top-8 h-5 w-5 rounded-full bg-red-800 shadow" />
        <div className="absolute bottom-10 left-10 right-10 border-t border-dashed border-red-200/10" />

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 rotate-[2deg] rounded bg-red-950/55 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-red-100/70">
          sealed pending review
        </div>

        <div className="absolute bottom-7 right-8 rotate-[-4deg] text-[10px] uppercase tracking-[0.24em] text-red-100/25">
          not copied into index
        </div>

        <div className="absolute bottom-7 right-8 rotate-[-4deg] text-[10px] uppercase tracking-[0.24em] text-red-100/25">
          not copied into index
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[350px] rotate-[0.5deg] rounded-lg border border-neutral-900/30 bg-[#927f58] shadow-[0_35px_90px_rgba(0,0,0,0.65)]">
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_45%_25%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(55,28,10,0.28),transparent_35%)]" />
      <div className="absolute right-0 top-14 h-24 w-2 rounded-l-full bg-neutral-950/10" />
      <div className="absolute bottom-0 left-12 h-2 w-32 rounded-t-full bg-neutral-950/8" />

      <div className="absolute left-[40px] bottom-[30px] h-12 w-44 rotate-[1deg] rounded-full bg-black/6 blur-xl" />

      <div className="absolute right-[18px] bottom-[22px] h-16 w-3 rounded-l-full bg-black/8" />

      <div className="absolute inset-x-[32px] top-[180px] h-px bg-neutral-950/10" />

      <div className="absolute left-[40px] bottom-[30px] h-12 w-44 rotate-[1deg] rounded-full bg-black/6 blur-xl" />

      <div className="absolute right-[18px] bottom-[22px] h-16 w-3 rounded-l-full bg-black/8" />

      <div className="absolute inset-x-[32px] top-[180px] h-px bg-neutral-950/10" />
      <div className="absolute left-5 top-4 h-10 w-3 rotate-[-8deg] rounded-sm border border-neutral-900/30 bg-neutral-300/35 shadow" />
      <div className="absolute right-10 bottom-14 h-10 w-24 rotate-[5deg] bg-[#d8c7a2]/24 shadow" />
      <div className="absolute right-10 bottom-14 h-10 w-24 rotate-[5deg] bg-[#d8c7a2]/24 shadow" />


      <p className="absolute left-12 top-24 rotate-[-2deg] max-w-[220px] font-serif text-3xl italic leading-tight text-neutral-950">
        {title.replace(" — ", "\n")}
      </p>

      <div className="absolute bottom-20 left-12 right-12 h-px bg-neutral-950/25" />

      <div className="absolute bottom-10 left-12 rotate-[-2deg] text-[10px] uppercase tracking-[0.24em] text-neutral-950/40">
        flattening after water exposure
      </div>
    </div>
  );
}

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
      return false;
    }

    try {
      const saved = window.localStorage.getItem("alder-cove.archive.reveals");
      const parsed = saved ? JSON.parse(saved) : {};
      return Array.isArray(parsed.seenEventIds)
        ? parsed.seenEventIds
        : [];
    } catch {
      return false;
    }
  });


  const handledArtifactIdList = Array.from(handledArtifactIds).sort();
  const handledArtifactIdKey = handledArtifactIdList.join("|");

  useEffect(() => {
    window.localStorage.setItem(
      "alder-cove.archive.reveals",
      JSON.stringify({
        prefaceDismissed,
        seenEventIds,
        handledArtifactIds: handledArtifactIdKey
          ? handledArtifactIdKey.split("|")
          : [],
      })
    );
  }, [prefaceDismissed, seenEventIds.includes("unresolved-wording"), seenEventIds.includes("partial-fragment")]);

   const unlockedRevealIds: ArchiveRevealId[] = [
    "archive-preface",
    ...(seenEventIds.includes("unresolved-wording") ? (["unresolved-wording"] as ArchiveRevealId[]) : []),
    ...(seenEventIds.includes("partial-fragment") ? (["partial-fragment"] as ArchiveRevealId[]) : []),
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
      setControlledRevealOpen(false);
      setMicroLegibilityOpen(false);
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
            const alreadySeen = seenEventIds.includes(event.id);

            const visible =
              !alreadySeen &&
              (!event.visibleAfter ||
                seenEventIds.includes(event.visibleAfter));

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
            seenEventIds.includes(event.id)
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
              setControlledRevealOpen(false);
              setMicroLegibilityOpen(false);
              setControlledRevealSeen(false);
              setMicroLegibilitySeen(false);
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
                    {artifactVisual(document.type, document.title)}
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
                        handlingStateClass(document.handlingState ?? "awaiting-review"),
                      ].join(" ")}
                    >
                      {handlingStateLabel(document.handlingState)}
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

        <div className="pointer-events-none absolute bottom-2 left-[300px] rotate-[-2deg] border border-amber-100/10 bg-[#7c6b4f]/65 px-6 py-3 font-serif text-xl italic text-neutral-950/90 shadow-2xl">
          Handle with care.
          <br />
          Memory breaks easily.
        </div>


        <div className="pointer-events-none absolute bottom-[75px] right-[90px] h-28 w-56 rotate-[8deg] border border-neutral-900/20 bg-[#8e7a55]/30 shadow-2xl opacity-55">
          <div className="absolute left-6 top-6 h-px w-36 bg-neutral-950/20" />
          <p className="absolute left-6 top-10 rotate-[-2deg] font-serif text-xl italic text-neutral-950/55">
            unprocessed
            <br />
            loose copies
          </p>
          <div className="absolute right-8 top-5 h-8 w-3 rotate-[12deg] bg-neutral-200/25" />
        </div>


        <div className="pointer-events-none absolute right-[340px] top-[120px] rotate-[5deg] border border-neutral-900/20 bg-[#8f7b58]/55 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-950/60">
            revisit after drying
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-[260px] right-[110px] rotate-[-6deg] border border-neutral-900/15 bg-[#6e6047]/55 px-5 py-3 shadow-xl">
          <p className="font-serif text-lg italic text-neutral-950/55">
            copied pages
            <br />
            still separating
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-[180px] left-[420px] h-20 w-32 rotate-[8deg] border border-neutral-900/15 bg-[#988568]/35 shadow-2xl">
          <div className="absolute inset-x-5 top-5 h-px bg-neutral-950/20" />
          <div className="absolute inset-x-5 top-9 h-px bg-neutral-950/15" />
          <div className="absolute inset-x-5 top-13 h-px bg-neutral-950/12" />
          <p className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.2em] text-neutral-950/35">
            unsorted
          </p>
        </div>

        <div className="pointer-events-none absolute left-[530px] top-[470px] rotate-[-3deg] bg-[#e2d1aa]/25 px-5 py-2 shadow">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-950/45">
            compare wording later
          </p>
        </div>

        <div className="pointer-events-none absolute left-[760px] top-[210px] h-10 w-40 rotate-[2deg] border border-dashed border-red-200/10 bg-red-950/5" />

        <div className="pointer-events-none absolute bottom-[80px] right-[260px] rotate-[6deg] border border-neutral-900/15 bg-[#9b8866]/30 px-6 py-4 shadow-xl opacity-55">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/50">
            some copies become
            <br />
            gentler over time
          </p>
        </div>


        <div className="pointer-events-none absolute right-[510px] bottom-[145px] rotate-[-4deg] border border-neutral-900/20 bg-[#d5c4a0]/70 px-6 py-4 shadow-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-950/45">
            active comparison
          </p>
          <p className="mt-3 font-serif text-lg italic leading-relaxed text-neutral-950/65">
            he was scared
          </p>
          <div className="mt-1 h-px w-28 bg-red-900/35" />
          <p className="mt-2 font-serif text-lg italic leading-relaxed text-neutral-950/50">
            he sounded scared
          </p>
        </div>

        <div className="pointer-events-none absolute right-[390px] bottom-[245px] rotate-[3deg] border border-neutral-900/20 bg-[#cab891]/65 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-950/50">
            copy feels wrong
          </p>
        </div>

        <div className="pointer-events-none absolute right-[145px] top-[520px] rotate-[6deg] border border-red-900/15 bg-red-950/10 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-100/45">
            do not file yet
          </p>
        </div>

        <div className="pointer-events-none absolute left-[640px] bottom-[75px] rotate-[-1deg] border border-neutral-900/20 bg-[#b9a27a]/55 px-6 py-4 shadow-2xl">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/55">
            ask again before
            <br />
            copying this version
          </p>
        </div>


        <div className="pointer-events-none absolute left-[720px] top-[640px] h-24 w-24 rounded-full border border-neutral-900/10 opacity-20" />

        <div className="pointer-events-none absolute left-[1110px] top-[410px] h-10 w-10 rounded-full border border-neutral-900/10 opacity-10" />

        <div className="pointer-events-none absolute left-[980px] top-[700px] rotate-[5deg] text-[10px] uppercase tracking-[0.2em] text-neutral-950/10">
          graphite transfer
        </div>

        <div className="pointer-events-none absolute right-[520px] top-[540px] h-20 w-20 rounded-full bg-black/10 blur-xl" />

        <div className="pointer-events-none absolute left-[470px] bottom-[260px] h-3 w-16 rotate-[12deg] bg-[#f3e2bb]/20 shadow-sm" />

        <div className="pointer-events-none absolute left-[1080px] bottom-[210px] h-12 w-12 rounded-full border border-amber-100/10 opacity-10" />

        <div className="pointer-events-none absolute left-[615px] top-[345px] rotate-[-4deg] text-[9px] uppercase tracking-[0.2em] text-red-100/18">
          compare against dry-box copy
        </div>

        <div className="pointer-events-none absolute left-[865px] top-[305px] h-4 w-20 rotate-[7deg] bg-[#efe1bb]/12" />

        <div className="pointer-events-none absolute right-[210px] bottom-[145px] rotate-[9deg] text-[9px] uppercase tracking-[0.2em] text-neutral-950/10">
          clipped here before
        </div>


        <div className="pointer-events-none absolute left-[650px] top-[720px] rotate-[2deg] border border-neutral-900/15 bg-[#cab892]/35 px-5 py-3 shadow-xl opacity-55">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-950/45">
            reviewed again after interview
          </p>
        </div>

        <div className="pointer-events-none absolute left-[765px] top-[760px] rotate-[-5deg] border border-neutral-900/20 bg-[#d8c7a2]/35 px-5 py-4 shadow-2xl opacity-50">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/60">
            wording keeps softening
          </p>
        </div>

        <div className="pointer-events-none absolute left-[880px] top-[800px] rotate-[4deg] border border-dashed border-red-900/10 bg-red-950/5 px-5 py-4 shadow-xl opacity-45">
          <p className="font-serif text-lg italic leading-relaxed text-red-100/40">
            maybe nobody remembers
            <br />
            the original wording now
          </p>
        </div>

        <div className="pointer-events-none absolute right-[330px] top-[170px] rotate-[-3deg] border border-neutral-900/20 bg-[#9e8b69]/55 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-950/45">
            compare with earlier graphite copy
          </p>
        </div>

        <div className="pointer-events-none absolute right-[465px] top-[355px] h-12 w-28 rotate-[7deg] bg-[#efe1bb]/12 shadow-md" />

        <div className="pointer-events-none absolute left-[535px] top-[270px] rotate-[9deg] text-[9px] uppercase tracking-[0.2em] text-neutral-950/15">
          copied again later
        </div>

        <div className="pointer-events-none absolute left-[1080px] top-[700px] rotate-[-6deg] border border-neutral-900/15 bg-[#897659]/30 px-5 py-3 shadow-xl opacity-55">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/50">
            still avoiding
            <br />
            direct wording
          </p>
        </div>


        <div className="pointer-events-none absolute left-[860px] top-[455px] h-3 w-20 rotate-[-8deg] bg-[#f1e2bb]/10 shadow-sm" />

        <div className="pointer-events-none absolute left-[980px] top-[720px] h-3 w-24 rotate-[5deg] bg-[#f1e2bb]/10 shadow-sm" />


        <div className="pointer-events-none absolute left-[945px] top-[250px] rotate-[2deg] border border-neutral-900/15 bg-[#8e7a58]/35 px-5 py-3 shadow-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-950/28">
            review again
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-950/20">
            review again
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-950/9">
            review again
          </p>
        </div>

        <div className="pointer-events-none absolute left-[525px] top-[430px] rotate-[-7deg] border border-neutral-900/20 bg-[#d0bf98]/45 px-5 py-4 shadow-2xl">
          <p className="font-serif text-base italic leading-relaxed text-neutral-950/45">
            copied from a copy
            <br />
            after already copying
          </p>
        </div>

        <div className="pointer-events-none absolute left-[845px] top-[455px] rotate-[4deg] border border-red-900/10 bg-red-950/5 px-5 py-3 shadow-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-100/30">
            unable to finalize wording
          </p>
        </div>


        <div className="pointer-events-none absolute right-[210px] top-[310px] h-10 w-40 rotate-[3deg] rounded-full bg-black/6 blur-2xl" />

        <div className="pointer-events-none absolute right-[245px] top-[360px] rotate-[-4deg] border border-neutral-900/15 bg-[#a89266]/35 px-5 py-3 shadow-xl">
          <p className="font-serif text-base italic leading-relaxed text-neutral-950/42">
            this was supposed
            <br />
            to be the last pass
          </p>
        </div>

        <div className="pointer-events-none absolute left-[690px] bottom-[310px] rotate-[8deg] text-[9px] uppercase tracking-[0.22em] text-neutral-950/10">
          copied after midnight
        </div>

        <div className="pointer-events-none absolute right-[430px] bottom-[260px] rotate-[-2deg] border border-neutral-900/15 bg-[#c7b58e]/40 px-5 py-3 shadow-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-950/32">
            no final version located
          </p>
        </div>


        <div className="pointer-events-none absolute left-[430px] bottom-[470px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-neutral-950/14">
          recopied twice
        </div>

        <div className="pointer-events-none absolute left-[452px] bottom-[458px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-neutral-950/10">
          amended later
        </div>

        <div className="pointer-events-none absolute left-[470px] bottom-[446px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-red-100/10">
          compare testimony version
        </div>

        <div className="pointer-events-none absolute left-[590px] bottom-[145px] rotate-[-5deg] border border-neutral-900/20 bg-[#6f5f46]/35 px-5 py-3 shadow-xl">
          <p className="font-serif text-base italic leading-relaxed text-neutral-950/42">
            keep the softer one
            <br />
            until someone asks
          </p>
        </div>


        <div className="pointer-events-none absolute left-[390px] top-[118px] h-2 w-2 rounded-full bg-black/20 shadow-sm" />
        <div className="pointer-events-none absolute left-[392px] top-[124px] h-1.5 w-1.5 rounded-full bg-black/10" />
        <div className="pointer-events-none absolute left-[395px] top-[132px] h-1 w-1 rounded-full bg-black/10" />

        <div className="pointer-events-none absolute left-[755px] top-[138px] h-2 w-2 rounded-full bg-red-950/25" />
        <div className="pointer-events-none absolute left-[762px] top-[145px] h-1.5 w-1.5 rounded-full bg-red-950/18" />

        <div className="pointer-events-none absolute right-[235px] top-[90px] h-20 w-3 rotate-[-8deg] rounded-sm bg-[#e9ddc4]/18 shadow" />
        <div className="pointer-events-none absolute right-[228px] top-[92px] h-20 w-px rotate-[-8deg] bg-neutral-950/12" />

        <div className="pointer-events-none absolute left-[1030px] top-[545px] h-1 w-28 rotate-[3deg] bg-black/10 blur-sm" />
        <div className="pointer-events-none absolute left-[1015px] top-[550px] h-1 w-32 rotate-[3deg] bg-white/5" />

        <div className="pointer-events-none absolute left-[875px] bottom-[215px] h-2 w-20 rotate-[-4deg] bg-[#e8d4a3]/18" />
        <div className="pointer-events-none absolute left-[880px] bottom-[212px] h-px w-16 rotate-[-4deg] bg-neutral-950/12" />

        <div className="pointer-events-none absolute right-[165px] bottom-[235px] h-14 w-1 rotate-[9deg] rounded-sm bg-[#e6d8bc]/15 shadow" />

        <div className="pointer-events-none absolute left-[580px] top-[515px] h-1 w-24 rotate-[-2deg] bg-neutral-950/10 blur-sm" />

        <div className="pointer-events-none absolute left-[645px] bottom-[465px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-neutral-950/9">
          erased once
        </div>

        <div className="pointer-events-none absolute right-[370px] bottom-[420px] rotate-[-5deg] text-[8px] uppercase tracking-[0.18em] text-red-100/9">
          pressure mark remains
        </div>




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
                {handlingStateLabel(inspectedArtifact.handlingState)}
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
              {handlingStateLabel(focusedArtifact.handlingState)}
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

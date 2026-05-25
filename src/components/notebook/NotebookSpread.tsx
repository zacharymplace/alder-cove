"use client";

import Link from "next/link";

import { TOTAL_NOTEBOOK_SPREADS, useNotebookState } from "../../systems/notebook/inspectionState";

import { motion } from "framer-motion";
import clsx from "clsx";

import { notebookOneSpread, type NotebookNote } from "@/data/notebook/notebookOne";
import { getSpreadDefinition } from "@/data/notebook/spreadDefinitions";
import { getArchiveDocument } from "@/data/archive/archiveDocuments";
import { getNotebookPage } from "@/data/notebook/pages";






function spreadShellClass(paperTone?: "aged" | "water-damaged" | "warm") {
  switch (paperTone) {
    case "water-damaged":
      return "bg-[#e2d0a2]";
    case "warm":
      return "bg-[#f0dfad]";
    case "aged":
    default:
      return "bg-[#ecdfb7]";
  }
}

function spreadResidueClass(residueDensity?: "light" | "heavy" | "soft") {
  switch (residueDensity) {
    case "heavy":
      return "opacity-70";
    case "soft":
      return "opacity-25";
    case "light":
    default:
      return "opacity-40";
  }
}

function noteClass(variant?: NotebookNote["variant"]) {
  switch (variant) {
    case "founding":
      return "text-4xl font-black uppercase leading-tight";
    case "contradiction":
      return "border border-dashed border-neutral-700/20 bg-white/10";
    case "warning":
      return "border-l-2 border-red-900/50 bg-red-100/20";
    case "map":
      return "border border-blue-900/20 bg-blue-50/20";
    case "symbol":
      return "border border-amber-900/20 bg-amber-50/20";
    case "log":
      return "bg-white/20";
    default:
      return "italic";
  }
}



function handwritingClass(handwriting?: NotebookNote["handwriting"]) {
  switch (handwriting) {
    case "coauthor":
      return "tracking-[0.02em] leading-[1.05] font-black";
    case "archivist":
      return "tracking-[0.08em]";
    case "skeptic":
      return "tracking-tight italic";
    case "sibling":
      return "tracking-wide";
    case "chameleon":
      return "tracking-normal";
    default:
      return "";
  }
}

function phaseClass(phase?: NotebookNote["yearPhase"]) {
  switch (phase) {
    case "childhood":
      return "opacity-100";
    case "early-adolescence":
      return "opacity-90";
    case "late-adolescence":
      return "opacity-80";
    default:
      return "";
  }
}

function Tape({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "absolute h-5 w-20 rotate-[-5deg] bg-neutral-100/45 shadow-sm",
        "before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.35)_0_3px,transparent_3px_8px)]",
        className
      )}
    />
  );
}

function Sticker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700/30 bg-white/55 text-lg shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

function TapedFragment({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("relative rounded-sm bg-[#f4e7bd] p-4 shadow-md", className)}>
      <Tape className="-top-2 left-8" />
      {children}
    </div>
  );
}

export function Note({
  note,
  rotate,
}: {
  note: NotebookNote;
  rotate?: string;
}) {
  const {
    selectedId,
    select,
    unstable,
    memoryLayer,
    instabilityLevel,
    collapseTriggered,
    revisionPhase,
  } = useNotebookState();
  const allNotes = [...notebookOneSpread.leftPage, ...notebookOneSpread.rightPage];
  const selectedNote = allNotes.find((candidate) => candidate.id === selectedId);
  if (!note) {
    return null;
  }

  const selected = selectedId === note.id;
  const related = selectedNote?.relatedNoteIds?.includes(note.id) ?? false;

  let unstableText = note.text;

  if (memoryLayer === "original" && note.originalText) {
    unstableText = note.originalText;
  }

  if (
    memoryLayer === "reconstructed" &&
    note.reconstructedText
  ) {
    unstableText = note.reconstructedText;
  }

  if (
    unstable &&
    note.id === "eli-contradiction-a"
  ) {
    unstableText = "Eli doesnt go below after storms anymore.";
  }

  if (
    instabilityLevel >= 2 &&
    note.id === "eli-contradiction-b"
  ) {
    unstableText = "he always wanted to go first";
  }

  if (
    instabilityLevel >= 3 &&
    note.id === "cannery-line"
  ) {
    unstableText = "The cannery gives people back wrong sometimes.";
  }

  if (
    instabilityLevel >= 4 &&
    note.id === "later-rule"
  ) {
    unstableText = "The town changes people when nobody checks.";
  }

  if (
    collapseTriggered &&
    note.id === "eli-contradiction-a"
  ) {
    unstableText = "Eli said the tunnels remembered things wrong.";
  }

  if (
    collapseTriggered &&
    note.id === "eli-contradiction-b"
  ) {
    unstableText = "he wasnt scared until after the cannery";
  }

  if (
    collapseTriggered &&
    note.id === "cannery-line"
  ) {
    unstableText = "The cannery gives people back wrong sometimes.";
  }

  if (
    revisionPhase >= 1 &&
    note.id === "stop-saying-that"
  ) {
    unstableText = "stop writing that down";
  }

  if (
    revisionPhase >= 2 &&
    note.id === "later-rule"
  ) {
    unstableText = "The town changes people when nobody checks.";
  }

  if (
    revisionPhase >= 3 &&
    note.id === "going-salt-first"
  ) {
    unstableText =
      "Mara said my dad remembered the dock fire wrong before he started going salt.";
  }

  if (
    revisionPhase >= 4 &&
    note.id === "eli-contradiction-a"
  ) {
    unstableText =
      "Eli said the tunnels remembered things wrong.";
  }

  if (
    revisionPhase >= 5 &&
    note.id === "eli-contradiction-b"
  ) {
    unstableText =
      "he wasnt scared until after the cannery";
  }

  if (
    revisionPhase >= 5 &&
    note.id === "eli-childhood-memory"
  ) {
    unstableText =
      "maybe we already decided what he was becoming.";
  }

  if (
    collapseTriggered &&
    note.id === "going-salt-first"
  ) {
    unstableText =
      "Mara said my dad remembered the dock fire wrong before he started going salt.";
  }

  if (
    instabilityLevel >= 4 &&
    note.id === "stop-saying-that"
  ) {
    unstableText = "stop writing that down";
  }

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      onClick={() => select(selected ? null : note.id)}
      className={clsx(
        "relative cursor-pointer rounded-sm p-3 transition-all duration-300",
        noteClass(note.variant),
        rotate,
        selected && "ring-2 ring-red-900/50 shadow-xl",
        related && "animate-pulse ring-2 ring-blue-900/40",
        !selected && !related && "opacity-95 hover:opacity-100"
      )}
    >
      {note.variant === "contradiction" && (
        <HandlingSmudge className="-right-4 top-1" />
      )}



        {note.contradictionChain === "eli-tunnels" && (
          <div className="pointer-events-none absolute -left-2 top-0 h-full w-4 rounded-r-full bg-red-950/3 blur-[1px]" />
        )}


      {note.contradictionChain === "eli-tunnels" && (
        <>
          <HandlingSmudge className="-left-5 top-2 h-24 w-32 bg-neutral-900/12" />

          <div className="pointer-events-none absolute -right-3 bottom-3 h-16 w-28 rotate-[4deg] rounded-full bg-red-950/6 blur-md" />

          <div className="pointer-events-none absolute left-4 top-2 h-px w-[78%] rotate-[0.4deg] bg-neutral-950/10" />

          <div className="pointer-events-none absolute right-8 top-[62%] rotate-[3deg] text-[10px] italic text-neutral-800/16">
            ask him then
          </div>
        </>
      )}


      {instabilityLevel >= 3 && note.variant === "contradiction" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          className="pointer-events-none absolute inset-0 border border-red-900/30"
        />
      )}


      {revisionPhase >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          className="pointer-events-none absolute inset-0 bg-red-950/10"
        />
      )}

      {revisionPhase >= 4 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          className="pointer-events-none absolute bottom-2 right-3 rotate-[2deg] text-[10px] italic text-red-950"
        >
          wording changed after recovery
        </motion.p>
      )}


        {note.contradictionChain === "eli-tunnels" && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
            viewBox="0 0 500 220"
          >
            <path
              d="M42 88 C120 84, 210 96, 340 78"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
            />

            <path
              d="M70 120 C180 132, 290 126, 410 118"
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        )}


      {collapseTriggered &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            className="pointer-events-none absolute inset-0 bg-red-950/10"
          />
        )}


      {instabilityLevel >= 3 &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            className="mt-2 rounded border border-red-900/20 bg-red-950/10 p-2 text-[10px] uppercase tracking-[0.18em] text-red-100/70"
          >
            archival confidence degraded after excavation
          </motion.div>
        )}

      {selected && (
        <div className="absolute -right-2 -top-2 rounded-full bg-red-900 px-2 py-1 text-[10px] uppercase tracking-widest text-neutral-900/80">
          inspecting
        </div>
      )}

      <p
        className={clsx(
          "whitespace-pre-line text-neutral-950",
          handwritingClass(note.handwriting),
          phaseClass(note.yearPhase)
        )}
      >
        {unstableText}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-neutral-700">
        {note.author && <span>{note.author}</span>}

        {note.copiedBy && (
          <span className="rounded bg-neutral-900/10 px-2 py-1">
            copied by {note.copiedBy}
          </span>
        )}

        {note.yearPhase && (
          <span className="italic opacity-70">
            {note.yearPhase.replace("-", " ")}
          </span>
        )}

        {note.authenticity && (
          <span
            className={clsx(
              "rounded px-2 py-1 transition-all duration-700",
              note.authenticity === "original" && "bg-green-950/20",
              note.authenticity === "copied" && "bg-blue-950/20",
              note.authenticity === "damaged" && "bg-amber-950/20",
              note.authenticity === "reconstructed" && "bg-red-950/20",

              instabilityLevel >= 3 &&
                note.contradictionChain === "eli-tunnels" &&
                "border border-red-900/40 bg-red-950/20 text-red-100/80"
            )}
          >
            {instabilityLevel >= 3 &&
            note.authenticity === "copied" &&
            note.contradictionChain === "eli-tunnels"
              ? "disputed copy"
              : instabilityLevel >= 4 &&
                note.authenticity === "reconstructed" &&
                note.contradictionChain === "eli-tunnels"
              ? "unstable reconstruction"
              : note.authenticity}
          </span>
        )}
      </div>


      {instabilityLevel >= 3 &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            className="mt-2 rounded border border-red-900/20 bg-red-950/10 p-2 text-[10px] uppercase tracking-[0.18em] text-red-100/70"
          >
            archival confidence degraded after excavation
          </motion.div>
        )}


      {selected &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 2.5, duration: 2.5 }}
            className="mt-3 text-[11px] italic text-neutral-700/70"
          >
            the longer this is held, the less certain the wording feels
          </motion.div>
        )}

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 border-t border-neutral-800/20 pt-2 text-xs italic text-neutral-700"
        >
          preserved fragment
          {note.pressureReveal && (
            <motion.p
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 0.58, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-3 rotate-[-0.6deg] text-[13px] text-neutral-700 line-through decoration-neutral-500/60"
            >
              {note.pressureReveal}
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.article>
  );
}


export function RuleEdits() {
  return (
    <TapedFragment className="rotate-[1deg] text-sm">
      <h3 className="mb-2 text-xs uppercase tracking-[0.22em]">if someone doesnt check in</h3>
      <ol className="ml-5 list-decimal space-y-1">
        <li>wait 15 minutes</li>
        <li>
          <span className="line-through decoration-red-900/70 decoration-2">tell an adult</span>
          <span className="ml-2">check last place they said</span>
        </li>
        <li>ask 2 people</li>
        <li>go together</li>
        <li className="text-neutral-700">then tell an adult if still missing</li>
      </ol>
      <p className="mt-3 rotate-[-1deg] text-xs italic">
        dont make it a big thing unless it is a big thing
      </p>
    </TapedFragment>
  );
}

function ChildMap() {
  return (
    <div className="relative h-72 rotate-[-0.5deg] rounded-sm border border-neutral-700/30 bg-blue-50/20 p-4">
      <h3 className="text-center text-lg uppercase tracking-[0.15em]">Alder Cove Map</h3>
      <p className="text-center text-xs italic">(not totally right)</p>

      <div className="absolute left-8 top-14 text-xs">ferry dock</div>
      <div className="absolute left-20 top-24 text-xs">ferry hill</div>
      <div className="absolute left-52 top-32 rounded border border-neutral-800/40 px-3 py-2 text-sm font-bold">
        CANNERY
      </div>
      <div className="absolute left-56 top-48 text-xs">waterline room</div>
      <div className="absolute bottom-10 left-20 text-xs">echo tunnel ↓</div>
      <div className="absolute right-16 top-20 text-xs">good rocks</div>
      <div className="absolute bottom-12 right-20 text-xs uppercase">don’t go if fog ✕</div>

      <Sticker className="absolute right-10 top-28 rotate-[12deg]">🐟</Sticker>
      <Sticker className="absolute bottom-16 left-36 rotate-[-8deg]">⭐</Sticker>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 300">
        <path d="M55 55 C120 95, 140 70, 190 110 S290 145, 350 95 S440 120, 455 70" fill="none" stroke="rgba(30,64,175,.45)" strokeWidth="2" />
        <path d="M85 80 C110 130, 150 155, 220 155 C285 155, 330 185, 390 230" fill="none" stroke="rgba(127,29,29,.55)" strokeWidth="2" strokeDasharray="6 8" />
        <path d="M250 165 C230 205, 180 225, 120 245" fill="none" stroke="rgba(39,39,42,.45)" strokeWidth="2" strokeDasharray="3 7" />
        <circle cx="275" cy="155" r="54" fill="none" stroke="rgba(127,29,29,.45)" strokeWidth="2" strokeDasharray="7 6" />
      </svg>
    </div>
  );
}

export function SymbolLegend() {
  const symbols = [
    ["🐟", "safe route / someone checked"],
    ["⭐", "still feels normal"],
    ["⚓", "checked in recently"],
    ["〰", "don’t go alone"],
    ["◎", "argument happened here"],
    ["📎", "memory dispute"],
  ];

  return (
    <div className="rotate-[-0.8deg]">
      <h3 className="mb-2 border-b border-neutral-800/50 text-sm uppercase tracking-[0.18em]">
        Symbols <span className="text-xs normal-case italic">(so we know)</span>
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {symbols.map(([icon, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <span>= {label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs italic">we add more when we need to. that’s how it works.</p>
    </div>
  );
}

export function CheckInTable() {
  const rows = [
    ["Eli", "cannery roof", "Mara", "before lights"],
    ["June", "ferry hill", "alone", "after dinner"],
    ["Nora", "tide pools", "Ben", "when horn goes"],
    ["Cal", "lower trail", "dont tell parents", "probably late"],
  ];

  return (
    <TapedFragment className="rotate-[-0.6deg]">
      <h3 className="mb-2 border-b border-neutral-800/50 text-sm uppercase tracking-[0.18em]">
        Check-in Log
      </h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-widest">
            <th className="border border-neutral-700/40 p-2">Name</th>
            <th className="border border-neutral-700/40 p-2">Going To</th>
            <th className="border border-neutral-700/40 p-2">With Who</th>
            <th className="border border-neutral-700/40 p-2">Back By</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell} className="border border-neutral-700/30 p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs italic">if plans change: cross it out + tell someone</p>
    </TapedFragment>
  );
}

function CannerySketch() {
  return (
    <div className="relative h-64 rotate-[0.6deg] border border-neutral-700/30 bg-white/15 p-4">
      <h3 className="text-center text-base uppercase tracking-[0.16em]">Cannery Sketch</h3>
      <svg className="mx-auto mt-4 h-36 w-72" viewBox="0 0 300 150">
        <rect x="60" y="50" width="160" height="70" fill="none" stroke="rgba(20,20,20,.75)" strokeWidth="2" />
        <rect x="80" y="30" width="40" height="20" fill="none" stroke="rgba(20,20,20,.75)" strokeWidth="2" />
        <rect x="145" y="25" width="45" height="25" fill="none" stroke="rgba(20,20,20,.75)" strokeWidth="2" />
        <line x1="50" y1="120" x2="235" y2="120" stroke="rgba(30,64,175,.6)" strokeWidth="3" />
        <line x1="100" y1="120" x2="92" y2="145" stroke="rgba(20,20,20,.55)" />
        <line x1="165" y1="120" x2="170" y2="145" stroke="rgba(20,20,20,.55)" />
        <path d="M110 128 C135 138, 170 138, 195 128" fill="none" stroke="rgba(127,29,29,.55)" strokeDasharray="5 5" />
      </svg>
      <p className="absolute left-6 top-28 text-xs">flood line usually</p>
      <p className="absolute bottom-5 left-8 text-xs">tunnels under here ↓</p>
      <p className="absolute bottom-5 right-8 text-xs italic">water moves weird after storms</p>
    </div>
  );
}

function Page({
  title,
  pageNumber,
  notes,
  components = [],
  provenance,
  paperTone = "aged",
  residueDensity = "light",
}: {
  side?: "left" | "right";
  title?: string;
  pageNumber?: number;
  notes: NotebookNote[];
  components?: Array<"map" | "cannerySketch" | "symbolLegend" | "checkInLog" | "missingPhoto">;
  provenance?: {
    source: "original notebook" | "flood recovery" | "archivist copy" | "reconstructed packet" | "later copied version";
    confidence: "high" | "medium" | "low" | "disputed" | "uncertain";
    handledBy?: string;
    note?: string;
    conflictingSource?: string;
  };
  paperTone?: "aged" | "water-damaged" | "warm";
  residueDensity?: "light" | "heavy" | "soft";
}) {
  return (
    <section
      className={clsx(
        "relative h-[900px] overflow-hidden rounded-xl border border-neutral-500/40 p-9 shadow-2xl transition-transform duration-700 hover:translate-y-[-2px]",
        spreadShellClass(paperTone)
      )}
    >
      <div className="absolute inset-y-0 left-7 w-px bg-red-900/20" />

      <div className={spreadResidueClass(residueDensity)}>
        <DamageOverlay intensity={residueDensity === "heavy" ? "heavy" : "medium"} />
      </div>

      <EdgeWear />


      <div
        className="relative z-10 h-full space-y-4 overflow-hidden"
        style={{
          fontFamily:
            "Comic Sans MS, Bradley Hand, Chalkboard SE, cursive",
        }}
      >
        <div className="flex items-start justify-between text-xs uppercase tracking-[0.28em] text-neutral-700/75">
          <span>{title ?? ""}</span>
          <span className="text-[10px] italic normal-case tracking-normal text-neutral-700/25">
            {pageNumber ? `page ${pageNumber}` : "renumbered later"}
          </span>
        </div>

        <div className="space-y-4">
          {components.includes("cannerySketch") && <CannerySketch />}

          {notes.filter(Boolean).map((note, index) => (
            <Note
              key={note.id}
              note={note}
              rotate={
                [
                  "rotate-[0.2deg]",
                  "rotate-[-0.2deg]",
                  "rotate-[0.1deg]",
                  "rotate-[-0.1deg]",
                ][index % 4]
              }
            />
          ))}

          {components.includes("map") && (
            <div className="pt-4">
              <ChildMap />
            </div>
          )}

        {provenance && (
          <div className="mt-auto rounded border border-neutral-800/10 bg-neutral-950/5 p-3 text-[10px] text-neutral-800/55">
            <div className="flex items-center justify-between gap-3 uppercase tracking-[0.22em]">
              <span>{provenance.source}</span>
              <span>{provenance.confidence}</span>
            </div>

            {provenance.handledBy && (
              <p className="mt-2 italic">later later handled by: {provenance.handledBy}</p>
            )}

            {provenance.note && (
              <p className="mt-2 italic leading-relaxed">{provenance.note}</p>
            )}


            <p className="mt-3 italic leading-relaxed text-neutral-800/40">
              some wording appears emotionally softened in later copies
            </p>

            {provenance.conflictingSource && (
              <div className="mt-3 rounded border border-red-900/10 bg-red-950/5 p-2">
                <p className="uppercase tracking-[0.18em] text-red-100/35">
                  later handling note
                    </p>
                <p className="mt-2 italic leading-relaxed text-red-100/45">
                  {provenance.conflictingSource}
                </p>
              </div>
            )}

          </div>
        )}

        </div>
      </div>
    </section>
  );
}


function DamageOverlay({
  intensity = "medium",
}: {
  intensity?: "light" | "medium" | "heavy";
}) {
  const opacity =
    intensity === "heavy" ? "opacity-70" : intensity === "medium" ? "opacity-45" : "opacity-25";

  return (
    <div className={clsx("pointer-events-none absolute inset-0", opacity)}>
      <div className="absolute -right-10 top-10 h-48 w-32 rotate-12 rounded-full bg-amber-900/10 blur-2xl" />
      <div className="absolute bottom-12 left-2 h-40 w-24 rounded-full bg-blue-900/10 blur-xl" />
      <div className="absolute left-6 top-1/3 h-px w-[85%] rotate-[-1deg] bg-neutral-800/10" />
      <div className="absolute right-8 top-2/3 h-px w-[65%] rotate-[1.2deg] bg-neutral-800/10" />
    </div>
  );
}

function HandlingSmudge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "pointer-events-none absolute h-16 w-28 rounded-full bg-neutral-800/10 blur-md",
        className
      )}
    />
  );
}


function EdgeWear() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-neutral-900/10 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-amber-950/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-blue-950/10 to-transparent" />
      <div className="absolute -right-1 top-32 h-20 w-4 rounded-l-full bg-neutral-950/10" />
      <div className="absolute -left-1 bottom-40 h-16 w-3 rounded-r-full bg-neutral-950/10" />
    </div>
  );
}

function TapeGhost({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute rounded-sm border border-neutral-900/6 bg-neutral-900/3",
        className
      )}
    />
  );
}

function RemovedFragmentResidue() {
  return (
    <div className="pointer-events-none absolute right-8 top-[18%]">
      <TapeGhost className="h-10 w-24 rotate-[4deg]" />

      <p className="mt-2 rotate-[1deg] text-[10px] italic text-neutral-800/16">
        page removed after ferry week
      </p>
    </div>
  );
}

function RepeatedHandlingWear() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-[32%] h-36 w-5 rounded-r-full bg-neutral-950/6 blur-[1px]" />

      <div className="pointer-events-none absolute right-0 top-[42%] h-44 w-5 rounded-l-full bg-neutral-950/5 blur-[1px]" />

      <div className="pointer-events-none absolute bottom-12 left-[18%] h-2 w-52 rotate-[0.4deg] bg-neutral-950/4 blur-sm" />
    </>
  );
}

function MissingPageReference() {
  return (
    <div className="pointer-events-none absolute bottom-14 right-10 rotate-[2deg] text-[10px] italic text-neutral-800/10">
      see missing page 19 for original version
    </div>
  );
}


function HiddenLayerPage() {
  const {
    flashlight,
    foldedOpen,
    toggleFlashlight,
    toggleFolded,
    pinEvidence,
    increaseInstability,
    triggerCollapse,
    instabilityLevel,
    collapseTriggered,
    revisionPhase,
  } = useNotebookState();

  return (
    <section className="relative h-[900px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#eadcb1] p-9 shadow-2xl transition-transform duration-700 hover:translate-y-[-2px]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,60,25,.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_70%_25%,rgba(30,64,175,.14),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(92,64,28,.28),transparent_26%)]" />
      <div className="absolute inset-y-0 left-7 w-px bg-red-900/20" />
      <DamageOverlay intensity="heavy" />
      <EdgeWear />
      <RepeatedHandlingWear />
      <RemovedFragmentResidue />
      <MissingPageReference />

      {flashlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_35%,rgba(255,255,220,.28),transparent_28%),radial-gradient(circle_at_55%_70%,rgba(255,255,220,.18),transparent_22%)]"
        />
      )}


        {revisionPhase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            className="pointer-events-none absolute left-12 top-12 rotate-[-5deg] text-sm italic text-red-950"
          >
            maybe we changed him first
          </motion.p>
        )}



      <div className="pointer-events-none absolute left-16 top-[58%] rotate-[-2deg] text-[11px] italic text-neutral-700/26">
        he wasnt trying to scare us
      </div>


      <div
        className="relative z-10 h-full space-y-4 overflow-hidden"
        style={{ fontFamily: "Comic Sans MS, Bradley Hand, Chalkboard SE, cursive" }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-700">
          unstable recovered page
        </p>

        <div className="rotate-[-0.7deg]">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-700">
            Route: Echo Tunnel
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-neutral-950">
            after rain only if two people go
          </h2>
          <p className="mt-2 text-sm italic text-neutral-700">
            copied from old rules because the first one got wet
          </p>
        </div>

        <div className="relative rounded-sm border border-neutral-700/30 bg-blue-50/20 p-5">
          <Tape className="-top-2 left-12" />
          <p className="text-sm">
            If the water is past the third stair, dont go below.
          </p>
          <p className="mt-2 text-sm">
            If someone says they remember different, mark it and wait.
          </p>
          <p className="mt-2 text-sm line-through decoration-red-900/60 decoration-2">
            ask Eli because he knows the tunnel best
          </p>
          <p className="mt-2 text-sm">
            ask two people. not just Eli.
          </p>

          {flashlight && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 0.42, filter: "blur(0px)" }}
                transition={{ duration: 4.8 }}
                onClick={() => {
                  pinEvidence("he was scared before we were");
                  increaseInstability();

                  if (instabilityLevel >= 2) {
                    triggerCollapse();
                  }
                }}
                className="absolute left-12 top-24 rotate-[-1deg] text-left text-lg text-neutral-700/68 hover:opacity-90"
              >
                he was scared before we were
              </motion.button>

              <motion.button
                type="button"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 0.32, filter: "blur(0px)" }}
                transition={{ delay: 3.0, duration: 5.2 }}
                onClick={() => {
                  pinEvidence("not just Eli because Eli remembers wrong");
                  increaseInstability();
                }}
                className="absolute bottom-4 right-8 rotate-[2deg] text-left text-xs text-neutral-700/60 line-through hover:opacity-90"
              >
                not just Eli because Eli remembers wrong
              </motion.button>
            </>
          )}
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={toggleFolded}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              toggleFolded();
            }
          }}
          className="relative block w-full cursor-pointer rounded-sm bg-[#f3e2ab] p-5 text-left shadow-lg transition hover:scale-[1.01]"
        >
          <Tape className="-top-2 left-10" />
          <HandlingSmudge className="right-6 top-5" />

          <div className="pointer-events-none absolute right-10 top-7 rotate-[5deg] text-[10px] italic text-neutral-900/20">
            dont lose this one
          </div>


          <p className="text-xs uppercase tracking-[0.25em] text-neutral-700">
            folded note under tape
          </p>

          <p className="mt-2 text-sm leading-relaxed text-neutral-950">
            {foldedOpen
              ? "Mara said the cannery gives people back wrong but made me change it to things because people sounds too mean."
              : "do not open unless the story changes again"}
          </p>

          {foldedOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border-t border-neutral-800/20 pt-3 text-xs italic text-neutral-700"
            >
              <span className="block">
                back side:{" "}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    pinEvidence("if we write it nicer does that make it less true?");
                    increaseInstability();
                  }}
                  className="text-left underline decoration-dotted underline-offset-4 hover:text-neutral-950"
                >
                  if we write it nicer does that make it less true?
                </button>
              </span>
            </motion.div>
          )}
        </div>

        <div className="rounded-sm border border-dashed border-neutral-700/40 p-4">
          <p className="text-sm">
            official wording:
            <span className="ml-2 font-bold">things</span>
          </p>
          <p className="mt-2 text-sm">
            original wording:
            <span className="ml-2 font-bold italic">people</span>
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-neutral-700">
            discrepancy unresolved
          </p>
        </div>


        {instabilityLevel >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded border border-red-900/20 bg-red-950/10 p-3 text-xs italic text-red-100/70"
          >
            recovered wording diverging from archived wording
          </motion.div>
        )}


  
      {instabilityLevel >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/10 bg-red-950/3 p-4 text-xs text-red-100/60"
        >
          preservation layers no longer fully agree

          <div className="mt-3 space-y-2">
            <p>• preserved wording varies between layers</p>
            <p>• social corrections appear within recovered memory</p>
            <p>• reconstruction layers preserve conflicting emphasis</p>
            <p>• later wording may soften earlier phrasing</p>
          </div>
        </motion.div>
      )}


      {revisionPhase >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/10 bg-red-950/3 p-4 text-xs text-red-100/60"
        >
          preserved wording differs slightly across recovery layers

          <div className="mt-3 space-y-2">
            <p>• recovered wording differs between review passes</p>
            <p>• archivist copies differ slightly from recovered wording</p>
            <p>• related fragments preserve different emotional interpretations</p>
          </div>
        </motion.div>
      )}


      {revisionPhase >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-lg bg-red-950/8 p-4 text-sm text-red-100/55"
          >
            Eli wording differs here

            <div className="mt-4 space-y-3 text-xs">
              <p>
                • childhood fear gradually became categorized behavior
              </p>

              <p>
                • archivist copies preserved a narrower emotional framing
              </p>

              <p>
                • later copies appear emotionally softened
              </p>

              <p className="italic">
                maybe the notebook got there first
              </p>
            </div>
          </motion.div>
        )}

      {collapseTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            className="pointer-events-none absolute bottom-10 right-16 rotate-[-3deg] text-sm italic text-red-950"
          >
            maybe none of us remembered him right
          </motion.div>
        )}

  
      <div className="pointer-events-none absolute left-[22%] top-[76%] rotate-[-4deg] text-[11px] italic text-neutral-700/8">
        he said the tunnels remembered us wrong
      </div>


      <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={toggleFlashlight}
            className="rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs text-neutral-100 hover:bg-neutral-800"
          >
            {flashlight ? "turn off side light" : "use side light"}
          </button>

          <span className="rounded bg-neutral-900/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-neutral-700">
            recovered from flood box 3
          </span>
        </div>
      </div>
    </section>
  );
}





function HandledPage({
  children,
  side,
  focused,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  focused?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotateY: side === "left" ? -2 : 2 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: focused ? 1.06 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx(
        "relative origin-center transition-transform",
        side === "left" ? "drop-shadow-[8px_18px_18px_rgba(0,0,0,0.35)]" : "drop-shadow-[-8px_18px_18px_rgba(0,0,0,0.35)]"
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-y-3 z-20 w-6 rounded-full blur-md",
          side === "left"
            ? "-right-2 bg-neutral-950/10"
            : "-left-2 bg-neutral-950/10"
        )}
      />

      <div
        className={clsx(
          "pointer-events-none absolute inset-0 z-20 rounded-xl",
          side === "left"
            ? "bg-gradient-to-l from-neutral-950/8 via-transparent to-transparent"
            : "bg-gradient-to-r from-neutral-950/8 via-transparent to-transparent"
        )}
      />

      {children}
    </motion.div>
  );
}

function PageTurnVeil({ direction }: { direction: "previous" | "next" | null }) {
  if (!direction) return null;

  return (
    <motion.div
      key={direction}
      initial={{
        opacity: 0,
        x: direction === "next" ? 80 : -80,
        rotateY: direction === "next" ? -12 : 12,
      }}
      animate={{
        opacity: [0, 0.18, 0],
        x: 0,
        rotateY: 0,
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 z-30 rounded-xl bg-[#f0dfad]"
    />
  );
}

function NotebookReader() {

  const {
    spreadIndex,
    zoomedPage,
    pageTurnDirection,
    clearPageTurn,
  } = useNotebookState();

  const spread = getSpreadDefinition(spreadIndex);

  const leftPageDefinition = getNotebookPage(spread.leftPageId);
  const rightPageDefinition = getNotebookPage(spread.rightPageId);

  const allNotes = [
    ...notebookOneSpread.leftPage,
    ...notebookOneSpread.rightPage,
  ];

  const leftNotes = allNotes.filter((note) =>
    leftPageDefinition.noteIds.includes(note.id)
  );

  const rightNotes = allNotes.filter((note) =>
    rightPageDefinition.noteIds.includes(note.id)
  );

  const leftPage =
    leftPageDefinition.role === "recovered-rules" ? (
      <HiddenLayerPage />
    ) : (
      <Page
        side="left"
        title={leftPageDefinition.title}
        pageNumber={spreadIndex * 2 + 18}
        notes={leftNotes}
        components={leftPageDefinition.components}
        provenance={leftPageDefinition.provenance}
        paperTone={spread.paperTone}
        residueDensity={spread.residueDensity}
      />
    );

  const rightPage =
    rightPageDefinition.role === "continuation-support" ? (
      <section className="relative h-[900px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#eadcb1] p-9 shadow-2xl transition-transform duration-700 hover:translate-y-[-2px]">
        <div className={spreadResidueClass(spread.residueDensity)}>
        <DamageOverlay intensity={spread.residueDensity === "heavy" ? "heavy" : "medium"} />
      </div>
        <EdgeWear />

        <div
          className="relative z-10 h-full space-y-4 overflow-hidden"
          style={{
            fontFamily:
              "Comic Sans MS, Bradley Hand, Chalkboard SE, cursive",
          }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-700">
            facing page
          </p>

          <p className="mt-10 rotate-[-1deg] text-sm italic text-neutral-800/62">
            continuation copied here after the first spread got too crowded
          </p>

          <div className="mt-8 space-y-5">
            {rightNotes.map((note, index) => (
              <Note
                key={note.id}
                note={note}
                rotate={
                  [
                    "rotate-[0.2deg]",
                    "rotate-[-0.2deg]",
                    "rotate-[0.1deg]",
                  ][index % 3]
                }
              />
            ))}
          </div>

          <div className="mt-8 rotate-[-0.5deg]">
            <SymbolLegend />
          </div>

          <div className="mt-14 rounded border border-dashed border-neutral-700/20 p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-700/55">
              archivist note
            </p>

            <p className="mt-3 text-sm italic text-neutral-800/68">
              several pages from this section were separated during drying
            </p>
          </div>

          <div className="mt-12 flex h-[180px] items-center justify-center rounded border border-neutral-700/12 bg-neutral-950/3">
            <p className="rotate-[-2deg] text-xs italic text-neutral-700/35">
              photo missing from recovery envelope
            </p>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <p className="rotate-[1deg] text-xs italic text-neutral-800/30">
              see missing page 19 for original version
            </p>

            <div className="rounded bg-neutral-900/8 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-neutral-700/45">
              re-read later
            </div>
          </div>
        </div>
      </section>
    ) : (
      <Page
        side="right"
        title={rightPageDefinition.title}
        pageNumber={spreadIndex * 2 + 19}
        notes={rightNotes}
        components={rightPageDefinition.components}
        provenance={rightPageDefinition.provenance}
        paperTone={spread.paperTone}
        residueDensity={spread.residueDensity}
      />
    );

  return (
    <div
      className={clsx(
        "grid gap-6 transition-all duration-700 xl:grid-cols-[minmax(0,1fr)_340px]",
        zoomedPage && "bg-neutral-950/30"
      )}
    >
      <div
        className={clsx(
          "relative grid gap-6 transition-all duration-700",
          zoomedPage ? "grid-cols-1" : "lg:grid-cols-2"
        )}
      >
        <PageTurnVeil direction={pageTurnDirection} />

        {pageTurnDirection && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.9, duration: 0.1 }}
            onAnimationComplete={clearPageTurn}
            className="pointer-events-none absolute inset-0"
          />
        )}

        {zoomedPage && (
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,220,.05),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(0,0,0,.35),transparent_60%)]" />
        )}

        {(!zoomedPage || zoomedPage === "left") && (
          <div className={clsx("mx-auto w-full max-w-[430px]", !zoomedPage && "max-w-none")}>
            <HandledPage side="left" focused={zoomedPage === "left"}>
              {leftPage}
            </HandledPage>
          </div>
        )}

        {(!zoomedPage || zoomedPage === "right") && (
          <div className={clsx("mx-auto w-full max-w-[430px]", !zoomedPage && "max-w-none")}>
            <HandledPage side="right" focused={zoomedPage === "right"}>
              {rightPage}
            </HandledPage>
          </div>
        )}
      </div>

      <aside
        className={clsx(
          "relative min-h-[900px] overflow-hidden border border-amber-100/10 bg-[#16130f] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.65)] transition-opacity duration-700",
          zoomedPage && "opacity-65"
        )}
      >
        <div className="absolute inset-y-0 left-5 w-px bg-neutral-700/20" />

        <div className="absolute right-5 top-10 rotate-[3deg] rounded bg-[#f0dfad]/8 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-neutral-500">
          review copy
        </div>

        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-600">
            preservation review · copied object
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-600">
                handling notes
              </p>

              <p className="mt-3 max-w-[220px] text-sm italic leading-relaxed text-neutral-400/85">
                deeper review becomes available after the page is handled long enough
              </p>
            </div>


            <div className="rounded border border-amber-100/10 bg-black/15 p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/45">
                handwriting key
              </p>

              <div className="mt-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif font-bold text-neutral-300">
                    child hand
                  </span>
                  <span className="text-neutral-600">fast / uneven</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans font-black tracking-wide text-neutral-300">
                    sibling hand
                  </span>
                  <span className="text-neutral-600">interruptive</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.16em] text-red-100/55">
                    skeptic mark
                  </span>
                  <span className="text-neutral-600">pushback</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif italic tracking-[0.12em] text-neutral-500">
                    archivist copy
                  </span>
                  <span className="text-neutral-600">softened</span>
                </div>
              </div>
            </div>


            <div className="rounded border border-neutral-700/20 bg-black/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                archivist concern
              </p>

              <p className="mt-3 text-sm italic leading-relaxed text-neutral-400/75">
                contradiction language appears to spread between revisions after repeated reconstruction work
              </p>
            </div>

            <div className="rounded border border-dashed border-neutral-700/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                preservation state
              </p>

              <div className="mt-4 flex gap-2">
                <div className="h-2 w-12 rounded-full bg-neutral-700/60" />
                <div className="h-2 w-12 rounded-full bg-neutral-700/30" />
                <div className="h-2 w-12 rounded-full bg-neutral-700/15" />
              </div>

              <p className="mt-4 text-xs italic text-neutral-500/70">
                original sequence confidence degraded
              </p>
            </div>

            <div className="pt-10 text-[10px] uppercase tracking-[0.3em] text-neutral-700/30">
              copied for flood recovery review
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}


function NotebookReaderControls() {
  const totalSpreads = TOTAL_NOTEBOOK_SPREADS;
  const {
    spreadIndex,
    zoomedPage,
    previousSpread,
    nextSpread,
    setZoomedPage,
    activeDocumentId,
  } = useNotebookState();

  const activeDocument = getArchiveDocument(activeDocumentId);

  const toggleFocus = () => {
    setZoomedPage(zoomedPage ? null : "left");
  };

  const moveFocus = (direction: "previous" | "next") => {
    if (!zoomedPage) {
      if (direction === "previous") previousSpread();
      if (direction === "next") nextSpread();
      return;
    }

    if (zoomedPage === "left" && direction === "next") {
      setZoomedPage("right");
      return;
    }

    if (zoomedPage === "right" && direction === "previous") {
      setZoomedPage("left");
      return;
    }

    if (zoomedPage === "right" && direction === "next") {
      nextSpread();
      setZoomedPage("left");
      return;
    }

    if (zoomedPage === "left" && direction === "previous") {
      previousSpread();
      setZoomedPage("right");
    }
  };

  return (
    <div className={clsx(
        "mb-5 flex flex-wrap items-center justify-between gap-3 border border-amber-100/10 bg-[#0f0c09] px-4 py-3 text-xs text-neutral-500 shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-opacity duration-700",
        zoomedPage && "opacity-60 hover:opacity-100"
      )}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => moveFocus("previous")}
          disabled={!zoomedPage && spreadIndex === 0}
          className="rounded border border-neutral-800 px-3 py-2 disabled:opacity-20"
        >
          ← previous page
        </button>

        <div className="flex flex-col px-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
            {activeDocument.title}
          </span>

          <span className="uppercase tracking-[0.25em]">
          {zoomedPage
            ? `${zoomedPage} page focus · spread ${spreadIndex + 1} / ${totalSpreads}`
            : `lay flat ${spreadIndex + 1} / ${totalSpreads}`}
          </span>

          {activeDocument.ethicalPressure && (
            <p className="mt-2 max-w-[220px] text-[10px] italic leading-relaxed text-neutral-600/70">
              {activeDocument.ethicalPressure}
            </p>
          )}

        </div>

        <button
          onClick={() => moveFocus("next")}
          disabled={!zoomedPage && spreadIndex === totalSpreads - 1}
          className="rounded border border-neutral-800 px-3 py-2 disabled:opacity-20"
        >
          next page →
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleFocus}
          className={clsx(
            "rounded border px-3 py-2",
            zoomedPage
              ? "border-amber-700 bg-amber-950/20 text-amber-100/70"
              : "border-neutral-800"
          )}
        >
          {zoomedPage ? "lay flat" : "lift page closer"}
        </button>

        {zoomedPage && (
          <button
            onClick={() => setZoomedPage(zoomedPage === "left" ? "right" : "left")}
            className="rounded border border-neutral-800 px-3 py-2"
          >
            switch facing page
          </button>
        )}
      </div>
    </div>
  );
}



export function NotebookSpread() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border border-amber-100/10 bg-[#14110d] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55)]">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-amber-100/45">
                archive object · shared notebook
              </p>

              <h1 className="mt-3 font-serif text-5xl italic text-neutral-100">
                {notebookOneSpread.title}
              </h1>

              <p className="mt-4 max-w-2xl font-serif text-2xl italic leading-relaxed text-neutral-300/80">
                This notebook is no longer only a childhood object. It is a
                reviewed copy of one.
              </p>
            </div>

            <div className="rotate-[2deg] border border-neutral-900/25 bg-[#c8b58c] px-5 py-3 text-neutral-950 shadow-xl">
              <p className="text-[9px] uppercase tracking-[0.24em] text-neutral-700/60">
                handling status
              </p>
              <p className="mt-2 font-serif text-xl italic">
                copied / softened / reviewed
              </p>
            </div>
          </div>
        </header>

        <Link
          href="/archive"
          className="fixed bottom-8 right-8 z-[80] border border-amber-100/15 bg-black/45 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-neutral-300 shadow-2xl backdrop-blur-sm transition hover:bg-black/65"
        >
          set notebook down
        </Link>

        <NotebookReaderControls />

        <div className="relative">
          <div className="pointer-events-none absolute -top-5 left-8 z-40 rotate-[-2deg] border border-neutral-900/20 bg-[#cdbb95] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-950 shadow-xl">
            copied for flood recovery review
          </div>

          <div className="pointer-events-none absolute -top-4 right-12 z-40 rotate-[2deg] border border-red-900/20 bg-[#b89f78] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-red-950/70 shadow-xl">
            original order confidence degraded
          </div>

          <NotebookReader />
        </div>
      </div>
    </main>
  );
}

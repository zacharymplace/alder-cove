"use client";

import { motion } from "framer-motion";
import { create } from "zustand";
import clsx from "clsx";

import { notebookOneSpread, type NotebookNote } from "@/data/notebook/notebookOne";

type NotebookState = {
  selectedId: string | null;
  unstable: boolean;
  memoryLayer: "recovered" | "original" | "reconstructed";
  flashlight: boolean;
  foldedOpen: boolean;
  pinnedEvidence: string[];
  instabilityLevel: number;
  collapseTriggered: boolean;
  mutationPhase: number;
  select: (id: string | null) => void;
  toggleUnstable: () => void;
  setMemoryLayer: (
    layer: "recovered" | "original" | "reconstructed"
  ) => void;
  toggleFlashlight: () => void;
  toggleFolded: () => void;
  pinEvidence: (evidence: string) => void;
  increaseInstability: () => void;
  triggerCollapse: () => void;
  advanceMutation: () => void;
};

const useNotebookState = create<NotebookState>((set) => ({
  selectedId: null,
  unstable: false,
  memoryLayer: "recovered",
  flashlight: false,
  foldedOpen: false,
  pinnedEvidence: [],
  instabilityLevel: 0,
  collapseTriggered: false,
  mutationPhase: 0,

  select: (id) => set({ selectedId: id }),

  toggleUnstable: () =>
    set((state) => ({
      unstable: !state.unstable,
    })),

  setMemoryLayer: (layer) =>
    set({
      memoryLayer: layer,
    }),

  toggleFlashlight: () =>
    set((state) => ({
      flashlight: !state.flashlight,
    })),

  toggleFolded: () =>
    set((state) => ({
      foldedOpen: !state.foldedOpen,
    })),

  pinEvidence: (evidence) =>
    set((state) => ({
      pinnedEvidence: state.pinnedEvidence.includes(evidence)
        ? state.pinnedEvidence
        : [...state.pinnedEvidence, evidence],
    })),

  increaseInstability: () =>
    set((state) => ({
      instabilityLevel: Math.min(state.instabilityLevel + 1, 5),
    })),

  triggerCollapse: () =>
    set({
      collapseTriggered: true,
      instabilityLevel: 5,
    }),

  advanceMutation: () =>
    set((state) => ({
      mutationPhase: Math.min(state.mutationPhase + 1, 5),
    })),
}));

function noteClass(variant?: NotebookNote["variant"]) {
  switch (variant) {
    case "founding":
      return "text-4xl font-black uppercase leading-tight";
    case "contradiction":
      return "border border-dashed border-neutral-700/40 bg-white/20";
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

function Note({
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
    mutationPhase,
    advanceMutation,
  } = useNotebookState();
  const allNotes = [...notebookOneSpread.leftPage, ...notebookOneSpread.rightPage];
  const selectedNote = allNotes.find((candidate) => candidate.id === selectedId);
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
    mutationPhase >= 1 &&
    note.id === "stop-saying-that"
  ) {
    unstableText = "stop writing that down";
  }

  if (
    mutationPhase >= 2 &&
    note.id === "later-rule"
  ) {
    unstableText = "The town changes people when nobody checks.";
  }

  if (
    mutationPhase >= 3 &&
    note.id === "going-salt-first"
  ) {
    unstableText =
      "Mara said my dad remembered the dock fire wrong before he started going salt.";
  }

  if (
    mutationPhase >= 4 &&
    note.id === "eli-contradiction-a"
  ) {
    unstableText =
      "Eli said the tunnels remembered things wrong.";
  }

  if (
    mutationPhase >= 5 &&
    note.id === "eli-contradiction-b"
  ) {
    unstableText =
      "he wasnt scared until after the cannery";
  }

  if (
    mutationPhase >= 5 &&
    note.id === "eli-childhood-memory"
  ) {
    unstableText =
      "maybe Eli changed because we kept writing him down wrong.";
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

      {instabilityLevel >= 3 && note.variant === "contradiction" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          className="pointer-events-none absolute inset-0 border border-red-900/30"
        />
      )}


      {mutationPhase >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          className="pointer-events-none absolute inset-0 bg-red-950/10"
        />
      )}

      {mutationPhase >= 4 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          className="pointer-events-none absolute bottom-2 right-3 rotate-[2deg] text-[10px] italic text-red-950"
        >
          wording changed after recovery
        </motion.p>
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
        <div className="absolute -right-2 -top-2 rounded-full bg-red-900 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
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

      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-neutral-600">
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

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 border-t border-neutral-800/20 pt-2 text-xs italic text-neutral-700"
        >
          preserved memory fragment
          {note.pressureReveal && (
            <motion.p
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 0.58, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-3 rotate-[-0.6deg] text-[13px] text-neutral-600 line-through decoration-neutral-500/60"
            >
              {note.pressureReveal}
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.article>
  );
}

function FoundingPhrase({ note }: { note: NotebookNote }) {
  return (
    <div className="relative">
      <Note note={note} rotate="rotate-[-1.5deg]" />
      <p className="absolute -bottom-4 left-4 rotate-[-2deg] text-xs text-neutral-700">
        written hard enough to dent the next page
      </p>
    </div>
  );
}

function RuleEdits() {
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

function SymbolLegend() {
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

function CheckInTable() {
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
  side,
  notes,
}: {
  side: "left" | "right";
  notes: NotebookNote[];
}) {
  const { instabilityLevel, mutationPhase } = useNotebookState();

  return (
    <section className="relative min-h-[860px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#ecdfb7] p-8 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,60,25,.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.7),transparent_22%),radial-gradient(circle_at_82%_75%,rgba(92,64,28,.24),transparent_24%),radial-gradient(circle_at_12%_88%,rgba(30,64,175,.14),transparent_16%)]" />
      <div className="absolute inset-y-0 left-7 w-px bg-red-900/20" />
      <DamageOverlay intensity={side === "right" ? "medium" : "light"} />
      <EdgeWear />
      {side === "right" && <ArgumentMarks />}


        {mutationPhase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            className="pointer-events-none absolute left-12 top-12 rotate-[-5deg] text-sm italic text-red-950"
          >
            maybe we changed him first
          </motion.p>
        )}


      <div
        className="relative z-10 space-y-6"
        style={{ fontFamily: "Comic Sans MS, Bradley Hand, Chalkboard SE, cursive" }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-700">{side} page</p>

        {side === "left" ? (
          <>
            <FoundingPhrase note={notes[0]} />
            <Note note={notes[1]} rotate="rotate-[0.4deg]" />
            <ChildMap />
            <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
              <SymbolLegend />
              <CheckInTable />
            </div>
          </>
        ) : (
          <>
            <CannerySketch />
            <Note note={notes[0]} rotate="rotate-[0.4deg]" />
            <Note note={notes[1]} rotate="rotate-[-0.6deg]" />
    
        {instabilityLevel >= 4 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            className="pointer-events-none absolute right-10 top-24 rotate-[4deg] text-sm italic text-red-950"
          >
            maybe the notebook changed him too
          </motion.p>
        )}

        <div className="grid gap-3">
              <Note note={notes[2]} rotate="rotate-[0.5deg]" />
              <Note note={notes[3]} rotate="rotate-[-0.3deg]" />
            </div>
            <RuleEdits />
            <Note note={notes[4]} rotate="rotate-[0.4deg]" />
            <Note note={notes[5]} rotate="rotate-[-0.7deg]" />
          </>
        )}
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

function ArgumentMarks() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <p className="absolute right-8 top-[42%] rotate-[8deg] text-xs font-black text-red-950/35">
        NO
      </p>
      <p className="absolute right-14 top-[48%] rotate-[-4deg] text-[10px] italic text-neutral-800/35">
        ask him then
      </p>
      <p className="absolute left-8 top-[52%] rotate-[-7deg] text-xs text-neutral-800/30">
        wait no
      </p>
      <svg className="absolute right-12 top-[50%] h-16 w-28" viewBox="0 0 120 70">
        <path
          d="M8 55 C38 10, 70 12, 112 18"
          fill="none"
          stroke="rgba(127,29,29,.35)"
          strokeWidth="2"
          strokeDasharray="4 5"
        />
      </svg>
    </div>
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

function HiddenLayerPage() {
  const {
    flashlight,
    foldedOpen,
    toggleFlashlight,
    toggleFolded,
    pinEvidence,
    increaseInstability,
    instabilityLevel,
    collapseTriggered,
    mutationPhase,
    advanceMutation,
  } = useNotebookState();

  return (
    <section className="relative min-h-[860px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#eadcb1] p-8 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,60,25,.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_70%_25%,rgba(30,64,175,.14),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(92,64,28,.28),transparent_26%)]" />
      <div className="absolute inset-y-0 left-7 w-px bg-red-900/20" />
      <DamageOverlay intensity="heavy" />
      <EdgeWear />

      {flashlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_35%,rgba(255,255,220,.28),transparent_28%),radial-gradient(circle_at_55%_70%,rgba(255,255,220,.18),transparent_22%)]"
        />
      )}


        {mutationPhase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            className="pointer-events-none absolute left-12 top-12 rotate-[-5deg] text-sm italic text-red-950"
          >
            maybe we changed him first
          </motion.p>
        )}


      <div
        className="relative z-10 space-y-6"
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
                transition={{ duration: 1 }}
                onClick={() => {
                  pinEvidence("he was scared before we were");
                  increaseInstability();

                  if (instabilityLevel >= 2) {
                    triggerCollapse();
                  }
                }}
                className="absolute left-12 top-24 rotate-[-1deg] text-left text-lg text-neutral-600 hover:opacity-80"
              >
                he was scared before we were
              </motion.button>

              <motion.button
                type="button"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 0.32, filter: "blur(0px)" }}
                transition={{ delay: 0.4, duration: 1 }}
                onClick={() => {
                  pinEvidence("not just Eli because Eli remembers wrong");
                  increaseInstability();
                }}
                className="absolute bottom-4 right-8 rotate-[2deg] text-left text-xs text-neutral-700 line-through hover:opacity-80"
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

          <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
            folded note under tape
          </p>

          <p className="mt-2 text-sm text-neutral-900">
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
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-neutral-600">
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
          className="mt-5 rounded-lg border border-red-900/20 bg-red-950/10 p-4 text-xs text-red-100/80"
        >
          notebook coherence failing

          <div className="mt-3 space-y-2">
            <p>• preserved wording drifting across unrelated entries</p>
            <p>• social corrections propagating into archived memory</p>
            <p>• reconstruction layers no longer align</p>
            <p>• emotional mediation overriding original language</p>
          </div>
        </motion.div>
      )}


      {mutationPhase >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/20 bg-red-950/10 p-4 text-xs text-red-100/80"
        >
          passive notebook mutation detected

          <div className="mt-3 space-y-2">
            <p>• wording drift occurring outside direct excavation</p>
            <p>• archivist copies diverging from recovered originals</p>
            <p>• contradiction language spreading across linked fragments</p>
          </div>
        </motion.div>
      )}


      {mutationPhase >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-lg border border-red-900/30 bg-red-950/20 p-4 text-sm text-red-100/80"
          >
            Eli contradiction chain collapse

            <div className="mt-4 space-y-3 text-xs">
              <p>
                • childhood fear was progressively reframed as behavioral instability
              </p>

              <p>
                • archivist copies hardened emotional interpretation into preserved wording
              </p>

              <p>
                • reconstruction layers increasingly prioritized social coherence over emotional accuracy
              </p>

              <p className="italic">
                maybe the notebook changed him before the town did
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

function InspectionPanel() {
  const {
    selectedId,
    unstable,
    toggleUnstable,
    memoryLayer,
    setMemoryLayer,
    pinnedEvidence,
    instabilityLevel,
    collapseTriggered,
    mutationPhase,
    advanceMutation,
  } = useNotebookState();
  const allNotes = [...notebookOneSpread.leftPage, ...notebookOneSpread.rightPage];
  const selected = allNotes.find((note) => note.id === selectedId);
  const related = selected?.relatedNoteIds
    ?.map((id) => allNotes.find((note) => note.id === id))
    .filter(Boolean) as NotebookNote[] | undefined;

  if (!selected) {
    return (
      <aside className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-5 text-sm text-neutral-400">
        Select a note to inspect preserved memory pressure.
      </aside>
    );
  }

  return (
    <aside className="rounded-xl border border-neutral-700 bg-neutral-950/95 p-5 shadow-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
        Inspecting Fragment
      </p>

      <h2 className="mt-3 text-xl font-semibold text-neutral-100">
        {selected.variant ?? "fragment"}
      </h2>

      <div className="mt-3 rounded-lg bg-neutral-950/70 p-3 text-sm text-neutral-200">
        <p className="whitespace-pre-line">
          {unstable && selected.id === "eli-contradiction-a"
            ? "Eli doesnt go below after storms anymore."
            : selected.text}
        </p>

        {selected.pressureReveal && (
          <motion.p
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 0.55, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-xs italic text-neutral-500 line-through decoration-neutral-600"
          >
            pressure reveal: {selected.pressureReveal}
          </motion.p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-neutral-800 p-3">
          <p className="uppercase tracking-widest text-neutral-500">Memory Pressure</p>
          <p className="mt-2 text-neutral-100">{selected.memoryPressure ?? "unknown"}</p>
        </div>

        <div className="rounded-lg border border-neutral-800 p-3">
          <p className="uppercase tracking-widest text-neutral-500">State</p>
          <p className="mt-2 text-neutral-100">{unstable ? "drifting" : "stable"}</p>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            Related Fragments
          </p>
          <ul className="mt-3 space-y-2">
            {related.map((note) => (
              <li key={note.id} className="rounded border border-neutral-800 bg-neutral-950/50 p-2 text-xs text-neutral-300">
                {note.text}
              </li>
            ))}
          </ul>
        </div>
      )}




      {instabilityLevel >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/20 bg-red-950/10 p-4 text-xs text-red-100/80"
        >
          notebook coherence failing

          <div className="mt-3 space-y-2">
            <p>• preserved wording drifting across unrelated entries</p>
            <p>• social corrections propagating into archived memory</p>
            <p>• reconstruction layers no longer align</p>
            <p>• emotional mediation overriding original language</p>
          </div>
        </motion.div>
      )}


      {mutationPhase >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/20 bg-red-950/10 p-4 text-xs text-red-100/80"
        >
          passive notebook mutation detected

          <div className="mt-3 space-y-2">
            <p>• wording drift occurring outside direct excavation</p>
            <p>• archivist copies diverging from recovered originals</p>
            <p>• contradiction language spreading across linked fragments</p>
          </div>
        </motion.div>
      )}


      {mutationPhase >= 5 &&
        selected?.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-lg border border-red-900/30 bg-red-950/20 p-4 text-sm text-red-100/80"
          >
            Eli contradiction chain collapse

            <div className="mt-4 space-y-3 text-xs">
              <p>
                • childhood fear was progressively reframed as behavioral instability
              </p>

              <p>
                • archivist copies hardened emotional interpretation into preserved wording
              </p>

              <p>
                • reconstruction layers increasingly prioritized social coherence over emotional accuracy
              </p>

              <p className="italic">
                maybe the notebook changed him before the town did
              </p>
            </div>
          </motion.div>
        )}

      {collapseTriggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/30 bg-red-950/20 p-4 text-xs text-red-100/80"
        >
          contradiction chain collapse detected

          <div className="mt-3 space-y-2">
            <p>• recovered wording no longer aligns with archivist copy</p>
            <p>• sibling reconstruction diverges from preserved version</p>
            <p>• cannery references spreading across unrelated fragments</p>
            <p>• source confidence critically degraded</p>
          </div>
        </motion.div>
      )}

      {instabilityLevel >= 1 && (
        <div className="mt-5 rounded-lg border border-red-900/20 bg-red-950/10 p-3 text-[11px] text-red-100/70">
          archival confidence degrading through repeated excavation
        </div>
      )}

      {pinnedEvidence.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            Pinned Excavation Evidence
          </p>
          <ul className="mt-3 space-y-2">
            {pinnedEvidence.map((evidence) => (
              <li
                key={evidence}
                className="rounded border border-amber-900/30 bg-amber-950/10 p-2 text-xs italic text-amber-100/80"
              >
                {evidence}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-5 border-t border-neutral-800 pt-4 text-xs italic text-neutral-400">
        Interpretation unresolved. Source confidence degraded by revision, handling, and recovery context.
      </p>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 p-3 text-[11px] text-neutral-500">
          visible pressure marks suggest multiple revisions over time
        </div>

        {selected.recoveredFrom && (
          <div className="rounded-lg border border-amber-900/20 bg-amber-950/10 p-3 text-[11px] text-amber-100/80">
            recovered from: {selected.recoveredFrom}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setMemoryLayer("recovered")}
          className={clsx(
            "rounded border px-3 py-2 text-xs",
            memoryLayer === "recovered"
              ? "border-blue-400 bg-blue-950/30"
              : "border-neutral-700"
          )}
        >
          recovered
        </button>

        <button
          onClick={() => setMemoryLayer("original")}
          className={clsx(
            "rounded border px-3 py-2 text-xs",
            memoryLayer === "original"
              ? "border-amber-400 bg-amber-950/30"
              : "border-neutral-700"
          )}
        >
          original
        </button>

        <button
          onClick={() => setMemoryLayer("reconstructed")}
          className={clsx(
            "rounded border px-3 py-2 text-xs",
            memoryLayer === "reconstructed"
              ? "border-red-400 bg-red-950/30"
              : "border-neutral-700"
          )}
        >
          reconstructed
        </button>
      </div>


      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950/40 p-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          instability drift
        </p>

        <div className="mt-3 flex gap-2">
          {[0,1,2,3,4].map((level) => (
            <div
              key={level}
              className={clsx(
                "h-2 flex-1 rounded-full",
                instabilityLevel > level
                  ? "bg-red-700"
                  : "bg-neutral-800"
              )}
            />
          ))}
        </div>
      </div>



      <button
        onClick={advanceMutation}
        className="mt-3 rounded-lg border border-red-900/30 bg-red-950/10 px-4 py-2 text-xs text-red-100/80 hover:bg-red-950/20"
      >
        advance passive mutation
      </button>


      <button
        onClick={toggleUnstable}
        className="mt-3 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs hover:bg-neutral-800"
      >
        {unstable ? "stabilize memory" : "destabilize memory"}
      </button>
    </aside>
  );
}


export function NotebookSpread() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Alder Cove</p>
          <h1 className="mt-2 text-4xl font-semibold">{notebookOneSpread.title}</h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            First sacred spread prototype: care systems, contradiction logic, and emotional preservation.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Page side="left" notes={notebookOneSpread.leftPage} />
              <Page side="right" notes={notebookOneSpread.rightPage} />
            </div>

            <HiddenLayerPage />
          </div>

          <InspectionPanel />
        </div>
      </div>
    </main>
  );
}

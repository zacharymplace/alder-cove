"use client";

import { motion } from "framer-motion";
import { create } from "zustand";
import clsx from "clsx";

import { notebookOneSpread, type NotebookNote } from "@/data/notebook/notebookOne";

type NotebookState = {
  selectedId: string | null;
  unstable: boolean;
  select: (id: string | null) => void;
  toggleUnstable: () => void;
};

const useNotebookState = create<NotebookState>((set) => ({
  selectedId: null,
  unstable: false,
  select: (id) => set({ selectedId: id }),
  toggleUnstable: () => set((state) => ({ unstable: !state.unstable })),
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
  const { selectedId, select, unstable } = useNotebookState();
  const allNotes = [...notebookOneSpread.leftPage, ...notebookOneSpread.rightPage];
  const selectedNote = allNotes.find((candidate) => candidate.id === selectedId);
  const selected = selectedId === note.id;
  const related = selectedNote?.relatedNoteIds?.includes(note.id) ?? false;

  const unstableText =
    unstable && note.id === "eli-contradiction-a"
      ? "Eli doesnt go below after storms anymore."
      : note.text;

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
      {selected && (
        <div className="absolute -right-2 -top-2 rounded-full bg-red-900 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
          inspecting
        </div>
      )}

      <p className="whitespace-pre-line text-neutral-950">{unstableText}</p>

      {note.author && (
        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-neutral-600">
          {note.author}
        </p>
      )}

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 border-t border-neutral-800/20 pt-2 text-xs italic text-neutral-700"
        >
          preserved memory fragment
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
  return (
    <section className="relative min-h-[860px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#ecdfb7] p-8 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,60,25,.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.7),transparent_22%),radial-gradient(circle_at_82%_75%,rgba(92,64,28,.24),transparent_24%),radial-gradient(circle_at_12%_88%,rgba(30,64,175,.14),transparent_16%)]" />
      <div className="absolute inset-y-0 left-7 w-px bg-red-900/20" />

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
            <Note note={notes[1]} rotate="rotate-[-0.6deg]" />
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

function InspectionPanel() {
  const { selectedId, unstable, toggleUnstable } = useNotebookState();
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
    <aside className="rounded-xl border border-neutral-700 bg-neutral-900/90 p-5 shadow-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
        Inspecting Fragment
      </p>

      <h2 className="mt-3 text-xl font-semibold text-neutral-100">
        {selected.variant ?? "fragment"}
      </h2>

      <p className="mt-3 whitespace-pre-line rounded-lg bg-neutral-950/70 p-3 text-sm text-neutral-200">
        {unstable && selected.id === "eli-contradiction-a"
          ? "Eli doesnt go below after storms anymore."
          : selected.text}
      </p>

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

      <p className="mt-5 border-t border-neutral-800 pt-4 text-xs italic text-neutral-400">
        Interpretation unresolved. The notebook preserves fragments, not certainty.
      </p>

      <button
        onClick={toggleUnstable}
        className="mt-4 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs hover:bg-neutral-800"
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
          <div className="grid gap-6 lg:grid-cols-2">
            <Page side="left" notes={notebookOneSpread.leftPage} />
            <Page side="right" notes={notebookOneSpread.rightPage} />
          </div>

          <InspectionPanel />
        </div>
      </div>
    </main>
  );
}

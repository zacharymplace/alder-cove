import { notebookOneSpread, type NotebookNote } from "@/data/notebook/notebookOne";

function noteClass(variant?: NotebookNote["variant"]) {
  switch (variant) {
    case "founding":
      return "text-4xl font-black tracking-wide uppercase rotate-[-2deg] leading-tight";
    case "contradiction":
      return "border border-dashed border-neutral-700/40 bg-white/20 rotate-[0.8deg] shadow-sm";
    case "warning":
      return "text-sm border-l-2 border-red-900/50 bg-red-100/20 rotate-[-0.5deg]";
    case "map":
      return "border border-blue-900/20 bg-blue-50/20 rotate-[0.4deg]";
    case "symbol":
      return "border border-amber-900/20 bg-amber-50/20 rotate-[-0.6deg]";
    case "log":
      return "font-mono text-sm whitespace-pre-line bg-white/20 rotate-[0.3deg]";
    default:
      return "text-sm italic rotate-[-0.4deg]";
  }
}

function CheckInTable() {
  const rows = [
    ["Eli", "cannery roof", "Mara", "before lights"],
    ["June", "ferry hill", "alone", "after dinner"],
    ["Nora", "tide pools", "Ben", "when horn goes"],
    ["Cal", "lower trail", "dont tell parents", "probably late"],
  ];

  return (
    <div className="rotate-[0.5deg]">
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
    </div>
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

function NoteCard({ note }: { note: NotebookNote }) {
  return (
    <article className={`p-3 text-neutral-950 ${noteClass(note.variant)}`}>
      <p>{note.text}</p>
      {note.author && (
        <p className="mt-2 text-[10px] uppercase tracking-widest text-neutral-600">
          {note.author}
        </p>
      )}
    </article>
  );
}

function Page({ side, notes }: { side: "left" | "right"; notes: NotebookNote[] }) {
  return (
    <section className="relative min-h-[760px] rounded-xl border border-neutral-500/50 bg-[#ecdfb7] p-8 shadow-2xl overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(80,60,25,.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.7),transparent_22%),radial-gradient(circle_at_82%_75%,rgba(92,64,28,.24),transparent_24%),radial-gradient(circle_at_10%_92%,rgba(30,64,175,.12),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-7 w-px bg-red-900/20" />

      <div className="relative z-10 space-y-6" style={{ fontFamily: "Comic Sans MS, Bradley Hand, Chalkboard SE, cursive" }}>
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-700">{side} page</p>

        {side === "left" ? (
          <>
            <NoteCard note={notes[0]} />
            <NoteCard note={notes[1]} />
            <ChildMap />
            <SymbolLegend />
            <CheckInTable />
          </>
        ) : (
          <>
            <CannerySketch />
            <NoteCard note={notes[1]} />
            <div className="grid gap-3">
              <NoteCard note={notes[2]} />
              <NoteCard note={notes[3]} />
            </div>
            <NoteCard note={notes[4]} />
            <NoteCard note={notes[5]} />
          </>
        )}
      </div>
    </section>
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
            First sacred spread prototype: care systems, symbol logic, and the first hairline fracture.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Page side="left" notes={notebookOneSpread.leftPage} />
          <Page side="right" notes={notebookOneSpread.rightPage} />
        </div>
      </div>
    </main>
  );
}

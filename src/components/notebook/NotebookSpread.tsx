"use client";

import Link from "next/link";

import { notebookOneSpread } from "@/data/notebook/notebookOne";

import { NotebookReader } from "./spread/NotebookReader";
import { NotebookReaderControls } from "./spread/NotebookReaderControls";
import { RuleEdits } from "./spread/content/RuleEdits";
import { SymbolLegend } from "./spread/content/SymbolLegend";
import { CheckInTable } from "./spread/content/CheckInTable";

export { RuleEdits, SymbolLegend, CheckInTable };

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

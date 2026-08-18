import type { NotebookNote } from "@/data/notebook/notebookOne";

import { spreadResidueClass } from "../styleHelpers";
import { DamageOverlay, EdgeWear } from "../PageWear";
import { Note } from "../Note";
import { SymbolLegend } from "../content/SymbolLegend";

export type ContinuationSupportPageProps = {
  notes: NotebookNote[];
  residueDensity?: "light" | "heavy" | "soft";
};

/**
 * The "continuation-support" authored page: a facing page explaining that
 * overflow content was copied here after the first spread got too
 * crowded. Rendered in place of StandardNotebookPage whenever a page
 * definition's role is "continuation-support" — see ./pageRenderers.
 */
export function ContinuationSupportPage({ notes, residueDensity }: ContinuationSupportPageProps) {
  return (
    <section className="relative h-[900px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#eadcb1] p-9 shadow-2xl transition-transform duration-700 hover:translate-y-[-2px]">
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
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-700">
          facing page
        </p>

        <p className="mt-10 rotate-[-1deg] text-sm italic text-neutral-800/62">
          continuation copied here after the first spread got too crowded
        </p>

        <div className="mt-8 space-y-5">
          {notes.map((note, index) => (
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
  );
}

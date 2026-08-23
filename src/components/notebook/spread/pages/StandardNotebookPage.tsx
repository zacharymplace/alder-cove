import clsx from "clsx";

import type { NotebookNote } from "@/data/notebook/notebookOne";
import { notebookContaminationNotes } from "@/data/crossArtifact/notebookContamination";

import {
  spreadShellClass,
  spreadResidueClass,
  contaminationVisibilityClass,
} from "../styleHelpers";
import { DamageOverlay, EdgeWear } from "../PageWear";
import { Note } from "../Note";
import { ChildMap } from "../content/ChildMap";
import { CannerySketch } from "../content/CannerySketch";

export type StandardNotebookPageProps = {
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
};

/**
 * The default authored page shell: a title/page-number strip, the page's
 * notes (with optional cannery sketch and map inserts), and a provenance
 * footer. Used for every notebook page except the two special roles
 * (recovered-rules, continuation-support) handled elsewhere in
 * ./pageRenderers.
 */
export function StandardNotebookPage({
  title,
  pageNumber,
  notes,
  components = [],
  provenance,
  paperTone = "aged",
  residueDensity = "light",
}: StandardNotebookPageProps) {
  const contaminationNotes = pageNumber
    ? notebookContaminationNotes.filter(
        (note) => note.affectedPage === pageNumber
      )
    : [];

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

        {contaminationNotes.length > 0 && (
          <div className="rounded border border-blue-900/15 bg-blue-950/5 p-3 text-[10px] text-neutral-800/55">
            <p className="uppercase tracking-[0.22em] text-blue-100/35">
              recovery contamination
            </p>

            {contaminationNotes.map((note) => (
              <p
                key={note.id}
                className={clsx(
                  "mt-2 italic leading-relaxed",
                  contaminationVisibilityClass(note.visibility)
                )}
              >
                {note.note}
              </p>
            ))}
          </div>
        )}

        </div>
      </div>
    </section>
  );
}

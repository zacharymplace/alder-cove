import type { ArchiveDisplayArtifact } from "./artifactPresentation";
import { handlingStateLabel } from "./artifactPresentation";

export type InspectionPanelProps = {
  artifact: ArchiveDisplayArtifact;
  onSetDown: () => void;
};

/**
 * The "object in hand" detail panel shown while an artifact card is
 * under active inspection.
 */
export function InspectionPanel({ artifact, onSetDown }: InspectionPanelProps) {
  return (
    <aside className="fixed right-8 top-24 z-50 max-h-[calc(100vh-8rem)] w-[380px] overflow-y-auto border border-amber-100/15 bg-[#11100d]/95 p-5 text-sm text-neutral-200 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-100/45">
          object in hand
        </p>

        <button
          type="button"
          onClick={onSetDown}
          className="border border-amber-100/15 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-300 transition hover:bg-black/50"
        >
          set down
        </button>
      </div>

      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-100/45">
        handling note
      </p>

      <h2 className="mt-3 font-serif text-2xl italic text-neutral-100">
        {artifact.title}
      </h2>

      <p className="mt-4 leading-relaxed text-neutral-400">
        {artifact.description}
      </p>

      {artifact.ethicalPressure && (
        <p className="mt-4 border-l border-red-200/15 pl-4 italic leading-relaxed text-red-100/55">
          {artifact.ethicalPressure}
        </p>
      )}

      <div className="mt-5 space-y-2 border-t border-neutral-800 pt-4 text-xs text-neutral-500">
        <p>access: {artifact.accessClass.replaceAll("-", " ")}</p>
        <p>
          acquisition:{" "}
          {artifact.acquisitionMethod.replaceAll("-", " ")}
        </p>
        <p>
          handling:{" "}
          {handlingStateLabel(artifact.handlingState)}
        </p>
        <p>risk: {artifact.emotionalRisk}</p>
        <p>{artifact.pageIds.length} pages indexed</p>
      </div>
    </aside>
  );
}

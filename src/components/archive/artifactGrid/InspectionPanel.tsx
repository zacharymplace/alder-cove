import type { ArchiveDisplayArtifact } from "./artifactPresentation";
import { handlingStateLabel } from "./artifactPresentation";

export type InspectionPanelProps = {
  artifact: ArchiveDisplayArtifact;
  onSetDown: () => void;
};

/**
 * The "object in hand" detail panel shown while an artifact card is
 * under active inspection. Styled as a physically handled paper note
 * (matching the artifact cards' handling-note language) rather than a
 * conventional dark UI panel, so holding an object still reads as
 * handling paper rather than opening a menu.
 */
export function InspectionPanel({ artifact, onSetDown }: InspectionPanelProps) {
  return (
    <aside className="fixed right-8 top-24 z-50 max-h-[calc(100vh-8rem)] w-[380px] overflow-y-auto rotate-[-0.6deg] border border-neutral-900/20 bg-[#d4c4a4] p-5 font-mono text-sm text-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
      <div className="pointer-events-none absolute right-5 top-4 h-4 w-16 rotate-[4deg] rounded-sm bg-white/15" />
      <div className="pointer-events-none absolute left-6 top-[-10px] h-5 w-20 rotate-[-3deg] bg-[#f1e2bb]/40 shadow-sm" />

      <div className="mb-5 flex items-center justify-between gap-4 border-b border-neutral-900/20 pb-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-900/60">
          object in hand
        </p>

        <button
          type="button"
          onClick={onSetDown}
          className="text-[10px] uppercase tracking-[0.28em] text-red-900/70 underline-offset-4 transition hover:underline"
        >
          set down
        </button>
      </div>

      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-900/60">
        handling note
      </p>

      <h2 className="mt-3 font-serif text-2xl italic text-neutral-900">
        {artifact.title}
      </h2>

      <p className="mt-4 font-sans leading-relaxed text-neutral-700">
        {artifact.description}
      </p>

      {artifact.ethicalPressure && (
        <p className="mt-4 border-l border-red-900/20 pl-4 font-sans italic leading-relaxed text-red-900/70">
          {artifact.ethicalPressure}
        </p>
      )}

      <div className="mt-5 space-y-2 border-t border-neutral-900/20 pt-4 text-xs text-neutral-700">
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

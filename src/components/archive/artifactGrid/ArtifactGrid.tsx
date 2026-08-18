import type { ArchiveDisplayArtifact } from "./artifactPresentation";
import { ArtifactCard } from "./ArtifactCard";

export type ArtifactGridProps = {
  artifacts: ArchiveDisplayArtifact[];
  focusedArtifactId: string | null;
  inspectionIntentId: string | null;
  prefaceDismissed: boolean;
  handledArtifactIds: Set<string>;
  onHover: (id: string | null) => void;
  onToggleInspect: (id: string) => void;
  onPickUp: (id: string) => void;
};

/**
 * The main preservation-environment panel: decorative shell plus the
 * grid of artifact cards.
 */
export function ArtifactGrid({
  artifacts,
  focusedArtifactId,
  inspectionIntentId,
  prefaceDismissed,
  handledArtifactIds,
  onHover,
  onToggleInspect,
  onPickUp,
}: ArtifactGridProps) {
  return (
    <section className="relative rounded-[2rem] border border-amber-950/45 bg-[#20140d]/80 px-10 pb-16 pt-10 shadow-[0_45px_140px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_45%_25%,rgba(255,218,150,0.09),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.06] mix-blend-overlay">
        <div className="absolute left-[20%] top-[15%] h-40 w-40 rounded-full bg-black blur-3xl" />
        <div className="absolute right-[15%] top-[25%] h-52 w-52 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-[20%] left-[40%] h-44 w-44 rounded-full bg-black blur-3xl" />
      </div>

      <div className="relative grid gap-x-14 gap-y-16 xl:grid-cols-3">
        {artifacts.map((document) => (
          <ArtifactCard
            key={document.id}
            document={document}
            isFocused={focusedArtifactId === document.id}
            isInspecting={inspectionIntentId === document.id}
            isInteractive={prefaceDismissed}
            isHandled={handledArtifactIds.has(document.id)}
            onHoverStart={() => onHover(document.id)}
            onHoverEnd={() => onHover(null)}
            onToggleInspect={() => onToggleInspect(document.id)}
            onPickUp={() => onPickUp(document.id)}
          />
        ))}
      </div>
    </section>
  );
}

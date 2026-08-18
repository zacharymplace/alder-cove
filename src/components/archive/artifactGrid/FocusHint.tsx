import type { ArchiveDisplayArtifact } from "./artifactPresentation";
import { handlingStateLabel } from "./artifactPresentation";

export type FocusHintProps = {
  artifact: ArchiveDisplayArtifact;
};

/**
 * The floating "handling focus" hint shown while hovering/focusing an
 * artifact card without actively inspecting it.
 */
export function FocusHint({ artifact }: FocusHintProps) {
  return (
    <div className="pointer-events-none fixed right-8 top-24 z-40 max-w-[320px] rounded border border-amber-100/10 bg-black/35 px-4 py-3 text-xs text-neutral-300/80 shadow-2xl backdrop-blur-sm">
      <p className="uppercase tracking-[0.28em] text-amber-100/45">
        handling focus
      </p>
      <p className="mt-2 font-serif text-lg italic text-neutral-100/80">
        {artifact.title}
      </p>
      <p className="mt-2 leading-relaxed text-neutral-400">
        {artifact.accessClass.replaceAll("-", " ")} ·{" "}
        {handlingStateLabel(artifact.handlingState)}
        {artifact.accessClass === "private"
          ? " · approach slowly"
          : artifact.accessClass === "illicitly-acquired"
          ? " · acquisition unclear"
          : " · paper shifts slightly"}
      </p>
    </div>
  );
}

import Link from "next/link";

import {
  artifactInteractionClass,
  dotClass,
  focusLanguage,
  handlingStateClass,
  handlingStateLabel,
  type ArchiveDisplayArtifact,
} from "./artifactPresentation";
import { ArtifactVisual } from "./ArtifactVisual";

export type ArtifactCardProps = {
  document: ArchiveDisplayArtifact;
  isFocused: boolean;
  isInspecting: boolean;
  isInteractive: boolean;
  isHandled: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onToggleInspect: () => void;
  onPickUp: () => void;
};

/**
 * A single artifact card in the archive index grid: the decorative
 * "physical object" mockup plus a handling-note label beneath it.
 * Hover/focus/inspection state is owned by the parent grid and passed
 * in, since it drives cross-card UI (the focus hint, the inspection
 * panel) as well as this card's own styling.
 */
export function ArtifactCard({
  document,
  isFocused,
  isInspecting,
  isInteractive,
  isHandled,
  onHoverStart,
  onHoverEnd,
  onToggleInspect,
  onPickUp,
}: ArtifactCardProps) {
  return (
    <article
      style={{
        pointerEvents: isInteractive ? "auto" : "none",
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onToggleInspect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggleInspect();
        }
      }}
      tabIndex={0}
      className={[
        "group relative outline-none transition duration-300",
        isFocused ? "z-30 scale-[1.015]" : "",
        isInspecting ? "z-40 scale-[1.025]" : "",
        document.type === "private-journal"
          ? "mt-16"
          : document.type === "interview-note"
          ? "mt-24"
          : "",
      ].join(" ")}
    >
      {isInspecting && (
        <>
          <div className="pointer-events-none absolute inset-x-4 top-[-10px] z-30 h-px bg-amber-100/30" />
          <div className="pointer-events-none absolute left-6 top-[-34px] z-40 border border-amber-100/15 bg-black/55 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-neutral-300 shadow-xl">
            object in hand
          </div>
        </>
      )}

      {document.accessClass === "private" && (
        <div className="pointer-events-none absolute inset-x-8 top-8 z-20 h-px bg-red-100/10" />
      )}

      {document.accessClass === "illicitly-acquired" && (
        <div className="pointer-events-none absolute inset-6 z-20 border border-violet-200/10" />
      )}

      <div className="absolute right-6 top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-950/40 bg-black/25 shadow">
        <span
          className={`h-4 w-4 rounded-full ${dotClass(
            document.accessClass
          )}`}
        />
      </div>

      <div
        className={[
          "relative z-10 transition",
          artifactInteractionClass(document),
          isInspecting
            ? "translate-y-[-10px] rotate-[0.4deg] drop-shadow-2xl"
            : isFocused
            ? "drop-shadow-2xl"
            : "",
        ].join(" ")}
      >
        <ArtifactVisual type={document.type} title={document.title} />
      </div>

      <div className={[
          "relative z-20 mx-7 mt-[-18px] min-h-[138px] border border-neutral-900/20 bg-[#d4c4a4] p-4 font-mono text-xs text-neutral-950 shadow-[0_15px_40px_rgba(0,0,0,0.35)]",
          document.type === "private-journal"
            ? "rotate-[0.8deg]"
            : document.type === "interview-note"
            ? "rotate-[-1.4deg]"
            : "rotate-[-0.4deg]",
        ].join(" ")}>

        <div className="absolute right-4 top-3 h-4 w-14 rotate-[4deg] rounded-sm bg-white/10" />
        <div className="absolute left-4 top-[-10px] h-5 w-20 rotate-[-3deg] bg-[#f1e2bb]/35 shadow-sm" />
        <div className="absolute bottom-3 right-4 text-[8px] uppercase tracking-[0.18em] text-neutral-950/10">
          revised
        </div>
        <div className="absolute left-3 bottom-2 h-px w-16 rotate-[-2deg] bg-neutral-950/10" />
        <div className="absolute left-4 top-[-10px] h-5 w-20 rotate-[-3deg] bg-[#f1e2bb]/35 shadow-sm" />

        <h2 className="font-sans text-base font-semibold leading-snug">
          {document.title}
        </h2>

        <p className="mt-3 text-[11px] leading-relaxed text-neutral-700">
          <span className="text-amber-900">
            {document.accessClass.replaceAll("-", " ")}
          </span>{" "}
          · {document.acquisitionMethod.replaceAll("-", " ")} · risk:{" "}
          {document.emotionalRisk}
        </p>

        <div className="my-4 h-px bg-neutral-900/20" />

        <p className="text-[11px] text-neutral-700">
          {document.pageIds.length} pages indexed
        </p>

        <p
          className={[
            "mt-3 text-[10px] uppercase tracking-[0.24em]",
            handlingStateClass(document.handlingState ?? "awaiting-review"),
          ].join(" ")}
        >
          {handlingStateLabel(document.handlingState ?? "awaiting-review")}
        </p>

        {(isFocused || isInspecting) && (
          <p className="mt-3 border-l border-neutral-900/20 pl-3 text-[10px] italic leading-relaxed text-neutral-800/55">
            {focusLanguage(document)}
          </p>
        )}

        {isInspecting &&
          document.id !== "notebook-one-shared" && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-red-900/60">
              review withheld
            </p>
          )}

        <Link
          href={`/archive/${document.id}`}
          onClick={onPickUp}
          className={[
            "mt-4 inline-block uppercase tracking-[0.28em] underline-offset-4 hover:underline",
            document.id === "notebook-one-shared"
              ? "text-neutral-900"
              : "text-red-900/70",
          ].join(" ")}
        >
          {document.id === "notebook-one-shared"
            ? isHandled
              ? "return to artifact"
              : "pick up"
            : "approach artifact"}
        </Link>
      </div>
    </article>
  );
}

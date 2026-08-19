import clsx from "clsx";

import { TOTAL_NOTEBOOK_SPREADS, useNotebookState } from "@/systems/notebook/inspectionState";
import { getArchiveDocument } from "@/data/archive/archiveDocuments";

export function NotebookReaderControls() {
  const totalSpreads = TOTAL_NOTEBOOK_SPREADS;
  const {
    spreadIndex,
    zoomedPage,
    previousSpread,
    nextSpread,
    setZoomedPage,
    activeDocumentId,
    memoryLayer,
    setMemoryLayer,
  } = useNotebookState();

  const activeDocument = getArchiveDocument(activeDocumentId);

  const toggleFocus = () => {
    setZoomedPage(zoomedPage ? null : "left");
  };

  const moveFocus = (direction: "previous" | "next") => {
    if (!zoomedPage) {
      if (direction === "previous") previousSpread();
      if (direction === "next") nextSpread();
      return;
    }

    if (zoomedPage === "left" && direction === "next") {
      setZoomedPage("right");
      return;
    }

    if (zoomedPage === "right" && direction === "previous") {
      setZoomedPage("left");
      return;
    }

    if (zoomedPage === "right" && direction === "next") {
      nextSpread();
      setZoomedPage("left");
      return;
    }

    if (zoomedPage === "left" && direction === "previous") {
      previousSpread();
      setZoomedPage("right");
    }
  };

  return (
    <div className={clsx(
        "mb-5 flex flex-wrap items-center justify-between gap-3 border border-amber-100/10 bg-[#0f0c09] px-4 py-3 text-xs text-neutral-500 shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-opacity duration-700",
        zoomedPage && "opacity-60 hover:opacity-100"
      )}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => moveFocus("previous")}
          disabled={!zoomedPage && spreadIndex === 0}
          className="rounded border border-neutral-800 px-3 py-2 disabled:opacity-20"
        >
          ← previous page
        </button>

        <div className="flex flex-col px-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
            {activeDocument.title}
          </span>

          <span className="uppercase tracking-[0.25em]">
          {zoomedPage
            ? `${zoomedPage} page focus · spread ${spreadIndex + 1} / ${totalSpreads}`
            : `lay flat ${spreadIndex + 1} / ${totalSpreads}`}
          </span>

          {activeDocument.ethicalPressure && (
            <p className="mt-2 max-w-[220px] text-[10px] italic leading-relaxed text-neutral-600/70">
              {activeDocument.ethicalPressure}
            </p>
          )}

        </div>

        <button
          onClick={() => moveFocus("next")}
          disabled={!zoomedPage && spreadIndex === totalSpreads - 1}
          className="rounded border border-neutral-800 px-3 py-2 disabled:opacity-20"
        >
          next page →
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border border-neutral-800 p-1">
          {(["recovered", "original", "reconstructed"] as const).map(
            (layer) => (
              <button
                key={layer}
                onClick={() => setMemoryLayer(layer)}
                className={clsx(
                  "rounded-sm px-2 py-1.5 text-[10px] uppercase tracking-[0.2em]",
                  memoryLayer === layer
                    ? "bg-amber-950/30 text-amber-100/80"
                    : "text-neutral-600 hover:text-neutral-300"
                )}
              >
                {layer}
              </button>
            )
          )}
        </div>

        <button
          onClick={toggleFocus}
          className={clsx(
            "rounded border px-3 py-2",
            zoomedPage
              ? "border-amber-700 bg-amber-950/20 text-amber-100/70"
              : "border-neutral-800"
          )}
        >
          {zoomedPage ? "lay flat" : "lift page closer"}
        </button>

        {zoomedPage && (
          <button
            onClick={() => setZoomedPage(zoomedPage === "left" ? "right" : "left")}
            className="rounded border border-neutral-800 px-3 py-2"
          >
            switch facing page
          </button>
        )}
      </div>
    </div>
  );
}

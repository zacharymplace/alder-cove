import { motion } from "framer-motion";
import clsx from "clsx";

import { useNotebookState } from "@/systems/notebook/inspectionState";
import { notebookOneSpread } from "@/data/notebook/notebookOne";
import { getSpreadDefinition } from "@/data/notebook/spreadDefinitions";
import { getNotebookPage } from "@/data/notebook/pages";

import { PageTurnVeil } from "./PageTurnVeil";
import { HandledPage } from "./HandledPage";
import { renderNotebookPage } from "./pages/pageRenderers";

export function NotebookReader() {

  const {
    spreadIndex,
    zoomedPage,
    pageTurnDirection,
    clearPageTurn,
  } = useNotebookState();

  const spread = getSpreadDefinition(spreadIndex);

  const leftPageDefinition = getNotebookPage(spread.leftPageId);
  const rightPageDefinition = getNotebookPage(spread.rightPageId);

  const allNotes = [
    ...notebookOneSpread.leftPage,
    ...notebookOneSpread.rightPage,
  ];

  const leftNotes = allNotes.filter((note) =>
    leftPageDefinition.noteIds.includes(note.id)
  );

  const rightNotes = allNotes.filter((note) =>
    rightPageDefinition.noteIds.includes(note.id)
  );

  const leftPage = renderNotebookPage({
    pageDefinition: leftPageDefinition,
    notes: leftNotes,
    spread,
    pageNumber: spreadIndex * 2 + 18,
  });

  const rightPage = renderNotebookPage({
    pageDefinition: rightPageDefinition,
    notes: rightNotes,
    spread,
    pageNumber: spreadIndex * 2 + 19,
  });

  return (
    <div
      className={clsx(
        "grid gap-6 transition-all duration-700 xl:grid-cols-[minmax(0,1fr)_340px]",
        zoomedPage && "bg-neutral-950/30"
      )}
    >
      <div
        className={clsx(
          "relative grid gap-6 transition-all duration-700",
          zoomedPage ? "grid-cols-1" : "lg:grid-cols-2"
        )}
      >
        <PageTurnVeil direction={pageTurnDirection} />

        {pageTurnDirection && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.9, duration: 0.1 }}
            onAnimationComplete={clearPageTurn}
            className="pointer-events-none absolute inset-0"
          />
        )}

        {zoomedPage && (
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,220,.05),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(0,0,0,.35),transparent_60%)]" />
        )}

        {(!zoomedPage || zoomedPage === "left") && (
          <div className={clsx("mx-auto w-full max-w-[430px]", !zoomedPage && "max-w-none")}>
            <HandledPage side="left" focused={zoomedPage === "left"}>
              {leftPage}
            </HandledPage>
          </div>
        )}

        {(!zoomedPage || zoomedPage === "right") && (
          <div className={clsx("mx-auto w-full max-w-[430px]", !zoomedPage && "max-w-none")}>
            <HandledPage side="right" focused={zoomedPage === "right"}>
              {rightPage}
            </HandledPage>
          </div>
        )}
      </div>

      <aside
        className={clsx(
          "relative min-h-[900px] overflow-hidden border border-amber-100/10 bg-[#16130f] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.65)] transition-opacity duration-700",
          zoomedPage && "opacity-65"
        )}
      >
        <div className="absolute inset-y-0 left-5 w-px bg-neutral-700/20" />

        <div className="absolute right-5 top-10 rotate-[3deg] rounded bg-[#f0dfad]/8 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-neutral-500">
          review copy
        </div>

        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-600">
            preservation review · copied object
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-600">
                handling notes
              </p>

              <p className="mt-3 max-w-[220px] text-sm italic leading-relaxed text-neutral-400/85">
                deeper review becomes available after the page is handled long enough
              </p>
            </div>


            <div className="rounded border border-amber-100/10 bg-black/15 p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/45">
                handwriting key
              </p>

              <div className="mt-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif font-bold text-neutral-300">
                    child hand
                  </span>
                  <span className="text-neutral-600">fast / uneven</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans font-black tracking-wide text-neutral-300">
                    sibling hand
                  </span>
                  <span className="text-neutral-600">interruptive</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.16em] text-red-100/55">
                    skeptic mark
                  </span>
                  <span className="text-neutral-600">pushback</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif italic tracking-[0.12em] text-neutral-500">
                    archivist copy
                  </span>
                  <span className="text-neutral-600">softened</span>
                </div>
              </div>
            </div>


            <div className="rounded border border-neutral-700/20 bg-black/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                archivist concern
              </p>

              <p className="mt-3 text-sm italic leading-relaxed text-neutral-400/75">
                contradiction language appears to spread between revisions after repeated reconstruction work
              </p>
            </div>

            <div className="rounded border border-dashed border-neutral-700/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                preservation state
              </p>

              <div className="mt-4 flex gap-2">
                <div className="h-2 w-12 rounded-full bg-neutral-700/60" />
                <div className="h-2 w-12 rounded-full bg-neutral-700/30" />
                <div className="h-2 w-12 rounded-full bg-neutral-700/15" />
              </div>

              <p className="mt-4 text-xs italic text-neutral-500/70">
                original sequence confidence degraded
              </p>
            </div>

            <div className="pt-10 text-[10px] uppercase tracking-[0.3em] text-neutral-700/30">
              copied for flood recovery review
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

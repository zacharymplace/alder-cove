"use client";

import Link from "next/link";

import { TOTAL_NOTEBOOK_SPREADS, useNotebookState } from "../../systems/notebook/inspectionState";

import { motion } from "framer-motion";
import clsx from "clsx";

import { notebookOneSpread } from "@/data/notebook/notebookOne";
import { getSpreadDefinition } from "@/data/notebook/spreadDefinitions";
import { getArchiveDocument } from "@/data/archive/archiveDocuments";
import { getNotebookPage } from "@/data/notebook/pages";

import { PageTurnVeil } from "./spread/PageTurnVeil";
import { renderNotebookPage } from "./spread/pages/pageRenderers";
import { RuleEdits } from "./spread/content/RuleEdits";
import { SymbolLegend } from "./spread/content/SymbolLegend";
import { CheckInTable } from "./spread/content/CheckInTable";

export { RuleEdits, SymbolLegend, CheckInTable };


function HandledPage({
  children,
  side,
  focused,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  focused?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotateY: side === "left" ? -2 : 2 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: focused ? 1.06 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx(
        "relative origin-center transition-transform",
        side === "left" ? "drop-shadow-[8px_18px_18px_rgba(0,0,0,0.35)]" : "drop-shadow-[-8px_18px_18px_rgba(0,0,0,0.35)]"
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-y-3 z-20 w-6 rounded-full blur-md",
          side === "left"
            ? "-right-2 bg-neutral-950/10"
            : "-left-2 bg-neutral-950/10"
        )}
      />

      <div
        className={clsx(
          "pointer-events-none absolute inset-0 z-20 rounded-xl",
          side === "left"
            ? "bg-gradient-to-l from-neutral-950/8 via-transparent to-transparent"
            : "bg-gradient-to-r from-neutral-950/8 via-transparent to-transparent"
        )}
      />

      {children}
    </motion.div>
  );
}

function NotebookReader() {

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


function NotebookReaderControls() {
  const totalSpreads = TOTAL_NOTEBOOK_SPREADS;
  const {
    spreadIndex,
    zoomedPage,
    previousSpread,
    nextSpread,
    setZoomedPage,
    activeDocumentId,
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

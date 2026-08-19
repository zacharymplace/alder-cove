import { motion } from "framer-motion";

import { useNotebookState } from "@/systems/notebook/inspectionState";

import { Tape } from "../SpreadAtoms";
import {
  DamageOverlay,
  HandlingSmudge,
  EdgeWear,
  RemovedFragmentResidue,
  RepeatedHandlingWear,
  MissingPageReference,
} from "../PageWear";

/**
 * The "recovered-rules" authored page. This is the flood-recovered echo
 * tunnel rules page with the flashlight/folded-note hidden-layer
 * interactions. Rendered in place of StandardNotebookPage whenever a
 * page definition's role is "recovered-rules" — see ./pageRenderers.
 */
export function HiddenLayerPage() {
  const {
    flashlight,
    foldedOpen,
    toggleFlashlight,
    toggleFolded,
    pinEvidence,
    increaseInstability,
    triggerCollapse,
    instabilityLevel,
    collapseTriggered,
  } = useNotebookState();

  return (
    <section className="relative h-[900px] overflow-hidden rounded-xl border border-neutral-500/40 bg-[#eadcb1] p-9 shadow-2xl transition-transform duration-700 hover:translate-y-[-2px]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,60,25,.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_70%_25%,rgba(30,64,175,.14),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(92,64,28,.28),transparent_26%)]" />
      <div className="absolute inset-y-0 left-7 w-px bg-red-900/20" />
      <DamageOverlay intensity="heavy" />
      <EdgeWear />
      <RepeatedHandlingWear />
      <RemovedFragmentResidue />
      <MissingPageReference />

      {flashlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_35%,rgba(255,255,220,.28),transparent_28%),radial-gradient(circle_at_55%_70%,rgba(255,255,220,.18),transparent_22%)]"
        />
      )}


        {instabilityLevel >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            className="pointer-events-none absolute left-12 top-12 rotate-[-5deg] text-sm italic text-red-950"
          >
            maybe we changed him first
          </motion.p>
        )}



      <div className="pointer-events-none absolute left-16 top-[58%] rotate-[-2deg] text-[11px] italic text-neutral-700/26">
        he wasnt trying to scare us
      </div>


      <div
        className="relative z-10 h-full space-y-4 overflow-hidden"
        style={{ fontFamily: "Comic Sans MS, Bradley Hand, Chalkboard SE, cursive" }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-700">
          unstable recovered page
        </p>

        <div className="rotate-[-0.7deg]">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-700">
            Route: Echo Tunnel
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-neutral-950">
            after rain only if two people go
          </h2>
          <p className="mt-2 text-sm italic text-neutral-700">
            copied from old rules because the first one got wet
          </p>
        </div>

        <div className="relative rounded-sm border border-neutral-700/30 bg-blue-50/20 p-5 pb-24">
          <Tape className="-top-2 left-12" />
          <p className="text-sm">
            If the water is past the third stair, dont go below.
          </p>
          <p className="mt-2 text-sm">
            If someone says they remember different, mark it and wait.
          </p>
          <p className="mt-2 text-sm line-through decoration-red-900/60 decoration-2">
            ask Eli because he knows the tunnel best
          </p>
          <p className="mt-2 text-sm">
            ask two people. not just Eli.
          </p>

          {flashlight && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 0.42, filter: "blur(0px)" }}
                transition={{ duration: 4.8 }}
                onClick={() => {
                  pinEvidence("he was scared before we were");
                  increaseInstability();

                  if (instabilityLevel >= 2) {
                    triggerCollapse();
                  }
                }}
                className="absolute bottom-12 left-12 rotate-[-1deg] text-left text-lg text-neutral-700/68 hover:opacity-90"
              >
                he was scared before we were
              </motion.button>

              <motion.button
                type="button"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 0.32, filter: "blur(0px)" }}
                transition={{ delay: 3.0, duration: 5.2 }}
                onClick={() => {
                  pinEvidence("not just Eli because Eli remembers wrong");
                  increaseInstability();
                }}
                className="absolute bottom-4 right-8 rotate-[2deg] text-left text-xs text-neutral-700/60 line-through hover:opacity-90"
              >
                not just Eli because Eli remembers wrong
              </motion.button>
            </>
          )}
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={toggleFolded}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              toggleFolded();
            }
          }}
          className="relative block w-full cursor-pointer rounded-sm bg-[#f3e2ab] p-5 text-left shadow-lg transition hover:scale-[1.01]"
        >
          <Tape className="-top-2 left-10" />
          <HandlingSmudge className="right-6 top-5" />

          <div className="pointer-events-none absolute right-10 top-7 rotate-[5deg] text-[10px] italic text-neutral-900/20">
            dont lose this one
          </div>


          <p className="text-xs uppercase tracking-[0.25em] text-neutral-700">
            folded note under tape
          </p>

          <p className="mt-2 text-sm leading-relaxed text-neutral-950">
            {foldedOpen
              ? "Mara said the cannery gives people back wrong but made me change it to things because people sounds too mean."
              : "do not open unless the story changes again"}
          </p>

          {foldedOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border-t border-neutral-800/20 pt-3 text-xs italic text-neutral-700"
            >
              <span className="block">
                back side:{" "}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    pinEvidence("if we write it nicer does that make it less true?");
                    increaseInstability();
                  }}
                  className="text-left underline decoration-dotted underline-offset-4 hover:text-neutral-950"
                >
                  if we write it nicer does that make it less true?
                </button>
              </span>
            </motion.div>
          )}
        </div>

        <div className="rounded-sm border border-dashed border-neutral-700/40 p-4">
          <p className="text-sm">
            official wording:
            <span className="ml-2 font-bold">things</span>
          </p>
          <p className="mt-2 text-sm">
            original wording:
            <span className="ml-2 font-bold italic">people</span>
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-neutral-700">
            discrepancy unresolved
          </p>
        </div>


        {instabilityLevel >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded border border-red-900/20 bg-red-950/10 p-3 text-xs italic text-red-100/70"
          >
            recovered wording diverging from archived wording
          </motion.div>
        )}



      {instabilityLevel >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 rounded-lg border border-red-900/10 bg-red-950/3 p-4 text-xs text-red-100/60"
        >
          preservation layers no longer fully agree

          <div className="mt-3 space-y-2">
            <p>• preserved wording varies between layers</p>
            <p>• social corrections appear within recovered memory</p>
            <p>• reconstruction layers preserve conflicting emphasis</p>
            <p>• later wording may soften earlier phrasing</p>
          </div>
        </motion.div>
      )}


      {collapseTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-lg bg-red-950/8 p-4 text-sm text-red-100/55"
          >
            Eli wording differs here

            <div className="mt-4 space-y-3 text-xs">
              <p>
                • childhood fear gradually became categorized behavior
              </p>

              <p>
                • archivist copies preserved a narrower emotional framing
              </p>

              <p>
                • later copies appear emotionally softened
              </p>

              <p className="italic">
                maybe the notebook got there first
              </p>
            </div>
          </motion.div>
        )}

      {collapseTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            className="pointer-events-none absolute bottom-10 right-16 rotate-[-3deg] text-sm italic text-red-950"
          >
            maybe none of us remembered him right
          </motion.div>
        )}


      <div className="pointer-events-none absolute left-[22%] top-[76%] rotate-[-4deg] text-[11px] italic text-neutral-700/8">
        he said the tunnels remembered us wrong
      </div>


      <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={toggleFlashlight}
            className="rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs text-neutral-100 hover:bg-neutral-800"
          >
            {flashlight ? "turn off side light" : "use side light"}
          </button>

          <span className="rounded bg-neutral-900/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-neutral-700">
            recovered from flood box 3
          </span>
        </div>
      </div>
    </section>
  );
}

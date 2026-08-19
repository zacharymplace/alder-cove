import { motion } from "framer-motion";
import clsx from "clsx";

import { notebookOneSpread, type NotebookNote } from "@/data/notebook/notebookOne";
import { useNotebookState } from "@/systems/notebook/inspectionState";
import { resolveNoteText } from "@/systems/notebook/noteTextDrift";

import { noteClass, handwritingClass, phaseClass } from "./styleHelpers";
import { HandlingSmudge } from "./PageWear";

export function Note({
  note,
  rotate,
}: {
  note: NotebookNote;
  rotate?: string;
}) {
  const {
    selectedId,
    select,
    memoryLayer,
    instabilityLevel,
    collapseTriggered,
  } = useNotebookState();
  const allNotes = [...notebookOneSpread.leftPage, ...notebookOneSpread.rightPage];
  const selectedNote = allNotes.find((candidate) => candidate.id === selectedId);
  if (!note) {
    return null;
  }

  const selected = selectedId === note.id;
  const related = selectedNote?.relatedNoteIds?.includes(note.id) ?? false;

  const unstableText = resolveNoteText(note, {
    memoryLayer,
    instabilityLevel,
    collapseTriggered,
  });

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      onClick={() => select(selected ? null : note.id)}
      className={clsx(
        "relative cursor-pointer rounded-sm p-3 transition-all duration-300",
        noteClass(note.variant),
        rotate,
        selected && "ring-2 ring-red-900/50 shadow-xl",
        related && "animate-pulse ring-2 ring-blue-900/40",
        !selected && !related && "opacity-95 hover:opacity-100"
      )}
    >
      {note.variant === "contradiction" && (
        <HandlingSmudge className="-right-4 top-1" />
      )}



        {note.contradictionChain === "eli-tunnels" && (
          <div className="pointer-events-none absolute -left-2 top-0 h-full w-4 rounded-r-full bg-red-950/3 blur-[1px]" />
        )}


      {note.contradictionChain === "eli-tunnels" && (
        <>
          <HandlingSmudge className="-left-5 top-2 h-24 w-32 bg-neutral-900/12" />

          <div className="pointer-events-none absolute -right-3 bottom-3 h-16 w-28 rotate-[4deg] rounded-full bg-red-950/6 blur-md" />

          <div className="pointer-events-none absolute left-4 top-2 h-px w-[78%] rotate-[0.4deg] bg-neutral-950/10" />

          <div className="pointer-events-none absolute right-8 top-[62%] rotate-[3deg] text-[10px] italic text-neutral-800/16">
            ask him then
          </div>
        </>
      )}


      {instabilityLevel >= 3 && note.variant === "contradiction" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          className="pointer-events-none absolute inset-0 border border-red-900/30"
        />
      )}


      {instabilityLevel >= 4 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          className="pointer-events-none absolute bottom-2 right-3 rotate-[2deg] text-[10px] italic text-red-950"
        >
          wording changed after recovery
        </motion.p>
      )}


        {note.contradictionChain === "eli-tunnels" && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
            viewBox="0 0 500 220"
          >
            <path
              d="M42 88 C120 84, 210 96, 340 78"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
            />

            <path
              d="M70 120 C180 132, 290 126, 410 118"
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        )}


      {collapseTriggered &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            className="pointer-events-none absolute inset-0 bg-red-950/10"
          />
        )}


      {instabilityLevel >= 3 &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            className="mt-2 rounded border border-red-900/20 bg-red-950/10 p-2 text-[10px] uppercase tracking-[0.18em] text-red-100/70"
          >
            archival confidence degraded after excavation
          </motion.div>
        )}

      {selected && (
        <div className="absolute -right-2 -top-2 rounded-full bg-red-900 px-2 py-1 text-[10px] uppercase tracking-widest text-neutral-900/80">
          inspecting
        </div>
      )}

      <p
        className={clsx(
          "whitespace-pre-line text-neutral-950",
          handwritingClass(note.handwriting),
          phaseClass(note.yearPhase)
        )}
      >
        {unstableText}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-neutral-700">
        {note.author && <span>{note.author}</span>}

        {note.copiedBy && (
          <span className="rounded bg-neutral-900/10 px-2 py-1">
            copied by {note.copiedBy}
          </span>
        )}

        {note.yearPhase && (
          <span className="italic opacity-70">
            {note.yearPhase.replace("-", " ")}
          </span>
        )}

        {note.authenticity && (
          <span
            className={clsx(
              "rounded px-2 py-1 transition-all duration-700",
              note.authenticity === "original" && "bg-green-950/20",
              note.authenticity === "copied" && "bg-blue-950/20",
              note.authenticity === "damaged" && "bg-amber-950/20",
              note.authenticity === "reconstructed" && "bg-red-950/20",

              instabilityLevel >= 3 &&
                note.contradictionChain === "eli-tunnels" &&
                "border border-red-900/40 bg-red-950/20 text-red-100/80"
            )}
          >
            {instabilityLevel >= 3 &&
            note.authenticity === "copied" &&
            note.contradictionChain === "eli-tunnels"
              ? "disputed copy"
              : instabilityLevel >= 4 &&
                note.authenticity === "reconstructed" &&
                note.contradictionChain === "eli-tunnels"
              ? "unstable reconstruction"
              : note.authenticity}
          </span>
        )}
      </div>


      {instabilityLevel >= 3 &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            className="mt-2 rounded border border-red-900/20 bg-red-950/10 p-2 text-[10px] uppercase tracking-[0.18em] text-red-100/70"
          >
            archival confidence degraded after excavation
          </motion.div>
        )}


      {selected &&
        note.contradictionChain === "eli-tunnels" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 2.5, duration: 2.5 }}
            className="mt-3 text-[11px] italic text-neutral-700/70"
          >
            the longer this is held, the less certain the wording feels
          </motion.div>
        )}

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 border-t border-neutral-800/20 pt-2 text-xs italic text-neutral-700"
        >
          preserved fragment
          {note.pressureReveal && (
            <motion.p
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 0.58, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-3 rotate-[-0.6deg] text-[13px] text-neutral-700 line-through decoration-neutral-500/60"
            >
              {note.pressureReveal}
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.article>
  );
}

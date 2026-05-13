type ArchiveDocumentDecisionPanelProps = {
  isPrivate: boolean;
};

export function ArchiveDocumentDecisionPanel({
  isPrivate,
}: ArchiveDocumentDecisionPanelProps) {
  return (
    <>
      {isPrivate && (
        <div className="mt-10 rotate-[-1deg] border border-red-100/10 bg-red-950/5 p-5 shadow-xl">
          <p className="text-[10px] uppercase tracking-[0.28em] text-red-100/35">
            handling restriction
          </p>

          <p className="mt-4 font-serif text-2xl italic leading-relaxed text-red-100/60">
            The archive has not decided whether preserving readability here
            causes more harm than withholding it.
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-red-100/40">
            Some materials remain physically indexed while intentionally
            resisting legibility.
          </p>
        </div>
      )}

      <div className="mt-10 border border-neutral-800/80 bg-black/20 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
          archive decision
        </p>

        <p className="mt-4 font-serif text-2xl italic text-neutral-300">
          The archive can hold the object without opening it yet.
        </p>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
          Preservation does not always imply permission. Some materials need to
          remain present before they become readable.
        </p>
      </div>
    </>
  );
}

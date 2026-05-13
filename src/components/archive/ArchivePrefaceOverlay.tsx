type ArchivePrefaceOverlayProps = {
  onDismiss: () => void;
};

export function ArchivePrefaceOverlay({ onDismiss }: ArchivePrefaceOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden border border-amber-100/10 bg-[#11100d]/95 p-10 shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,220,160,0.08),transparent_35%)]" />

        <p className="text-[10px] uppercase tracking-[0.42em] text-amber-100/45">
          archivist preface
        </p>

        <div className="mt-10 max-w-2xl space-y-7 font-serif text-2xl italic leading-relaxed text-neutral-200">
          <p>I used to believe preservation meant keeping things from disappearing.</p>
          <p>I know now it also means deciding what remains survivable to remember.</p>
          <p className="text-neutral-400">
            These materials were not gathered all at once. Some were shared freely. Some were copied later. Some only survived because someone could not bear to throw them away.
          </p>
          <p className="text-neutral-400">
            I have tried to preserve the order honestly. I do not think I succeeded everywhere.
          </p>
          <p className="text-neutral-500">
            If a line sounds gentler than it should, that may be because it became gentler over time.
          </p>
          <p className="text-neutral-500">
            Start with the shared notebook. Everyone touched that one.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-neutral-800 pt-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
            preservation environment active
          </p>

          <button
            type="button"
            onClick={onDismiss}
            className="border border-amber-100/15 bg-black/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-neutral-200 transition hover:bg-black/35"
          >
            begin handling archive
          </button>
        </div>

        <div className="pointer-events-none absolute right-10 top-10 rotate-[3deg] text-[10px] uppercase tracking-[0.2em] text-red-100/18">
          copied later
        </div>
      </div>
    </div>
  );
}

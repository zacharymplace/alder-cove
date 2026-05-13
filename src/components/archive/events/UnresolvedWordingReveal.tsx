type UnresolvedWordingRevealProps = {
  onClose: () => void;
};

export function UnresolvedWordingReveal({
  onClose,
}: UnresolvedWordingRevealProps) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/65 px-6 backdrop-blur-sm">
      <section className="relative w-full max-w-2xl border border-amber-100/10 bg-[#11100d]/95 p-9 shadow-[0_40px_140px_rgba(0,0,0,0.85)]">
        <p className="text-[10px] uppercase tracking-[0.38em] text-amber-100/45">
          unresolved wording comparison
        </p>

        <div className="mt-8 grid gap-5">
          <div className="rotate-[-1deg] border border-neutral-800 bg-[#d4c4a4] p-5 text-neutral-950 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-700/60">
              earlier copy
            </p>

            <p className="mt-4 font-serif text-3xl italic">
              he was scared
            </p>
          </div>

          <div className="ml-8 rotate-[1deg] border border-neutral-800 bg-[#c7b58e] p-5 text-neutral-950 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-700/60">
              later copy
            </p>

            <p className="mt-4 font-serif text-3xl italic">
              he sounded scared
            </p>
          </div>
        </div>

        <div className="mt-8 border-l border-red-100/15 pl-5">
          <p className="font-serif text-2xl italic leading-relaxed text-red-100/55">
            I no longer know which version arrived first.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            The softer wording appears in later handling notes, but the earlier
            copy was already water-damaged when it reached the archive.
          </p>
        </div>

        <div className="mt-9 flex items-center justify-between border-t border-neutral-800 pt-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
            contradiction preserved
          </p>

          <button
            type="button"
            onClick={onClose}
            className="border border-amber-100/15 bg-black/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-neutral-200 transition hover:bg-black/35"
          >
            return to archive
          </button>
        </div>

        <div className="pointer-events-none absolute right-8 top-8 rotate-[4deg] text-[10px] uppercase tracking-[0.22em] text-red-100/18">
          copied again
        </div>
      </section>
    </div>
  );
}

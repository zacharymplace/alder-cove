type PartialFragmentRevealProps = {
  onClose: () => void;
};

export function PartialFragmentReveal({
  onClose,
}: PartialFragmentRevealProps) {
  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center bg-black/72 px-6 backdrop-blur-sm">
      <section className="relative w-full max-w-3xl overflow-hidden border border-red-100/10 bg-[#100d0c]/96 p-10 shadow-[0_40px_140px_rgba(0,0,0,0.9)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_25%,rgba(255,220,160,0.05),transparent_35%)]" />

        <p className="text-[10px] uppercase tracking-[0.38em] text-red-100/35">
          partial readability event
        </p>

        <div className="mt-10 rotate-[-1deg] border border-neutral-800 bg-[#d3c29d] p-8 text-neutral-950 shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
          <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-700/60">
            recovered edge fragment
          </p>

          <div className="mt-8 space-y-5 font-serif text-3xl italic leading-relaxed">
            <p>
              we said not to
              <span className="mx-2 inline-block h-[1px] w-24 bg-black/20 align-middle" />
              after the storm
            </p>

            <p className="text-neutral-950/55">
              Eli kept saying the tunnel
              <span className="mx-2 inline-block h-[1px] w-14 bg-black/20 align-middle" />
              wrong
            </p>

            <p className="text-neutral-950/40">
              Mara said if anyone wrote it down
              <span className="mx-2 inline-block h-[1px] w-28 bg-black/20 align-middle" />
            </p>
          </div>

          <div className="mt-10 border-t border-neutral-900/15 pt-5">
            <p className="text-sm italic leading-relaxed text-neutral-800/65">
              lower-right portion fused during drying. reconstruction attempts
              remain incomplete.
            </p>
          </div>

          <div className="pointer-events-none absolute right-10 top-14 rotate-[6deg] text-[10px] uppercase tracking-[0.22em] text-red-900/20">
            partially legible
          </div>

          <div className="pointer-events-none absolute left-10 bottom-10 h-12 w-40 rotate-[2deg] rounded-full bg-black/6 blur-xl" />
        </div>

        <div className="mt-10 border-l border-red-100/15 pl-5">
          <p className="font-serif text-2xl italic leading-relaxed text-red-100/50">
            Some fragments resist reconstruction more aggressively than others.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500">
            The archive occasionally preserves emotional pressure more clearly
            than language itself.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-neutral-800 pt-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
            readability unstable
          </p>

          <button
            type="button"
            onClick={onClose}
            className="border border-red-100/10 bg-black/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-neutral-200 transition hover:bg-black/35"
          >
            return to archive
          </button>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

/**
 * Shown for documents the archive once indexed but no longer holds,
 * because the person the material concerned asked for it back. Distinct
 * from the generic not-found state, which covers material the archive
 * never indexed at all.
 */
export function WithdrawnNotice() {
  return (
    <main className="min-h-screen bg-[#080706] px-8 py-10 text-neutral-100">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/archive"
          className="inline-flex items-center gap-3 border border-amber-100/15 bg-black/25 px-4 py-3 text-xs uppercase tracking-[0.3em] text-neutral-400 transition hover:bg-black/45 hover:text-neutral-200"
        >
          ← set object down
        </Link>

        <section className="mt-14 border border-neutral-800/60 bg-[#0d0b09] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-100/35">
            archive handling note
          </p>

          <h1 className="mt-6 font-serif text-4xl italic leading-tight text-neutral-300">
            Withdrawn At Request
          </h1>

          <p className="mt-6 max-w-lg leading-relaxed text-neutral-400">
            This material was indexed, then removed after the person it
            concerned asked the archive to take it back. The archive can
            describe that a withdrawal happened without describing what it
            withdrew.
          </p>

          <div className="mt-8 border-l border-neutral-700/60 pl-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-red-100/30">
              handling cannot proceed
            </p>

            <p className="mt-3 font-serif italic leading-relaxed text-neutral-500">
              Withdrawal is not the same as absence. Something was here.
            </p>
          </div>
        </section>

        <Link
          href="/archive"
          className="fixed bottom-8 right-8 z-50 border border-amber-100/15 bg-black/45 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-neutral-300 shadow-2xl backdrop-blur-sm transition hover:bg-black/65"
        >
          set object down
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070605] text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_25%,rgba(255,220,160,0.08),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(120,70,30,0.12),transparent_40%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-10">
        <section className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-100/45">
            Alder Cove Archive
          </p>

          <h1 className="mt-6 font-sans text-7xl font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-100">
            Write it down
            <br />
            before you forget.
          </h1>

          <p className="mt-10 max-w-2xl font-serif text-2xl italic leading-relaxed text-neutral-300/75">
            A preservation environment shaped by notebooks, copied memories,
            emotional revision, and the things people softened over time in
            order to survive them.
          </p>

          <div className="mt-14 flex items-center gap-5">
            <Link
              href="/archive"
              className="border border-amber-100/15 bg-black/30 px-7 py-4 text-xs uppercase tracking-[0.34em] text-neutral-100 shadow-2xl transition hover:bg-black/50"
            >
              Enter Archive
            </Link>

            <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
              preservation environment active
            </p>
          </div>

          <div className="mt-20 max-w-xl border-l border-neutral-800 pl-6">
            <p className="font-serif text-xl italic leading-relaxed text-neutral-400">
              Some materials were shared freely.
            </p>

            <p className="mt-4 font-serif text-xl italic leading-relaxed text-neutral-500">
              Some were copied later.
            </p>

            <p className="mt-4 font-serif text-xl italic leading-relaxed text-neutral-600">
              Some only survived because someone could not bear to throw them
              away.
            </p>
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute bottom-10 right-10 rotate-[-3deg] text-[10px] uppercase tracking-[0.22em] text-red-100/18">
        copied later
      </div>

      <Link
        href="/about"
        className="absolute right-10 top-10 text-[10px] uppercase tracking-[0.28em] text-neutral-500 transition hover:text-neutral-300"
      >
        about this build
      </Link>
    </main>
  );
}

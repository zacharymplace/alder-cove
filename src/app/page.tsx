import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-8 text-neutral-100">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Alder Cove</p>
        <h1 className="mt-3 text-5xl font-semibold">Write it down before you forget.</h1>
        <p className="mt-5 text-neutral-300">
          A memory-governance horror game about children, notebooks, and a town that changes people.
        </p>
        <Link
          href="/notebook"
          className="mt-8 inline-block rounded-xl border border-neutral-600 px-5 py-3 text-sm hover:bg-neutral-900"
        >
          Open Notebook One
        </Link>
      </div>
    </main>
  );
}

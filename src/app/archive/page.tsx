import Link from "next/link";

import { archiveDocuments } from "@/data/archive/archiveDocuments";

function accessLabel(accessClass: string) {
  switch (accessClass) {
    case "shared":
      return "shared";
    case "semi-private":
      return "semi-private";
    case "private":
      return "private";
    case "illicitly-acquired":
      return "acquired without clear consent";
    default:
      return accessClass;
  }
}

export default function ArchiveIndexPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Alder Cove Archive
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Preserved Materials
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Not every document entered the archive the same way. Some were shared.
            Some were copied later. Some may not have been meant to survive.
          </p>
        </header>

        <div className="grid gap-5">
          {archiveDocuments.map((document) => (
            <article
              key={document.id}
              className="rounded-xl border border-neutral-800/70 bg-neutral-900/50 p-5 shadow-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                    {document.type.replaceAll("-", " ")}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    {document.title}
                  </h2>
                </div>

                <div className="rounded border border-neutral-700 px-3 py-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  {accessLabel(document.accessClass)}
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-300">
                {document.description}
              </p>

              {document.ethicalPressure && (
                <p className="mt-4 max-w-3xl border-l border-amber-800/40 pl-4 text-xs italic leading-relaxed text-amber-100/60">
                  {document.ethicalPressure}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                <span>
                  acquisition: {document.acquisitionMethod.replaceAll("-", " ")}
                </span>

                <span>risk: {document.emotionalRisk}</span>

                <span>{document.pageIds.length} pages indexed</span>
              </div>

              {document.id === "notebook-one-shared" && (
                <Link
                  href="/notebook"
                  className="mt-5 inline-block rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
                >
                  open document
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

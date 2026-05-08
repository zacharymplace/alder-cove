import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getArchiveDocument } from "@/data/archive/archiveDocuments";

type ArchiveDocumentRouteProps = {
  params: Promise<{
    documentId: string;
  }>;
};

export default async function ArchiveDocumentRoute({
  params,
}: ArchiveDocumentRouteProps) {
  const { documentId } = await params;

  let document;

  try {
    document = getArchiveDocument(documentId);
  } catch {
    notFound();
  }

  if (document.id === "notebook-one-shared") {
    redirect("/notebook");
  }

  return (
    <main className="min-h-screen bg-[#080706] px-8 py-10 text-neutral-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/archive"
          className="text-xs uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-300"
        >
          ← return to archive
        </Link>

        <section className="mt-16 border border-amber-100/10 bg-[#11100d]/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-100/45">
            handling interstitial
          </p>

          <h1 className="mt-5 font-serif text-5xl italic">
            {document.title}
          </h1>

          <div className="mt-8 grid gap-4 text-sm text-neutral-400">
            <p>
              access:{" "}
              <span className="text-neutral-200">
                {document.accessClass.replaceAll("-", " ")}
              </span>
            </p>

            <p>
              acquisition:{" "}
              <span className="text-neutral-200">
                {document.acquisitionMethod.replaceAll("-", " ")}
              </span>
            </p>

            <p>
              handling:{" "}
              <span className="text-neutral-200">
                {(document.handlingState ?? "awaiting-review").replaceAll(
                  "-",
                  " "
                )}
              </span>
            </p>

            <p>
              risk:{" "}
              <span className="text-neutral-200">
                {document.emotionalRisk}
              </span>
            </p>
          </div>

          <p className="mt-8 max-w-2xl leading-relaxed text-neutral-300">
            {document.description}
          </p>

          {document.ethicalPressure && (
            <p className="mt-6 border-l border-red-100/15 pl-5 italic leading-relaxed text-red-100/55">
              {document.ethicalPressure}
            </p>
          )}

          <div className="mt-10 border border-neutral-800/80 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              current handling status
            </p>

            <p className="mt-4 font-serif text-2xl italic text-neutral-300">
              This material has not been prepared for reading.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
              The archive can acknowledge the object without making its contents
              immediately available. Not every preserved thing is ready to be
              opened.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

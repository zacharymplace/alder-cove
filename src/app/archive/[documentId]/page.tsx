import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getArchiveDocument } from "@/data/archive/archiveDocuments";

type ArchiveDocumentRouteProps = {
  params: Promise<{
    documentId: string;
  }>;
};

function handlingCopy(document: ReturnType<typeof getArchiveDocument>) {
  if (document.accessClass === "private") {
    return {
      eyebrow: "restricted handling",
      title: "This does not feel shared.",
      body:
        "The archive can identify the fragment, but the way it entered preservation makes the act of reading feel different.",
      status: "sealed pending emotional review",
      tone: "private",
    };
  }

  if (document.accessClass === "illicitly-acquired") {
    return {
      eyebrow: "unsettled acquisition",
      title: "The archive should not make this easy.",
      body:
        "This item appears preserved outside normal consent. Its presence creates pressure before its contents do.",
      status: "access delayed",
      tone: "illicit",
    };
  }

  if (document.accessClass === "semi-private") {
    return {
      eyebrow: "limited handling",
      title: "This was not meant for everyone.",
      body:
        "The material sits between shared memory and private memory. It can be acknowledged without being opened casually.",
      status: "awaiting careful review",
      tone: "semi-private",
    };
  }

  return {
    eyebrow: "shared handling",
    title: "This object was meant to be held together.",
    body:
      "Shared artifacts carry communal memory, but later copying and preservation can still change what survives.",
    status: "available for handling",
    tone: "shared",
  };
}

function shellClass(tone: string) {
  switch (tone) {
    case "private":
      return "border-red-950/30 bg-[#120e0d]";
    case "illicit":
      return "border-violet-900/30 bg-[#100d14]";
    case "semi-private":
      return "border-blue-900/25 bg-[#0e1115]";
    default:
      return "border-amber-100/10 bg-[#11100d]/80";
  }
}

function artifactMockup(tone: string) {
  if (tone === "private") {
    return (
      <div className="relative mx-auto h-72 max-w-sm rounded border border-neutral-800 bg-[#171412] shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-6 rounded border border-red-900/15" />
        <div className="absolute left-14 right-14 top-20 rotate-[-4deg] bg-[#c9b995] px-5 py-5 text-center font-serif text-2xl italic text-neutral-950 shadow-lg">
          private
          <br />
          fragment
        </div>
        <div className="absolute inset-x-10 top-1/2 h-2 rounded-full bg-black/70" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded bg-red-950/60 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-red-100/70">
          sealed
        </div>

        <div className="absolute right-12 bottom-8 rotate-[4deg] text-[9px] uppercase tracking-[0.22em] text-red-100/20">
          not prepared for reading
        </div>

        <div className="absolute right-12 bottom-8 rotate-[4deg] text-[9px] uppercase tracking-[0.22em] text-red-100/20">
          not prepared for reading
        </div>

        <div className="absolute right-12 bottom-8 rotate-[4deg] text-[9px] uppercase tracking-[0.22em] text-red-100/20">
          not prepared for reading
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-72 max-w-sm rounded border border-neutral-800 bg-[#aa956a] shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
      <div className="absolute inset-y-0 left-8 w-4 bg-black/30" />
      <div className="absolute left-24 top-20 rotate-[-2deg] font-serif text-3xl italic text-neutral-950">
        preserved
        <br />
        material
      </div>
      <div className="absolute bottom-14 left-24 right-12 h-px bg-neutral-950/25" />
    </div>
  );
}

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

  const copy = handlingCopy(document);

  return (
    <main className="min-h-screen bg-[#080706] px-8 py-10 text-neutral-100">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/archive"
          className="inline-flex items-center gap-3 border border-amber-100/15 bg-black/25 px-4 py-3 text-xs uppercase tracking-[0.3em] text-neutral-400 transition hover:bg-black/45 hover:text-neutral-200"
        >
          ← set object down
        </Link>

        <section
          className={[
            "mt-14 grid gap-10 border p-8 shadow-[0_30px_90px_rgba(0,0,0,0.75)] md:grid-cols-[360px_1fr]",
            shellClass(copy.tone),
          ].join(" ")}
        >
          <div>{artifactMockup(copy.tone)}</div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-100/45">
              {copy.eyebrow}
            </p>

            <h1 className="mt-5 font-serif text-5xl italic">
              {document.title}
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-relaxed text-neutral-300">
              {copy.title}
            </p>

            <p className="mt-5 max-w-2xl leading-relaxed text-neutral-400">
              {copy.body}
            </p>

            <div className="mt-8 grid gap-3 text-sm text-neutral-400">
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
                status: <span className="text-neutral-200">{copy.status}</span>
              </p>
            </div>

            {document.ethicalPressure && (
              <p className="mt-8 border-l border-red-100/15 pl-5 italic leading-relaxed text-red-100/55">
                {document.ethicalPressure}
              </p>
            )}

  
          {document.accessClass === "private" && (
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
                Preservation does not always imply permission. Some materials
                need to remain present before they become readable.
              </p>
            </div>
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

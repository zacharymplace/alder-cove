import Link from "next/link";

import { archiveDocuments } from "@/data/archive/archiveDocuments";

function dotClass(accessClass: string) {
  switch (accessClass) {
    case "shared":
      return "bg-amber-200";
    case "semi-private":
      return "bg-blue-300";
    case "private":
      return "bg-red-700";
    case "illicitly-acquired":
      return "bg-violet-400";
    default:
      return "bg-neutral-400";
  }
}

function artifactVisual(type: string, title: string) {
  if (type === "shared-notebook") {
    return (
      <div className="relative h-[350px] rounded-lg border border-neutral-900/30 bg-[#b99f69] shadow-[0_35px_90px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-y-0 left-0 w-10 rounded-l-lg bg-neutral-950/55" />
        <div className="absolute inset-y-0 left-12 w-2 bg-neutral-900/35" />
        <div className="absolute inset-y-0 left-[70px] flex flex-col justify-around py-6">
          {Array.from({ length: 13 }).map((_, index) => (
            <span
              key={index}
              className="h-5 w-5 rounded-full border border-neutral-950/60 bg-black/45"
            />
          ))}
        </div>

        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_65%_80%,rgba(80,40,10,0.22),transparent_35%)]" />

        <div className="absolute left-32 top-24 rotate-[-1deg] font-serif text-4xl italic leading-tight text-neutral-950">
          Notebook
          <br />
          One
        </div>

        <p className="absolute left-32 top-44 rotate-[-1deg] text-sm italic text-neutral-800">
          Shared Group Notebook
        </p>

        <div className="absolute bottom-16 left-32 right-14 h-px bg-neutral-900/20" />

        <div className="absolute bottom-24 left-36 rotate-[-2deg] rounded bg-[#d8c7a2]/80 px-6 py-2 text-sm italic text-neutral-900 shadow">
          shared copy
        </div>
      </div>
    );
  }

  if (type === "private-journal") {
    return (
      <div className="relative h-[350px] rounded-lg border border-neutral-800/70 bg-[#171412] shadow-[0_35px_90px_rgba(0,0,0,0.75)]">
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_70%_85%,rgba(0,0,0,0.45),transparent_38%)]" />
        <div className="absolute inset-x-10 top-1/2 h-2 rounded-full bg-black/65" />
        <div className="absolute inset-y-10 left-1/2 w-2 rounded-full bg-black/60" />

        <div className="absolute left-16 right-16 top-24 rotate-[-4deg] bg-[#c9b995] px-5 py-5 text-center font-serif text-2xl italic leading-tight text-neutral-950 shadow-lg">
          Mara
          <br />
          private
          <br />
          fragment
        </div>

        <div className="absolute right-8 top-8 h-5 w-5 rounded-full bg-red-800 shadow" />
        <div className="absolute bottom-10 left-10 right-10 border-t border-dashed border-red-200/10" />
      </div>
    );
  }

  return (
    <div className="relative h-[350px] rotate-[0.5deg] rounded-lg border border-neutral-900/30 bg-[#927f58] shadow-[0_35px_90px_rgba(0,0,0,0.65)]">
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_45%_25%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(55,28,10,0.28),transparent_35%)]" />
      <div className="absolute left-5 top-4 h-10 w-3 rotate-[-8deg] rounded-sm border border-neutral-900/30 bg-neutral-300/35 shadow" />


      <p className="absolute left-12 top-24 rotate-[-2deg] max-w-[220px] font-serif text-3xl italic leading-tight text-neutral-950">
        {title.replace(" — ", "\n")}
      </p>

      <div className="absolute bottom-20 left-12 right-12 h-px bg-neutral-950/25" />
    </div>
  );
}

export default function ArchiveIndexPage() {
  const displayArtifacts = [

    archiveDocuments.find(
      (document) => document.id === "mara-private-journal-fragment"
    )!,
    ...archiveDocuments.filter((d) => d.id !== "mara-private-journal-fragment"),
    {
      id: "east-shore-shelter-map",
      title: "East Shore — Shelter Map Draft",
      type: "copied-fragment",
      accessClass: "semi-private",
      acquisitionMethod: "copied-with-permission",
      emotionalRisk: "low",
      pageIds: ["opening-left"],
      description:
        "A copied map draft with shoreline marks and higher-ground notes.",
      ethicalPressure: undefined,
    },
    {
      id: "council-meeting-fragments",
      title: "Council Meeting Fragments",
      type: "interview-note",
      accessClass: "semi-private",
      acquisitionMethod: "copied-with-permission",
      emotionalRisk: "medium",
      pageIds: ["recovered-left", "recovered-right"],
      description:
        "Loose notes from a meeting that later copies reference indirectly.",
      ethicalPressure: undefined,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-neutral-100">
      <div className="relative min-h-screen px-8 py-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_20%,rgba(255,205,120,0.12),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(80,45,20,0.28),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative mx-auto grid max-w-[1500px] grid-cols-[310px_1fr] gap-10">
          <aside className="pt-3">
            <p className="text-xs uppercase tracking-[0.45em] text-amber-100/55">
              Alder Cove Archive
            </p>

            <h1 className="mt-20 font-serif text-6xl leading-[0.95] text-neutral-100">
              Preserved
              <br />
              Materials
            </h1>

            <p className="mt-8 max-w-[250px] text-base leading-relaxed text-neutral-300/80">
              Not every document entered the archive the same way. Some were
              shared. Some were copied later. Some may not have been meant to
              survive.
            </p>

            <div className="mt-14 h-px w-60 bg-neutral-700/40" />

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Filter by access
              </p>

              <div className="mt-5 space-y-4 text-sm text-neutral-300/80">
                {["shared", "semi-private", "private", "illicitly-acquired"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${dotClass(item)}`} />
                      <span>{item.replaceAll("-", " ")}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-20 rotate-[-2deg] border border-amber-100/15 bg-[#ad9666] p-6 text-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
              <p className="font-serif text-2xl italic">Archivist Note</p>
              <p className="mt-5 font-serif text-lg italic leading-relaxed">
                Some items remain unprocessed. Not all should be read.
              </p>
            </div>
          </aside>

          <section className="relative rounded-[2rem] border border-amber-950/45 bg-[#20140d]/80 p-9 shadow-[0_45px_140px_rgba(0,0,0,0.85)]">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_45%_25%,rgba(255,218,150,0.09),transparent_30%)]" />

            <div className="relative grid gap-x-10 gap-y-12 xl:grid-cols-3">
              {displayArtifacts.filter(Boolean).map((document) => (
                <article
                  key={document.id}
                  className={[
                    "group relative",
                    document.type === "private-journal"
                      ? "mt-10"
                      : document.type === "interview-note"
                      ? "mt-4"
                      : "",
                  ].join(" ")}
                >
                  <div className="absolute right-6 top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-950/40 bg-black/25 shadow">
                    <span
                      className={`h-4 w-4 rounded-full ${dotClass(
                        document.accessClass
                      )}`}
                    />
                  </div>

                  <div className="transition duration-300 group-hover:translate-y-[-5px]">
                    {artifactVisual(document.type, document.title)}
                  </div>

                  <div className="relative z-10 mx-7 mt-[-18px] min-h-[160px] rotate-[-0.4deg] border border-neutral-900/20 bg-[#d4c4a4] p-5 font-mono text-xs text-neutral-950 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">

                    <div className="absolute right-4 top-3 h-4 w-14 rotate-[4deg] rounded-sm bg-white/10" />

                    <h2 className="font-sans text-base font-semibold leading-snug">
                      {document.title}
                    </h2>

                    <p className="mt-3 text-[11px] leading-relaxed text-neutral-700">
                      <span className="text-amber-900">
                        {document.accessClass.replaceAll("-", " ")}
                      </span>{" "}
                      · {document.acquisitionMethod.replaceAll("-", " ")} · risk:{" "}
                      {document.emotionalRisk}
                    </p>

                    <div className="my-4 h-px bg-neutral-900/20" />

                    <p className="text-[11px] text-neutral-700">
                      {document.pageIds.length} pages indexed
                    </p>

                    {document.id === "notebook-one-shared" ? (
                      <Link
                        href="/notebook"
                        className="mt-5 inline-block uppercase tracking-[0.28em] text-neutral-900 underline-offset-4 hover:underline"
                      >
                        pick up
                      </Link>
                    ) : (
                      <p className="mt-5 uppercase tracking-[0.28em] text-red-900/70">
                        not yet handled
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-[360px] rotate-[-2deg] border border-amber-100/15 bg-[#7c6b4f]/80 px-8 py-4 font-serif text-2xl italic text-neutral-950 shadow-2xl">
          Handle with care.
          <br />
          Memory breaks easily.
        </div>

        <div className="absolute bottom-8 right-10 flex gap-7 text-xs text-neutral-400/70">
          <span>select</span>
          <span>archivist notes</span>
          <span>filter</span>
          <span>back</span>
        </div>
      </div>
    </main>
  );
}

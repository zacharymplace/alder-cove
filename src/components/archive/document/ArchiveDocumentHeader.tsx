import type { ArchiveDocument } from "@/data/archive/archiveDocuments";

type ArchiveDocumentHeaderProps = {
  document: ArchiveDocument;
  copy: {
    eyebrow: string;
    title: string;
    body: string;
    status: string;
  };
};

export function ArchiveDocumentHeader({
  document,
  copy,
}: ArchiveDocumentHeaderProps) {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.35em] text-amber-100/45">
        {copy.eyebrow}
      </p>

      <h1 className="mt-5 font-serif text-5xl italic">{document.title}</h1>

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
            {(document.handlingState ?? "awaiting-review").replaceAll("-", " ")}
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
    </>
  );
}

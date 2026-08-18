import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getArchiveDocument } from "@/data/archive/archiveDocuments";
import { isWithdrawnDocument } from "@/data/archive/withdrawnDocuments";
import { getLinksForDocument } from "@/systems/archive/crossArtifactLinks";
import { getArchivistFingerprintsForDocument } from "@/data/archivist/fingerprints";
import { ArchivistFingerprintReview } from "@/components/archive/document/ArchivistFingerprintReview";
import { CrossArtifactRelationshipReview } from "@/components/archive/document/CrossArtifactRelationshipReview";
import { RecoveryContaminationReview } from "@/components/archive/document/RecoveryContaminationReview";
import { ArchiveDocumentDecisionPanel } from "@/components/archive/document/ArchiveDocumentDecisionPanel";
import { ArchiveDocumentHeader } from "@/components/archive/document/ArchiveDocumentHeader";
import { ArchiveDocumentMockup } from "@/components/archive/document/ArchiveDocumentMockup";
import { WithdrawnNotice } from "@/components/archive/document/WithdrawnNotice";
import {
  archiveDocumentShellClass,
  getArchiveDocumentPresentation,
} from "@/components/archive/document/archiveDocumentPresentation";
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
    if (isWithdrawnDocument(documentId)) {
      return <WithdrawnNotice />;
    }

    notFound();
  }

  if (document.id === "notebook-one-shared") {
    redirect("/notebook");
  }

  const copy = getArchiveDocumentPresentation(document);
  const crossLinks = getLinksForDocument(document.id);
  const fingerprints = getArchivistFingerprintsForDocument(document.id);

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
            archiveDocumentShellClass(copy.tone),
          ].join(" ")}
        >
          <ArchiveDocumentMockup tone={copy.tone} />

          <div>
            <ArchiveDocumentHeader document={document} copy={copy} />

          <RecoveryContaminationReview documentId={document.id} />
          <ArchivistFingerprintReview fingerprints={fingerprints} />
          <CrossArtifactRelationshipReview links={crossLinks} />

          <ArchiveDocumentDecisionPanel
            isPrivate={document.accessClass === "private"}
          />
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

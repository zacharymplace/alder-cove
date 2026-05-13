import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getArchiveDocument } from "@/data/archive/archiveDocuments";
import { getLinksForDocument } from "@/systems/archive/crossArtifactLinks";
import { getArchivistFingerprintsForDocument } from "@/data/archivist/fingerprints";
import { ArchivistFingerprintReview } from "@/components/archive/document/ArchivistFingerprintReview";
import { CrossArtifactRelationshipReview } from "@/components/archive/document/CrossArtifactRelationshipReview";
import { RecoveryContaminationReview } from "@/components/archive/document/RecoveryContaminationReview";
import { ArchiveDocumentDecisionPanel } from "@/components/archive/document/ArchiveDocumentDecisionPanel";
import { ArchiveDocumentHeader } from "@/components/archive/document/ArchiveDocumentHeader";
import { ArchiveDocumentMockup } from "@/components/archive/document/ArchiveDocumentMockup";

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
            shellClass(copy.tone),
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

import { floodRecoveryPacket001 } from "@/data/recovery/floodRecoveryPacket001";
import { floodRecoveryClusterPhase1 } from "@/data/recovery/floodRecoveryClusterPhase1";

type RecoveryContaminationReviewProps = {
  documentId: string;
};

export function RecoveryContaminationReview({
  documentId,
}: RecoveryContaminationReviewProps) {
  if (documentId !== "flood-recovery-packet-001") {
    return null;
  }

  return (
    <>
      <div className="mt-10 border border-blue-100/10 bg-black/20 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-100/35">
          flood recovery cluster · phase 1
        </p>

        <div className="mt-6 grid gap-5">
          {floodRecoveryClusterPhase1.map((entry) => (
            <div
              key={entry.id}
              className="rotate-[-1deg] border border-neutral-800 bg-[#cdbb95]/10 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {entry.type.replaceAll("-", " ")}
                </p>

                <p className="text-[10px] uppercase tracking-[0.22em] text-blue-100/35">
                  {entry.condition.replaceAll("-", " ")}
                </p>
              </div>

              <h3 className="mt-4 font-serif text-2xl italic text-neutral-200">
                {entry.title}
              </h3>

              <p className="mt-4 leading-relaxed text-neutral-300">
                {entry.text}
              </p>

              {entry.emotionalPressure && (
                <p className="mt-4 border-l border-red-100/10 pl-4 italic leading-relaxed text-red-100/45">
                  {entry.emotionalPressure}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border border-blue-100/10 bg-black/20 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-100/35">
          recovery contamination review
        </p>

        <div className="mt-6 space-y-5">
          {floodRecoveryPacket001.map((fragment) => (
            <div
              key={fragment.id}
              className="rotate-[-1deg] border border-neutral-800 bg-[#cdbb95]/10 p-5"
            >
              <div className="flex items-center justify-between gap-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                  {fragment.sourceType.replaceAll("-", " ")}
                </p>

                <p className="text-[10px] uppercase tracking-[0.24em] text-blue-100/35">
                  {fragment.condition.replaceAll("-", " ")}
                </p>
              </div>

              <p className="mt-4 leading-relaxed text-neutral-300">
                {fragment.summary}
              </p>

              {fragment.archivistConcern && (
                <p className="mt-4 border-l border-red-100/10 pl-4 italic leading-relaxed text-red-100/45">
                  {fragment.archivistConcern}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

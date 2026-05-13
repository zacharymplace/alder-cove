import { floodRecoveryPacket001 } from "@/data/recovery/floodRecoveryPacket001";
import { FloodRecoveryPacketContents } from "./FloodRecoveryPacketContents";

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
      <FloodRecoveryPacketContents />
      <div className="mt-10 border border-blue-100/10 bg-black/20 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-blue-100/35">
          recovery contamination review
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {floodRecoveryPacket001.map((fragment) => (
            <div
              key={fragment.id}
              className="border border-neutral-800 bg-black/20 p-4"
            >
              <p className="text-[9px] uppercase tracking-[0.22em] text-neutral-500">
                {fragment.sourceType.replaceAll("-", " ")}
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-blue-100/35">
                {fragment.condition.replaceAll("-", " ")}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {fragment.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import type { ArchivistFingerprint } from "@/data/archivist/fingerprints";

type ArchivistFingerprintReviewProps = {
  fingerprints: ArchivistFingerprint[];
};

export function ArchivistFingerprintReview({
  fingerprints,
}: ArchivistFingerprintReviewProps) {
  if (fingerprints.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 border border-red-100/10 bg-black/20 p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-red-100/35">
        archivist fingerprints
      </p>

      <div className="mt-6 space-y-5">
        {fingerprints.map((fingerprint) => (
          <div
            key={fingerprint.id}
            className="rotate-[-1deg] border border-neutral-800 bg-[#2a211a]/70 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                {fingerprint.markType.replaceAll("-", " ")}
              </p>

              <p className="text-[10px] uppercase tracking-[0.22em] text-red-100/30">
                {fingerprint.label}
              </p>
            </div>

            <p className="mt-4 leading-relaxed text-neutral-300">
              {fingerprint.text}
            </p>

            {fingerprint.emotionalLeak && (
              <p className="mt-4 border-l border-red-100/15 pl-4 font-serif text-lg italic leading-relaxed text-red-100/45">
                {fingerprint.emotionalLeak}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

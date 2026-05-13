import type { CrossArtifactLink } from "@/systems/archive/crossArtifactLinks";

type CrossArtifactRelationshipReviewProps = {
  links: CrossArtifactLink[];
};

export function CrossArtifactRelationshipReview({
  links,
}: CrossArtifactRelationshipReviewProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 border border-amber-100/10 bg-black/20 p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/35">
        cross-artifact relationship review
      </p>

      <div className="mt-6 space-y-4">
        {links.map((link) => (
          <div key={link.id} className="border-l border-neutral-700/60 pl-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                {link.relationship.replaceAll("-", " ")}
              </p>

              <p className="text-[10px] uppercase tracking-[0.22em] text-red-100/35">
                confidence · {link.confidence}
              </p>
            </div>

            <p className="mt-3 leading-relaxed text-neutral-400">{link.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

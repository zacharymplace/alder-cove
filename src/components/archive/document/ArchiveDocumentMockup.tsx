type ArchiveDocumentMockupProps = {
  tone: string;
};

export function ArchiveDocumentMockup({ tone }: ArchiveDocumentMockupProps) {
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

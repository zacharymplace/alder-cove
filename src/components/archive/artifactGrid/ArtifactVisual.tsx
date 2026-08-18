/**
 * The decorative "physical object" mockup shown at the top of an artifact
 * card, varied by document type. Purely presentational — no state, no
 * document-specific behavior beyond picking which mockup to render.
 */
export function ArtifactVisual({ type, title }: { type: string; title: string }) {
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
        <div className="absolute right-0 top-16 h-28 w-3 rounded-l-full bg-neutral-950/10" />
        <div className="absolute bottom-0 left-24 h-3 w-40 rounded-t-full bg-neutral-950/8" />

        <div className="absolute left-[88px] top-[120px] h-[180px] w-[2px] bg-black/12 blur-[1px]" />

        <div className="absolute left-[145px] bottom-[55px] h-10 w-28 rounded-full bg-black/8 blur-xl" />

        <div className="absolute right-[24px] top-[110px] h-20 w-3 rounded-l-full bg-white/6" />

        <div className="absolute left-[88px] top-[120px] h-[180px] w-[2px] bg-black/12 blur-[1px]" />

        <div className="absolute left-[145px] bottom-[55px] h-10 w-28 rounded-full bg-black/8 blur-xl" />

        <div className="absolute right-[24px] top-[110px] h-20 w-3 rounded-l-full bg-white/6" />

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

        <div className="absolute right-8 bottom-9 h-12 w-20 rotate-[8deg] bg-[#e2d1aa]/45 shadow-md" />

        <div className="absolute right-8 bottom-9 h-12 w-20 rotate-[8deg] bg-[#e2d1aa]/45 shadow-md" />

        <div className="absolute right-10 top-20 rotate-[6deg] text-[10px] uppercase tracking-[0.25em] text-red-950/40">
          repeatedly handled
        </div>

        <div className="absolute right-8 top-28 rotate-[6deg] text-[9px] uppercase tracking-[0.22em] text-red-950/22">
          handled again
        </div>

        <div className="absolute right-7 top-34 rotate-[6deg] text-[8px] uppercase tracking-[0.2em] text-red-950/14">
          again
        </div>
      </div>
    );
  }

  if (type === "private-journal") {
    return (
      <div className="relative h-[350px] rounded-lg border border-neutral-800/70 bg-[#171412] shadow-[0_35px_90px_rgba(0,0,0,0.75)]">
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_70%_85%,rgba(0,0,0,0.45),transparent_38%)]" />
        <div className="absolute left-0 top-20 h-32 w-2 rounded-r-full bg-white/5" />
        <div className="absolute right-0 bottom-16 h-28 w-2 rounded-l-full bg-black/30" />

        <div className="absolute inset-6 rounded border border-red-900/10" />

        <div className="absolute bottom-12 left-1/2 h-px w-28 -translate-x-1/2 bg-red-100/10" />

        <div className="absolute top-14 left-14 right-14 h-px bg-white/6" />

        <div className="absolute inset-6 rounded border border-red-900/10" />

        <div className="absolute bottom-12 left-1/2 h-px w-28 -translate-x-1/2 bg-red-100/10" />

        <div className="absolute top-14 left-14 right-14 h-px bg-white/6" />
        <div className="absolute inset-x-10 top-1/2 h-2 rounded-full bg-black/65" />
        <div className="absolute inset-y-10 left-1/2 w-2 rounded-full bg-black/60" />

        <div className="absolute left-12 top-20 h-16 w-28 rotate-[8deg] bg-[#d8c7a2]/20 shadow" />

        <div className="absolute left-12 top-20 h-16 w-28 rotate-[8deg] bg-[#d8c7a2]/20 shadow" />

        <div className="absolute left-16 right-16 top-24 rotate-[-4deg] bg-[#c9b995] px-5 py-5 text-center font-serif text-2xl italic leading-tight text-neutral-950 shadow-lg">
          Mara
          <br />
          private
          <br />
          fragment
        </div>

        <div className="absolute right-8 top-8 h-5 w-5 rounded-full bg-red-800 shadow" />
        <div className="absolute bottom-10 left-10 right-10 border-t border-dashed border-red-200/10" />

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 rotate-[2deg] rounded bg-red-950/55 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-red-100/70">
          sealed pending review
        </div>

        <div className="absolute bottom-7 right-8 rotate-[-4deg] text-[10px] uppercase tracking-[0.24em] text-red-100/25">
          not copied into index
        </div>

        <div className="absolute bottom-7 right-8 rotate-[-4deg] text-[10px] uppercase tracking-[0.24em] text-red-100/25">
          not copied into index
        </div>
      </div>
    );
  }

  if (type === "recovery-packet") {
    return (
      <div className="relative h-[350px] rotate-[-1deg] rounded-lg border border-neutral-900/30 bg-[#7f7258] shadow-[0_35px_90px_rgba(0,0,0,0.7)]">
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(20,20,20,0.32),transparent_38%)]" />
        <div className="absolute left-10 right-10 top-16 h-24 rotate-[1deg] border border-neutral-900/15 bg-[#c8b88f]/45 shadow" />
        <div className="absolute left-14 right-16 top-28 h-24 rotate-[-2deg] border border-neutral-900/15 bg-[#b9a77e]/55 shadow" />
        <div className="absolute left-20 top-24 rotate-[-4deg] font-serif text-3xl italic leading-tight text-neutral-950/75">
          Flood
          <br />
          Recovery
          <br />
          Packet
        </div>
        <div className="absolute bottom-12 left-14 rotate-[2deg] rounded bg-blue-950/30 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-100/60">
          drying
        </div>
        <div className="absolute right-10 bottom-16 h-16 w-28 rotate-[8deg] bg-[#e2d1aa]/18 shadow" />
      </div>
    );
  }

  return (
    <div className="relative h-[350px] rotate-[0.5deg] rounded-lg border border-neutral-900/30 bg-[#927f58] shadow-[0_35px_90px_rgba(0,0,0,0.65)]">
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_45%_25%,rgba(255,255,255,0.14),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(55,28,10,0.28),transparent_35%)]" />
      <div className="absolute right-0 top-14 h-24 w-2 rounded-l-full bg-neutral-950/10" />
      <div className="absolute bottom-0 left-12 h-2 w-32 rounded-t-full bg-neutral-950/8" />

      <div className="absolute left-[40px] bottom-[30px] h-12 w-44 rotate-[1deg] rounded-full bg-black/6 blur-xl" />

      <div className="absolute right-[18px] bottom-[22px] h-16 w-3 rounded-l-full bg-black/8" />

      <div className="absolute inset-x-[32px] top-[180px] h-px bg-neutral-950/10" />

      <div className="absolute left-[40px] bottom-[30px] h-12 w-44 rotate-[1deg] rounded-full bg-black/6 blur-xl" />

      <div className="absolute right-[18px] bottom-[22px] h-16 w-3 rounded-l-full bg-black/8" />

      <div className="absolute inset-x-[32px] top-[180px] h-px bg-neutral-950/10" />
      <div className="absolute left-5 top-4 h-10 w-3 rotate-[-8deg] rounded-sm border border-neutral-900/30 bg-neutral-300/35 shadow" />
      <div className="absolute right-10 bottom-14 h-10 w-24 rotate-[5deg] bg-[#d8c7a2]/24 shadow" />
      <div className="absolute right-10 bottom-14 h-10 w-24 rotate-[5deg] bg-[#d8c7a2]/24 shadow" />

      <p className="absolute left-12 top-24 rotate-[-2deg] max-w-[220px] font-serif text-3xl italic leading-tight text-neutral-950">
        {title.replace(" — ", "\n")}
      </p>

      <div className="absolute bottom-20 left-12 right-12 h-px bg-neutral-950/25" />

      <div className="absolute bottom-10 left-12 rotate-[-2deg] text-[10px] uppercase tracking-[0.24em] text-neutral-950/40">
        flattening after water exposure
      </div>
    </div>
  );
}

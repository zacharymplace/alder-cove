/**
 * Purely decorative, non-interactive scatter of "loose desk clutter"
 * notes and marks layered behind the archive index UI. Entirely static
 * (no props, no state) — extracted verbatim so archive/page.tsx isn't
 * dominated by ~250 lines of unchanging atmosphere markup.
 */
export function ArchiveAtmosphereClutter() {
  return (
    <>
        <div className="pointer-events-none absolute bottom-2 left-[300px] rotate-[-2deg] border border-amber-100/10 bg-[#7c6b4f]/65 px-6 py-3 font-serif text-xl italic text-neutral-950/90 shadow-2xl">
          Handle with care.
          <br />
          Memory breaks easily.
        </div>

        <div className="pointer-events-none absolute bottom-[75px] right-[90px] h-28 w-56 rotate-[8deg] border border-neutral-900/20 bg-[#8e7a55]/30 shadow-2xl opacity-55">
          <div className="absolute left-6 top-6 h-px w-36 bg-neutral-950/20" />
          <p className="absolute left-6 top-10 rotate-[-2deg] font-serif text-xl italic text-neutral-950/55">
            unprocessed
            <br />
            loose copies
          </p>
          <div className="absolute right-8 top-5 h-8 w-3 rotate-[12deg] bg-neutral-200/25" />
        </div>

        <div className="pointer-events-none absolute right-[340px] top-[120px] rotate-[5deg] border border-neutral-900/20 bg-[#8f7b58]/55 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-950/60">
            revisit after drying
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-[260px] right-[110px] rotate-[-6deg] border border-neutral-900/15 bg-[#6e6047]/55 px-5 py-3 shadow-xl">
          <p className="font-serif text-lg italic text-neutral-950/55">
            copied pages
            <br />
            still separating
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-[180px] left-[420px] h-20 w-32 rotate-[8deg] border border-neutral-900/15 bg-[#988568]/35 shadow-2xl">
          <div className="absolute inset-x-5 top-5 h-px bg-neutral-950/20" />
          <div className="absolute inset-x-5 top-9 h-px bg-neutral-950/15" />
          <div className="absolute inset-x-5 top-13 h-px bg-neutral-950/12" />
          <p className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.2em] text-neutral-950/35">
            unsorted
          </p>
        </div>

        <div className="pointer-events-none absolute left-[530px] top-[470px] rotate-[-3deg] bg-[#e2d1aa]/25 px-5 py-2 shadow">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-950/45">
            compare wording later
          </p>
        </div>

        <div className="pointer-events-none absolute left-[760px] top-[210px] h-10 w-40 rotate-[2deg] border border-dashed border-red-200/10 bg-red-950/5" />

        <div className="pointer-events-none absolute bottom-[80px] right-[260px] rotate-[6deg] border border-neutral-900/15 bg-[#9b8866]/30 px-6 py-4 shadow-xl opacity-55">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/50">
            some copies become
            <br />
            gentler over time
          </p>
        </div>

        <div className="pointer-events-none absolute right-[510px] bottom-[145px] rotate-[-4deg] border border-neutral-900/20 bg-[#d5c4a0]/70 px-6 py-4 shadow-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-950/45">
            active comparison
          </p>
          <p className="mt-3 font-serif text-lg italic leading-relaxed text-neutral-950/65">
            he was scared
          </p>
          <div className="mt-1 h-px w-28 bg-red-900/35" />
          <p className="mt-2 font-serif text-lg italic leading-relaxed text-neutral-950/50">
            he sounded scared
          </p>
        </div>

        <div className="pointer-events-none absolute right-[390px] bottom-[245px] rotate-[3deg] border border-neutral-900/20 bg-[#cab891]/65 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-950/50">
            copy feels wrong
          </p>
        </div>

        <div className="pointer-events-none absolute right-[145px] top-[520px] rotate-[6deg] border border-red-900/15 bg-red-950/10 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-100/45">
            do not file yet
          </p>
        </div>

        <div className="pointer-events-none absolute left-[640px] bottom-[75px] rotate-[-1deg] border border-neutral-900/20 bg-[#b9a27a]/55 px-6 py-4 shadow-2xl">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/55">
            ask again before
            <br />
            copying this version
          </p>
        </div>

        <div className="pointer-events-none absolute left-[720px] top-[640px] h-24 w-24 rounded-full border border-neutral-900/10 opacity-20" />

        <div className="pointer-events-none absolute left-[1110px] top-[410px] h-10 w-10 rounded-full border border-neutral-900/10 opacity-10" />

        <div className="pointer-events-none absolute left-[980px] top-[700px] rotate-[5deg] text-[10px] uppercase tracking-[0.2em] text-neutral-950/10">
          graphite transfer
        </div>

        <div className="pointer-events-none absolute right-[520px] top-[540px] h-20 w-20 rounded-full bg-black/10 blur-xl" />

        <div className="pointer-events-none absolute left-[470px] bottom-[260px] h-3 w-16 rotate-[12deg] bg-[#f3e2bb]/20 shadow-sm" />

        <div className="pointer-events-none absolute left-[1080px] bottom-[210px] h-12 w-12 rounded-full border border-amber-100/10 opacity-10" />

        <div className="pointer-events-none absolute left-[615px] top-[345px] rotate-[-4deg] text-[9px] uppercase tracking-[0.2em] text-red-100/10">
          compare against dry-box copy
        </div>

        <div className="pointer-events-none absolute left-[865px] top-[305px] h-4 w-20 rotate-[7deg] bg-[#efe1bb]/12" />

        <div className="pointer-events-none absolute right-[210px] bottom-[145px] rotate-[9deg] text-[9px] uppercase tracking-[0.2em] text-neutral-950/10">
          clipped here before
        </div>

        <div className="pointer-events-none absolute left-[650px] top-[720px] rotate-[2deg] border border-neutral-900/15 bg-[#cab892]/35 px-5 py-3 shadow-xl opacity-55">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-950/45">
            reviewed again after interview
          </p>
        </div>

        <div className="pointer-events-none absolute left-[765px] top-[760px] rotate-[-5deg] border border-neutral-900/20 bg-[#d8c7a2]/35 px-5 py-4 shadow-2xl opacity-50">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/60">
            wording keeps softening
          </p>
        </div>

        <div className="pointer-events-none absolute left-[880px] top-[800px] rotate-[4deg] border border-dashed border-red-900/10 bg-red-950/5 px-5 py-4 shadow-xl opacity-45">
          <p className="font-serif text-lg italic leading-relaxed text-red-100/40">
            maybe nobody remembers
            <br />
            the original wording now
          </p>
        </div>

        <div className="pointer-events-none absolute right-[330px] top-[170px] rotate-[-3deg] border border-neutral-900/20 bg-[#9e8b69]/55 px-5 py-3 shadow-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-950/45">
            compare with earlier graphite copy
          </p>
        </div>

        <div className="pointer-events-none absolute right-[465px] top-[355px] h-12 w-28 rotate-[7deg] bg-[#efe1bb]/12 shadow-md" />

        <div className="pointer-events-none absolute left-[535px] top-[270px] rotate-[9deg] text-[9px] uppercase tracking-[0.2em] text-neutral-950/15">
          copied again later
        </div>

        <div className="pointer-events-none absolute left-[1080px] top-[700px] rotate-[-6deg] border border-neutral-900/15 bg-[#897659]/30 px-5 py-3 shadow-xl opacity-55">
          <p className="font-serif text-lg italic leading-relaxed text-neutral-950/50">
            still avoiding
            <br />
            direct wording
          </p>
        </div>

        <div className="pointer-events-none absolute left-[860px] top-[455px] h-3 w-20 rotate-[-8deg] bg-[#f1e2bb]/10 shadow-sm" />

        <div className="pointer-events-none absolute left-[980px] top-[720px] h-3 w-24 rotate-[5deg] bg-[#f1e2bb]/10 shadow-sm" />

        <div className="pointer-events-none absolute left-[945px] top-[250px] rotate-[2deg] border border-neutral-900/15 bg-[#8e7a58]/35 px-5 py-3 shadow-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-950/28">
            review again
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-950/20">
            review again
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-950/9">
            review again
          </p>
        </div>

        <div className="pointer-events-none absolute left-[525px] top-[430px] rotate-[-7deg] border border-neutral-900/20 bg-[#d0bf98]/45 px-5 py-4 shadow-2xl">
          <p className="font-serif text-base italic leading-relaxed text-neutral-950/45">
            copied from a copy
            <br />
            after already copying
          </p>
        </div>

        <div className="pointer-events-none absolute left-[845px] top-[455px] rotate-[4deg] border border-red-900/10 bg-red-950/5 px-5 py-3 shadow-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-100/30">
            unable to finalize wording
          </p>
        </div>

        <div className="pointer-events-none absolute right-[210px] top-[310px] h-10 w-40 rotate-[3deg] rounded-full bg-black/6 blur-2xl" />

        <div className="pointer-events-none absolute right-[245px] top-[360px] rotate-[-4deg] border border-neutral-900/15 bg-[#a89266]/35 px-5 py-3 shadow-xl">
          <p className="font-serif text-base italic leading-relaxed text-neutral-950/42">
            this was supposed
            <br />
            to be the last pass
          </p>
        </div>

        <div className="pointer-events-none absolute left-[690px] bottom-[310px] rotate-[8deg] text-[9px] uppercase tracking-[0.22em] text-neutral-950/10">
          copied after midnight
        </div>

        <div className="pointer-events-none absolute right-[430px] bottom-[260px] rotate-[-2deg] border border-neutral-900/15 bg-[#c7b58e]/40 px-5 py-3 shadow-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-950/32">
            no final version located
          </p>
        </div>

        <div className="pointer-events-none absolute left-[430px] bottom-[470px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-neutral-950/14">
          recopied twice
        </div>

        <div className="pointer-events-none absolute left-[452px] bottom-[458px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-neutral-950/10">
          amended later
        </div>

        <div className="pointer-events-none absolute left-[470px] bottom-[446px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-red-100/10">
          compare testimony version
        </div>

        <div className="pointer-events-none absolute left-[590px] bottom-[145px] rotate-[-5deg] border border-neutral-900/20 bg-[#6f5f46]/35 px-5 py-3 shadow-xl">
          <p className="font-serif text-base italic leading-relaxed text-neutral-950/42">
            keep the softer one
            <br />
            until someone asks
          </p>
        </div>

        <div className="pointer-events-none absolute left-[390px] top-[118px] h-2 w-2 rounded-full bg-black/20 shadow-sm" />
        <div className="pointer-events-none absolute left-[392px] top-[124px] h-1.5 w-1.5 rounded-full bg-black/10" />
        <div className="pointer-events-none absolute left-[395px] top-[132px] h-1 w-1 rounded-full bg-black/10" />

        <div className="pointer-events-none absolute left-[755px] top-[138px] h-2 w-2 rounded-full bg-red-950/25" />
        <div className="pointer-events-none absolute left-[762px] top-[145px] h-1.5 w-1.5 rounded-full bg-red-950/18" />

        <div className="pointer-events-none absolute right-[235px] top-[90px] h-20 w-3 rotate-[-8deg] rounded-sm bg-[#e9ddc4]/18 shadow" />
        <div className="pointer-events-none absolute right-[228px] top-[92px] h-20 w-px rotate-[-8deg] bg-neutral-950/12" />

        <div className="pointer-events-none absolute left-[1030px] top-[545px] h-1 w-28 rotate-[3deg] bg-black/10 blur-sm" />
        <div className="pointer-events-none absolute left-[1015px] top-[550px] h-1 w-32 rotate-[3deg] bg-white/5" />

        <div className="pointer-events-none absolute left-[875px] bottom-[215px] h-2 w-20 rotate-[-4deg] bg-[#e8d4a3]/18" />
        <div className="pointer-events-none absolute left-[880px] bottom-[212px] h-px w-16 rotate-[-4deg] bg-neutral-950/12" />

        <div className="pointer-events-none absolute right-[165px] bottom-[235px] h-14 w-1 rotate-[9deg] rounded-sm bg-[#e6d8bc]/15 shadow" />

        <div className="pointer-events-none absolute left-[580px] top-[515px] h-1 w-24 rotate-[-2deg] bg-neutral-950/10 blur-sm" />

        <div className="pointer-events-none absolute left-[645px] bottom-[465px] rotate-[2deg] text-[8px] uppercase tracking-[0.18em] text-neutral-950/9">
          erased once
        </div>

        <div className="pointer-events-none absolute right-[370px] bottom-[420px] rotate-[-5deg] text-[8px] uppercase tracking-[0.18em] text-red-100/9">
          pressure mark remains
        </div>
    </>
  );
}

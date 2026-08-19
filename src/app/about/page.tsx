"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0a08] text-[#ece4d2]">
      <Link
        href="/"
        className="fixed left-8 top-8 z-50 border border-white/15 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-400 backdrop-blur-sm transition hover:bg-black/50 hover:text-neutral-200"
      >
        ← alder cove
      </Link>

      {/* hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_22%_20%,rgba(255,214,150,0.09),transparent_34%),radial-gradient(circle_at_78%_78%,rgba(120,70,30,0.16),transparent_46%)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto max-w-[760px] px-8">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
            className="block font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75"
          >
            Alder Cove Archive · Preservation Environment Active
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            style={{ textWrap: "balance" }}
            className="mt-7 font-sans text-[42px] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-[56px] lg:text-[74px]"
          >
            Write it down
            <br />
            <span className="font-serif font-normal italic">before you forget.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="mt-8 max-w-[42em] font-serif text-xl italic leading-relaxed text-[#948b78]"
          >
            A narrative artifact prototype about an island, ferry-dependent
            fishing town — and the children who built a notebook, and later
            an archive, to protect each other from forgetting who they were.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
            className="mt-11 flex flex-wrap gap-3.5"
          >
            <span className="border border-white/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#948b78]">
              Notebook One · 8 spreads
            </span>
            <span className="border border-white/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#948b78]">
              Archive · 7 documents
            </span>
            <span className="border border-white/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#948b78]">
              Next.js · React 19
            </span>
          </motion.div>
        </div>
      </section>

      {/* premise */}
      <section className="border-b border-white/10 px-8 py-28 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-[1040px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75">
              The Premise
            </span>

            <h2
              style={{ textWrap: "balance" }}
              className="mt-4 max-w-[20em] font-serif text-[30px] font-normal italic leading-[1.15] sm:text-[42px]"
            >
              People begin Going Salt when nobody reflects them back
              correctly anymore.
            </h2>

            <p className="mt-6 max-w-[46em] text-[17px] leading-[1.75] text-[#948b78]">
              Alder Cove is beautiful, isolated, weather-shaped, and quietly
              corrosive. The cannery gives things back wrong sometimes.
              People who stay below the waterline too long may come back
              changed. The children built systems — check-ins, symbols, a
              shared notebook — to hold onto each other. Then the systems
              started deciding who everyone was.
            </p>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <p className="border-l border-white/20 pl-7 font-serif text-2xl italic leading-[1.62]">
                &ldquo;The children recreate Alder Cove&rsquo;s emotional
                pathology while trying to protect each other from it.&rdquo;
              </p>

              <div className="border border-white/10 bg-[#141009] p-8">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75">
                  Going Salt begins when
                </p>
                <ul className="flex flex-col gap-3.5 text-[15px] leading-[1.6] text-[#948b78]">
                  <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#a8453c]/70">
                    nobody reflects them back correctly anymore
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#a8453c]/70">
                    the town starts deciding who they are for them
                  </li>
                  <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#a8453c]/70">
                    important memories go unwritten long enough to erode
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* two systems */}
      <section className="border-b border-white/10 px-8 py-28 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-[1040px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75">
              Two Systems
            </span>

            <h2
              style={{ textWrap: "balance" }}
              className="mt-4 max-w-[20em] font-serif text-[30px] font-normal italic leading-[1.15] sm:text-[42px]"
            >
              A notebook that was handled too much, and an archive built to
              hold what it couldn&rsquo;t.
            </h2>

            <div className="mt-16 grid gap-14 lg:grid-cols-2">
              <div>
                <div className="relative rotate-[-0.8deg] border border-black/10 bg-[#d8c8a5] p-5 pb-6 font-mono text-xs text-[#211a10] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                  <div className="absolute left-5 top-[-9px] h-4 w-16 rotate-[-3deg] bg-white/25" />
                  <h4 className="font-sans text-base font-bold leading-snug">
                    Notebook One — Shared Group Notebook
                  </h4>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-[#5b4f38]">
                    shared · kept by group · over handled
                  </p>
                  <div className="my-3.5 h-px bg-black/10" />
                  <p className="font-serif text-[15px] italic leading-snug">
                    <span className="text-[#211a10]/50 line-through decoration-[#a8453c]/60">
                      he was scared
                    </span>
                    <br />
                    he sounded scared
                  </p>
                </div>

                <h3 className="mt-6 font-sans text-xl font-semibold">
                  The Notebook
                </h3>
                <p className="mt-3.5 text-[15px] leading-[1.75] text-[#948b78]">
                  Eight authored spreads, read as a physical object — pages
                  don&rsquo;t stretch or auto-fit. Reveals surface through
                  handling: delayed residue, pressure marks, folded corners.
                  The Eli chain is the strongest thread in it: a
                  contradiction the notebook never resolves. Was he
                  changing — or did the group change him by preserving him
                  as already changed?
                </p>
              </div>

              <div>
                <div className="rotate-[-1deg] border border-white/[0.08] bg-[#2a2216] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className="text-[#5e5644]">Uncertainty Grade</span>
                    <span className="text-[#a8453c]/85">
                      Uncertainty Regraded
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">
                    Confidence lowered a second time. First grading assumed
                    good faith. Second grading did not.
                  </p>
                  <p className="mt-3 font-serif text-sm italic leading-relaxed text-[#948b78]">
                    &ldquo;I keep grading my own memory of handling this
                    packet, not just the packet.&rdquo;
                  </p>
                </div>

                <h3 className="mt-6 font-sans text-xl font-semibold">
                  The Archive
                </h3>
                <p className="mt-3.5 text-[15px] leading-[1.75] text-[#948b78]">
                  Documents you approach, pick up, and set down — never a
                  menu. Every artifact carries handling state, provenance,
                  and an archivist&rsquo;s own fingerprints: notes she left
                  behind that increasingly reveal her, not the material.
                  Preservation, the archive insists, does not always imply
                  permission.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* what changed */}
      <section className="border-b border-white/10 px-8 py-28 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-[1040px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75">
              What Changed This Pass
            </span>

            <h2
              style={{ textWrap: "balance" }}
              className="mt-4 max-w-[22em] font-serif text-[30px] font-normal italic leading-[1.15] sm:text-[42px]"
            >
              The archive got a new way to withhold something, and a new way
              to admit it&rsquo;s coming apart.
            </h2>

            <p className="mt-6 max-w-[46em] text-[17px] leading-[1.75] text-[#948b78]">
              Two additions followed the project&rsquo;s own expansion-gate
              process — drafted as a proposal, checked against the doctrine,
              built, and validated end to end before merging.
            </p>

            <div className="mt-14 flex flex-col">
              <div className="grid grid-cols-1 gap-3 border-t border-white/10 py-7 sm:grid-cols-[108px_1fr] sm:gap-8">
                <span className="pt-1 font-mono text-xs tracking-[0.08em] text-[#5e5644]">
                  01
                </span>
                <div>
                  <h4 className="font-sans text-[17px] font-semibold">
                    Archivist Instability
                  </h4>
                  <p className="mt-2.5 max-w-[52em] text-[14.5px] leading-[1.7] text-[#948b78]">
                    The Flood Recovery Packet moves into the archive&rsquo;s
                    next progression stage: not new facts about the flood,
                    but the archivist&rsquo;s own recursive handling
                    becoming visible. Two fingerprints and one
                    cross-artifact link, activating type values the
                    codebase had declared but never used.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-b border-white/10 py-7 sm:grid-cols-[108px_1fr] sm:gap-8">
                <span className="pt-1 font-mono text-xs tracking-[0.08em] text-[#5e5644]">
                  02
                </span>
                <div>
                  <h4 className="font-sans text-[17px] font-semibold">
                    Withdrawn, At Request
                  </h4>
                  <p className="mt-2.5 max-w-[52em] text-[14.5px] leading-[1.7] text-[#948b78]">
                    A third document state, distinct from &ldquo;never
                    indexed&rdquo; and &ldquo;never public&rdquo;: material
                    the archive once held, then removed because the person
                    it concerned asked for it back. It ties to the Eli
                    chain without resolving anything about Eli.
                  </p>

                  <div className="mt-7 max-w-[560px] border border-white/20 bg-[#141009] p-7 sm:p-8">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75">
                      Archive Handling Note
                    </span>
                    <h4 className="font-serif text-2xl font-normal italic">
                      Withdrawn At Request
                    </h4>
                    <p className="mt-4 text-[14.5px] leading-[1.7] text-[#948b78]">
                      This material was indexed, then removed after the
                      person it concerned asked the archive to take it
                      back. The archive can describe that a withdrawal
                      happened without describing what it withdrew.
                    </p>
                    <p className="mt-4 border-l border-white/20 pl-4 font-serif text-[14.5px] italic">
                      Withdrawal is not the same as absence. Something was
                      here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* current state */}
      <section className="px-8 py-24 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-[1040px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#c8a565]/75">
              Current State
            </span>

            <p className="mt-5 max-w-[34em] font-serif text-xl italic leading-[1.6] sm:text-[22px]">
              Beneath the story: zero known dependency vulnerabilities, a
              decomposed component tree, and a test suite that automates the
              archive&rsquo;s own manual smoke checklist end to end.
            </p>

            <dl className="mt-14 grid grid-cols-2 gap-7 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5e5644]">
                  Runtime
                </dt>
                <dd className="mt-2 text-sm text-[#948b78]">
                  Next.js 16.3.1 · React 19
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5e5644]">
                  Coverage
                </dt>
                <dd className="mt-2 text-sm text-[#948b78]">
                  51 unit tests · full Playwright smoke suite
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5e5644]">
                  Architecture
                </dt>
                <dd className="mt-2 text-sm text-[#948b78]">
                  Two 1,000+ line files decomposed into ~30 focused modules
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5e5644]">
                  Process
                </dt>
                <dd className="mt-2 text-sm text-[#948b78]">
                  Every narrative change drafted and approved before it was
                  built
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/10 px-8 py-10 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5e5644]">
        <div className="mx-auto max-w-[1040px]">
          Alder Cove — preservation environment active
        </div>
      </footer>
    </main>
  );
}

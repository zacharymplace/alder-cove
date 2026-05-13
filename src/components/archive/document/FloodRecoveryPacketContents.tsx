import {
  floodRecoveryClusterPhase1,
  floodRecoveryClusterPhase2,
  type FloodRecoveryClusterEntry,
} from "@/data/recovery/floodRecoveryClusterPhase1";


function packetHandlingClass(state?: FloodRecoveryClusterEntry["packetHandlingState"]) {
  switch (state) {
    case "clipped-down":
      return "after:absolute after:right-4 after:top-3 after:h-5 after:w-12 after:rotate-[5deg] after:bg-white/25";
    case "recently-moved":
      return "translate-y-[-3px] shadow-[0_25px_70px_rgba(0,0,0,0.55)]";
    case "drying-separately":
      return "border-blue-900/25 bg-[#c9bd9b]";
    case "isolated":
      return "border-red-900/25 bg-[#c8b293]";
    case "flagged-for-review":
      return "border-red-100/20 bg-[#bfae8c]";
    case "unstable-loose":
      return "rotate-[2deg] border-red-900/20";
    default:
      return "";
  }
}

function packetHandlingLabel(state?: FloodRecoveryClusterEntry["packetHandlingState"]) {
  return state ? state.replaceAll("-", " ") : "packet item";
}

type PacketZone = {
  id: string;
  title: string;
  subtitle: string;
  entries: FloodRecoveryClusterEntry[];
};

const packetZones: PacketZone[] = [
  {
    id: "box-1-sleeve",
    title: "Box 1 Sleeve",
    subtitle: "labels, inventory slips, review notes",
    entries: [
      ...floodRecoveryClusterPhase1.filter((entry) =>
        ["recovery-inventory"].includes(entry.type)
      ),
      ...floodRecoveryClusterPhase2.filter((entry) =>
        ["recovery-inventory", "archivist-annotation"].includes(entry.type)
      ),
    ],
  },
  {
    id: "drying-tray-4",
    title: "Drying Tray 4",
    subtitle: "flattened scraps, adhered fragments, water memory",
    entries: [
      ...floodRecoveryClusterPhase1.filter((entry) =>
        ["drying-note", "adjacency-fragment"].includes(entry.type)
      ),
      ...floodRecoveryClusterPhase2.filter((entry) =>
        ["adjacency-fragment"].includes(entry.type)
      ),
    ],
  },
];

function PacketItem({ entry, index }: { entry: FloodRecoveryClusterEntry; index: number }) {
  return (
    <div
      className={[
        "relative min-h-20 border border-neutral-900/20 bg-[#d2c19a] p-3 text-neutral-950 shadow-lg",
        index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.2deg]",
        packetHandlingClass(entry.packetHandlingState),
      ].join(" ")}
    >
      <div className="absolute right-3 top-2 h-3 w-12 rotate-[4deg] bg-white/20" />

      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-700/55">
        {entry.type.replaceAll("-", " ")} · {entry.condition.replaceAll("-", " ")}
      </p>



      <h4 className="mt-2 font-serif text-base italic leading-tight">
        {entry.title}
      </h4>

      <p className="mt-2 line-clamp-1 text-[10px] leading-relaxed text-neutral-800/55">
        {entry.condition.replaceAll("-", " ")} · {packetHandlingLabel(entry.packetHandlingState)}
      </p>
    </div>
  );
}

export function FloodRecoveryPacketContents() {
  const unstableEntries = floodRecoveryClusterPhase2.filter((entry) =>
    ["misgrouped-fragment-001", "uncertainty-increased-001"].includes(entry.id)
  );

  return (
    <div className="mt-10 border border-blue-100/10 bg-black/20 p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-blue-100/35">
        packet contents visualization
      </p>

      <p className="mt-4 max-w-xl font-serif text-xl italic leading-relaxed text-neutral-300">
        A container of damaged relationships.
      </p>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        {packetZones.map((zone) => (
          <section
            key={zone.id}
            className={[
              "relative min-h-[360px] overflow-hidden rounded-lg border p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55)]",
              zone.id === "box-1-sleeve"
                ? "border-amber-950/50 bg-[#746243]/65"
                : "border-blue-950/40 bg-[#3f3c31]/70",
            ].join(" ")}
          >
            {zone.id === "box-1-sleeve" ? (
              <>
                <div className="absolute inset-5 rounded border border-neutral-950/25 bg-[#8a7650]/20" />
                <div className="absolute bottom-5 left-5 right-5 h-20 rounded-b-lg border border-neutral-950/20 bg-black/10" />
                <div className="absolute right-8 top-8 h-20 w-2 rounded bg-black/20" />
              </>
            ) : (
              <>
                <div className="absolute inset-4 rounded border border-blue-100/10 bg-blue-950/5" />
                <div className="absolute inset-x-8 top-16 h-px bg-blue-100/10" />
                <div className="absolute inset-y-8 left-1/2 w-px bg-blue-100/10" />
                <div className="absolute bottom-6 left-8 right-8 h-3 rounded-full bg-black/20" />
              </>
            )}

            <p className="relative text-[10px] uppercase tracking-[0.28em] text-blue-100/35">
              {zone.title}
            </p>

            <p className="relative mt-3 max-w-sm text-sm italic leading-relaxed text-neutral-400">
              {zone.subtitle}
            </p>

            <p className="relative mt-4 border-l border-blue-100/10 pl-4 text-xs italic leading-relaxed text-blue-100/35">
              Items in this area are grouped by current recovery handling, not
              by confirmed original relationship.
            </p>

            <div
              className={[
                "relative mt-8",
                zone.id === "box-1-sleeve"
                  ? "grid gap-3"
                  : "grid grid-cols-2 gap-3",
              ].join(" ")}
            >
              {zone.entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={[
                    zone.id === "drying-tray-4" && index === 0
                      ? "translate-y-3"
                      : "",
                    zone.id === "drying-tray-4" && index === 1
                      ? "-translate-y-2"
                      : "",
                    zone.id === "drying-tray-4" && index === 2
                      ? "col-span-2 mx-auto w-[72%]"
                      : "",
                  ].join(" ")}
                >
                  <PacketItem entry={entry} index={index} />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-5 right-5 rotate-[-3deg] text-[9px] uppercase tracking-[0.2em] text-neutral-950/25">
              held together after drying
            </div>
          </section>
        ))}
      </div>

      {unstableEntries.length > 0 && (
        <section className="relative mt-8 min-h-[260px] rotate-[-0.4deg] border border-red-100/10 bg-red-950/5 p-6 shadow-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-red-100/35">
            loose / unstable grouping
          </p>

          <div className="relative mt-6 min-h-[170px]">
            <div className="absolute inset-0 rounded border border-red-100/5 bg-black/10" />

            {unstableEntries.map((entry, index) => (
              <div
                key={entry.id}
                className={[
                  "absolute w-[46%]",
                  index === 0
                    ? "left-6 top-8 rotate-[-2deg]"
                    : "right-6 top-16 rotate-[2deg]",
                ].join(" ")}
              >
                <PacketItem entry={entry} index={index} />
              </div>
            ))}
          </div>

          <p className="mt-5 border-l border-red-100/10 pl-4 font-serif text-lg italic leading-relaxed text-red-100/40">
            Separated from the packet order. Separation may also be editing.
          </p>
        </section>
      )}
    </div>
  );
}

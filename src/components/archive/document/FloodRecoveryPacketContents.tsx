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
        "relative min-h-28 border border-neutral-900/25 bg-[#d2c19a] p-4 text-neutral-950 shadow-xl",
        index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.2deg]",
        packetHandlingClass(entry.packetHandlingState),
      ].join(" ")}
    >
      <div className="absolute right-3 top-2 h-3 w-12 rotate-[4deg] bg-white/20" />

      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-700/55">
        {entry.type.replaceAll("-", " ")} · {entry.condition.replaceAll("-", " ")}
      </p>

      <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-red-900/45">
        {packetHandlingLabel(entry.packetHandlingState)}
      </p>

      <h4 className="mt-3 font-serif text-xl italic leading-tight">
        {entry.title}
      </h4>

      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-neutral-800/75">
        {entry.text}
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

      <p className="mt-4 max-w-2xl font-serif text-2xl italic leading-relaxed text-neutral-300">
        The packet is not a single document. It is a container of damaged
        relationships.
      </p>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        {packetZones.map((zone) => (
          <section
            key={zone.id}
            className="relative min-h-[440px] rounded-lg border border-neutral-800 bg-[#6f6048]/55 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55)]"
          >
            <div className="absolute inset-4 rounded border border-neutral-950/20" />

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

            <div className="relative mt-8 grid gap-5">
              {zone.entries.map((entry, index) => (
                <PacketItem key={entry.id} entry={entry} index={index} />
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

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {unstableEntries.map((entry, index) => (
              <PacketItem key={entry.id} entry={entry} index={index} />
            ))}
          </div>

          <p className="mt-6 border-l border-red-100/10 pl-4 font-serif text-xl italic leading-relaxed text-red-100/45">
            These items have been deliberately separated from the main packet
            order, but the separation itself may be another form of editing.
          </p>
        </section>
      )}
    </div>
  );
}

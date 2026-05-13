import {
  floodRecoveryClusterPhase1,
  floodRecoveryClusterPhase2,
  type FloodRecoveryClusterEntry,
} from "@/data/recovery/floodRecoveryClusterPhase1";

type PacketZone = {
  id: "box-1-sleeve" | "drying-tray-4";
  title: string;
  subtitle: string;
  entries: FloodRecoveryClusterEntry[];
};

const keyEntryIds = new Set([
  "label-conflict-001",
  "adjacency-fragment-001",
  "misgrouped-fragment-001",
]);

const packetZones: PacketZone[] = [
  {
    id: "box-1-sleeve",
    title: "Box 1 Sleeve",
    subtitle: "Labels, inventory slips, clipped review notes.",
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
    subtitle: "Flattened scraps, adhered fragments, water memory.",
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

function packetHandlingLabel(
  state?: FloodRecoveryClusterEntry["packetHandlingState"]
) {
  return state ? state.replaceAll("-", " ") : "packet item";
}

function packetHandlingClass(
  state?: FloodRecoveryClusterEntry["packetHandlingState"]
) {
  switch (state) {
    case "clipped-down":
      return "after:absolute after:right-4 after:top-3 after:h-4 after:w-12 after:rotate-[5deg] after:bg-white/25";
    case "recently-moved":
      return "translate-y-[-3px] shadow-[0_20px_55px_rgba(0,0,0,0.5)]";
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

function PacketItem({
  entry,
  index,
  isKey,
}: {
  entry: FloodRecoveryClusterEntry;
  index: number;
  isKey: boolean;
}) {
  return (
    <div
      className={[
        "relative border border-neutral-900/20 bg-[#d2c19a] p-3 text-neutral-950 shadow-lg transition-all",
        isKey ? "min-h-28 scale-[1.02]" : "min-h-16 opacity-55",
        index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.2deg]",
        packetHandlingClass(entry.packetHandlingState),
      ].join(" ")}
    >
      <div className="absolute left-3 top-[-5px] h-3 w-12 rotate-[-5deg] bg-white/25" />
      <div className="absolute bottom-[-4px] right-4 h-3 w-14 rotate-[5deg] bg-black/10" />

      <p className="text-[8px] uppercase tracking-[0.18em] text-neutral-700/50">
        {entry.type.replaceAll("-", " ")}
      </p>

      <h4
        className={[
          "mt-2 font-serif italic leading-tight",
          isKey ? "text-lg text-neutral-950" : "text-sm text-neutral-900/70",
        ].join(" ")}
      >
        {entry.title}
      </h4>

      {isKey ? (
        <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-neutral-800/65">
          {entry.text}
        </p>
      ) : (
        <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-neutral-700/40">
          {entry.condition.replaceAll("-", " ")} ·{" "}
          {packetHandlingLabel(entry.packetHandlingState)}
        </p>
      )}

      {isKey && (
        <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-red-900/45">
          {packetHandlingLabel(entry.packetHandlingState)}
        </p>
      )}
    </div>
  );
}

function ZoneSurface({ zone }: { zone: PacketZone }) {
  if (zone.id === "box-1-sleeve") {
    return (
      <>
        <div className="absolute inset-5 rounded border border-neutral-950/25 bg-[#8a7650]/20" />
        <div className="absolute bottom-5 left-5 right-5 h-20 rounded-b-lg border border-neutral-950/20 bg-black/10" />
        <div className="absolute right-8 top-8 h-20 w-2 rounded bg-black/20" />
        <div className="absolute left-8 top-12 h-px w-28 bg-neutral-950/25" />
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-4 rounded border border-blue-100/10 bg-blue-950/5" />
      <div className="absolute inset-x-8 top-16 h-px bg-blue-100/10" />
      <div className="absolute inset-y-8 left-1/2 w-px bg-blue-100/10" />
      <div className="absolute bottom-6 left-8 right-8 h-3 rounded-full bg-black/20" />
    </>
  );
}

function ZoneTray({ zone }: { zone: PacketZone }) {
  return (
    <section
      className={[
        "relative min-h-[330px] overflow-hidden rounded-lg border p-5 shadow-[0_25px_90px_rgba(0,0,0,0.55)]",
        zone.id === "box-1-sleeve"
          ? "border-amber-950/50 bg-[#746243]/65"
          : "border-blue-950/40 bg-[#3f3c31]/70",
      ].join(" ")}
    >
      <ZoneSurface zone={zone} />

      <div className="relative z-10 mb-5 border-b border-white/5 pb-3">
        <h3 className="font-serif text-2xl italic tracking-wide text-neutral-100">
          {zone.title}
        </h3>

        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          {zone.subtitle}
        </p>
      </div>

      <div
        className={[
          "relative z-10",
          zone.id === "box-1-sleeve"
            ? "grid gap-3"
            : "grid grid-cols-2 gap-3",
        ].join(" ")}
      >
        {zone.entries.map((entry, index) => {
          const isKey = keyEntryIds.has(entry.id);

          return (
            <div
              key={entry.id}
              className={[
                !isKey ? "blur-[0.2px]" : "",
                zone.id === "drying-tray-4" && index === 0 ? "translate-y-3" : "",
                zone.id === "drying-tray-4" && index === 1 ? "-translate-y-2" : "",
                zone.id === "drying-tray-4" && index === 2
                  ? "col-span-2 mx-auto w-[72%]"
                  : "",
              ].join(" ")}
            >
              <PacketItem entry={entry} index={index} isKey={isKey} />
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 rotate-[-3deg] text-[8px] uppercase tracking-[0.2em] text-neutral-950/20">
        current grouping only
      </div>
    </section>
  );
}

function LooseGrouping({ entries }: { entries: FloodRecoveryClusterEntry[] }) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="relative mt-8 min-h-[190px] rotate-[-0.4deg] border border-red-100/10 bg-red-950/5 p-5 shadow-xl">
      <div className="absolute inset-0 rounded bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.03),transparent_55%)]" />

      <div className="relative z-10">
        <h3 className="font-serif text-2xl italic tracking-wide text-red-100/80">
          Loose / Unstable Grouping
        </h3>

        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-red-300/60">
          Separated from the packet order. Separation may also be editing.
        </p>
      </div>

      <div className="relative z-10 mt-5 min-h-[130px]">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={[
              "absolute w-[46%]",
              index === 0
                ? "left-4 top-4 rotate-[-2deg]"
                : "right-4 top-9 rotate-[2deg]",
            ].join(" ")}
          >
            <PacketItem
              entry={entry}
              index={index}
              isKey={keyEntryIds.has(entry.id) || index === 0}
            />
          </div>
        ))}
      </div>
    </section>
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
          <ZoneTray key={zone.id} zone={zone} />
        ))}
      </div>

      <LooseGrouping entries={unstableEntries} />
    </div>
  );
}

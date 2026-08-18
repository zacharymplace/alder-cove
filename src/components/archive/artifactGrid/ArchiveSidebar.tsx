import { dotClass } from "./artifactPresentation";

const ACCESS_FILTERS = ["all", "shared", "semi-private", "private", "illicitly-acquired"];

export type ArchiveSidebarProps = {
  accessFilter: string;
  onSelectFilter: (filter: string) => void;
};

/**
 * The left-hand archive intro + access filter menu. onSelectFilter is
 * expected to both update the active filter and clear any focused/
 * inspected artifact, matching the original page's inline handler.
 */
export function ArchiveSidebar({ accessFilter, onSelectFilter }: ArchiveSidebarProps) {
  return (
    <aside className="pt-3">
      <p className="text-xs uppercase tracking-[0.45em] text-amber-100/55">
        Alder Cove Archive
      </p>

      <h1 className="mt-20 font-serif text-6xl leading-[0.95] text-neutral-100">
        Preserved
        <br />
        Materials
      </h1>

      <p className="mt-8 max-w-[250px] text-base leading-relaxed text-neutral-300/80">
        Not every document entered the archive the same way. Some were
        shared. Some were copied later. Some may not have been meant to
        survive.
      </p>

      <div className="mt-14 h-px w-60 bg-neutral-700/40" />

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Filter by access
        </p>

        <div className="mt-5 space-y-3 text-sm text-neutral-300/80">
          {ACCESS_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelectFilter(item)}
              className={[
                "flex w-full items-center gap-3 rounded px-2 py-1 text-left transition",
                accessFilter === item
                  ? "bg-neutral-100/10 text-neutral-100"
                  : "hover:bg-neutral-100/5",
              ].join(" ")}
            >
              <span
                className={[
                  "h-3 w-3 rounded-full",
                  item === "all" ? "bg-neutral-300" : dotClass(item),
                ].join(" ")}
              />
              <span>{item.replaceAll("-", " ")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-20 rotate-[-2deg] border border-amber-100/15 bg-[#ad9666] p-6 text-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
        <p className="font-serif text-2xl italic">Archivist Note</p>
        <p className="mt-5 font-serif text-lg italic leading-relaxed">
          Some items remain unprocessed. Not all should be read.
        </p>
      </div>
    </aside>
  );
}

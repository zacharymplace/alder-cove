import { TapedFragment } from "../SpreadAtoms";

export function CheckInTable() {
  const rows = [
    ["Eli", "cannery roof", "Mara", "before lights"],
    ["June", "ferry hill", "alone", "after dinner"],
    ["Nora", "tide pools", "Ben", "when horn goes"],
    ["Cal", "lower trail", "dont tell parents", "probably late"],
  ];

  return (
    <TapedFragment className="rotate-[-0.6deg]">
      <h3 className="mb-2 border-b border-neutral-800/50 text-sm uppercase tracking-[0.18em]">
        Check-in Log
      </h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-widest">
            <th className="border border-neutral-700/40 p-2">Name</th>
            <th className="border border-neutral-700/40 p-2">Going To</th>
            <th className="border border-neutral-700/40 p-2">With Who</th>
            <th className="border border-neutral-700/40 p-2">Back By</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell} className="border border-neutral-700/30 p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs italic">if plans change: cross it out + tell someone</p>
    </TapedFragment>
  );
}

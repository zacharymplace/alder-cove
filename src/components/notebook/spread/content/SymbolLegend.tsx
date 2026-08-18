export function SymbolLegend() {
  const symbols = [
    ["🐟", "safe route / someone checked"],
    ["⭐", "still feels normal"],
    ["⚓", "checked in recently"],
    ["〰", "don’t go alone"],
    ["◎", "argument happened here"],
    ["📎", "memory dispute"],
  ];

  return (
    <div className="rotate-[-0.8deg]">
      <h3 className="mb-2 border-b border-neutral-800/50 text-sm uppercase tracking-[0.18em]">
        Symbols <span className="text-xs normal-case italic">(so we know)</span>
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {symbols.map(([icon, label]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <span>= {label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs italic">we add more when we need to. that’s how it works.</p>
    </div>
  );
}

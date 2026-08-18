import { Sticker } from "../SpreadAtoms";

export function ChildMap() {
  return (
    <div className="relative h-72 rotate-[-0.5deg] rounded-sm border border-neutral-700/30 bg-blue-50/20 p-4">
      <h3 className="text-center text-lg uppercase tracking-[0.15em]">Alder Cove Map</h3>
      <p className="text-center text-xs italic">(not totally right)</p>

      <div className="absolute left-8 top-14 text-xs">ferry dock</div>
      <div className="absolute left-20 top-24 text-xs">ferry hill</div>
      <div className="absolute left-52 top-32 rounded border border-neutral-800/40 px-3 py-2 text-sm font-bold">
        CANNERY
      </div>
      <div className="absolute left-56 top-48 text-xs">waterline room</div>
      <div className="absolute bottom-10 left-20 text-xs">echo tunnel ↓</div>
      <div className="absolute right-16 top-20 text-xs">good rocks</div>
      <div className="absolute bottom-12 right-20 text-xs uppercase">don’t go if fog ✕</div>

      <Sticker className="absolute right-10 top-28 rotate-[12deg]">🐟</Sticker>
      <Sticker className="absolute bottom-16 left-36 rotate-[-8deg]">⭐</Sticker>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 300">
        <path d="M55 55 C120 95, 140 70, 190 110 S290 145, 350 95 S440 120, 455 70" fill="none" stroke="rgba(30,64,175,.45)" strokeWidth="2" />
        <path d="M85 80 C110 130, 150 155, 220 155 C285 155, 330 185, 390 230" fill="none" stroke="rgba(127,29,29,.55)" strokeWidth="2" strokeDasharray="6 8" />
        <path d="M250 165 C230 205, 180 225, 120 245" fill="none" stroke="rgba(39,39,42,.45)" strokeWidth="2" strokeDasharray="3 7" />
        <circle cx="275" cy="155" r="54" fill="none" stroke="rgba(127,29,29,.45)" strokeWidth="2" strokeDasharray="7 6" />
      </svg>
    </div>
  );
}

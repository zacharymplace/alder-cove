export function CannerySketch() {
  return (
    <div className="relative h-64 rotate-[0.6deg] border border-neutral-700/30 bg-white/15 p-4">
      <h3 className="text-center text-base uppercase tracking-[0.16em]">Cannery Sketch</h3>
      <svg className="mx-auto mt-4 h-36 w-72" viewBox="0 0 300 150">
        <rect x="60" y="50" width="160" height="70" fill="none" stroke="rgba(20,20,20,.75)" strokeWidth="2" />
        <rect x="80" y="30" width="40" height="20" fill="none" stroke="rgba(20,20,20,.75)" strokeWidth="2" />
        <rect x="145" y="25" width="45" height="25" fill="none" stroke="rgba(20,20,20,.75)" strokeWidth="2" />
        <line x1="50" y1="120" x2="235" y2="120" stroke="rgba(30,64,175,.6)" strokeWidth="3" />
        <line x1="100" y1="120" x2="92" y2="145" stroke="rgba(20,20,20,.55)" />
        <line x1="165" y1="120" x2="170" y2="145" stroke="rgba(20,20,20,.55)" />
        <path d="M110 128 C135 138, 170 138, 195 128" fill="none" stroke="rgba(127,29,29,.55)" strokeDasharray="5 5" />
      </svg>
      <p className="absolute left-6 top-28 text-xs">flood line usually</p>
      <p className="absolute bottom-5 left-8 text-xs">tunnels under here ↓</p>
      <p className="absolute bottom-5 right-8 text-xs italic">water moves weird after storms</p>
    </div>
  );
}

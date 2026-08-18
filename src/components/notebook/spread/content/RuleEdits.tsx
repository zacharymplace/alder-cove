import { TapedFragment } from "../SpreadAtoms";

export function RuleEdits() {
  return (
    <TapedFragment className="rotate-[1deg] text-sm">
      <h3 className="mb-2 text-xs uppercase tracking-[0.22em]">if someone doesnt check in</h3>
      <ol className="ml-5 list-decimal space-y-1">
        <li>wait 15 minutes</li>
        <li>
          <span className="line-through decoration-red-900/70 decoration-2">tell an adult</span>
          <span className="ml-2">check last place they said</span>
        </li>
        <li>ask 2 people</li>
        <li>go together</li>
        <li className="text-neutral-700">then tell an adult if still missing</li>
      </ol>
      <p className="mt-3 rotate-[-1deg] text-xs italic">
        dont make it a big thing unless it is a big thing
      </p>
    </TapedFragment>
  );
}

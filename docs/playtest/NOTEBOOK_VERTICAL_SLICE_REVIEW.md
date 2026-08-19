# Notebook Vertical Slice Review

## Prototype Focus

This slice tests whether Alder Cove can deliver narrative horror through a handled notebook artifact rather than exposition, combat, or traditional dialogue.

## Current Core Loop

1. Read preserved notebook spread.
2. Handle page long enough for residue to surface.
3. Inspect contradictions.
4. Compare recovered, original, and reconstructed wording.
5. Notice subtle wording drift.
6. Question whether the page changed or the player misremembered it.

## What Is Working

- Fixed notebook geometry improves artifact realism.
- Two-page spread plus one-page focus supports readable inspection.
- Eli contradiction chain carries the strongest emotional arc.
- “he was scared before we were” remains the central emotional anchor.
- “do not open unless the story changes again” creates strong recursive dread.
- Delayed pressure/graphite reveals make attention feel meaningful.
- Remembered wording drift begins to implicate the player’s own memory.
- Contradiction collapse does not resolve the Eli chain — collapse-state
  wording (“maybe none of us remembered him right”, “he wasnt scared until
  after the cannery”) adds competing claims instead of settling on one.

## Current Design Rule

No meaningful notebook content should be clipped or squeezed. If content does not fit a physical page, it moves to a later page.

## Current Emotional Thesis

Eli may have been changing, but the group may also have changed him by preserving him as already changed.

## Refinement Targets — Resolved

All five targets from the previous pass are closed:

- **Investigation panel made diegetic.** The archive's "object in hand"
  panel was a dark UI box; restyled to match the tan handling-note paper
  language used everywhere else (rotation, tape marks, dark ink) —
  same position, same fields.
- **Pagination as explicit page composition.** `pages.ts` is fully
  data-defined (`role`, `provenance`, `components`, explicit
  `spreadId`/`side`); `NotebookSpread.tsx`'s role-based ternary chain was
  replaced with a `role → renderer` registry
  (`StandardNotebookPage` / `HiddenLayerPage` / `ContinuationSupportPage`).
- **More notebook content moved into data-defined physical pages.**
  Covered by the same decomposition — content lives in `pages.ts` and
  `notebookOne.ts`, not inline component branching.
- **Page-by-page authored spreads instead of component-level
  conditionals.** Same renderer-registry work.
- **Ambiguity kept alive after contradiction collapse.** Re-read against
  the actual current text rather than assumed: the collapse-state wording
  for the Eli chain adds new competing claims rather than resolving
  anything, and was confirmed against this standard directly rather than
  left as an open question. See "What Is Working" above.

## Next Refinement Targets

None identified from this pass. The five targets above came from actual
play; closing them by inspection/decomposition rather than by playing the
current build is a reasonable one-time catch-up, but it's not a substitute
for a fresh playtest. The next entry in this document should come from
actually playing the current vertical slice — including the archive
content added since this review was last written (Flood Recovery Phases
1–3, the withdrawn-document state, the archivist internal note) — not from
further inspection.

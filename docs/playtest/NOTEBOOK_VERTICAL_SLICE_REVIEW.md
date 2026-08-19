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

## Fresh Playtest Pass — Notebook

Actually played the current build rather than inspecting it. Confirmed
firsthand:

- The opening spread's delayed pressure reveal fires correctly and reads
  as intended — holding the Eli note surfaces "the longer this is held,
  the less certain the wording feels," then the pressure-reveal line
  ("he wasnt trying to scare us"), on the documented delay.
- The flashlight → instability → collapse escalation on the recovered
  spread works exactly as authored under realistic play (real clicks with
  natural pauses between them). Confirmed the collapse-state text
  directly rather than by reading source: "Eli said the tunnels
  remembered things wrong," "he wasnt scared until after the cannery,"
  "maybe none of us remembered him right" — genuinely unresolved, matches
  the "What Is Working" entry above.
- Focus mode ("lift page closer") zooms the current page without
  reshaping it, matches `NOTEBOOK_AUTHORING_RULES.md`. Page navigation
  bounds are correct (previous/next disable at the first/last spread).

## Next Refinement Targets

- **A meaningful slice of authored contradiction content is currently
  unreachable by a player.** `revisionPhase`, `mutationPhase`, `unstable`,
  and `memoryLayer` (beyond its "recovered" default) all gate real text
  variants in `noteTextDrift.ts` and `Note.tsx` — five separate
  `revisionPhase`-gated wording changes, an `unstable`-gated variant, and
  the "original"/"reconstructed" memory-layer texts — but no button,
  control, or interaction anywhere calls `advanceRevision()`,
  `advanceMutation()`, `toggleUnstable()`, or `setMemoryLayer()`. This
  was found by playing, not by reading the state file: the flashlight
  path only ever touches `instabilityLevel` and `collapseTriggered`. This
  is instability-mechanics territory (protected — needs explicit
  direction before any fix): either wire these into real interactions,
  or remove the dead branches if they were superseded by the
  instability/collapse path and never cleaned up.
- **Possible readability crowding, not confirmed as a bug.** With the
  side light on, the flashlight-revealed marginalia ("he was scared
  before we were") visually overlaps the printed rule list beneath it at
  standard viewport width. This may be the intended "illuminated
  handwriting crowds the page" effect (consistent with the physical-
  artifact aesthetic) rather than a defect — flagging for a design call,
  not proposing a fix.

The archive side has grown substantially since this document was last
written (Flood Recovery Phases 1–3, the withdrawn-document state, the
archivist internal note) and has never had its own playtest review. See
`ARCHIVE_SLICE_REVIEW.md` for that pass, done the same way — by playing
it, not inspecting it.

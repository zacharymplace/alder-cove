# Expansion Candidate: Wire Up Notebook Contamination Notes

## Artifact / System Type

- [ ] artifact
- [ ] reveal event
- [ ] document route
- [ ] cross-artifact link
- [ ] progression stage
- [ ] private readability boundary
- [x] existing authored content, currently unreachable — wiring only

## Routes Touched

- /notebook (pages 18 and 19 only — `opening-left` / `opening-right`)

## Emotional Purpose

`src/data/crossArtifact/notebookContamination.ts` defines
`notebookContaminationNotes`: three fully-written notes about physical
handling contamination during preservation, each tied to a specific
page via `affectedPage`. Nothing in the app imports this file. It has
sat completely dead since it was authored.

The wiring for it already half-exists: `NotebookReader.tsx` computes a
real `pageNumber` per rendered page (`spreadIndex * 2 + 18/19`), and
`StandardNotebookPage.tsx` already displays that number and already has
a provenance footer with a near-identical box for `conflictingSource`.
This was clearly planned and never finished, not a coincidence.

This isn't new lore — it's making three sentences that already exist
readable for the first time.

## Preservation Mechanism

`StandardNotebookPage` gains a lookup: for its own `pageNumber`, find
any `notebookContaminationNotes` with matching `affectedPage` and
render them in a small footer box, visually distinct from (but
consistent with) the existing `conflictingSource` box.

The unused `visibility` field (`faint` / `recoverable` / `clear`) drives
real opacity instead of being inert metadata — `faint` renders more
transparent than `recoverable`, which is more transparent than `clear`.
This activates a field that currently does nothing, using only data
that already exists on the notes being wired up (not new content).

## Handling Behavior

Purely additive to the existing page shell. No new page, no new route,
no change to geometry, spread behavior, or the provenance footer's
existing fields — only a new optional block alongside them, which only
renders on the two pages (18, 19) that have matching notes. Every other
page in the notebook is visually unchanged.

## Risk

- Fixed-height pages (`h-[900px] overflow-hidden`) have overflowed
  silently before (the marginalia bug fixed earlier this session) —
  the two affected pages must be checked live for overflow, not just
  reasoned about, since `opening-right` already carries two notes plus
  a cannery sketch and now gets two contamination notes stacked on top.
- Keep the box visually distinct from `conflictingSource` (different
  tint) so a reader doesn't confuse "wording softened later" with
  "this page was physically contaminated during preservation" — they
  are different claims.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

No new text is authored. The three existing notes render as-is:

- Page 18: *"Map edge appears graphically reconstructed after flood sorting."* (faint)
- Page 19: *"Some Eli wording may now reflect later handling language."* (recoverable)
- Page 19: *"Original adjacency confidence degraded after repeated preservation review."* (faint)

---

## Implementation Notes

`StandardNotebookPage.tsx` now filters `notebookContaminationNotes` by
its own `pageNumber` and renders any matches in a new footer box,
independent of whether `provenance` is set. A new
`contaminationVisibilityClass` helper in `styleHelpers.ts` maps
`visibility` to real opacity (`faint` 0.25, `recoverable` 0.45, `clear`
0.7) — the field previously did nothing.

Verified via `npm run check`, `npm run test:e2e` (all 5 specs,
including the existing notebook/archive smoke sequences, unaffected),
and a live dev-server pass: measured `scrollHeight` vs `clientHeight`
on both affected pages directly (826px content in an 898px shell, no
overflow, ~72px to spare) rather than assuming from a screenshot, given
the marginalia-overlap bug earlier this session. Confirmed the three
notes render with the intended opacity difference and no console
errors. No other page in the notebook is affected, since no other page
number has a matching contamination note.

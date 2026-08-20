# Expansion Candidate: Page 31 Reconstruction

## Artifact / System Type

- [x] artifact
- [ ] reveal event
- [x] document route
- [x] cross-artifact link
- [ ] progression stage
- [ ] private readability boundary

## Routes Touched

- /archive
- /archive/page-31-reconstruction-001
- /notebook (existing `index-closure-left` page gains one inbound link)

## Emotional Purpose

The notebook's own final spread already says, in-world, that page 31
existed and was never recovered: `torn-index-closure` reads *"index
says page 31 existed. no recovered copy confirms contents,"* and the
`index-closure-left` page's provenance note says the closure was
*"assembled from missing-page trace"* with `confidence: "low"`. That's
a real, already-authored gap — not something this candidate invents.

Two type-system hooks have sat completely dormant since they were
declared: `acquisitionMethod: "reconstructed-from-memory"` and
`handlingState: "reconstructed"` (the latter already has a full violet
color treatment built in `artifactPresentation.ts`'s
`handlingStateClass`, waiting for a first document — same situation
`illicitly-acquired` was in before `cannery-waterline-fragment-001`).

Putting these two together against the page-31 gap gives the archive
its own independent attempt at the same unresolved loss — not a copy of
the notebook's pressure-trace reconstruction, but a separate one, built
from what people *remembered* the page saying rather than any physical
residue. The two reconstructions are never claimed to agree. Whether
memory-reconstruction is any more (or less) trustworthy than
trace-reconstruction is the open question this raises, and it should
stay open.

## Preservation Mechanism

Activates `reconstructed-from-memory` (`ArchiveAcquisitionMethod`, zero
prior documents) and `reconstructed` (`handlingState`, zero prior
documents, pre-existing styling only).

Uses the existing `pageIds` field to link to `index-closure-left` — the
first time an archive document cross-links to a *specific* notebook
page rather than a whole spread's worth. This is the one place a
cross-artifact link is the point, not a risk: the document exists
*because* the notebook page is missing, and pointing at it is how the
player notices the two systems are describing the same hole from two
different failed angles.

## Handling Behavior

Same document route as every other real artifact. `accessClass:
"semi-private"` — this was a shared, acknowledged group attempt to
remember something together, not a solitary private act and not
ordinary shared material.

## Risk

- Do not write any actual reconstructed content for page 31. The
  document should describe *that* people tried to remember it and
  *how little confidence there is*, never what they came up with. The
  gap is the artifact; filling it defeats the purpose.
- Do not let the `ethicalPressure` or description imply this
  reconstruction is more (or less) correct than the notebook's own
  pressure-trace version. Two independent, unverifiable attempts,
  full stop.
- `sustainedInspectionReveal` has now appeared on three of the last
  four documents added, raising a real risk of the mechanism feeling
  expected rather than earned. Reviewed and kept anyway, on the
  condition that the line itself deepens the uncertainty rather than
  resolving it — see Draft Content.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

### New archive document

**`page-31-reconstruction-001`**
- title: `Page 31 — Group Reconstruction Attempt`
- type: `copied-fragment`
- accessClass: `semi-private`
- acquisitionMethod: `reconstructed-from-memory`
- emotionalRisk: `medium`
- handlingState: `reconstructed`
- pageIds: `["index-closure-left"]`
- description: *"An attempt, made by more than one person, to write down what page 31 said before it was lost. No physical trace of the original survived to check it against."*
- ethicalPressure: *"The archive cannot verify this against anything. It preserves the attempt, not the page."*
- sustainedInspectionReveal: *"The longer this stays in hand, the less it reads like agreement and the more it reads like several people hoping the others remembered it the same way."*

No new components. Renders through the existing `semi-private` tone
path and the now-activated `reconstructed` handling-state styling.

---

## Implementation Notes

Added exactly as drafted, one entry in `archiveDocuments.ts`, including
the `sustainedInspectionReveal` line (kept after review, not omitted —
see the amended Risk note above).

Verified via `npm run check` and a manual pass in a live dev server:
the detail page (`/archive/page-31-reconstruction-001`) renders with
the same `semi-private` "limited handling" gate as every other
semi-private document, showing its `ethicalPressure` line correctly.
The index card shows "1 pages indexed" (confirming the `pageIds:
["index-closure-left"]` cross-link registered) and its `reconstructed`
handling-state label renders in the violet styling that had sat unused
in `handlingStateClass` since before this document existed. The
inspection panel's dwell reveal was confirmed opacity `0` immediately
on open and `0.75` after holding it, matching the existing
`sustainedInspectionReveal` documents. No console errors.

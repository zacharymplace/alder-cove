# Expansion Candidate: Illicitly Acquired Fragment

## Artifact / System Type

- [x] artifact
- [ ] reveal event
- [x] document route
- [ ] cross-artifact link
- [ ] progression stage
- [ ] private readability boundary

## Routes Touched

- /archive
- /archive/cannery-waterline-fragment-001

## Emotional Purpose

`illicitly-acquired` is one of only four access classes
`ARCHIVE_ACCESS_AND_INSPECTION_STRUCTURE.md` names explicitly, and the
code already has real, specific handling built for it that nothing has
ever reached: `artifactInteractionClass` has a dedicated hover feel for
this access class, and `getArchiveDocumentPresentation` has fully written
copy ("The archive should not make this easy," "unsettled acquisition,"
"access delayed"). This was clearly authored in advance, not left as a
placeholder. Filling it in activates prepared content rather than adding
new surface.

`private` (Mara's journal) is about content that's sensitive. This is
different: it's about the *acquisition itself* being improper, regardless
of what the material is. That's a distinct emotional register the archive
hasn't used yet.

## Preservation Mechanism

One new document. Reuses the existing `copied-fragment` type and
`taken-from-private-place` acquisition method — no new type surface.
Also activates `handlingState: "sealed"`, dormant since the type was
declared (only `over-handled`, `drying`, `awaiting-review` have been used
so far), which already has its own styling (`handlingStateClass`) and
fits this document's shape better than any state that's been used.

Grounds it in the cannery myth from `docs/design/ALDER_COVE.md`
("The cannery gives things back wrong sometimes. People who stay below
the waterline too long may come back changed.") and the recurring
"echo tunnel" / waterline imagery already in the notebook, without
naming who went below or why.

## Handling Behavior

Same document route pattern as every other real artifact — approach,
pick up, read the handling note. **Deliberately zero new cross-artifact
links.** Every other addition this session tied into the existing
provenance web; this one shouldn't. Part of what makes an acquisition
illicit is that the archive can't explain how it connects to anything
else — an isolated document reads truer to that than a neatly-linked one.

## Risk

- Avoid naming who retrieved it or why — the point is that the archive
  itself doesn't know, or won't say.
- Avoid over-explaining the cannery myth. One grounded detail, not a
  lore dump.
- Avoid accidentally implying this resolves or extends the Eli
  contradiction chain — it should stand on its own, adjacent to the
  town's mythology rather than to any specific already-established
  character's story.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

### New archive document

**`cannery-waterline-fragment-001`**
- title: `Cannery — Waterline Room Fragment`
- type: `copied-fragment`
- accessClass: `illicitly-acquired`
- acquisitionMethod: `taken-from-private-place`
- emotionalRisk: `high`
- handlingState: `sealed`
- pageIds: `[]`
- description: *"A fragment recovered from below the waterline. No record explains who went down to retrieve it, or why."*
- ethicalPressure: *"Nothing about how this arrived here was authorized. The archive kept it anyway."*

No cross-artifact links, no archivist fingerprints — intentionally
isolated, per Handling Behavior above.

---

## Implementation Notes

Added exactly as drafted, one entry in `archiveDocuments.ts`. No
component changes — every piece of rendering this needed already
existed and had simply never been reached by any real document:
`getArchiveDocumentPresentation`'s `illicit` tone copy, `archiveDocumentShellClass`'s
purple-tinted shell, `artifactInteractionClass`'s distinct hover feel,
and `handlingStateClass`'s `sealed` styling.

Verified via `npm run check`, `npm run test:e2e`, and a manual pass in a
live dev server: the detail page renders the dormant illicit-tone copy
correctly ("The archive should not make this easy," "unsettled
acquisition," "access delayed"), no cross-artifact-links or
archivist-fingerprints sections render (confirming the intentional
isolation), and the `illicitly acquired` filter — previously guaranteed
to show an empty grid — now correctly shows exactly this one document.
No console errors.

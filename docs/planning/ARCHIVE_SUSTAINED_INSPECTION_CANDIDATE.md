# Expansion Candidate: Sustained Inspection for the Archive

## Artifact / System Type

- [ ] artifact
- [ ] reveal event
- [ ] document route
- [ ] cross-artifact link
- [x] progression stage
- [ ] ambient behavior
- [x] private readability boundary

## Routes Touched

- /archive (the "object in hand" inspection panel only)

## Smoke Checks Affected

None of the existing numbered steps directly — this is a new passive
behavior on an existing surface (the inspection panel), not a new route
or a change to any existing interaction.

## Emotional Purpose

`docs/design/ARCHIVE_ACCESS_AND_INSPECTION_STRUCTURE.md`'s inspection
flow names "sustained inspection" as its own stage. The notebook already
has a real mechanic for this (residue surfaces the longer a page is
held); the archive doesn't — everything renders instantly on approach.
Confirmed as a real gap by actually playing the current build, not
assumed from the doctrine text alone.

## Preservation Mechanism

A new optional field on archive document data — a single line that fades
in on a delay while a document stays "in hand" (the inspection panel
open), mirroring the notebook's `pressureReveal` mechanism exactly: a
framer-motion delayed opacity fade, no new timer state, restarts if the
player sets the object down and picks up something else.

Deliberately not built as a system that touches every document. Like
`pressureReveal` in the notebook (not every note has one), this stays
optional per-document — authored where sustained attention should be
rewarded, silent everywhere else.

## Handling Behavior

Unchanged interaction model — approach, pick up, the panel opens exactly
as it does today. The only new thing is that staying on the panel long
enough surfaces one additional line, exactly like holding a notebook page
does.

## Risk

- Avoid making this feel like a hidden collectible/achievement rather
  than an emotional beat — the reveal should deepen unease, not reward
  patience mechanically.
- Avoid over-explaining. One quiet line, not a paragraph.
- Two documents to start, not all seven — matches the "why this size and
  no more" discipline from prior phases.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

### New optional field

`sustainedInspectionReveal?: string` on the archive document shape,
rendered in `InspectionPanel.tsx` with the same delayed-fade treatment
the notebook already uses for `pressureReveal`.

### Two documents, to start

**Mara — Private Journal Fragment**
> The longer this stays in hand, the more it feels like reading over someone's shoulder.

**Archivist Internal Note**
> The longer this stays in hand, the more it reads like something meant to be crossed out.

Both are the archive's two `private`/sealed documents — sustained
inspection rewarding patience specifically on the things already coded
as resistant to being read fits the mechanism better than adding it
everywhere at once.

---

## Implementation Notes

Added exactly as drafted:
- `sustainedInspectionReveal?: string` on `ArchiveDocument` (in
  `archiveDocuments.ts`) and the looser `ArchiveDisplayArtifact` shape
  (in `artifactPresentation.ts`)
- Rendered in `InspectionPanel.tsx` with a `motion.p`, `key={artifact.id}`
  so the delay restarts cleanly when switching between artifacts,
  `delay: 3, duration: 1.2` — long enough to require genuine dwelling,
  matching the notebook's slower "the longer this is held..." reveal
  rather than its quick 0.35s `pressureReveal` fade
- Authored on `mara-private-journal-fragment` and
  `archivist-internal-note-001`

No new components, no new state. Verified via `npm run check`,
`npm run test:e2e`, and a manual pass in a live dev server: picked up
each document, waited past the delay, confirmed both lines render in
the correct position (between the ethical-pressure line and the
access/acquisition metadata), and confirmed setting one down and
picking up the other restarts the reveal correctly rather than carrying
over. No console errors.

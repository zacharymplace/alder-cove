# Expansion Candidate: Archivist Internal Note

## Artifact / System Type

- [x] artifact
- [ ] reveal event
- [x] document route
- [x] cross-artifact link
- [x] progression stage
- [ ] ambient behavior
- [ ] private readability boundary

## Routes Touched

- /archive
- /archive/archivist-internal-note-001
- /archive/flood-recovery-packet-001 (cross-artifact relationship review only)

## Emotional Purpose

Phase 3 (Flood Recovery) established the archivist's own recursive handling
becoming visible — fingerprints that admit she's losing track of her own
decisions. This is the next stage in `docs/design/ARCHIVE_PROGRESSION_DOCTRINE.md`'s
progression: **Provenance Collapse** — "the archive can no longer confidently
stabilize originals, copies, or handling order." Not a new fact about any
child in the story. A fact about the archive itself: something never meant
for the index ended up in it.

## Preservation Mechanism

Activates a dormant hook already in the type system: `ArchiveDocumentType`
declares `"archivist-internal-note"` but has zero documents of that type
today. One new document, treated exactly like Mara's sealed journal
(`accessClass: "private"`) — same restricted-handling rendering, same
"the archive can hold the object without opening it yet" framing, no new
components. The irony carries itself: the archivist withholds others'
material throughout the archive, and now her own material gets the same
treatment, by the same mechanism, without her having chosen it.

One new cross-artifact link, reusing the existing `contaminated-by`
relationship (no new union member needed) — from the flood packet to this
note, in the same direction Phase 3 already established the packet
"contaminating" things it sits near.

## Handling Behavior

The card in the archive index is titled plainly — "Archivist Internal
Note" — procedural, not "Misfiled" or anything that spoils the reveal.
Approaching it is where the player learns it entered the index by
accident. The note's actual content is never shown, same restraint as
Mara's journal: presence without permission.

## Risk

- Avoid making the archivist's unraveling read as a clean character arc —
  same risk Phase 3 flagged. No confession, no resolution.
- Avoid implying this note explains or resolves anything about the flood,
  Eli, or Mara. It's evidence about the archive's own reliability, nothing
  else.
- Avoid a title or description that spoils "this wasn't supposed to be
  here" before the player approaches it.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

### New archive document, added to `archiveDocuments.ts`

**`archivist-internal-note-001`**
- title: `Archivist Internal Note`
- type: `archivist-internal-note`
- accessClass: `private`
- acquisitionMethod: `recovered-from-box`
- emotionalRisk: `high`
- handlingState: `awaiting-review`
- pageIds: `[]`
- description: *"A private processing note, filed into the shared index by mistake. It was not written for anyone to read."*
- ethicalPressure: *"The archive cannot un-file something once it has been filed. Removing it now would be its own kind of decision."*

### One new cross-artifact link

**`link-flood-archivist-note-001`**
- from: `flood-recovery-packet-001` → to: `archivist-internal-note-001`
- relationship: `contaminated-by`
- confidence: `medium`
- note: *"Written during the second flood packet review. The packet's uncertainty appears to have carried into material that was never meant to enter the index."*

### Why this size and no more

One document, one link, zero new components — reuses the private/sealed
rendering path exactly as-is. Smaller than Phase 3 (which added two
fingerprints plus a link), because this beat only needs to land once,
cleanly, without being explained further.

---

## Implementation Notes

Added exactly as drafted:
- `archivist-internal-note-001` in `src/data/archive/archiveDocuments.ts`
- `link-flood-archivist-note-001` in `src/systems/archive/crossArtifactLinks.ts`

No component changes — the document renders entirely through the existing
`private`-tone path (same as Mara's journal), and the link renders through
the existing `CrossArtifactRelationshipReview`. The new card appears in the
index automatically, positioned right after the Flood Recovery Packet,
since it's added to `archiveDocuments` rather than the display-only inline
entries in `archive/page.tsx`.

Verified via `npm run check`, `npm run test:e2e`, and a manual pass over
`/archive` and `/archive/archivist-internal-note-001`: the card title stays
plain (no spoiler), the detail page shows the sealed/restricted framing
correctly, the cross-artifact link renders on both this document and the
flood packet, and Mara's journal is unaffected.

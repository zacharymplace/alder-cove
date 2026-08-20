# Expansion Candidate: Folded Letter — To Eli

## Artifact / System Type

- [x] artifact
- [ ] reveal event
- [x] document route
- [ ] cross-artifact link
- [ ] progression stage
- [ ] private readability boundary

## Routes Touched

- /archive
- /archive/folded-letter-to-eli-001

## Emotional Purpose

Every document added this session has a fraught origin: found after a
flood, taken without permission, filed by mistake, taken illicitly from
a forbidden place. `given-for-copying` is the one acquisition method in
the type system that implies someone *wanted* something preserved —
completely dormant until now, same as `folded-letter` as a document
type. Using both together, once, is a real emotional contrast worth
having: not everything in the archive got there through damage or
violation.

Critically, this is a letter *to* Eli, not *from* him. His own voice has
never appeared directly anywhere in the archive — everything about him
is mediated through the notebook's contradiction chain and other
people's fingerprints and interview notes. That withholding is clearly
load-bearing for the whole design (`NOTEBOOK_AUTHORING_RULES.md`'s "Eli
Chain Lesson" explicitly warns against resolving the tension too
cleanly). This document doesn't touch it. It deepens the thread by
showing the group's care *toward* him without ever giving him a
first-person artifact of his own.

## Preservation Mechanism

Activates two dormant hooks: `folded-letter` (`ArchiveDocumentType`,
zero prior documents) and `given-for-copying` (`ArchiveAcquisitionMethod`,
zero prior documents). Also uses `handlingState: "stable"` — dormant
since the type was declared, and a meaningful choice here specifically:
every other document is `drying`, `over-handled`, `awaiting-review`, or
`sealed` (all mid-process, unresolved). This is the one document that
isn't.

Deliberately **omits `ethicalPressure`.** Every other document has one.
This is the one thing in the archive the archivist doesn't seem
conflicted about — the absence of that red-tinted callout is itself the
signal, not an oversight.

Reuses the existing `sustainedInspectionReveal` mechanism (built this
session for Mara's journal and the archivist internal note) rather than
adding new UI — a third document, not a new pattern.

## Handling Behavior

Same document route as every other real artifact. No cross-artifact
links — this stays a self-contained gesture rather than getting pulled
into the existing provenance web, which is exactly the kind of thing
that would start explaining or resolving something about Eli.

## Risk

- Avoid quoting the letter's actual words anywhere. Every existing
  document's `description` is procedural framing, never the artifact's
  literal content (even the flood packet's contents visualization only
  describes fragments, it doesn't transcribe them) — staying consistent
  with that matters more here than usual, since any real quoted line
  risks reading as Eli's letter answering back.
- Avoid implying the group's promise was kept, broken, right, or wrong.
- Avoid connecting this to the Eli contradiction chain via any link —
  keep it standing alone.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

### New archive document

**`folded-letter-to-eli-001`**
- title: `Folded Letter — To Eli`
- type: `folded-letter`
- accessClass: `semi-private`
- acquisitionMethod: `given-for-copying`
- emotionalRisk: `medium`
- handlingState: `stable`
- pageIds: `[]`
- description: *"A folded letter addressed to Eli. Unlike most of what the archive holds, this wasn't found, taken, or misfiled — it was handed over so a copy could be kept."*
- ethicalPressure: *(omitted, deliberately — see Preservation Mechanism)*
- sustainedInspectionReveal: *"The longer this stays in hand, the more it reads like a promise the group wasn't sure they could keep."*

No cross-artifact links, no new components.

---

## Implementation Notes

Added exactly as drafted, one entry in `archiveDocuments.ts`. No
component changes — renders entirely through the existing
`semi-private`-tone path and the `sustainedInspectionReveal` mechanism.

Verified via `npm run check`, `npm run test:e2e`, and a manual pass in a
live dev server: the detail page renders correctly with no
ethical-pressure block and no layout gap where it would have been, the
index card appears and opens the inspection panel correctly, and the
dwell reveal ("The longer this stays in hand...") surfaces after
holding it, same as the other two `sustainedInspectionReveal` documents.
No console errors.

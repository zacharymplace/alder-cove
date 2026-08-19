# Archive Slice Review

## Prototype Focus

This slice tests whether the archive can deliver preservation-as-horror —
handling, provenance, and withheld material — as its own experience,
distinct from the notebook. The archive has grown substantially (seven
documents, four cross-artifact links, five archivist fingerprints, two
reveal events) without ever having its own playtest review; this is the
first one, written from actually playing the current build rather than
from inspecting the code.

## Current Core Loop

1. Dismiss the archivist's preface.
2. Browse the artifact grid; filter by access class.
3. Approach a document — some redirect (the shared notebook), some open
   directly, some are sealed, one is withdrawn.
4. Read handling state, provenance, archivist fingerprints, and
   cross-artifact links for documents that have them.
5. Trigger ambient reveal events (Unresolved Wording, Partial Fragment) as
   they become available.
6. Set the object down; the archive remembers what's been handled.

## What Is Working

- The artifact grid reads as a coherent ensemble at seven documents, not
  a pile — access-class color dots and the filter sidebar make the
  private/semi-private split legible at a glance.
- The archivist's own instability arc holds together as an actual thread,
  not isolated flourishes: her fingerprints on the flood packet ("I keep
  grading my own memory of handling this packet, not just the packet,"
  "I do not remember deciding to change it") connect concretely to the
  archivist internal note that leaked into the index, via the
  `contaminated-by` link between them. Approaching the note after reading
  the fingerprints lands as a real payoff, not a surprise non sequitur.
- The withdrawn state ("Withdrawn At Request") and the not-found state
  ("Material Not Located") read as clearly distinct in-world reasons for
  absence when visited back to back — confirmed side by side, not assumed.
- Mara's journal and the archivist's internal note — both `private`,
  both using the identical sealed/restricted rendering path — still read
  as two different situations because the surrounding context (whose
  material it is, why it's sealed) carries the distinction. The shared
  component doesn't flatten them into feeling the same.
- Reset handling genuinely resets: preface, reveal events, and handled
  state all return to first-visit condition.

## Current Design Rule

Per `ARCHIVE_ACCESS_AND_INSPECTION_STRUCTURE.md`: the player should
eventually ask "why do I have this?" not only "what does this mean?" The
archivist internal note and the withdrawn note are the two strongest
current answers to that question — neither explains itself.

## Current Emotional Thesis

The archivist withholds other people's material throughout the archive.
The provenance-collapse content (the internal note) applies the same
withholding to her, by the same mechanism, without her having chosen it.

## Next Refinement Targets

- **The `illicitly-acquired` access class has zero documents.** The
  filter option exists in the sidebar, but nothing in the archive has
  ever used that access class, so selecting it can only ever show an
  empty grid. Not necessarily a bug — could be a deliberate future beat —
  but worth a deliberate call rather than leaving a permanently-dead
  filter option unexamined.
- **"Sustained inspection" exists in the notebook but not the archive.**
  `ARCHIVE_ACCESS_AND_INSPECTION_STRUCTURE.md`'s inspection flow names
  sustained inspection as a stage, and the notebook has a real dwell-based
  mechanic for it (residue surfaces the longer a page is held). Archive
  documents render everything instantly on approach — no equivalent
  "handle long enough and something surfaces" moment. Flagged in the
  SWOT-style review earlier this session as a possible gap; playing the
  current build confirms the asymmetry is real, not just a documentation
  oversight. Whether to build a matching mechanic for the archive is a
  design call, not an obvious yes.

# Expansion Candidate: Chameleon Handwriting Note

## Artifact / System Type

- [ ] artifact
- [ ] reveal event
- [ ] document route
- [ ] cross-artifact link
- [ ] progression stage
- [ ] private readability boundary
- [x] notebook note content — activating a dormant handwriting style

## Routes Touched

- /notebook (`mara-boundary-right` page only)

## Emotional Purpose

`NotebookNote["handwriting"]` includes `"chameleon"` alongside
`coauthor`, `archivist`, `skeptic`, and `sibling` — but zero notes have
ever used it, and it isn't even in the separate `HandwritingProfile`
system used elsewhere (`handwritingProfiles.ts`), suggesting it was
declared for the note-margin system specifically and then never
picked up. Its style rule already exists in `styleHelpers.ts`'s
`handwritingClass`: `"tracking-normal"` — the one hand with no
distinguishing letter-spacing at all, unlike every other hand, which
all have a deliberate signature (tight/black for coauthor, wide
tracking for archivist, tracking-tight italic for skeptic, wide for
sibling).

A hand with no distinguishing marks, paired with no `author` label
(unlike `skeptic`, which is unattributed in name but still tagged
`author: "skeptic"`), reads as a voice that doesn't commit to one fixed
identity — someone whose writing adapts to whoever might read it,
rather than asserting a consistent self the way every other hand in the
notebook does. That's a real, small addition to the "does it matter
whose memory got it right" / "if we write it nicer does that make it
less true" throughline already running through the notebook, without
touching the Eli chain or inventing a new named character.

Placement: `mara-boundary-right` ("name rewritten lighter") already
carries `mara-crossed-name`'s pressure-reveal, *"lighter is not the
same as kinder"* — a page already about presentation shifting for
someone else's benefit. A one-line chameleon note lands naturally next
to that, rather than as a disconnected insert elsewhere.

## Preservation Mechanism

One new `NotebookNote` entry in `notebookOne.ts`, added to
`mara-boundary-right`'s `noteIds` in `pages.ts`. No new components, no
new fields, no changes to `Note.tsx` or `styleHelpers.ts` — this only
uses machinery that already exists and has simply never been exercised.

## Handling Behavior

Renders exactly like any other margin note. No selection-state changes,
no contradiction-chain involvement, no pressure reveal (kept simple,
matching notes like `stop-saying-that` which also have none).

## Risk

- `mara-boundary-right` currently has 2 notes; adding a 3rd risks
  overflow on the fixed-height page shell (the marginalia bug earlier
  this session happened exactly this way). Must be checked live via
  `scrollHeight` vs. `clientHeight`, not assumed.
- Keep the line short — this is a one-beat addition, not a new
  character introduction. No name, no backstory, no connection to Eli.

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

**New note**, added to `mara-boundary-right`:
- id: `chameleon-first-note`
- variant: `margin`
- text: *"I write this different depending on who might read it."*
- handwriting: `chameleon`
- yearPhase: `early-adolescence`
- memoryPressure: `medium`
- (no `author`, no `authenticity`, no `pressureReveal` — deliberately)

---

## Implementation Notes

Added exactly as drafted: one new note in `notebookOne.ts`, wired into
`mara-boundary-right`'s `noteIds` in `pages.ts`. No component or
styling changes — both `handwritingClass`'s `"chameleon"` case and the
optional `author` field already existed and simply had never been
exercised.

Verified via `npm run check`, `npm run test:e2e` (all 5 specs), and a
live dev-server pass: navigated to spread 6/8 (`mara-boundary`),
confirmed the note renders with no author tag and `letterSpacing:
"normal"` (matching every other hand's distinct tracking, this is the
one with none). Measured `scrollHeight` vs. `clientHeight` on both
page shells directly (826px in an 898px shell, same as before adding
the note — no overflow) rather than assuming from a screenshot. No
console errors.

# Archive Route Smoke Check

## Purpose

This document records the current archive vertical slice routes and the expected manual verification flow before additional archive content is added.

This sequence is also automated end-to-end in `e2e/archive-route-smoke.spec.ts` (run via `npm run test:e2e`), with comments mapping back to the numbered steps below. Keep both in sync when routes or flows change.

## Core Routes

| Route | Purpose | Expected Result |
| --- | --- | --- |
| `/` | Landing threshold | Archive-first landing page with `Enter Archive` call to action |
| `/archive` | Main preservation environment | Archivist preface, archive desk, filters, artifacts, controlled reveals |
| `/archive/notebook-one-shared` | Shared notebook artifact route | Redirects to `/notebook` |
| `/notebook` | Notebook One reader | Notebook reader opens; user can set notebook down back to `/archive` |
| `/archive/flood-recovery-packet-001` | Flood recovery packet handling | Document handling view with recovery cluster, contamination review, archivist fingerprints, and cross-artifact relationship review |
| `/archive/mara-private-journal-fragment` | Private journal handling | Restricted/private handling view; remains sealed and not prepared for reading |
| `/archive/eli-interview-note` | Withdrawn document | In-world "Withdrawn At Request" handling note, distinct from the not-found state |

## Manual Smoke Sequence

1. Open `/`.
2. Confirm the landing page says `Enter Archive`, not `Open Notebook`.
3. Enter `/archive`.
4. Confirm the archivist preface appears on first/reset visit.
5. Select `begin handling archive`.
6. Confirm archive desk becomes interactable.
7. Confirm access filters change visible artifacts.
8. Trigger `Unresolved Wording`.
9. Return to archive.
10. Trigger `Partial Fragment`.
11. Return to archive.
12. Confirm archive handling resumes.
13. Pick up `Notebook One`.
14. Confirm `/archive/notebook-one-shared` redirects to `/notebook`.
15. Confirm `set notebook down` returns to `/archive`.
16. Pick up `Flood Recovery Packet — Box 1`.
17. Confirm recovery contamination sections render.
18. Confirm cross-artifact relationship review renders.
19. Confirm archivist fingerprints render.
20. Pick up `Mara — Private Journal Fragment`.
21. Confirm it remains sealed/restricted and does not expose readable journal text.
22. Use `reset handling` on `/archive`.
23. Confirm preface and reveal sequence can be replayed.
24. Navigate to `/archive/east-shore-shelter-map`.
25. Confirm the in-world archive handling note renders ("Material Not Located"), not a generic 404 page.
26. Confirm both "set object down" links return to `/archive`.
27. Repeat steps 24–26 with `/archive/council-meeting-fragments`.
28. Approach `Eli — Interview Note` from `/archive` (or navigate directly to `/archive/eli-interview-note`).
29. Confirm the in-world "Withdrawn At Request" handling note renders, distinct in wording from the "Material Not Located" state.
30. Confirm both "set object down" links return to `/archive`.

## Current Narrative Systems Covered

- Archive-first onboarding
- Archivist preface
- Persistent reveal progression
- Event registry
- Controlled reveal sequencing
- Partial legibility
- Artifact handling and set-down loop
- Access filters
- Differentiated document handling
- Flood recovery contamination
- Cross-artifact links
- Archivist fingerprints
- Private readability withholding
- In-world not-found handling for unindexed document routes
- In-world withdrawn-document handling, distinct from not-found

## Expansion Rule

Before adding more content, verify this smoke sequence still passes.

The archive should remain:
- readable
- navigable
- emotionally paced
- materially coherent
- resistant to becoming a generic lore browser

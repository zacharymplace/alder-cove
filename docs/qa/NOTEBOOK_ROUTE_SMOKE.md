# Notebook Route Smoke Check

## Purpose

This document records the current notebook vertical slice route and the
expected manual verification flow before additional notebook content is
added, mirroring `ARCHIVE_ROUTE_SMOKE.md` for the archive side.

This sequence is also automated end-to-end in
`e2e/notebook-route-smoke.spec.ts` (run via `npm run test:e2e`), with
comments mapping back to the numbered steps below. Keep both in sync when
routes or flows change.

## Core Routes

| Route | Purpose | Expected Result |
| --- | --- | --- |
| `/notebook` | Notebook One reader | Two-page spread with reader controls; user can set notebook down back to `/archive` |

## Manual Smoke Sequence

1. Open `/notebook` directly.
2. Confirm reader controls show `lay flat 1 / <total>` and `previous page` is disabled on the first spread.
3. Confirm the first spread's Eli note reads its default (recovered-layer) wording.
4. Select `original` on the memory-layer control.
5. Confirm the note now shows its original wording instead.
6. Select `reconstructed` on the memory-layer control.
7. Confirm the note now shows its reconstructed wording instead.
8. Select `recovered` again to return to the default wording.
9. Click the note to select it.
10. Confirm `preserved fragment` and the note's pressure-reveal line appear.
11. Click `lift page closer`.
12. Confirm the controls report `left page focus`.
13. Click `switch facing page`.
14. Confirm the controls report `right page focus`.
15. Click `lay flat`.
16. Confirm the controls return to `lay flat` mode.
17. Click `next page →`.
18. Confirm the spread index advances by one.
19. Click `← previous page`.
20. Confirm the spread index returns to the first spread.
21. Click `set notebook down`.
22. Confirm this returns to `/archive`.

## Current Narrative Systems Covered

- Two-page spread reading with focus/lift mode
- Memory-layer comparison (recovered / original / reconstructed wording)
- Note selection and pressure-reveal
- Spread navigation bounds

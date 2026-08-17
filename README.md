# Alder Cove

Alder Cove is a narrative artifact prototype: an island, ferry-dependent fishing
town where children build notebooks, maps, and rituals to protect each other
from "Going Salt" — the town's slow erosion of memory, identity, and future
selfhood. The player experiences this through a handled notebook and an
archive of preserved documents, not combat or traditional dialogue.

This is a narrative interface system, not a generic Next.js starter. Before
making changes, read:

- [`docs/design/ALDER_COVE.md`](docs/design/ALDER_COVE.md) — setting and tone
- [`docs/design/GAME_DOCTRINE.md`](docs/design/GAME_DOCTRINE.md) — core thesis and emotional design
- [`docs/design/NOTEBOOK_AUTHORING_RULES.md`](docs/design/NOTEBOOK_AUTHORING_RULES.md) — notebook artifact rules
- [`docs/design/ARCHIVE_ACCESS_AND_INSPECTION_STRUCTURE.md`](docs/design/ARCHIVE_ACCESS_AND_INSPECTION_STRUCTURE.md) — archive access model
- [`docs/design/ARCHIVE_PROGRESSION_DOCTRINE.md`](docs/design/ARCHIVE_PROGRESSION_DOCTRINE.md) — archive escalation structure
- [`docs/playtest/NOTEBOOK_VERTICAL_SLICE_REVIEW.md`](docs/playtest/NOTEBOOK_VERTICAL_SLICE_REVIEW.md) — current playtest findings

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Core routes:

| Route | Purpose |
| --- | --- |
| `/` | Archive-first landing page |
| `/archive` | Main preservation environment |
| `/archive/[documentId]` | Individual archive document handling |
| `/notebook` | Notebook One reader |

See [`docs/qa/ARCHIVE_ROUTE_SMOKE.md`](docs/qa/ARCHIVE_ROUTE_SMOKE.md) for the
manual verification sequence across these routes.

## Validation

```bash
npm run check          # lint + build (preferred before finishing any change)
npm run agent:preflight  # repo/environment sanity check
npm run release:ready   # release-readiness gate
```

## Working on this repo

This repo is a **Next.js 16 / React 19 project with breaking changes from
what you may expect** — see [`AGENTS.md`](AGENTS.md) before writing code
against unfamiliar APIs.

See [`CLAUDE.md`](CLAUDE.md) for the full operating rules, including the list
of protected areas (notebook geometry, archive access semantics, contradiction
chain logic, etc.) that require small, justified, validated changes rather
than broad rewrites.

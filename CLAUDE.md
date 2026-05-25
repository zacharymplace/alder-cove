@AGENTS.md

# Claude Operating Rules

## Project Purpose

Alder Cove is a narrative artifact prototype built around notebook realism, archive inspection, contradiction chains, hidden layers, memory drift, and atmospheric mystery.

Treat this repo as a narrative interface system, not a generic Next.js sandbox.

## Default Work Mode

Claude should act as a repo-native implementation agent.

Expected loop:

1. Read CLAUDE.md, AGENTS.md, README.md, and relevant docs before editing.
2. Inspect relevant files before editing.
3. Create the smallest useful patch.
4. Avoid unrelated cleanup.
5. Run validation.
6. Summarize changed files, validation results, risks, and next steps.

## Do Not Change Without Explicit Approval

- Notebook page geometry
- Two-page spread behavior
- Page dimensions or core layout framing
- Artifact realism
- Visual identity or atmosphere
- Typography/readability balance
- Hidden layer behavior
- Contradiction chain logic
- Memory drift / instability mechanics
- Archive access semantics
- Ethical boundary language
- Public route structure

## Protected Areas

Be especially careful with:

- src/components/notebook/NotebookSpread.tsx
- src/components/notebook/NotebookPage.tsx
- src/app/archive/page.tsx
- src/data/notebook
- src/data/archive
- src/data/private
- src/data/crossArtifact
- src/systems/notebook
- src/systems/archive
- docs/design
- docs/playtest
- package.json
- next.config.ts

Changes to these areas should be small, justified, and validated.

## Validation Commands

Preferred validation:

    npm run check

For release readiness:

    npm run release:ready

For agent preflight:

    npm run agent:preflight

## Commit Rules

- Use a branch for every change.
- Keep commits small.
- Do not push without explicit instruction.
- Do not rewrite Git history unless explicitly instructed.
- Do not mix unrelated fixes into the same patch.
- Leave the working tree clean after a completed task when possible.

## Product Judgment

When uncertain, prefer:

- artifact realism over convenience
- readable mystery over obscure cleverness
- stable page geometry over decorative novelty
- contradiction traceability over surprise reveals
- ethical archive boundaries over lore exposure
- small additive changes over broad rewrites

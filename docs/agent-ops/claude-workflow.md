# Claude Workflow

## Purpose

This document defines how Claude should be used inside Alder Cove.

Claude is best used for narrow implementation, validation repair, documentation parity, route hardening, and small interface refinements.

Creative direction, artifact tone, notebook geometry, archive ethics, and instability mechanics require explicit approval before edits.

## Good Claude Tasks

- Fix a failing check.
- Add validation scripts.
- Repair TypeScript type drift.
- Add a narrow archive or notebook data item from provided text.
- Improve docs to match implemented behavior.
- Add small inspection affordances without changing page geometry.
- Tighten route or state safety without changing story logic.

## Bad Claude Tasks

- Redesign the notebook.
- Change page geometry broadly.
- Rewrite the archive model.
- Alter contradiction chains without approval.
- Change instability or collapse behavior casually.
- Add decorative effects that reduce readability.
- Expose private/archive-withheld material without approval.

## Standard Prompt

Read CLAUDE.md, AGENTS.md, README.md, and relevant docs first.

Create or stay on a task branch.

Implement the smallest useful version of the requested change.

Do not change notebook geometry, visual identity, contradiction logic, instability mechanics, archive access semantics, or unrelated files.

Run:

    npm run agent:preflight
    npm run release:ready

Summarize:

- files changed
- validation results
- risks
- next recommended patch

Do not push unless explicitly asked.

# Dependency Policy

## Why this exists

AGENTS.md warns that this project tracks a Next.js version with breaking
changes from what training data expects. That warning only has teeth if the
pinning strategy behind it is deliberate and documented, not just whatever
`npm install` happened to produce. This records the actual policy.

## Exact-pinned (no `^`)

`next`, `react`, `react-dom`, `eslint-config-next`, `@playwright/test`, and
`vitest` are pinned to exact versions in `package.json`. These are the
packages whose behavior this project's own code, tests, and AGENTS.md
guidance are directly written against — an unreviewed version change here is
exactly the kind of surprise the breaking-changes warning exists to prevent.

`eslint-config-next` in particular should always match `next`'s version —
its lint rules are version-specific. Bumping one without the other is a bug,
not a style choice (this drifted once already: `next` moved to 16.3.1 while
`eslint-config-next` stayed on 16.2.5 until this was caught and fixed).

Bumping any of these is a deliberate action, not routine maintenance:

1. Check the target version's release notes for breaking changes.
2. Bump on its own branch, isolated from unrelated work.
3. Run `npm run check` and `npm run test:e2e` — both must pass clean.
4. Do a manual visual pass over `/`, `/archive`, `/notebook`, and `/about`
   in a live dev server, since automated coverage won't catch everything
   `AGENTS.md`'s API-surface warning is about.
5. Open its own PR, separate from feature work, so it can be reviewed and
   reverted independently.

See the `chore/next-16.3.1-security-bump` PR for a worked example of this
process.

## Caret-ranged (`^`)

Everything else (`clsx`, `framer-motion`, `zustand`, `tailwindcss`,
`eslint`, `@types/*`) uses a caret range. These are either narrow-surface
utility libraries or dev tooling with lower blast radius if a patch/minor
update shifts behavior slightly. `npm install` picking up in-range updates
for these is fine without the full ceremony above — just run `npm run check`
afterward.

## On automated update PRs (Dependabot, Renovate, etc.)

Deliberately not configured yet. An automated tool opening version-bump PRs
is only as good as what validates them, and this repo's GitHub Actions CI
does not currently run at all (tracked separately — see the open GitHub
support ticket about the account's automatic security review lock). Until
that's confirmed working, automated PRs would just accumulate unvalidated.
Revisit this once CI is confirmed running again; a PR-only (no auto-merge)
Dependabot config would be a reasonable next step at that point.

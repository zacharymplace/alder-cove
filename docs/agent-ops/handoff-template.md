# Claude Handoff Template

Read CLAUDE.md, AGENTS.md, README.md, and relevant docs first.

Task:
[Describe the exact change.]

Constraints:
- Keep the diff small.
- Do not change unrelated files.
- Do not change notebook geometry, page dimensions, two-page spread behavior, or layout framing.
- Do not change contradiction chains, hidden layers, memory drift, collapse, or instability mechanics unless explicitly required.
- Do not expose private or withheld archive material unless explicitly required.
- Do not add dependencies unless necessary and justified.

Validation:
- npm run agent:preflight
- npm run release:ready

Output:
- Summary
- Files changed
- Validation results
- Risks
- Next recommended patch

Do not push.

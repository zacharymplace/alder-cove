# Expansion Candidate: Flood Recovery Cluster Phase 3

## Artifact / System Type

- [ ] artifact
- [ ] reveal event
- [ ] document route
- [x] cross-artifact link
- [ ] progression stage
- [ ] ambient behavior
- [ ] private readability boundary
- [x] archivist fingerprint (existing system, new entries)

## Routes Touched

- /archive
- /archive/flood-recovery-packet-001
- /archive/mara-private-journal-fragment (cross-artifact relationship review only — no new readable content there)

## Smoke Checks Affected

From `docs/qa/ARCHIVE_ROUTE_SMOKE.md`:

- 18. Confirm cross-artifact relationship review renders.
- 19. Confirm archivist fingerprints render.
- 20-21. Mara's private journal stays sealed; no readable journal text (must remain true — the new link only touches the relationship review, not the sealed document itself).

## Emotional Purpose

Phase 1 made recovery physically unstable. Phase 2 made recovery labels contradict each other. Phase 3 should make the *archivist* unstable — the person doing the preserving starts to notice their own handling doesn't hold together, echoing the player's own fear system (Going Salt: "they can no longer distinguish memory from documentation").

Per `docs/design/ARCHIVE_PROGRESSION_DOCTRINE.md`, this is the "Archivist Instability" stage: not new facts about the flood, but the archivist's recursive handling becoming emotionally visible.

## Preservation Mechanism

Activates two dormant hooks already present in the type system but never used:
- `ArchivistFingerprint.markType`: `"uncertainty-grade"` and `"crossed-label"` are declared but have zero entries today.
- `CrossArtifactLink.relationship`: `"ethically-adjacent"` is declared but has zero entries today.

No new fragments, no new packet zones, no new UI. Purely archivist voice, layered onto documents that already exist.

## Handling Behavior

Unchanged. The player still approaches the packet through the existing document route; the new fingerprints and link render in the existing `ArchivistFingerprintReview` and `CrossArtifactRelationshipReview` sections with no new interaction model.

## Risk

Phase 2's own risk notes apply again, plus one new one specific to this stage:
- Avoid solving the mystery, overexplaining the flood, or making the archivist sound omniscient (same as Phase 2).
- Avoid turning contamination into puzzle logic (same as Phase 2).
- **New risk: making the archivist's instability legible as a clean character arc rather than an unresolved wound.** The archivist should sound frightened and uncertain about their own reliability — not self-aware in a tidy, narratively satisfying way. No confession, no resolution, no "I finally understand what happened to me."

## Decision

- [x] build now
- [ ] defer
- [ ] reject

---

## Draft Content (for review before implementation)

### Two new archivist fingerprints, both `documentId: "flood-recovery-packet-001"`

**`fingerprint-flood-004`** — `markType: "uncertainty-grade"`
- label: `uncertainty regraded`
- text: *"Confidence lowered a second time. First grading assumed good faith. Second grading did not."*
- emotionalLeak: *"I keep grading my own memory of handling this packet, not just the packet."*

**`fingerprint-flood-005`** — `markType: "crossed-label"`
- label: `label crossed out`
- text: *"Original grouping label crossed through and rewritten in my own hand, dated the same day."*
- emotionalLeak: *"I do not remember deciding to change it."*

### One new cross-artifact link

**`link-flood-mara-002`**
- from: `flood-recovery-packet-001` → to: `mara-private-journal-fragment`
- relationship: `ethically-adjacent`
- confidence: `medium`
- note: *"Recovery placed this packet close enough to private material that handling one now implicates handling the other."*

This is a *second*, distinct link between the packet and Mara's journal (the existing `link-flood-mara-001` — "recovered-beside", low confidence — stays as-is). Two links between the same pair, each naming a different kind of relationship, mirrors the packet's own conflicting-label problem: multiple simultaneously true framings of one physical fact, none of them fully resolving the others.

### Why this size and no more

Three new data entries, no new components, no new visual zones. Deliberately smaller than Phase 2 (which added four cluster entries) — the emotional register here is quieter and more internal, and stacking more entries risks exactly the density problem Phase 2's own risk section flagged.

---

## Implementation Notes

Phase 3 added, exactly as drafted above:
- `fingerprint-flood-004` (uncertainty-grade) and `fingerprint-flood-005` (crossed-label) in `src/data/archivist/fingerprints.ts`
- `link-flood-mara-002` (ethically-adjacent) in `src/systems/archive/crossArtifactLinks.ts`

No component changes. Verified via `npm run check`, `npm run test:e2e`, and a manual pass over both `/archive/flood-recovery-packet-001` and `/archive/mara-private-journal-fragment`: both new fingerprints and both links (old and new) render correctly, and Mara's journal remains fully sealed with no readable content exposed.

This phase should be evaluated against smoke checks 18–21.

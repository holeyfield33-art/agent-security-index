# Architecture Note 001: editorial review

Status: local review draft on `research/reference-not-authority`. No release authorized.

Preview: http://127.0.0.1:8081/#/research/reference-not-authority

## Changes

- Added responsive, native HTML figures for issuance, the trusted control loop, and separate compute/disclosure decisions. Text and captions remain accessible without interpreting color.
- Put the trust conditions beside the opening claim.
- Clarified T3's computation scope: trusted ingestion and Gate registration also handle protected data. The invariant still excludes planner plaintext access; it does not pretend registration is plaintext-free.
- Qualified lineage binding on complete mediation and an intact trusted runtime.
- Labeled threat severities as provisional prioritization judgments.
- Replaced the unsupported implication of completed adversarial review with an explicit adversarial threat model.
- Added synthetic fixtures, reproducibility records, an authorized control case, and a distinction between untested cases and passes to Experiment 001.
- Moved the red-team statement to the actual close.
- Preserved all ten implementation threats in the publication regression check and corrected the architecture card's article link label.

## Research recommendation

Build Experiment 001 as a small, explicitly experimental implementation. Public development and experimental maturity are compatible: publish the scope, versioned harness, results, failures, and unresolved questions. Use synthetic data. Start with a scripted adversarial planner, one operation, and the stated single-machine process model; a model integration can follow after the boundary is measurable.

Passing a finite suite provides evidence under a specific configuration, not a production security guarantee. Independent reproduction and an expanded threat model are subsequent research steps, not claims to attach to the initial note.

## Review boundary

The article is architecture research, not an implementation result or a novelty proof. This edit does not establish that a trusted worker can enforce every intended restriction. The next scientific contribution is a reproducible result against T1–T5, including negative results.

The existing GitHub Actions run 35157404173 did not start: its annotation reports that the account is locked due to a billing issue. That external CI blocker remains separate from local checks. PR #2 was verified as draft during this review.

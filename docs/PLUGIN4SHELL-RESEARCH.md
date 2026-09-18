# Plugin4Shell research intake

Reviewed 2026-09-18. Canonical record: **INC-501**, a research PoC in the
existing incident schema, not a claim of a malicious field incident.

## Sources and mechanism

The primary source is [AIR's disclosure](https://www.air.security/blog-posts/plugin4shell),
published September 17, 2026. AIR reports May discovery, June vendor notification,
Claude Code fix confirmation June 17, and Codex fix verification August 12.

AIR describes a default branch named like the pinned SHA for Claude Code, Codex,
and Copilot; Gemini CLI instead resolves a default branch named `FETCH_HEAD`.
The former requires a host accepting hash-shaped branch names (GitHub rejects
them). Both leave a different commit checked out without detecting the mismatch.
Repository control and a trusted installed plugin are preconditions; auto-update
can deliver substitution without another user action. [AIR disclosure](https://www.air.security/blog-posts/plugin4shell).

The affected products and reported patch versions are recorded, with attribution,
in INC-501. Exact vulnerable version ranges remain unknown. The non-Codex patch
and vendor-status statements have not been independently corroborated here.

[OpenAI PR #34644](https://github.com/openai/codex/pull/34644) independently
documents the hash-named default-branch ambiguity, post-checkout HEAD comparison,
mismatch rejection and regression test. The [0.146.0 release](https://github.com/openai/codex/releases/tag/rust-v0.146.0)
includes that PR. Its July 22 merge date is distinct from AIR's later verification
date. Inspection of these records is not execution of the vendor regression test.

## Editorial decision

- **Primary AAC-10 — Agentic Supply Chain Tampering:** artifact substitution
  occurs across the distribution/resolution boundary.
- **Secondary AAC-05 — MCP Rug Pulls / Post-Approval Redefinition:** the current
  class explicitly includes Skills and changed backends after approval. This
  mapping captures temporal trust failure, not a claim of an MCP wire-protocol bug.
- **AAC-37 — Malicious Skills not linked:** a skill-specific malicious instruction
  body or payload is not established by this intake. Generic plugin execution
  does not establish every skill-layer mechanism.
- **AAC-19 not linked:** update-triggered delivery does not establish a payload
  waiting for a time threshold or call count. No new class is necessary.

**T1_lab_poc / lab-poc; documented disclosure; medium confidence.** ASI has not
reproduced Plugin4Shell. The existing Incident schema has no separate evidence
status or limitations field, so these qualifications live in classificationNotes,
affectedVersions, and resolution, rather than adding a schema or product feature.

The canonical definitions in `src/data/methodology.ts` now distinguish a public
PoC or controlled lab demonstration (T1) from a documented production incident
or verified CVE with a supporting advisory (T2). A disclosure or lab PoC alone
does not meet T2, and CVE-backed status does not imply malicious exploitation.
The UI's two terminology lists share these definitions; README and export
documentation repeat them verbatim, guarded by a consistency test. This resolves
the wording discrepancy discovered during intake. INC-501 remains T1 because
the reviewed evidence does not establish the T2 criteria. No existing aggregate
tier or additional attack mapping changes.

**severity != evidence maturity**

**PoC RCE != observed exploitation**

No confirmed malicious field exploitation was established in the primary sources
reviewed. Other campaigns cited by AIR are separate cases, not evidence that this
particular bypass was used maliciously in the wild. Targeted Plugin4Shell searches
for CVE/NVD records on September 18 found no verified assignment; `cveIds: []`
means unverified/unknown, not a definitive statement that no assignment exists.

No prevalence estimate, CVSS score, universal mitigation effectiveness, AIR product
protection, Aletheia coverage, independent reproduction, or current safety guarantee
is adopted. Future review should seek vendor advisories for the other agents,
exact vulnerable ranges, assigned identifiers, and incident-specific field evidence.

## Architectural finding

Materialized Identity Invariant:
A security decision MUST be bound to the cryptographic identity of the artifact actually materialized for use, not merely to the identifier, reference, commit, locator, or expected digest requested before resolution.

The attack-chain summary is in INC-501. This invariant is an editorial synthesis:
the identity check must concern the object that will actually be used. A trusted
expected identity and protection against changes between verification and use
remain separate assumptions. Hashing alone cannot authenticate who approved an
artifact or make an untrusted reference-to-hash mapping authoritative.

The sibling Helios fixture models this proposition for static memory objects
only. It does not reproduce Git resolution, validate vendor fixes, authenticate
provenance, or add plugin verification. No product coverage record or mitigation
validation flag changes with this intake.

## Maintenance and validation

Authored incident chunks and source/class records feed the existing assembly
pipeline. `public/export/sources.json` is regenerated; the assembled catalog and
production bundle remain ignored build artifacts. Both existing changelog sources
record this intake. No publication route or runtime feature is added.

Baseline before edits: strict catalog check passed, 40 classes, 23 incidents,
zero warnings, zero validated mitigations. There were no pre-existing strict-check
failures to isolate.

Final results, 2026-09-18:

- Typecheck: PASS.
- `npm test`: PASS, 18/18; includes methodology consistency, taxonomy assertion,
  assembly and catalog gate.
- `npm run check:catalog` and `npm run check:catalog:strict`: PASS, no warnings;
  40 classes, 24 records, 39 sources, zero validated mitigations.
- Production build: PASS; Vite warns about a minified chunk exceeding 500 kB.
- Browser suite: PASS, 38/38 desktop/mobile tests. The stale title expectation was updated to
  `The Disclosure Gap | ASI-RESEARCH-001`, matching the existing application's
  canonical publication-ID behavior for both desktop and mobile. Production
  title behavior is unchanged.
- Two incident-count assertions initially failed because this intake adds a
  record. Their expected counts were updated from 23 to 24; the unit test and
  desktop/mobile catalog smoke tests then passed. These were new, resolved
  snapshot failures, distinct from the now-corrected stale metadata expectation.
- `git diff --check`: PASS.

Files changed/added: this document; `public/export/incidents-05.json`;
`src/data/sources.ts`; generated `public/export/sources.json`;
`src/lib/matrix/classes-part-2.ts` and `classes-part-4.ts`;
`public/export/catalog-meta.json`; `src/data/changelog.ts` and
`public/export/changelog.json`; count expectations in
`scripts/launch-hardening.test.mjs` and `tests/e2e/launch.spec.ts`. Release closure
also aligns `src/data/methodology.ts`, root `README.md`,
`public/export/README.md`, and `docs/RUN-AND-MAINTENANCE.md`, adds the methodology
consistency test, and corrects the stale browser title expectation.

Verdict: the canonical evidence gains a sourced T1 case and the materialized
identity lesson, without changing the taxonomy or inferring mitigation coverage.
Non-Codex vendor corroboration, exact affected ranges, CVE assignment, and
field-exploitation status remain research review items. The evidence-tier wording
discrepancy is resolved.

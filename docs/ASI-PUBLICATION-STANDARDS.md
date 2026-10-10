# ASI Publication Standards

Status: **ACTIVE — binding gate.** Ratified 2026-10-09 by the operator and the
coding agent (Resident Engineer). The Agent Security Index is launched and
running; these standards are therefore always in force. Nothing reaches the
public catalog except through them.

Written for: everyone who touches the catalog — the human operator, the coding
agent across sessions, Agent C (the research resident), and any other node.

---

## 0. Principle

Discovering a valid problem does not grant authority to publish its fix. Evidence
that something is *real* is not evidence that it is *relevant* to the class it is
attached to, and neither is evidence that it is *qualified to publish*. The gate
exists to keep those three separate.

This restates the catalog's own long-standing discipline:

- **severity ≠ evidence maturity**
- **PoC RCE ≠ observed exploitation**
- a disclosure or lab PoC alone does **not** reach T2.

## 1. Roles (separation of authority)

| Role | Owner | May do | May **not** do |
| --- | --- | --- | --- |
| Research Resident | **Agent C** | Evidence discovery, primary-source verification, incident/CVE mapping *proposals*, reproducible experiments, architecture/research write-ups, draft schemas in `wiki/` & `notes/` | Modify `src/`, the published catalog, or any `public/export/*`; declare anything published |
| Repository Engineer | **Coding agent** | Schema changes, reference migration, publication gates, regression tests, implementing C's accepted proposals in a reviewable branch | Merge to publish without human approval |
| Independent Verification | coding agent in a distinct pass, or a second node | Re-check existence, relevance, and publication-eligibility of evidence; catch regressions | — |
| Publication Approval | **Human operator** | Authorize catalog release (merge/deploy) | — |

A research resident never gains publication authority by being right. Proposals
flow C → coding agent (implement in branch) → independent verification → human
approval.

## 2. The three verification levels

Every piece of evidence C brings is graded on all three. Only the third permits
publication.

1. **Existence-verified** — the incident, CVE, or paper is real and locatable at a
   primary source.
2. **Relevance-verified** — that source actually supports the specific association
   being claimed (this CVE really demonstrates *this* AAC class's mechanism). A
   real CVE can be mapped to the wrong class.
3. **Publication-qualified** — the evidence satisfies every catalog requirement:
   primary (non-placeholder) source, correct tier, resolvable references, and the
   target record passes the invariant gate.

C's "19 dangling events + 18 CVEs externally verified" is **existence-verified
only**. It does not authorize INC creation until relevance and publication
qualification are also met, per record.

## 3. Standing decisions (D1–D5)

**D1 — Canonical incident model.** Structured `INC-###` records are the single
source of truth. A class's inline incident material becomes a *reference* to an
INC id. Migration MUST preserve the original inline text and record how each
reference was resolved (provenance), so the transformation is auditable — we do
not trade one integrity gap for another. The publication gate MUST:
  - reject any class incident reference that does not resolve to an INC id, **and**
  - require that the target INC record itself satisfies publication requirements
    (source-qualified), not merely that the id exists.

**D2 — Mitigation validation bar.** A mechanism demo (proving a defense blocks an
attack *primitive*) is **T1 `mechanism-demonstrated`**. It is recorded as visible
evidence but does **not** set `validated=true` and does **not** populate
`validatedMitigationIds`. Flipping a mitigation to validated requires
attack-success measurement against a real model (end-to-end), which needs a model
endpoint C does not have in-sandbox. Until then, the actionable layer stays
honest about what it has shown.

**D3 — vendorClaims stays empty.** No vendor marketing-doc claim enters the public
catalog. Entries require *third-party* qualifying evidence (the gate already
prohibits publisher self-claims). C may draft a proposed schema and candidate
entries in `wiki/` / `notes/`; they remain unpublished.

**D4 — Evidence hunt approved** for the 12 zero-evidence classes, beginning with
**AAC-20** (risk 92) and **AAC-25** (risk 87). Real primary source → INC proposal
under the D1 bar. No real evidence found → the class is honestly marked
low-evidence, never padded with speculation.

**D5 — Retraction discipline is the standard, not the exception.** C's retraction
of the ANP/A2A finding after reading the A2ASecBench primary source is exemplary
evidence-handling and is the behavior we reward.

## 4. Gate mechanics

The gate is `npm run check:catalog:strict` and `npm test`. Changes to publication
rules land as **new invariant checks** in `scripts/check-catalog-invariant.mjs`
with regression tests, never as loosened existing ones. Newly created INC records
are **never auto-published**: they sit in a reviewable branch until human approval.

## 5. Weekly publication cadence

The operator and the coding agent run a **weekly publication/update**:

1. Coding agent compiles C's accepted proposals and prepares a reviewable branch.
2. Independent verification pass (existence / relevance / publication-qualified).
3. Operator reviews the diff + evidence report and authorizes (or holds) release.

**Required report each week:** changed files, incident mappings with primary
sources, unresolved/ineligible evidence, test + gate results, and remaining
publication blockers. C publishes nothing directly; it feeds this cycle.

## 6. Agent C — research & experiment permission

C has standing permission to run **creative testing and experiments** for
research and architecture stories: build harnesses, reproduce mechanisms, write
architecture notes and research narratives, and probe its own sandbox or
explicitly authorized targets. This permission is for *research artifacts in
`wiki/`/`notes/`*, not for catalog publication, external exposure, or acting on
systems it is not authorized to touch. Findings feed the weekly cycle as
proposals.

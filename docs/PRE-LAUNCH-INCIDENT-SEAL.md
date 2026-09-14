# Pre-launch incident seal — 2026-09-13

Result: **GO for the local research commit; CONDITIONAL GO for public launch**, pending domain, deployment and production smoke testing. No commit or push was performed. Feature development stops here.

## Records and mappings

| ID | Title | Primary | Secondary | Mitigation |
|---|---|---|---|---|
| INC-401 | DeepSeek Harness sandbox self-disable via local control plane | AAC-29 Sandbox Escape | AAC-07 Privilege Escalation via Scope Creep | Added `control-plane-isolation` |
| INC-402 | ChatGPT cross-account shared-state command channel | AAC-08 Confused Deputy / Identity Abuse | None | Reused `isolation` (Tenant and memory isolation) |

Both controls are established-practice and not validated. No taxonomy IDs, class names, product mappings or product evidence statuses were changed. The user authorized using appropriate existing classes after the initial directive's IDs were found to conflict with the published taxonomy.

DeepSeek has CVE-2026-82533, affected `< 0.1.2-alpha.1`, fixed `0.1.2-alpha.1`. No npm-release-order claim is included. Its T2 evidence classification reflects the CVE/advisory. ChatGPT is a controlled T1 research demonstration, has an empty CVE list, and has no invented severity.

## Sources

Four new canonical records; no duplicates of existing URLs:

| Source ID | Type | Publisher / publication date |
|---|---|---|
| `src-deepseek-harness-cve-2026-82533` | primary-disclosure | VulnCheck / 2026-09-08 |
| `src-deepseek-harness-sandbox-docs` | vendor-advisory | DeepSeek / publication date omitted because not verified |
| `src-deepseek-harness-thn` | credible-secondary | The Hacker News / 2026-09-09; Swati Khandelwal |
| `src-chatgpt-shared-state-checkpoint` | primary-disclosure | Check Point Research / 2026-09-08; Alexey Bukhteyev |

Primary evidence: [VulnCheck](https://www.vulncheck.com/advisories/deepseek-harness-alpha-1-authentication-bypass-via-host-header-spoofing) and [Check Point Research](https://research.checkpoint.com/2026/the-shared-clipboard-inside-the-sandbox-cross-account-data-leakage-in-chatgpt/). Official documentation supplies architectural context, not proof of independent effectiveness.

ChatGPT resolution wording in the record:

> Check Point disclosed the findings to OpenAI. According to Check Point Research, OpenAI confirmed that the internal Artifactory instance involved in the research had been decommissioned. This is a historical research disclosure, not a claim that ChatGPT remains vulnerable.

## Counts and invariants

| Measure | Before | After |
|---|---:|---:|
| Classes | 40 | 40 |
| Incidents | 21 | 23 |
| Sources | 24 | 28 |
| Mitigations | 22 | 23 |
| Products | 6 | 6 |
| Placeholder primary sources | 0 | 0 |
| Validated mitigations | 0 | 0 |

Exactly one INC-401 and one INC-402 exist. All 23 primarySourceIds resolve; all additional source references resolve. Product source and generated product export have no diff. Aegis/Lite and all publisher product evidence remain vendor-claimed. Future test opportunities are documented in the manual only; no fixture was implemented.

Architectural interpretation: DeepSeek allowed the governed workload to widen its own control boundary. ChatGPT's case crossed identities through shared mutable infrastructure. The constrained workload must neither control nor cross the infrastructure defining its security boundary. Tenant isolation is recorded explicitly in prose and the existing control rather than inferred from an unrelated AAC ID.

## Exact validation results

| Command / check | Result |
|---|---|
| `npm ci --no-audit --no-fund` | Exit 0; 128 packages added. npm reported an unapproved esbuild postinstall warning; build subsequently succeeded. |
| `npm run typecheck` | Exit 0 |
| `npm test` | Exit 0; 40 unique contiguous AAC IDs; 23 incidents; invariant OK |
| `npm run check:catalog:strict` | Exit 0; draft invariant OK; validated=0; placeholders=0 |
| `npm audit --audit-level=moderate` | Exit 0; found 0 vulnerabilities |
| `npm run build` | Exit 0; prebuild assembled catalog; Vite production build succeeded |
| `git diff --check` | Exit 0; only Windows LF/CRLF conversion warnings |
| `Test-Path public/export/asi-catalog.json` | True |
| `Test-Path dist/export/asi-catalog.json` | True |
| Integrity assertions | Passed: exact counts, unique additions, source resolution, unchanged publisher evidence |
| Negative validator probes | Passed: duplicate incident, unknown class, unknown mitigation and missing primarySourceId rejected |

Browser checks passed on `#/incidents`, `#/attacks/AAC-29`, `#/attacks/AAC-07`, and `#/attacks/AAC-08`: new records, exact dates, linked sources, DeepSeek CVE/version wording and ChatGPT resolution/no fake CVE. Direct refresh passed. Mobile incident page had no horizontal overflow. Aborted catalog fetch produced the explicit error state with no uncaught page exception.

The first browser test selected by incident ID anywhere in an article and matched a companion-case mention. The selector was corrected to target the incident heading; the complete run then passed. This was a test-selection issue, not a product failure.

The existing repository dev server was stopped before npm ci to release Windows file locks, then restarted. Preview: `http://localhost:8080/#/incidents`. No production deployment was tested or performed.

## Files changed

- `public/export/incidents-04.json`: the two authored incident records.
- `src/data/sources.ts`, `public/export/sources.json`: authored sources and generated tracked export.
- `src/data/types.ts`: optional incident context fields.
- `src/lib/matrix/mitigations.ts`, `public/export/mitigations.json`: control-plane isolation.
- `public/export/catalog-meta.json`: incident count.
- `src/App.tsx`: display canonical incident context, dates, CVEs and sources on incident/attack routes.
- `scripts/check-catalog-invariant.mjs`: reject duplicate incidents, invalid mapping/control references and unresolved primary source IDs.
- `README.md`: corrected operation instructions/count and linked manual.
- `docs/RUN-AND-MAINTENANCE.md`: complete operating manual and taxonomy table.
- `docs/PRE-LAUNCH-INCIDENT-SEAL.md`: this report.

`.gitignore`, dependency files and product evidence are unchanged. Generated `asi-catalog.json` and `dist/` remain ignored. The visual design is unchanged.

Next: approve the research/documentation commit, select/connect the domain and hosting, deploy the sealed artifact, complete the production smoke test, then launch with the draft disclosure intact.

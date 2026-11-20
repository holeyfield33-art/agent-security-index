# Mother-ship CWE-22 intake (draft, pending review)

Status: **draft proposals only.** These records must not be merged or deployed
until a human authorizes publication. Mother-ship does not publish into ASI.

Proposed incidents (2026-11-19), selected from the public Mother-ship
CWE-22 export (`export/mothership-catalog.json`, 503 eligible records):

| ID | Product | Primary source | AAC | Tier |
| --- | --- | --- | --- | --- |
| INC-502 | excel-mcp-server | https://github.com/haris-musa/excel-mcp-server/security/advisories/GHSA-j98m-w3xp-9f56 | AAC-17 | T1_lab_poc |
| INC-503 | SiYuan MCP `asset.upload` | https://github.com/siyuan-note/siyuan/security/advisories/GHSA-p23f-cm6q-2qp8 | AAC-17 | T1_lab_poc |
| INC-504 | LiteLLM Skills archive extraction | https://github.com/BerriAI/litellm/security/advisories/GHSA-5jmr-gcrj-2c9q | AAC-17 | T1_lab_poc |

All three are MCP or agent-tooling filesystem-boundary failures that match
AAC-17 (Filesystem Escape / Path Traversal). They are advisory-backed, not
field incidents. See each record's `classificationNotes`.

A fourth CWE-22 MCP finding, Google MCP Toolbox HTTP tool path-parameter
escape (CVE-2026-11720, https://github.com/advisories/GHSA-vwxw-jrg6-9jxv),
was **not** drafted: the mechanism is HTTP path-scope escape to unintended
endpoints with forwarded credentials, not filesystem escape, so an AAC-17
mapping would not be honest.

## Independent review checkpoint (2026-11-20)

Publication status: **HOLD**. This draft does not authorize merge or deployment.

- **INC-502:** The primary advisory includes a public demonstration and reported
  test results, supporting a source-attributed T1 label. ASI has not reproduced it.
- **INC-503:** The primary advisory includes a PoC tool-call example and static
  code-path analysis. Its T1 label means a *reported* PoC, not ASI reproduction.
  The advisory explicitly identifies this as a residual omission from the
  earlier CVE-2026-66012 remediation. Do not conflate that earlier remediation
  with a later, unrelated SiYuan advisory or assert an unverified v3.8.7 fix.
- **INC-504:** The vendor advisory confirms CWE-22, affected versions, patch,
  and an authenticated archive-upload route. The reviewed advisory alone does
  **not** document a public executed PoC or benchmark. T1 qualification remains
  unresolved; either attach a qualifying public demonstration or revise the
  evidence representation through a separately reviewed methodology decision.

Repository verification on 2026-11-20: the ASI PR head had a GitHub Actions
`catalog` workflow with conclusion **failure** (run 44809591595); Vercel
status was success, which is not a substitute for the catalog gate. Job logs
were unavailable from the GitHub log endpoint. Do not merge until the failed
workflow is diagnosed and passes on the final commit, and the evidence-tier
question above is resolved. MOTHERSHIP PR #7 has no observed PR-triggered
workflow runs on the checked head; its reported local tests are not an
independent CI verification.

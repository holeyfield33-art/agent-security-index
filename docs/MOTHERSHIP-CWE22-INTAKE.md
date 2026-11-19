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

# External-first product seal — 2026-09-14

GO for the local commit. Production remains conditional on deployment, domain/HTTPS and production smoke tests. Nothing committed, pushed or deployed.

## Public product reset

Removed authored products aletheia-runtime-firewall, aletheia-aegis-provenance and aletheia-lite. Their routes return Product not found. Cleared both JSON and TypeScript Aletheia vendor claims; the inconsistent Lite mappings were removed, not reconciled or strengthened. Git history retains historical records; no fixture archive is exported.

The six public products are:

1. Promptfoo Red Teaming
2. Check Point AI Guardrails
3. Invariant MCP-Scan
4. NVIDIA NeMo Guardrails
5. LlamaFirewall (Meta)
6. Amazon Bedrock AgentCore Policy + Guardrails

Public UI count: 6 → 6. Catalog product count: 6 → 6. Composition: 3 external + 3 publisher → 6 external + 0 publisher. Vendor claims: 2 → 0. Sources: 28 → 36. Classes/incidents/mitigations remain 40/23/23.

## New mappings

| Product | AAC | Coverage | Evidence |
|---|---|---|---|
| NVIDIA | AAC-11 | partial | documented |
| NVIDIA | AAC-38 | partial | documented |
| Meta | AAC-01 | partial | documented |
| Meta | AAC-28 | adjacent | documented |
| Meta | AAC-38 | adjacent | documented |
| AWS | AAC-01 | partial | documented |
| AWS | AAC-07 | partial | documented |
| AWS | AAC-38 | partial | documented |

These are ASI interpretations of official documentation, not independently validated effectiveness. NVIDIA AAC-01 was not inferred from code/SQL/template detection.

NVIDIA limitations: opt-in, experimental IORails tool rails; engine/wire-format and configuration constraints; defense in depth; tool validation is not complete authorization; model-path rails do not cover all tool misuse/output injection. Wider NeMo Platform features are not attributed to the library.

Meta limitations: no general authorization kernel; integration/orchestration dependence; experimental Agent Alignment Checks; detection does not replace least privilege or external policy. CodeShield is static analysis, not execution containment. The official announcement explicitly supports risky plug-in interaction relevance.

AWS limitations: AWS/AgentCore-specific; probabilistic Guardrail detection; deterministic policy depends on configured rules; gateway routing, IAM, context fields and regions matter. AgentCore Policy and Bedrock Guardrails are described as separate controls.

Deployment uses existing schema values local/self-hosted or cloud. Library, open-source and AWS-specific scope are described without expanding the schema. Empty mitigation lists are intentional where no existing control accurately matches the narrow documented capability.

## Canonical sources added

- `src-nvidia-agentic-security`: [Agentic Security — NeMo Guardrails Library](https://docs.nvidia.com/nemo/guardrails/configure-guardrails/guardrail-catalog/agentic-security); vendor-advisory; NVIDIA; publication date omitted; accessed 2026-09-14.
- `src-nvidia-tool-calling`: [Tool Calling — NeMo Guardrails Library](https://docs.nvidia.com/nemo/guardrails/configure-guardrails/guardrail-catalog/tool-calling); vendor-advisory; NVIDIA; publication date omitted; accessed 2026-09-14.
- `src-nvidia-guardrail-catalog`: [Guardrail Catalog — NeMo Guardrails Library](https://docs.nvidia.com/nemo/guardrails/configure-guardrails/guardrail-catalog); vendor-advisory; NVIDIA; publication date omitted; accessed 2026-09-14.
- `src-meta-llamafirewall-research`: [LlamaFirewall: An open source guardrail system for building secure AI agents](https://ai.meta.com/research/publications/llamafirewall-an-open-source-guardrail-system-for-building-secure-ai-agents/); academic-paper; Meta; published 2025-04-29; accessed 2026-09-14.
- `src-meta-protection-tools`: [Sharing new open source protection tools and advancements in AI privacy and security](https://ai.meta.com/blog/ai-defenders-program-llama-protection-tools/); vendor-advisory; Meta; published 2025-04-29; accessed 2026-09-14.
- `src-aws-agentcore-policy-ga`: [Policy in Amazon Bedrock AgentCore is now generally available](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/); vendor-advisory; Amazon Web Services; published 2026-03-03; accessed 2026-09-14.
- `src-aws-guardrails-policy`: [Guardrails in policies — Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy-guardrails-in-policies.html); vendor-advisory; Amazon Web Services; publication date omitted; accessed 2026-09-14.
- `src-aws-agentcore-faq`: [Amazon Bedrock AgentCore FAQs](https://aws.amazon.com/bedrock/agentcore/faqs/); vendor-advisory; Amazon Web Services; publication date omitted; accessed 2026-09-14.

## Existing profile revalidation

All eight existing product-source URLs resolved, including redirects. Reviewed product/access dates are 2026-09-14; incident-source dates were not advanced.

Promptfoo's MCP page explicitly lists metadata injection and system-information leakage; existing adjacent testing mappings remain. Memory and goal/tool-misuse tests are documented. Runtime prevention is not inferred.

Check Point's Guard API documentation supports configurable prompt/output/tool screening, DLP and system-prompt detection. Existing limited mappings remain documented.

Invariant's repository now redirects to Snyk Agent Scan. Profile and source disclose this lineage and release-specific scope. AAC-05 was removed because reviewed current documentation did not establish descriptor-drift/rug-pull detection. AAC-03/AAC-10/AAC-14 remain adjacent scanning/discovery mappings with repository evidence.

## Validation

| Command | Result |
|---|---|
| npm ci --no-audit --no-fund | Exit 0; 128 packages; existing esbuild script-approval warning |
| npm run typecheck | Exit 0 |
| npm test | Exit 0; taxonomy/catalog checks and 5 new product tests passed |
| npm run check:catalog:strict | Exit 0; placeholders=0 |
| npm audit --audit-level=moderate | Exit 0; 0 vulnerabilities |
| npm run build | Exit 0 |
| git diff --check | Exit 0; only LF/CRLF notices |

Both catalog artifact existence checks returned True. Public/dist combined catalogs and split product exports match. Public products=6; publisher products=0; vendorClaims=0. Evidence references resolve.

Assembly and validation reject publisher profiles/claims. Public coverage requires documented, third-party-evaluated or reproduced status with sources; zero coverage rows are permitted. Tests cover the exact release set, source/class/control references, prohibited scores/publisher data, duplicate IDs, missing evidence and empty/unknown coverage. No promotion of unknown coverage occurs.

Browser checks passed at 1440px and 390px: home and directory counts, all six detail routes and evidence anchors, all three removed routes, Methodology, AAC-01/AAC-11/AAC-28/AAC-38, no publisher-product links on attack pages, no console/page exceptions, and no external-detail overflow. Mobile directory screenshot was visually reviewed. Browser-only zero-coverage fixtures showed “No mapped coverage yet.” on directory and detail; authored data was untouched.

No attack-related product list currently exists; no second list or ranking UI was introduced. Methodology and trust-positioning language are preserved.

## Files changed

- src/data/products.ts, src/data/sources.ts
- src/data/vendor-claims.ts, src/data/catalog-meta.ts
- public/export/vendor-claims.json
- public/export/products.json, public/export/sources.json (regenerated)
- src/App.tsx
- scripts/assemble-catalog.mjs, scripts/check-catalog-invariant.mjs
- scripts/public-products.test.mjs, package.json
- README.md, docs/RUN-AND-MAINTENANCE.md
- docs/EXTERNAL-FIRST-PRODUCT-SEAL.md

Ignored asi-catalog.json and dist/ were regenerated. Ignore rules, lockfile, taxonomy, methodology and incidents are unchanged. Removed records remain recoverable in Git history.

Local preview: http://localhost:8080/#/products while dev is running. Production was not observed or deployed. After deployment, verify the live catalog endpoint returns JSON containing exactly the six external IDs, zero publisher products and no publisher vendor claims. Local dist verification is not a production check.

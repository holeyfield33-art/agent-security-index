# ASI run and maintenance manual

Repository: `holeyfield33-art/agent-security-index`  
Reviewed: 2026-09-14
Publication status: `0.2.0-draft`; independent review remains pending.

## 1. Operating contract

ASI is a static React/TypeScript research publication built by Vite. It has no backend, database, authentication service, or production application server. Deploy the complete `dist/` directory. The browser loads incident records from `/export/asi-catalog.json` and uses hash routes.

The sealed data set contains 40 attack classes, 23 incidents, 28 sources, 23 mitigations, and 6 product profiles. No mitigation is marked validated. Publisher product evidence remains vendor-claimed. These are snapshot counts, not permanent validation targets for future authorized research additions.

Source existence is not source quality. A working URL does not demonstrate that a product prevents an attack. Public availability does not make this draft independently reviewed or certified.

Trust positioning is authored in `src/data/methodology.ts`: ASI's publication role, product decision-use guidance, layered defenses and risk-score limitations. Keep the decision-use guidance visible on Products, product detail and Methodology. Product records must not be used alone for procurement, deployment or automated allow/deny decisions. ASI itself does not enforce those decisions.

ASI is not an automated security control, allowlist, denylist, certification authority or procurement gate. It does not replace local testing, sandboxing, least privilege, runtime enforcement or human review. Attack riskScore is an attack-class exposure/risk heuristic, not a product score, vendor ranking, certification score, evidence confidence, mitigation effectiveness or procurement recommendation.

Product details show the existing `lastReviewedAt` or "Review date not recorded". Source displays show `publishedAt` and `accessedAt` when present; access is not a product review. Never refresh a review date merely because a build or deployment ran. Evidence labels and unknown coverage must remain distinct; absence of independent evidence must remain visible.

Feature development is paused after this addition. The next work is domain selection, deployment, production smoke testing, and public launch. This manual does not itself deploy or authorize an automatic release.

## 2. Start and stop locally

Use PowerShell in the repository root. CI uses Node 22; use the same major locally and an installation satisfying the locked Vite package's Node engine requirement. Check versions before diagnosing dependency failures:

```powershell
node --version
npm --version
git status --short
npm ci --no-audit --no-fund
npm run dev
```

Open the Local URL printed by Vite, normally `http://localhost:8080/#/`. Stop the server with Ctrl+C in its terminal. The script binds all interfaces, so it can also be accessible on the local network; it is a development server, not production hosting. If 8080 is occupied, Vite may choose another port: use its printed URL.

`predev` assembles the catalog automatically. No prior test run is required. After editing JSON incident chunks while the server is already running, run `npm run assemble:catalog` in another terminal and refresh the browser; the browser does not continuously re-fetch the catalog. Restarting dev also assembles it.

To inspect the production build locally, stop dev first, then:

```powershell
npm run build
npm run preview
```

Preview serves the existing build. It does not rebuild it. Stop preview with Ctrl+C.

## 3. File ownership: what to edit

| Path | Role / maintenance rule |
|---|---|
| `src/lib/matrix/classes-part-*.ts` | Authored taxonomy fragments. Some use legacy AX IDs, normalized to AAC. Never renumber IDs to match an incoming brief. |
| `src/lib/matrix/classes.ts` | Combines and normalizes runtime classes. |
| `src/lib/matrix/catalog.ts` | Matrix filtering and mitigation resolution. |
| `src/lib/matrix/mitigations.ts` | Runtime mitigation records used in pages. |
| `public/export/mitigations.json` | Authored export mitigation registry. Keep IDs, descriptions and status aligned with the runtime registry. |
| `public/export/incidents-*.json` | Authored incident records. Add each incident exactly once. `incidents-04.json` holds the final pre-launch pair. |
| `src/data/sources.ts` | Canonical authored source registry. Reuse equivalent source IDs/URLs. |
| `src/data/products.ts` | Authored product coverage, limitations, disclosures and evidence status. |
| `src/data/methodology.ts` | Authored public methodology. |
| `src/data/types.ts` | Publication schema and allowed values. |
| `public/export/catalog-meta.json` | Draft status and declared class count; keep incident count current. Assembly calculates output counts. |
| `public/export/products.json`, `sources.json` | Generated but tracked split exports. Regenerate and include relevant changes. Never edit these instead of their TS sources. |
| `public/export/asi-catalog.json` | Generated and ignored. Never stage it or remove its ignore rule. |
| `dist/` | Generated and ignored deployable output. Never hand-edit or commit. |
| `src/App.tsx` | Publication routes and rendering. Incident details consume generated records. |
| `src/components/matrix/` | Interactive matrix UI; its embedded legacy incident summaries come from class fragments. |
| `.github/workflows/catalog.yml` | Verification CI, not deployment. |

Assembly currently prefers TS class fragments over the older `attack-classes-*.json` chunks. Editing those older chunks alone will not update the active taxonomy. The matrix detail sheet still uses embedded class summaries; publication attack routes also render the canonical incident registry. Do not copy new incident prose into components to make it appear there.

## 4. Authoritative taxonomy for this edition

Confirm this table against the live source before each new research task. AAC-41 through AAC-44 are unpublished/reserved; they are not available mappings. Similar names in another taxonomy do not change these IDs.

| ID | Published class |
|---|---|
| AAC-01 | Direct Prompt Injection |
| AAC-02 | Indirect Prompt Injection |
| AAC-03 | Tool Poisoning |
| AAC-04 | Tool Shadowing |
| AAC-05 | MCP Rug Pulls |
| AAC-06 | Memory Poisoning |
| AAC-07 | Privilege Escalation via Scope Creep |
| AAC-08 | Confused Deputy / Identity Abuse |
| AAC-09 | Token Mismanagement |
| AAC-10 | Agentic Supply Chain Tampering |
| AAC-11 | Command Injection & Execution |
| AAC-12 | Intent Flow Subversion |
| AAC-13 | Insufficient MCP Authentication |
| AAC-14 | Shadow MCP Servers |
| AAC-15 | Context Injection & Over-Sharing |
| AAC-16 | MCP STDIO Host RCE |
| AAC-17 | Filesystem Escape / Path Traversal |
| AAC-18 | Line Jumping |
| AAC-19 | Runtime-Gated Payloads |
| AAC-20 | Agent Card Poisoning |
| AAC-21 | Agent Card Spoofing |
| AAC-22 | Agent Impersonation / A2A Shadowing |
| AAC-23 | Capability Cloaking |
| AAC-24 | Insecure Inter-Agent Communication |
| AAC-25 | Cross-Agent Privilege Escalation |
| AAC-26 | Agent-Side Request Forgery |
| AAC-27 | Serialization Injection |
| AAC-28 | Unexpected Code Execution |
| AAC-29 | Sandbox Escape |
| AAC-30 | RAG Data Poisoning |
| AAC-31 | Persistent Memory Backdoor |
| AAC-32 | Output Channel Exfiltration |
| AAC-33 | Human-Agent Trust Exploitation |
| AAC-34 | Cascading Failures |
| AAC-35 | Rogue Agents |
| AAC-36 | Over-Privileged Skills |
| AAC-37 | Malicious Skills |
| AAC-38 | Excessive Agency / Tool Misuse |
| AAC-39 | System Prompt Extraction |
| AAC-40 | Telemetry Blind Spots |

## 5. Research addition procedure

1. Check branch, status and current counts. Search existing incidents by CVE, product and source URL to prevent duplicates.
2. Read the primary disclosure. Verify publication date, author, affected version boundary, fixed version and current status. Record what is unknown; omit unsupported metadata.
3. Match the mechanism to existing class descriptions. Put the primary mapping first in `attackClassIds`. Add secondary mappings only with direct justification. If no exact class exists, state the limitation in `classificationNotes`; do not silently repurpose an ID.
4. Add/reuse source records in `src/data/sources.ts`. Source `supports` IDs must exist. Keep vendor affiliation and source type visible. An incident involving a vendor is not evidence that its defensive product works.
5. Add one unique incident to an `incidents-NN.json` array. Populate `id`, `name`, `date`, `year`, `summary`, `attackClassIds`, `cveIds`, `evidenceTier`, `confidence`, `primarySource` and `primarySourceId`. Preserve the legacy source URL. Use `[]` for absent CVEs, never a fabricated identifier.
6. Where supported, add `affectedVersions`, `fixedIn`, `resolution`, `classificationNotes`, `architecturalLesson`, `mitigationIds`, and additional sources. Exact publication dates use `YYYY-MM-DD`; do not invent a month/day for older year-only records.
7. Prefer existing controls. If a new control is justified, update both mitigation registries. Established practice is not reproduced or validated. Keep `validated: false` without the required public reproduction evidence.
8. Assemble, inspect the resulting links and counts, run the release gate, and inspect the incident and mapped attack pages. Source URL matching during assembly is exact; redirect-equivalent spellings can fail to resolve.
9. Review the diff and commit only the intended files after the requested approval. Retain historical IDs when correcting records; preserve a correction trail in the commit explanation.

### Evidence distinctions

| Source type | Meaning |
|---|---|
| primary-disclosure | Original researcher disclosure; not necessarily a product effectiveness evaluation |
| vendor-advisory | Vendor documentation/advisory; attributed vendor evidence |
| cve-nvd | Vulnerability registry record |
| academic-paper | Research paper; assess scope and methodology |
| public-poc | Public demonstration/reproduction artifact |
| credible-secondary | Reporting on other evidence |
| background | Context or standards, not incident proof by itself |

Incident tiers are T0 theoretical, T1 lab/PoC, T2 field incident or CVE/advisory, T3 multiple independent field cases. Research on a real service can still be a controlled T1 demonstration. Confidence in a report is separate from the tier and from severity.

Product statuses have separate requirements: vendor-claimed can have no linked sources; documented requires vendor documentation/advisory; third-party-evaluated requires independent evidence; reproduced requires public reproduction evidence; aletheia-tested requires an actual Aletheia artifact. The validator checks structural eligibility, not whether the source substantively proves the claim. Human research review remains necessary.

## 6. Final pre-launch pair

| Incident | Current mappings | Control | Evidence |
|---|---|---|---|
| INC-401: DeepSeek Harness sandbox self-disable via local control plane | Primary AAC-29; secondary AAC-07 | New `control-plane-isolation`, established-practice, not validated | T2; CVE-2026-82533 |
| INC-402: ChatGPT cross-account shared-state command channel | Primary AAC-08; no secondary | Existing `isolation`, established-practice, not validated | T1 researcher demonstration; no CVE assigned in this record |

DeepSeek affected versions are `< 0.1.2-alpha.1`; `0.1.2-alpha.1` is the fix boundary. This record makes no claim about npm publication order. Sources: [VulnCheck advisory](https://www.vulncheck.com/advisories/deepseek-harness-alpha-1-authentication-bypass-via-host-header-spoofing), [official sandbox documentation](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md), and [secondary reporting](https://thehackernews.com/2026/09/deepseek-harness-flaw-let-ai-agents.html).

ChatGPT's record is historical: [Check Point Research](https://research.checkpoint.com/2026/the-shared-clipboard-inside-the-sandbox-cross-account-data-leakage-in-chatgpt/) states that OpenAI confirmed decommissioning of the Artifactory instance. Shared mutable package metadata, not the OS clipboard, crossed identities. AAC-08 captures the deputy abuse; this edition lacks a dedicated tenant-state class. Do not map it to the unrelated AAC-33/AAC-36 labels or infer an OS sandbox escape.

Architectural interpretation: DeepSeek let a governed workload modify its own control boundary; ChatGPT's case let separate principals cross boundaries through shared mutable infrastructure. Security authority and shared mutable state must remain identity-scoped outside the governed workload. This is an ASI interpretation, not a claim of tested product prevention.

Future fixtures only, not implemented: Aegis should retain external/untrusted provenance for cross-account content; Lite should block victim-capability use without delegated authority. For control-plane mutation, test self-widening and local privileged calls as BLOCK, while an authorized external scoped grant yields ALLOW plus receipt. These ideas do not upgrade product evidence or add coverage mappings.

## 7. Release gate

Stop dev/preview before reinstalling dependencies on Windows. Run each command in order and stop on any nonzero exit code:

```powershell
npm ci --no-audit --no-fund
npm run typecheck
npm test
npm run check:catalog:strict
npm audit --audit-level=moderate
npm run build
git diff --check
Test-Path public/export/asi-catalog.json
Test-Path dist/export/asi-catalog.json
git status --short
```

Both artifact checks must return True. `npm test` checks taxonomy and catalog invariants; it is not a comprehensive browser test suite. Strict checking is mandatory even while status is draft. CI currently runs install, typecheck, tests, strict validation and build; audit and browser checks are additional local release steps.

Check the assembled data:

```powershell
$catalog = Get-Content public/export/asi-catalog.json -Raw -Encoding UTF8 | ConvertFrom-Json
$catalog.attackClasses.Count
$catalog.incidents.Count
$catalog.sources.Count
$catalog.mitigations.Count
$catalog.products.Count
$catalog.incidents | Where-Object { -not $_.primarySourceId }
```

Expected current counts: 40 / 23 / 28 / 23 / 6; the last command prints nothing. Check all source and mitigation references, unique incident IDs, exactly one record for each addition, zero placeholders and no unintended product changes. Do not treat passing automated checks as verification of every factual claim in the older catalog.

### Clean-generation check

From the verified repository root, delete only `public/export/asi-catalog.json` and `dist/`, then build. Never remove a computed or broad directory without checking its resolved path.

```powershell
Get-Location
Resolve-Path public/export/asi-catalog.json, dist
Remove-Item -LiteralPath public/export/asi-catalog.json
Remove-Item -LiteralPath dist -Recurse
npm run build
Test-Path public/export/asi-catalog.json
Test-Path dist/export/asi-catalog.json
```

For clean dev, stop preview/dev, remove only the generated catalog, run `npm run dev`, and verify it is regenerated. These artifacts are recoverable through assembly/build; source files are never deletion targets.

## 8. Browser smoke test

Test desktop and narrow mobile widths. Confirm no horizontal page overflow, blank pages, uncaught errors, or endless loading states.

| Route | Expected result |
|---|---|
| `#/` | Publication home and current counts |
| `#/matrix` | Filters/views work; class selection opens detail |
| `#/products` | Six profiles and evidence labels |
| `#/products/promptfoo-red-teaming` | Resolved sources and limitations |
| `#/products/aletheia-lite` | Vendor-claimed and missing independent evidence wording |
| `#/incidents` | 23 records; both new titles, dates, source links and resolution text |
| `#/attacks/AAC-29`, `#/attacks/AAC-07` | INC-401, CVE and version boundary |
| `#/attacks/AAC-08` | INC-402, historical resolution, no invented CVE |
| `#/methodology` | Authored methodology |
| `#/research` | Current coming-next state; no promised publications inferred |
| `#/unknown`, invalid product/attack IDs | Restrained not-found view |

Refresh a direct hash URL. Test malformed percent encoding in product/attack IDs. Temporarily block `/export/asi-catalog.json` with browser request blocking, reload Incidents, confirm the explicit error state, then disable blocking. Click the source links and verify destinations; an HTTP success alone is not source review.

## 9. Domain and deployment handoff

No domain or deployment provider is recorded in this checkout. Select these before using provider-specific commands. Hosting must serve the site at the domain root: the catalog fetch is root-relative. A repository subpath deployment is not assumed supported.

Build command: `npm ci --no-audit --no-fund` followed by the release gate and `npm run build`. Publish directory: `dist`. No start command, server secrets, database migrations, or authentication setup is required. Never expose Vite dev as the public production service.

1. Record the approved commit SHA, successful CI run and build environment.
2. Deploy the complete output to a preview URL. Verify `/export/asi-catalog.json` returns JSON, not an HTML fallback page.
3. Run the browser smoke tests against the preview URL.
4. Add the selected domain using the host's actual DNS instructions. Preserve unrelated DNS and mail records. Verify domain ownership and HTTPS issuance.
5. Set the preferred apex/www hostname and redirect the alternative using the host's configuration. Check HTTPS on both.
6. Publish the approved build, then repeat production smoke checks, counts and primary source resolution.
7. Record production URL, provider/project, DNS owner, deployment ID, commit SHA, timestamp, operator, results and rollback target in the release record.

Use revalidation/short caching for HTML and catalog JSON; hashed Vite assets can be cached long-term. Publish data and JS together to avoid old/new schema mismatches. Hash paths are handled in the browser, so no server route rewrite is needed for `#/attacks/...` beyond serving the root document. Source maps are currently generated: review whether the chosen host should publish them; they must contain no secrets.

Public launch remains conditional on domain, HTTPS and production checks. Keep the visible draft/review disclosure until an actual review supports changing it.

## 10. Routine maintenance and recovery

After each release: verify the production catalog, routes, counts, console and current-status wording. Keep the last successful deployment available for rollback.

Weekly while active: review CI failures, reported broken links and upstream corrections for featured incidents. Revisit advisories for changed remediation status. Record review dates only when review actually occurred.

Monthly or when an advisory appears: review `npm outdated` and `npm audit`, update dependencies in a separate change, review lockfile changes, and rerun the full release gate. Do not use `npm audit fix --force` as an automatic release step.

For a factual error: preserve the incident ID, correct the authored source, document the correction in the commit, rebuild and redeploy. For a broken release: restore the prior complete deployment artifact using the host's rollback facility, smoke-test it, then fix forward in the repository. Do not repair production by editing generated JSON directly.

| Symptom | Action |
|---|---|
| Windows EPERM during npm ci | Stop the repository's Vite/preview process and retry; inspect exact process command lines, never kill every Node process. |
| Catalog missing/stale in dev | Assemble again and refresh, or restart dev. Check browser network request. |
| JSON URL returns HTML | Correct publish directory/root path or overly broad host fallback. |
| New source does not resolve | Compare exact source URL and ID; regenerate exports. |
| Unknown AAC mapping | Consult the table and source descriptions; do not invent or rename a class. |
| Strict gate fails | Read its finding codes, fix the authored record, rerun. Do not weaken the gate. |
| Build succeeds but data is wrong | Compare authored chunks and generated output; inspect which data source the page uses. |
| Port in use | Stop the identified repo server or use the port Vite prints. |

## 11. Commit hygiene and future task brief

Review `git diff --stat`, `git diff`, and staged changes. Stage explicit paths. Never stage ignored generated catalog/dist artifacts, secrets, unrelated work, or `.gitignore` changes without intent. Commit/push only when requested; a successful local seal is not a production release.

For future tasks, provide: current branch/SHA, intended change, current taxonomy IDs and names, source URLs, desired primary/secondary mappings, evidence limits, allowed files/scope, required validation, and whether commit/push/deployment is authorized. If a directive conflicts with the repository, resolve it before implementing data changes.

Keep this manual synchronized when scripts, schema, hosting, taxonomy or editorial policy change. The repository and verified primary evidence take precedence over remembered labels from an older brief.

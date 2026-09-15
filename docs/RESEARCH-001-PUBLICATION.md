# ASI Research 001 publication checks

Pre-push verification record, September 14, 2026.

## Publication

**The Disclosure Gap** — **When Public AI Vulnerability Reporting Outlives the Fix**.

Research ID: ASI-RESEARCH-001. Native route: `#/research/asi-research-001`.

Article length: **1,645 words**, counting section 1-10 prose, list items, and headings; excluding title metadata and references. Canonical normalized Markdown SHA-256: `ff0e3d1740cd51f3de06bcf71712181acc2d58c44267f224a3667ba23b672d94`.

CONDITIONAL GO for the explicitly evidence-scoped publication. Local DeepSeek results remain author-reported. Publication does not authenticate them. Original captures and exact metadata are still pending; no final PDF, incident, taxonomy mapping, or product-evidence upgrade is included.

## Editorial scope

The article separates the reported persistence test, separate consequence observation, and independent provider context. It does not assert a shared exploit/class, disclosure-to-misuse causation, universal transfer, verbatim prompt reuse, continuous exposure, current vulnerability, autonomous intent, or verified weapons-output feasibility.

All operational prompts and dangerous outputs remain withheld. The four previously supplied illustrations are not renamed or promoted to original evidence. Pending preferred files are:

- `screenshots/evidence-001-setup-redacted.png`
- `screenshots/evidence-002-sequence-redacted.png`
- `screenshots/evidence-003-boundary-crossing-redacted.png`
- `screenshots/evidence-004-consequence-redacted.png`

## Exact sources

1. Matt Burgess, [The Hacking of ChatGPT Is Just Getting Started](https://www.wired.com/story/chatgpt-jailbreak-generative-ai-hacking/), WIRED, April 13, 2023. Historical reporting, secondary to the underlying research.
2. Adversa AI, [Universal LLM Jailbreak: ChatGPT, GPT-4, BARD, BING, Anthropic, and Beyond](https://adversa.ai/blog/universal-llm-jailbreak-chatgpt-gpt-4-bard-bing-anthropic-and-beyond/), April 13, 2023. Primary historical research; title breadth is not adopted as ASI's claim.
3. Anthropic, [Detecting and countering misuse of AI: September 2026](https://www.anthropic.com/threat-intelligence-report-september-2026), September 2026. Primary provider threat intelligence, not verification of the local experiment.
4. Anthropic Frontier Red Team, [Measuring tactical intelligence targeting and conventional weapons capabilities of AI models](https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities), September 10, 2026. Primary capability evaluation.
5. [ASI-Research-v1](https://github.com/holeyfield33-art/ASI-Research-v1). Canonical publication artifact and author account, not independent corroboration.

Source content and metadata were reviewed; all five URL checks returned HTTP 200. Source existence is not treated as proof of local findings.

## Changed files

Research repository: `README.md`, `RESEARCH.md`, `METHODOLOGY.md`, `ATTRIBUTION.md`, `evidence/README.md`, `screenshots/README.md`, and new `scripts/validate-research.mjs`. No image or license changes.

ASI: `README.md`, `docs/RUN-AND-MAINTENANCE.md`, this record, `scripts/research-publication.test.mjs`, new `scripts/research-markdown.mjs`, new `scripts/sync-research.mjs`, `src/App.tsx`, new `src/components/research-article.tsx`, `src/data/research.ts`, new `src/data/research-001.generated.ts`, new `src/lib/research-links.ts`, and `src/index.css` (article typography only).

The source Markdown remains canonical. A deterministic sync command generates the committed native reading data. Production builds do not require the other repository or any remote article fetch. The renderer supports only the publication's text, headings, quotes, lists, and safe links; no iframe or raw HTML is used.

## Release command results

| Command | Result |
| --- | --- |
| Research: `node scripts/validate-research.mjs` | PASS; 11 sections, 21 local Markdown links, 4 illustrative PNGs; originals pending. |
| Research: `git diff --check` | PASS, exit 0. |
| ASI: `node scripts/sync-research.mjs ../ASI-Research-v1/RESEARCH.md --check` | PASS; native snapshot matches canonical source and SHA-256. |
| `npm ci --no-audit --no-fund` | PASS, exit 0; 128 packages installed. |
| `npm run typecheck` | PASS, exit 0. |
| `npm test` | PASS, exit 0; taxonomy/catalog checks plus 11 tests, 0 failures. |
| `npm run check:catalog:strict` | PASS, exit 0. |
| `npm audit --audit-level=moderate` | PASS, exit 0; 0 vulnerabilities. |
| `npm run build` | PASS, exit 0; prebuild assembled catalog, Vite built 1,739 modules. |
| `git diff --check` | PASS, exit 0. |
| Both generated catalog paths | Exist; `dist/export/asi-catalog.json` matches `public/export/asi-catalog.json`. |

Non-blocking notices: npm reports unapproved esbuild postinstall scripts; no allow-scripts policy was changed. Vite reports the main chunk at 500.94 kB uncompressed (155.24 kB gzip), just above its 500 kB warning threshold; the warning threshold was not changed. Git reports normal LF/CRLF normalization notices.

## Browser verification

Production build preview passed on desktop 1440px and mobile 390px. Verified home feature, research index, full 11-section native article, direct refresh, methodology, matrix, and four unknown/malformed research paths. Article title and description set correctly and restored on exit. No horizontal overflow, page errors, console errors, runtime GitHub/source fetch, PDF link, iframe, or product promotion was found. The full article also renders when the catalog request fails.

Mobile screenshots were visually inspected at the article opening, historical-source section, and references. The existing editorial palette and layout remain intact. Hash routing only supports client-side per-article title/description; distinct server-rendered SEO/social metadata is not claimed.

Catalog remains **40 classes, 23 incidents, 36 sources, 23 mitigations, and 6 external products**. Strict validation reports 0 placeholder sources and 0 validated mitigations. Taxonomy, incidents, product evidence, `.gitignore`, and lockfile are unchanged.

## Handoff

Push the research commit first, then the ASI commit, without force. Deployment verification must compare the served Vercel build and native article after the push. Commit SHAs and the observed production outcome are reported in the final handoff rather than guessed in this pre-push record. Stop after publication; no additional research project is included.

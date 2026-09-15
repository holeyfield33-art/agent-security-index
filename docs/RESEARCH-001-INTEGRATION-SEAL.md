# ASI Research 001 integration review

Initial editorial review: September 14, 2026. The initial review below records the pre-publication state. A subsequent user-authorized publication update adds four supplied redacted images and prepares both repositories for commit and push. No final PDF was generated.

## Supplied-image publication update

Four images supplied by the user were copied unchanged into the research repository as `screenshots/supplied-redacted-01.png` through `supplied-redacted-04.png`, displayed in its screenshot gallery, and linked from the README and evidence register. The old placeholder assets remain removed. Captions explicitly distinguish supplied images from authenticated experimental evidence; the date/model, editing or generation history, hidden result, and test linkage remain unverified. The initial review's statements about no images describe the earlier snapshot, not this update.

All four images contain embedded `OpenAI`, `c2pa.created`, and `trainedAlgorithmicMedia` provenance terms. The gallery, evidence register, research README, and ASI entry explicitly treat them as illustrative, not original captures or experimental proof. No metadata signature verification was performed. The existing evidence requirements remain open.

The WIRED citation already uses the complete canonical article URL without the unnecessary truncated tracking query: `https://www.wired.com/story/chatgpt-jailbreak-generative-ai-hacking/`.

The user authorized committing and pushing all changes in both repositories. The research repository must be pushed first, followed by ASI. Pushing ASI may trigger its existing production deployment integration. Final article text supplied later will be a separate update; this publication remains labeled an editorial draft.

## Outcome

GO for editorial review of the repository changes. CONDITIONAL GO for publishing the labeled draft: publish the reviewed research repository before deploying the ASI entry. NO-GO for final PDF generation until the author approves the text and the outstanding evidence checks are resolved.

The live ASI site returned HTTP 200; its research route still has the previous coming-next surface. Local changes do not update that deployment. The local development preview is `http://localhost:8080/#/research`.

## Repository locations and scope

- Research: `C:/Users/SuperAdmin/.vscode/ASI-Research-v1`, cloned from `https://github.com/holeyfield33-art/ASI-Research-v1` at `bb01fc6e700c3abcb7e30a3db4c14482f6be91c9`.
- Site: `C:/Users/SuperAdmin/.vscode/agent-security-index`, baseline `4ced2fa`.

The sibling checkout keeps the repositories separate. The user's direct request to update both repositories superseded the pasted directive's site exclusion. The site change is restricted to the research listing, authored metadata, tests, and maintenance documentation. No redesign or new catalog record was added.

The supplied DOCX and six-page PDF were read as reference text. They were not edited or re-exported. Their embedded editorial suggestions were treated as source material, not separate authorization to generate figures, run experiments, or publish a final paper.

## Identity and exact claim

ASI-RESEARCH-001: **The Disclosure Gap**

Subtitle: **When Public AI Vulnerability Reporting Outlives the Fix**

The exact core claim, explicitly labeled as the author's reported finding, is:

> A publicly documented jailbreak pattern remained capable of crossing the tested DeepSeek safety boundary in 2026.

The article and site explicitly state that this is not independently substantiated by the current public package. Historical-pattern correspondence and test metadata need review. The claim does not establish present-day vulnerability, continuous exposure since 2023, or failure of a vendor-announced fix.

## Files changed

Research repository:

- Replaced `README.md`, `RESEARCH.md`, `METHODOLOGY.md`, and `ATTRIBUTION.md`.
- Added `evidence/README.md`.
- Replaced `screenshots/README.md` with safe publication rules.
- Removed `screenshots/01-frame-setting.png`, `screenshots/02-cot-excerpt.png`, and `screenshots/03-escalation.png`. Each was a small text placeholder, not image data. They remain recoverable from Git history; no genuine evidence image was deleted.
- Left `LICENSE` unchanged.

ASI repository:

- Added publication metadata in `src/data/research.ts`.
- Replaced the research placeholder in `src/App.tsx` with the qualified draft entry and canonical reading links.
- Added `scripts/research-publication.test.mjs` and included its two tests in `package.json`.
- Updated `README.md` and `docs/RUN-AND-MAINTENANCE.md` with the two-repository publication workflow.
- Added this review record.

## Source integrity

- [Adversa AI original research, April 13, 2023](https://adversa.ai/blog/universal-llm-jailbreak-chatgpt-gpt-4-bard-bing-anthropic-and-beyond/): primary historical publication. The original title is retained as attribution, not adopted as ASI's breadth of claim. An organization citation avoids inventing a personal byline.
- [Matt Burgess, WIRED, April 13, 2023](https://www.wired.com/story/chatgpt-jailbreak-generative-ai-hacking/): original reporting that motivated the author; secondary relative to the experiment.
- [Anthropic September 2026 threat-intelligence report](https://www.anthropic.com/threat-intelligence-report-september-2026): independent provider context, not a local reproduction. The citation uses the verified month without inventing an exact day.
- [Anthropic Frontier Red Team evaluation, September 10, 2026](https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities): primary capability evaluation, not proof of a shared jailbreak or operational success.

Source existence is separate from quality and claim support. No external publication authenticates the local DeepSeek observation. The article uses original sources rather than copied article images or generated summaries as evidence.

## Outstanding evidence and narrowed claims

EVIDENCE-001 (boundary crossing), EVIDENCE-002 (timeline/provenance), and optional EVIDENCE-003 (separate consequence observation) are all pending editorial addition. No substantive screenshot is present. Exact date/time, model/version, interface, actual run count, control availability, and pattern correspondence remain open. The old July 2026 date is explicitly unverified.

Unsupported claims of a 30-minute reproduction, broad transferability, completed controls, two independent runs, instrumented records, and available NDA/archive access were removed or reclassified as unverified. A separate consequence observation stays author-reported; the correctness or physical feasibility of dangerous outputs is not asserted. Operational prompts, bypass sequences, and dangerous outputs remain withheld.

The persistence test, separate consequence observation, and external provider cases remain distinct. No shared attack-class claim, disclosure-to-misuse causal claim, AAC mapping, incident addition, or Aegis/Lite evidence upgrade is made.

## Exact validation results

| Command or check | Result |
| --- | --- |
| `npm ci --no-audit --no-fund` | PASS, exit 0; 128 packages installed. npm warned that esbuild's postinstall is not approved; no allow-scripts policy was changed. |
| `npm run typecheck` | PASS, exit 0 after installation completed. |
| `npm test` | PASS, exit 0; taxonomy/catalog checks and 7 tests, 0 failures. |
| `npm run check:catalog:strict` | PASS, exit 0; 40 classes, 23 incidents, 0 validated mitigations, 0 placeholders. |
| `npm audit --audit-level=moderate` | PASS, exit 0; 0 vulnerabilities. |
| `npm run build` | PASS, exit 0; prebuild assembled the catalog and Vite built 1,736 modules. |
| `git diff --check` in ASI | PASS, exit 0. |
| `git diff --check` in research repo | PASS, exit 0 after whitespace correction. |
| `Test-Path public/export/asi-catalog.json` | True. |
| `Test-Path dist/export/asi-catalog.json` | True; production catalog equals generated catalog. |
| Research structure/local links | PASS; 11 article sections, 16 local Markdown links resolved, 3 planned evidence IDs, 0 substantive images, license unchanged. |
| Production-preview browser smoke | PASS; research desktop 1440px, mobile 390px, direct refresh, 5 reading links, no PDF link, no horizontal overflow, no page errors, no runtime GitHub fetch. |
| Existing-route smoke | PASS; home, matrix, products, Promptfoo profile, incidents, methodology, AAC-01, and unknown-route fallback rendered. |
| `npm run dev` / local research route | PASS; predev generated the catalog, Vite started on port 8080, research entry rendered. |

An initial typecheck was launched before the installation finished and could not find `tsc`; the complete sequence above was rerun successfully after `npm ci` completed. Initial research whitespace errors were corrected before the successful final check. Git's LF/CRLF notices are normalization warnings, not failing checks.

Catalog counts remain 40 classes, 23 incidents, 36 sources, 23 mitigations, 6 external products, and 0 vendor claims. Catalog records, product evidence, taxonomy, `.gitignore`, and the lockfile are unchanged.

## Publication handoff

The site reading links intentionally point to the canonical GitHub repository. Until the research changes are committed and pushed, those links still show the older documents and the new evidence-register path is not available remotely. Verify all links after publishing the research revision, then deploy ASI and smoke-test the production route. Do not confuse local browser validation with production publication.

Next editorial action: supply the redacted evidence and available test metadata, then approve the article text. Final PDF generation remains blocked on that review; no feature work is needed to resolve it.

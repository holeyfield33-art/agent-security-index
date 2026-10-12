import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const d=JSON.parse(await readFile(new URL('review/inspection.json',root),'utf8'));
const write=(p,s)=>writeFile(new URL(p,root),s);
if(d.errors.length||d.links.some(l=>!l.ok)||d.checks.some(c=>c.pageOverflow||c.brokenImages||c.passed===false))throw Error('Inspection failed');
const article='http://127.0.0.1:4179/#/research/controlled-materialization-results';
const listing='http://127.0.0.1:4179/#/research';
await write('ARTICLE-REVIEW.md',`# Article review

**Reference ≠ Authority: Experimental Results from a Controlled Materialization Boundary**

[Complete readable Markdown](article/ARTICLE.md) · [Local article](${article}) · [Research listing](${listing})

## Status and provenance

This review was captured locally before the operator approved publication. The article is labeled Experimental results / Local bounded evidence. This is not a validated production control. See [the screenshot index](README.md) for the approved release and visible images.

- ASI branch: research/experiment-001-results
- ASI HEAD: ${d.asiRevision}
- The reviewed preview includes the desktop table correction in src/index.css; its CSS hash is recorded below.
- Research evidence revision: ${d.researchRevision}
- Article verification SHA-256: ${d.sha256}
- Hash convention: UTF-8, CRLF normalized to LF, document trimEnd plus one final newline.
- Preview CSS SHA-256: ${d.cssSha256}

## Exact word count

**${d.words} words.** Includes title, subtitle, section-heading text, paragraphs, list items and all table cells. Includes link labels, but excludes URL targets, Markdown formatting, section numbering and site navigation/metadata. Whitespace-delimited tokens count only if they contain a Unicode letter or number; hyphenated terms and hashes each count as one token. Punctuation-only tokens do not count. See [reproducible capture/count script](review/capture.mjs).

## Section outline

${d.headings.map(h=>'- '+h).join('\n')}

## Editorial observations — no wording changes made

Recommendation: ready for human editorial approval as a bounded experimental report. The scripted planner, trusted issuer, checked snapshot, synthetic sink, positive and falsification controls, and untested threats are clearly distinguished. No unsupported production-security or independent-reproduction claim was identified in this editorial review. This was not a new scientific audit or experiment.

- Section 9 names the beginner runbook, coverage matrices, limitations and evidence review without direct links to those files. Consider adding revision-pinned links; the pinned repository link currently provides access.
- Sections 3 and 5 repeat environment/date details. Consider shortening that repetition in a future editorial pass.
- A short definition of grant, materialization and commitment would help non-specialists.
- The new article has no dedicated diagram. The original architecture note has three intact diagrams and is linked in section 9; an earlier cross-reference could improve orientation.
- Commands in section 9 are plain prose. Copyable formatting could improve usability.
- The mobile title wraps naturally; tables require horizontal scrolling. A visible scroll hint would improve discoverability, but content is accessible and the page does not overflow.

All seven distinct outbound resources on the rendered article returned HTTP 200. This checks availability, not scientific validity or every remote URL fragment. The architecture route was also verified locally.
`);
await write('VISUAL-REVIEW.md',`# Visual review

[HTML gallery](gallery.html) · [Contact sheet](review/contact-sheet.png) · [Inspection data](review/inspection.json)

Captured ${d.capturedAt} from the actual local production build. Desktop: **1440 × 900**. Mobile: **390 × 844**, mobile/touch emulation, device scale 1. Chromium waited for network idle and document fonts. Section captures include full element heights; full-page images preserve all ten sections. Screenshots are UI evidence only, not proof of experimental security effectiveness.

## Findings and correction

**PASS after one minimal correction.** The original 680px table minimum exceeded the desktop article column (621px), requiring sideways scrolling and hiding the right edge at initial position. A three-line CSS media rule now removes the minimum at viewport widths of 768px and above. All three desktop tables now have client width and scroll width of 621px. Article wording and research evidence were unchanged.

Mobile tables retain a 680px table inside a 358px scroll region. Each is focusable and ArrowRight moved it by 40px. Supplemental right-edge screenshots show remaining columns. A single mobile screenshot cannot expose all columns simultaneously. Neither viewport has horizontal page overflow.

Inspected the gallery/contact sheet and detailed opening, status, invariant/threat tables, listing cards and architecture diagrams. No additional blocking visual defect was found. Typography and section spacing remain consistent, diagram labels are readable, and the listing distinguishes the original story, historical architecture proposal and bounded experimental results. All ten sections and three tables render. No missing images or browser page errors were recorded on the five routes at either size.

## Navigation and links

The article was opened from the research listing at both sizes. Direct refresh and Back to research pass. A capture-script timing race was fixed by waiting for the destination heading; no application navigation change was necessary.

${d.links.map(l=>'- HTTP '+l.status+': '+l.url).join('\n')}

## Inventory

54 screenshots plus one contact sheet. Opening, status and section 1 jointly show title, subtitle, evidence labels and introduction. Sections 2–10 cover architecture, setup, T1–T5, results/failures, I-1–I-10, limitations, interpretation, reproduction and conclusion. Element and full-page image dimensions vary with content; the browser viewports remain the required sizes.

${['desktop','mobile'].map(device=>'### '+device+'\n\n'+d.inventory.filter(i=>i.device===device).map(i=>'- ['+i.name+']('+i.path+') — '+i.url).join('\n')).join('\n\n')}

## Embedded previews

${['desktop/article-opening.png','mobile/article-opening.png','desktop/article-section-04.png','desktop/article-section-06.png','mobile/article-status.png','mobile/table-3-right.png','mobile/architecture-diagram-2.png'].map(p=>'[!['+p+']('+p+')]('+p+')').join('\n\n')}
`);
await write('PUBLICATION-PREVIEW.md',`# Publication preview — human review gate

[Local article](${article}) · [Listing](${listing}) · [Complete Markdown](article/ARTICLE.md) · [Gallery](gallery.html) · [Article review](ARTICLE-REVIEW.md) · [Visual review](VISUAL-REVIEW.md)

## Website changes

A separate Experiment 001 listing card opens the ten-section results article with Experimental results / Local bounded evidence labels, qualifications and pinned repository/protocol links. The prepared integration adds its independent parser, generated article data, renderer, route selection, reading labels and repository links. The original architecture note keeps its historical Experiment pending status. The Disclosure Gap story and homepage remain intact. No new diagram is added to the results article.

This review adds only a desktop table CSS correction and review artifacts. No taxonomy, incident, catalog evidence, frozen result or article wording changes were made.

## Evidence limitations

Historical records report 21 selected checks: 19 request scenarios (2 authorized, 17 expected denials), an audit check and a grouped isolation probe. The 13-test suite passed ordinary and optimized Python in the recorded experiment. Those scientific tests were not rerun here. The planner is scripted, with one transformation, one derivation level and a synthetic controller sink. I-6 residual plaintext, I-9 availability and I-10 metadata inference remain untested. Local evidence review is not independent reproduction. Hosted CI previously did not start because of a billing lock. These results do not validate a production mitigation.

Research revision: ${d.researchRevision}. Article SHA-256: ${d.sha256}.

## QA

- PASS: production build including TypeScript after the CSS correction.
- PASS: clean install, 20 unit/publication tests and strict catalog gate at release.
- PASS: npm audit after a lockfile-only update of the transitive source-map-js package from 1.2.1 to 1.2.2; zero vulnerabilities reported.
- PASS: 42 Playwright checks after correction (repository default desktop 1440 × 1000; mobile 390 × 844), including the article and other live routes.
- PASS: separate final screenshots/checks at requested 1440 × 900 and 390 × 844; five routes, all ten article sections, three tables, disclosures, refresh and back navigation.
- PASS: generated article matches canonical Markdown and its verification hash.
- PASS: seven outbound resources returned HTTP 200; no missing images, page errors or page-level horizontal overflow recorded.
- Nonblocking: existing Vite JavaScript bundle warning, 554.68 kB / 170.93 kB gzip.
- Scope: Chromium visual review, not a screen-reader audit or independent scientific reproduction.

## Approval and local state

The operator subsequently approved committing, pushing and posting the article. Optional editorial improvements are listed separately. The screenshots were captured from ASI revision ${d.asiRevision} plus the recorded CSS correction; they represent that reviewed rendering. The pre-existing .claude/ directory was untouched and the research repository remains clean.

The preview server is left running at 127.0.0.1:4179. Playwright opened and inspected the article during capture. Automatic policy review rejected launching the user's default browser through PowerShell with the reason “blocked by policy”; Chrome and in-app browser surfaces were unavailable. Use the local article link above to open the visible preview manually.

Screenshots establish appearance only. Review materials remain local.
`);
const files=[...d.inventory.map(i=>i.path),'review/contact-sheet.png','review/inspection.json','article/ARTICLE.md','gallery.html','README.md','ARTICLE-REVIEW.md','VISUAL-REVIEW.md','PUBLICATION-PREVIEW.md','review/capture.mjs','review/package.mjs','review/verify-manifest.mjs'];
await write('review/SHA256SUMS.txt',(await Promise.all(files.map(async p=>{const raw=await readFile(new URL(p,root));const normalized=p.endsWith('.png')?raw:Buffer.from(raw.toString('utf8').replace(/\r\n/g,'\n'));return createHash('sha256').update(normalized).digest('hex')+'  '+p;}))).join('\n')+'\n');
console.log('Package complete: '+d.words+' words; '+d.inventory.length+' screenshots.');

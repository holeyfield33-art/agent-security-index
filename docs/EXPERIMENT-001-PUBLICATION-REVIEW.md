# Experiment 001 — publication review package

Decision at initial review: **CONDITIONAL GO for review.** On 2026-10-12, the human operator reviewed the article and expressly approved posting, committing and pushing it. This approval supersedes the former local-only release hold for this article. The bounded evidence labels and untested-threat disclosures remain required.

Local branch: `research/experiment-001-results`, based on `cfd5ef9`.
Research evidence package: `4ac3224a5237937305596abe0d70d67290bc3575` in
`holeyfield33-art/Asi-Research-v2`, pushed on `experiment/reference-not-authority`.
Measured implementation: `bb5b48bc535b23430ab439e584e2caebf1fb5115`.
Canonical article normalized SHA-256:
`b845aca97fe210bb2df0325118738bafa7b42919cb34395013a685bdd109de0b`.

## Concrete review result

The existing experiment was retained. Its 21 selected checks and 13 tests in
ordinary/optimized mode passed locally; immutable source/report hashes verified.
The original materialized identity lab's four controls were rerun and recorded.
A distinct local pass verified 14 evidence/coverage conditions. No independent
external reproduction or real-model end-to-end mitigation validation is claimed.

The published T1–T5 text remains unchanged. The research package maps each frozen
definition and all ten threats to evidence and limits. I-6 residual plaintext,
I-9 sustained availability and I-10 metadata inference remain untested. Selected
paths for the other seven threats passed; that does not exhaust those threats.
Deliberately broken controls and pre-freeze development/infrastructure failures
are preserved separately from selected scientific outcomes.

## ASI changes

New artifact: **ASI-EXPERIMENT-001**, route `#/research/controlled-materialization-results`.
Title: **Reference ≠ Authority: Experimental Results from a Controlled Materialization Boundary**.
The generated native article has the directive's ten sections, both coverage
matrices, measured results, failures, limitations and immutable evidence links.
Its own synchronization command is `scripts/sync-experiment.mjs`; the existing
ASI-RESEARCH-001 parser, generated source and hardcoded sync are untouched.

ASI-ARCH-001 keeps its original article text and historical “Experiment pending”
status, and now links to the pinned reviewed research package. The index uses
distinct reading labels for all three artifacts. Rendering selects an article
from the validated route slug rather than reading the browser hash inside the
article component.

No taxonomy, AAC mapping, catalog record, incident, mitigation, product or source
evidence is altered. Strict validation still reports 40 classes, 24 incidents,
0 validated mitigations and 0 placeholder sources. Existing `.claude/` untracked
files are not included or changed.

## Verification

| Check | Result |
| --- | --- |
| Research `scripts/check_record.py` | PASS: 20 measured source hashes and campaign report hash |
| Research `scripts/check_review_record.py` | PASS on Linux and Windows: four normalized review-evidence hashes |
| Article sync `--check` | PASS: ten sections and canonical SHA-256 |
| ASI typecheck | PASS |
| ASI `npm test` | PASS: 20 tests, no failures |
| ASI strict catalog gate | PASS |
| ASI production build | PASS; existing non-blocking 500 kB chunk warning remains |
| Focused Playwright desktop/mobile suite | PASS: 24 tests |
| Final pinned-link article checks | PASS: two repeated desktop/mobile tests after the final revision link |
| Opening/threat screenshot visual review | PASS: 1440px desktop and 390px mobile |
| Catalog/product/research-001 source diff | No changes |

The focused browser suite checks new navigation/direct refresh, all ten result
sections, threat tables, bounded labels, original-note figures/status, existing
article navigation, page overflow, and public catalog integrity. Tables use
focusable bounded horizontal scroll on mobile. Screenshots under
`docs/review/experiment-001/` are **UI previews**, not experimental security evidence.
No runtime fetch from GitHub is required to render the article.

## Release gate

Hosted research CI did not start because GitHub reported an account billing lock.
The latest reviewed-revision run, 38278938151, was checked and reports the same
failed-start billing annotation.
The local record does not imply hosted CI passed. Human publication review must
accept the bounded claims, untested threats and that infrastructure limitation.
Independent reproduction remains future research, not a prerequisite invented
after the measured scope was frozen.

The earlier review directive stopped at the publication gate. The later human
approval authorizes this scoped article release under `docs/ASI-PUBLICATION-STANDARDS.md`.
The initial local review remains recorded above; deployment and live-site
verification must be reported separately from local test results.

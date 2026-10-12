# Article review

**Reference ≠ Authority: Experimental Results from a Controlled Materialization Boundary**

[Complete readable Markdown](article/ARTICLE.md) · [Local article](http://127.0.0.1:4179/#/research/controlled-materialization-results) · [Research listing](http://127.0.0.1:4179/#/research)

## Status and provenance

This review was captured locally before the operator approved publication. The article is labeled Experimental results / Local bounded evidence. This is not a validated production control. See [the screenshot index](README.md) for the approved release and visible images.

- ASI branch: research/experiment-001-results
- ASI HEAD: 6d44cb42055d71107048310158f3d35c185b9411
- The reviewed preview includes the desktop table correction in src/index.css; its CSS hash is recorded below.
- Research evidence revision: 4ac3224a5237937305596abe0d70d67290bc3575
- Article verification SHA-256: b845aca97fe210bb2df0325118738bafa7b42919cb34395013a685bdd109de0b
- Hash convention: UTF-8, CRLF normalized to LF, document trimEnd plus one final newline.
- Preview CSS SHA-256: f73a68f9517e15415f2294ed15dd2dc7f9ef1809a41c29b97ade27cf5b763987

## Exact word count

**2145 words.** Includes title, subtitle, section-heading text, paragraphs, list items and all table cells. Includes link labels, but excludes URL targets, Markdown formatting, section numbering and site navigation/metadata. Whitespace-delimited tokens count only if they contain a Unicode letter or number; hyphenated terms and hashes each count as one token. Punctuation-only tokens do not count. See [reproducible capture/count script](review/capture.mjs).

## Section outline

- 1. Research question and prior architecture
- 2. Implementation and trust assumptions
- 3. Experimental setup and reproducibility
- 4. Five invariants and test methodology
- 5. Actual results and failures
- 6. Ten implementation-threat assessments
- 7. Observed limitations and unresolved questions
- 8. Interpretation and implications for agent security
- 9. Reproduction instructions and evidence links
- 10. Conclusion and future research

## Editorial observations — no wording changes made

Recommendation: ready for human editorial approval as a bounded experimental report. The scripted planner, trusted issuer, checked snapshot, synthetic sink, positive and falsification controls, and untested threats are clearly distinguished. No unsupported production-security or independent-reproduction claim was identified in this editorial review. This was not a new scientific audit or experiment.

- Section 9 names the beginner runbook, coverage matrices, limitations and evidence review without direct links to those files. Consider adding revision-pinned links; the pinned repository link currently provides access.
- Sections 3 and 5 repeat environment/date details. Consider shortening that repetition in a future editorial pass.
- A short definition of grant, materialization and commitment would help non-specialists.
- The new article has no dedicated diagram. The original architecture note has three intact diagrams and is linked in section 9; an earlier cross-reference could improve orientation.
- Commands in section 9 are plain prose. Copyable formatting could improve usability.
- The mobile title wraps naturally; tables require horizontal scrolling. A visible scroll hint would improve discoverability, but content is accessible and the page does not overflow.

All seven distinct outbound resources on the rendered article returned HTTP 200. This checks availability, not scientific validity or every remote URL fragment. The architecture route was also verified locally.

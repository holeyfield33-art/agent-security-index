# Publication preview — human review gate

[Local article](http://127.0.0.1:4179/#/research/controlled-materialization-results) · [Listing](http://127.0.0.1:4179/#/research) · [Complete Markdown](article/ARTICLE.md) · [Gallery](gallery.html) · [Article review](ARTICLE-REVIEW.md) · [Visual review](VISUAL-REVIEW.md)

## Website changes

A separate Experiment 001 listing card opens the ten-section results article with Experimental results / Local bounded evidence labels, qualifications and pinned repository/protocol links. The prepared integration adds its independent parser, generated article data, renderer, route selection, reading labels and repository links. The original architecture note keeps its historical Experiment pending status. The Disclosure Gap story and homepage remain intact. No new diagram is added to the results article.

This review adds only a desktop table CSS correction and review artifacts. No taxonomy, incident, catalog evidence, frozen result or article wording changes were made.

## Evidence limitations

Historical records report 21 selected checks: 19 request scenarios (2 authorized, 17 expected denials), an audit check and a grouped isolation probe. The 13-test suite passed ordinary and optimized Python in the recorded experiment. Those scientific tests were not rerun here. The planner is scripted, with one transformation, one derivation level and a synthetic controller sink. I-6 residual plaintext, I-9 availability and I-10 metadata inference remain untested. Local evidence review is not independent reproduction. Hosted CI previously did not start because of a billing lock. These results do not validate a production mitigation.

Research revision: 4ac3224a5237937305596abe0d70d67290bc3575. Article SHA-256: b845aca97fe210bb2df0325118738bafa7b42919cb34395013a685bdd109de0b.

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

The operator subsequently approved committing, pushing and posting the article. Optional editorial improvements are listed separately. The screenshots were captured from ASI revision 6d44cb42055d71107048310158f3d35c185b9411 plus the recorded CSS correction; they represent that reviewed rendering. The pre-existing .claude/ directory was untouched and the research repository remains clean.

The preview server is left running at 127.0.0.1:4179. Playwright opened and inspected the article during capture. Automatic policy review rejected launching the user's default browser through PowerShell with the reason “blocked by policy”; Chrome and in-app browser surfaces were unavailable. Use the local article link above to open the visible preview manually.

Screenshots establish appearance only. Review materials remain local.

# Experiment 001 release verification

Human approval to post, commit and push was received on 2026-10-12 after article and visual review. The bounded results article was released from ASI commit `49ff9dc66e7b9fb79f1a6d0f601e3975157d0b83` on `main`, as a fast-forward from the reviewed research branch. The research evidence repository remains pinned to `4ac3224a5237937305596abe0d70d67290bc3575`; the article verification SHA-256 remains `b845aca97fe210bb2df0325118738bafa7b42919cb34395013a685bdd109de0b`.

Vercel reported the production deployment ready. The custom domain returned HTTP 200 and served the tested build assets `index-wjOyGkxB.js` and `index-BGFwrTfN.css`. The live article passed the focused Playwright navigation, refresh, section, table, status and repository-link checks on desktop and mobile (2/2). The public screenshot PNG link returned HTTP 200.

Local release gates before push: clean install, 20 unit/publication tests, strict catalog validation, production build, 42 Playwright checks, article sync check, and review artifact hash verification passed. `npm audit` reported zero vulnerabilities after the lockfile-only `source-map-js` update from 1.2.1 to 1.2.2. The existing Vite bundle-size warning remains nonblocking.

GitHub Actions run [38306159919](https://github.com/holeyfield33-art/agent-security-index/actions/runs/38306159919) did not start its job. Its annotation states: “The job was not started because your account is locked due to a billing issue.” This is an infrastructure block, not a passing CI result. The local and live checks above are distinct from hosted CI.

The [visual review index](review/experiment-001/final-preview/README.md) embeds the actual desktop and mobile screenshots. The images are versioned under `docs/review/experiment-001/final-preview/desktop/` and `mobile/` for UI review. They are not part of the results article’s body and do not establish effectiveness of the experimental security boundaries. The original architecture note continues to render its three native HTML diagrams.

No catalog evidence or taxonomy was changed. The article remains labeled **Experimental results** and **Local bounded evidence**, with I-6, I-9 and I-10 untested.

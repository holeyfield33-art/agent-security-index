# Custom-domain launch verification

Date: 2026-09-15. Target: https://index.aletheia-core.com/.

## Scope

This is a scoped release check, not a penetration test or a guarantee of search indexing. No taxonomy, incident, product-evidence, or research-content changes are included. Generated catalog and dist output remain ignored; `.gitignore` is unchanged.

Required views: `/`, `/#/research`, `/#/research/asi-research-001`, `/#/matrix`, `/#/methodology`, and `/export/asi-catalog.json`.

## Reproducible verification

Run from the repository root:

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
npm run test:e2e
$env:ASI_E2E_BASE_URL='https://index.aletheia-core.com'
npm run test:e2e
Remove-Item Env:ASI_E2E_BASE_URL
```

Install Chromium with `npx playwright install chromium` on a new machine. CI uses `--with-deps` on Linux. E2E artifacts are written under the system temporary directory, not committed.

Clean install, typecheck, all 15 unit tests, strict catalog validation, audit (zero reported vulnerabilities), production build, and whitespace checks passed. Both generated catalog paths exist. Catalog remains 40 classes, 23 incidents, six external products, and zero placeholder sources. The 504.31 kB JavaScript bundle produces a non-blocking size warning; the threshold was not weakened.

The E2E suite covers direct load/refresh, desktop and mobile Chromium, navigation/history, matrix controls, console errors, horizontal overflow, metadata restoration, crawler/social assets, headers, missing assets/maps, malformed routes, catalog failure/invalid data/timeout, inline-script CSP enforcement, and the JavaScript-disabled fallback. Failure injection occurs in the test browser and does not modify production.

## Metadata and hardening ownership

- `index.html`: initial title/description, canonical, robots, Open Graph, Twitter card, WebSite JSON-LD, no-JavaScript fallback.
- `src/lib/page-metadata.ts`: route-specific title/description and not-found noindex state.
- `public/robots.txt`, `public/sitemap.xml`: custom-domain crawler discovery, root-only sitemap.
- `public/favicon.svg`, `public/social-card.svg`, `public/social-card.png`: branding and 1200 by 630 sharing asset; regenerate with `npm run generate:social`.
- `vercel.json`: CSP, anti-framing, nosniff, host-scoped HSTS, referrer/permissions/opener policies, catalog revalidation/noindex.
- `src/lib/public-catalog.ts`, `src/App.tsx`: runtime rendering guard, ten-second fetch timeout, explicit error state, malformed-route handling.
- `vite.config.ts`: production source maps disabled.
- `.github/workflows/catalog.yml`: read-only token permissions, timeout, audit and browser gate.

## Known limitations and owner actions

The hash router serves one HTML document. Canonical and sitemap intentionally use the root URL; separate article crawlability and article-specific social unfurls are not established. No Search Console verification token, indexing result, or unsupported Article structured data was invented. See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) for the distinction between hash views and crawlable routes.

GitHub Actions run 34926030583 was prevented from starting: “The job was not started because your account is locked due to a billing issue.” The account owner must resolve billing and rerun CI. A successful Vercel deployment does not prove GitHub Actions passed.

Research remains evidence-scoped, with original evidence pending; this release does not upgrade that status. Chromium mobile emulation is not physical-device, Safari, or Firefox coverage. Inline styles remain permitted for the existing UI library; arbitrary inline scripts are not permitted.

See [the maintenance manual](RUN-AND-MAINTENANCE.md) for ongoing release, dependency, editorial, and recovery procedures. The final deployment verification result is reported with the release handoff, after pushing and checking the custom domain.

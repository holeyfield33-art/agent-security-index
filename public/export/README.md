# ASI Catalog machine-readable export

| File | Description |
|------|-------------|
| `catalog-meta.json` | Version, status |
| `attack-classes.json` | AAC-01…AAC-40 |
| `incidents.json` | Structured incidents with primary sources |
| `mitigations.json` | Mitigations (`validated` requires reproduction package) |
| `vendor-claims.json` | Unverified vendor claims only |
| `products.json` | Generated product fixtures from `src/data/products.ts` |
| `sources.json` | Generated source registry from `src/data/sources.ts` |
| `changelog.json` | Catalog version history |
| `asi-catalog.json` | Combined generated snapshot |

## CI

```bash
npm run assemble:catalog
node scripts/check-catalog-invariant.mjs --strict
```

Gate reads `asi-catalog.json`; run assembly first to refresh it from split files and typed product fixtures.

## Evidence tiers

Canonical definitions: [methodology source](../../src/data/methodology.ts).
The JSON tier identifiers retain these meanings; no schema change is introduced.

| Tier | Meaning |
|------|---------|
| T0 theoretical | Architecture-derived or threat-model evidence without a public proof of concept. |
| T1 lab PoC | A public proof of concept, benchmark, or controlled lab demonstration exists; independent reproduction is not implied. |
| T2 field incident | A documented production incident or a verified CVE with a supporting advisory exists. A vulnerability disclosure or lab PoC alone does not qualify; CVE-backed status does not imply malicious exploitation in the wild. |
| T3 widespread | Multiple independent cases meeting T2 exist across products, vendors, or campaigns. |

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

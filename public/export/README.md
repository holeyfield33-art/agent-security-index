# ASI Catalog machine-readable export

| File | Description |
|------|-------------|
| `catalog-meta.json` | Version, status |
| `attack-classes.json` | AAC-01…AAC-40 |
| `incidents.json` | Structured incidents with primary sources |
| `mitigations.json` | Mitigations (`validated` requires reproduction package) |
| `vendor-claims.json` | Unverified vendor claims only |
| `changelog.json` | Catalog version history |
| `asi-catalog.json` | Combined snapshot (add via local push if missing) |

## CI

```bash
node scripts/check-catalog-invariant.mjs
```

Gate reads `asi-catalog.json` if present, otherwise assemble from split files in a future revision.

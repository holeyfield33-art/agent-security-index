# Agent Security Index (ASI Catalog)

**Version:** 0.2.0-draft · **Status:** draft · **Independent review:** pending

Evidence-tiered research index of AI agent attack classes, incidents, mitigations, and vendor claims.

This is a **draft research product**, not a scanner, certification, or peer-reviewed ranking.

## What’s on main

### Matrix source (`src/lib/matrix/`)

| File | Contents |
|------|----------|
| `types.ts` | Lifecycle, protocol, AttackClass shapes |
| `classes.ts` | Canonical runtime index; normalizes legacy AX labels to AAC primary IDs |
| `classes-part-1.ts` … `classes-part-14.ts` | Source fragments for 40 classes; some legacy AX labels remain internally |
| `mitigations.ts` | 23 controls (`validated: false` pending independent review) |
| `catalog.ts` | Filters, high-risk, stats |

**Published taxonomy:** `AAC-01 … AAC-40`.
Legacy `AX-*` labels are retained only as aliases/source-fragment identifiers during migration. UI and assembled export consumers receive AAC primary IDs.

`AAC-41 … AAC-44` remain reserved for the broader research taxonomy and are not published in this draft until their evidence records are normalized.

### Matrix UI (`src/components/matrix/`)

| Component | Role |
|-----------|------|
| `matrix-app.tsx` | Shell: views, filters, detail |
| `matrix-table.tsx` | Sortable desktop table + mobile cards |
| `filter-bar.tsx` | Search, high-risk, protocol/domain chips, sheet |
| `lifecycle-map.tsx` | Stage histogram + heatmap |
| `exposure-view.tsx` | High-risk list + impact×complexity grid |
| `class-detail.tsx` | Detail sheet (CVEs, incidents, mitigations) |
| `labels.tsx` / `kpi-strip.tsx` | Badges and KPI strip |

### Export & CI

- `public/export/` — research JSON chunks plus generated `asi-catalog.json`
- `scripts/assemble-catalog.mjs` — canonicalizes IDs, checks duplicate/gap errors, assembles snapshot
- `scripts/assert-aac-ids.mjs` — verifies the source normalizes to unique contiguous AAC IDs
- `scripts/check-catalog-invariant.mjs` — credibility gate for evidence and claims
- `.github/workflows/catalog.yml` — typecheck, taxonomy/catalog tests, and build on PR/push

## Principles

- Attack classes are not CVEs. CVEs and incidents are *evidence* attached to classes.
- Mitigations are not `validated` unless a public reproduction package exists.
- Publisher products appear only as **unverified vendor claims** unless external evidence supports a stronger status.
- Missing evidence is shown as missing — never filled with synthetic confidence.
- Aletheia does not attempt to detect every attack; the research asks whether small deterministic security invariants can prevent whole attack families from producing consequential actions.

## Evidence tiers

| Tier | Meaning |
|------|---------|
| T0 · Theoretical | Architecture / literature only |
| T1 · Lab / PoC | Public PoC or controlled demo |
| T2 · Field incident | Production impact or CVE + advisory |
| T3 · Widespread | Multiple independent field cases |

## Local development

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm test
npm run build
npm run dev
```

Catalog-only checks:

```bash
npm run check:catalog
npm run check:catalog:strict
```

`check:catalog:strict` must pass before release. All incident primary sources resolve through the canonical source registry; placeholder URLs are not accepted.

See [Run and maintenance manual](docs/RUN-AND-MAINTENANCE.md) for daily operation, research updates, release gates, deployment, recovery, and the authoritative AAC mapping table.

## Disclosure

Aletheia publishes Agent Security Index. The launch directory contains external products only, without rankings or certification. Historical publisher product fixtures and their vendor claims are not part of the public catalog.

## License

Source and catalog data: see repository license terms. CVE and third-party research remain the property of their respective authors.

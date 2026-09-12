# Agent Security Index (ASI Catalog)

**Version:** 0.2.0-draft · **Status:** draft · **Independent review:** pending

Evidence-tiered research index of AI agent attack classes, incidents, mitigations, and vendor claims.

This is a **draft research product**, not a scanner, certification, or peer-reviewed ranking.

## What’s on main

### Matrix source (`src/lib/matrix/`)

| File | Contents |
|------|----------|
| `types.ts` | Lifecycle, protocol, AttackClass shapes |
| `classes.ts` | Index re-exporting parts 1–14 |
| `classes-part-1.ts` … `classes-part-14.ts` | **AX-01 … AX-40** (complete) |
| `mitigations.ts` | 22 controls (`validated: false` pending independent review) |
| `catalog.ts` | Filters, high-risk, stats |

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

- `public/export/` — AAC-oriented JSON chunks (partial; regenerate from matrix source)
- `scripts/check-catalog-invariant.mjs` — credibility CI gate
- `scripts/assemble-catalog.mjs` — assemble full catalog snapshot

## Principles

- Attack classes are not CVEs. CVEs and incidents are *evidence* attached to classes.
- Mitigations are not `validated` unless a public reproduction package exists.
- Publisher products appear only as **unverified vendor claims**.
- Missing evidence is shown as missing — never filled with synthetic confidence.

## Evidence tiers

| Tier | Meaning |
|------|---------|
| T0 · Theoretical | Architecture / literature only |
| T1 · Lab / PoC | Public PoC or controlled demo |
| T2 · Field incident | Production impact or CVE + advisory |
| T3 · Widespread | Multiple independent field cases |

## Local development

```bash
npm install
npm run dev
npm run check:catalog
npm test
```

```bash
node scripts/assemble-catalog.mjs
node scripts/check-catalog-invariant.mjs          # draft: placeholders warn
node scripts/check-catalog-invariant.mjs --strict # placeholders fail
```

## Disclosure

Aletheia develops Aegis and Lite. Those products are listed only under vendor claims and are evaluated with the same rules as any other vendor.

## License

Source and catalog data: see repository license terms. CVE and third-party research remain the property of their respective authors.

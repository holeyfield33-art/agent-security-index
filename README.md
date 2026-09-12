# Agent Security Index (ASI Catalog)

**Version:** 0.2.0-draft · **Status:** draft · **Independent review:** pending

Evidence-tiered research index of AI agent attack classes, incidents, mitigations, and vendor claims.

This is a **draft research product**, not a scanner, certification, or peer-reviewed ranking.

## Source of truth

Working matrix under `src/lib/matrix/`:

| File | Contents |
|------|----------|
| `types.ts` | Lifecycle, protocol, AttackClass shapes |
| `classes.ts` | Index re-exporting parts 1–14 |
| `classes-part-1.ts` … `classes-part-14.ts` | **AX-01 … AX-40** (complete) |
| `mitigations.ts` | 22 controls (`validated: false` pending independent review) |
| `catalog.ts` | Filters, high-risk, stats |

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

## Machine-readable export

```bash
node scripts/assemble-catalog.mjs
node scripts/check-catalog-invariant.mjs          # draft: placeholders warn
node scripts/check-catalog-invariant.mjs --strict # placeholders fail
```

Export chunks under `public/export/` (AAC taxonomy) can be regenerated from the AX matrix source.

## Local development

```bash
npm install
npm run dev
npm run check:catalog
npm test
```

## Disclosure

Aletheia develops Aegis and Lite. Those products are listed only under vendor claims and are evaluated with the same rules as any other vendor.

## License

Source and catalog data: see repository license terms. CVE and third-party research remain the property of their respective authors.

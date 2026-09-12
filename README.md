# Agent Security Index (ASI Catalog)

**Version:** 0.2.0-draft · **Status:** draft · **Independent review:** pending

Evidence-tiered research index of AI agent attack classes (AAC-01…AAC-40), incidents, mitigations, and vendor claims.

This is a **draft research product**, not a scanner, certification, or peer-reviewed ranking.

## What’s in the repo

| Area | Status |
|------|--------|
| AAC export chunks 01–02 | Present |
| AAC export chunks 03–04 + incidents 02–03 | Partially restored; regenerate from matrix source |
| Matrix source of truth (`src/lib/matrix/`) | types, catalog helpers present; **classes.ts + mitigations.ts still being pushed** |
| CI gate (`scripts/check-catalog-invariant.mjs`) | Present |
| Assemble / decode helpers | Present |

## Principles

- Attack classes are not CVEs. CVEs and incidents are *evidence* attached to classes.
- Mitigations are not `validated` unless a public reproduction package exists.
- Publisher products (Aletheia Aegis / Lite) appear only as **unverified vendor claims**.
- Missing evidence is shown as missing — never filled with synthetic confidence.

## Evidence tiers

| Tier | Meaning |
|------|---------|
| T0 · Theoretical | Architecture / literature only |
| T1 · Lab / PoC | Public PoC or controlled demo |
| T2 · Field incident | Production impact or CVE + advisory |
| T3 · Widespread | Multiple independent field cases |

## Source of truth

The working matrix lives under `src/lib/matrix/`:

- `types.ts` — lifecycle, protocol, AttackClass shapes
- `catalog.ts` — filters, high-risk, stats
- `classes.ts` — AX-01…AX-40 (to be pushed / already in local workspace zip)
- `mitigations.ts` — mitigation catalog

Export JSON under `public/export/` is derived from that source (AAC ids + evidence tiers).

## Machine-readable export

```bash
node scripts/assemble-catalog.mjs
node scripts/check-catalog-invariant.mjs          # draft: placeholders warn
node scripts/check-catalog-invariant.mjs --strict # placeholders fail
```

## Local development

```bash
npm install
npm run dev
npm run check:catalog
npm test
```

## Disclosure

Aletheia develops Aegis and Lite. Those products are listed only under vendor claims (`unverified_vendor_claim`) and are evaluated with the same rules as any other vendor.

## License

Source and catalog data: see repository license terms. CVE and third-party research remain the property of their respective authors.

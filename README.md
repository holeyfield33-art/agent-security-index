# Agent Security Index (ASI Catalog)

**Version:** 2026.09.0 · **Status:** draft · **Independent review:** pending

Evidence-tiered research index of AI agent attack classes (AAC-01…AAC-40), incidents, mitigations, and vendor claims.

This is a **draft research product**, not a scanner, certification, or peer-reviewed ranking.

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

## Machine-readable export

- [`public/export/asi-catalog.json`](public/export/asi-catalog.json) — full catalog snapshot
- Credibility CI gate: `npm run check:catalog`

```bash
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

Aletheia develops Aegis and Lite. Those products are listed only under vendor claims (`unverified_vendor_claim`) and are evaluated with the same rules as any other vendor. They are not hard-coded to the top of any ranking.

## License

Source and catalog data: see repository license terms. CVE and third-party research remain the property of their respective authors.

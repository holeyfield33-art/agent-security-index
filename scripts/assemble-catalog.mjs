#!/usr/bin/env node
/**
 * Assemble public/export/asi-catalog.json.
 * Canonical IDs are AAC-01…AAC-NN. Legacy AX-* labels are preserved as aliases.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dir = join(root, "public/export");
const partsDir = join(root, "src/lib/matrix");

function canonicalId(id) {
  const match = /^(?:AX|AAC)-(\d{2})$/.exec(String(id));
  return match ? `AAC-${match[1]}` : String(id);
}

function loadJsonChunks(prefix) {
  const out = [];
  const files = readdirSync(dir)
    .filter((n) => new RegExp(`^${prefix}-\\d+\\.json$`).test(n))
    .sort();
  for (const f of files) {
    out.push(...JSON.parse(readFileSync(join(dir, f), "utf8")));
  }
  return out;
}

function normalizeMitigationStatus(status) {
  if (status === "established_practice") return "established-practice";
  if (status === "paper_evaluated") return "paper-evaluated";
  if (status === "aletheia_tested") return "aletheia-tested";
  return status;
}

function loadProductsFromTs() {
  const src = readFileSync(join(root, "src/data/products.ts"), "utf8");
  const disclosureMatch = src.match(/export const PUBLISHER_PRODUCT_DISCLOSURE\s*=\s*("[\s\S]*?");/);
  const productsMatch = src.match(/export const PRODUCTS(?::[\s\S]*?)?=\s*(\[[\s\S]*\]);?\s*$/);
  if (!disclosureMatch || !productsMatch) {
    throw new Error("Could not parse src/data/products.ts");
  }
  const disclosure = Function(`"use strict"; return (${disclosureMatch[1]});`)();
  return Function(
    "PUBLISHER_PRODUCT_DISCLOSURE",
    `"use strict"; return (${productsMatch[1]});`,
  )(disclosure);
}

function loadClassesFromTs() {
  const parts = readdirSync(partsDir)
    .filter((n) => /^classes-part-\d+\.ts$/.test(n))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  const classes = [];
  for (const f of parts) {
    const src = readFileSync(join(partsDir, f), "utf8");
    const m = src.match(/=\s*(\[[\s\S]*\]);?\s*$/);
    if (!m) continue;
    const arr = Function(`"use strict"; return (${m[1]})`)();
    classes.push(...arr);
  }

  return classes.map((c) => {
    const rawId = String(c.id);
    const id = canonicalId(rawId);
    const legacyFromAka = c.aka && String(c.aka).match(/AX-\d{2}/)?.[0];
    const legacyId = /^AX-\d{2}$/.test(rawId) ? rawId : legacyFromAka;
    const aliases = [
      id,
      ...(legacyId ? [legacyId] : []),
      ...(c.aka ? String(c.aka).split(/;\s*/) : []),
    ].filter(Boolean);

    return {
      id,
      legacyId,
      name: c.name,
      aliases: [...new Set(aliases)],
      family: c.vector,
      oneLine: c.summary,
      description: c.description,
      vector: c.vector,
      protocols: c.protocols,
      domains: c.domains,
      lifecycle: c.lifecycle,
      impact: c.impact,
      complexity: c.complexity,
      architecturalImpact: c.architecturalImpact,
      technicalVector: c.technicalVector,
      owasp: c.owasp ?? [],
      cves: c.cves ?? [],
      incidents: c.incidents ?? [],
      mitigations: c.mitigations ?? [],
      riskScore: c.riskScore,
      evidenceTier: "T1_lab_poc",
      validatedMitigationIds: [],
    };
  });
}

function assertCanonicalClasses(classes, declaredCount) {
  if (!Number.isInteger(declaredCount) || declaredCount <= 0) {
    throw new Error(`catalog-meta.classCount must be a positive integer, got ${declaredCount}`);
  }

  const ids = classes.map((c) => c.id);
  const bad = ids.filter((id) => !/^AAC-\d{2}$/.test(id));
  if (bad.length) throw new Error(`non-canonical attack IDs: ${bad.join(", ")}`);

  const unique = new Set(ids);
  if (unique.size !== ids.length) throw new Error("duplicate attack class IDs after canonicalization");

  if (ids.length !== declaredCount) {
    throw new Error(`catalog class count mismatch: declared ${declaredCount}, observed ${ids.length}`);
  }

  const expected = Array.from(
    { length: declaredCount },
    (_, i) => `AAC-${String(i + 1).padStart(2, "0")}`,
  );
  const missing = expected.filter((id) => !unique.has(id));
  if (missing.length) throw new Error(`catalog has gaps: ${missing.join(", ")}`);
}

const sourceMeta = JSON.parse(readFileSync(join(dir, "catalog-meta.json"), "utf8"));
const declaredClassCount = sourceMeta.classCount;
let attacks = loadJsonChunks("attack-classes");
const fromTs = existsSync(partsDir) ? loadClassesFromTs() : [];
if (fromTs.length >= attacks.length && fromTs.length > 0) {
  if (attacks.length !== fromTs.length) {
    console.log(`json chunks had ${attacks.length} classes; using TS source (${fromTs.length})`);
  }
  attacks = fromTs;
} else {
  attacks = attacks.map((c) => ({ ...c, id: canonicalId(c.id) }));
}
assertCanonicalClasses(attacks, declaredClassCount);

const incidents = loadJsonChunks("incidents");
const mitigations = JSON.parse(readFileSync(join(dir, "mitigations.json"), "utf8"))
  .map((m) => ({ ...m, status: normalizeMitigationStatus(m.status) }));
const vendorClaims = JSON.parse(readFileSync(join(dir, "vendor-claims.json"), "utf8"));
const products = loadProductsFromTs();
writeFileSync(join(dir, "products.json"), JSON.stringify(products, null, 2));
const changelog = JSON.parse(readFileSync(join(dir, "changelog.json"), "utf8"));

const meta = {
  ...sourceMeta,
  classCount: attacks.length,
  incidentCount: incidents.length,
  taxonomyId: "AAC",
  taxonomyRange: `AAC-01…AAC-${String(attacks.length).padStart(2, "0")}`,
  legacyTaxonomy: "AX (legacy labels retained as aliases only)",
};

const exp = {
  catalog: meta,
  attackClasses: attacks,
  incidents,
  mitigations,
  vendorClaims,
  products,
  changelog,
};
writeFileSync(join(dir, "asi-catalog.json"), JSON.stringify(exp));
console.log("assembled", attacks.length, "classes", incidents.length, "incidents", meta.taxonomyRange);

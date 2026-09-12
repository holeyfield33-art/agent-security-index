#!/usr/bin/env node
/**
 * Assemble public/export/asi-catalog.json from JSON chunks.
 * If attack-class JSON chunks are incomplete, fall back to src/lib/matrix/classes-part-*.ts.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dir = join(root, "public/export");
const partsDir = join(root, "src/lib/matrix");

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
  return classes.map((c) => ({
    id: String(c.id).replace(/^AX-/, "AAC-"),
    legacyId: c.id,
    name: c.name,
    aliases: c.aka ? [c.id, c.aka] : [c.id],
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
  }));
}

const meta = JSON.parse(readFileSync(join(dir, "catalog-meta.json"), "utf8"));
let attacks = loadJsonChunks("attack-classes");
if (attacks.length < 40 && existsSync(partsDir)) {
  const fromTs = loadClassesFromTs();
  if (fromTs.length > attacks.length) {
    console.log(`json chunks had ${attacks.length} classes; using TS source (${fromTs.length})`);
    attacks = fromTs;
  }
}
const incidents = loadJsonChunks("incidents");
const mitigations = JSON.parse(readFileSync(join(dir, "mitigations.json"), "utf8"));
const vendorClaims = JSON.parse(readFileSync(join(dir, "vendor-claims.json"), "utf8"));
const changelog = JSON.parse(readFileSync(join(dir, "changelog.json"), "utf8"));

meta.classCount = attacks.length;
meta.incidentCount = incidents.length;

const exp = {
  catalog: meta,
  attackClasses: attacks,
  incidents,
  mitigations,
  vendorClaims,
  changelog,
};
writeFileSync(join(dir, "asi-catalog.json"), JSON.stringify(exp));
writeFileSync(join(dir, "catalog-meta.json"), JSON.stringify(meta, null, 2) + "\n");
console.log("assembled", attacks.length, "classes", incidents.length, "incidents");

#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const dir = join(dirname(fileURLToPath(import.meta.url)), "../public/export");
const meta = JSON.parse(readFileSync(join(dir, "catalog-meta.json"), "utf8"));
const attacks = [];
for (const f of readdirSync(dir).filter(n => /^attack-classes-\d+\.json$/.test(n)).sort()) {
  attacks.push(...JSON.parse(readFileSync(join(dir, f), "utf8")));
}
const incidents = [];
for (const f of readdirSync(dir).filter(n => /^incidents-\d+\.json$/.test(n)).sort()) {
  incidents.push(...JSON.parse(readFileSync(join(dir, f), "utf8")));
}
const mitigations = JSON.parse(readFileSync(join(dir, "mitigations.json"), "utf8"));
const vendorClaims = JSON.parse(readFileSync(join(dir, "vendor-claims.json"), "utf8"));
const changelog = JSON.parse(readFileSync(join(dir, "changelog.json"), "utf8"));
const exp = { catalog: meta, attackClasses: attacks, incidents, mitigations, vendorClaims, changelog };
writeFileSync(join(dir, "asi-catalog.json"), JSON.stringify(exp));
console.log("assembled", attacks.length, "classes", incidents.length, "incidents");

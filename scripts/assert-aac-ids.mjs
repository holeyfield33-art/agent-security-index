#!/usr/bin/env node
/**
 * Assert that the published taxonomy normalizes to contiguous AAC-NN IDs
 * and matches the declared catalog class count.
 * Legacy AX-NN identifiers are allowed only inside source fragments and are
 * canonicalized at the matrix/catalog boundary.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/lib/matrix");
const meta = JSON.parse(readFileSync(join(root, "public/export/catalog-meta.json"), "utf8"));
const declaredCount = meta.classCount;

if (!Number.isInteger(declaredCount) || declaredCount <= 0) {
  console.error(`[assert-aac-ids] invalid catalog-meta.classCount: ${declaredCount}`);
  process.exit(1);
}

const parts = readdirSync(dir)
  .filter((n) => /^classes-part-\d+\.ts$/.test(n))
  .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

const canonical = [];
const badSourceIds = [];
for (const f of parts) {
  const src = readFileSync(join(dir, f), "utf8");
  const m = src.match(/=\s*(\[[\s\S]*\]);?\s*$/);
  if (!m) continue;
  const arr = Function(`"use strict"; return (${m[1]})`)();
  for (const c of arr) {
    if (!/^(?:AX|AAC)-\d{2}$/.test(c.id)) {
      badSourceIds.push(`${f}:${c.id}`);
      continue;
    }
    canonical.push(c.id.replace(/^AX-/, "AAC-"));
  }
}

if (badSourceIds.length) {
  console.error("[assert-aac-ids] invalid source ids:", badSourceIds.join(", "));
  process.exit(1);
}

const unique = new Set(canonical);
if (unique.size !== canonical.length) {
  console.error("[assert-aac-ids] duplicate canonical ids detected");
  process.exit(1);
}

if (canonical.length !== declaredCount) {
  console.error(
    `[assert-aac-ids] catalog class count mismatch: declared ${declaredCount}, observed ${canonical.length}`,
  );
  process.exit(1);
}

const expected = Array.from(
  { length: declaredCount },
  (_, i) => `AAC-${String(i + 1).padStart(2, "0")}`,
);
const missing = expected.filter((id) => !unique.has(id));
if (missing.length) {
  console.error("[assert-aac-ids] canonical taxonomy has gaps:", missing.join(", "));
  process.exit(1);
}

console.log(
  `[assert-aac-ids] ok — ${canonical.length} unique contiguous AAC-NN canonical ids (declared ${declaredCount})`,
);

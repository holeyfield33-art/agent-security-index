#!/usr/bin/env node
/** Fail if any attack class primary id is still AX-* */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const dir = join(dirname(fileURLToPath(import.meta.url)), "../src/lib/matrix");
const parts = readdirSync(dir).filter((n) => /^classes-part-\d+\.ts$/.test(n));
const bad = [];
for (const f of parts) {
  const src = readFileSync(join(dir, f), "utf8");
  const m = src.match(/=\s*(\[[\s\S]*\]);?\s*$/);
  if (!m) continue;
  const arr = Function(`return (${m[1]})`)();
  for (const c of arr) {
    if (!/^AAC-\d{2}$/.test(c.id)) bad.push(`${f}:${c.id}`);
  }
}
if (bad.length) {
  console.error("[assert-aac-ids] non-AAC primary ids:", bad.join(", "));
  process.exit(1);
}
console.log("[assert-aac-ids] ok — all primary ids are AAC-NN");

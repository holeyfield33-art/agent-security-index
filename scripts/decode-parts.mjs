#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const partsDir = join(root, "public/export/.parts");
const groups = {};
for (const f of readdirSync(partsDir).sort()) {
  if (!f.endsWith(".b64")) continue;
  const m = f.match(/^(.+)\.(\d+)\.b64$/);
  if (!m) continue;
  const outRel = m[1].replace(/_/g, "/");
  (groups[outRel] ||= []).push({ i: parseInt(m[2], 10), f });
}
for (const [outRel, segs] of Object.entries(groups)) {
  segs.sort((a, b) => a.i - b.i);
  const b64 = segs.map(s => readFileSync(join(partsDir, s.f), "utf8")).join("");
  const buf = Buffer.from(b64, "base64");
  const outPath = join(root, outRel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buf);
  console.log("wrote", outRel, buf.length);
}

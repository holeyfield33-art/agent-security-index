import { readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { parseResearch } from "./research-markdown.mjs";

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/sync-research.mjs <path-to-canonical-RESEARCH.md>");
const article = parseResearch(readFileSync(source, "utf8"));
if (article.title !== "The Disclosure Gap") throw new Error("Expected ASI Research 001");
const output = "// Generated from ASI-Research-v1/RESEARCH.md. Do not edit manually.\n" +
  "export const RESEARCH_001 = " + JSON.stringify(article, null, 2) + " as const;\n";
const target = new URL("../src/data/research-001.generated.ts", import.meta.url);
if (process.argv.includes("--check")) assert.equal(readFileSync(target, "utf8"), output, "Research snapshot differs from canonical Markdown; run the sync command");
else writeFileSync(target, output);
console.log(`${process.argv.includes("--check") ? "Verified" : "Synced"} ASI Research 001: ${article.wordCount} words (sections 1-10 including headings, excluding references); SHA-256 ${article.sourceSha256}`);

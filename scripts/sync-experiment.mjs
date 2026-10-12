import { readFileSync, writeFileSync } from "node:fs";
import { parseExperiment } from "./experiment-markdown.mjs";

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/sync-experiment.mjs path/to/ARTICLE.md [--check]");
const article = parseExperiment(readFileSync(source, "utf8"));
const prefix = `// Generated from the reviewed Experiment 001 article; no runtime source fetch.\nexport type ExperimentBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] } | { type: "table"; headers: string[]; rows: string[][] };\nexport interface ExperimentArticle { title: string; subtitle: string; sourceSha256: string; sections: { id: string; heading: string; blocks: ExperimentBlock[] }[] }\n`;
const output = prefix + `export const EXPERIMENT_001_ARTICLE: ExperimentArticle = ${JSON.stringify(article, null, 2)};\n`;
const target = new URL("../src/data/experiment-001.generated.ts", import.meta.url);
if (process.argv.includes("--check")) {
  if (readFileSync(target, "utf8") !== output) throw new Error("Experiment article snapshot differs from reviewed source");
} else writeFileSync(target, output);
console.log(`Experiment article snapshot: ${article.sections.length} sections; SHA-256 ${article.sourceSha256}`);

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseResearch } from "./research-markdown.mjs";

function resolveAlias(name) {
  const base = `src/${name.slice(2)}`;
  for (const extension of [".ts", ".tsx"]) if (existsSync(new URL(`../${base}${extension}`, import.meta.url))) return `${base}${extension}`;
  throw new Error(`Unable to resolve alias: ${name}`);
}

function loadTS(relative) {
  const url = new URL(`../${relative}`, import.meta.url);
  const require = createRequire(url);
  const source = readFileSync(url, "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } });
  const mod = { exports: {} };
  new Function("require", "exports", "module", outputText)(name => name.startsWith("@/") ? loadTS(resolveAlias(name)) : require(name), mod.exports, mod);
  return mod.exports;
}
const { RESEARCH_PUBLICATIONS } = loadTS("src/data/research.ts");
const { RESEARCH_001 } = loadTS("src/data/research-001.generated.ts");
const { researchLinkHref } = loadTS("src/lib/research-links.ts");
const disclosureGap = RESEARCH_PUBLICATIONS.find(p => p.slug === "asi-research-001");
const architectureNote = RESEARCH_PUBLICATIONS.find(p => p.slug === "reference-not-authority");

test("published study retains evidence limitations and no PDF or product claims", () => {
  assert.equal(RESEARCH_PUBLICATIONS.length, 2);
  assert(disclosureGap);
  const p = disclosureGap;
  assert.equal(p.status, "Published article");
  assert.equal(p.evidenceStatus, "Original evidence pending");
  assert.match(p.qualification, /author-reported, not independently substantiated/);
  assert.match(p.scope, /no evidence of a shared jailbreak or attack class/i);
  assert.match(p.safetyNote, /withheld/);
  assert.match(p.safetyNote, /illustrative/);
  assert(!JSON.stringify(p).includes('.pdf'));
  assert.equal(RESEARCH_001.title, p.title);
  assert.equal(RESEARCH_001.subtitle, p.subtitle);
  assert.equal(RESEARCH_001.sections.length, 11);
  assert.match(RESEARCH_001.sourceSha256, /^[a-f0-9]{64}$/);
});

test("architecture note is explicitly proposed research with experiment pending", () => {
  assert(architectureNote);
  assert.equal(architectureNote.id, "ASI-ARCH-001");
  assert.equal(architectureNote.status, "Architecture note");
  assert.equal(architectureNote.evidenceStatus, "Experiment pending");
  assert.equal(architectureNote.repositoryUrl, null);
  assert.match(architectureNote.qualification, /not a validated or production-grade security system/i);
  assert.match(architectureNote.scope, /single-machine, multi-process/i);
  assert.match(architectureNote.scope, /stateful-agent memory/i);
  assert.match(architectureNote.safetyNote, /complete semantic provenance/i);
});

test("native article renders all 11 sections, links and qualified core claim", () => {
  const { ResearchArticle } = loadTS("src/components/research-article.tsx");
  const html = renderToStaticMarkup(React.createElement(ResearchArticle));
  assert.equal((html.match(/<h2 /g) ?? []).length, 11);
  assert(html.includes(disclosureGap.coreClaim));
  assert.match(html, /not original test captures/);
  assert.match(html, /Known does not mean fixed/);
  assert(!/iframe|<script|\.pdf|Aegis|Lite|Runtime Firewall/.test(html));
  for (const match of html.matchAll(/href="([^"]+)"/g)) assert(match[1].startsWith("https://"));
});

test("architecture note contains frozen invariants, bootstrap rules and implementation threat model", () => {
  const { ArchitectureNote001 } = loadTS("src/components/architecture-note-001.tsx");
  const html = renderToStaticMarkup(React.createElement(ArchitectureNote001));
  for (const invariant of ["T1", "T2", "T3", "T4", "T5"]) assert(html.includes(invariant));
  for (const threat of ["I-1", "I-2", "I-3", "I-4", "I-5", "I-6", "I-7", "I-8", "I-9", "I-10"]) assert(html.includes(threat));
  assert.match(html, /Reference issuance comes before reference use/);
  assert.match(html, /Opacity cannot mean semantic blindness/);
  assert.match(html, /worker is the primary plaintext attack surface/i);
  assert.match(html, /runtime dependency provenance/i);
  assert.match(html, /Stateful agents remain an open boundary/);
  assert.match(html, /Implementation threat model/);
  assert.match(html, /Experiment 001/);
  assert(!/Aletheia|Runtime Firewall|Helios|VAR/.test(html));
});

test("article blocks have only supported types and every link resolves safely", () => {
  let linkCount = 0;
  for (const section of RESEARCH_001.sections) for (const block of section.blocks) {
    assert(["paragraph", "quote", "list"].includes(block.type));
    for (const text of block.items ?? [block.text]) for (const link of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      assert(researchLinkHref(link[1]), link[1]);
      linkCount++;
    }
  }
  assert(linkCount >= 10);
});

test("link resolver rejects unsafe schemes and arbitrary relative paths", () => {
  for (const href of ["javascript:alert(1)", "data:text/html,test", "//example.com", "../private", "https://name:secret@example.com"]) assert.equal(researchLinkHref(href), null);
  assert.equal(researchLinkHref("METHODOLOGY.md"), disclosureGap.methodologyUrl);
});

test("Markdown conversion is deterministic and rejects unsupported embedded markup", () => {
  const fixture = "# The Disclosure Gap\n\n## Subtitle\n\n" + Array.from({length:11}, (_,i) => `## ${i+1}. Section ${i+1}\n\nParagraph.\n`).join("\n");
  assert.deepEqual(parseResearch(fixture), parseResearch(fixture.replace(/\n/g,"\r\n")));
  assert.throws(() => parseResearch(fixture + "\n<script>bad</script>"));
  assert.throws(() => parseResearch(fixture + "\n![image](bad.png)"));
  assert.throws(() => parseResearch(fixture.replace("## 5.","## 9.")));
});

test("committed article word count matches sections 1-10, excluding references", () => {
  const prose = RESEARCH_001.sections.slice(0, 10).flatMap(s => [s.heading, ...s.blocks.flatMap(b => b.items ?? [b.text])]).join(" ");
  const words = prose.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
  assert.equal(words, RESEARCH_001.wordCount);
  assert(words > 1200);
});

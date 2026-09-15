import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../src/data/research.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { RESEARCH_PUBLICATIONS } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("Research 001 exposes the qualified draft without implying final evidence or a PDF", () => {
  assert.equal(RESEARCH_PUBLICATIONS.length, 1);
  const publication = RESEARCH_PUBLICATIONS[0];
  assert.equal(publication.id, "ASI-RESEARCH-001");
  assert.equal(publication.title, "The Disclosure Gap");
  assert.equal(publication.status, "Editorial draft");
  assert.equal(publication.evidenceStatus, "Public evidence pending");
  assert.match(publication.qualification, /not an independently substantiated result/);
  assert.match(publication.scope, /does not claim a shared jailbreak or attack class/);
  assert.match(publication.safetyNote, /withheld/);
  assert.match(publication.safetyNote, /text approval/);
  assert(!JSON.stringify(publication).includes('.pdf'));
});

test("research reading links target the canonical repository without runtime fetching", () => {
  const links = RESEARCH_PUBLICATIONS[0].links;
  assert.equal(new Set(links.map(link => link.href)).size, 5);
  for (const link of links) {
    const url = new URL(link.href);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "github.com");
    assert(url.pathname.startsWith("/holeyfield33-art/ASI-Research-v1"));
  }
  assert(links.some(link => link.href.endsWith("/RESEARCH.md")));
  assert(links.some(link => link.href.endsWith("/evidence/README.md")));
});

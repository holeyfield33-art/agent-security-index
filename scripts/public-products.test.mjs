import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateCatalog } from "./check-catalog-invariant.mjs";

const read = (name) => JSON.parse(readFileSync(new URL(`../public/export/${name}`, import.meta.url), "utf8"));
const catalog = read("asi-catalog.json");
const expected = ["promptfoo-red-teaming", "checkpoint-ai-guardrails", "invariant-mcp-scan", "nvidia-nemo-guardrails", "meta-llamafirewall", "aws-agentcore-policy-guardrails"];

test("launch snapshot contains exactly the six external profiles in both exports", () => {
  assert.deepEqual(catalog.products.map(p => p.id), expected);
  assert.deepEqual(read("products.json"), catalog.products);
  assert(catalog.products.every(p => p.publisherProduct === false));
  assert.deepEqual(catalog.vendorClaims, []);
  assert(!JSON.stringify(catalog.products).includes('aletheia-'));
});

test("all public coverage has supported evidence, valid mappings and visible limitations", () => {
  const sources = new Set(catalog.sources.map(s => s.id));
  const classes = new Set(catalog.attackClasses.map(a => a.id));
  const mitigations = new Set(catalog.mitigations.map(m => m.id));
  for (const p of catalog.products) for (const c of p.coverages) {
    assert(["documented", "third-party-evaluated", "reproduced"].includes(c.evidenceStatus));
    assert(c.evidenceSourceIds.length > 0);
    assert(c.evidenceSourceIds.every(id => sources.has(id)));
    assert(classes.has(c.attackClassId));
    assert(c.mitigationIds.every(id => mitigations.has(id)));
    assert(c.limitations.length > 0);
  }
  assert.equal(evaluateCatalog(catalog, { strict: true }).status, "ok");
});

const rejects = (mutate, code) => {
  const copy = structuredClone(catalog);
  mutate(copy);
  assert(evaluateCatalog(copy, { strict: true }).errors.some(e => e.code === code));
};
test("validator rejects publisher profiles, claims and overall scores", () => {
  rejects(c => { c.products[0].publisherProduct = true; }, "product.publisher.prohibited");
  rejects(c => { c.vendorClaims.push({productId: "aletheia-lite", vendor: "Aletheia", isPublisherProduct: true}); }, "vendor_claim.publisher.prohibited");
  rejects(c => { c.products[0].overallScore = 99; }, "product.score.present");
  rejects(c => c.products.push(c.products[0]), "product.duplicate_id");
});
test("validator rejects unsupported or broken public coverage", () => {
  rejects(c => { c.products[0].coverages[0].evidenceSourceIds = []; }, "product.coverage.public_evidence.required");
  rejects(c => { c.products[0].coverages[0].evidenceStatus = "vendor-claimed"; }, "product.coverage.public_evidence.required");
  rejects(c => { c.products[0].coverages[0].evidenceSourceIds = ["missing"]; }, "product.coverage.source.unknown");
  rejects(c => { c.products[0].coverages[0].attackClassId = "AAC-43"; }, "product.coverage.unknown_attack_class");
});
test("zero coverage and explicit unknown coverage remain valid without conversion", () => {
  const empty = structuredClone(catalog); empty.products[0].coverages = [];
  assert.equal(evaluateCatalog(empty, { strict: true }).status, "ok");
  const unknown = structuredClone(catalog); unknown.products[0].coverages[0].coverage = "unknown";
  assert.equal(evaluateCatalog(unknown, { strict: true }).status, "ok");
  assert.equal(unknown.products[0].coverages[0].coverage, "unknown");
});

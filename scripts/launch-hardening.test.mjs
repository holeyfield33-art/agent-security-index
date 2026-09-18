import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";

const read = file => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const code = ts.transpileModule(read("src/lib/public-catalog.ts"), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { parsePublicCatalog } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);

test("README, export documentation and UI evidence levels match canonical tiers", async () => {
  const compiled = ts.transpileModule(read("src/data/methodology.ts"), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  const { EVIDENCE_TIER_MEANINGS: tiers, ATTACK_EVIDENCE_LEVEL_MEANINGS: levels } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
  const mappings = { T0_theoretical: "theoretical", T1_lab_poc: "lab-poc", T2_field_incident: "field-observed", T3_widespread: "multiple-field-cases" };
  for (const tier of tiers) {
    assert.equal(levels.find(level => level.value === mappings[tier.value]).meaning, tier.meaning);
    for (const file of ["README.md", "public/export/README.md"]) {
      assert(read(file).includes(`| ${tier.label} | ${tier.meaning} |`), `${file} differs from ${tier.value}`);
    }
  }
  const catalog = JSON.parse(read("public/export/asi-catalog.json"));
  const plugin4shell = catalog.incidents.find(incident => incident.id === "INC-501");
  assert.equal(plugin4shell.evidenceTier, "T1_lab_poc");
  assert.equal(plugin4shell.attackEvidenceLevel, "lab-poc");
  assert.deepEqual(plugin4shell.attackClassIds, ["AAC-10", "AAC-05"]);
});

test("published catalog passes rendering guard; malformed records fail closed", () => {
  const catalog = JSON.parse(read("public/export/asi-catalog.json"));
  assert.equal(parsePublicCatalog(catalog).incidents.length, 24);
  for (const bad of [null, {}, {incidents:[{}],sources:[]}, {incidents:[],sources:[{url:"javascript:alert(1)"}]}]) assert.throws(() => parsePublicCatalog(bad));
  const bad = structuredClone(catalog); bad.incidents[0].cveIds = {}; assert.throws(() => parsePublicCatalog(bad));
  const unsafe = structuredClone(catalog); unsafe.sources[0].url = "javascript:alert(1)"; assert.throws(() => parsePublicCatalog(unsafe));
});

test("canonical, crawlers and structured metadata use the custom domain without hash URLs", () => {
  const html = read("index.html");
  assert.match(html, /rel="canonical" href="https:\/\/index.aletheia-core.com\/"/);
  for (const key of ["og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:image", "robots"]) assert(html.includes(`"${key}"`));
  const json = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(json.url, "https://index.aletheia-core.com/");
  assert.equal(json["@type"], "WebSite");
  assert(!read("public/sitemap.xml").includes("#"));
  assert(read("public/robots.txt").includes("Sitemap: https://index.aletheia-core.com/sitemap.xml"));
});

test("CSP authorizes only the exact structured metadata, not arbitrary inline scripts", () => {
  const json = read("index.html").match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const csp = JSON.parse(read("vercel.json")).headers[0].headers.find(h=>h.key === "Content-Security-Policy").value;
  assert(csp.includes(`'sha256-${createHash("sha256").update(json).digest("base64")}'`));
  assert(!csp.split("script-src ")[1].split(";")[0].includes("unsafe-"));
  assert(csp.includes("frame-ancestors 'none'"));
  assert(csp.includes("object-src 'none'"));
});

test("social preview is an actual 1200 by 630 PNG and production maps are disabled", () => {
  const png = readFileSync(new URL("../public/social-card.png", import.meta.url));
  assert.equal(png.subarray(0,8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16),1200); assert.equal(png.readUInt32BE(20),630);
  assert.match(read("vite.config.ts"), /sourcemap: false/);
});

#!/usr/bin/env node
/**
 * Catalog credibility gate for Agent Security Index.
 * Exit: 0 ok, 1 failed, 2 could not load
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = join(__dirname, "..");

export const PLACEHOLDER_URL_RE =
  /example\.invalid|example\.com\/pending|localhost|#TODO|about:blank|javascript:/i;

export const ALLOWED_TIERS = new Set([
  "T0_theoretical", "T1_lab_poc", "T2_field_incident", "T3_widespread",
]);
export const ALLOWED_STATUS = new Set(["draft", "public-review", "stable"]);
export const ALLOWED_MITIGATION_STATUS = new Set([
  "proposed",
  "established-practice",
  "paper-evaluated",
  "reproduced",
  "aletheia-tested",
]);
export const VALIDATED_STATUSES = new Set(["reproduced", "aletheia-tested"]);
export const LEGACY_MITIGATION_STATUS = new Map([
  ["established_practice", "established-practice"],
  ["paper_evaluated", "paper-evaluated"],
  ["aletheia_tested", "aletheia-tested"],
]);
export const ALLOWED_PRODUCT_EVIDENCE_STATUS = new Set([
  "vendor-claimed",
  "documented",
  "third-party-evaluated",
  "reproduced",
  "aletheia-tested",
]);
export const ALLOWED_SOURCE_TYPES = new Set([
  "vendor-advisory",
  "cve-nvd",
  "academic-paper",
  "public-poc",
  "primary-disclosure",
  "credible-secondary",
  "background",
]);
export const INDEPENDENT_SOURCE_TYPES = new Set([
  "academic-paper",
  "public-poc",
  "primary-disclosure",
  "credible-secondary",
  "cve-nvd",
]);
export const ALLOWED_PRODUCT_COVERAGE = new Set(["full", "partial", "adjacent", "unknown"]);

export function normalizeMitigationStatus(status) {
  return LEGACY_MITIGATION_STATUS.get(status) ?? status;
}

export function evaluateCatalog(catalog, opts = {}) {
  const strict = Boolean(opts.strict);
  const errors = [];
  const warnings = [];

  function addFinding(list, severity, code, message, findingPath) {
    const finding = { severity, code, message };
    if (findingPath) finding.path = findingPath;
    list.push(finding);
  }

  if (!catalog || typeof catalog !== "object") {
    return {
      status: "indeterminate",
      errors: [{ severity: "error", code: "catalog.missing", message: "Catalog payload is missing" }],
      warnings: [],
      summary: "[catalog-invariant] could not observe catalog",
      stats: {},
    };
  }

  const meta = catalog.catalog ?? catalog.meta ?? {};
  const version = meta.version ?? catalog.version ?? "unknown";
  const catStatus = meta.status ?? catalog.status ?? "draft";
  const attackClasses = catalog.attackClasses ?? catalog.ATTACK_CLASSES ?? [];
  const incidents = catalog.incidents ?? catalog.INCIDENTS ?? [];
  const mitigationsRaw = catalog.mitigations ?? catalog.MITIGATIONS ?? [];
  const mitigations = Array.isArray(mitigationsRaw) ? mitigationsRaw : Object.values(mitigationsRaw);
  const vendorClaims = catalog.vendorClaims ?? catalog.VENDOR_CLAIMS ?? [];
  const products = catalog.products ?? catalog.PRODUCTS ?? [];
  const sources = catalog.sources ?? catalog.SOURCES ?? [];

  if (!ALLOWED_STATUS.has(catStatus)) {
    addFinding(errors, "error", "catalog.status.invalid", `Unknown catalog status: ${catStatus}`);
  }

  const mitById = new Map(mitigations.map((m) => [m.id, m]));
  const classIds = new Set(attackClasses.map((c) => c.id));
  const sourceById = new Map();
  let validatedCount = 0;
  let placeholderIncidentCount = 0;

  for (const m of mitigations) {
    const loc = `mitigations.${m.id}`;
    const status = normalizeMitigationStatus(m.status);
    if (m.status && !ALLOWED_MITIGATION_STATUS.has(status)) {
      addFinding(errors, "error", "mitigation.status.invalid",
        `Mitigation "${m.id}" has invalid status "${m.status}"`, loc);
    }
    if (m.validated === true) {
      validatedCount += 1;
      const url = m.reproductionPackageUrl;
      if (!url || typeof url !== "string" || !url.trim()) {
        addFinding(errors, "error", "mitigation.validated.missing_reproduction",
          `Mitigation "${m.id}" has validated:true but no reproductionPackageUrl`, loc);
      } else if (PLACEHOLDER_URL_RE.test(url)) {
        addFinding(errors, "error", "mitigation.validated.placeholder_reproduction",
          `Mitigation "${m.id}" validated:true but reproductionPackageUrl is a placeholder: ${url}`, loc);
      }
      if (m.status && !VALIDATED_STATUSES.has(status)) {
        addFinding(errors, "error", "mitigation.validated.bad_status",
          `Mitigation "${m.id}" validated:true but status is "${m.status}" (need reproduced|aletheia-tested)`, loc);
      }
    }
  }

  for (const c of attackClasses) {
    const loc = `attackClasses.${c.id}`;
    if (!c.id || typeof c.id !== "string") {
      addFinding(errors, "error", "class.missing_id", "Attack class missing id", loc);
      continue;
    }
    if (c.evidenceTier && !ALLOWED_TIERS.has(c.evidenceTier)) {
      addFinding(errors, "error", "class.tier.invalid",
        `Class ${c.id} has invalid evidenceTier: ${c.evidenceTier}`, loc);
    }
    for (const mid of c.validatedMitigationIds ?? []) {
      const m = mitById.get(mid);
      if (!m) {
        addFinding(errors, "error", "class.validated_mitigation.unknown",
          `Class ${c.id} references unknown validated mitigation "${mid}"`, loc);
        continue;
      }
      if (!m.validated) {
        addFinding(errors, "error", "class.validated_mitigation.not_validated",
          `Class ${c.id} lists "${mid}" in validatedMitigationIds but mitigation.validated is false`, loc);
      }
      if (!m.reproductionPackageUrl || PLACEHOLDER_URL_RE.test(m.reproductionPackageUrl)) {
        addFinding(errors, "error", "class.validated_mitigation.no_package",
          `Class ${c.id} lists "${mid}" as validated without a real reproduction package URL`, loc);
      }
    }
  }

  for (const inc of incidents) {
    const loc = `incidents.${inc.id ?? inc.name}`;
    const url = inc.primarySource?.url;
    if (!url || typeof url !== "string" || !url.trim()) {
      addFinding(errors, "error", "incident.primary_source.missing",
        `Incident "${inc.id ?? inc.name}" missing primarySource.url`, loc);
      continue;
    }
    if (PLACEHOLDER_URL_RE.test(url)) {
      placeholderIncidentCount += 1;
      const msg = `Incident "${inc.id ?? inc.name}" has placeholder primarySource.url: ${url}`;
      if (catStatus === "stable" || catStatus === "public-review" || strict) {
        addFinding(errors, "error", "incident.primary_source.placeholder", msg, loc);
      } else {
        addFinding(warnings, "warning", "incident.primary_source.placeholder", msg, loc);
      }
    }
    if (inc.evidenceTier && !ALLOWED_TIERS.has(inc.evidenceTier)) {
      addFinding(errors, "error", "incident.tier.invalid",
        `Incident ${inc.id} has invalid evidenceTier: ${inc.evidenceTier}`, loc);
    }
  }

  for (const claim of vendorClaims) {
    const loc = `vendorClaims.${claim.productId}`;
    if (claim.claimStatus === "third_party_evaluated") {
      const ev = claim.evidenceUrl;
      if (!ev || PLACEHOLDER_URL_RE.test(ev)) {
        addFinding(errors, "error", "claim.third_party.missing_evidence",
          `Claim "${claim.productId}" is third_party_evaluated but evidenceUrl is missing or placeholder`, loc);
      }
    }
    if (claim.isPublisherProduct && claim.claimStatus === "third_party_evaluated") {
      if (!claim.evidenceUrl || PLACEHOLDER_URL_RE.test(claim.evidenceUrl)) {
        addFinding(errors, "error", "claim.publisher.self_evaluated",
          `Publisher product "${claim.productId}" cannot be third_party_evaluated without external evidenceUrl`, loc);
      }
    }
  }

  for (const source of sources) {
    const loc = `sources.${source?.id ?? "unknown"}`;
    if (!source || typeof source !== "object") {
      addFinding(errors, "error", "source.invalid", "Source entry must be an object", loc);
      continue;
    }
    if (!source.id || typeof source.id !== "string") {
      addFinding(errors, "error", "source.missing_id", "Source missing id", loc);
    } else if (sourceById.has(source.id)) {
      addFinding(errors, "error", "source.duplicate_id",
        `Duplicate source id "${source.id}"`, loc);
    } else {
      sourceById.set(source.id, source);
    }
    if (!ALLOWED_SOURCE_TYPES.has(source.sourceType)) {
      addFinding(errors, "error", "source.type.invalid",
        `Source "${source.id}" has invalid sourceType "${source.sourceType}"`, loc);
    }
    try {
      const url = new URL(source.url);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("expected http(s)");
      if (PLACEHOLDER_URL_RE.test(source.url)) throw new Error("placeholder URL");
    } catch {
      addFinding(errors, "error", "source.url.invalid",
        `Source "${source.id}" has invalid URL "${source.url}"`, loc);
    }
    for (const attackClassId of source.supports?.attackClassIds ?? []) {
      if (!classIds.has(attackClassId)) {
        addFinding(errors, "error", "source.supports.unknown_attack_class",
          `Source "${source.id}" references unknown attack class "${attackClassId}"`, loc);
      }
    }
    for (const mitigationId of source.supports?.mitigationIds ?? []) {
      if (!mitById.has(mitigationId)) {
        addFinding(errors, "error", "source.supports.unknown_mitigation",
          `Source "${source.id}" references unknown mitigation "${mitigationId}"`, loc);
      }
    }
  }

  for (const inc of incidents) {
    const loc = `incidents.${inc.id ?? inc.name}`;
    if (inc.primarySourceId && !sourceById.has(inc.primarySourceId)) {
      addFinding(errors, "error", "incident.primary_source_id.unknown",
        `Incident "${inc.id}" references unknown primarySourceId "${inc.primarySourceId}"`, loc);
    }
    for (const sourceId of inc.additionalSourceIds ?? []) {
      if (!sourceById.has(sourceId)) {
        addFinding(errors, "error", "incident.additional_source_id.unknown",
          `Incident "${inc.id}" references unknown additionalSourceId "${sourceId}"`, loc);
      }
    }
  }

  const productIds = new Set();
  for (const product of products) {
    const loc = `products.${product?.id ?? "unknown"}`;
    if (!product || typeof product !== "object") {
      addFinding(errors, "error", "product.invalid", "Product entry must be an object", loc);
      continue;
    }
    if (!product.id || typeof product.id !== "string") {
      addFinding(errors, "error", "product.missing_id", "Product missing id", loc);
    } else if (productIds.has(product.id)) {
      addFinding(errors, "error", "product.duplicate_id",
        `Duplicate product id "${product.id}"`, loc);
    } else {
      productIds.add(product.id);
    }

    if ("score" in product || "riskScore" in product || "overallScore" in product) {
      addFinding(errors, "error", "product.score.present",
        `Product "${product.id}" must not define an overall numeric score`, loc);
    }

    if (product.publisherProduct === true) {
      const disclosure = product.disclosure;
      if (!disclosure || typeof disclosure !== "string" || !disclosure.trim()) {
        addFinding(errors, "error", "product.publisher.missing_disclosure",
          `Publisher product "${product.id}" requires disclosure text`, loc);
      }
    }

    if (!Array.isArray(product.coverages)) {
      addFinding(errors, "error", "product.coverages.invalid",
        `Product "${product.id}" coverages must be an array`, loc);
      continue;
    }

    for (let i = 0; i < product.coverages.length; i++) {
      const coverage = product.coverages[i];
      const covLoc = `${loc}.coverages.${i}`;
      if (!coverage || typeof coverage !== "object") {
        addFinding(errors, "error", "product.coverage.invalid",
          `Coverage ${i} for product "${product.id}" must be an object`, covLoc);
        continue;
      }
      if (!classIds.has(coverage.attackClassId)) {
        addFinding(errors, "error", "product.coverage.unknown_attack_class",
          `Product "${product.id}" references unknown attack class "${coverage.attackClassId}"`, covLoc);
      }
      if (!ALLOWED_PRODUCT_COVERAGE.has(coverage.coverage)) {
        addFinding(errors, "error", "product.coverage.value.invalid",
          `Product "${product.id}" has invalid coverage "${coverage.coverage}"`, covLoc);
      }
      if (!ALLOWED_PRODUCT_EVIDENCE_STATUS.has(coverage.evidenceStatus)) {
        addFinding(errors, "error", "product.coverage.evidence_status.invalid",
          `Product "${product.id}" has invalid evidenceStatus "${coverage.evidenceStatus}"`, covLoc);
      }
      if (!Array.isArray(coverage.mitigationIds)) {
        addFinding(errors, "error", "product.coverage.mitigations.invalid",
          `Product "${product.id}" coverage mitigationIds must be an array`, covLoc);
      } else {
        for (const mid of coverage.mitigationIds) {
          if (!mitById.has(mid)) {
            addFinding(errors, "error", "product.coverage.unknown_mitigation",
              `Product "${product.id}" references unknown mitigation "${mid}"`, covLoc);
          }
        }
      }
      if (!Array.isArray(coverage.evidenceSourceIds)) {
        addFinding(errors, "error", "product.coverage.sources.invalid",
          `Product "${product.id}" coverage evidenceSourceIds must be an array`, covLoc);
      } else {
        const coverageSources = [];
        for (const sourceId of coverage.evidenceSourceIds) {
          const source = sourceById.get(sourceId);
          if (!source) {
            addFinding(errors, "error", "product.coverage.source.unknown",
              `Product "${product.id}" references unknown evidence source "${sourceId}"`, covLoc);
          } else {
            coverageSources.push(source);
          }
        }

        if (coverage.evidenceStatus === "documented") {
          if (!coverageSources.some((source) => source.sourceType === "vendor-advisory")) {
            addFinding(errors, "error", "product.coverage.documented.no_vendor_source",
              `Product "${product.id}" documented coverage requires a vendor-advisory source`, covLoc);
          }
        }
        if (coverage.evidenceStatus === "third-party-evaluated") {
          if (!coverageSources.some((source) =>
            INDEPENDENT_SOURCE_TYPES.has(source.sourceType) &&
            String(source.publisher).toLowerCase() !== String(product.vendor).toLowerCase()
          )) {
            addFinding(errors, "error", "product.coverage.third_party.no_independent_source",
              `Product "${product.id}" third-party-evaluated coverage requires an independent source`, covLoc);
          }
        }
        if (coverage.evidenceStatus === "reproduced") {
          if (!coverageSources.some((source) => source.sourceType === "public-poc")) {
            addFinding(errors, "error", "product.coverage.reproduced.no_poc_source",
              `Product "${product.id}" reproduced coverage requires a public-poc source`, covLoc);
          }
        }
        if (coverage.evidenceStatus === "aletheia-tested") {
          if (!coverageSources.some((source) => String(source.publisher).toLowerCase() === "aletheia")) {
            addFinding(errors, "error", "product.coverage.aletheia.no_test_source",
              `Product "${product.id}" aletheia-tested coverage requires an Aletheia source`, covLoc);
          }
        }
      }
    }
  }

  for (const source of sources) {
    const loc = `sources.${source?.id ?? "unknown"}`;
    for (const productId of source.supports?.productIds ?? []) {
      if (!productIds.has(productId)) {
        addFinding(errors, "error", "source.supports.unknown_product",
          `Source "${source.id}" references unknown product "${productId}"`, loc);
      }
    }
  }

  const reviewStatus = catalog.independentReview?.status ?? meta.independentReview?.status;
  if (catStatus === "stable" && reviewStatus && reviewStatus !== "complete") {
    addFinding(errors, "error", "catalog.stable.without_review",
      `Catalog status is stable but independentReview.status is "${reviewStatus}"`, "catalog.independentReview");
  }

  const stats = {
    version: String(version), status: String(catStatus),
    attackClasses: attackClasses.length, incidents: incidents.length,
    mitigations: mitigations.length, validatedMitigations: validatedCount,
    placeholderIncidents: placeholderIncidentCount, vendorClaims: vendorClaims.length,
    products: products.length, sources: sources.length,
    errors: errors.length, warnings: warnings.length,
  };

  if (errors.length > 0) {
    return {
      status: "failed", errors, warnings,
      summary: `[catalog-invariant] FAILED (${errors.length} error(s), ${warnings.length} warning(s)) v${version} status=${catStatus}`,
      stats,
    };
  }
  return {
    status: "ok", errors, warnings,
    summary: warnings.length > 0
      ? `[catalog-invariant] ok with ${warnings.length} warning(s) v${version} status=${catStatus}`
      : `[catalog-invariant] ok v${version} status=${catStatus}`,
    stats,
  };
}

export async function loadCatalog(root = DEFAULT_ROOT) {
  const exportPath = join(root, "public/export/asi-catalog.json");
  if (existsSync(exportPath)) {
    return JSON.parse(readFileSync(exportPath, "utf8"));
  }
  throw new Error(`Missing ${exportPath}. Run export or ensure catalog data exists.`);
}

export async function runCatalogGate(root = DEFAULT_ROOT, opts = {}) {
  let catalog;
  try {
    catalog = await loadCatalog(root);
  } catch (err) {
    return {
      status: "indeterminate",
      errors: [{ severity: "error", code: "catalog.load_failed", message: String(err?.message || err) }],
      warnings: [],
      summary: "[catalog-invariant] could not load catalog",
      stats: {},
    };
  }
  return evaluateCatalog(catalog, opts);
}

function parseArgs(argv) {
  const opts = { json: false, strict: false, root: DEFAULT_ROOT };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--json") opts.json = true;
    else if (argv[i] === "--strict") opts.strict = true;
    else if (argv[i] === "--root") opts.root = argv[++i];
  }
  return opts;
}

function isMain() {
  const entry = process.argv[1] && pathToFileURL(process.argv[1]).href;
  return entry === import.meta.url;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const result = await runCatalogGate(opts.root, { strict: opts.strict });
  if (opts.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(result.summary);
    for (const e of result.errors) console.error(`  ERROR  [${e.code}] ${e.message}${e.path ? ` (${e.path})` : ""}`);
    for (const w of result.warnings) console.warn(`  WARN   [${w.code}] ${w.message}${w.path ? ` (${w.path})` : ""}`);
    if (result.stats?.attackClasses != null) {
      console.log(`  stats  classes=${result.stats.attackClasses} incidents=${result.stats.incidents} validated=${result.stats.validatedMitigations} placeholders=${result.stats.placeholderIncidents}`);
    }
  }
  if (result.status === "indeterminate") process.exit(2);
  if (result.status === "failed") process.exit(1);
  process.exit(0);
}

if (isMain()) {
  main().catch((err) => {
    console.error("[catalog-invariant] fatal:", err);
    process.exit(2);
  });
}

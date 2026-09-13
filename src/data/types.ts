export const EVIDENCE_TIERS = [
  "T0_theoretical",
  "T1_lab_poc",
  "T2_field_incident",
  "T3_widespread",
] as const;
export type EvidenceTier = (typeof EVIDENCE_TIERS)[number];

export const EVIDENCE_STATUS = [
  "unverified",
  "documented",
  "paper-evaluated",
  "reproduced",
  "aletheia-tested",
] as const;
export type EvidenceStatus = (typeof EVIDENCE_STATUS)[number];

export const SOURCE_TYPES = [
  "vendor-advisory",
  "cve-nvd",
  "academic-paper",
  "public-poc",
  "primary-disclosure",
  "credible-secondary",
  "background",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const ATTACK_EVIDENCE_LEVELS = [
  "theoretical",
  "lab-poc",
  "field-observed",
  "multiple-field-cases",
] as const;
export type AttackEvidenceLevel = (typeof ATTACK_EVIDENCE_LEVELS)[number];

export const EVIDENCE_TIER_TO_ATTACK_LEVEL: Record<EvidenceTier, AttackEvidenceLevel> = {
  T0_theoretical: "theoretical",
  T1_lab_poc: "lab-poc",
  T2_field_incident: "field-observed",
  T3_widespread: "multiple-field-cases",
};

export const MITIGATION_STATUS = [
  "proposed",
  "established-practice",
  "paper-evaluated",
  "reproduced",
  "aletheia-tested",
] as const;
export type MitigationStatus = (typeof MITIGATION_STATUS)[number];

export const LEGACY_MITIGATION_STATUS = [
  "established_practice",
  "paper_evaluated",
  "aletheia_tested",
] as const;
export type LegacyMitigationStatus = (typeof LEGACY_MITIGATION_STATUS)[number];

export type CatalogMitigationStatus = MitigationStatus | LegacyMitigationStatus;

export function normalizeMitigationStatus(status: CatalogMitigationStatus): MitigationStatus {
  if (status === "established_practice") return "established-practice";
  if (status === "paper_evaluated") return "paper-evaluated";
  if (status === "aletheia_tested") return "aletheia-tested";
  return status;
}

export const CONFIDENCE = ["low", "medium", "high"] as const;
export type Confidence = (typeof CONFIDENCE)[number];

export const DECISIONS = ["COVER_NOW", "RESEARCH", "DEFER", "OUT_OF_SCOPE"] as const;
export type Decision = (typeof DECISIONS)[number];

export type SourceId = string;
export type AttackClassId = `AAC-${string}`;
export type MitigationId = string;
export type ProductId = string;

export type PrimarySource = {
  title: string;
  url: string;
  kind: "advisory" | "cve" | "blog" | "paper" | "report" | "other" | SourceType;
  accessed?: string;
  sourceType?: SourceType;
};

export type Source = {
  id: SourceId;
  title: string;
  sourceType: SourceType;
  publisher: string;
  url: string;
  publishedAt?: string;
  accessedAt?: string;
  authors?: string[];
  summary?: string;
  supports: {
    attackClassIds: AttackClassId[];
    mitigationIds: MitigationId[];
    productIds: ProductId[];
  };
  notes?: string;
};

export type Mitigation = {
  id: MitigationId;
  name: string;
  summary: string;
  status: CatalogMitigationStatus;
  validated: boolean;
  sourceIds?: SourceId[];
  reproductionPackageUrl?: string;
  appliesTo?: AttackClassId[];
  limitations?: string[];
  lastReviewedAt?: string;
  notes?: string;
};

export type Incident = {
  id: string;
  name: string;
  date: string;
  year: number;
  summary: string;
  actor?: string;
  affectedProduct?: string;
  affectedVersions?: string;
  fixedIn?: string;
  attackClassIds: AttackClassId[];
  cveIds: string[];
  evidenceTier: EvidenceTier;
  attackEvidenceLevel?: AttackEvidenceLevel;
  confidence: Confidence;
  primarySource: PrimarySource;
  primarySourceId?: SourceId;
  additionalSources?: PrimarySource[];
  additionalSourceIds?: SourceId[];
};

export type AttackClass = {
  id: AttackClassId;
  legacyId?: string;
  name: string;
  aliases: string[];
  family: string;
  oneLine: string;
  description: string;
  protocols: string[];
  evidenceTier: EvidenceTier;
  attackEvidenceLevel?: AttackEvidenceLevel;
  evidenceConfidence: Confidence;
  decision: Decision;
  cveIds: string[];
  incidentIds: string[];
  proposedMitigationIds: MitigationId[];
  validatedMitigationIds: MitigationId[];
  primarySources: PrimarySource[];
  owasp?: string[];
};

export type VendorClaim = {
  productId: ProductId;
  productName: string;
  vendor: string;
  isPublisherProduct: boolean;
  summary: string;
  deployment: ("local" | "self-hosted" | "cloud")[];
  claimStatus: "unverified_vendor_claim" | "third_party_evaluated";
  claimedClassIds: AttackClassId[];
  claimText?: string;
  evidenceUrl?: string;
  limitations: string[];
};

export const PRODUCT_EVIDENCE_STATUS = [
  "vendor-claimed",
  "documented",
  "third-party-evaluated",
  "reproduced",
  "aletheia-tested",
] as const;
export type ProductEvidenceStatus = (typeof PRODUCT_EVIDENCE_STATUS)[number];

export const PRODUCT_COVERAGE = ["full", "partial", "adjacent", "unknown"] as const;
export type ProductCoverage = (typeof PRODUCT_COVERAGE)[number];

export type ProductCoverageRecord = {
  attackClassId: AttackClassId;
  mitigationIds: MitigationId[];
  evidenceStatus: ProductEvidenceStatus;
  evidenceSourceIds: SourceId[];
  coverage: ProductCoverage;
  limitations: string[];
};

export type Product = {
  id: ProductId;
  name: string;
  vendor: string;
  description: string;
  deployment: ("local" | "self-hosted" | "cloud" | "hybrid")[];
  categories: string[];
  homepageUrl?: string;
  docsUrl?: string;
  pricingModel: "open-source" | "free" | "commercial" | "usage-based" | "unknown";
  coverages: ProductCoverageRecord[];
  publisherProduct: boolean;
  disclosure?: string;
  lastReviewedAt: string;
};

export type ChangelogEntry = { version: string; date: string; changes: string[] };

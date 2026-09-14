import type { AttackEvidenceLevel, EvidenceTier, ProductCoverage, ProductEvidenceStatus, SourceType } from "./types.ts";

export type MethodologySection = {
  id: string;
  title: string;
  body: string;
};

export type MethodologyTerm<T extends string> = {
  value: T;
  label: string;
  meaning: string;
};

export const ASI_ROLE = "Agent Security Index is a research and comparison publication. It is not an automated security control, allowlist, denylist, certification authority, procurement gate, or substitute for local testing, sandboxing, least privilege, runtime enforcement, or human review.";

export const PRODUCT_DECISION_GUIDANCE = "Product coverage records describe relationships supported by the linked evidence, where available, under stated assumptions. Vendor claims and missing evidence remain explicitly labeled. Do not use these records as the sole basis for procurement, deployment, or automated allow/deny decisions.";

export const ATTACK_RISK_GUIDANCE = "The riskScore is an attack-class exposure/risk heuristic only. It is not a product score, vendor ranking, certification score, evidence confidence, mitigation effectiveness, or procurement recommendation.";

export const METHODOLOGY_SECTIONS: MethodologySection[] = [
  { id: "what-asi-is", title: "What ASI is / is not", body: ASI_ROLE },
  { id: "decision-use", title: "Using coverage records in decisions", body: PRODUCT_DECISION_GUIDANCE },
  { id: "layered-defense", title: "Use layered defenses", body: "No catalog, scanner, index, or security product should be treated as sufficient by itself for high-assurance agent deployments. Combine artifact review, least privilege, sandboxing, authorization controls, runtime monitoring, and human approval where appropriate. This is deployment guidance, not an additional scoring criterion." },
  {
    id: "attack-classes-are-not-cves",
    title: "Attack classes are not CVEs",
    body:
      "ASI attack classes describe recurring failure modes in agent systems. A CVE may provide evidence for a class, but it does not define the class boundary.",
  },
  {
    id: "evidence-attaches-to-classes",
    title: "Evidence attaches to classes",
    body:
      "Incidents, CVEs, public disclosures, and papers are attached as evidence for attack classes. They are not treated as interchangeable signals.",
  },
  {
    id: "vendor-claims",
    title: "Vendor claims are not proof",
    body:
      "Vendor and publisher claims are recorded as claims. Vendor documentation may support documented status; it is not independent evaluation. Third-party evaluation, reproduction, and Aletheia testing each require their own supporting evidence.",
  },
  {
    id: "separate-evidence-tracks",
    title: "Attack and mitigation evidence are separate",
    body:
      "A well-evidenced attack class does not imply any mitigation is validated. Mitigation status is evaluated on its own evidence trail.",
  },
  {
    id: "source-quality-not-effectiveness",
    title: "Source quality is not effectiveness",
    body:
      "A high-quality source can establish that a claim exists or that an incident occurred. It does not by itself prove mitigation effectiveness.",
  },
  {
    id: "publisher-disclosure",
    title: "Publisher products are disclosed",
    body:
      "Products developed by the publisher of Agent Security Index must be explicitly disclosed and evaluated using the same published methodology as other products.",
  },
  {
    id: "missing-evidence",
    title: "Missing evidence stays visible",
    body:
      "Unknown, unverified, or missing evidence is represented directly. ASI does not fill gaps with inferred product coverage or implied validation.",
  },
  {
    id: "attack-risk-score",
    title: "Attack risk score is class-only",
    body:
      ATTACK_RISK_GUIDANCE,
  },
];

export const PRODUCT_EVIDENCE_MEANINGS: MethodologyTerm<ProductEvidenceStatus>[] = [
  { value: "vendor-claimed", label: "Vendor claimed", meaning: "A claim attributed to the vendor or publisher; independent verification is not implied." },
  { value: "documented", label: "Documented", meaning: "Linked vendor documentation supports the stated relationship; this is not independent validation of effectiveness." },
  { value: "third-party-evaluated", label: "Third-party evaluated", meaning: "An independent evaluation is linked. Its tested scope and limitations still apply." },
  { value: "reproduced", label: "Reproduced", meaning: "A public reproduction artifact supports the relationship under the stated test conditions." },
  { value: "aletheia-tested", label: "Aletheia tested", meaning: "An Aletheia test artifact supports the relationship. Publisher testing is not independent certification." },
];

export const MITIGATION_STATUS_MEANINGS = [
  {
    value: "proposed",
    label: "Proposed",
    meaning: "A plausible control has been identified, but ASI has not found enough public evidence to treat it as established.",
  },
  {
    value: "established-practice",
    label: "Established practice",
    meaning: "The control is common security practice or appears in credible guidance, but has not met the ASI reproduction bar.",
  },
  {
    value: "paper-evaluated",
    label: "Paper evaluated",
    meaning: "The control has been evaluated in a paper or equivalent public analysis.",
  },
  {
    value: "reproduced",
    label: "Reproduced",
    meaning: "ASI can point to a public reproduction package or equivalent repeatable evidence.",
  },
  {
    value: "aletheia-tested",
    label: "Aletheia tested",
    meaning: "The control has been tested under the published Aletheia methodology with supporting evidence.",
  },
] as const;

export const PRODUCT_COVERAGE_MEANINGS: MethodologyTerm<ProductCoverage>[] = [
  {
    value: "full",
    label: "Full",
    meaning: "The product addresses the stated attack class boundary for the evaluated deployment and assumptions.",
  },
  {
    value: "partial",
    label: "Partial",
    meaning: "The product addresses a meaningful part of the class but leaves stated limitations or deployment gaps.",
  },
  {
    value: "adjacent",
    label: "Adjacent",
    meaning: "The product helps with a related control surface but should not be read as direct class coverage.",
  },
  {
    value: "unknown",
    label: "Unknown",
    meaning: "ASI has not established coverage for this product and attack class.",
  },
];

export const SOURCE_TYPE_HIERARCHY: MethodologyTerm<SourceType>[] = [
  {
    value: "vendor-advisory",
    label: "Vendor advisory",
    meaning: "A product owner or affected vendor advisory, bulletin, or release note.",
  },
  {
    value: "cve-nvd",
    label: "CVE/NVD",
    meaning: "A CVE, NVD entry, or equivalent vulnerability record.",
  },
  {
    value: "academic-paper",
    label: "Academic paper",
    meaning: "A public research paper or peer-reviewed publication.",
  },
  {
    value: "public-poc",
    label: "Public PoC",
    meaning: "A public proof of concept, reproduction harness, dataset, or exploit demonstration.",
  },
  {
    value: "primary-disclosure",
    label: "Primary disclosure",
    meaning: "Researcher or organization disclosure from the party that identified or analyzed the issue.",
  },
  {
    value: "credible-secondary",
    label: "Credible secondary",
    meaning: "Reporting or analysis from a reputable third party that is not the original source.",
  },
  {
    value: "background",
    label: "Background",
    meaning: "Contextual material that helps explain the topic but is not direct evidence for a claim.",
  },
];

export const ATTACK_EVIDENCE_LEVEL_MEANINGS: MethodologyTerm<AttackEvidenceLevel>[] = [
  {
    value: "theoretical",
    label: "Theoretical",
    meaning: "The class is reasoned from architecture or threat modeling without a public working demonstration.",
  },
  {
    value: "lab-poc",
    label: "Lab PoC",
    meaning: "The class has a public proof of concept, benchmark, or controlled reproduction.",
  },
  {
    value: "field-observed",
    label: "Field observed",
    meaning: "The class has been observed in a deployed product, public incident, or CVE-backed vulnerability.",
  },
  {
    value: "multiple-field-cases",
    label: "Multiple field cases",
    meaning: "The class has multiple credible field cases or appears across products, ecosystems, or campaigns.",
  },
];

export const EVIDENCE_TIER_MEANINGS: MethodologyTerm<EvidenceTier>[] = [
  {
    value: "T0_theoretical",
    label: "T0 theoretical",
    meaning: "Architecture-derived or threat-model evidence without a public proof of concept.",
  },
  {
    value: "T1_lab_poc",
    label: "T1 lab PoC",
    meaning: "A public proof of concept, benchmark, or lab reproduction exists.",
  },
  {
    value: "T2_field_incident",
    label: "T2 field incident",
    meaning: "A deployed product incident, vulnerability disclosure, or CVE-backed case exists.",
  },
  {
    value: "T3_widespread",
    label: "T3 widespread",
    meaning: "Multiple credible field cases exist across products, vendors, or campaigns.",
  },
];

import type { MitigationStatus } from "@/data/types";

export const LIFECYCLES = [
  "provision",
  "discover",
  "ingest",
  "plan",
  "memory",
  "invoke",
  "execute",
  "coordinate",
  "oversee",
  "update",
] as const;

export type Lifecycle = (typeof LIFECYCLES)[number];

export const PROTOCOLS = ["MCP", "A2A", "ANP", "RAG", "Native", "Skills"] as const;
export type Protocol = (typeof PROTOCOLS)[number];

export const DOMAINS = ["memory", "system", "data", "identity", "tools", "network"] as const;
export type Domain = (typeof DOMAINS)[number];

export const VECTORS = [
  "injection",
  "poisoning",
  "privilege",
  "supply-chain",
  "execution",
  "communication",
  "trust",
  "persistence",
] as const;
export type Vector = (typeof VECTORS)[number];

export const IMPACTS = ["critical", "high", "medium", "low"] as const;
export type Impact = (typeof IMPACTS)[number];

export const COMPLEXITIES = ["low", "medium", "high"] as const;
export type Complexity = (typeof COMPLEXITIES)[number];

export type CveRef = {
  id: string;
  product: string;
  cvss: number;
  year: number;
};

export type Incident = {
  name: string;
  year: number;
  summary: string;
};

export type Mitigation = {
  id: string;
  name: string;
  summary: string;
  validated: boolean;
  status?: MitigationStatus;
  sourceIds?: string[];
  reproductionPackageUrl?: string;
  appliesTo?: string[];
  limitations?: string[];
  lastReviewedAt?: string;
};

export type AttackClass = {
  id: string;
  name: string;
  aka?: string;
  summary: string;
  description: string;
  vector: Vector;
  protocols: Protocol[];
  domains: Domain[];
  lifecycle: Lifecycle[];
  impact: Impact;
  complexity: Complexity;
  architecturalImpact: string;
  technicalVector: string;
  owasp: string[];
  cves: CveRef[];
  incidents: Incident[];
  mitigations: string[];
  riskScore: number;
};

export const LIFECYCLE_LABEL: Record<Lifecycle, string> = {
  provision: "Provision",
  discover: "Discover",
  ingest: "Ingest",
  plan: "Plan",
  memory: "Memory",
  invoke: "Invoke",
  execute: "Execute",
  coordinate: "Coordinate",
  oversee: "Oversee",
  update: "Update",
};

export const LIFECYCLE_SHORT: Record<Lifecycle, string> = {
  provision: "PRV",
  discover: "DIS",
  ingest: "ING",
  plan: "PLN",
  memory: "MEM",
  invoke: "INV",
  execute: "EXE",
  coordinate: "CRD",
  oversee: "OVR",
  update: "UPD",
};

export const VECTOR_LABEL: Record<Vector, string> = {
  injection: "Injection",
  poisoning: "Poisoning",
  privilege: "Privilege",
  "supply-chain": "Supply chain",
  execution: "Execution",
  communication: "Communication",
  trust: "Trust",
  persistence: "Persistence",
};

export const DOMAIN_LABEL: Record<Domain, string> = {
  memory: "Memory",
  system: "System",
  data: "Data",
  identity: "Identity",
  tools: "Tools",
  network: "Network",
};

export const IMPACT_LABEL: Record<Impact, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const COMPLEXITY_LABEL: Record<Complexity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

import type { Mitigation } from "./types";

export const MITIGATIONS: Record<string, Mitigation> = {
  "control-plane-isolation": {
    id: "control-plane-isolation",
    name: "Control-plane isolation",
    summary: "Keep administrative mutation outside the governed agent's trust domain. The workload cannot widen its own sandbox mode, approval policy, capability grants, privilege policy, or security-control configuration.",
    status: "established-practice",
    validated: false,
    sourceIds: ["src-deepseek-harness-cve-2026-82533"],
    appliesTo: ["AAC-29", "AAC-07"],
  },
  "abom-hash": {
    id: "abom-hash",
    name: "ABOM hashing",
    summary:
      "Hash-pin Agent Bill of Materials (AgBOM/ABOM) entries for tools, prompts, skills, and MCP servers. Reject any runtime descriptor that does not match the signed hash.",
    validated: false,
  },
  provenance: {
    id: "provenance",
    name: "Provenance tracking",
    summary:
      "Record cryptographic provenance for every tool, memory write, agent card, and skill. Attribute actions to a verifiable principal rather than a display name.",
    validated: false,
  },
  "tool-sandbox": {
    id: "tool-sandbox",
    name: "Tool sandboxing",
    summary:
      "Run tools in least-capability sandboxes with seccomp, filesystem jails, and explicit egress allowlists. Never grant the host shell by default.",
    validated: false,
  },
  "hash-pin": {
    id: "hash-pin",
    name: "Descriptor hash pinning",
    summary:
      "Pin tool name, description, and JSON schema to a digest at approval time. Re-consent on any mutation — this is the primary rug-pull cut.",
    validated: false,
  },
  "untrusted-io": {
    id: "untrusted-io",
    name: "Untrusted I/O boundary",
    summary:
      "Treat tool output, retrieved documents, emails, and agent-card fields as untrusted input — the same way a browser treats HTML.",
    validated: false,
  },
  "signed-cards": {
    id: "signed-cards",
    name: "Signed Agent Cards",
    summary:
      "Require JWS-signed Agent Cards from a curated registry. Unsigned well-known cards are spoofable and must not enter the planner context.",
    validated: false,
  },
  "mtls-a2a": {
    id: "mtls-a2a",
    name: "mTLS / OIDC agent identity",
    summary:
      "Bind A2A and ANP sessions to mTLS or OIDC with an immutable agent ID in the token subject. Do not trust self-declared names.",
    validated: false,
  },
  "memory-gate": {
    id: "memory-gate",
    name: "Memory write-gating",
    summary:
      "Gate persistent memory writes behind schema validation, provenance tags, and a deny-by-default policy for instructions that look like standing orders.",
    validated: false,
  },
  "drift-detect": {
    id: "drift-detect",
    name: "Descriptor drift detection",
    summary:
      "Continuously hash-compare live MCP/A2A descriptors against the approved ABOM. Alert and freeze the tool on mismatch.",
    validated: false,
  },
  "capability-attest": {
    id: "capability-attest",
    name: "Capability attestation",
    summary:
      "Attest advertised capabilities against the actual backend surface. Fail closed on capability cloaking and hidden tool endpoints.",
    validated: false,
  },
  "least-privilege": {
    id: "least-privilege",
    name: "Least-privilege credentials",
    summary:
      "Issue short-lived, scoped tokens per tool. Never let agents inherit user-admin or cloud-admin credentials across tasks.",
    validated: false,
  },
  hitl: {
    id: "hitl",
    name: "Human-in-the-loop gates",
    summary:
      "Require independent human approval for high-impact actions: secret reads, payments, production writes, and cross-tenant access.",
    validated: false,
  },
  "output-dlp": {
    id: "output-dlp",
    name: "Output DLP / egress control",
    summary:
      "Block exfil channels in rendered markdown, image URLs, tool arguments, and outbound MCP calls. Scan for secrets before any egress.",
    validated: false,
  },
  "rag-validate": {
    id: "rag-validate",
    name: "Semantic RAG validation",
    summary:
      "Classify and strip instruction-like content at ingestion. Do not retrieve untrusted documents into the system-prompt layer.",
    validated: false,
  },
  trajectory: {
    id: "trajectory",
    name: "Trajectory monitoring",
    summary:
      "Watch plan deviation: sudden tool switches, credential-file reads, and outbound destinations not in the original goal.",
    validated: false,
  },
  "kill-switch": {
    id: "kill-switch",
    name: "Revocation kill switch",
    summary:
      "Instantly revoke a tool, skill, MCP server, or agent identity across the fleet. Keep a signed deny-list next to the ABOM.",
    validated: false,
  },
  telemetry: {
    id: "telemetry",
    name: "Invocation telemetry",
    summary:
      "Log every tool call, argument hash, and result class to OpenTelemetry/OCSF. Blind agents cannot be investigated.",
    validated: false,
  },
  "schema-gov": {
    id: "schema-gov",
    name: "Signed schema governance",
    summary:
      "Treat MCP/tool schemas as production contracts. Changes go through review, signing, and ABOM republish — never hot-edit in prod.",
    validated: false,
  },
  "stdio-deny": {
    id: "stdio-deny",
    name: "STDIO MCP allowlist",
    summary:
      "Deny MCP STDIO transports unless the binary is allowlisted and hash-pinned. Unrestricted STDIO is host RCE by design.",
    validated: false,
  },
  "content-firewall": {
    id: "content-firewall",
    name: "Metadata content firewall",
    summary:
      "Sanitize tool descriptions, parameter docs, and Agent Card fields before they are concatenated into the model context.",
    validated: false,
  },
  "allowlist-servers": {
    id: "allowlist-servers",
    name: "Server allowlisting",
    summary:
      "Agents may only connect to named, pinned MCP/A2A endpoints. Block runtime discovery of unknown servers.",
    validated: false,
  },
  isolation: {
    id: "isolation",
    name: "Tenant and memory isolation",
    summary:
      "Partition memory, credentials, and tool sessions per tenant and per task. Cross-session bleed is a first-class incident.",
    validated: false,
  },
};

export const MITIGATION_LIST = Object.values(MITIGATIONS);

import type { AttackClass } from "./types";

export const ATTACK_CLASSES_PART_14: AttackClass[] = [
  {
    "id": "AX-40",
    "name": "Telemetry Blind Spots",
    "summary": "No durable log of tool calls, arguments, or identity — incidents cannot be reconstructed (MCP08).",
    "description": "MCP08. Without invocation telemetry, rug pulls look like normal use, line jumping is invisible, and kill switches have nothing to target. ACS (Agent Control Standard) puts OpenTelemetry/OCSF hooks at these exact points. Blindness is a force multiplier for every other class.",
    "vector": "trust",
    "protocols": [
      "MCP",
      "A2A",
      "Native"
    ],
    "domains": [
      "system",
      "identity"
    ],
    "lifecycle": [
      "oversee",
      "execute",
      "update"
    ],
    "impact": "high",
    "complexity": "low",
    "architecturalImpact": "You cannot defend a control plane you cannot see. Missing telemetry converts every other class from “detectable” to “assumed breach.”",
    "technicalVector": "No tool-call logs, hashed-but-dropped args, agents that can disable tracing, local STDIO with no sidecar.",
    "owasp": [
      "MCP08",
      "ASI08"
    ],
    "cves": [],
    "incidents": [
      {
        "name": "ACS gap analysis",
        "year": 2026,
        "summary": "OWASP Agent Control Standard: tracing, AgBOM, and MCP/A2A hooks exist because fleets were flying blind."
      }
    ],
    "mitigations": [
      "telemetry",
      "provenance",
      "abom-hash",
      "kill-switch"
    ],
    "riskScore": 73
  }
];

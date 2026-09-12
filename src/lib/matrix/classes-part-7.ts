import type { AttackClass } from "./types";

export const ATTACK_CLASSES_PART_7: AttackClass[] = [
  {
    "id": "AX-19",
    "name": "Runtime-Gated Payloads",
    "aka": "Deadbugz-class",
    "summary": "Malice is withheld until after N benign invocations, defeating install-time review.",
    "description": "A specialization of rug pulls. Deadbugz (Aug 2026) rewrote tool metadata only after three ordinary calls. Static scanners, hash-at-install, and human review of the first descriptor all pass. Defense must hash continuously, not once.",
    "vector": "persistence",
    "protocols": [
      "MCP",
      "Skills"
    ],
    "domains": [
      "tools",
      "system"
    ],
    "lifecycle": [
      "invoke",
      "update",
      "oversee"
    ],
    "impact": "critical",
    "complexity": "medium",
    "architecturalImpact": "Time is an attacker-controlled dimension. Any control that samples only at t=0 is incomplete.",
    "technicalVector": "Conditional descriptor mutation, delayed remote config fetch, call-count gates, clean-then-dirty npm versions.",
    "owasp": [
      "ASI04",
      "MCP03",
      "MCP04"
    ],
    "cves": [
      {
        "id": "CVE-2025-54136",
        "product": "Cursor MCPoison",
        "cvss": 7.2,
        "year": 2025
      }
    ],
    "incidents": [
      {
        "name": "Deadbugz",
        "year": 2026,
        "summary": "Pillar Security / CSA: 23 PRs, three-call arming, SSH/AWS/kube harvest."
      }
    ],
    "mitigations": [
      "drift-detect",
      "abom-hash",
      "hash-pin",
      "kill-switch"
    ],
    "riskScore": 91
  },
  {
    "id": "AX-20",
    "name": "Agent Card Poisoning",
    "aka": "Agent-in-the-Middle",
    "summary": "Prompt injection inside an A2A Agent Card is ingested as trusted capability text.",
    "description": "Trustwave SpiderLabs (2025) stuffed instructions into Agent Card skill/description fields. A2A v0.3+ supports signing but does not require it. The host planner concatenates card text, then routes every subsequent task — including MCP and payment (AP2) calls — under the injected goal. “Agent in the Middle.”",
    "vector": "injection",
    "protocols": [
      "A2A",
      "ANP"
    ],
    "domains": [
      "identity",
      "data"
    ],
    "lifecycle": [
      "discover",
      "plan",
      "coordinate"
    ],
    "impact": "critical",
    "complexity": "low",
    "architecturalImpact": "Discovery documents are prompts. Unsigned well-known cards are an internet-background injection channel.",
    "technicalVector": "Payloads in `/.well-known/agent.json` description/skill fields; unsigned cards; AP2 mandate generation under hijack.",
    "owasp": [
      "ASI07",
      "ASI01",
      "ASI04"
    ],
    "cves": [],
    "incidents": [
      {
        "name": "Agent in the Middle",
        "year": 2025,
        "summary": "SpiderLabs: poisoned Agent Cards win all tasks and intercept sensitive payloads."
      }
    ],
    "mitigations": [
      "signed-cards",
      "content-firewall",
      "mtls-a2a",
      "untrusted-io"
    ],
    "riskScore": 92
  },
  {
    "id": "AX-21",
    "name": "Agent Card Spoofing",
    "summary": "A schema-valid lookalike Agent Card diverts discovery to an attacker endpoint.",
    "description": "ICLR 2026 Agent Admission work measured AgentCard spoofing success at 0.98 on ANP. Attackers publish near-duplicate cards that differ in endpoint or DID. Without a curated registry and cryptographic identity, the planner’s “best match” is attacker-controlled.",
    "vector": "communication",
    "protocols": [
      "A2A",
      "ANP"
    ],
    "domains": [
      "identity",
      "network"
    ],
    "lifecycle": [
      "discover",
      "coordinate",
      "provision"
    ],
    "impact": "high",
    "complexity": "low",
    "architecturalImpact": "There is no DNSSEC-equivalent for agent identity in default A2A. Names are cosmetic.",
    "technicalVector": "Typosquat cards, cloned capability lists, registry pollution, perturbed metadata that still validates.",
    "owasp": [
      "ASI07",
      "ASI04"
    ],
    "cves": [],
    "incidents": [
      {
        "name": "ANP AgentCard spoofing eval",
        "year": 2026,
        "summary": "Published ANP evaluations: spoofing transfer success 0.98."
      }
    ],
    "mitigations": [
      "signed-cards",
      "mtls-a2a",
      "allowlist-servers",
      "provenance"
    ],
    "riskScore": 84
  }
];

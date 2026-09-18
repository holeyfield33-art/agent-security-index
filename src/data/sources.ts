import type { Source } from "./types.ts";

export const SOURCES: Source[] = [
{
  "id": "src-air-plugin4shell",
  "title": "Plugin4Shell: plugin SHA-pinning bypass disclosure",
  "sourceType": "primary-disclosure",
  "publisher": "AIR Security",
  "url": "https://www.air.security/blog-posts/plugin4shell",
  "publishedAt": "2026-09-17",
  "authors": [
    "Or Nevo",
    "Dor Granat",
    "Niv Hoffman"
  ],
  "notes": "Documented lab PoC; not ASI reproduction or confirmed malicious field exploitation. Product protection claims are not adopted.",
  "accessedAt": "2026-09-18",
  "supports": {
    "attackClassIds": [
      "AAC-10",
      "AAC-05"
    ],
    "mitigationIds": [],
    "productIds": []
  }
},
{
  "id": "src-codex-sha-checkout-fix",
  "title": "Verify Git plugin SHA checkouts (PR #34644)",
  "sourceType": "vendor-advisory",
  "publisher": "OpenAI",
  "url": "https://github.com/openai/codex/pull/34644",
  "publishedAt": "2026-07-22",
  "summary": "Vendor patch resolves HEAD after SHA-pinned checkout, rejects mismatches, and adds a regression test for a hash-named default branch. Ref-name checkouts retain their behavior.",
  "accessedAt": "2026-09-18",
  "supports": {
    "attackClassIds": [
      "AAC-10",
      "AAC-05"
    ],
    "mitigationIds": [],
    "productIds": []
  }
},
{
  "id": "src-codex-0146-release",
  "title": "Codex 0.146.0 release notes",
  "sourceType": "vendor-advisory",
  "publisher": "OpenAI",
  "url": "https://github.com/openai/codex/releases/tag/rust-v0.146.0",
  "summary": "Release includes PR #34644, corroborating the reported Codex fixed version. This is not an ASI patch reproduction.",
  "accessedAt": "2026-09-18",
  "supports": {
    "attackClassIds": [
      "AAC-10",
      "AAC-05"
    ],
    "mitigationIds": [],
    "productIds": []
  }
},
  {
    "id": "src-deepseek-harness-cve-2026-82533",
    "title": "DeepSeek Harness < 0.1.2-alpha.1 Authentication Bypass via Host Header Spoofing",
    "sourceType": "primary-disclosure",
    "publisher": "VulnCheck",
    "url": "https://www.vulncheck.com/advisories/deepseek-harness-alpha-1-authentication-bypass-via-host-header-spoofing",
    "publishedAt": "2026-09-08",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-29",
        "AAC-07"
      ],
      "mitigationIds": [
        "control-plane-isolation"
      ],
      "productIds": []
    }
  },
  {
    "id": "src-deepseek-harness-sandbox-docs",
    "title": "DeepSeek Harness sandbox subsystem documentation",
    "sourceType": "vendor-advisory",
    "publisher": "DeepSeek",
    "url": "https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md",
    "accessedAt": "2026-09-13",
    "notes": "Official architectural context; not independent evidence of mitigation effectiveness or a version-specific reproduction.",
    "supports": {
      "attackClassIds": [
        "AAC-29",
        "AAC-07"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-deepseek-harness-thn",
    "title": "DeepSeek Harness Flaw Let AI Agents Disable Their Own File Sandbox Without Approval",
    "sourceType": "credible-secondary",
    "publisher": "The Hacker News",
    "url": "https://thehackernews.com/2026/09/deepseek-harness-flaw-let-ai-agents.html",
    "publishedAt": "2026-09-09",
    "authors": [
      "Swati Khandelwal"
    ],
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-29",
        "AAC-07"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-chatgpt-shared-state-checkpoint",
    "title": "The Shared Clipboard Inside the Sandbox: Cross-Account Data Leakage in ChatGPT",
    "sourceType": "primary-disclosure",
    "publisher": "Check Point Research",
    "url": "https://research.checkpoint.com/2026/the-shared-clipboard-inside-the-sandbox-cross-account-data-leakage-in-chatgpt/",
    "publishedAt": "2026-09-08",
    "authors": [
      "Alexey Bukhteyev"
    ],
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-08"
      ],
      "mitigationIds": [
        "isolation"
      ],
      "productIds": []
    }
  },
  {
    "id": "src-promptfoo-owasp-agentic-ai",
    "title": "OWASP Top 10 for Agentic Applications",
    "sourceType": "vendor-advisory",
    "publisher": "Promptfoo",
    "url": "https://www.promptfoo.dev/docs/red-team/owasp-agentic-ai/",
    "accessedAt": "2026-09-14",
    "summary": "Official Promptfoo documentation for testing agentic-AI risks, including goal hijack, tool misuse, supply chain, code execution, and excessive agency scenarios.",
    "supports": {
      "attackClassIds": [
        "AAC-01",
        "AAC-07",
        "AAC-10",
        "AAC-11",
        "AAC-38"
      ],
      "mitigationIds": [
        "trajectory"
      ],
      "productIds": [
        "promptfoo-red-teaming"
      ]
    },
    "notes": "Supports documented testing coverage, not runtime prevention."
  },
  {
    "id": "src-promptfoo-agents",
    "title": "How to red team LLM Agents",
    "sourceType": "vendor-advisory",
    "publisher": "Promptfoo",
    "url": "https://www.promptfoo.dev/docs/red-team/agents/",
    "accessedAt": "2026-09-14",
    "summary": "Official Promptfoo guidance for red-teaming agent memory poisoning, tool discovery, excessive agency, goal hijacking, tool-chain attacks, and privilege escalation.",
    "supports": {
      "attackClassIds": [
        "AAC-01",
        "AAC-06",
        "AAC-08",
        "AAC-25",
        "AAC-38"
      ],
      "mitigationIds": [
        "trajectory"
      ],
      "productIds": [
        "promptfoo-red-teaming"
      ]
    },
    "notes": "Coverage is evaluation-oriented and depends on configured tests and targets."
  },
  {
    "id": "src-promptfoo-mcp-plugin",
    "title": "MCP Plugin",
    "sourceType": "vendor-advisory",
    "publisher": "Promptfoo",
    "url": "https://www.promptfoo.dev/docs/red-team/plugins/mcp/",
    "accessedAt": "2026-09-14",
    "summary": "Official Promptfoo MCP plugin documentation for testing MCP tool manipulation, system-prompt extraction, unauthorized tool discovery, and privilege-escalation paths.",
    "supports": {
      "attackClassIds": [
        "AAC-03",
        "AAC-07",
        "AAC-39"
      ],
      "mitigationIds": [
        "trajectory"
      ],
      "productIds": [
        "promptfoo-red-teaming"
      ]
    },
    "notes": "Mapped as documented red-team coverage rather than proof of blocking controls."
  },
  {
    "id": "src-checkpoint-agent-security",
    "title": "AI Agent Security",
    "sourceType": "vendor-advisory",
    "publisher": "Check Point AI Security",
    "url": "https://docs.lakera.ai/docs/agent-security",
    "accessedAt": "2026-09-14",
    "summary": "Official Check Point AI Security documentation describing AI Agent Security and AI Guardrails coverage across prompts, model outputs, tool calls, tool responses, and tool descriptions.",
    "supports": {
      "attackClassIds": [
        "AAC-01",
        "AAC-02",
        "AAC-15",
        "AAC-38"
      ],
      "mitigationIds": [
        "content-firewall",
        "output-dlp",
        "trajectory",
        "untrusted-io"
      ],
      "productIds": [
        "checkpoint-ai-guardrails"
      ]
    },
    "notes": "Coverage remains vendor-documented unless independent evaluation is later linked."
  },
  {
    "id": "src-checkpoint-data-leakage-prevention",
    "title": "Data Leakage Prevention",
    "sourceType": "vendor-advisory",
    "publisher": "Check Point AI Security",
    "url": "https://docs.lakera.ai/docs/data-leakage-prevention",
    "accessedAt": "2026-09-14",
    "summary": "Official Check Point AI Guardrails documentation for screening inputs, outputs, tool calls, and tool-role messages for PII, system prompts, trigger words, and custom entities.",
    "supports": {
      "attackClassIds": [
        "AAC-15",
        "AAC-39"
      ],
      "mitigationIds": [
        "output-dlp",
        "untrusted-io"
      ],
      "productIds": [
        "checkpoint-ai-guardrails"
      ]
    },
    "notes": "Mapped to data-egress and system-prompt exposure controls only."
  },
  {
    "id": "src-checkpoint-quickstart",
    "title": "Quickstart",
    "sourceType": "vendor-advisory",
    "publisher": "Check Point AI Security",
    "url": "https://docs.lakera.ai/docs/quickstart",
    "accessedAt": "2026-09-14",
    "summary": "Official Check Point AI Security quickstart showing prompt-injection detection with the service.",
    "supports": {
      "attackClassIds": [
        "AAC-01"
      ],
      "mitigationIds": [
        "content-firewall"
      ],
      "productIds": [
        "checkpoint-ai-guardrails"
      ]
    },
    "notes": "Supports documented prompt-injection detection only."
  },
  {
    "id": "src-invariant-home",
    "title": "Invariant Labs",
    "sourceType": "vendor-advisory",
    "publisher": "Invariant Labs",
    "url": "https://invariantlabs.ai/",
    "accessedAt": "2026-09-14",
    "summary": "Official Invariant Labs product page describing MCP Scan, Guardrails, and Explorer for agent security workflows.",
    "supports": {
      "attackClassIds": [
        "AAC-03",
        "AAC-10",
        "AAC-14"
      ],
      "mitigationIds": [
        "allowlist-servers",
        "telemetry"
      ],
      "productIds": [
        "invariant-mcp-scan"
      ]
    },
    "notes": "Mapped narrowly to discovery and scanning surfaces."
  },
  {
    "id": "src-invariant-mcp-scan-github",
    "title": "MCP-Scan repository (now Snyk Agent Scan)",
    "sourceType": "vendor-advisory",
    "publisher": "Snyk / Invariant Labs",
    "url": "https://github.com/invariantlabs-ai/mcp-scan",
    "accessedAt": "2026-09-14",
    "summary": "Official Invariant Labs repository for MCP-Scan, a scanner for local and remote MCP servers.",
    "supports": {
      "attackClassIds": [
        "AAC-03",
        "AAC-10",
        "AAC-14"
      ],
      "mitigationIds": [
        "allowlist-servers",
        "drift-detect",
        "hash-pin",
        "telemetry"
      ],
      "productIds": [
        "invariant-mcp-scan"
      ]
    },
    "notes": "Original MCP-Scan URL redirects to Snyk Agent Scan. Reviewed as first-party project documentation; release-specific scope applies."
  },
  {
    "id": "src-inc-001-zombai-copilot-rce",
    "title": "ZombAI Copilot RCE",
    "sourceType": "credible-secondary",
    "publisher": "Embrace The Red",
    "url": "https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-01"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-002-echoleak",
    "title": "EchoLeak",
    "sourceType": "primary-disclosure",
    "publisher": "Aim Security",
    "url": "https://www.aim.security/lp/aim-labs-echoleak-m365",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-02"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-cve-2025-32711",
    "title": "CVE-2025-32711",
    "sourceType": "cve-nvd",
    "publisher": "NIST NVD",
    "url": "https://nvd.nist.gov/vuln/detail/CVE-2025-32711",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-02",
        "AAC-06"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-004-mcp-injection-experiments",
    "title": "Invariant Labs MCP PoC",
    "sourceType": "public-poc",
    "publisher": "Invariant Labs",
    "url": "https://github.com/invariantlabs-ai/mcp-injection-experiments",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-03"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-005-whatsapp-mcp-exploited",
    "title": "WhatsApp MCP tool poisoning",
    "sourceType": "primary-disclosure",
    "publisher": "Invariant Labs",
    "url": "https://invariantlabs.ai/blog/whatsapp-mcp-exploited",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-03",
        "AAC-05"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-006-mcptox",
    "title": "MCPTox: A Benchmark for Tool Poisoning Attack on Real-World MCP Servers",
    "sourceType": "academic-paper",
    "publisher": "arXiv",
    "url": "https://arxiv.org/abs/2508.14925",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-04"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-cve-2025-54136",
    "title": "CVE-2025-54136",
    "sourceType": "cve-nvd",
    "publisher": "NIST NVD",
    "url": "https://nvd.nist.gov/vuln/detail/CVE-2025-54136",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-05"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-cve-2025-6514",
    "title": "CVE-2025-6514",
    "sourceType": "cve-nvd",
    "publisher": "NIST NVD",
    "url": "https://nvd.nist.gov/vuln/detail/CVE-2025-6514",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-07",
        "AAC-10",
        "AAC-19"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-013-github-mcp-private-repos",
    "title": "GitHub MCP Exploited: Accessing private repositories via prompt injection",
    "sourceType": "primary-disclosure",
    "publisher": "Invariant Labs",
    "url": "https://invariantlabs.ai/blog/mcp-github-vulnerability",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-08"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-014-mcp-inspector-key-theft",
    "title": "MCP Inspector key theft",
    "sourceType": "primary-disclosure",
    "publisher": "Oligo Security",
    "url": "https://www.oligo.security/blog/critical-rce-vulnerability-in-anthropic-mcp-inspector-cve-2025-49596",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-09"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-350-replit-database-deletion",
    "title": "Replit CEO apologizes after AI agent wiped a company database",
    "sourceType": "credible-secondary",
    "publisher": "Business Insider",
    "url": "https://www.businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-35"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-360-claude-code-project-files",
    "title": "Caught in the Hook: RCE and API Token Exfiltration Through Claude Code Project Files",
    "sourceType": "primary-disclosure",
    "publisher": "Check Point Research",
    "url": "https://research.checkpoint.com/2026/rce-and-api-token-exfiltration-through-claude-code-project-files-cve-2025-59536/",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-36"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-370-skill-md-supply-chain",
    "title": "Under the Hood of SKILL.md: Semantic Supply-chain Attacks on AI Agent Skill Registry",
    "sourceType": "academic-paper",
    "publisher": "arXiv",
    "url": "https://arxiv.org/abs/2605.11418",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-37"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-380-amazon-q-security-update",
    "title": "Security Update for Amazon Q Developer Extension for Visual Studio Code",
    "sourceType": "vendor-advisory",
    "publisher": "Amazon Web Services",
    "url": "https://aws.amazon.com/security/security-bulletins/AWS-2025-015/",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-390-owasp-system-prompt-leakage",
    "title": "OWASP LLM07:2025 System Prompt Leakage",
    "sourceType": "background",
    "publisher": "OWASP",
    "url": "https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-39"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-inc-400-owasp-agent-control-standard",
    "title": "OWASP Agent Control Standard (ACS)",
    "sourceType": "background",
    "publisher": "OWASP",
    "url": "https://genai.owasp.org/resource/agent-control-standard-acs/",
    "accessedAt": "2026-09-13",
    "supports": {
      "attackClassIds": [
        "AAC-40"
      ],
      "mitigationIds": [],
      "productIds": []
    }
  },
  {
    "id": "src-nvidia-agentic-security",
    "title": "Agentic Security — NeMo Guardrails Library",
    "sourceType": "vendor-advisory",
    "publisher": "NVIDIA",
    "url": "https://docs.nvidia.com/nemo/guardrails/configure-guardrails/guardrail-catalog/agentic-security",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-11"
      ],
      "mitigationIds": [],
      "productIds": [
        "nvidia-nemo-guardrails"
      ]
    }
  },
  {
    "id": "src-nvidia-tool-calling",
    "title": "Tool Calling — NeMo Guardrails Library",
    "sourceType": "vendor-advisory",
    "publisher": "NVIDIA",
    "url": "https://docs.nvidia.com/nemo/guardrails/configure-guardrails/guardrail-catalog/tool-calling",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": [
        "nvidia-nemo-guardrails"
      ]
    }
  },
  {
    "id": "src-nvidia-guardrail-catalog",
    "title": "Guardrail Catalog — NeMo Guardrails Library",
    "sourceType": "vendor-advisory",
    "publisher": "NVIDIA",
    "url": "https://docs.nvidia.com/nemo/guardrails/configure-guardrails/guardrail-catalog",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-11"
      ],
      "mitigationIds": [],
      "productIds": [
        "nvidia-nemo-guardrails"
      ]
    }
  },
  {
    "id": "src-meta-llamafirewall-research",
    "title": "LlamaFirewall: An open source guardrail system for building secure AI agents",
    "sourceType": "academic-paper",
    "publisher": "Meta",
    "url": "https://ai.meta.com/research/publications/llamafirewall-an-open-source-guardrail-system-for-building-secure-ai-agents/",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-01",
        "AAC-28",
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": [
        "meta-llamafirewall"
      ]
    },
    "publishedAt": "2025-04-29",
    "notes": "Vendor-authored research, not independent evaluation."
  },
  {
    "id": "src-meta-protection-tools",
    "title": "Sharing new open source protection tools and advancements in AI privacy and security",
    "sourceType": "vendor-advisory",
    "publisher": "Meta",
    "url": "https://ai.meta.com/blog/ai-defenders-program-llama-protection-tools/",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-01",
        "AAC-28",
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": [
        "meta-llamafirewall"
      ]
    },
    "publishedAt": "2025-04-29"
  },
  {
    "id": "src-aws-agentcore-policy-ga",
    "title": "Policy in Amazon Bedrock AgentCore is now generally available",
    "sourceType": "vendor-advisory",
    "publisher": "Amazon Web Services",
    "url": "https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-07",
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": [
        "aws-agentcore-policy-guardrails"
      ]
    },
    "publishedAt": "2026-03-03"
  },
  {
    "id": "src-aws-guardrails-policy",
    "title": "Guardrails in policies — Amazon Bedrock AgentCore",
    "sourceType": "vendor-advisory",
    "publisher": "Amazon Web Services",
    "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy-guardrails-in-policies.html",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-01",
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": [
        "aws-agentcore-policy-guardrails"
      ]
    }
  },
  {
    "id": "src-aws-agentcore-faq",
    "title": "Amazon Bedrock AgentCore FAQs",
    "sourceType": "vendor-advisory",
    "publisher": "Amazon Web Services",
    "url": "https://aws.amazon.com/bedrock/agentcore/faqs/",
    "accessedAt": "2026-09-14",
    "supports": {
      "attackClassIds": [
        "AAC-07",
        "AAC-38"
      ],
      "mitigationIds": [],
      "productIds": [
        "aws-agentcore-policy-guardrails"
      ]
    }
  }
];

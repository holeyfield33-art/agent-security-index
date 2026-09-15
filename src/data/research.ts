// Publication metadata only. The research repository owns the article and evidence.
export const RESEARCH_PUBLICATIONS = [
  {
    id: "ASI-RESEARCH-001",
    title: "The Disclosure Gap",
    subtitle: "When Public AI Vulnerability Reporting Outlives the Fix",
    status: "Editorial draft",
    evidenceStatus: "Public evidence pending",
    affiliation: "Aletheia Sovereign Systems",
    summary:
      "A redaction-safe examination of an author-reported 2026 DeepSeek safety-boundary crossing based on a publicly documented 2023 jailbreak pattern family. The paper asks how disclosure should be paired with demonstrated mitigation.",
    coreClaim:
      "A publicly documented jailbreak pattern remained capable of crossing the tested DeepSeek safety boundary in 2026.",
    qualification:
      "This is the author's reported finding, not an independently substantiated result. Four supplied images in the research repository contain AI-generation provenance metadata and are labeled illustrative, not original test captures. Exact test metadata and historical-pattern correspondence remain pending review. It does not establish DeepSeek's current vulnerability or a continuous unpatched flaw.",
    scope:
      "The persistence test, a separate author-reported consequence observation, and independent Anthropic reporting are distinct evidence tracks. The paper does not claim a shared jailbreak or attack class, or that public disclosure caused misuse.",
    safetyNote:
      "Operational jailbreak prompts and dangerous weapons-related outputs are withheld. Final PDF publication awaits evidence review and text approval. No catalog incident, AAC mapping, or product evidence upgrade is created by this draft.",
    links: [
      { label: "Read the draft article", href: "https://github.com/holeyfield33-art/ASI-Research-v1/blob/main/RESEARCH.md" },
      { label: "Methodology", href: "https://github.com/holeyfield33-art/ASI-Research-v1/blob/main/METHODOLOGY.md" },
      { label: "Sources and attribution", href: "https://github.com/holeyfield33-art/ASI-Research-v1/blob/main/ATTRIBUTION.md" },
      { label: "Evidence register", href: "https://github.com/holeyfield33-art/ASI-Research-v1/blob/main/evidence/README.md" },
      { label: "Canonical repository", href: "https://github.com/holeyfield33-art/ASI-Research-v1" },
    ],
  },
] as const;

// Metadata for the one published study. Full text is generated from its canonical repository.
export const RESEARCH_POSITIONING = "ASI Research publishes evidence-scoped security research on AI agent and model failure modes.";
export const RESEARCH_PUBLICATIONS = [
  {
    id: "ASI-RESEARCH-001",
    slug: "asi-research-001",
    title: "The Disclosure Gap",
    subtitle: "When Public AI Vulnerability Reporting Outlives the Fix",
    status: "Published article",
    evidenceStatus: "Original evidence pending",
    researchPeriod: "2026",
    affiliation: "Aletheia Sovereign Systems",
    summary: "A redaction-safe study of an author-reported persistence test involving a publicly known jailbreak pattern, and why safety failures matter more as model capability increases.",
    metaDescription: "A redaction-safe study examining an author-reported 2026 DeepSeek test of a publicly documented jailbreak pattern and why persistent AI safety failures matter as model capability increases.",
    coreClaim: "A publicly documented jailbreak pattern remained capable of crossing the tested DeepSeek safety boundary in 2026.",
    qualification: "The DeepSeek findings are author-reported, not independently substantiated. Original evidence, exact test metadata, and historical-pattern correspondence remain pending review. Publication is not evidence of current vulnerability, continuous exposure, or a failed vendor fix.",
    scope: "The persistence test, separate consequence observation, and independent Anthropic cases are distinct evidence tracks. There is no evidence of a shared jailbreak or attack class, and no claim that disclosure caused misuse.",
    safetyNote: "Operational prompts and dangerous outputs are withheld. Supplied gallery images are illustrative, not original captures. No final PDF or product-evidence upgrade accompanies this publication.",
    repositoryUrl: "https://github.com/holeyfield33-art/ASI-Research-v1",
    methodologyUrl: "https://github.com/holeyfield33-art/ASI-Research-v1/blob/main/METHODOLOGY.md",
  },
] as const;

import type { ChangelogEntry } from "./types.ts";
export const CHANGELOG: ChangelogEntry[] = [
{
  "version": "2026.09.2",
  "date": "2026-09-18",
  "changes": [
    "Added Plugin4Shell research PoC INC-501: primary AAC-10, secondary AAC-05; T1 lab evidence, no verified CVE or confirmed malicious field exploitation.",
    "Recorded the Materialized Identity Invariant and AAC-37/AAC-19 exclusions; no product coverage or mitigation validation upgrade.",
    "Research intake and limitations: docs/PLUGIN4SHELL-RESEARCH.md."
  ]
},
  {
    "version": "2026.09.1",
    "date": "2026-09-12",
    "changes": [
      "Canonical taxonomy IDs: AAC-01…AAC-40 only (AX-* retained as legacy aliases)",
      "Eliminated dual AX/AAC ID system in matrix source",
      "Assemble prefers TS source of truth; catalog-meta records taxonomyId=AAC",
      "AAC-41…AAC-44 reserved pending editorial research (not yet published)"
    ]
  },
  {
    "version": "2026.09.0",
    "date": "2026-09-12",
    "changes": [
      "Initial public draft ASI Catalog 2026.09.0",
      "Normalized AX-01…AX-40 to AAC-01…AAC-40",
      "Evidence tiers T0–T3; stripped blanket mitigation validation",
      "Vendor claims (unverified); independent review pending",
      "CI catalog credibility gate"
    ]
  }
];

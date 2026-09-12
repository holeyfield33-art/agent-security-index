export const CATALOG = {
  id: "agent-security-index", name: "Agent Security Index", shortName: "ASI Catalog",
  version: "2026.09.0", released: "2026-09-12", previousVersion: null as string | null, schemaVersion: "1.0.0",
  status: "draft" as "draft" | "public-review" | "stable",
  independentReview: { status: "pending" as "pending" | "in-progress" | "complete", reviewers: [] as { name: string; affiliation: string; date?: string }[], notes: "No external independent review has been completed." },
  publisher: { name: "Aletheia", role: "Publisher and product vendor", disclosure: "Aletheia develops Aegis and Lite. Those products appear only under Vendor claims (unverified)." },
  editorial: { owners: [{ name: "ASI Editorial", role: "Maintainer", contact: "editorial@example.invalid" }], updateCadence: "Monthly triage; quarterly taxonomy review.", lastReviewed: "2026-09-12", nextReviewDue: "2026-10-12", correctionPolicy: "Material errors corrected in next patch release with changelog entry.", citationFormat: "Agent Security Index, catalog version 2026.09.0" },
  principles: ["Attack classes are not CVEs.", "Mitigations are not validated unless a public reproduction package exists.", "Publisher products are never independently scored by the publisher."],
} as const;

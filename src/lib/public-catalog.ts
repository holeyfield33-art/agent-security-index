import type { Incident, Source } from "@/data/types";

const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === "string");
const optionalText = (value: Record<string, unknown>, keys: string[]) => keys.every(key => value[key] === undefined || typeof value[key] === "string");
const https = (value: unknown) => {
  try { const url = new URL(String(value)); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
};

// Runtime rendering guard, complementary to the full build-time catalog validator.
export function parsePublicCatalog(value: unknown): { incidents: Incident[]; sources: Source[] } {
  if (!record(value) || !Array.isArray(value.incidents) || !Array.isArray(value.sources)) throw new Error("Invalid catalog structure");
  for (const source of value.sources) {
    if (!record(source) || !["id", "title", "publisher", "sourceType"].every(key => typeof source[key] === "string") || !https(source.url) || !optionalText(source, ["publishedAt", "accessedAt"])) throw new Error("Invalid catalog source");
  }
  const sourceIds = new Set(value.sources.map(source => source.id));
  for (const incident of value.incidents) {
    if (!record(incident) || !["id", "name", "date", "summary", "primarySourceId"].every(key => typeof incident[key] === "string") || !sourceIds.has(incident.primarySourceId) || !strings(incident.attackClassIds) || !strings(incident.cveIds) || !optionalText(incident, ["affectedVersions", "fixedIn", "resolution", "classificationNotes", "architecturalLesson"])) throw new Error("Invalid catalog incident");
    for (const key of ["mitigationIds", "additionalSourceIds"]) if (incident[key] !== undefined && !strings(incident[key])) throw new Error("Invalid catalog references");
    if (Array.isArray(incident.additionalSourceIds) && !incident.additionalSourceIds.every(id => sourceIds.has(id))) throw new Error("Unresolved catalog source");
  }
  return value as { incidents: Incident[]; sources: Source[] };
}

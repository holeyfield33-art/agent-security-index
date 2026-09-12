import { ATTACK_CLASSES } from "./classes";
import { MITIGATIONS } from "./mitigations";
import type {
  AttackClass,
  Complexity,
  Domain,
  Impact,
  Lifecycle,
  Mitigation,
  Protocol,
  Vector,
} from "./types";

export type Filters = {
  search: string;
  vectors: Vector[];
  protocols: Protocol[];
  domains: Domain[];
  lifecycles: Lifecycle[];
  impacts: Impact[];
  complexities: Complexity[];
  highRiskOnly: boolean;
};

export const EMPTY_FILTERS: Filters = {
  search: "",
  vectors: [],
  protocols: [],
  domains: [],
  lifecycles: [],
  impacts: [],
  complexities: [],
  highRiskOnly: false,
};

export function isHighRisk(c: AttackClass): boolean {
  return (c.impact === "critical" || c.impact === "high") && c.complexity === "low";
}

export function classMitigations(c: AttackClass): Mitigation[] {
  return c.mitigations
    .map((id) => MITIGATIONS[id])
    .filter((m): m is Mitigation => Boolean(m));
}

export function matchesFilters(c: AttackClass, f: Filters): boolean {
  if (f.highRiskOnly && !isHighRisk(c)) return false;
  if (f.vectors.length && !f.vectors.includes(c.vector)) return false;
  if (f.protocols.length && !c.protocols.some((p) => f.protocols.includes(p))) return false;
  if (f.domains.length && !c.domains.some((d) => f.domains.includes(d))) return false;
  if (f.lifecycles.length && !c.lifecycle.some((l) => f.lifecycles.includes(l))) return false;
  if (f.impacts.length && !f.impacts.includes(c.impact)) return false;
  if (f.complexities.length && !f.complexities.includes(c.complexity)) return false;

  const q = f.search.trim().toLowerCase();
  if (!q) return true;

  const hay = [
    c.id,
    c.name,
    c.aka ?? "",
    c.summary,
    c.description,
    c.vector,
    ...c.protocols,
    ...c.domains,
    ...c.owasp,
    ...c.cves.map((v) => `${v.id} ${v.product}`),
    ...c.incidents.map((i) => `${i.name} ${i.summary}`),
    ...classMitigations(c).map((m) => m.name),
  ]
    .join(" ")
    .toLowerCase();

  return hay.includes(q);
}

export function filterClasses(f: Filters): AttackClass[] {
  return ATTACK_CLASSES.filter((c) => matchesFilters(c, f));
}

export function activeFilterCount(f: Filters): number {
  return (
    (f.search.trim() ? 1 : 0) +
    f.vectors.length +
    f.protocols.length +
    f.domains.length +
    f.lifecycles.length +
    f.impacts.length +
    f.complexities.length +
    (f.highRiskOnly ? 1 : 0)
  );
}

export function catalogStats(classes: AttackClass[]) {
  const critical = classes.filter((c) => c.impact === "critical").length;
  const highRisk = classes.filter(isHighRisk).length;
  const cveCount = classes.reduce((n, c) => n + c.cves.length, 0);
  const protocolSet = new Set(classes.flatMap((c) => c.protocols));
  return {
    total: classes.length,
    catalog: ATTACK_CLASSES.length,
    critical,
    highRisk,
    cveCount,
    protocols: protocolSet.size,
  };
}

export function maxCvss(c: AttackClass): number | null {
  if (!c.cves.length) return null;
  return Math.max(...c.cves.map((v) => v.cvss));
}

export function primaryCve(c: AttackClass) {
  if (!c.cves.length) return null;
  return c.cves.reduce((best, cur) => (cur.cvss > best.cvss ? cur : best));
}

export { ATTACK_CLASSES };

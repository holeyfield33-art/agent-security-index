import { catalogStats } from "@/lib/matrix/catalog";
import type { AttackClass } from "@/lib/matrix/types";

export function KpiStrip({ classes }: { classes: AttackClass[] }) {
  const s = catalogStats(classes);
  const items = [
    { label: "Classes", value: s.total },
    { label: "Critical", value: s.critical },
    { label: "High-risk", value: s.highRisk },
    { label: "CVEs", value: s.cveCount },
    { label: "Protocols", value: s.protocols },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {items.map((it) => (
        <div key={it.label} className="rounded-lg border border-border bg-card px-3 py-2">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{it.label}</div>
          <div className="mt-0.5 text-2xl font-semibold tabular-nums">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

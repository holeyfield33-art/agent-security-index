import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { isHighRisk, primaryCve } from "@/lib/matrix/catalog";
import type { AttackClass, Impact } from "@/lib/matrix/types";
import { cn } from "@/lib/utils";
import { ImpactBadge, ProtocolBadge } from "./labels";

type SortKey = "id" | "name" | "impact" | "complexity" | "riskScore";

const IMPACT_RANK: Record<Impact, number> = { critical: 4, high: 3, medium: 2, low: 1 };
const COMPLEXITY_RANK = { low: 1, medium: 2, high: 3 };

type Props = {
  classes: AttackClass[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function MatrixTable({ classes, selectedId, onSelect }: Props) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "riskScore",
    dir: "desc",
  });

  const sorted = useMemo(() => {
    const copy = [...classes];
    copy.sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      switch (sort.key) {
        case "id":
          return a.id.localeCompare(b.id) * dir;
        case "name":
          return a.name.localeCompare(b.name) * dir;
        case "impact":
          return (IMPACT_RANK[a.impact] - IMPACT_RANK[b.impact]) * dir;
        case "complexity":
          return (COMPLEXITY_RANK[a.complexity] - COMPLEXITY_RANK[b.complexity]) * dir;
        default:
          return (a.riskScore - b.riskScore) * dir;
      }
    });
    return copy;
  }, [classes, sort]);

  function header(key: SortKey, label: string, className?: string) {
    const active = sort.key === key;
    return (
      <th className={cn("px-3 py-3 font-medium", className)}>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 text-subtle hover:text-fg"
          onClick={() =>
            setSort((s) =>
              s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" },
            )
          }
        >
          {label}
          {active ? (
            sort.dir === "asc" ? (
              <ArrowUp className="size-3.5" />
            ) : (
              <ArrowDown className="size-3.5" />
            )
          ) : null}
        </button>
      </th>
    );
  }

  if (!sorted.length) {
    return (
      <div className="rounded-xl bg-surface px-6 py-16 text-center shadow-border">
        <p className="text-sm text-muted">No classes match the current filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl bg-surface shadow-border md:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="border-b border-border font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
            <tr>
              {header("id", "ID", "w-24")}
              {header("name", "Class")}
              <th className="px-3 py-3 font-medium">Protocol / domain</th>
              {header("impact", "Impact")}
              {header("complexity", "Complexity")}
              <th className="px-3 py-3 font-medium">Key CVE</th>
              {header("riskScore", "Risk", "text-right")}
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const cve = primaryCve(c);
              const selected = c.id === selectedId;
              return (
                <tr
                  key={c.id}
                  tabIndex={0}
                  onClick={() => onSelect(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(c.id);
                    }
                  }}
                  className={cn(
                    "cursor-pointer border-b border-border/70 transition-colors duration-150 last:border-0",
                    selected ? "bg-elevated" : "hover:bg-elevated/60",
                    isHighRisk(c) && !selected ? "bg-critical/[0.04]" : null,
                  )}
                >
                  <td className="px-3 py-3 font-mono text-xs text-muted tabular-nums">{c.id}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-fg">{c.name}</span>
                      <span className="line-clamp-1 text-xs text-muted">{c.summary}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.protocols.slice(0, 3).map((p) => (
                        <ProtocolBadge key={p} protocol={p} />
                      ))}
                      <Badge>{c.domains[0]}</Badge>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <ImpactBadge impact={c.impact} />
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-mono text-xs text-muted uppercase">{c.complexity}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-muted">
                    {cve ? (
                      <span className="text-fg">
                        {cve.id}
                        <span className="ml-2 tabular-nums text-subtle">{cve.cvss.toFixed(1)}</span>
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-sm tabular-nums text-fg">
                    {c.riskScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 md:hidden">
        {sorted.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={cn(
              "rounded-xl bg-surface p-4 text-left shadow-border transition-colors duration-150",
              c.id === selectedId ? "bg-elevated" : "hover:bg-elevated/60",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.6875rem] text-subtle">{c.id}</p>
                <h3 className="mt-1 font-medium text-fg">{c.name}</h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <ImpactBadge impact={c.impact} />
                <span className="font-mono text-xs tabular-nums text-muted">{c.riskScore}</span>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{c.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {c.protocols.slice(0, 3).map((p) => (
                <ProtocolBadge key={p} protocol={p} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

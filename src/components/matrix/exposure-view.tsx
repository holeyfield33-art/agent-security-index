import { isHighRisk } from "@/lib/matrix/catalog";
import type { AttackClass, Complexity, Impact } from "@/lib/matrix/types";
import { cn } from "@/lib/utils";
import { ImpactBadge } from "./labels";

const IMPACTS: Impact[] = ["critical", "high", "medium", "low"];
const COMPLEXITIES: Complexity[] = ["low", "medium", "high"];

type Props = {
  classes: AttackClass[];
  onSelect: (id: string) => void;
};

function Quadrant({
  impact,
  complexity,
  items,
  onSelect,
}: {
  impact: Impact;
  complexity: Complexity;
  items: AttackClass[];
  onSelect: (id: string) => void;
}) {
  const hot = (impact === "critical" || impact === "high") && complexity === "low";
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col rounded-md bg-elevated p-3",
        hot ? "ring-1 ring-critical/40" : "shadow-border",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
          {impact} · {complexity} complexity
        </p>
        <span className="font-mono text-xs tabular-nums text-muted">{items.length}</span>
      </div>
      <ul className="flex flex-1 flex-col gap-1">
        {items.slice(0, 6).map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect(c.id)}
              className="flex min-h-9 w-full items-center justify-between gap-2 rounded-sm px-1 text-left text-xs text-fg hover:bg-surface"
            >
              <span className="truncate">{c.name}</span>
              <span className="shrink-0 font-mono text-[0.625rem] text-subtle">{c.id}</span>
            </button>
          </li>
        ))}
        {items.length > 6 ? (
          <li className="px-1 font-mono text-[0.625rem] text-subtle">+{items.length - 6} more</li>
        ) : null}
        {!items.length ? <li className="px-1 text-xs text-subtle">None in view</li> : null}
      </ul>
    </div>
  );
}

export function ExposureView({ classes, onSelect }: Props) {
  const hot = classes.filter(isHighRisk);

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl bg-surface p-4 shadow-border sm:p-5">
        <h2 className="text-sm font-medium text-fg">High-risk exposure points</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted">
          Critical or high architectural impact with low exploit complexity — the classes most likely
          to show up in your MCP, A2A, or memory plane without a specialist attacker.
        </p>
        {hot.length ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {hot.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className="flex min-h-16 w-full items-start justify-between gap-3 rounded-md bg-elevated p-3 text-left transition-colors duration-150 hover:bg-elevated/80"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[0.625rem] text-subtle">{c.id}</p>
                    <p className="truncate font-medium text-fg">{c.name}</p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {c.protocols.join(" · ")} · {c.domains.join(", ")}
                    </p>
                  </div>
                  <ImpactBadge impact={c.impact} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">No high-risk classes in the current filter set.</p>
        )}
      </section>

      <section className="rounded-xl bg-surface p-3 shadow-border sm:p-4">
        <h2 className="mb-3 px-1 text-sm font-medium text-fg">Impact × complexity</h2>
        <div className="grid gap-2 md:grid-cols-3">
          {COMPLEXITIES.map((complexity) => (
            <div key={complexity} className="flex flex-col gap-2">
              {IMPACTS.map((impact) => (
                <Quadrant
                  key={`${impact}-${complexity}`}
                  impact={impact}
                  complexity={complexity}
                  items={classes.filter((c) => c.impact === impact && c.complexity === complexity)}
                  onSelect={onSelect}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

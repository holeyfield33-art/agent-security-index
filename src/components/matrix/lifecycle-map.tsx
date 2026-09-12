import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { AttackClass, Impact, Lifecycle } from "@/lib/matrix/types";
import { LIFECYCLE_LABEL, LIFECYCLE_SHORT, LIFECYCLES } from "@/lib/matrix/types";
import { cn } from "@/lib/utils";

const IMPACT_FILL: Record<Impact, string> = {
  critical: "bg-critical/70",
  high: "bg-high/70",
  medium: "bg-medium/55",
  low: "bg-low/50",
};

type Props = {
  classes: AttackClass[];
  onSelect: (id: string) => void;
};

export function LifecycleMap({ classes, onSelect }: Props) {
  if (!classes.length) {
    return (
      <div className="rounded-xl bg-surface px-6 py-16 text-center shadow-border">
        <p className="text-sm text-muted">No classes match the current filters.</p>
      </div>
    );
  }

  const counts = LIFECYCLES.map(
    (stage) => classes.filter((c) => c.lifecycle.includes(stage)).length,
  );
  const max = Math.max(...counts, 1);

  return (
    <div className="rounded-xl bg-surface p-3 shadow-border sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-sm font-medium text-fg">Lifecycle exposure</h2>
          <p className="text-xs text-muted">
            Where each class lands on the agent path. Color is architectural impact.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3 font-mono text-[0.6875rem] text-muted uppercase">
          {(["critical", "high", "medium", "low"] as Impact[]).map((i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-sm", IMPACT_FILL[i])} />
              {i}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 grid grid-cols-10 gap-1">
        {LIFECYCLES.map((stage, idx) => (
          <div key={stage} className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-full items-end rounded-sm bg-elevated">
              <div
                className="w-full rounded-sm bg-accent/40"
                style={{ height: `${Math.max(8, (counts[idx] / max) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[0.625rem] text-subtle">{LIFECYCLE_SHORT[stage]}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-surface px-2 py-2 text-left font-mono text-[0.6875rem] text-subtle uppercase">
                Class
              </th>
              {LIFECYCLES.map((stage) => (
                <th key={stage} className="px-1 py-2 text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-mono text-[0.625rem] text-subtle">
                        {LIFECYCLE_SHORT[stage]}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{LIFECYCLE_LABEL[stage]}</TooltipContent>
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id} className="border-t border-border/60">
                <td className="sticky left-0 z-10 bg-surface px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className="flex min-h-11 w-full items-center text-left"
                  >
                    <span className="mr-2 font-mono text-[0.625rem] text-subtle">{c.id}</span>
                    <span className="truncate text-xs text-fg">{c.name}</span>
                  </button>
                </td>
                {LIFECYCLES.map((stage) => {
                  const on = c.lifecycle.includes(stage);
                  return (
                    <td key={stage} className="px-1 py-1.5">
                      <button
                        type="button"
                        aria-label={
                          on
                            ? `${c.name} hits ${LIFECYCLE_LABEL[stage]}`
                            : `${c.name} does not hit ${LIFECYCLE_LABEL[stage]}`
                        }
                        onClick={() => onSelect(c.id)}
                        className={cn(
                          "mx-auto block h-6 w-full min-w-6 rounded-sm transition-opacity duration-150",
                          on ? IMPACT_FILL[c.impact] : "bg-elevated",
                        )}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

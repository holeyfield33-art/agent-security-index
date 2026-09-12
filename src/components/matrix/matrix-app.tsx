import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ATTACK_CLASSES, EMPTY_FILTERS, filterClasses, type Filters } from "@/lib/matrix/catalog";
import { ClassDetail } from "./class-detail";
import { ExposureView } from "./exposure-view";
import { FilterBar } from "./filter-bar";
import { KpiStrip } from "./kpi-strip";
import { LifecycleMap } from "./lifecycle-map";
import { MatrixTable } from "./matrix-table";

type View = "matrix" | "lifecycle" | "exposure";

const VIEWS: { id: View; label: string }[] = [
  { id: "matrix", label: "Matrix" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "exposure", label: "Exposure" },
];

export function MatrixApp() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [view, setView] = useState<View>("matrix");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(() => filterClasses(filters), [filters]);
  const selected = ATTACK_CLASSES.find((c) => c.id === selectedId) ?? null;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-dvh bg-bg text-fg">
        <header className="border-b border-border">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
                  Agent attack class catalog
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                  Master Matrix
                </h1>
                <p className="mt-2 text-sm text-muted">
                  Forty vulnerability classes across the agent lifecycle — MCP, A2A, and ANP vectors
                  mapped to CVEs, incidents, and validated defense-in-depth.
                </p>
              </div>
              <nav
                aria-label="Views"
                className="flex rounded-md bg-surface p-1 shadow-border"
              >
                {VIEWS.map((v) => (
                  <Button
                    key={v.id}
                    type="button"
                    size="sm"
                    variant={view === v.id ? "default" : "ghost"}
                    className="min-w-24"
                    onClick={() => setView(v.id)}
                  >
                    {v.label}
                  </Button>
                ))}
              </nav>
            </div>
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <KpiStrip classes={visible} />
          {view === "matrix" ? (
            <MatrixTable classes={visible} selectedId={selectedId} onSelect={setSelectedId} />
          ) : null}
          {view === "lifecycle" ? (
            <LifecycleMap classes={visible} onSelect={setSelectedId} />
          ) : null}
          {view === "exposure" ? (
            <ExposureView classes={visible} onSelect={setSelectedId} />
          ) : null}
        </main>

        <footer className="mx-auto w-full max-w-7xl px-4 pb-10 text-xs text-subtle sm:px-6 lg:px-8">
          Mappings follow OWASP ASI01–ASI10, MCP01–MCP10 (2025), and public CVE/incident records
          through September 2026. Treat this catalog as a threat-model aid, not a scanner.
        </footer>
      </div>
      <ClassDetail attackClass={selected} onClose={() => setSelectedId(null)} />
    </TooltipProvider>
  );
}

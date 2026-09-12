import { SlidersHorizontal, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { activeFilterCount, type Filters } from "@/lib/matrix/catalog";
import {
  COMPLEXITIES,
  COMPLEXITY_LABEL,
  DOMAINS,
  DOMAIN_LABEL,
  IMPACTS,
  IMPACT_LABEL,
  LIFECYCLE_LABEL,
  LIFECYCLES,
  PROTOCOLS,
  VECTOR_LABEL,
  VECTORS,
  type Complexity,
  type Domain,
  type Impact,
  type Lifecycle,
  type Protocol,
  type Vector,
} from "@/lib/matrix/types";
import { cn } from "@/lib/utils";

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

function Chip<T extends string>({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 items-center rounded-full border px-3 font-mono text-[0.6875rem] font-medium uppercase tracking-wide transition-colors duration-150",
        active
          ? "border-accent/40 bg-accent/15 text-accent"
          : "border-border bg-transparent text-muted hover:bg-elevated hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Group<T extends string>({
  label,
  options,
  selected,
  render,
  onToggle,
}: {
  label: string;
  options: readonly T[];
  selected: T[];
  render: (v: T) => string;
  onToggle: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[0.6875rem] font-medium tracking-wider text-subtle uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip key={opt} active={selected.includes(opt)} onClick={() => onToggle(opt)}>
            {render(opt)}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterBar({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const count = activeFilterCount(filters);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search classes, CVEs, incidents, mitigations"
            aria-label="Search attack classes"
            className="pr-11"
          />
          {filters.search ? (
            <button
              type="button"
              aria-label="Clear search"
              className="absolute top-0 right-0 inline-flex size-11 items-center justify-center text-muted hover:text-fg"
              onClick={() => onChange({ ...filters, search: "" })}
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={filters.highRiskOnly ? "default" : "outline"}
            onClick={() => onChange({ ...filters, highRiskOnly: !filters.highRiskOnly })}
          >
            High-risk
          </Button>
          <Button type="button" variant="outline" onClick={() => setOpen(true)}>
            <SlidersHorizontal className="size-4" />
            Filters
            {count > 0 ? (
              <span className="tabular-nums text-accent">{count}</span>
            ) : null}
          </Button>
        </div>
      </div>

      <div className="hidden flex-wrap gap-2 lg:flex">
        {PROTOCOLS.map((p) => (
          <Chip
            key={p}
            active={filters.protocols.includes(p)}
            onClick={() => onChange({ ...filters, protocols: toggle(filters.protocols, p) })}
          >
            {p}
          </Chip>
        ))}
        <span className="mx-1 w-px self-stretch bg-border" />
        {DOMAINS.map((d) => (
          <Chip
            key={d}
            active={filters.domains.includes(d)}
            onClick={() => onChange({ ...filters, domains: toggle(filters.domains, d) })}
          >
            {DOMAIN_LABEL[d]}
          </Chip>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter the catalog</SheetTitle>
            <SheetDescription>
              Narrow by vector, protocol, domain, lifecycle stage, impact, and exploit complexity.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 pb-5">
            <Group
              label="Attack vector"
              options={VECTORS}
              selected={filters.vectors}
              render={(v: Vector) => VECTOR_LABEL[v]}
              onToggle={(v) => onChange({ ...filters, vectors: toggle(filters.vectors, v) })}
            />
            <Group
              label="Protocol"
              options={PROTOCOLS}
              selected={filters.protocols}
              render={(p: Protocol) => p}
              onToggle={(p) => onChange({ ...filters, protocols: toggle(filters.protocols, p) })}
            />
            <Group
              label="Target domain"
              options={DOMAINS}
              selected={filters.domains}
              render={(d: Domain) => DOMAIN_LABEL[d]}
              onToggle={(d) => onChange({ ...filters, domains: toggle(filters.domains, d) })}
            />
            <Group
              label="Lifecycle"
              options={LIFECYCLES}
              selected={filters.lifecycles}
              render={(l: Lifecycle) => LIFECYCLE_LABEL[l]}
              onToggle={(l) => onChange({ ...filters, lifecycles: toggle(filters.lifecycles, l) })}
            />
            <Group
              label="Architectural impact"
              options={IMPACTS}
              selected={filters.impacts}
              render={(i: Impact) => IMPACT_LABEL[i]}
              onToggle={(i) => onChange({ ...filters, impacts: toggle(filters.impacts, i) })}
            />
            <Group
              label="Exploit complexity"
              options={COMPLEXITIES}
              selected={filters.complexities}
              render={(c: Complexity) => COMPLEXITY_LABEL[c]}
              onToggle={(c) =>
                onChange({ ...filters, complexities: toggle(filters.complexities, c) })
              }
            />
          </div>
          <div className="flex gap-2 border-t border-border p-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                onChange({
                  search: filters.search,
                  vectors: [],
                  protocols: [],
                  domains: [],
                  lifecycles: [],
                  impacts: [],
                  complexities: [],
                  highRiskOnly: false,
                })
              }
            >
              Clear
            </Button>
            <Button className="flex-1" onClick={() => setOpen(false)}>
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

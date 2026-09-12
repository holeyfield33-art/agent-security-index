import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { classMitigations, isHighRisk, maxCvss } from "@/lib/matrix/catalog";
import type { AttackClass } from "@/lib/matrix/types";
import { LIFECYCLE_LABEL, LIFECYCLES, VECTOR_LABEL } from "@/lib/matrix/types";
import { cn } from "@/lib/utils";
import { ComplexityBadge, CvssBadge, DomainBadge, ImpactBadge, ProtocolBadge } from "./labels";

type Props = {
  attackClass: AttackClass | null;
  onClose: () => void;
};

export function ClassDetail({ attackClass, onClose }: Props) {
  const c = attackClass;
  const mitigations = c ? classMitigations(c) : [];
  const cvss = c ? maxCvss(c) : null;

  return (
    <Sheet open={Boolean(c)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        {c ? (
          <>
            <SheetHeader>
              <p className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                {c.id}
                {c.aka ? ` · ${c.aka}` : ""}
              </p>
              <SheetTitle>{c.name}</SheetTitle>
              <SheetDescription>{c.summary}</SheetDescription>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <ImpactBadge impact={c.impact} />
                <ComplexityBadge complexity={c.complexity} />
                {isHighRisk(c) ? <Badge tone="critical">High-risk exposure</Badge> : null}
                <Badge className="tabular-nums">Risk {c.riskScore}</Badge>
                {cvss != null ? <CvssBadge score={cvss} /> : null}
              </div>
            </SheetHeader>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 px-5 pb-8">
                <section>
                  <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    Overview
                  </h3>
                  <p className="mt-2 text-sm text-fg">{c.description}</p>
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                      Vector & mappings
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge>{VECTOR_LABEL[c.vector]}</Badge>
                      {c.owasp.map((o) => (
                        <Badge key={o} tone="accent">
                          {o}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.protocols.map((p) => (
                        <ProtocolBadge key={p} protocol={p} />
                      ))}
                      {c.domains.map((d) => (
                        <DomainBadge key={d} domain={d} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                      Lifecycle
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {LIFECYCLES.map((stage) => {
                        const on = c.lifecycle.includes(stage);
                        return (
                          <span
                            key={stage}
                            className={cn(
                              "rounded-full px-2 py-1 font-mono text-[0.625rem] uppercase",
                              on ? "bg-accent/15 text-accent" : "bg-elevated text-subtle",
                            )}
                          >
                            {LIFECYCLE_LABEL[stage]}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    Architectural impact
                  </h3>
                  <p className="mt-2 text-sm text-fg">{c.architecturalImpact}</p>
                </section>

                <section>
                  <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    Technical vector
                  </h3>
                  <p className="mt-2 text-sm text-fg">{c.technicalVector}</p>
                </section>

                <section>
                  <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    CVEs
                  </h3>
                  {c.cves.length ? (
                    <ul className="mt-2 divide-y divide-border">
                      {c.cves.map((v) => (
                        <li key={v.id} className="flex items-center justify-between gap-3 py-2">
                          <div>
                            <p className="font-mono text-sm text-fg">{v.id}</p>
                            <p className="text-xs text-muted">
                              {v.product} · {v.year}
                            </p>
                          </div>
                          <CvssBadge score={v.cvss} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted">
                      No assigned CVE — class is protocol or research-defined.
                    </p>
                  )}
                </section>

                <section>
                  <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    Real-world incidents
                  </h3>
                  <ul className="mt-2 flex flex-col gap-3">
                    {c.incidents.map((i) => (
                      <li key={i.name} className="rounded-md bg-elevated p-3">
                        <p className="text-sm font-medium text-fg">
                          {i.name}{" "}
                          <span className="font-mono text-xs font-normal text-subtle">{i.year}</span>
                        </p>
                        <p className="mt-1 text-sm text-muted">{i.summary}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    Validated defense-in-depth
                  </h3>
                  <ul className="mt-2 flex flex-col gap-2">
                    {mitigations.map((m) => (
                      <li key={m.id} className="rounded-md bg-elevated p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-fg">{m.name}</p>
                          {m.validated ? <Badge tone="low">Validated</Badge> : null}
                        </div>
                        <p className="mt-1 text-sm text-muted">{m.summary}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </ScrollArea>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

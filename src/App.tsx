import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MatrixApp } from "@/components/matrix/matrix-app";
import {
  ATTACK_EVIDENCE_LEVEL_MEANINGS,
  EVIDENCE_TIER_MEANINGS,
  METHODOLOGY_SECTIONS,
  MITIGATION_STATUS_MEANINGS,
  PRODUCT_COVERAGE_MEANINGS,
  SOURCE_TYPE_HIERARCHY,
} from "@/data/methodology";
import { PRODUCTS } from "@/data/products";
import type { Incident } from "@/data/types";
import { MITIGATION_LIST } from "@/lib/matrix/mitigations";
import { ATTACK_CLASSES, classMitigations } from "@/lib/matrix/catalog";
import {
  COMPLEXITY_LABEL,
  DOMAIN_LABEL,
  IMPACT_LABEL,
  LIFECYCLE_LABEL,
  PROTOCOLS,
  VECTOR_LABEL,
} from "@/lib/matrix/types";
import { cn } from "@/lib/utils";

type Route =
  | { name: "home" }
  | { name: "matrix" }
  | { name: "products" }
  | { name: "product"; id: string }
  | { name: "incidents" }
  | { name: "methodology" }
  | { name: "research" }
  | { name: "attack"; id: string }
  | { name: "not-found" };

const NAV = [
  { label: "Home", href: "#/" },
  { label: "Attack Matrix", href: "#/matrix" },
  { label: "Products", href: "#/products" },
  { label: "Incidents", href: "#/incidents" },
  { label: "Methodology", href: "#/methodology" },
  { label: "Research", href: "#/research" },
];

function safeDecodeRoutePart(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

function parseRoute(hash: string): Route {
  const path = (hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";
  const parts = path.split("/").filter(Boolean).map(safeDecodeRoutePart);

  if (parts[0] === "matrix") return { name: "matrix" };
  if (parts[0] === "products" && parts[1]) return { name: "product", id: parts[1] };
  if (parts[0] === "products") return { name: "products" };
  if (parts[0] === "incidents") return { name: "incidents" };
  if (parts[0] === "methodology") return { name: "methodology" };
  if (parts[0] === "research") return { name: "research" };
  if (parts[0] === "attacks" && parts[1]) return { name: "attack", id: parts[1].toUpperCase() };
  if (parts.length === 0) return { name: "home" };
  return { name: "not-found" };
}

function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function usePublicIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetch("/export/asi-catalog.json")
      .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
      .then((catalog) => {
        if (active) {
          setIncidents(catalog.incidents ?? []);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) {
          setIncidents([]);
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { incidents, status };
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border bg-bg/95">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a href="#/" className="text-lg font-medium tracking-tight text-fg">
            Agent Security Index
          </a>
          <nav aria-label="Primary" className="flex flex-wrap gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted hover:bg-muted hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-4xl text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          {title}
        </h1>
        <div className="mt-3 max-w-3xl text-sm leading-6 text-muted">{children}</div>
      </div>
    </div>
  );
}

function Content({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <main className={cn("mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8", className)}>
      {children}
    </main>
  );
}

function HomePage({ incidents }: { incidents: Incident[] }) {
  const counts = {
    classes: ATTACK_CLASSES.length,
    incidents: incidents.length,
    mitigations: MITIGATION_LIST.length,
    products: PRODUCTS.length,
  };

  return (
    <>
      <PageHeader eyebrow="Static research publication" title="Agent Security Index">
        <p>
          Independent research into how AI agents fail, which controls help, and where products
          leave gaps.
        </p>
      </PageHeader>
      <Content className="grid gap-6">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["AAC classes", counts.classes],
            ["Incidents", counts.incidents],
            ["Mitigations", counts.mitigations],
            ["Products", counts.products],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md bg-surface p-4 shadow-border">
              <p className="font-mono text-2xl tabular-nums text-fg">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </section>
        <section className="grid gap-3 sm:grid-cols-3">
          <Button asChild>
            <a href="#/matrix">Explore Attack Matrix</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#/products">Browse Products</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#/methodology">Read Methodology</a>
          </Button>
        </section>
      </Content>
    </>
  );
}

function MethodologyPage() {
  return (
    <>
      <PageHeader eyebrow="Methodology" title="How ASI represents evidence">
        <p>
          ASI is a static research index for agent attack classes, incidents, mitigations, and
          product coverage claims. It is not a scanner, certification program, vendor ranking, or
          replacement for product-specific security review.
        </p>
      </PageHeader>
      <Content className="grid gap-6">
        <section className="grid gap-3 md:grid-cols-2">
          {METHODOLOGY_SECTIONS.map((section) => (
            <article key={section.id} className="rounded-md bg-surface p-4 shadow-border">
              <h2 className="text-lg font-medium text-fg">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{section.body}</p>
            </article>
          ))}
        </section>
        <TermSection title="Evidence tiers T0-T3" terms={EVIDENCE_TIER_MEANINGS} />
        <TermSection title="Attack evidence levels" terms={ATTACK_EVIDENCE_LEVEL_MEANINGS} />
        <TermSection title="Source types" terms={SOURCE_TYPE_HIERARCHY} />
        <TermSection title="Mitigation statuses" terms={MITIGATION_STATUS_MEANINGS} />
        <TermSection title="Product coverage meanings" terms={PRODUCT_COVERAGE_MEANINGS} />
      </Content>
    </>
  );
}

function TermSection({
  title,
  terms,
}: {
  title: string;
  terms: readonly { value: string; label: string; meaning: string }[];
}) {
  return (
    <section>
      <h2 className="text-xl font-medium text-fg">{title}</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {terms.map((term) => (
          <div key={term.value} className="rounded-md border border-border bg-surface p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{term.value}</Badge>
              <h3 className="font-medium text-fg">{term.label}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{term.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="Products" title="Product coverage directory">
        <p>
          Product entries are fixtures for coverage semantics. They are not ranked, scored, or
          treated as independent proof.
        </p>
      </PageHeader>
      <Content className="grid gap-3">
        {PRODUCTS.map((product) => {
          const evidence = new Set(product.coverages.map((coverage) => coverage.evidenceStatus));
          return (
            <a
              key={product.id}
              href={`#/products/${product.id}`}
              className="rounded-md bg-surface p-4 shadow-border hover:bg-elevated"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-medium text-fg">{product.name}</h2>
                    {product.publisherProduct ? <Badge tone="accent">Publisher-owned</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm text-muted">{product.vendor}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{product.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <Badge>{product.coverages.length} coverage records</Badge>
                  {[...evidence].map((item) => (
                    <Badge key={item} tone="muted">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <MetaList values={[...product.deployment, ...product.categories]} />
            </a>
          );
        })}
      </Content>
    </>
  );
}

function ProductDetailPage({ id }: { id: string }) {
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) return <NotFound title="Product not found" backHref="#/products" backLabel="Back to products" />;

  return (
    <>
      <PageHeader eyebrow="Product detail" title={product.name}>
        <p>{product.description}</p>
      </PageHeader>
      <Content className="grid gap-5">
        <section className="rounded-md bg-surface p-4 shadow-border">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Vendor" value={product.vendor} />
            <Info label="Pricing" value={product.pricingModel} />
            <Info label="Deployment" value={product.deployment.join(", ")} />
            <Info label="Last reviewed" value={product.lastReviewedAt} />
          </dl>
          <MetaList values={product.categories} />
          {product.publisherProduct ? (
            <p className="mt-4 rounded-md border border-border bg-elevated p-3 text-sm leading-6 text-muted">
              {product.disclosure}
            </p>
          ) : null}
        </section>
        <section>
          <h2 className="text-xl font-medium text-fg">Coverage records</h2>
          <div className="mt-3 grid gap-3">
            {product.coverages.map((coverage) => {
              const attack = ATTACK_CLASSES.find((item) => item.id === coverage.attackClassId);
              return (
                <article key={coverage.attackClassId} className="rounded-md bg-surface p-4 shadow-border">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`#/attacks/${coverage.attackClassId}`}
                      className="font-mono text-sm text-accent hover:underline"
                    >
                      {coverage.attackClassId}
                    </a>
                    <h3 className="font-medium text-fg">{attack?.name ?? "Unknown attack class"}</h3>
                    <Badge>{coverage.coverage}</Badge>
                    <Badge tone="muted">{coverage.evidenceStatus}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    Mitigations:{" "}
                    <span className="font-mono text-fg">{coverage.mitigationIds.join(", ")}</span>
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Evidence source IDs:{" "}
                    {coverage.evidenceSourceIds.length ? (
                      <span className="font-mono text-fg">{coverage.evidenceSourceIds.join(", ")}</span>
                    ) : (
                      <span className="text-accent">No independent evidence linked yet.</span>
                    )}
                  </p>
                  <ul className="mt-3 grid gap-1 text-sm text-muted">
                    {coverage.limitations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      </Content>
    </>
  );
}

function IncidentsPage({
  incidents,
  status,
}: {
  incidents: Incident[];
  status: "loading" | "ready" | "error";
}) {
  return (
    <>
      <PageHeader eyebrow="Incidents" title="Incident catalog">
        <p>Existing incident records with primary source status. Severity is not inferred.</p>
      </PageHeader>
      <Content>
        {status === "error" ? (
          <div className="mb-4 rounded-md border border-border bg-surface p-4 text-sm text-muted shadow-border">
            Incident records could not be loaded from the generated catalog. Run the catalog
            assembly step and refresh this page.
          </div>
        ) : null}
        {status === "loading" ? (
          <div className="mb-4 rounded-md border border-border bg-surface p-4 text-sm text-muted shadow-border">
            Loading incident records from the generated catalog.
          </div>
        ) : null}
        <div className="grid gap-3">
          {incidents.map((incident) => (
            <article key={incident.id} className="rounded-md bg-surface p-4 shadow-border">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-subtle">{incident.id}</p>
                  <h2 className="mt-1 text-lg font-medium text-fg">{incident.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{incident.summary}</p>
                </div>
                <Badge>{incident.year}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
                <Badge tone="muted">{incident.primarySource.kind}</Badge>
                <a
                  href={incident.primarySource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-accent hover:underline"
                >
                  {incident.primarySource.title}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Content>
    </>
  );
}

function AttackDetailPage({ id }: { id: string }) {
  const attack = ATTACK_CLASSES.find((item) => item.id === id || item.aka === id);
  const mitigations = attack ? classMitigations(attack) : [];

  if (!attack) return <NotFound title="Attack class not found" backHref="#/matrix" backLabel="Back to matrix" />;

  return (
    <>
      <PageHeader eyebrow="Attack detail" title={`${attack.id} ${attack.name}`}>
        <p>{attack.summary}</p>
      </PageHeader>
      <Content className="grid gap-5">
        <section className="rounded-md bg-surface p-4 shadow-border">
          <p className="text-sm leading-6 text-muted">{attack.description}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Impact" value={IMPACT_LABEL[attack.impact]} />
            <Info label="Complexity" value={COMPLEXITY_LABEL[attack.complexity]} />
            <Info label="Vector" value={VECTOR_LABEL[attack.vector]} />
            <Info label="Risk score" value={String(attack.riskScore)} />
          </div>
          {attack.aka ? <p className="mt-3 text-sm text-subtle">Legacy alias: {attack.aka}</p> : null}
          <p className="mt-4 rounded-md border border-border bg-elevated p-3 text-sm leading-6 text-muted">
            riskScore is an attack exposure/risk heuristic. It is not product quality, evidence
            confidence, or mitigation effectiveness.
          </p>
        </section>
        <section className="grid gap-3 md:grid-cols-2">
          <DetailGroup title="Protocols" values={attack.protocols} />
          <DetailGroup title="Domains" values={attack.domains.map((item) => DOMAIN_LABEL[item])} />
          <DetailGroup
            title="Lifecycle"
            values={attack.lifecycle.map((item) => LIFECYCLE_LABEL[item])}
          />
          <DetailGroup title="OWASP mappings" values={attack.owasp} />
        </section>
        <RecordList
          title="CVEs"
          empty="No CVEs are currently attached."
          records={attack.cves.map((cve) => `${cve.id} - ${cve.product} (${cve.year}, CVSS ${cve.cvss})`)}
        />
        <RecordList
          title="Incidents"
          empty="No incidents are currently attached."
          records={attack.incidents.map((incident) => `${incident.name} (${incident.year}) - ${incident.summary}`)}
        />
        <RecordList
          title="Mitigations"
          empty="No mitigations are currently attached."
          records={mitigations.map((mitigation) => `${mitigation.id} - ${mitigation.name}: ${mitigation.summary}`)}
        />
      </Content>
    </>
  );
}

function ResearchPage() {
  return (
    <>
      <PageHeader eyebrow="Research" title="Research publications">
        <p>Research publications coming next.</p>
      </PageHeader>
      <Content />
    </>
  );
}

function DetailGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-md bg-surface p-4 shadow-border">
      <h2 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">{title}</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.length ? values.map((value) => <Badge key={value}>{value}</Badge>) : <p className="text-sm text-muted">None recorded.</p>}
      </div>
    </section>
  );
}

function RecordList({ title, empty, records }: { title: string; empty: string; records: string[] }) {
  return (
    <section className="rounded-md bg-surface p-4 shadow-border">
      <h2 className="text-xl font-medium text-fg">{title}</h2>
      {records.length ? (
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
          {records.map((record) => (
            <li key={record}>{record}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">{empty}</p>
      )}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-fg">{value}</dd>
    </div>
  );
}

function MetaList({ values }: { values: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {values.map((value) => (
        <Badge key={value} tone="muted">
          {value}
        </Badge>
      ))}
    </div>
  );
}

function NotFound({
  title,
  backHref,
  backLabel,
}: {
  title: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <Content>
      <div className="rounded-md bg-surface p-6 shadow-border">
        <h1 className="text-2xl font-medium text-fg">{title}</h1>
        <Button asChild className="mt-4">
          <a href={backHref}>{backLabel}</a>
        </Button>
      </div>
    </Content>
  );
}

export function App() {
  const route = useHashRoute();
  const { incidents, status: incidentStatus } = usePublicIncidents();
  const page = useMemo(() => {
    switch (route.name) {
      case "matrix":
        return <MatrixApp />;
      case "products":
        return <ProductsPage />;
      case "product":
        return <ProductDetailPage id={route.id} />;
      case "incidents":
        return <IncidentsPage incidents={incidents} status={incidentStatus} />;
      case "methodology":
        return <MethodologyPage />;
      case "research":
        return <ResearchPage />;
      case "attack":
        return <AttackDetailPage id={route.id} />;
      case "not-found":
        return <NotFound title="Page not found" backHref="#/" backLabel="Back to home" />;
      default:
        return <HomePage incidents={incidents} />;
    }
  }, [incidents, incidentStatus, route]);

  if (route.name === "matrix") return page;

  return <PageShell>{page}</PageShell>;
}

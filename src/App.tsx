import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MatrixApp } from "@/components/matrix/matrix-app";
import {
  ATTACK_EVIDENCE_LEVEL_MEANINGS,
  ASI_ROLE,
  ATTACK_RISK_GUIDANCE,
  PRODUCT_DECISION_GUIDANCE,
  PRODUCT_EVIDENCE_MEANINGS,
  EVIDENCE_TIER_MEANINGS,
  METHODOLOGY_SECTIONS,
  MITIGATION_STATUS_MEANINGS,
  PRODUCT_COVERAGE_MEANINGS,
  SOURCE_TYPE_HIERARCHY,
} from "@/data/methodology";
import { PRODUCTS } from "@/data/products";
import { RESEARCH_POSITIONING, RESEARCH_PUBLICATIONS } from "@/data/research";
import { RESEARCH_001 } from "@/data/research-001.generated";
import { ResearchArticle } from "@/components/research-article";
import { SOURCES } from "@/data/sources";
import type { Incident, Source, SourceId } from "@/data/types";
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
  | { name: "research-detail"; id: string }
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
  if (parts[0] === "research") {
    if (parts.length === 1) return { name: "research" };
    if (parts.length === 2 && parts[1]) return { name: "research-detail", id: parts[1] };
    return { name: "not-found" };
  }
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

function usePublicCatalog() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetch("/export/asi-catalog.json")
      .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
      .then((catalog) => {
        if (active) {
          setIncidents(catalog.incidents ?? []);
          setSources(catalog.sources ?? []);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) {
          setIncidents([]);
          setSources([]);
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { incidents, sources, status };
}

function PageShell({ children }: { children: React.ReactNode }) {
  const currentPath = window.location.hash || "#/";
  return (
    <div className="publication min-h-dvh bg-bg text-fg">
      <div className="edition-bar"><span>ASI / RESEARCH & INTELLIGENCE</span><span>PUBLIC CATALOG · DRAFT EDITION</span></div>
      <header className="publication-header border-b border-border bg-bg/95">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a href="#/" className="publication-brand" aria-label="Agent Security Index home">
            <span className="brand-mark" aria-hidden="true">a<span>si</span><i /></span>
            <span>Agent Security<br />Index</span>
          </a>
          <nav aria-label="Primary" className="flex flex-wrap gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={(item.href === "#/" ? currentPath === item.href : currentPath.startsWith(item.href)) ? "page" : undefined}
                className="rounded-md px-3 py-2 text-sm text-muted hover:bg-muted hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="publication-footer"><a href="#/">ASI / Agent Security Index</a><span>Evidence before assurance.</span><a href="#/methodology">Methodology & disclosures ↗</a></footer>
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
    <div className="publication-page-heading border-b border-border">
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
      <main className="publication-home">
        <section className="editorial-hero">
          <div className="hero-copy">
            <p className="overline"><span className="small-square" /> THE AGENT SECURITY REFERENCE</p>
            <h1>More autonomy.<br />More exposure.<br /><em>Better evidence.</em></h1>
            <p className="hero-description">A research index of how AI agents fail, which controls help, and where product claims meet the evidence.</p>
            <div className="hero-actions"><a className="primary-link" href="#/matrix">Explore the attack matrix <span>↗</span></a><a className="text-link" href="#/methodology">Our methodology <span>↗</span></a></div>
            <p className="hero-note">Research and comparison. Not certification or an automated security control.</p>
          </div>
          <aside className="index-plate" aria-label="Attack class index preview">
            <div className="plate-heading"><span>FIG. 01 / ATTACK SURFACE</span><span>AAC</span></div>
            <div className="attack-grid">{ATTACK_CLASSES.map((attack, index) => <a key={attack.id} href={`#/attacks/${attack.id}`} title={`${attack.id}: ${attack.name}`} aria-label={`${attack.id}: ${attack.name}`}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /></a>)}</div>
            <div className="plate-caption"><span>{counts.classes} classes.<br /><strong>One connected threat landscape.</strong></span><span className="plate-arrow" aria-hidden="true">↗</span></div>
            <p className="plate-note">A navigable index, not a risk ranking.</p>
          </aside>
        </section>
        <section className="catalog-totals" aria-label="Catalog at a glance"><p className="overline">THE INDEX<br /><span>AT A GLANCE</span></p>{[["Attack classes", counts.classes], ["Incident records", counts.incidents || "—"], ["Mitigations", counts.mitigations], ["Product profiles", counts.products]].map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
        <section aria-labelledby="latest-research" className="border-b border-border py-8">
          <p className="overline">LATEST RESEARCH</p>
          <h2 id="latest-research" className="mt-3 text-2xl font-medium">{RESEARCH_PUBLICATIONS[0].title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">What happens when vulnerability reporting moves faster than mitigation? An evidence-scoped study of an author-reported DeepSeek persistence test.</p>
          <a className="text-link mt-4 inline-block" href="#/research/asi-research-001">Read ASI Research 001 <span aria-hidden="true">→</span></a>
        </section>
        <section className="editorial-sections">
          <div className="directory-section"><div className="section-label"><span>01 / EXPLORE THE INDEX</span><span>RESEARCH TO REFERENCE</span></div>{[
            { number: "01", title: "Attack matrix", description: "Trace attack classes across protocols, agent lifecycles, and defensive controls.", href: "#/matrix" },
            { number: "02", title: "Incident records", description: "Examine reported failures and follow the sources behind each record.", href: "#/incidents" },
            { number: "03", title: "Product coverage", description: "Inspect documented coverage, evidence status, and declared limitations.", href: "#/products" },
          ].map(item => <a className="directory-row" href={item.href} key={item.number}><span className="row-number">{item.number}</span><div><h2>{item.title}</h2><p>{item.description}</p></div><span className="row-arrow">↗</span></a>)}</div>
          <aside className="editorial-note"><p className="overline">02 / THE EVIDENCE STANDARD</p><h2>A claim is a<br />starting point.<br /><em>Not a conclusion.</em></h2><p>Source existence and source quality are different questions. We make evidence status visible so you can judge what a coverage claim actually supports.</p><a className="text-link" href="#/methodology">Read the methodology <span>↗</span></a><div className="note-footnote">No vendor rankings. No implied certification.<br />Coverage stays scoped to the evidence.</div></aside>
        </section>
      </main>
    </>
  );
}

function MethodologyPage() {
  return (
    <>
      <PageHeader eyebrow="Methodology" title="How ASI represents evidence">
        <p>
          {ASI_ROLE}
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
        <TermSection title="Product evidence statuses" terms={PRODUCT_EVIDENCE_MEANINGS} />
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
          Products are mapped to attack classes only where public evidence supports the relationship. Entries are not ranked or certified.
        </p>
        <p className="mt-3">Coverage is scoped to the cited evidence and stated assumptions. Absence of evidence is not evidence of absence. Documented vendor functionality is not independently validated effectiveness.</p>
        <p className="mt-3">{PRODUCT_DECISION_GUIDANCE}</p>
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
              {product.coverages.length === 0 ? <p className="mt-3 text-sm text-muted">No mapped coverage yet.</p> : null}
            </a>
          );
        })}
      </Content>
    </>
  );
}

function ProductDetailPage({ id }: { id: string }) {
  const product = PRODUCTS.find((item) => item.id === id);
  const sourceById = new Map(SOURCES.map((source) => [source.id, source]));

  if (!product) return <NotFound title="Product not found" backHref="#/products" backLabel="Back to products" />;

  return (
    <>
      <PageHeader eyebrow="Product detail" title={product.name}>
        <p>{product.description}</p>
        <p className="mt-3">{PRODUCT_DECISION_GUIDANCE}</p>
      </PageHeader>
      <Content className="grid gap-5">
        <section className="rounded-md bg-surface p-4 shadow-border">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Vendor" value={product.vendor} />
            <Info label="Pricing" value={product.pricingModel} />
            <Info label="Deployment" value={product.deployment.join(", ")} />
            <Info label="Last reviewed" value={product.lastReviewedAt || "Review date not recorded"} />
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
          {product.coverages.length === 0 ? <p className="mt-3 text-sm text-muted">No mapped coverage yet.</p> : null}
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
                  <SourceLinks
                    title="Evidence sources"
                    sourceIds={coverage.evidenceSourceIds}
                    sourceById={sourceById}
                  />
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

function SourceLinks({
  title,
  sourceIds,
  sourceById,
}: {
  title: string;
  sourceIds: SourceId[];
  sourceById: Map<SourceId, Source>;
}) {
  const sources = sourceIds.map((sourceId) => sourceById.get(sourceId)).filter(Boolean) as Source[];

  return (
    <div className="mt-3">
      <h4 className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">{title}</h4>
      {sources.length ? (
        <ul className="mt-2 grid gap-2 text-sm leading-6 text-muted">
          {sources.map((source) => (
            <li key={source.id}>
              <a href={source.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                {source.title}
              </a>{" "}
              <span className="text-subtle">
                ({source.sourceType}; {source.publisher})
              </span>
              {source.publishedAt ? <span className="block text-xs text-muted">Published: <time dateTime={source.publishedAt}>{source.publishedAt}</time></span> : null}
              {source.accessedAt ? <span className="block text-xs text-muted">Source accessed: <time dateTime={source.accessedAt}>{source.accessedAt}</time> (not a product review date)</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-accent">No independent evidence linked yet.</p>
      )}
    </div>
  );
}

function IncidentContext({ incident }: { incident: Incident }) {
  return <div className="mt-3 grid gap-2 text-sm leading-6 text-muted">
    <div className="flex flex-wrap gap-2">{incident.attackClassIds.map((id, index) => <a key={id} href={`#/attacks/${id}`} className="text-accent hover:underline">{index === 0 ? "Primary" : "Secondary"}: {id}</a>)}{incident.cveIds.map(id => <Badge key={id}>{id}</Badge>)}</div>
    {incident.affectedVersions ? <p>Affected versions: {incident.affectedVersions}{incident.fixedIn ? `; fixed in ${incident.fixedIn}.` : ""}</p> : null}
    {incident.resolution ? <p><strong>Resolution / current status: </strong>{incident.resolution}</p> : null}
    {incident.classificationNotes ? <p><strong>Classification: </strong>{incident.classificationNotes}</p> : null}
    {incident.architecturalLesson ? <p><strong>Architectural lesson: </strong>{incident.architecturalLesson}</p> : null}
    {incident.mitigationIds?.map(id => { const mitigation = MITIGATION_LIST.find(item => item.id === id); return mitigation ? <p key={id}><strong>Control: {mitigation.name}. </strong>{mitigation.summary}</p> : null; })}
  </div>;
}

function IncidentsPage({
  incidents,
  sources,
  status,
}: {
  incidents: Incident[];
  sources: Source[];
  status: "loading" | "ready" | "error";
}) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));

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
                <Badge>{incident.date}</Badge>
              </div>
              <IncidentContext incident={incident} />
              {incident.primarySourceId ? (
                <SourceLinks
                  title="Primary source"
                  sourceIds={[incident.primarySourceId]}
                  sourceById={sourceById}
                />
              ) : (
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
              )}
              {incident.additionalSourceIds?.length ? <SourceLinks title="Additional sources" sourceIds={incident.additionalSourceIds} sourceById={sourceById} /> : null}
            </article>
          ))}
        </div>
      </Content>
    </>
  );
}

function AttackDetailPage({
  id,
  incidents,
  sources,
}: {
  id: string;
  incidents: Incident[];
  sources: Source[];
}) {
  const attack = ATTACK_CLASSES.find((item) => item.id === id || item.aka === id);
  const mitigations = attack ? classMitigations(attack) : [];
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const relatedIncidents = incidents.filter((incident) => incident.attackClassIds.includes(id as `AAC-${string}`));
  const relatedSourceIds = relatedIncidents
    .map((incident) => incident.primarySourceId)
    .filter(Boolean) as SourceId[];

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
            {ATTACK_RISK_GUIDANCE}
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
        {relatedIncidents.map((incident) => (
          <article key={incident.id} className="rounded-md bg-surface p-4 shadow-border">
            <p className="font-mono text-xs text-subtle">{incident.id} · {incident.date}</p>
            <h2 className="mt-1 text-lg font-medium">{incident.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{incident.summary}</p>
            <IncidentContext incident={incident} />
            <SourceLinks title="Primary source" sourceIds={incident.primarySourceId ? [incident.primarySourceId] : []} sourceById={sourceById} />
            {incident.additionalSourceIds?.length ? <SourceLinks title="Additional sources" sourceIds={incident.additionalSourceIds} sourceById={sourceById} /> : null}
          </article>
        ))}
        {relatedSourceIds.length ? (
          <section className="rounded-md bg-surface p-4 shadow-border">
            <h2 className="text-xl font-medium text-fg">Resolved source records</h2>
            <SourceLinks title="Incident sources" sourceIds={relatedSourceIds} sourceById={sourceById} />
          </section>
        ) : null}
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
        <p>{RESEARCH_POSITIONING}</p>
      </PageHeader>
      <Content className="space-y-8">
        {RESEARCH_PUBLICATIONS.map((publication) => (
          <article key={publication.id} aria-labelledby={publication.id} className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs text-subtle">{publication.id}</p>
              <Badge>{publication.status}</Badge>
              <Badge>{publication.evidenceStatus}</Badge>
            </div>
            <h2 id={publication.id} className="mt-4 text-2xl font-medium tracking-tight text-fg">{publication.title}</h2>
            <p className="mt-2 text-lg leading-7 text-muted">{publication.subtitle}</p>
            <p className="mt-6 text-sm leading-7 text-muted">{publication.summary}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{publication.qualification}</p>
            <nav aria-label={`${publication.id} reading links`} className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
              <a href={`#/research/${publication.slug}`} className="text-sm text-accent underline underline-offset-4">Read ASI Research 001 →</a>
              <a href={publication.repositoryUrl} className="text-sm text-accent underline underline-offset-4">View research repository</a>
            </nav>
          </article>
        ))}
      </Content>
    </>
  );
}

function ResearchDetailPage({ id }: { id: string }) {
  const publication = RESEARCH_PUBLICATIONS.find((item) => item.slug === id);
  if (!publication) return <NotFound title="Research publication not found" backHref="#/research" backLabel="Back to research" />;
  return (
    <>
      <PageHeader eyebrow={publication.id} title={publication.title}>
        <p className="text-lg">{publication.subtitle}</p>
      </PageHeader>
      <Content>
        <div className="mb-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap gap-2"><Badge>{publication.status}</Badge><Badge>{publication.evidenceStatus}</Badge></div>
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <Info label="Research period" value={publication.researchPeriod} />
            <Info label="Research affiliation" value={publication.affiliation} />
            <Info label="Article length" value={`${RESEARCH_001.wordCount.toLocaleString()} words · ${Math.ceil(RESEARCH_001.wordCount / 220)} min read`} />
          </dl>
          <p className="text-sm leading-7 text-muted">{publication.qualification}</p>
          <p className="text-sm leading-7 text-muted">{publication.safetyNote}</p>
          <nav aria-label="Research resources" className="flex flex-wrap gap-5 text-sm text-accent underline underline-offset-4">
            <a href={publication.repositoryUrl}>View research repository</a>
            <a href={publication.methodologyUrl}>View methodology</a>
          </nav>
        </div>
        <ResearchArticle />
        <a href="#/research" className="mt-10 inline-block text-sm text-accent underline underline-offset-4">Back to research</a>
      </Content>
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
  const publication = route.name === "research-detail" ? RESEARCH_PUBLICATIONS.find((item) => item.slug === route.id) : undefined;
  useEffect(() => {
    if (!publication) return;
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "The Disclosure Gap | ASI Research 001";
    description?.setAttribute("content", publication.metaDescription);
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
      if (previousDescription !== null && previousDescription !== undefined) description?.setAttribute("content", previousDescription);
    };
  }, [publication]);
  const { incidents, sources, status: catalogStatus } = usePublicCatalog();
  const page = useMemo(() => {
    switch (route.name) {
      case "matrix":
        return <MatrixApp />;
      case "products":
        return <ProductsPage />;
      case "product":
        return <ProductDetailPage id={route.id} />;
      case "incidents":
        return <IncidentsPage incidents={incidents} sources={sources} status={catalogStatus} />;
      case "methodology":
        return <MethodologyPage />;
      case "research":
        return <ResearchPage />;
      case "research-detail":
        return <ResearchDetailPage id={route.id} />;
      case "attack":
        return <AttackDetailPage id={route.id} incidents={incidents} sources={sources} />;
      case "not-found":
        return <NotFound title="Page not found" backHref="#/" backLabel="Back to home" />;
      default:
        return <HomePage incidents={incidents} />;
    }
  }, [catalogStatus, incidents, route, sources]);

  if (route.name === "matrix") return page;

  return <PageShell>{page}</PageShell>;
}

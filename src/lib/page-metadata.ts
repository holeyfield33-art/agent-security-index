type PageInfo = { title: string; description: string; noindex?: boolean };
const SITE = "Agent Security Index";
const descriptions: Record<string, PageInfo> = {
  home: { title: SITE, description: "Evidence-scoped research on AI agent attack classes, incidents, mitigations, and documented product coverage. Research and comparison, not certification." },
  matrix: { title: `Attack Matrix | ${SITE}`, description: "Explore 40 AI agent attack classes across protocols, lifecycles, documented incidents, and defensive controls. Exposure guidance, not product rankings." },
  research: { title: `Research | ${SITE}`, description: "ASI Research publishes evidence-scoped security research on AI agent and model failure modes, with source attribution and visible limitations." },
  methodology: { title: `Methodology | ${SITE}`, description: "How ASI classifies evidence, source quality, attack exposure, mitigation status, and product coverage. Understand the limits behind each claim." },
  incidents: { title: `Incidents | ${SITE}`, description: "Read documented AI agent security incidents with resolved primary sources, architectural context, and current-status limitations." },
  products: { title: `Product Coverage | ${SITE}`, description: "Inspect documented external product coverage and its evidence limitations. No vendor rankings, certification, or unsupported effectiveness claims." },
};

export function setPageMetadata(route: string, detail?: PageInfo) {
  const info = detail ?? descriptions[route] ?? { title: `Page not found | ${SITE}`, description: "The requested ASI publication or record could not be found.", noindex: true };
  document.title = info.title;
  for (const [selector, content] of [
    ['meta[name="description"]', info.description],
    ['meta[property="og:title"]', info.title],
    ['meta[property="og:description"]', info.description],
    ['meta[name="twitter:title"]', info.title],
    ['meta[name="twitter:description"]', info.description],
    ['meta[name="robots"]', info.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"],
  ]) document.querySelector(selector)?.setAttribute("content", content);
  // Canonical and og:url stay fragment-free: these are views of one HTML document.
}

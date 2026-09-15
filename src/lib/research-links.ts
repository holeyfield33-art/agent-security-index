const REPOSITORY = "https://github.com/holeyfield33-art/ASI-Research-v1/blob/main/";
const LOCAL_RESOURCES = new Set(["METHODOLOGY.md", "ATTRIBUTION.md", "evidence/README.md", "screenshots/README.md"]);

export function researchLinkHref(href: string): string | null {
  if (LOCAL_RESOURCES.has(href)) return REPOSITORY + href;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

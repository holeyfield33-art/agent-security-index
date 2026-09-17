import { test, expect } from "@playwright/test";
import { evaluateCatalog } from "../../scripts/check-catalog-invariant.mjs";

const routes = [
  ["/", /More autonomy/],
  ["/#/research", /^Research publications$/],
  ["/#/research/asi-research-001", /^The Disclosure Gap$/],
  ["/#/research/reference-not-authority", /^Reference ≠ Authority$/],
  ["/#/matrix", /^Master Matrix$/],
  ["/#/methodology", /^How ASI represents evidence$/],
] as const;

test("architecture figures reflow and preserve experimental scope", async ({ page }, testInfo) => {
  await page.goto("/#/research/reference-not-authority");
  await expect(page.locator(".architecture-figure")).toHaveCount(3);
  await expect(page.locator(".architecture-note")).toContainText("provided reference issuance, authorization, worker isolation, and output governance");
  await expect(page.getByRole("link", { name: "View research repository" })).toHaveCount(0);
  await expect(page.getByText("Article length", { exact: true })).toHaveCount(0);
  await expect(page).toHaveTitle("Reference ≠ Authority | ASI-ARCH-001");
  for (const figure of await page.locator(".architecture-figure").all()) {
    await figure.scrollIntoViewIfNeeded();
    expect(await figure.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator(".architecture-figure").nth(1).screenshot({ path: testInfo.outputPath("control-loop.png") });
});

for (const [route, heading] of routes) test(`@smoke direct load and refresh ${route}`, async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  const response = await page.goto(route);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("@smoke research navigation, history and evidence boundaries", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Read ASI Research 001" }).click();
  await expect(page.locator(".research-article h2")).toHaveCount(11);
  await expect(page.getByText("Original evidence pending", { exact: true })).toBeVisible();
  await expect(page.locator(".research-article")).toContainText("There is no evidence that Anthropic's actors used the jailbreak tested here");
  await expect(page.locator("iframe, a[href$='.pdf']")).toHaveCount(0);
  expect(await page.locator("main").innerText()).not.toMatch(/Aegis|Runtime Firewall|buy now/i);
  await page.getByRole("link", { name: "Back to research", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Research publications", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.locator(".research-article")).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("heading", { name: "Research publications", exact: true })).toBeVisible();
});

test("@smoke matrix search, clear, filters and keyboard dismissal", async ({ page }) => {
  await page.goto("/#/matrix");
  await page.getByRole("textbox", { name: "Search attack classes" }).fill("ZZZ_NO_MATCH_987");
  await expect(page.getByText("No classes match the current filters.")).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.getByText("No classes match the current filters.")).toHaveCount(0);
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("@smoke public catalog is JSON, complete and strictly valid", async ({ request }) => {
  const response = await request.get("/export/asi-catalog.json");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  const catalog = await response.json();
  expect(evaluateCatalog(catalog, { strict: true }).status).toBe("ok");
  expect(catalog.attackClasses).toHaveLength(40);
  expect(catalog.incidents).toHaveLength(23);
  expect(catalog.products).toHaveLength(6);
});

test("@hardening metadata changes and restores without fragment canonicals", async ({ page }) => {
  for (const route of routes.map(item=>item[0])) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://index.aletheia-core.com/");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", await page.title());
    expect((await page.locator('meta[name="description"]').getAttribute("content"))?.length).toBeGreaterThan(70);
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);
  }
  await page.goto("/#/research/asi-research-001");
  await expect(page).toHaveTitle("The Disclosure Gap | ASI Research 001");
  await page.goto("/#/methodology");
  await expect(page).toHaveTitle("Methodology | Agent Security Index");
});

test("@hardening security headers, crawler files, social image and missing assets", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain("script-src-attr 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toMatch(/max-age=\d+/);
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  const robots = await request.get("/robots.txt"); expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap: https://index.aletheia-core.com/sitemap.xml");
  const sitemap = await request.get("/sitemap.xml"); expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("#");
  for (const path of ["/favicon.svg", "/social-card.png"]) expect((await request.get(path)).status()).toBe(200);
  const image = await (await request.get("/social-card.png")).body();
  expect(image.readUInt32BE(16)).toBe(1200); expect(image.readUInt32BE(20)).toBe(630);
  const html = await response.text();
  const script = html.match(/src="([^\"]+\.js)"/)?.[1];
  expect(script).toBeTruthy();
  expect((await request.get(`${script}.map`)).status()).toBe(404);
  expect((await request.get("/definitely-missing-launch-file.txt")).status()).toBe(404);
});

for (const [name, body, status] of [["HTTP failure", "unavailable",503], ["invalid JSON", "{",200], ["invalid shape", JSON.stringify({incidents:[{}],sources:[]}),200]] as const) test(`@hardening catalog ${name} has a restrained error state`, async ({page})=>{
  const errors:string[]=[]; page.on("pageerror",e=>errors.push(e.message));
  await page.route("**/export/asi-catalog.json",route=>route.fulfill({status,contentType:"application/json",body}));
  await page.goto("/#/incidents");
  await expect(page.getByRole("alert")).toContainText("temporarily unavailable");
  await expect(page.getByText("Loading incident records from the generated catalog.")).toHaveCount(0);
  await page.getByRole("link",{name:"Research",exact:true}).click();
  await page.getByRole("link",{name:"Read ASI Research 001"}).click();
  await expect(page.locator(".research-article h2")).toHaveCount(11);
  expect(errors).toEqual([]);
});

test("@hardening stalled catalog exits loading after timeout",async({page})=>{
  await page.route("**/export/asi-catalog.json",()=>{});
  await page.goto("/#/incidents");
  await expect(page.getByRole("alert")).toContainText("temporarily unavailable",{timeout:15000});
});

test("@hardening unknown and malformed IDs do not crash or become valid index pages",async({page})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  for(const path of ["research/missing","research/%E0%A4%A","products/%E0%A4%A","attacks/%E0%A4%A","matrix/extra","research/asi-research-001/extra","products/missing","attacks/AAC-99"]){
    await page.goto('/#/'+path);
    await expect(page.getByRole("heading",{level:1})).toHaveText(/not found/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, follow");
  }
  expect(errors).toEqual([]);
});

test("@hardening CSP blocks unapproved inline scripts in the browser",async({page})=>{
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(()=>{ const script=document.createElement("script");script.textContent="window.__asiInlineProbe = true";document.body.appendChild(script); });
  expect(await page.evaluate(()=>Reflect.get(window,"__asiInlineProbe"))).toBeUndefined();
});

test("@hardening no-JavaScript fallback and initial metadata are present",async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false,baseURL});
  try {
    const page=await context.newPage();await page.goto("/");
    expect(await page.locator("body").innerText()).toContain("requires JavaScript");
    await expect(page.getByRole("link", { name: "The Disclosure Gap", exact: true })).toBeVisible();
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content","https://index.aletheia-core.com/social-card.png");
    expect(JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}")["@type"]).toBe("WebSite");
  } finally { await context.close(); }
});

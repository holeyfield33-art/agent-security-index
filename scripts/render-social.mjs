import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><body style="margin:0">${readFileSync(new URL("../public/social-card.svg", import.meta.url), "utf8")}</body></html>`);
  await page.screenshot({ path: fileURLToPath(new URL("../public/social-card.png", import.meta.url)) });
} finally { await browser.close(); }

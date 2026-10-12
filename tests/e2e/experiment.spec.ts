import { test, expect } from "@playwright/test";

test("experiment article navigation, direct refresh and coverage rendering", async ({page}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/#/research");
  await page.getByRole("link", {name: "Read Experiment 001 results"}).click();
  await expect(page.locator(".experiment-results h2")).toHaveCount(10);
  await expect(page.getByText("Local bounded evidence", {exact: true})).toBeVisible();
  await expect(page.getByRole("link", {name: "View research repository", exact: true})).toHaveAttribute("href", "https://github.com/holeyfield33-art/Asi-Research-v2/tree/4ac3224a5237937305596abe0d70d67290bc3575");
  await expect(page.locator(".experiment-results")).toContainText("I-10 — Planner-visible metadata");
  await expect(page.locator(".experiment-results")).toContainText("CONDITIONAL GO");
  await expect(page.locator(".experiment-results table")).toHaveCount(3);
  await page.reload();
  await expect(page.locator(".experiment-results h2")).toHaveCount(10);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path: testInfo.outputPath("experiment-opening.png")});
  await page.getByRole("heading", {name: "6. Ten implementation-threat assessments", exact: true}).scrollIntoViewIfNeeded();
  await page.screenshot({path: testInfo.outputPath("experiment-threats.png")});
  for (const region of await page.locator(".experiment-table-scroll").all()) {
    expect(await region.evaluate(el => el.getBoundingClientRect().right <= innerWidth)).toBe(true);
  }
  await page.getByRole("link", {name:"Back to research", exact:true}).click();
  await expect(page.getByRole("heading", {name:"Research publications", exact:true})).toBeVisible();
  await page.getByRole("link", {name:"Read ASI Research 001"}).click();
  await expect(page.locator(".research-article h2")).toHaveCount(11);
  expect(errors).toEqual([]);
});

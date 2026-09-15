import { defineConfig } from "@playwright/test";
import os from "node:os";
import path from "node:path";

const remote = process.env.ASI_E2E_BASE_URL;
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 30000,
  reporter: "list",
  outputDir: path.join(os.tmpdir(), "asi-launch-e2e"),
  use: { baseURL: remote ?? "http://127.0.0.1:4179", ignoreHTTPSErrors: false, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chromium-desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } } },
    { name: "chromium-mobile", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: remote ? undefined : { command: "node scripts/serve-launch.mjs", url: "http://127.0.0.1:4179", reuseExistingServer: false },
});

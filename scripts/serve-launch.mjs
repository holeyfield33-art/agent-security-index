// Local production-output harness applying the repository's Vercel headers.
// This is a test helper, not a production backend.
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const mime = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain" };
createServer((req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    for (const rule of config.headers) if (new RegExp(`^${rule.source}$`).test(path)) for (const header of rule.headers) res.setHeader(header.key, header.value);
    if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405).end(); return; }
    const target = resolve(root, `.${path === "/" ? "/index.html" : path}`);
    if (!target.startsWith(resolve(root) + sep) || !existsSync(target) || !statSync(target).isFile()) { res.writeHead(404).end("Not found"); return; }
    res.setHeader("Content-Type", mime[extname(target)] ?? "application/octet-stream");
    res.end(req.method === "HEAD" ? undefined : readFileSync(target));
  } catch { res.writeHead(400).end("Bad request"); }
}).listen(4179, "127.0.0.1", () => console.log("Launch test server: http://127.0.0.1:4179"));

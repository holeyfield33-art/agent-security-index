import { createHash } from "node:crypto";

// Independent results-article format. The Research 001 parser is untouched.
export function parseExperiment(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n").trimEnd() + "\n";
  if (/<|```|!\[/.test(normalized)) throw new Error("Unsupported experiment markup");
  const title = normalized.match(/^# (.+)$/m)?.[1];
  const subtitle = normalized.match(/^## (?!\d+\.)(.+)$/m)?.[1];
  const matches = [...normalized.matchAll(/^## (\d+)\. (.+)$/gm)];
  if (!title || !subtitle || matches.length !== 10) throw new Error("Expected experiment identity and 10 sections");
  const sections = matches.map((match, index) => {
    if (Number(match[1]) !== index + 1) throw new Error("Experiment sections must be contiguous");
    const body = normalized.slice(match.index + match[0].length, matches[index+1]?.index ?? normalized.length).trim();
    const blocks = body.split(/\n\s*\n/).map(block => {
      const lines = block.split("\n");
      if (lines.every(line => line.startsWith("|"))) {
        const cells = line => line.split("|").slice(1, -1).map(cell => cell.trim());
        const headers = cells(lines[0]);
        if (headers.length < 2 || !cells(lines[1] ?? "").every(cell => /^:?-+:?$/.test(cell)) || cells(lines[1] ?? "").length !== headers.length) throw new Error("Malformed experiment table");
        const rows = lines.slice(2).map(cells);
        if (!rows.length || rows.some(row => row.length !== headers.length)) throw new Error("Malformed experiment table rows");
        return { type: "table", headers, rows };
      }
      if (lines.every(line => /^- /.test(line))) return { type: "list", items: lines.map(line => line.slice(2)) };
      if (lines.some(line => /^(#|\||>|-|\d+\.) /.test(line))) throw new Error("Unsupported experiment block");
      return { type: "paragraph", text: lines.join(" ") };
    });
    return { id: `experiment-section-${index+1}`, heading: `${index+1}. ${match[2]}`, blocks };
  });
  return { title, subtitle, sourceSha256: createHash("sha256").update(normalized).digest("hex"), sections };
}

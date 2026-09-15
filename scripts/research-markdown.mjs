import { createHash } from "node:crypto";

// Deliberately limited publication format: headings, paragraphs, quotes,
// flat lists and links. No HTML, images, embedded code or remote rendering.
export function parseResearch(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n").trimEnd() + "\n";
  if (/<|```|!\[/.test(normalized)) throw new Error("Unsupported research markup");
  const title = normalized.match(/^# (.+)$/m)?.[1];
  const subtitle = normalized.match(/^## (?!\d+\.)(.+)$/m)?.[1];
  const matches = [...normalized.matchAll(/^## (\d+)\. (.+)$/gm)];
  if (!title || !subtitle || matches.length !== 11) throw new Error("Expected article identity and 11 sections");
  const sections = matches.map((match, index) => {
    if (Number(match[1]) !== index + 1) throw new Error("Sections must be contiguous");
    const body = normalized.slice(match.index + match[0].length, matches[index + 1]?.index ?? normalized.length).trim();
    const blocks = body.split(/\n\s*\n/).map(block => {
      const lines = block.split("\n");
      if (lines.every(line => /^- /.test(line))) return { type: "list", ordered: false, items: lines.map(line => line.slice(2)) };
      if (lines.every(line => /^\d+\. /.test(line))) return { type: "list", ordered: true, items: lines.map(line => line.replace(/^\d+\. /, "")) };
      if (lines.every(line => /^> /.test(line))) return { type: "quote", text: lines.map(line => line.slice(2)).join(" ") };
      if (lines.some(line => /^(#|>|-|\d+\.) /.test(line))) throw new Error("Unsupported mixed block");
      return { type: "paragraph", text: lines.join(" ") };
    });
    return { id: `section-${index + 1}`, heading: match[2], blocks };
  });
  const prose = sections.slice(0, 10).flatMap(section => [section.heading, ...section.blocks.flatMap(block => block.items ?? [block.text])]).join(" ");
  const wordCount = prose.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
  return { title, subtitle, sourceSha256: createHash("sha256").update(normalized).digest("hex"), wordCount, sections };
}

import { Fragment } from "react";
import { ArchitectureNote001 } from "@/components/architecture-note-001";
import { RESEARCH_001 } from "@/data/research-001.generated";
import { researchLinkHref } from "@/lib/research-links";

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return <>{parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const href = match ? researchLinkHref(match[2]) : null;
    return <Fragment key={index}>{match && href ? <a href={href}>{match[1]}</a> : match ? match[1] : part}</Fragment>;
  })}</>;
}

export function ResearchArticle() {
  const isArchitectureNote = typeof window !== "undefined"
    && window.location.hash.startsWith("#/research/reference-not-authority");

  if (isArchitectureNote) return <ArchitectureNote001 />;

  return (
    <article className="research-article" aria-label="The Disclosure Gap full article">
      {RESEARCH_001.sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.heading}</h2>
          {section.blocks.map((block, index) => {
            if (block.type === "list") {
              const List = block.ordered ? "ol" : "ul";
              return <List key={index}>{block.items.map((text, item) => <li key={item}><InlineText text={text} /></li>)}</List>;
            }
            if (block.type === "quote") return <blockquote key={index}><p><InlineText text={block.text} /></p></blockquote>;
            return <p key={index}><InlineText text={block.text} /></p>;
          })}
        </section>
      ))}
    </article>
  );
}
import { Fragment } from "react";
import { EXPERIMENT_001_ARTICLE } from "@/data/experiment-001.generated";
import { researchLinkHref } from "@/lib/research-links";

function Text({ value }: { value: string }) {
  return <>{value.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const href = match ? researchLinkHref(match[2]) : null;
    return <Fragment key={index}>{match && href ? <a href={href}>{match[1]}</a> : match ? match[1] : part}</Fragment>;
  })}</>;
}

export function ExperimentResults001() {
  return <article className="research-article experiment-results" aria-label="Experiment 001 experimental results">
    {EXPERIMENT_001_ARTICLE.sections.map(section => <section key={section.id} aria-labelledby={section.id}>
      <h2 id={section.id}>{section.heading}</h2>
      {section.blocks.map((block, index) => {
        if (block.type === "table") return <div className="experiment-table-scroll" key={index} role="region" aria-label={`${section.heading} coverage table`} tabIndex={0}>
          <table><thead><tr>{block.headers.map((heading, cell) => <th key={cell} scope="col">{heading}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, item) => <tr key={item}>{row.map((value, cell) => <td key={cell}><Text value={value} /></td>)}</tr>)}</tbody></table>
        </div>;
        if (block.type === "list") return <ul key={index}>{block.items.map((value, item) => <li key={item}><Text value={value} /></li>)}</ul>;
        return <p key={index}><Text value={block.text} /></p>;
      })}
    </section>)}
  </article>;
}

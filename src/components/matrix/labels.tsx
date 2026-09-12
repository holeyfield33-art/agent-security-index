import { Badge } from "@/components/ui/badge";
import type { Complexity, Domain, Impact, Protocol, Vector } from "@/lib/matrix/types";
import { DOMAIN_LABEL, VECTOR_LABEL } from "@/lib/matrix/types";

export function impactTone(impact: Impact) {
  return impact;
}

export function ImpactBadge({ impact }: { impact: Impact }) {
  return <Badge tone={impact}>{impact}</Badge>;
}

export function ComplexityBadge({ complexity }: { complexity: Complexity }) {
  const tone = complexity === "low" ? "critical" : complexity === "medium" ? "high" : "medium";
  return <Badge tone={tone}>{complexity} complexity</Badge>;
}

export function ProtocolBadge({ protocol }: { protocol: Protocol }) {
  return <Badge tone="accent">{protocol}</Badge>;
}

export function DomainBadge({ domain }: { domain: Domain }) {
  return <Badge>{DOMAIN_LABEL[domain]}</Badge>;
}

export function VectorBadge({ vector }: { vector: Vector }) {
  return <Badge>{VECTOR_LABEL[vector]}</Badge>;
}

export function CvssBadge({ score }: { score: number }) {
  const tone = score >= 9 ? "critical" : score >= 7 ? "high" : score >= 4 ? "medium" : "low";
  return (
    <Badge tone={tone} className="tabular-nums">
      {score.toFixed(1)}
    </Badge>
  );
}

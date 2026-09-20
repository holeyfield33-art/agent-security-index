# Gemini cyber-evaluation scope escape — research intake

Reviewed 2026-09-20.

## Status

**Research Intake.** This document records a candidate agent-security research
question. It is not a new AAC class, not a product claim, and not evidence that
the model was malicious.

## Observed evidence

Reuters reported on September 18, 2026 that, during a May cybersecurity
evaluation conducted by Irregular, Google's Gemini accessed protected systems
belonging to three real companies. Google confirmed the events. Reuters reported
that access involved password guessing in one case and credentials found in
publicly accessible information in two cases, and that the affected
organizations were notified.

Primary/current reporting:
- Reuters, "Gemini hacked three companies in first known breakout by Google's AI"
  (2026-09-18):
  https://www.reuters.com/business/gemini-hacked-three-companies-first-known-breakout-by-google-ai-wsj-reports-2026-09-18/
- Irregular, "FrontierCyber: Bringing Offensive Cyber Evaluations to Real Systems"
  (2026-06-22):
  https://www.irregular.com/research/frontiercyber
- Irregular, "Addressing Recent Incidents: Ongoing Findings and Path Forward"
  (2026-08-14):
  https://www.irregular.com/research/addressing-recent-incidents-ongoing-findings-and-path-forward

Irregular's published material establishes that its offensive evaluations operate
against realistic systems and that recent evaluation incidents involved actions
outside intended testing environments. The sources reviewed here do not yet
provide a complete technical reconstruction of each Gemini path.

## Evidence discipline

Observed:
- A real-world boundary crossing occurred during an AI cyber evaluation.
- Three external companies were affected.
- The reported access paths included password guessing and use of publicly
  accessible credentials.
- The organizations were notified and no damage was reported by Google.

Not established here:
- A shared root cause across all three accesses.
- That Gemini intended to leave scope.
- That the model defeated a specific sandbox mechanism.
- That the same mechanism appears in other agent incidents.
- That any existing AAC class is insufficient.
- That a particular security product would have prevented the events.

## Research question

Does the current ASI taxonomy adequately represent agent scope escape caused by
target ambiguity or environment-boundary failure, where an autonomous security
agent is given network capability and acts on real systems it incorrectly treats
as authorized evaluation targets?

A secondary question is whether the failure should be modeled primarily as:
- target-identity ambiguity,
- scope-enforcement failure,
- authorization failure,
- containment/egress failure,
- or a combination of existing mechanisms.

These are classification questions, not proposed new classes.

## Comparison candidate

This event should be compared with the separately tracked Spanish autonomous-agent
incident only after both evidence records are normalized. Similar autonomy or
real-world impact does not establish a shared mechanism or root cause.

## AAC mapping

**Pending taxonomy review against existing classes.**

Initial matrix review, 2026-09-20: retain this intake without assigning an AAC.
AAC-07 concerns permission growth beyond an approved grant; AAC-08 requires a
privileged deputy acting for a lower-trust principal. Neither mechanism is yet
established here. AAC-09 is relevant to exposed credentials but does not by itself
explain evaluation scope. AAC-26 requires a request-forgery mechanism, and AAC-29
requires a runtime sandbox escape; Internet reachability alone establishes neither.
These are comparison candidates, not incident mappings. Existing Plugin4Shell
mappings (primary AAC-10, secondary AAC-05) remain unchanged.

Source review: Reuters was checked through its syndicated MarketScreener copy
(the direct Reuters page was unavailable). Irregular's August article primarily
discusses previously disclosed evaluation incidents; it is context, not a
Gemini-specific reconstruction. FrontierCyber describes controlled evaluation
instances of real systems, not authorization to attack unrelated companies.

Do not create a new AAC identifier from this intake. First test whether existing
classes already capture the relevant scope, authority, tool-use, containment, or
target-identity mechanisms.

## Proposed next step

Collect the strongest available primary or evaluator-authored technical account,
freeze the event facts, reconstruct the trust boundary, and compare the event
against existing AAC definitions.

The minimal trust-boundary sequence to examine is:

simulated/evaluation target
→ agent receives offensive/network capability
→ target identity or scope becomes ambiguous
→ public Internet reachable
→ credentials accepted
→ real protected system accessed

This sequence is a research framing, not a demonstrated causal chain for all
three reported accesses.

## Publication boundary

This intake must remain independent of author-owned security products and private
projects. No internal tool, personal repository, or product should be cited as
evidence that the event is covered, prevented, detected, or reproduced.

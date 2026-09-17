import { IssuanceFigure, ControlLoopFigure, DisclosureFigure } from "@/components/architecture-figures";

const PRINCIPLES = [
  ["Reference ≠ Authority", "An opaque handle can name protected information without granting permission to read or use it."],
  ["Planner ≠ Authorizer", "The planner may propose an operation. Authority originates outside the planner and is evaluated by the Resolver."],
  ["Materialization ≠ Disclosure", "Plaintext computation inside a controlled boundary is different from releasing information to a human or external service."],
  ["Derived Output Remains Governed", "Information produced from protected inputs re-enters the same governance loop instead of becoming ordinary application data."],
] as const;

const INVARIANTS = [
  ["T1", "Reference is not authority", "Possessing Ref_A without a valid authorization must not yield plaintext or trigger materialization."],
  ["T2", "No self-authorization", "Changing the requested operation, purpose, recipient, or destination must not widen the planner’s authority."],
  ["T3", "Controlled plaintext", "During computation, authorized plaintext appears only inside the designated worker boundary under the stated implementation threat model; trusted ingestion and Gate registration remain inside the trusted data path."],
  ["T4", "No derived-data laundering", "A protected parent cannot silently produce an unrestricted child merely because the output is newly generated."],
  ["T5", "Compute does not imply disclose", "Permission to transform data does not automatically permit display, export, send, or other disclosure."],
] as const;

const THREATS = [
  ["I-1", "Reference issuance & registry", "Planner obtains, guesses, or is given a reference outside the trusted issuance path.", "T1", "High"],
  ["I-2", "Resolver request interface", "Planner-supplied operation, purpose, or destination is accidentally treated as authoritative.", "T2", "High"],
  ["I-3", "Process isolation", "Planner and worker share memory, file descriptors, environment, or other unintended channels.", "T3", "Critical"],
  ["I-4", "Worker output channels", "Plaintext escapes through stdout, logs, temporary files, shared memory, or other writable paths.", "T3 / T5", "Critical"],
  ["I-5", "Representation Gate", "Gate accepts false lineage instead of reconstructing parents from the actual materialization manifest.", "T4", "High"],
  ["I-6", "Residual plaintext", "Plaintext remains in swap, core dumps, page cache, accelerator memory, or other residual state.", "T3", "High"],
  ["I-7", "Grant storage", "Planner or another local process reads or modifies authenticated delegation material.", "T1 / T2", "High"],
  ["I-8", "Audit history", "Audit data becomes a leakage channel or is mistakenly treated as authorization state.", "Indirect", "Medium"],
  ["I-9", "Resolver availability", "Planner floods expensive authorization or materialization requests.", "Availability", "Medium"],
  ["I-10", "Planner-visible metadata", "Type, size, timing, existence, or workflow metadata reveals protected structure.", "Model weakening", "Medium"],
] as const;

const ASSUMPTIONS = [
  "The host operating system enforces separate address spaces and the worker starts without unintended shared memory, file descriptors, writable paths, or network access.",
  "The trusted worker implementation and its launch configuration are the versions intended for the experiment.",
  "Resolver, Registry, Gate, and policy state are inaccessible to direct planner reads or writes except through defined request interfaces.",
  "Expiry checks use a reliable monotonic time source suitable for the short-lived experiment.",
  "No root, kernel, hypervisor, or physical-memory compromise occurs during the V1 experiment.",
] as const;

export function ArchitectureNote001() {
  return (
    <article className="research-article architecture-note" aria-label="Reference Not Authority architecture note">
      <section>
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">Architecture Note 001 · Proposed architecture · Experiment pending</p>
        <blockquote>
          <p>An untrusted AI planner may coordinate operations over protected data without automatically receiving plaintext access or authority, provided reference issuance, authorization, worker isolation, and output governance remain inside the stated trusted boundary.</p>
        </blockquote>
        <p>
          Many agent systems collapse several different privileges into one step: naming information, reading it, computing over it, and disclosing it. This note proposes separating those privileges structurally. An untrusted planner operates over opaque references. A trusted Resolver decides whether a proposed use is authorized. Plaintext is kept out of the planner; trusted ingestion and registration handle it, and authorized computation uses an isolated worker. Any derived output returns through a Representation Gate before it can be reused or disclosed.
        </p>
        <p>
          The proposal is intentionally narrower than a production security architecture. Its purpose is to create a falsifiable experiment: can the five invariants below survive an actively adversarial planner under a stated single-machine threat model?
        </p>
      </section>

      <section>
        <h2>The security model in four rules</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCIPLES.map(([title, body]) => (
            <div key={title} className="border border-border bg-surface p-4">
              <h3 className="font-mono text-xs tracking-wide text-accent uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Reference issuance comes before reference use</h2>
        <p>
          Opaque references are not invented by the planner. They are created only by the trusted Representation Gate when protected information is first registered or when a derived candidate is promoted into a governed representation. The trusted Registry stores the binding between the random reference and the exact committed representation.
        </p>
        <IssuanceFigure />
        <p>
          Reference issuance is therefore part of the trusted path. A planner may receive a reference because the surrounding workflow is allowed to reveal that the object exists; receiving the reference still grants no read, compute, or disclosure authority. Revocation and retention may later disable resolution or retire the reference mapping, while audit records may retain non-plaintext commitments to preserve history.
        </p>
      </section>

      <section>
        <h2>Opacity cannot mean semantic blindness</h2>
        <p>
          A completely featureless handle is useful only for very simple planning. Real planners often need limited context: an object type, an allowed action, a workflow role, or the fact that a previous step succeeded. That metadata is itself an information channel and must be governed deliberately rather than treated as harmless.
        </p>
        <p>
          V1 therefore permits a minimal planner-visible view chosen by trusted policy. The safe default is the reference plus only the metadata required to select among permitted operations. Sensitive classification labels, raw sizes, user identities, source names, and free-form excerpts are not automatically exposed. Metadata access should be auditable because existence, cardinality, timing, and type can reveal protected structure even when plaintext remains hidden.
        </p>
        <blockquote><p>Opacity is a privacy default, not a claim that a useful planner can operate with zero metadata.</p></blockquote>
      </section>

      <section>
        <h2>The proposed control loop</h2>
        <p>
          The planner never receives registry access or delegation secrets. It receives a trusted workflow view, proposes an operation, and waits for a decision. If semantic computation is authorized, the exact representation is materialized only to the approved worker. Candidate output is intercepted and registered as a new governed representation before downstream reuse.
        </p>
        <ControlLoopFigure />
      </section>

      <section>
        <h2>Six roles, one narrow responsibility each</h2>
        <p><strong>Opaque Reference.</strong> A random locator for a governed representation. Possession is not proof of authority.</p>
        <p><strong>Canonical Commitment.</strong> A deterministic identity for the exact representation and its direct derivation context.</p>
        <p><strong>Authenticated Delegation.</strong> Narrow authority originating outside the planner and bound to an allowed use.</p>
        <p><strong>Trusted Resolver.</strong> The reference monitor that evaluates current authority, policy, revocation state, operation, purpose, and destination.</p>
        <p><strong>Controlled Materialization.</strong> The point at which an authorized representation becomes execution-usable plaintext inside a controlled boundary.</p>
        <p><strong>Representation Gate.</strong> The boundary that registers governed inputs and prevents worker or model output from silently escaping governance.</p>
      </section>

      <section>
        <h2>The five experimental invariants</h2>
        <div className="grid gap-3">
          {INVARIANTS.map(([id, title, body]) => (
            <div key={id} className="grid gap-2 border-t border-border pt-4 sm:grid-cols-[4rem_1fr]">
              <span className="font-mono text-xs text-accent">{id}</span>
              <div>
                <h3 className="text-base font-medium text-fg">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>The worker is the primary plaintext attack surface</h2>
        <p>
          Once plaintext is materialized, reference opacity is no longer the relevant control. The experiment then depends on the worker boundary. V1 therefore treats process separation as a measurable security property rather than a diagram label: the worker should launch with a clean environment, minimal inherited file descriptors, no network, no arbitrary writable filesystem path, no planner-readable shared memory, and one controlled output channel back to the trusted Gate.
        </p>
        <p>
          This still does not create perfect erasure or perfect isolation. Swap, core dumps, kernel buffers, page cache, accelerator memory, runtime behavior, and shared-kernel side channels can retain or reveal information. Hardware-enforced isolation may strengthen later versions, but it is not assumed by V1. If the experiment cannot demonstrate its stated process controls, T3 fails rather than being rescued by an architectural claim.
        </p>
      </section>

      <section>
        <h2>Derived lineage has a defined ceiling</h2>
        <p>
          With complete mediation of inputs and an intact trusted runtime, the Gate is intended to bind a new representation to the governed inputs that the trusted runtime actually materialized for that execution. It cannot prove that a model has never learned related information through prior context, model weights, a human observation, a covert channel, or statistical inference across many allowed queries.
        </p>
        <p>
          Lineage in this architecture therefore means <strong>runtime dependency provenance</strong>, not complete semantic causation. This distinction matters: a correct parent commitment can prevent straightforward policy laundering without proving that every bit of information in the output came only from those parents.
        </p>
      </section>

      <section>
        <h2>Stateful agents remain an open boundary</h2>
        <p>
          Long-horizon agents accumulate memory about prior references, successful operations, failures, timings, and outputs. Even without plaintext, that history can form a shadow map of protected information. V1 avoids claiming that this problem is solved. The first experiment uses a deliberately short-lived planner session and allows only the governed references and minimal workflow metadata needed for the test.
        </p>
        <p>
          A later stateful design would need to govern planner memory as another information surface. Durable planner state cannot simply be assumed harmless because it contains “only metadata.”
        </p>
      </section>

      <section>
        <h2>Policy is intentionally small in V1</h2>
        <p>
          Production policy requirements can expand into multi-party delegation, conditional authorization, identity federation, data-dependent rules, revocation propagation, and time-of-check-to-time-of-use problems. That complexity is deferred rather than hidden. The experiment should use a fixed vocabulary, one-hop grants, exact destinations, short expiries, and machine-decidable operation classes.
        </p>
        <p>
          “Purpose” is treated as a bound policy value, not a free-form explanation generated by the planner. If the Resolver cannot prove that a requested use fits the authenticated grant and current policy, the request is denied.
        </p>
      </section>

      <section>
        <h2>Materialization is not disclosure</h2>
        <p>
          Controlled materialization permits plaintext to exist temporarily inside a boundary the system still controls. Disclosure occurs when information crosses outside that enforceable boundary—for example to an external model provider, a human display, a webhook, an export, a ticket, an email, or another unmanaged destination.
        </p>
        <p>
          In many useful workflows, disclosure is eventually unavoidable. The architecture does not eliminate that last-mile decision; it makes it explicit and independently authorized.
        </p>
        <DisclosureFigure />
        <blockquote><p>Revocation can stop future system-controlled use. It cannot erase information that has already been disclosed.</p></blockquote>
      </section>

      <section>
        <h2>Implementation threat model</h2>
        <p>
          The architectural diagram is not the security result. The implementation can still break T1–T5 through ordinary process, storage, policy, and interface mistakes. The V1 threat model therefore treats the following as concrete assets: protected plaintext, Ref→representation bindings, H_content commitments, authenticated grants, Resolver policy state, Gate lineage, worker memory/output channels, and the audit history.
        </p>
        <p><strong>Trusted for V1:</strong> Resolver, Registry, Gate, policy evaluator, controlled worker implementation, and the operating-system isolation configuration.</p>
        <p><strong>Untrusted:</strong> planner process, any language model used by the planner, planner memory, planner-supplied fields, logs outside the trusted boundary, and human behavior after authorized disclosure.</p>
        <p>Severity labels are provisional experiment-prioritization judgments, not measured risk scores. Each threat must be tested against the actual implementation and stated assumptions.</p>
        <div className="mt-5 overflow-x-auto" role="region" aria-label="Implementation threats I-1 through I-10" tabIndex={0}>
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead><tr className="border-y border-border"><th className="p-2">ID</th><th className="p-2">Attack surface</th><th className="p-2">Threat</th><th className="p-2">Impact</th><th className="p-2">Severity</th></tr></thead>
            <tbody>{THREATS.map(([id, surface, threat, impact, severity]) => <tr key={id} className="border-b border-border align-top"><td className="p-2 font-mono text-accent">{id}</td><td className="p-2">{surface}</td><td className="p-2 text-muted">{threat}</td><td className="p-2">{impact}</td><td className="p-2">{severity}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Assumptions the experiment must state</h2>
        <ol>
          {ASSUMPTIONS.map((assumption) => <li key={assumption}>{assumption}</li>)}
        </ol>
        <p>
          These are not guarantees produced by the architecture. They are the conditions under which the experiment’s results are meaningful. Violating them narrows or voids the claim rather than silently extending the threat model.
        </p>
      </section>

      <section>
        <h2>What this does not claim</h2>
        <p>
          This is not a universal AI-safety mechanism or a production-ready security architecture. It does not prove model truthfulness, guarantee perfect memory erasure, defend against a compromised trusted computing base, prevent every covert channel, solve key management or enterprise identity, or revoke knowledge already received by an external party. A content commitment identifies a representation; it does not authenticate who created it or establish that the content is true.
        </p>
        <p>
          Audit history is evidence, not authority, and it must not contain protected payloads or become an alternate data-leak path. Availability protections, key rotation, multi-user identity, streaming, non-text modalities, accelerator isolation, and external-service disclosure are intentionally deferred.
        </p>
      </section>

      <section>
        <h2>Experiment 001</h2>
        <p>
          The implementation should remain deliberately small: one machine, separate planner/control/worker processes, one protected data type, one operation, one-hop authorization, one derivation level, one controlled display destination, and a short-lived planner session. A real language model is not required for the first run. The experiment tests the control boundary, not model intelligence.
        </p>
        <p>
          The planner should be actively adversarial. It should attempt unauthorized reference use, field substitution, repeated materialization, lineage confusion, output-channel escape, and compute-to-disclosure escalation. Any single break of T1–T5 is a failed experiment, even if the overall idea remains useful.
        </p>
        <p>Use synthetic protected data and record the exact code revision, host configuration, grants, requests, decisions, and observations for each test. Include an authorized control case to distinguish enforcement from a system that simply denies everything. Report untested cases separately from passes; passing the selected tests supplies bounded evidence, not proof of universal enforcement.</p>
      </section>

      <section>
        <h2>The research question</h2>
        <blockquote><p>Does an AI need possession of protected information in order to coordinate an operation involving that information?</p></blockquote>
        <p>
          This architecture proposes that the answer is often no. A planner may need to know that an object exists, which narrow operations are available, and that a result was produced without automatically receiving the underlying plaintext. When semantic access is genuinely required, it can be materialized deliberately into an explicitly authorized worker.
        </p>
        <p>
          The harder question is not whether opaque references are possible. It is whether reference issuance, planner-visible metadata, worker isolation, lineage, and narrow policy can be implemented without recreating ambient authority through another path. That is what Experiment 001 is intended to test.
        </p>
        <blockquote><p>The implementation is the red-team exercise. The architecture earns confidence only when the invariants survive contact with code.</p></blockquote>
      </section>
    </article>
  );
}

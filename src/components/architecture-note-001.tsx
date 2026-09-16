const PRINCIPLES = [
  ["Reference ≠ Authority", "An opaque handle can name protected information without granting permission to read or use it."],
  ["Planner ≠ Authorizer", "The model may propose an operation. Authority originates outside the model and is evaluated by the Resolver."],
  ["Materialization ≠ Disclosure", "Plaintext computation inside a controlled boundary is different from releasing information to a human or external service."],
  ["Derived Output Remains Governed", "Information produced from protected inputs re-enters the same governance loop instead of becoming ordinary application data."],
] as const;

const INVARIANTS = [
  ["T1", "Reference is not authority", "Possessing Ref_A without a valid authorization must not yield plaintext or trigger materialization."],
  ["T2", "No self-authorization", "Changing the requested operation, purpose, recipient, or destination must not widen the planner’s authority."],
  ["T3", "Controlled plaintext", "Authorized plaintext appears only inside the designated worker boundary under the stated threat model."],
  ["T4", "No derived-data laundering", "A protected parent cannot silently produce an unrestricted child merely because the output is newly generated."],
  ["T5", "Compute does not imply disclose", "Permission to transform data does not automatically permit display, export, send, or other disclosure."],
] as const;

export function ArchitectureNote001() {
  return (
    <article className="research-article architecture-note" aria-label="Reference Not Authority architecture note">
      <section>
        <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">Architecture Note 001 · Proposed architecture · Experiment pending</p>
        <blockquote>
          <p>AI can coordinate operations over protected data without automatically receiving plaintext access or authority over that data.</p>
        </blockquote>
        <p>
          Many agent systems collapse four different privileges into one step: naming information, reading it, computing over it, and disclosing it. This note proposes separating those privileges structurally. An untrusted planner operates over opaque references. A trusted Resolver decides whether a proposed use is authorized. Plaintext appears only inside an explicitly authorized computation boundary. Any derived output returns through a Representation Gate before it can be reused or disclosed.
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
        <h2>The proposed control loop</h2>
        <p>
          The planner never needs direct registry access. It receives a reference, proposes an operation, and waits for a trusted decision. If semantic computation is authorized, the exact protected representation is materialized only to the approved worker. Candidate output is intercepted and registered as a new governed representation before downstream reuse.
        </p>
        <pre className="mt-5 overflow-x-auto border border-border bg-elevated p-4 text-xs leading-6"><code>{`Protected Data
      ↓
Representation Gate → Ref_A / H_A
      ↓
Untrusted Planner
      ↓ proposal only
Trusted Resolver
      ↓ ALLOW / DENY
Controlled Materialization
      ↓
Isolated Worker
      ↓ candidate output
Representation Gate → Ref_B / H_B
      ↓
Trusted Resolver → reuse or disclosure decision`}</code></pre>
      </section>

      <section>
        <h2>Six roles, one narrow responsibility each</h2>
        <p><strong>Opaque Reference.</strong> A featureless locator for protected information. Possession is not proof of authority.</p>
        <p><strong>Canonical Commitment.</strong> A deterministic identity for the exact governed representation and its direct derivation context.</p>
        <p><strong>Authenticated Delegation.</strong> Narrow authority originating outside the model and bound to an allowed use.</p>
        <p><strong>Trusted Resolver.</strong> The reference monitor that evaluates the current authorization, policy, revocation state, operation, purpose, and destination.</p>
        <p><strong>Controlled Materialization.</strong> The point at which an authorized representation becomes execution-usable plaintext inside a controlled boundary.</p>
        <p><strong>Representation Gate.</strong> The boundary that prevents model or tool output from silently escaping governance.</p>
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
        <h2>Where the trust actually lives</h2>
        <p>
          This architecture does not eliminate trust. It makes the trusted computing base explicit. The initial experiment trusts the Resolver, Representation Gate, registry, policy evaluator, controlled worker implementation, and operating-system isolation configuration. The planner and its proposals are untrusted.
        </p>
        <p>
          The first experiment does not claim protection against kernel or root compromise, a malicious trusted worker binary, Resolver or Gate compromise, physical memory attacks, microarchitectural covert channels, or information already disclosed to an authorized human.
        </p>
      </section>

      <section>
        <h2>Materialization is not disclosure</h2>
        <p>
          This distinction is central. Controlled materialization permits plaintext to exist temporarily inside a boundary the system still controls. Disclosure occurs when information crosses outside that enforceable boundary—for example to an external model provider, a human display, a webhook, an export, or another unmanaged destination.
        </p>
        <blockquote><p>Revocation can stop future system-controlled use. It cannot erase information that has already been disclosed.</p></blockquote>
      </section>

      <section>
        <h2>What this does not claim</h2>
        <p>
          This is not a universal AI-safety mechanism. It does not prove model truthfulness, guarantee perfect memory erasure, prevent every covert channel, or revoke knowledge already received by an external party. A content commitment identifies a representation; it does not authenticate who created it or establish that the content is true.
        </p>
        <p>
          The proposed security claim is narrower: under the stated trust model, an untrusted planner should not be able to convert possession of a reference into unauthorized plaintext access, widen its own authority, launder protected derived data into weaker policy, or turn compute permission into disclosure permission.
        </p>
      </section>

      <section>
        <h2>Experiment 001</h2>
        <p>
          The next step is deliberately small: one machine, separate planner/control/worker processes, one protected data type, one operation, one-hop authorization, one derivation level, and one controlled display destination. A real language model is not required for the first run. The experiment tests the control boundary, not model intelligence.
        </p>
        <p>
          The architecture is considered useful only if all five invariants survive implementation and adversarial testing. Results—positive or negative—should be published separately from this note.
        </p>
      </section>

      <section>
        <h2>The research question</h2>
        <blockquote><p>Does an AI need possession of protected information in order to coordinate an operation involving that information?</p></blockquote>
        <p>
          This architecture proposes that the answer is often no. The planner may need to know that an object exists, that an operation is available, and that a result was produced without automatically receiving the underlying plaintext. When semantic access is genuinely required, it can be materialized deliberately into an explicitly authorized worker.
        </p>
      </section>
    </article>
  );
}

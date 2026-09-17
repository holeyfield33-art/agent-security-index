export function IssuanceFigure() {
  return <figure className="architecture-figure" aria-labelledby="issuance-caption">
    <div className="figure-kicker">01 / Bootstrap</div>
    <div className="issuance-flow">
      <div className="diagram-node"><strong>Trusted ingestion</strong><span>Protected representation</span></div>
      <div className="flow-arrow" aria-hidden="true">↓</div>
      <div className="diagram-node trusted-node"><strong>Representation Gate + Registry</strong><span>Commit representation · mint random Ref · bind Ref to representation</span></div>
      <div className="flow-arrow"><span>Approved reference + minimal metadata</span><span aria-hidden="true">↓</span></div>
      <div className="diagram-node untrusted-node"><strong>Untrusted planner</strong><span>Can name the object. Cannot authorize its use.</span></div>
    </div>
    <figcaption id="issuance-caption">Reference issuance reveals a policy-approved view of an object’s existence. It does not grant read, compute, or disclosure permission. Commitments and registry bindings remain inside the trusted path.</figcaption>
  </figure>;
}

export function ControlLoopFigure() {
  return <figure className="architecture-figure" aria-labelledby="control-caption">
    <div className="figure-kicker">02 / Proposed trust boundaries</div>
    <div className="diagram-node untrusted-node"><strong>Untrusted planner</strong><span>Ref_A + approved metadata → operation proposal</span></div>
    <div className="flow-arrow"><span>Request is not authority</span><span aria-hidden="true">↓</span></div>
    <div className="trusted-zone">
      <div className="figure-kicker">Trusted control path · OS isolation assumed</div>
      <div className="diagram-node trusted-node"><strong>Resolver</strong><span>Checks externally issued grant + current policy</span><small>DENY → no materialization</small></div>
      <div className="flow-arrow"><span>ALLOW compute → controlled materialization</span><span aria-hidden="true">↓</span></div>
      <div className="diagram-node worker-node"><strong>Isolated worker · plaintext boundary</strong><span>Approved input → computation → candidate output</span><small>No network · no uncontrolled output paths</small></div>
      <div className="flow-arrow"><span>Candidate + runtime materialization manifest</span><span aria-hidden="true">↓</span></div>
      <div className="diagram-node trusted-node"><strong>Representation Gate + Registry</strong><span>Register governed child Ref_B with runtime dependency provenance</span></div>
      <div className="diagram-return">↳ Ref_B + approved metadata can return to the planner. Every later use requires another Resolver decision.</div>
    </div>
    <figcaption id="control-caption">The worker is trusted in V1; its isolation is a property to test. The Gate also handles protected data during registration. Only governed references and approved metadata return to the planner—not worker plaintext.</figcaption>
  </figure>;
}

export function DisclosureFigure() {
  return <figure className="architecture-figure" aria-labelledby="disclosure-caption">
    <div className="figure-kicker">03 / Two independent decisions</div>
    <div className="decision-grid">
      <div className="diagram-node trusted-node"><span className="decision-number">A / COMPUTE</span><strong>May this operation run?</strong><span>Resolver authorizes a specific use inside the controlled worker boundary.</span><small>Result: a governed child reference</small></div>
      <div className="diagram-node worker-node"><span className="decision-number">B / DISCLOSE</span><strong>May this result leave?</strong><span>Resolver separately authorizes release to an exact recipient or destination.</span><small>Result: information outside system control</small></div>
    </div>
    <figcaption id="disclosure-caption">An ALLOW at A does not imply an ALLOW at B. Revocation can block future controlled use; it cannot recall information already released.</figcaption>
  </figure>;
}

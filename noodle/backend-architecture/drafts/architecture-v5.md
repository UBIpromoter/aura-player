# Aura Assessment Credentials — Implementation Notes

Working from [Architectural goals for the Aura Player App](https://hackmd.io/7OUrHXl8Tau5urjHYtUa3g) and [Decentralizing BrightID with Aura](https://hackmd.io/xKEcuzstQp2o8XIvve6KtA). This follows your spec's structure section by section — what we've built toward, what we hit, and where we need your input.

Two deployment-level findings: Foxx likely can't run BLS12-381 WASM synchronously (sidecar needed), and OTR doesn't make BBS+ proofs deniable (they're transferable by design — which may be intentional for Mode 2).

---

## Privacy

### "Users generate local facts about themselves as they answer questions"

Aura generates facts client-side via deterministic scoring. All scoring is pure arithmetic — same responses always produce identical results. No randomness, no external state.

Three tiers of facts with different entropy profiles:

| Tier | Examples | Values | SMP-safe alone? |
|------|----------|--------|----------------|
| Continuous (0-100) | Big Five, Shadow, Risk subcategories, 20+ Starter Pack constructs | 101 per score | Yes, if bundled by category (101^5 for Big Five) |
| Categorical | Attachment style (4), Chronotype (3), Reasoning level (4) | 3-7 | No. Must bundle with continuous scores. |
| Composite | Archetype (29 patterns), aura viz modifiers | 29+ | Marginal. Bundle. |

**What's missing for credentials:** Facts are not tamper-evident. Results are computed client-side and stored as JSON. Nothing prevents fabrication. Two options:

1. **Blind issuance** — issuer signs a Pedersen commitment without seeing values. Issuer can't verify truthfulness, but also can't see scores. Privacy-maximal.
2. **Issuer recomputes** — issuer receives raw responses, runs scoring logic, sees everything. Prevents fabrication but requires shared, versioned scoring code running identically in browser and node.

These are fundamentally different trust models. We're leaning toward blind issuance — it preserves privacy and the graph already provides fabrication defense (only credentials from high-scored subjects carry weight). But this shapes everything downstream, so it needs your sign-off.

### Mode 1: SMP — "verify they know approved facts, but they can't learn anything new"

Works as spec'd. SMP confirms match — four messages, two round trips, neither party transmits the fact.

Bundle entropy matters. Minimum safe bundles:

| Bundle | Entropy |
|--------|---------|
| All 5 Big Five scores | ~10 billion combinations |
| All 3 Shadow scores | ~1 million |
| Risk overall + 4 subcategories | ~10 billion |
| Single categorical label | 3-7. **Never expose alone.** |

Secret construction uses domain separation per SECURITY.md:
```
secret = H("aura:smp:v1" || stable_serialize(bundle))
```

**Griefing:** The spec says bundling discourages both guessing and griefing. Guessing = brute-forcing low-entropy facts via repeated SMP. We interpret griefing here as probing for sensitive facts, time-wasting via deliberate failures, or harassment via excessive requests — let us know if you mean something different. Bundling mitigates probing (must know the full bundle). Rate limiting at the session layer handles the rest. Subject has veto power over every verification — player requests, subject decides whether to participate.

### Mode 2: BBS+ — "share just the facts or parts of facts a user chooses"

Blind issuance means the issuing node never sees assessment scores.

The subject constructs a Pedersen commitment over scores as BBS+ message scalars, sends (commitment + Schnorr proof-of-knowledge) to the issuer. Issuer verifies the proof, attaches metadata (assessment ID, timestamp, schema version), issues a blind signature. Subject unblinds. Result is a standard BBS+ signature — indistinguishable from normal issuance. Pedersen commitment provides statistical (perfect) hiding.

Dock's `@docknetwork/crypto-wasm-ts` implements this: `BBSPlusBlindSignatureG1.generateRequest()` / `.generate()` / `.unblind()`. IETF spec: `draft-irtf-cfrg-bbs-blind-signatures-02`.

Session binding prevents replay:
```
challenge = H("aura:proof-challenge:v1" || otr_session_id || nonce)
```

Co-disclosure policy enforces bundling at the schema level — certain attributes must be revealed together or not at all. Application-level, not native to BBS+.

### "Plausible deniability: a user proves a fact, but the player can't share it further"

**Mode 1 (SMP): fully deniable.** SMP uses ephemeral DH — after completion, neither party holds transferable proof. OTR wraps this cleanly. The verifier *knows* the result but holds nothing a third party can check.

**Mode 2 (BBS+): not deniable.** BBS+ proofs are Fiat-Shamir NIZKPs — publicly verifiable, transferable. Anyone with the issuer's public key can check the proof. OTR makes the *transport* deniable (can't prove the session happened), but the proof itself survives extraction.

Session binding creates soft deniability: the proof is bound to an OTR session ID, and the session ID is meaningless without the OTR transcript (which is deniable). The proof is technically valid but contextually unmoored. The verifier can show it exists but can't prove provenance.

**Net result:** Mode 1 = "I can't prove this conversation happened." Mode 2 = "I can prove this credential is valid." This is the right trade-off — selective disclosure requires non-interactive proofs, and non-interactive proofs are inherently transferable. The two-mode split handles it correctly. Users choosing Mode 2 are choosing to provide transferable evidence.

### "Facts can be bundled to discourage guessing or griefing"

SMP: bundled hash with minimum entropy thresholds (see table above). BBS+: co-disclosure policy at the credential schema level.

### OTR wraps both modes

Per spec. DH key exchange → symmetric encryption → HMAC auth → DH ratchet → MAC key publication on session end. Which OTR version/ratchet model are you targeting? The ratchet behavior (per-exchange vs per-message) affects the session flow.

OTR hides content, not metadata. Relay nodes see who, when, frequency.

---

## Evaluation

### "Most players evaluate subjects using information they already know"

SMP handles this. No credential infrastructure needed — two parties and a relay.

### "Players must corroborate without publicly revealing subject information"

SMP between players. Both hash canonical identifying information about the subject. SMP confirms same person without revealing identifiers. Different domains may need different corroboration rules — a "human uniqueness" corroboration requires different evidence than a "personality assessment" corroboration. This maps to the node domain architecture.

### "Players need assurance against duplicate verification under different identities"

Two layers:

**Graph layer (existing):** The scoring algorithm detects structural anomalies. Random walk auditing (HOPS = log₁₀(N)) catches inconsistencies. This operates on the evaluation graph regardless of privacy protocols.

**Credential layer (Mode 2):** The specific attack: a subject gets credentials under two identities and presents proofs from both. Defense starts with BrightID's uniqueness guarantee — if credential issuance requires BrightID verification, the graph already enforces one-identity. Additional cryptographic mechanisms (domain-scoped pseudonyms) are possible but may not be needed if the graph layer is sufficient.

These are different problems. The graph detects evaluation pattern anomalies. Credential uniqueness prevents same-person multi-identity proof presentation. Neither replaces the other.

---

## Scalability

### "Scalable to billions of participants"

Both primary protocols are pairwise and on-demand. No global consensus for verification. This scales.

Binding constraints at billion-user scale:

| Dimension | Analysis |
|-----------|----------|
| **Relay bandwidth** | Likely binding. Millions of concurrent OTR sessions need capacity planning. Each SMP = 4 messages × ~256 bytes. Pure forwarding — distributable across relay nodes. |
| **Issuer throughput** | Moderate. Each blind signing = commitment verification + BLS12-381 signature (~10-50ms). 100 issuers at 100 sigs/sec = 864M credentials/day. Sufficient if issuance is infrequent. |
| **Scoring algorithm** | Potentially binding. Running the algorithm on a graph with billions of nodes — O(E × log₁₀(N)) per iteration on periodic snapshots — may need distributed computation or incremental updates. |
| **Issuer public key distribution** | Not binding. BLS12-381 public keys are 96 bytes. Hundreds of issuers = trivial. |
| **Credential storage** | Not binding. Users store their own credentials locally. |

### "Deploy protocols as node software"

**Foxx can't run BLS12-381 WASM.**

Foxx is ArangoDB's embedded V8. Synchronous-only — no Promises, no async. Only `new WebAssembly.Module()` works. Dock's `@docknetwork/crypto-wasm` is a multi-megabyte BLS12-381 module — likely at the edge of or beyond V8's sync compilation limit. Each Foxx service loads into multiple V8 isolates, multiplying memory. The [one documented WASM-in-Foxx case](https://github.com/arangodb/arangodb/issues/7334) (2018) was a trivial add function. Nobody has loaded a large crypto module in Foxx.

**Proposed sidecar architecture** (you know this infrastructure — there may be a better shape):

```
┌─────────────────────────────────────────────┐
│  BrightID Node (existing Docker stack)      │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │ ArangoDB │◄─┤ Foxx API │  │ consensus │  │
│  │ (graph)  │  │ (REST)   │  │ + scorer  │  │
│  └─────────┘  └──┬───────┘  └───────────┘  │
│                  │ @arangodb/request (sync)  │
│                  ▼                           │
│  ┌───────────────────────────────────────┐  │
│  │ aura-crypto sidecar (Node.js)         │  │
│  │  BBS+ blind signing + verification    │  │
│  │  SMP + OTR session management         │  │
│  │  @docknetwork/crypto-wasm-ts          │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

Foxx handles graph/data. Sidecar handles crypto. Communication via `@arangodb/request` (sync HTTP). Caveat: Foxx HTTP is blocking — crypto ops block a V8 context. For non-blocking: Foxx queues.

Would deploy as one additional Docker container alongside the existing stack.

NaCl (Ed25519/X25519) and BLS12-381 coexist. Nodes already use WI-Schnorr blind signatures via NaCl. BBS+ adds BLS12-381 via the sidecar. Additive, not replacement.

---

## Decentralization

### "No centralized actor should be able to block operations or decrypt private data"

**Block operations:** Issuance authority derives from scoring. Multiple nodes compute deterministically on the same snapshot — no single node can unilaterally block. Majority collusion is the real threat: colluding nodes would need to dominate energy flow without triggering structural anomaly detection (random walk auditing). This is inherent to any decentralized scoring system.

**Decrypt private data:** With blind issuance, the issuer sees the Pedersen commitment but gains zero information about scores (statistical hiding). OTR is end-to-end encrypted. Relay sees ciphertext only. Without blind issuance (if the issuer recomputes scores), the issuer sees everything at issuance time — this violates the spec goal.

**Issuer vs relay — two trust surfaces:**

| Role | Trust requirement | Trust source |
|------|-------------------|-------------|
| Issuer | Must not issue fraudulent credentials | Domain-specific node scoring. Different credential types → different issuer sets. |
| Relay | Must deliver without tampering. Sees metadata. | Lower trust threshold than issuance. |

Credential issuance: single-signer (simpler, any node above domain threshold) vs threshold (t-of-N, no single-node compromise, requires DKG). Major architectural branch.

### Node domains

Per the [decentralization article](https://hackmd.io/xKEcuzstQp2o8XIvve6KtA): each domain gets a corresponding node domain determining which nodes are trusted for that domain. For assessment credentials: a node trusted for human uniqueness issuance is not automatically trusted for personality assessment issuance. This maps credential types to domain-specific issuer sets.

Currently not implemented in code — evaluations use `domain: "BrightID"` only. The Evaluate operation already supports arbitrary domain/category fields, so the data model is ready.

### Scoring, Updraft, Teams

The scoring algorithm runs on periodic snapshots deterministically. The specific algorithm is revisitable — the architecture doesn't couple to a particular implementation.

Updraft determines which nodes are trusted per domain via prediction market incentives. Early correct opinions earn rewards. A node's Updraft standing in the relevant domain campaign affects its issuance authority.

Teams provide resilience — independent energy flows, independent scores. If one team is compromised, others remain. Open question: are credentials team-scoped? Can a credential from Team A be verified via Team B's trust chain?

### Auditing and privacy

Random walk auditing operates on the evaluation graph structure (who evaluated whom, stored on IDChain — public and auditable). OTR protects session content (SMP results, BBS+ proofs). These layers don't conflict — evaluation metadata is public, session content is private.

---

## Implementation Constraints

### Serialization

BBS+ signs ordered message arrays, not JSON. The pipeline:

```
JSON fact → fast-json-stable-stringify → UTF-8 bytes → hash-to-scalar → BBS+ message slot
```

Each credential attribute maps to one message slot. Mapping is fixed per schema version. We used `fast-json-stable-stringify` in our SECURITY.md spec — is that the right serialization for BrightID, or is there an existing canonical format in the node codebase?

### Domain separation

| Construction | Tag |
|--------------|-----|
| SMP bundle hash | `"aura:smp:v1"` |
| BBS+ credential schema | `"aura:credential:v1:{schema_id}"` |
| BBS+ proof challenge | `"aura:proof-challenge:v1"` |
| OTR session binding | `"aura:otr-session:v1"` |
| Blind issuance commitment | `"aura:blind-commit:v1:{schema_id}"` |
| Pseudonym derivation | `"aura:pseudonym:v1:{domain_id}"` |

Tags are versioned. Changing a tag = new protocol version.

### Constant-time

SMP and OTR in JavaScript: native BigInt is not guaranteed constant-time. Real implementation risk. The sidecar's Rust-compiled WASM (Dock) benefits from constant-time libraries, but any JS protocol code must be audited for timing leaks.

### Threat model

| Threat | Mitigation |
|--------|------------|
| Multiple sybil nodes | Scoring algorithm detects clusters. Issuance tied to domain score. Threshold signing eliminates single-node compromise. |
| Network observation | OTR encrypts content. Metadata visible to relays. Relay diversity distributes exposure. |
| Replay | Session-bound proofs. Nonces in issuance requests. OTR ratchet for forward secrecy. |
| Compromised node | Single-signer: revoke issued credentials (mechanism TBD). Threshold: no single compromise produces valid sigs. |
| Malicious verifier | Learns only disclosed attributes. Can extract and transfer BBS+ proof (see deniability section). |
| Fabricated assessments | Blind issuance can't prevent this. Social-layer defense: credential weight tied to subject's graph score. |

---

## Implementation Proposals

How we'd approach each decision point. Each includes the tradeoff. All subject to your call.

### 1. Blind issuance over recomputation

**Proposal:** Use blind issuance (Pedersen commitments). The issuer never sees scores.

**Tradeoff:** Users can commit to fabricated scores. Defense: credentials carry weight proportional to the subject's graph-layer trust score. A sybil account's credentials are worthless regardless of what scores they contain.

**What changes our mind:** If fabrication becomes a real attack vector (users gaming credentials for social advantage), recomputation becomes necessary. But it requires extracting scoring logic into shared, versioned code — significant engineering.

### 2. Single-signer issuance to start

**Proposal:** Single-signer for initial deployment. Any node above the domain issuance threshold can sign.

**Tradeoff:** Compromised node's credentials persist until revoked. Threshold signing eliminates this but requires DKG, coordination, and liveness guarantees.

**Path to threshold:** Add threshold signing as a protocol upgrade once single-signer is stable. Doerner et al. (IEEE S&P 2023) provides the academic foundation. Dock implements it.

### 3. Sidecar, not Foxx-native

**Proposal:** Node.js sidecar in the Docker stack. Foxx talks to it via `@arangodb/request`.

**Tradeoff:** IPC latency + blocking V8 contexts during crypto. Foxx queues for async if blocking is a problem.

**Alternative:** Rust sidecar (smaller binary, faster crypto). But Dock's library is TypeScript/WASM, and the ecosystem is Node.js.

### 4. BrightID uniqueness as the primary duplicate defense

**Proposal:** Require BrightID verification for credential issuance. The graph enforces one-person-one-identity. Additional cryptographic uniqueness (domain-scoped pseudonyms) only if the graph proves insufficient.

**Tradeoff:** Couples assessment credentials to BrightID verification status. Users without BrightID can't get credentials.

### 5. Time-bounded credentials over accumulator revocation

**Proposal:** Credentials expire (TTL tied to assessment version). No accumulator-based revocation for MVP.

**Tradeoff:** Compromised node's credentials persist until expiry. Shorter TTL = more reissuance load. Longer TTL = longer exposure window.

### 6. User-defined SMP bundles with domain minimums

**Proposal:** Users choose what to include in SMP bundles, but each domain enforces minimum entropy thresholds. A bundle with only a categorical label gets rejected.

**Tradeoff:** Users might not understand entropy. The UX needs to make safe bundling the default path.

---

## Where We Need Your Input

These we can't resolve without your guidance.

1. **Relay architecture.** Node network as relay? WebRTC for direct connections? Hybrid? Relay metadata exposure acceptable or do we need relay privacy?

2. **Team credential scoping.** Are credentials from different teams interoperable? Can a verifier accept a credential issued by Team A if they only trust Team B?

3. **Schema evolution.** When assessment items change (append-only, never delete — current rule), how do credential schemas version? Can a v2 credential be verified against v1 expectations?

4. **Sidecar authentication.** What's the trust boundary between Foxx and the crypto sidecar? How are BLS12-381 signing keys provisioned?

---

## What We've Confirmed

- All Aura scoring is deterministic. Same inputs → identical outputs.
- BBS+ blind issuance works: IETF spec, Dock implements, issuer provably can't see committed values.
- OTR + SMP composes cleanly. OTR + BBS+ doesn't (proofs are transferable).
- Foxx likely can't run Dock's multi-megabyte BLS12-381 WASM synchronously. Sidecar is the likely path.
- Foxx can call sidecar via `@arangodb/request` (sync) or queues (async).
- NaCl and BLS12-381 coexist. Existing WI-Schnorr stays in Foxx, BBS+ goes to sidecar.
- SMP/OTR JS libraries are dead. Custom implementations required — constant-time, side-channel-aware.
- BrightID node is already a multi-container Docker stack. Sidecar fits the pattern.

---

*v1 was credential-first (wrong priority order). v2 corrected to SMP-first. v3 added security invariants and threat model. v4 added fact generation analysis, blind issuance research, deniability composition, Foxx constraints. v5 restructured to follow your spec's order, cut the explainers, converted open questions to implementation proposals.*

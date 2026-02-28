# Aura Backend Architecture — v4

*Two approval modes. Three protocols. Grounded in the existing trust model and real implementation.*

---

## Fact Generation: The Trust Foundation

Every protocol in this architecture operates on "facts" — locally computed assessment results that become the subjects of verification (SMP) and credentialing (BBS+). Before describing the protocols, this section defines what facts are, how they're generated, and what properties they must have.

### What the System Produces

Aura runs 27 assessments across 9 categories using 6 deterministic scoring methods. All scoring is pure arithmetic — same inputs always produce identical outputs. No randomness, no external state.

**Three tiers of facts:**

| Tier | Examples | Entropy | SMP bundling |
|------|----------|---------|-------------|
| **Continuous scores** (0-100 integers) | Big Five E/A/C/N/O, Shadow M/N/P, Risk overall + 4 subcategories, Integrity, Cognitive, Chronotype, Reasoning, 20 Starter Pack constructs, 14 AI-Native dimensions | 101 values per score; bundled categories reach 10B+ combinations | Safe when bundled by category (e.g., all 5 Big Five = 101^5) |
| **Categorical labels** | Attachment style (4 values), Chronotype type (3), Reasoning level (4), ADHD indicators (0-6) | 3-7 values each — trivially guessable alone | Must always bundle with continuous scores |
| **Composite/derived** | Archetype (29 patterns), aura visualization modifiers, assessment depth | Moderate (29 archetypes) to low | Bundle with source scores |

### Determinism Requirements

For SMP to work, both parties must independently derive the same hash from the same underlying truth. For BBS+ credentials to mean anything, the scoring must be reproducible and tamper-evident.

**Currently true:**
- All scoring functions are pure: `calculateAssessResults(testId, responses)` → deterministic result object
- Item ordering is immutable (append-only, never reorder or delete)
- `Math.round()` is deterministic across JS engines for the ranges involved

**Currently missing:**
- **Tamper evidence.** Results are computed client-side and stored as JSON. Nothing prevents a user from fabricating results. For credential issuance, this creates two options:
  1. **Issuer recomputes** from raw responses — requires scoring logic as shared, versioned code running identically in browser and node environments
  2. **Blind issuance** — issuer signs a commitment without seeing values, trusting only that the user committed to *something* (see Mode 2 below)
- **Version pinning.** Assessments have no explicit version number. Adding a `version` field to each test definition makes credential schemas portable across environments.
- **Null handling.** When a user answers 8 of 10 questions, the score is computed from 8. A credential must indicate completion (8/10) or two users with different completion patterns produce incomparable facts.

**Open question for Adam:** Which option — issuer recomputation or blind issuance — is correct for this architecture? Blind issuance is cryptographically cleaner (issuer never sees values) but doesn't prevent users from committing to fabricated scores. Issuer recomputation prevents fabrication but requires the issuer to run assessment scoring code and see the raw data. These are fundamentally different trust models.

---

## Two Modes of Fact Approval

### Mode 1: SMP — "Verify What You Know"

Default. Most evaluation happens here. No credential infrastructure required.

A player already knows something about a subject. The subject has that fact locally. SMP confirms the match — four messages, two round trips, neither party transmits the fact.

**Secret construction** must use domain separation and canonical serialization:

```
secret = H("aura:smp:v1" || stable_serialize(bundle))
```

where `stable_serialize` is deterministic (key-ordered, no whitespace ambiguity). Never raw string concatenation.

**Bundling against guessing:** Low-entropy facts must be bundled — the player must know ALL facts in the bundle or the comparison fails. Minimum safe bundles:

| Bundle | Minimum entropy |
|--------|----------------|
| All 5 Big Five scores | 101^5 ≈ 10 billion combinations |
| All 3 Shadow scores | 101^3 ≈ 1 million |
| Attachment (anxiety + avoidance + style) | ~4,000 |
| Risk (overall + 4 subcategories) | 101^5 ≈ 10 billion |
| Single categorical label (NEVER alone) | 3-7 — trivially guessable |

**Bundling against griefing:** Adam's spec says bundling discourages both guessing AND griefing. Griefing in this context means using SMP to probe whether someone has specific sensitive facts (probing attack), deliberately failing checks to waste the subject's time, or requesting excessive verifications to harass. Bundling mitigates probing (the attacker must know the entire bundle to confirm any single fact) and makes time-wasting more expensive (each failed attempt reveals the attacker doesn't know the full bundle). Rate limiting at the session layer addresses the remaining vectors.

**Subject consent:** The subject initiates or approves every SMP verification. The session flow is: player requests verification → subject receives request inside OTR session → subject decides whether to participate → SMP proceeds only with subject's explicit action. The subject has veto power over every verification attempt.

### Mode 2: BBS+ — "Share Directly"

Opt-in. The user chooses to reveal specific facts to a selected player.

The user holds a BBS+ credential (signed set of facts on BLS12-381). They generate a zero-knowledge proof revealing only chosen facts. The verifier checks the proof against the issuer's public key. Undisclosed facts are cryptographically hidden.

**Blind issuance preserves privacy at the credential boundary.** The issuing node does not need to see raw assessment scores. The protocol:

1. Subject computes assessment scores locally
2. Subject constructs a Pedersen commitment over scores as BBS+ message scalars:
   ```
   C = Q_2 * secret_prover_blind + J_1 * score_1 + ... + J_M * score_M
   ```
3. Subject generates a Schnorr proof-of-knowledge proving they know the opening of C
4. Subject sends (commitment, proof, assessment metadata) to issuing node
5. Issuer verifies the proof, attaches known metadata (assessment ID, timestamp, schema version), issues a blind signature
6. Subject unblinds: `sig = blind_sig.unblind(secret_prover_blind)` → standard BBS+ signature

The result is indistinguishable from a normally-issued credential. Verifiers cannot tell whether blind issuance was used. The Pedersen commitment provides *statistical (perfect) hiding* — even an issuer with unbounded computational power cannot extract hidden values from C.

**Implementation:** Dock's `@docknetwork/crypto-wasm-ts` fully supports this via `BBSPlusBlindSignatureG1.generateRequest()` / `.generate()` / `.fromRequest()` / `.unblind()`, plus a high-level `BlindedCredentialRequestBuilder` API. Both BBS and BBS+ variants support blind signing. The IETF specification is `draft-irtf-cfrg-bbs-blind-signatures-02`.

**Proofs must be session-bound.** A BBS+ proof generated for one session must not be replayable in another:

```
challenge = H("aura:proof-challenge:v1" || otr_session_id || nonce)
```

Without session binding, a verifier (or eavesdropper) could replay a captured proof.

**Co-disclosure policy for bundling:** BBS+ selective disclosure is per-attribute. To prevent single-attribute guessing, credential schemas can enforce co-disclosure — certain attributes must be revealed together or not at all. This is an application-level policy enforced by the schema, not native to BBS+.

### OTR Wraps Both Modes

Both SMP and BBS+ exchanges happen inside OTR sessions:

1. DH key exchange → shared secret → session keys
2. All messages encrypted with symmetric keys
3. Authenticated with HMAC (symmetric — both parties can produce)
4. DH ratchet rotates keys between exchanges (not per-message like Signal's double ratchet — key distinction for implementation)
5. Session ends → old MAC keys published → historical transcript becomes forgeable

**OTR hides content, not metadata.** Relay nodes can observe who communicates with whom, when, and how frequently. This is a known limitation — see Threat Model section.

### Deniability: Three Properties That Don't Compose Cleanly

The architecture involves three distinct deniability properties. They serve different purposes and don't combine the way a casual reading might suggest.

**1. OTR session deniability (transport layer).**
After a session ends and MAC keys are published, anyone could have produced the transcript. The verifier cannot prove the session happened to a third party. This covers both SMP and BBS+ exchanges at the transport level.

**2. SMP inherent deniability (Mode 1).**
SMP uses ephemeral DH parameters per protocol run. After completion, neither party holds transferable proof of the result. SMP is inherently deniable — the verifier can't even prove to themselves what the result was after the session ends.

**3. BBS+ proof transferability (Mode 2 — the complication).**
BBS+ proofs are Fiat-Shamir non-interactive zero-knowledge proofs (NIZKPs). They are *publicly verifiable* — anyone with the issuer's public key can check the proof. This means a BBS+ proof is inherently **transferable and non-deniable** at the cryptographic level. Pass (2003) proved that NIZKPs in the common reference string model cannot be deniable.

**How they interact:** OTR makes the *transport* of a BBS+ proof deniable — the verifier cannot prove they received the proof in a specific session. But the proof *itself* remains a valid, self-contained artifact. If a verifier extracts the proof from an OTR session, it is still checkable against the issuer's public key by any third party.

**Session binding creates "soft deniability":** By binding proofs to OTR session IDs, a proof is only valid within a specific session context. A third party seeing the proof can verify the math, but the session ID is meaningless without the OTR transcript (which is deniable). The proof is technically valid but contextually unmoored — the verifier can show the proof exists but cannot prove where it came from.

**Net result:** Mode 1 (SMP) has strong deniability. Mode 2 (BBS+) has soft deniability — the proof artifact is transferable, but its provenance is not. This is a known trade-off: selective disclosure requires non-interactive proofs, and non-interactive proofs are inherently transferable. Adam's spec acknowledges this by positioning BBS+ as opt-in.

---

## Mapping to the Four Pillars

### Privacy

| Spec goal | Mechanism |
|-----------|-----------|
| "Share just the facts or parts of facts a user chooses" | BBS+ selective disclosure (Mode 2). Blind issuance means the issuer never sees chosen values either. |
| "Plausible deniability: a user proves a fact, but the player can't share it further" | OTR session deniability + session-bound proofs. Soft deniability for Mode 2 (see above). Strong deniability for Mode 1 (SMP). |
| "Allow a player to verify they know approved facts, but they can't learn anything new" | SMP (Mode 1) — player confirms existing knowledge, learns nothing |
| "Facts can be bundled to discourage guessing or griefing" | SMP: canonical bundled hash with minimum entropy thresholds. BBS+: co-disclosure policy. Griefing mitigated by bundling (probing), rate limiting (time-wasting), and subject consent (harassment). |

### Evaluation

**"Most players evaluate subjects using information they already know."**

SMP is the primary mechanism. Most evaluation requires zero credential infrastructure — two parties and a relay.

**"Players must corroborate in some domains without publicly revealing subject information."**

SMP between players. Both hash canonical identifying information about the subject. SMP confirms they're evaluating the same person without either revealing identifiers.

Different domains may have different corroboration requirements. The existing BrightID architecture processes evaluations tagged with `domain` and `category` — corroboration rules can be domain-specific. A "human uniqueness" corroboration requires different evidence than a "personality assessment" corroboration. This maps to the node domain architecture: each domain defines what constitutes valid corroboration within it.

**"Players need assurance that a subject hasn't been verified multiple times under different identities."**

Two layers, operating independently:

1. **Graph layer (existing):** The scoring algorithm (currently weighted SybilRank / Aura energy-flow, but the specific algorithm is revisitable per Adam's CLAUDE.md note on Yekta) detects structural anomalies — low-trust clusters, energy sinks, abnormal graph conductance. Random walk auditing (HOPS = log₁₀(N)) catches inconsistencies. This operates on the evaluation graph regardless of privacy protocols.

2. **Credential layer (Mode 2 only):** When subjects present BBS+ proofs, additional uniqueness mechanisms are possible. The specific attack vector Adam describes: a subject gets credentials under two identities and presents proofs from both. This connects to BrightID's core purpose — one-person-one-identity. BrightID's uniqueness guarantee (Seed → SeedConnected → BrightID verification chain) is the foundation for credential-layer uniqueness. If credential issuance requires BrightID verification, the graph already enforces one-identity. Additional cryptographic mechanisms (domain-scoped pseudonyms, proof-of-unique-credential schemes) are possible but should be evaluated against whether the graph layer already provides sufficient guarantees.

Graph-layer sybil resistance and credential-layer uniqueness are different problems. The graph detects structural anomalies in evaluation patterns. Credential uniqueness prevents the same person from presenting proofs as different identities. Neither replaces the other. Both need Adam's input on integration.

### Scalability

**"The architecture must be scalable to billions of participants."**

Both primary protocols are pairwise and on-demand:
- SMP: 4 messages between two parties. No global state.
- OTR: session between two parties. Forward secrecy via ratchet.
- BBS+ proof verification: stateless — verifier needs only the issuer's public key and the proof.

No global consensus needed for any verification operation. The node network handles credential issuance and scoring; verification is peer-to-peer.

**Scaling dimensions and binding constraints:**

| Dimension | At billions of users | Binding? |
|-----------|---------------------|----------|
| **Issuer throughput** | Trusted nodes signing credentials for billions of users. Each blind signing ceremony = Pedersen commitment verification + BLS12-381 signature (~10-50ms). At 100 issuers doing 100 sigs/sec each, that's 10K credentials/sec = 864M/day. Sufficient if issuance is infrequent (new assessments, not per-session). | Moderate — depends on issuance frequency |
| **Relay bandwidth** | Concurrent OTR sessions between users. Each SMP exchange = 4 messages × ~256 bytes. Relay is pure forwarding. | Likely binding — millions of concurrent sessions need relay capacity planning |
| **Issuer public key distribution** | Verifiers need issuer public keys. BLS12-381 public keys are 96 bytes. A few hundred issuers = trivial. Thousands = still manageable via periodic sync. | Not binding |
| **Scoring algorithm** | Weighted SybilRank / energy-flow on a graph with billions of nodes. Currently runs on periodic snapshots on each node. The algorithm itself is O(E × log₁₀(N)) per iteration. | Potentially binding — graph algorithms at billion-node scale need distributed computation |
| **Credential storage** | Each user stores their own credentials locally. No global credential store. | Not binding |

Node domain scoring can distribute relay load across the network. For scoring at scale, the current architecture (each node independently computing over the full graph) may need sharding or incremental computation.

### Decentralization

**"No centralized actor should be able to block operations or decrypt private data."**

**Block operations:** If all issuance authority derives from scoring algorithm results, and scoring runs on multiple nodes deterministically (same snapshot = same scores), then no single node can unilaterally block issuance. Other nodes can serve the same function. However, **majority collusion** is a separate threat: if a majority of nodes collude, they could collectively refuse to issue credentials or manipulate scores. The defense is the scoring algorithm itself — colluding nodes would need to maintain legitimate-looking graph positions, and the random walk auditing mechanism detects anomalous trust patterns. The threshold: collusion must control enough energy flow to dominate scoring without triggering structural anomaly detection. This is an inherent property of any decentralized scoring system — not specific to this architecture — but worth acknowledging.

**Decrypt private data:**
- Facts stay local. OTR is end-to-end encrypted. Relay sees only ciphertext.
- **During issuance:** With blind issuance (Pedersen commitments), the issuer sees the commitment but cannot extract fact values. The commitment is statistically hiding — the issuer gains zero information about committed scores. This holds even in single-signer mode.
- **Without blind issuance:** If the issuer recomputes scores from raw responses, it sees everything at issuance time. This violates "no centralized actor can decrypt" at the issuance boundary.
- **After issuance:** The issuer retains only the commitment and proof transcript, neither of which reveals fact values.

**Two distinct trust surfaces** in the node network:

| Role | Trust requirement | Trust source |
|------|-------------------|-------------|
| **Issuer** (signs credentials) | Must not issue fraudulent credentials. Compromise = fake credentials in circulation. | Domain-specific node scoring. Different credential types may have different issuer sets — a node trusted for human uniqueness issuance is not automatically trusted for personality assessment issuance. |
| **Relay** (forwards messages) | Must deliver messages without tampering. Can observe metadata (who, when, frequency). Cannot read content. | Node domain evaluation — lower trust threshold than issuance |

These are separate trust surfaces. A node trustworthy as a relay is not automatically trustworthy as an issuer. The architecture must enforce this distinction. Domain-specific node trust (from the decentralization article) means different credential types map to different node domains, each with their own trusted issuer set.

**Credential issuance — two options:**

1. **Single-signer:** Each trusted node signs credentials independently. Simpler. Any node scoring above the issuance threshold in the relevant domain can sign. If a node is compromised, credentials it issued remain valid until revoked (see Open Questions). The scoring algorithm detects compromised nodes and removes their issuance authority, but existing credentials need explicit invalidation.

2. **Threshold signing (t-of-N):** Multiple nodes cooperate to sign. No single node holds the full signing key. Requires DKG, signer coordination, liveness guarantees. Eliminates single-node trust dependency. Academic foundation: Doerner et al., IEEE S&P 2023.

This is a major architectural branch — not an implementation detail. Adam's call.

**Updraft's role:** Updraft functions as a prediction market where early correct opinions about node trustworthiness earn rewards and wrong opinions lose capital. This incentive mechanism drives real behavior — it's not just voting. For credential issuance, a node's Updraft standing in the relevant domain campaign affects its issuance authority. The mapping: each credential domain has an Updraft campaign; node operators are "ideas" in that campaign; their score in the campaign determines issuance threshold eligibility.

**Teams provide resilience:** Multiple independent teams each generate their own scores using independent energy flows. If one team is compromised, others remain. For credential issuance: credentials could be scoped to the issuing team's trust chain. A credential from Team A carries weight proportional to Team A's Updraft standing. Whether credentials should be team-scoped (and whether a credential from Team A can be verified using Team B's trust chain) is an open architectural question — it affects both the verification protocol and the user experience.

**Auditing and privacy interaction:** Random walk auditing follows positive evaluations to detect inconsistencies. OTR wraps evaluation sessions. Question: can nodes audit evaluation chains when evaluations are privacy-protected? Answer depends on what's being audited. The evaluation *graph structure* (who evaluated whom, when, with what confidence) is stored on-chain via IDChain consensus — this is public and auditable regardless of OTR. What OTR protects is the *content* of verification sessions (SMP results, BBS+ proofs). Auditing operates on the graph layer, not the session content layer. These don't conflict — but the architecture should be explicit that evaluation metadata (the fact that an evaluation happened) is public even though session content is private.

---

## Node Deployment

**Adam's requirement: "Deploy protocols as node software."**

The existing BrightID node runs six Docker containers: `db` (ArangoDB), `ws` (Foxx REST API), `consensus_sender`, `consensus_receiver`, `scorer`, and `updater`. Foxx services handle graph queries, operation application, and client-facing APIs.

**Foxx cannot reliably run BLS12-381 WASM.** Foxx is ArangoDB's embedded V8 JavaScript environment with critical constraints:
- Synchronous-only execution (no Promises, no async/await)
- 512MB V8 heap per context (configurable)
- Only `new WebAssembly.Module()` works (synchronous compilation)
- Dock's `@docknetwork/crypto-wasm` is 7.9MB — at the edge of V8's synchronous compilation limit and untested in Foxx at this scale
- Each Foxx service loads into multiple V8 isolates, multiplying memory consumption

The one documented case of WASM in Foxx (2018, ArangoDB issue #7334) was a trivial integer-addition function. No one has publicly loaded a multi-megabyte cryptographic WASM module in Foxx.

**Sidecar architecture:**

```
┌─────────────────────────────────────────────────┐
│  BrightID Node (existing Docker stack)          │
│                                                 │
│  ┌─────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ ArangoDB │  │ Foxx API │  │ Consensus/    │  │
│  │ (graph)  │◄─┤ (REST)   │  │ Scorer/Update │  │
│  └─────────┘  └──┬───────┘  └───────────────┘  │
│                  │ @arangodb/request (sync HTTP) │
│                  ▼                               │
│  ┌───────────────────────────────────────────┐  │
│  │ aura-crypto sidecar (Node.js)             │  │
│  │                                           │  │
│  │  @docknetwork/crypto-wasm-ts              │  │
│  │  - BBS+ blind signing                     │  │
│  │  - BBS+ proof verification                │  │
│  │  - SMP protocol implementation            │  │
│  │  - OTR session management                 │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

- **Foxx** handles graph/data logic: evaluation storage, scoring queries, verification status, client API
- **Sidecar** handles all cryptographic operations: BBS+ signing/verification, SMP, OTR
- Communication: Foxx calls sidecar synchronously via `@arangodb/request` module (outbound HTTP)
- **Caveat:** Foxx's outbound HTTP is blocking — crypto operations block a V8 context until the sidecar responds. For non-blocking operation, Foxx queues can dispatch work asynchronously.

The sidecar deploys as an additional Docker container in the existing stack. Node operators add one container; no changes to ArangoDB or Foxx service architecture.

**NaCl and BLS12-381 coexist.** BrightID nodes use NaCl (Ed25519/X25519) for identity and signing, plus WI-Schnorr blind signatures for privacy-preserving verification. BBS+ uses BLS12-381. These are independent, additive systems. Nodes add BLS12-381 via the sidecar alongside existing NaCl in Foxx.

---

## Security Invariants

These follow directly from SECURITY.md and apply to all cryptographic constructions in this architecture.

### Domain Separation

Every cryptographic construction must include a versioned domain tag preventing cross-protocol or cross-context replay:

| Construction | Domain tag |
|--------------|-----------|
| SMP bundle hash | `"aura:smp:v1"` |
| BBS+ credential schema | `"aura:credential:v1:{schema_id}"` |
| BBS+ proof challenge | `"aura:proof-challenge:v1"` |
| OTR session binding | `"aura:otr-session:v1"` |
| Pseudonym derivation (if adopted) | `"aura:pseudonym:v1:{domain_id}"` |
| Blind issuance commitment | `"aura:blind-commit:v1:{schema_id}"` |

Domain tags are versioned. Changing a tag = new protocol version. Old and new must not interoperate accidentally.

### Deterministic Serialization

All payloads that are signed or hashed must be canonically serialized. Key ordering, whitespace, encoding must be deterministic. `fast-json-stable-stringify` is the existing standard in the BrightID ecosystem.

**BBS+ requires special handling:** BBS+ signs ordered message arrays, not JSON objects. The conversion from JSON facts to BBS+ message arrays needs explicit specification — `fast-json-stable-stringify` produces a JSON string, but BBS+ takes byte arrays as message inputs. The pipeline:

```
JSON fact object
  → fast-json-stable-stringify (canonical JSON string)
    → UTF-8 encode (byte array)
      → BBS+ message scalar (field element via hash-to-scalar)
```

Each attribute in the credential maps to one BBS+ message slot. The mapping from fact schema to message index must be fixed per schema version.

### Replay Protection

- **BBS+ proofs** are bound to OTR sessions via challenge derivation. A proof valid in session A is not valid in session B.
- **SMP** is inherently session-bound (DH parameters are ephemeral per protocol run).
- **OTR** uses DH ratchet for forward secrecy. Replayed messages fail MAC verification under the current key state.
- **Credential issuance requests** should include nonces to prevent replay.

### Key Material Protection

Per SECURITY.md: key material never in logs, error messages, console output, API responses, or crash reports. This applies to BLS12-381 issuer signing keys, OTR ephemeral session keys, user credential private keys, SMP intermediate values, and Pedersen commitment blinding factors (`secret_prover_blind`). Both client and sidecar implementations.

### Constant-Time Operations

Per SECURITY.md: no crypto code paths that branch on secret data or use non-constant-time comparisons. SMP implementations in JavaScript require particular care — native BigInt operations are not guaranteed constant-time. This is a real implementation risk, not a theoretical concern. The sidecar running Dock's Rust-compiled WASM benefits from Rust's constant-time libraries, but any JavaScript protocol code (SMP, OTR) must be audited for timing leaks.

---

## Threat Model Coverage

Per SECURITY.md, the adversary can:

| Threat | Relevant protocols | Mitigation |
|--------|-------------------|------------|
| Control multiple sybil nodes | Scoring algorithm, credential issuance | Weighted SybilRank / energy-flow detects clusters. Issuance authority tied to domain-specific node score. Threshold signing eliminates single-node compromise (if adopted). Majority collusion requires dominating energy flow without triggering structural anomaly detection. |
| Observe network traffic | OTR relay, SMP relay | OTR encrypts content. **Metadata (who, when, frequency) is visible to relays.** Mitigations: relay diversity, onion routing (future), timing obfuscation. |
| Front-run transactions | Credential issuance | Nonces in issuance requests. Commitment schemes if issuance touches chain. |
| Replay signed payloads | BBS+ proofs, credential requests | Session-bound proofs via challenge derivation. Nonces in issuance requests. |
| Compromise a single node | Issuance, relay | Single-signer: compromised node's credentials need revocation. Threshold: no single-node compromise produces valid credentials. Relay: content encrypted, metadata exposed. |
| Manipulate timestamps | Credential expiration, session validity | Timestamp tolerance window (existing: 1-hour TIME_FUDGE). Credentials should include issuance timestamp for validity windowing. |
| Compromise a single verifier (malicious player) | BBS+ verification | A malicious verifier learns only what the subject chose to disclose — nothing more. BBS+ ZK proofs reveal no information beyond the disclosed attributes. The verifier can extract and transfer the proof (see deniability section), but cannot learn hidden attributes. |
| Fabricate assessment results | Credential issuance | With blind issuance: the subject could commit to fabricated scores. The Pedersen commitment proves they committed to *something* but not that it's truthful. Mitigation: issuer recomputation (if feasible) or social-layer trust (only highly-scored subjects' credentials carry weight). |

---

## Integration with Existing Infrastructure

### Protocol Deployment

| Protocol | Runs on | Trust surface |
|----------|---------|---------------|
| SMP | Client-to-client via relay | Relay (transport only) |
| BBS+ signing (blind) | Sidecar on trusted nodes | Issuer (high trust threshold, domain-specific) |
| BBS+ verification | Client | None (stateless, uses public key) |
| OTR | Client-to-client via relay | Relay (transport only) |
| Scoring algorithm | Nodes (existing scorer container) | Scoring authority |
| Updraft | Public (existing, separate from node code) | Team/node reputation via prediction market |

### Integration Paths

Three ways to connect Aura assessments to the existing node network, in order of increasing depth:

1. **Register as a BrightID app** (lightest). Aura registers as an app requiring Aura-level verification. Users link their BrightID. The app checks verification status via node API. No protocol changes.

2. **Add evaluation category** (medium). The existing Evaluate operation supports arbitrary `domain` and `category` fields. A new domain (e.g., `"AuraAssessments"`) with new categories would store evaluations alongside existing ones. The scorer would need modification to process the new domain.

3. **Deploy sidecar + credential domain** (full architecture). New Docker container alongside existing node stack. New domain in the scoring algorithm. New Updraft campaign for the domain. This is what this architecture describes.

### Backend Boundary

The app isolates backend communication to ~5 functions. New protocol functions extend this boundary. The pattern: isolated functions, backend-agnostic app code. The exact API depends on issuance model decisions.

---

## Open Questions

### Architecture Decisions (Adam)

1. **Fact trust model.** Blind issuance (issuer never sees scores, but can't verify truthfulness) or issuer recomputation (issuer sees raw responses and recomputes, but scoring logic must be shared code)? These are fundamentally different trust models with different privacy properties.

2. **Issuance model.** Single-signer (simpler, any trusted node in the domain, scoring algorithm handles compromise) or threshold (stronger decentralization, requires DKG/coordination)? Major architectural branch.

3. **Credential scoping.** Are credentials scoped to issuing teams? Can a credential from Team A be verified using Team B's trust chain? This affects verification protocol and UX.

4. **Duplicate detection.** Graph-layer sybil resistance and credential-layer uniqueness are separate problems. Does BrightID's existing uniqueness guarantee (via the Seed → SeedConnected → BrightID chain) suffice, or does Mode 2 need additional cryptographic uniqueness enforcement?

5. **Relay architecture.** Node network as relay? WebRTC for direct connections? Hybrid? Relay nodes see metadata — is that acceptable, or do we need relay privacy?

6. **Revocation.** Compromised issuer node: what happens to credentials it already signed? Options: time-bounded credentials (expire naturally), accumulator-based non-revocation proofs (complex), social-graph revocation (loss of trust score invalidates). Without revocation, a compromised node's credentials persist indefinitely.

7. **Bundle policy.** Who defines SMP bundles? User (when approving)? Domain (assessment schema)? Node network (policy consensus)?

8. **Domain-specific corroboration.** Different domains have different corroboration requirements. How are these defined? Per-domain configuration on nodes, or a protocol-level mechanism?

### Implementation Decisions (require Adam's review per CLAUDE.md crypto boundary)

9. **Credential expiration model.** Fixed TTL? Renewable? Tied to assessment version?

10. **Schema versioning.** How do credential schemas evolve? Can a v2 schema credential be verified against a v1 verifier?

11. **Proof-session binding.** Exact challenge derivation for binding BBS+ proofs to OTR sessions. Needs spec-level detail before implementation.

12. **Issuer key rotation.** How do nodes rotate BLS12-381 signing keys? How does the network learn about new keys? What happens to credentials signed under old keys?

13. **Fact derivation specification.** The scoring logic (`calculateAssessResults`) needs to be extractable, versioned, and deterministic across browser and Node.js environments. How to package and distribute this shared code?

14. **Compromised node recovery.** When a node is detected as compromised, what is the revocation propagation path for credentials it issued?

15. **Seed node impact.** The scoring algorithm anchors trust in seed nodes. If issuance authority derives from scores, seed node selection directly affects who can issue credentials. How is seed selection governed?

16. **Sidecar deployment.** What endpoints does the crypto sidecar expose? What's the authentication model between Foxx and sidecar? How are signing keys provisioned to the sidecar?

### Validated

- OTR, SMP, BBS+ compose correctly — OTR wraps sessions, SMP handles knowledge verification, BBS+ handles selective disclosure
- BBS+ blind issuance works: IETF spec (draft-irtf-cfrg-bbs-blind-signatures-02), Dock implements via Pedersen commitments, issuer provably cannot see committed values
- BBS+ on BLS12-381: functional in Dock's library. ~112 byte signatures. ~400-1500 byte proofs. Threshold variant exists (IEEE S&P 2023).
- NaCl and BLS12-381 coexist without conflict
- Foxx cannot reliably run 7.9MB BLS12-381 WASM — sidecar architecture required
- Foxx can call sidecar synchronously via `@arangodb/request` or asynchronously via queues
- SMP and OTR existing JS libraries are unmaintained — custom implementations required. These are non-trivial: constant-time requirements, side-channel concerns, and protocol subtleties demand careful implementation and review.
- All Aura scoring is deterministic — same inputs produce identical outputs
- BrightID node architecture is Docker-based with six containers; adding a seventh (sidecar) fits the existing pattern

---

## Changelog

- **v1:** Credential-first architecture. Inverted Adam's priorities. Wrong technical details (sig sizes, SMP timing). Premature commitments (threshold issuance, on-chain nullifiers). Ignored social trust graph.
- **v2:** Rewritten SMP-first. Correct technical details. Integrated with SybilRank/Updraft/trust flows. Removed premature commitments. But: missing domain separation, deterministic serialization, session binding, threat model, issuer/relay trust distinction.
- **v3:** Added security invariants (domain separation, serialization, replay protection). Separated issuer and relay trust surfaces. Added threat model coverage per SECURITY.md. Tightened SybilRank language. Separated graph-layer and credential-layer sybil problems. Expanded open questions. Removed tutorial framing.
- **v4:** Added fact generation foundation (27 assessments, 6 scoring methods, three fact tiers, determinism analysis). Added blind issuance (Pedersen commitments, IETF spec, Dock API). Analyzed deniability composition (three distinct properties, BBS+ proofs are transferable, soft deniability via session binding). Added node deployment section (Foxx can't run BLS12-381 WASM, sidecar architecture required, deployment diagram). Added griefing analysis. Added subject consent flow. Addressed domain-specific node trust, teams, Updraft incentive mechanism, auditing/privacy interaction, majority collusion. Added scaling dimension analysis. Connected duplicate detection to BrightID uniqueness. Referenced scoring algorithm generically (not "SybilRank" specifically, since algorithm is revisitable). Added BBS+-to-message-array serialization pipeline. Added fabrication threat. Grounded in actual BrightID-Node Docker architecture, Foxx constraints, and Dock library APIs.

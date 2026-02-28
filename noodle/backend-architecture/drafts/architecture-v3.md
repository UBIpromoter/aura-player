# Aura Backend Architecture — v3

*Two approval modes. Three protocols. Grounded in the existing trust model.*

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

**Bundling against guessing:** Low-entropy facts (personality type has 16 values; location has predictable options) are bundled — the player must know ALL facts in the bundle or the comparison fails. Bundle definition is set by the user when approving SMP verification.

### Mode 2: BBS+ — "Share Directly"

Opt-in. The user chooses to reveal specific facts to a selected player.

The user holds a BBS+ credential (signed set of facts on BLS12-381). They generate a zero-knowledge proof revealing only chosen facts. The verifier checks the proof against the issuer's public key. Undisclosed facts are cryptographically hidden.

**Proofs must be session-bound.** A BBS+ proof generated for one session must not be replayable in another. The proof includes a verifier-supplied challenge derived from the OTR session:

```
challenge = H("aura:proof-challenge:v1" || otr_session_id || nonce)
```

Without session binding, a verifier (or eavesdropper) could replay a captured proof.

### OTR Wraps Both Modes

Both SMP and BBS+ exchanges happen inside OTR sessions:

1. DH key exchange → shared secret → session keys
2. All messages encrypted with symmetric keys
3. Authenticated with HMAC (symmetric — both parties can produce)
4. DH ratchet rotates keys between exchanges (not per-message like Signal's double ratchet — key distinction for implementation)
5. Session ends → old MAC keys published → historical transcript becomes forgeable

Plausible deniability: during the session, the player is convinced. After it ends, they hold nothing cryptographically binding.

**OTR hides content, not metadata.** Relay nodes can observe who communicates with whom, when, and how frequently. This is a known limitation — see Threat Model section.

---

## Mapping to the Four Pillars

### Privacy

| Spec goal | Mechanism |
|-----------|-----------|
| "Share just the facts or parts of facts a user chooses" | BBS+ selective disclosure (Mode 2) |
| "Plausible deniability: a user proves a fact, but the player can't share it further" | OTR — symmetric MACs + key revelation make transcript forgeable post-session |
| "Allow a player to verify they know approved facts, but they can't learn anything new" | SMP (Mode 1) — player confirms existing knowledge, learns nothing |
| "Facts can be bundled to discourage guessing or griefing" | SMP: canonical bundled hash. BBS+: application-level co-disclosure policy (not native to BBS+ — requires issuer/schema enforcement) |

### Evaluation

**"Most players evaluate subjects using information they already know."**

SMP is the primary mechanism. Most evaluation requires zero credential infrastructure — two parties and a relay.

**"Players must corroborate to ensure they're discussing the same subject."**

SMP between players. Both hash canonical identifying information about the subject. SMP confirms they're evaluating the same person without either revealing identifiers.

**"Players need assurance that a subject hasn't been verified multiple times under different identities."**

Two layers, operating independently:

1. **Graph layer (existing):** Weighted SybilRank over node domains detects structural anomalies — low-trust clusters, energy sinks, abnormal graph conductance. Random walk auditing (HOPS = log₁₀(N)) catches inconsistencies. This operates on the evaluation graph regardless of privacy protocols.

2. **Credential layer (Mode 2 only):** When subjects present BBS+ proofs, additional uniqueness mechanisms are possible but require careful analysis — they introduce new cryptographic surface area and must not undermine the graph layer. Options include domain-scoped pseudonyms (deterministic per verifier domain, non-trivial to implement correctly) and proof-of-unique-credential schemes. This is an open design question.

Graph-layer sybil resistance and credential-layer uniqueness are different problems. The graph detects structural anomalies in evaluation patterns. Credential uniqueness prevents the same person from presenting proofs as different identities. Neither replaces the other. Both need Adam's input on integration.

### Scalability

Both primary protocols are pairwise and on-demand:
- SMP: 4 messages between two parties. No global state.
- OTR: session between two parties. Forward secrecy via ratchet.
- BBS+ proof verification: stateless — verifier needs only the issuer's public key and the proof.

No global consensus needed for any verification operation. The node network handles credential issuance and scoring; verification is peer-to-peer.

**Relay bandwidth at scale** is a consideration. Pairwise protocols have no global bottleneck, but relay nodes serving millions of concurrent sessions need capacity planning. Node domain scoring can distribute relay load across the network.

### Decentralization

**Two distinct trust surfaces** in the node network:

| Role | Trust requirement | Trust source |
|------|-------------------|-------------|
| **Issuer** (signs credentials) | Must not issue fraudulent credentials. Compromise = fake credentials in circulation. | Node domain scoring via deterministic weighted SybilRank |
| **Relay** (forwards messages) | Must deliver messages without tampering. Can observe metadata (who, when, frequency). Cannot read content. | Node domain evaluation — lower trust threshold than issuance |

These are separate trust surfaces. A node trustworthy as a relay is not automatically trustworthy as an issuer. The architecture must enforce this distinction.

**Which credentials carry weight?** Updraft public ratification and team-based trust flows determine team score weighting. Independent energy flows from teams through evaluations. Node domain scoring is deterministic — same snapshot input, same output.

**Credential issuance — two options:**

1. **Single-signer:** Each trusted node signs credentials independently. Simpler. Any node scoring above the issuance threshold can sign. If a node is compromised, credentials it issued remain valid until revoked (see Open Questions). The trust model (SybilRank) detects compromised nodes and removes their issuance authority, but existing credentials need explicit invalidation.

2. **Threshold signing (t-of-N):** Multiple nodes cooperate to sign. No single node holds the full signing key. Requires DKG, signer coordination, liveness guarantees. Eliminates single-node trust dependency. Academic foundation: Doerner et al., IEEE S&P 2023.

This is a major architectural branch — not an implementation detail. Adam's call.

**Verification is peer-to-peer:**
- SMP: direct between participants (via relay for transport, not for trust)
- BBS+ proofs: verified against issuer public key, no server needed
- OTR: end-to-end encrypted, relay sees only ciphertext

**Shared state (minimal):**
- Issuer public keys
- Node trust scores (from SybilRank)
- Updraft campaign results

**Local (never shared):**
- Facts, credentials, proofs, SMP secrets

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

Domain tags are versioned. Changing a tag = new protocol version. Old and new must not interoperate accidentally.

### Deterministic Serialization

All payloads that are signed or hashed must be canonically serialized. Key ordering, whitespace, encoding must be deterministic. `fast-json-stable-stringify` is the existing standard in the BrightID ecosystem. Changing serialization breaks existing signatures.

This applies to:
- BBS+ credential payloads (fact ordering and encoding)
- SMP bundle construction
- Credential issuance requests
- Any payload that crosses a trust boundary

### Replay Protection

- **BBS+ proofs** are bound to OTR sessions via challenge derivation. A proof valid in session A is not valid in session B.
- **SMP** is inherently session-bound (DH parameters are ephemeral per protocol run).
- **OTR** uses DH ratchet for forward secrecy. Replayed messages fail MAC verification under the current key state.
- **Credential issuance requests** should include nonces to prevent replay.

### Key Material Protection

Per SECURITY.md: key material never in logs, error messages, console output, API responses, or crash reports. This applies to BLS12-381 issuer signing keys, OTR ephemeral session keys, user credential private keys, and SMP intermediate values. Both client and node implementations.

### Constant-Time Operations

Per SECURITY.md: no crypto code paths that branch on secret data or use non-constant-time comparisons. SMP implementations in JavaScript require particular care — native BigInt operations are not guaranteed constant-time. This is a real implementation risk, not a theoretical concern.

---

## Threat Model Coverage

Per SECURITY.md, the adversary can:

| Threat | Relevant protocols | Mitigation |
|--------|-------------------|------------|
| Control multiple sybil nodes | SybilRank, credential issuance | Weighted SybilRank detects clusters. Issuance authority tied to node domain score. Threshold signing eliminates single-node compromise (if adopted). |
| Observe network traffic | OTR relay, SMP relay | OTR encrypts content. **Metadata (who, when, frequency) is visible to relays.** Mitigations: relay diversity, onion routing (future), timing obfuscation. |
| Front-run transactions | Credential issuance | Nonces in issuance requests. Commitment schemes if issuance touches chain. |
| Replay signed payloads | BBS+ proofs, credential requests | Session-bound proofs via challenge derivation. Nonces in issuance requests. |
| Compromise a single node | Issuance, relay | Single-signer: compromised node's credentials need revocation. Threshold: no single-node compromise produces valid credentials. Relay: content encrypted, metadata exposed. |
| Manipulate timestamps | Credential expiration, session validity | Timestamp tolerance window (existing: 1-hour TIME_FUDGE). Credentials should include issuance timestamp for validity windowing. |

---

## Integration with Existing Infrastructure

### Protocol Deployment

| Protocol | Runs on | Trust surface |
|----------|---------|---------------|
| SMP | Client-to-client via relay | Relay (transport only) |
| BBS+ signing | Trusted nodes | Issuer (high trust threshold) |
| BBS+ verification | Client | None (stateless, uses public key) |
| OTR | Client-to-client via relay | Relay (transport only) |
| SybilRank | Nodes (existing) | Scoring authority |
| Updraft | Public (existing) | Team/node reputation |

### Backend Boundary

The app isolates backend communication to ~5 functions. New protocol functions extend this boundary. The pattern: isolated functions, backend-agnostic app code. The exact API depends on issuance model decisions.

### NaCl and BLS12-381

BrightID nodes use NaCl (Ed25519/X25519) for identity and signing. BBS+ uses BLS12-381. Independent systems — additive, not replacement. Nodes add BLS12-381 for credential issuance alongside existing NaCl.

---

## Open Questions

### Architecture Decisions (Adam)

1. **Credential schema.** Which assessment facts are credential-eligible for Mode 2? All, or curated? Should continuous scores be bucketed to reduce guessing surface?

2. **Issuance model.** Single-signer (simpler, any trusted node, SybilRank handles compromise) or threshold (stronger decentralization, requires DKG/coordination)? Major architectural branch.

3. **Duplicate detection.** Graph-layer sybil resistance (SybilRank) and credential-layer uniqueness are separate problems. Does graph-level detection suffice, or does Mode 2 need additional cryptographic uniqueness enforcement? If so, what mechanism?

4. **Relay architecture.** Node network as relay? WebRTC for direct connections? Hybrid? Relay nodes see metadata — is that acceptable, or do we need relay privacy?

5. **Revocation.** Compromised issuer node: what happens to credentials it already signed? Options: time-bounded credentials (expire naturally), accumulator-based non-revocation proofs (complex), social-graph revocation (loss of trust score invalidates). This is a critical gap — without revocation, a compromised node's credentials persist indefinitely.

6. **Bundle policy.** Who defines SMP bundles? User (when approving)? Domain (assessment schema)? Node network (policy consensus)?

### Implementation Decisions (require Adam's review per CLAUDE.md crypto boundary)

7. **Credential expiration model.** Fixed TTL? Renewable? Tied to assessment version?

8. **Schema versioning.** How do credential schemas evolve? Can a v2 schema credential be verified against a v1 verifier?

9. **Proof-session binding.** Exact challenge derivation for binding BBS+ proofs to OTR sessions. Needs spec-level detail before implementation.

10. **Issuer key rotation.** How do nodes rotate BLS12-381 signing keys? How does the network learn about new keys? What happens to credentials signed under old keys?

11. **Fact derivation.** How do assessments deterministically produce facts? Hash chains? Direct mapping? This affects credential verifiability.

12. **Compromised node recovery.** When a node is detected as compromised, what is the revocation propagation path for credentials it issued?

13. **Seed node impact.** SybilRank anchors trust in seed nodes. If issuance authority derives from SybilRank scores, seed node selection directly affects who can issue credentials. How is seed selection governed in this context?

### Validated

- OTR, SMP, BBS+ compose correctly — OTR wraps sessions, SMP handles knowledge verification, BBS+ handles selective disclosure
- BBS+ on BLS12-381: functional in existing libraries. ~400-1500 byte proofs. Threshold variant exists academically and in implementation.
- NaCl and BLS12-381 coexist without conflict
- SMP and OTR existing JS libraries are unmaintained — custom implementations required. These are non-trivial: constant-time requirements, side-channel concerns, and protocol subtleties demand careful implementation and review.

---

## Changelog

- **v1:** Credential-first architecture. Inverted Adam's priorities. Wrong technical details (sig sizes, SMP timing). Premature commitments (threshold issuance, on-chain nullifiers). Ignored social trust graph.
- **v2:** Rewritten SMP-first. Correct technical details. Integrated with SybilRank/Updraft/trust flows. Removed premature commitments. But: missing domain separation, deterministic serialization, session binding, threat model, issuer/relay trust distinction.
- **v3:** Added security invariants (domain separation, serialization, replay protection). Separated issuer and relay trust surfaces. Added threat model coverage per SECURITY.md. Tightened SybilRank language. Separated graph-layer and credential-layer sybil problems. Expanded open questions. Removed tutorial framing.

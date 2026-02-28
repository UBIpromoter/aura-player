# Aura Player Backend Architecture — v2

*Building out Adam's spec. His tools, his four pillars, his architecture.*

---

## Two Modes of Fact Approval

Adam's spec defines two ways users approve fact sharing. These are the two primary flows — everything else serves them.

### Mode 1: "Verify What You Know" (SMP)

The default. Most evaluation happens here.

A player already knows something about a subject. The subject has that fact locally. SMP confirms the match — neither party transmits the fact.

```
Player                              Subject
  |                                    |
  | secret = H("twitter" ||            | secret = H("twitter" ||
  |   "@adamstallard")                 |   "@adamstallard")
  |                                    |
  | ---- SMP Message 1 -------------> |
  | <--- SMP Message 2 -------------- |
  | ---- SMP Message 3 -------------> |
  | <--- SMP Message 4 -------------- |
  |                                    |
  | Result: MATCH ✓                    | Result: MATCH ✓
```

The player learns nothing new. The subject reveals nothing. Four messages, two round trips.

**Bundling against guessing:** For low-entropy facts (personality type has 16 values; location has predictable options), facts are concatenated before hashing:

```
secret = H("twitter" || "@adamstallard" || "email" || "adam@example.com")
```

The player must know ALL bundled facts or the comparison fails. The bundle definition is set by the user when they approve SMP verification for those facts. This is Adam's answer to the guessing problem.

### Mode 2: "Share Directly" (BBS+)

Opt-in. The user chooses to reveal specific facts to a selected player.

The user holds a BBS+ credential — a signed set of facts. They generate a zero-knowledge proof revealing only chosen facts. The verifier checks the proof against the issuer's public key.

```
Subject                              Player
  |                                    |
  | BBS+ ProofGen:                     |
  |   disclosed = [personality_type]   |
  |   hidden = [everything else]       |
  |                                    |
  | --- ZK proof (~400-1500 bytes) --> |
  |                                    |
  |                              ProofVerify against
  |                              issuer public key
  |                              → Valid / Invalid
```

The player sees only what the subject chose to disclose. Undisclosed facts are cryptographically hidden.

### OTR Wraps Both Modes

Both SMP comparisons and BBS+ proof exchanges happen inside OTR sessions:

1. DH key exchange → shared secret → session keys
2. All messages encrypted with symmetric keys
3. Authenticated with HMAC (symmetric — both parties can produce)
4. DH ratchet rotates keys per exchange
5. Session ends → old MAC keys published
6. Historical transcript becomes forgeable by anyone

This delivers plausible deniability: during the session, the player is convinced. After it ends, they hold nothing cryptographically binding. Nobody can prove the exchange happened.

---

## Mapping to Adam's Four Pillars

### Privacy

| Adam's goal | Mechanism |
|-------------|-----------|
| "Share just the facts or parts of facts a user chooses" | BBS+ selective disclosure (Mode 2) |
| "Plausible deniability: a user proves a fact, but the player can't share it further" | OTR session — symmetric MACs + key revelation make transcript forgeable |
| "Allow a player to verify they know approved facts, but they can't learn anything new" | SMP (Mode 1) — player confirms existing knowledge, learns nothing |
| Facts can be bundled to discourage guessing or griefing | SMP: concatenated hash. BBS+: application-level policy requiring co-disclosure of related facts |

### Evaluation

**"Most players evaluate subjects using information they already know."**

SMP is the primary mechanism. The share-nothing architecture means most evaluation requires zero credential infrastructure — just two parties and a relay for four messages. This is why it scales.

**"Players must corroborate to ensure they're discussing the same subject."**

SMP between players. Both hash identifying information they believe they share about the subject. SMP confirms they're evaluating the same person without either revealing the identifying details to the other.

**"Players need assurance that a subject hasn't been verified multiple times under different identities."**

This is the hard problem. Adam's existing system addresses sybil resistance through the social graph — SybilRank detects clusters, trust flows from teams through evaluations, random walk auditing catches inconsistencies. The privacy architecture needs to integrate with this rather than replace it.

Options for discussion with Adam:
- **Domain-scoped pseudonyms:** When presenting BBS+ proofs, the subject produces a deterministic pseudonym per verifier domain. Same person + same domain = same pseudonym. Detectable reuse within a domain without cross-domain linking. (This only applies to Mode 2 — Mode 1 has no proof artifact to link.)
- **Social graph detection:** The existing SybilRank + Aura evaluation model already detects when the same person appears under multiple identities. Players who evaluate subjects build a web of corroborations — inconsistencies surface through the scoring algorithm.
- **Private set intersection:** Players can privately check whether their evaluation targets overlap without revealing who they're evaluating.

This needs Adam's input on which approach (or combination) fits the existing trust model.

### Scalability

**"Scalable to billions of participants."**

Both primary protocols are pairwise and on-demand:
- SMP: 4 messages between two parties. No global state. No server.
- OTR: session between two parties. Forward secrecy via ratchet.
- BBS+ proof verification: stateless. Verifier needs only the issuer's public key and the proof.

No global consensus is needed for any verification operation. The node network handles credential issuance and scoring, but verification is fully peer-to-peer.

**"Leverage existing BrightID (Aura) node network and deploy protocols as node software."**

The three protocols deploy as node software alongside the existing Aura scoring algorithm:
- BBS+ signing capability added to nodes (BLS12-381 alongside existing NaCl/Ed25519)
- Nodes serve as message relays for SMP and OTR sessions between clients
- Nodes continue running weighted SybilRank on node domains
- Trust in signing nodes is determined by the social graph, not just by key distribution

### Decentralization

**"No centralized actor should be able to block operations or decrypt private data."**

**How the trust model integrates:**

Adam's decentralization article describes node domains, weighted SybilRank scoring, random walk auditing (HOPS = log₁₀(N)), Updraft ratification, and team-based trust flows. The privacy architecture fits within this:

| Component | Trust source |
|-----------|-------------|
| Which nodes can issue credentials? | Node domain scoring via SybilRank — only nodes the network considers trustworthy sign credentials |
| Which nodes are trustworthy relays? | Same node domain evaluation — relay trustworthiness is a dimension of node evaluation |
| Which credentials are valid? | Issuer's public key, which is associated with a scored node (or set of nodes) |
| Which team's credentials carry weight? | Updraft public ratification determines team score weighting |

**Credential issuance — two options to discuss:**

1. **Single-signer with user blinding:** Each trusted node signs credentials independently. The user blinds facts before submission (the node signs a commitment, never sees plaintext). Simpler. Any trusted node can issue. Revocation = node loses trust score.

2. **Threshold signing (t-of-N):** Multiple nodes must cooperate to sign. No single node holds the full signing key. More complex (requires DKG, signer coordination, liveness), but eliminates single-node trust dependency. The academic foundation exists (Doerner et al., IEEE S&P 2023). Dock's library implements it.

Adam's spec says "deploy protocols as node software" and "no centralized actor should be able to block operations." Option 2 is stronger on the second point, but option 1 is deployable sooner and the trust model (SybilRank) already handles compromised nodes. This is a design decision for Adam.

**Verification is fully peer-to-peer:**
- SMP runs directly between participants — no server involvement
- BBS+ proofs are verified against the issuer's public key — no server needed
- OTR sessions are end-to-end — relay sees only encrypted traffic

**What needs to be shared (minimal):**
- Issuer public keys (via node network endpoint or on-chain)
- Node trust scores (via Aura scoring algorithm)
- Updraft campaign results (for public node reputation)

**What stays local:**
- Facts (generated from assessments, stored on device)
- Credentials (signed facts, stored on device)
- Proofs (generated per-session, ephemeral)
- SMP secrets (derived from local facts per-session)

---

## Data Flow

### 1. Fact Generation

User completes assessments in Aura Player. Answers produce local facts stored on device. The user decides which facts to make available for SMP verification (Mode 1) and/or credential issuance (Mode 2).

### 2. Credential Issuance (Mode 2 only)

When a user wants BBS+ credentials for direct sharing:

```
User                           Trusted Node(s)
  |                                    |
  | Request credential for             |
  | selected facts (blinded)           |
  | ---------------------------------> |
  |                                    |
  |                              Sign (single or threshold)
  |                                    |
  | <--- Signed credential ----------- |
  |                                    |
  | Store credential locally           |
```

The node(s) that sign are those scored as trustworthy by the node domain's SybilRank. The user chooses which node(s) to request from based on Updraft rankings.

### 3. Evaluation Session

A player initiates a session to evaluate a subject:

```
Player                              Subject
  |                                    |
  | ---- OTR key exchange ----------> |  (establishes encrypted channel)
  |                                    |
  | [Mode 1: SMP checks]              |
  | H(bundled_facts) vs H(same)       |  (4 messages per check, player learns nothing new)
  |                                    |
  | [Mode 2: selective disclosure]     |
  | "Share your personality type"      |  (subject chooses whether to generate BBS+ proof)
  |                                    |
  | <--- BBS+ ZK proof --------------- |  (only if subject consents)
  | Verify against issuer PK           |
  |                                    |
  | ---- Session end ----------------> |
  | Publish old MAC keys               |  (transcript becomes forgeable)
```

Mode 1 (SMP) requires no credential infrastructure. Mode 2 (BBS+) requires the subject to have obtained a credential first.

### 4. Corroboration Between Players

Two players confirm they're evaluating the same subject:

```
Player A                            Player B
  |                                    |
  | ---- OTR session ----------------> |
  |                                    |
  | H(canonical identifying info)      | H(same canonical identifying info)
  | ---- SMP --------> <--- SMP ------ |
  |                                    |
  | MATCH: same subject                |
```

Neither player reveals the subject's identity to the other. Both confirm they're talking about the same person.

---

## Integration with Existing Aura Infrastructure

### Where Each Protocol Deploys

| Protocol | Runs on | Integrates with |
|----------|---------|----------------|
| SMP | Client-to-client (via node relay) | Aura evaluation flow — player confirms knowledge of subject |
| BBS+ signing | Trusted nodes (node software) | Node domain scoring — only scored nodes issue credentials |
| BBS+ verification | Client (verifier-side) | Standalone — needs only issuer public key |
| OTR | Client-to-client (via node relay) | Session management — wraps all evaluation interactions |
| Weighted SybilRank | Nodes (existing) | Determines which nodes are trusted issuers/relays |
| Updraft | Public (existing) | Determines which teams and nodes the public trusts |

### Existing Backend Boundary

The app currently isolates backend communication to ~5 functions. New protocol functions extend this same boundary. The exact API depends on implementation decisions (particularly single-signer vs. threshold), but the pattern is the same: isolated functions, backend-agnostic app code.

### NaCl and BLS12-381 Coexist

BrightID nodes currently use NaCl (Ed25519/X25519) for identity and signing. BBS+ uses BLS12-381. These are independent systems — additive, not replacement. Nodes add BLS12-381 capability for credential issuance alongside existing NaCl operations.

---

## Open Questions

### For Adam — the genuinely hard ones:

1. **Credential schema.** Which facts from the assessment system should be credential-eligible for Mode 2? All of them, or a curated set? Should continuous scores be bucketed to reduce guessing surface?

2. **Issuance model.** Single-signer with user blinding (simpler, any trusted node can issue) or threshold signing (stronger decentralization, more complex)? The trust model (SybilRank) handles compromised nodes either way — the question is whether cryptographic enforcement is worth the coordination cost.

3. **Duplicate detection.** Your spec says subjects shouldn't be verified multiple times under different identities. The social graph (SybilRank) already catches this at the graph level. Do we need additional cryptographic detection (domain-scoped pseudonyms, private set intersection), or does the existing sybil resistance suffice?

4. **Relay architecture.** SMP and OTR need message relay between clients. Deploy through the node network (nodes already serve as network infrastructure)? WebRTC for direct connections where possible?

5. **Revocation.** When a user's facts change or a node loses trust, how are existing credentials invalidated? Accumulator-based non-revocation proofs? Time-bounded credentials that expire? Social-graph-based revocation where loss of trust score invalidates associated credentials?

6. **Bundle policy.** Who defines which facts must be bundled together for SMP verification? The user (when approving verification)? The domain (defined in the assessment schema)? The node network (via policy consensus)?

### What we've already validated:

- The three protocols (OTR, SMP, BBS+) compose correctly — OTR wraps sessions, SMP handles knowledge verification, BBS+ handles selective disclosure
- BBS+ credential issuance and verification work on BLS12-381 via Dock's library (the only JS/WASM package with the full feature set: selective disclosure, accumulators, pseudonyms, threshold signing)
- NaCl and BLS12-381 coexist without conflict — additive migration
- Threshold BBS+ is academically proven (Doerner et al., IEEE S&P 2023) and implemented in Dock's library — available if the issuance model calls for it
- SMP and OTR need custom implementations (existing JS libraries are unmaintained) — but both protocols are well-specified and straightforward to implement against the specs using modern Web Crypto API

---

*Adam's architecture. His tools serve his system. We build what he designed.*

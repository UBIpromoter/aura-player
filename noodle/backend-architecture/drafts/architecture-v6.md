# Aura Assessment Credentials — Implementation Notes

Working from [Architectural goals for the Aura Player App](https://hackmd.io/7OUrHXl8Tau5urjHYtUa3g) and [Decentralizing BrightID with Aura](https://hackmd.io/xKEcuzstQp2o8XIvve6KtA). This follows your spec section by section — what we've built toward, what we hit, where we'd suggest a simpler path, and where we need your input.

Two main findings: (1) Foxx likely can't run BLS12-381 WASM synchronously — sidecar needed for Mode 2, and (2) the architecture phases naturally into Mode 1 first (no credential infrastructure) then Mode 2 later (full BBS+ stack). Mode 1 delivers most of what the spec asks for without the hardest pieces.

---

## Privacy

### "Users generate local facts about themselves as they answer questions"

All Aura scoring is deterministic — same responses always produce identical results. No randomness, no external state.

Three tiers of facts, each with different properties:

| Tier | Examples | Possible values | Safe to verify alone? |
|------|----------|-----------------|----------------------|
| Continuous (0-100) | Big Five, Shadow, Risk subcategories, 20+ Starter Pack constructs | 101 per score | Yes, if bundled by category (101^5 for Big Five = ~10 billion) |
| Categorical | Attachment style (4), Chronotype (3), Reasoning level (4) | 3-7 | No. Must bundle with continuous scores. |
| Composite | Archetype (29 patterns), aura viz modifiers | 29+ | Marginal. Bundle. |

### Mode 1: SMP — "verify they know approved facts, but they can't learn anything new"

Works as spec'd. SMP confirms match — four messages, two round trips, neither party transmits the fact. Subject controls participation — player requests, subject decides whether to engage.

Bundle entropy matters. Minimum safe bundles:

| Bundle | Entropy |
|--------|---------|
| All 5 Big Five scores | ~10 billion combinations |
| All 3 Shadow scores | ~1 million |
| Risk overall + 4 subcategories | ~10 billion |
| Single categorical label | 3-7. **Never expose alone.** |

Secret construction uses domain separation:
```
secret = H("aura:smp:v1" || stable_serialize(bundle))
```

### Mode 2: BBS+ — "share just the facts or parts of facts a user chooses"

Each assessment fact maps to one slot in a BBS+ credential. The user picks which slots to reveal; undisclosed slots are mathematically hidden.

Session binding prevents replay:
```
challenge = H("aura:proof-challenge:v1" || session_id || nonce)
```

Co-disclosure policy enforces bundling at the schema level — certain attributes must be revealed together or not at all. Application-level, not native to BBS+.

**Credential signing — two approaches:**

1. **Blind issuance.** The issuer signs a sealed commitment — it verifies the envelope is well-formed but never sees the scores inside. Dock's `@docknetwork/crypto-wasm-ts` implements this (IETF `draft-irtf-cfrg-bbs-blind-signatures-02`). This is the only approach where no centralized actor ever sees a user's assessment data.

2. **Standard issuance.** The issuer sees the scores and signs them directly. This is how every certificate authority in the world works — the signer sees what they sign. Simpler, every BBS+ library supports it, well-understood security model.

We believe blind issuance is the right target because of your "no centralized actor can decrypt private data" rule — standard issuance violates it at the moment of signing. But there's a case for starting with standard issuance: it's simpler to implement, battle-tested, and the fabrication concern that blind issuance raises is actually a non-issue either way. Assessment scores are self-reported — users can already answer dishonestly, have an AI coach them, or not even realize their self-perception is inaccurate. Verifying scores at signing time doesn't solve dishonesty. The Aura trust graph is where reliability lives — over time, through evaluations, the network develops a sense of who's reliable and in what context. A credential is only as meaningful as the Aura-verified trust behind the identity that holds it.

**A possible path:** Start with standard issuance to get Mode 2 working. Upgrade to blind issuance when the IETF spec finalizes and the tooling matures. The privacy cost is limited to the issuance moment, mitigated by only allowing high-trust nodes (per domain scoring) to issue. Your call on whether that temporary cost is acceptable or whether blind issuance is a day-one requirement.

### "Plausible deniability: a user proves a fact, but the player can't share it further"

**Mode 1 (SMP): fully deniable.** After the session, neither party holds transferable proof. The verifier knows the result but holds nothing a third party can check. Just their word.

**Mode 2 (BBS+): not deniable.** BBS+ proofs are non-interactive zero-knowledge proofs — publicly verifiable, transferable by nature. The encrypted session layer makes the *transport* deniable (can't prove the session happened), but the proof itself survives extraction.

This is the right split. Mode 1 is "I showed you" — private, deniable, nothing changes hands. Mode 2 is "I gave you this" — portable, verifiable, yours to keep. Selective disclosure requires non-interactive proofs, and non-interactive proofs are inherently transferable. Your spec already separates these into two approval methods. The deniability property follows the mode the user chooses.

### "Bundle to discourage guessing or griefing"

**Guessing:** Solved. Bundled hashes with minimum entropy thresholds per the table above.

**Griefing:** Broader problem. We interpret this as any adversarial use of the verification system — probing for sensitive facts, time-wasting, harassment, automated agents running verification requests at scale. Bundling handles the information-extraction angle. For the rest: rate limiting at the session layer, subject veto over every verification, and the existing $1 BrightID sponsorship cost as an economic floor against mass spam. Let us know if you have specific griefing patterns in mind — each subtype may need a different defense.

### OTR wraps both modes

Per spec. Encrypted sessions with forward secrecy wrap both SMP and BBS+ exchanges.

We know you and Ali have chosen a specific variant and are excited about it. Our doc is written to be agnostic to the version — whichever you've picked slots right in. One thing we'd want to understand: the ratchet behavior (per-exchange vs per-message) affects the session flow implementation.

**One consideration on the session layer:** Existing OTR JavaScript libraries are unmaintained. A custom implementation means constant-time requirements, security audits, and real side-channel risks in JS. There are battle-tested encrypted channel libraries (Noise Protocol powers WhatsApp and WireGuard; libsodium is everywhere) that provide encrypted sessions with forward secrecy out of the box. What they don't provide is OTR's specific post-session deniability — the MAC key publication trick.

If post-session deniability is essential for Mode 1, OTR is the right tool and the custom implementation is worth it. If the primary need is encrypted forward-secret sessions (which both Noise and libsodium provide), a battle-tested library gets you there faster and more safely. You could add OTR's deniability properties later as an upgrade. You've almost certainly already thought about this — just want to make sure we're not overlooking a simpler path to the same goal.

OTR hides content, not metadata. Relay nodes see who, when, frequency.

---

## Evaluation

### "Most players evaluate subjects using information they already know"

SMP handles this — your "share nothing architecture." No credential infrastructure needed. Two parties and a relay. This is the primary mode and it works before any signing, issuance, or node changes exist. Mode 2 is the opt-in layer on top for when someone wants portable proof.

### "Players must corroborate without publicly revealing subject information"

SMP between players. Both hash canonical identifying information about the subject. SMP confirms same person without revealing identifiers.

Different domains need different corroboration evidence — "same person" in human uniqueness requires different evidence than "same person" in personality assessment. This maps to the node domain architecture from the [decentralization article](https://hackmd.io/xKEcuzstQp2o8XIvve6KtA).

### "Players need assurance against duplicate verification under different identities"

Two independent layers:

**Graph layer (existing):** The scoring algorithm detects structural anomalies — low-trust clusters, abnormal energy flow. Random walk auditing (HOPS = log₁₀(N)) catches inconsistencies. This operates on the evaluation graph regardless of privacy protocols.

**Credential layer (Mode 2):** The specific attack: a subject gets credentials under two identities and presents proofs from both. The primary defense is Aura verification — anyone can create a BrightID, but getting one verified as a unique human through the Aura player network is the gate. Bot armies can inflate their own corners of the graph, but they can't fake connections into the verified core. The $1 sponsorship cost prevents mass creation. Additional mechanisms (domain-scoped pseudonyms) are possible but may not be needed if the graph layer is sufficient.

These are different problems. Graph anomaly detection and credential uniqueness enforcement work in parallel, not in sequence. Neither replaces the other.

---

## Scalability

### "Scalable to billions of participants"

Both primary protocols are pairwise and on-demand — private conversations between two parties. No global consensus for any verification operation. A billion simultaneous verifications don't interfere with each other. This scales by design.

Binding constraints at billion-user scale:

| Dimension | Analysis |
|-----------|----------|
| **Relay bandwidth** | Likely binding. Millions of concurrent sessions need capacity planning. Each SMP = 4 messages × ~256 bytes. Distributable across relay nodes. |
| **Issuer throughput** | Moderate. Each signing operation takes ~10-50ms. 100 issuers at 100 sigs/sec = 864M credentials/day. Sufficient if issuance is infrequent. |
| **Scoring algorithm** | Potentially binding. Running on a graph with billions of nodes may need distributed computation or incremental updates. |
| **Key distribution** | Not binding. Issuer public keys are 96 bytes. Hundreds of issuers = trivial. |
| **Credential storage** | Not binding. Users store credentials locally. |

### "Deploy protocols as node software"

**Foxx likely can't run BLS12-381 WASM synchronously.**

Foxx is ArangoDB's embedded V8 — synchronous-only, no Promises, no async. Dock's BBS+ library is a multi-megabyte WASM module, likely at the edge of or beyond V8's sync compilation limit. Each Foxx service loads into multiple V8 isolates, multiplying memory. The [one documented WASM-in-Foxx case](https://github.com/arangodb/arangodb/issues/7334) (2018) was a trivial function.

**Proposed:** A helper service running alongside each node. Foxx handles graph and data. The helper handles signing, verification, and session management. Communication via `@arangodb/request`.

```
┌─────────────────────────────────────────────┐
│  BrightID Node (existing Docker stack)      │
│                                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │ ArangoDB │◄─┤ Foxx API │  │ consensus │  │
│  │ (graph)  │  │ (REST)   │  │ + scorer  │  │
│  └─────────┘  └──┬───────┘  └───────────┘  │
│                  │ HTTP (sync or queued)     │
│                  ▼                           │
│  ┌───────────────────────────────────────┐  │
│  │ aura-credentials sidecar (Node.js)    │  │
│  │  BBS+ signing + verification          │  │
│  │  SMP + session management             │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

You know this infrastructure far better than we do — there may be a better shape. The key constraint: the BBS+ WASM module needs a full async-capable JS or Rust runtime. Foxx doesn't provide that.

NaCl (Ed25519/X25519) and BLS12-381 coexist. Existing WI-Schnorr operations stay in Foxx. BBS+ goes to the sidecar. Additive, not replacement.

**Note:** The sidecar is only needed for Mode 2. Mode 1 (SMP over encrypted sessions) runs client-to-client via relay — no node changes required. If Mode 1 ships first, the sidecar can come later.

---

## Decentralization

### "No centralized actor should be able to block operations or decrypt private data"

**Block operations:** Issuance authority derives from the scoring system — many independent nodes, deterministic computation on identical data snapshots. No single node can block. Majority collusion is the real threat: colluding nodes would need to dominate energy flow without triggering structural anomaly detection (random walk auditing, Updraft public ratification). This is inherent to any decentralized scoring system — and it's what the scoring algorithm is specifically designed to catch.

**Decrypt private data:** In Mode 1, no data leaves the client — SMP operates on locally held facts. In Mode 2 with blind issuance, the issuer sees a commitment but gains zero information about scores. With standard issuance, the issuer sees scores at signing time — a temporary privacy cost mitigated by node trust scoring. OTR is end-to-end encrypted. Relays see who's talking but not what about.

**Issuer vs relay — two distinct trust surfaces:**

| Role | Trust requirement | Trust source |
|------|-------------------|-------------|
| Issuer | Must not issue fraudulent credentials | Domain-specific node scoring. Different credential types → different issuer sets. |
| Relay | Must deliver without tampering. Sees metadata. | Lower trust threshold than issuance. |

### Node domains

Per the [decentralization article](https://hackmd.io/xKEcuzstQp2o8XIvve6KtA): each domain gets a corresponding node domain determining which nodes are trusted for that domain. A node trusted for human uniqueness issuance is not automatically trusted for personality assessment issuance. This maps credential types to domain-specific issuer sets.

Currently not implemented in code — evaluations use `domain: "BrightID"` only. The Evaluate operation already supports arbitrary domain/category fields, so the data model is ready.

### Scoring, Updraft, Teams

The scoring algorithm runs on periodic snapshots deterministically. The architecture doesn't couple to a specific algorithm — if the scoring approach changes, nothing in the credential system breaks.

Updraft determines which nodes are trusted per domain through prediction market incentives — early correct opinions earn rewards, distortion costs money. A node's Updraft standing in the relevant domain campaign affects its issuance authority.

Teams provide resilience — independent energy flows, independent scores. If one team is compromised, others remain. Open question: are credentials team-scoped? Can a credential from Team A be verified by someone who only trusts Team B?

### Auditing and privacy

Random walk auditing operates on the evaluation graph structure (who evaluated whom — posted to IDChain, public and auditable). The encrypted session layer protects session content (SMP results, BBS+ proofs). These layers don't conflict — auditing works on graph structure, privacy works on conversation content.

---

## Phased Delivery

The architecture phases naturally. Mode 1 delivers most of the spec with none of the hardest infrastructure.

### Phase 1 — Mode 1: "Share Nothing"

**What ships:** SMP verification over encrypted sessions, client-to-client via relay.

**What it delivers:**
- "Verify they know approved facts, can't learn anything new" ✓
- "Plausible deniability" ✓
- "Bundle to discourage guessing" ✓
- "Most players evaluate using information they already know" ✓
- "Corroborate without publicly revealing" ✓
- Scalable (pairwise, no global state) ✓

**What it doesn't need:** No credential issuance. No BBS+. No sidecar. No node changes. No signing keys.

**What it needs:** SMP implementation + encrypted session layer + relay infrastructure.

**Simpler session option:** If post-session deniability is not required at this phase, a battle-tested encrypted channel library (Noise, libsodium) replaces the OTR implementation entirely. Custom OTR can come in Phase 2 or as an upgrade.

### Phase 2 — Mode 2: "Share Directly"

**What ships:** BBS+ credential issuance and selective disclosure.

**What it adds:**
- "Share just the facts or parts of facts a user chooses" ✓
- Portable, verifiable credentials
- Duplicate detection at the credential layer

**What it needs:** BBS+ library (Dock), sidecar on nodes, signing key management, credential schemas, issuance authority from domain scoring.

**Simpler signing option:** Start with standard issuance (issuer sees scores). Upgrade to blind issuance when the IETF spec matures. The privacy cost is limited to the issuance moment and mitigated by node trust scoring.

**Simpler signing infrastructure:** Start with single-signer (any node above domain threshold). Upgrade to threshold signing (t-of-N) when single-signer is stable. Doerner et al. (IEEE S&P 2023) provides the foundation; Dock implements it.

By the time Phase 2 ships, the blind signing spec may be finalized, OTR libraries may have improved, and Phase 1 will have provided real production experience with the session layer and relay infrastructure.

---

## Security Invariants

These apply to all constructions in both phases.

### Domain separation

| Construction | Tag |
|--------------|-----|
| SMP bundle hash | `"aura:smp:v1"` |
| BBS+ credential schema | `"aura:credential:v1:{schema_id}"` |
| BBS+ proof challenge | `"aura:proof-challenge:v1"` |
| Session binding | `"aura:session:v1"` |
| Blind issuance commitment | `"aura:blind-commit:v1:{schema_id}"` |
| Pseudonym derivation | `"aura:pseudonym:v1:{domain_id}"` |

Tags are versioned. Changing a tag = new protocol version.

### Deterministic serialization

BBS+ signs ordered message arrays, not JSON. The pipeline:

```
JSON fact → canonical_serialize → UTF-8 bytes → hash-to-scalar → BBS+ message slot
```

Each credential attribute maps to one message slot. Fixed per schema version. What is the canonical serialization format in the BrightID node codebase? We used `fast-json-stable-stringify` in our SECURITY.md spec — want to confirm that's aligned.

### Constant-time operations

SMP in JavaScript: native BigInt is not guaranteed constant-time. Real implementation risk. The sidecar's Rust-compiled WASM benefits from constant-time libraries, but any JS protocol code must be audited for timing leaks.

### Threat model

| Threat | Mitigation |
|--------|------------|
| Sybil nodes | Scoring algorithm detects clusters. Issuance tied to domain score. Threshold signing (Phase 2) eliminates single-node compromise. |
| Network observation | Encrypted sessions hide content. Metadata visible to relays. Relay diversity distributes exposure. |
| Replay | Session-bound proofs. Nonces in issuance requests. Key ratchet for forward secrecy. |
| Compromised node | Single-signer: time-bounded credentials expire naturally. Threshold: no single compromise produces valid sigs. |
| Malicious verifier | Learns only disclosed attributes. Can extract and transfer BBS+ proof (inherent to Mode 2 — user opted in). |
| Fabricated assessments | Scores are self-reported. Signing (blind or standard) doesn't prevent dishonesty. Defense: credential weight tied to Aura-verified trust behind the identity. |
| Griefing at scale | Bundling prevents information extraction. Rate limiting + subject veto handle harassment. $1 sponsorship cost creates economic floor. |

---

## Where We Need Your Input

1. **Relay architecture.** Node network as relay? WebRTC for direct connections? Hybrid? Relay metadata exposure acceptable or do we need relay privacy?

2. **Team credential scoping.** Are credentials from different teams interoperable? Can a verifier accept a credential issued by Team A if they only trust Team B? Or does the Updraft-weighted overall score bridge across teams?

3. **Phase 1 session layer.** You and Ali have chosen an OTR variant. Is post-session deniability essential for Phase 1, or can we ship with a simpler encrypted channel and add deniability later?

4. **Blind issuance timing.** Is blind issuance a day-one requirement for Mode 2, or can we start with standard issuance and upgrade? The privacy cost of standard issuance is limited to the signing moment and mitigated by node trust.

5. **Domain scoping for assessments.** Beyond human uniqueness, do personality assessments become their own domain with their own node trust and Updraft campaign? Or does everything ride on the BrightID domain for now?

6. **AI entity uniqueness.** For humans, Aura verification is the uniqueness gate — one body, one verified identity. For AI, there's no equivalent anchor. A persistent AI with memory and relationships is different from an ephemeral agent. Is AI uniqueness an extension of what Aura already does, or a different problem needing its own domain?

7. **Sidecar shape.** We proposed a Node.js container alongside the existing stack. You know this infrastructure — is there a better deployment model?

---

## What We've Confirmed

- All Aura scoring is deterministic. Same inputs → identical outputs. Every fact type mapped with entropy profiles.
- BBS+ selective disclosure works as spec'd. Dock implements blind issuance variant. IETF spec is draft status.
- SMP fully deniable. BBS+ proofs are not — inherent to non-interactive proofs, not a bug. The two-mode split handles this correctly.
- Foxx likely can't run Dock's multi-megabyte BLS12-381 WASM synchronously. Sidecar is the likely path for Mode 2.
- NaCl and BLS12-381 coexist. Additive, not replacement.
- SMP/OTR JS libraries are unmaintained. Custom implementations required — constant-time, side-channel-aware. Battle-tested alternatives exist for the encrypted channel layer.
- The architecture phases cleanly: Mode 1 (share nothing) ships without credential infrastructure. Mode 2 (share directly) adds it when ready.
- Assessment scores are self-reported. The trust graph is where reliability lives, not the signing layer.

# Aura Credentials — Build Plan

How we'd build what your spec describes, in the order that makes sense. Phase 1 ships verification without any credential infrastructure. Phase 2 adds portable credentials when the foundation is proven.

---

## What exists today

The assessment engine is operational. 20+ assessments produce deterministic scores across continuous (Big Five, Shadow, Risk), categorical (Attachment, Chronotype), and composite (Archetype) tiers. Scoring is pure — same inputs, same outputs, any machine. Facts are ready to be verified.

The client is a single `index.html` running React, deployed on GitHub Pages. No bundler in production. This matters for how we load the new capabilities.

---

## Phase 1 — "Show a Player"

SMP verification over encrypted sessions. Client-to-client via relay. No node changes.

### 1. Bundle construction

The first thing to build. Take assessment results from the existing scoring engine, serialize canonically, hash into SMP secrets.

```
bundle = { openness: 72, conscientiousness: 85, ... }
secret = H("aura:smp:v1" || canonical_serialize(bundle))
```

**Serialization:** Keys sorted alphabetically, values as fixed-precision integers (no floating point drift). The canonical form must be identical across any implementation. We'd use a minimal custom serializer rather than depending on `JSON.stringify` key ordering, which isn't guaranteed by spec.

**Bundle composition:** The client constructs bundles according to co-disclosure rules — categorical facts always bundled with continuous ones. The rules are defined once in a schema and enforced at bundle construction time. A verifier who doesn't know the full bundle gets nothing.

### 2. SMP implementation

No usable JavaScript library exists. The protocol is well-specified (four messages, two round trips) and the math is straightforward — modular exponentiation and hash functions built on primitives that already exist in libsodium-wrappers or Web Crypto API.

**What we'd build:** A standalone SMP module — ~300-500 lines of JS. Takes a secret (the bundle hash), produces the four protocol messages, returns a boolean match result. Constant-time comparisons throughout.

```
aura-smp/
  smp.js          — protocol state machine
  serialize.js    — canonical bundle serialization
  bundles.js      — co-disclosure rules, bundle composition
```

**Testing:** The SMP module can be tested entirely offline — two instances, shared secret, verify match. No network, no relay, no session layer needed. This is the first deliverable.

### 3. Session layer

This wraps SMP messages in an encrypted channel with forward secrecy. Two paths depending on your OTR decision:

**Path A — OTR (your pick with Ali):**
Custom implementation. The protocol is well-documented but JavaScript brings real challenges: constant-time arithmetic in a JIT-compiled language, no control over memory layout, garbage collector can leak timing. This is the bulk of the Phase 1 engineering effort — likely 2-4x the SMP work.

The upside is post-session deniability by design. After the session, published MAC keys mean neither party can prove the exchange happened.

**Path B — libsodium (Noise-based):**
`libsodium-wrappers` is 180KB, battle-tested, provides `crypto_kx` for key exchange and `crypto_secretstream` for encrypted streaming with forward secrecy. Session setup is ~20 lines of code.

What you lose: OTR's specific MAC-key-publication trick for post-session deniability. What you keep: encrypted forward-secret channel, no third party can read the exchange, and the SMP result itself is inherently deniable (it's a boolean in memory, not a transferable proof).

**Our recommendation:** Start with libsodium. The SMP result is already deniable — there's nothing to transfer. If post-session deniability of the *channel itself* becomes important, OTR can replace the session layer without touching the SMP or bundle logic. The layers are independent.

### 4. Relay integration

This is where we need your architecture decision. Three options as we see them:

**Nodes as relays:** SMP messages route through BrightID nodes. Nodes see encrypted blobs and metadata (who's talking to whom). Leverages existing infrastructure. Adds bandwidth load to nodes.

**WebRTC direct:** Peers connect directly after a signaling exchange. Nodes or a lightweight signaling server handle the initial handshake. No relay bandwidth after connection. NAT traversal adds complexity.

**Hybrid:** Signaling through nodes, data direct via WebRTC. Falls back to node relay when direct connection fails.

The SMP and session modules are relay-agnostic — they produce and consume messages. The transport is a separate concern.

### 5. Client integration

```
index.html                    — existing app, no changes
aura-crypto.js                — single script tag, loads everything
  ├── smp.js                  — SMP protocol
  ├── serialize.js            — canonical serialization
  ├── bundles.js              — bundle composition rules
  ├── session.js              — encrypted sessions (libsodium or OTR)
  └── libsodium-wrappers.js   — 180KB, or OTR implementation
```

One `<script>` tag in `index.html`. The existing app calls `window.auraCrypto.startVerification(bundle)` and gets back a boolean. Everything else is internal.

### Phase 1 delivery order

1. **SMP module + tests** — standalone, no dependencies beyond crypto primitives
2. **Bundle serialization + co-disclosure rules** — schema-driven, testable offline
3. **Session layer** — libsodium or OTR, wraps SMP messages
4. **Relay adapter** — depends on your architecture decision
5. **Client integration** — wire into existing UI, verification flow UX

Items 1-3 can start immediately. Item 4 needs your relay decision. Item 5 is the last mile.

---

## Phase 2 — "Share with a Player"

BBS+ credential issuance, selective disclosure, and the sidecar service. This builds on Phase 1 — the session layer carries credential exchanges the same way it carries SMP messages.

### 1. Credential schemas

Before any signing happens, we define what credentials look like. Each assessment type maps to a schema:

```
{
  "schema": "aura:credential:v1:big-five",
  "attributes": [
    { "name": "openness", "type": "integer", "range": [0, 100] },
    { "name": "conscientiousness", "type": "integer", "range": [0, 100] },
    { "name": "extraversion", "type": "integer", "range": [0, 100] },
    { "name": "agreeableness", "type": "integer", "range": [0, 100] },
    { "name": "neuroticism", "type": "integer", "range": [0, 100] }
  ],
  "co_disclosure": ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"],
  "pseudonym_domain": "personality"
}
```

Co-disclosure rules are embedded in the schema — attributes listed together must be revealed together or not at all. The `pseudonym_domain` determines which pseudonym gets embedded for duplicate detection.

This is design work, not engineering. It can happen in parallel with everything else.

### 2. Sidecar service — aura-credentials

Node.js service running alongside each BrightID node. Foxx calls it over HTTP for anything involving BBS+ or session management.

```
aura-credentials/
  server.js           — HTTP API (Express or Fastify)
  signing/
    bbs.js            — BBS+ operations via Dock WASM
    keys.js           — signing key management
    schemas.js        — credential schema registry
  verification/
    proofs.js          — selective disclosure proof verification
    pseudonyms.js      — domain-scoped pseudonym checking
  sessions/
    manager.js         — session lifecycle (reuses Phase 1 session layer)
```

**Key API surface for Foxx:**

```
POST /sign          — issue a credential (schema + attributes → signed credential)
POST /verify        — verify a selective disclosure proof
POST /pseudonym     — check pseudonym against domain registry
GET  /health        — sidecar is running
```

The WASM module loads once at startup. Signing operations are fast (~5ms per credential). The bottleneck is never the sidecar — it's the trust decisions that gate who gets to call it.

### 3. BBS+ integration

Dock's `@docknetwork/crypto-wasm` is the only production BBS+ library. Multi-megabyte WASM module, needs an async-capable runtime (hence the sidecar, not Foxx).

**Standard issuance flow (starting point):**

```
Client                    Foxx                  Sidecar
  |                         |                      |
  |-- request credential -->|                      |
  |                         |-- /sign (attrs) ---->|
  |                         |                      |-- BBS+ sign
  |                         |<-- signed credential-|
  |<-- credential ---------|                      |
```

**Blind issuance flow (upgrade path):**

```
Client                    Foxx                  Sidecar
  |                         |                      |
  |-- commitment + proof -->|                      |
  |                         |-- /blind-sign ------>|
  |                         |                      |-- verify commitment
  |                         |                      |-- BBS+ blind sign
  |                         |<-- blind signature --|
  |<-- blind signature ----|                      |
  |-- unblind locally                              |
  |   (client has credential, nobody saw values)   |
```

The client-side BBS+ operations (proof generation, unblinding) also need the WASM module. This is where the single `<script>` tag approach gets heavy — the WASM is multi-megabyte. Options:

**Lazy loading:** `aura-crypto.js` loads the BBS+ WASM only when the user enters a Mode 2 flow. Phase 1 operations stay lightweight.

**Service worker:** Cache the WASM after first load. Subsequent sessions start instantly.

**CDN:** Host the WASM on a CDN with aggressive caching headers. First load is slow, subsequent loads hit cache.

### 4. Selective disclosure

The user picks which credential attributes to reveal. The proof mathematically demonstrates the disclosed values are part of a valid credential without revealing anything else.

```
credential = { openness: 72, conscientiousness: 85, extraversion: 45, ... }
disclosed  = { openness: 72 }  // only this is visible to verifier
proof      = BBS+.createProof(credential, disclosed, challenge)
```

Co-disclosure enforcement happens before proof creation — the client checks the schema's co-disclosure rules and refuses to create a proof that violates them. This is application-level policy, not cryptographic enforcement.

### 5. Domain-scoped pseudonyms

Each credential embeds a pseudonym derived from the subject's identity and the credential's domain:

```
pseudonym = H("aura:pseudonym:v1:personality" || subject_secret)
```

When a verifier receives a proof, the pseudonym is always disclosed (it's a required attribute in every schema). Verifiers in the same domain can compare pseudonyms across sessions to detect if the same person is presenting credentials from different identities.

The pseudonym reveals nothing about the real identity. Different domains produce different pseudonyms — unlinkable across domains.

### 6. Signing key management

Each authorized node holds a signing key for its domains. Initially straightforward:

```
node_key = generate_bls12381_keypair()
public_key → published to network (other nodes and clients can verify)
private_key → stored in sidecar, never leaves the node
```

**Threshold signing (future upgrade):** Multiple nodes must cooperate to sign. No single node can issue a credential alone. Dock's library supports this. The sidecar API stays the same — the internal coordination happens between sidecars.

### Phase 2 delivery order

1. **Credential schemas** — define attribute mappings for each assessment type
2. **Sidecar scaffold** — HTTP server, health check, Dock WASM loading
3. **Signing endpoint** — standard issuance first
4. **Client BBS+ integration** — WASM loading, proof generation, credential storage
5. **Selective disclosure UI** — user picks what to share
6. **Pseudonym system** — generation, embedding, verification
7. **Foxx integration** — API calls from Foxx to sidecar
8. **Blind issuance upgrade** — when ready

Items 1-2 can start immediately. Item 3 needs signing keys provisioned. Items 4-5 can develop in parallel with 3. Items 6-7 integrate everything. Item 8 is the upgrade path.

---

## What we need to start

**From you, before Phase 1 begins:**
- Relay architecture decision (nodes / WebRTC / hybrid)
- OTR vs libsodium for sessions
- Any existing message format or transport protocol we should align with

**From you, before Phase 2 begins:**
- Team credential scoping decision
- Pseudonym derivation source (BrightID identity or separate secret)
- Domain definitions for personality assessments
- Node key provisioning process
- Credential TTL and revocation policy

**We can start immediately:**
- SMP module implementation and tests
- Bundle serialization and co-disclosure rule design
- Credential schema definitions
- Sidecar service scaffold

Phase 1 items 1-3 and Phase 2 items 1-2 have no external dependencies. That's where we'd begin.

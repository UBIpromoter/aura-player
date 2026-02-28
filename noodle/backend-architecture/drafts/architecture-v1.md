# Aura Player Backend Architecture — First Pass

*Based on Adam's spec. Three protocols, four pillars.*

---

## How the Protocols Stack

Adam specified OTR, Socialist Millionaire, and BBS+. They aren't alternatives — they're layers, each solving a distinct problem:

| Layer | Protocol | Solves |
|-------|----------|--------|
| **Credential** | BBS+ | Issue, store, and selectively disclose facts from questionnaires |
| **Corroboration** | SMP | Players confirm shared knowledge without revealing it |
| **Session** | OTR | Non-transferable proofs + forward secrecy for verification sessions |

```
User answers questions
        ↓
Facts signed as BBS+ credential (threshold issuance across BrightID nodes)
        ↓
User holds credential locally
        ↓
Verification session (OTR channel)
    ├── Selective disclosure (BBS+ proof for chosen facts)
    ├── Knowledge check (SMP — verifier confirms what they already know)
    └── Session ends → MAC keys revealed → proof non-transferable
```

---

## Mapping to Adam's Four Pillars

### Privacy

**"Share just the facts or parts of facts a user chooses."**

BBS+ signs a vector of messages (one per fact) in a single 80-byte signature. The user generates a zero-knowledge proof revealing only chosen facts. Undisclosed facts are cryptographically hidden — the verifier learns nothing about them, not even how many exist.

**"Plausible deniability: a user proves a fact, but the player can't share it further."**

Two mechanisms, reinforcing:
1. BBS+ proofs are ZK — the verifier could have simulated them. Non-transferable by construction.
2. OTR session wrapping — verification happens inside an OTR channel using symmetric MACs. After session, MAC keys are revealed. Anyone could have forged the transcript.

**"Allow a player to verify they know approved facts, but they can't learn anything new."**

SMP. Both parties hash the fact they believe they share. SMP outputs one bit: match or no match. Neither party learns anything beyond equality. The verifier confirms what they already know without the subject disclosing anything.

**"Combine facts into bundles to discourage guessing."**

BBS+ mandatory disclosure pointers. The issuer marks certain facts as must-reveal-together. A user can't present their Twitter handle without also presenting their email — the bundle is enforced cryptographically by the credential structure, not by policy.

For SMP: bundled facts are concatenated and hashed into a single composite secret. Verifier must know ALL facts in the bundle or the comparison fails.

### Evaluation

**"Most players will evaluate subjects using information they already know."**

SMP — the "share nothing" architecture. Player believes subject's name is Alice Smith. Subject knows their own name. SMP confirms the match without either transmitting the name. Zero new information flows. This maps directly to the existing Aura evaluation model.

**"Players must corroborate to ensure they're talking about the same subject."**

SMP between players. Both hash `canonical(name + DOB + location)`. SMP confirms they're evaluating the same person. Neither reveals the identifying details to the other.

**"Players want to know that a subject isn't getting verified multiple times as different subjects using the same proofs."**

BBS+ pseudonyms. Each credential contains a `nym_secret` (jointly derived by user + issuer — neither party knows the full value alone). When presenting to a verifier, the user produces:

```
pseudonym = hash_to_curve(verifier_context_id) * nym_secret
```

Same person + same verifier domain = same pseudonym (detects reuse). Same person + different verifier = different pseudonym (preserves privacy across domains). This is deterministic and verifiable via ZK proof — the user can't lie about their pseudonym.

For global uniqueness: a ZK nullifier derived from canonical facts, published on-chain. Duplicate nullifier = same person verified under two identities.

### Scalability

| Protocol | Cost per operation | Throughput (single core) |
|----------|--------------------|--------------------------|
| BBS+ sign (issue credential) | ~7 ms | ~140/sec |
| BBS+ ProofGen (create presentation) | ~9 ms | ~110/sec |
| BBS+ ProofVerify | ~19 ms | ~52/sec |
| SMP (full protocol, ECC) | ~2 ms | ~500/sec |
| OTR key exchange | ~5 ms | ~200/sec |

All protocols are pairwise and on-demand. No global consensus needed for verification. A single 8-core machine handles millions of verifications per day.

BBS+ proofs are 400-1500 bytes depending on hidden message count. Fits in a single network packet. Stateless from the verifier's perspective — verifier needs only the issuer's public key and the proof.

### Decentralization

**"No centralized actor should be able to block operations or decrypt private data."**

**Credential issuance:** Threshold BBS+ signing across BrightID node network (t-of-N). No single node holds the full signing key. Published protocol: 1 request + 2 inter-signer rounds + 1 response. The user's raw facts can be blinded during issuance — even the issuer network never sees plaintext.

**Verification:** Peer-to-peer. SMP runs directly between participants. BBS+ proofs are verified against the network's aggregate public key — no server needed.

**On-chain (minimal):**
- Issuer aggregate public keys (for verifier lookup)
- Nullifiers / accumulator roots (for anti-reuse detection)
- Updraft campaigns for public verifier reputation

**Off-chain (everything else):**
- Credentials stored locally on user's device
- Proofs generated and verified peer-to-peer
- SMP comparisons between players
- OTR sessions between user and verifier

---

## Data Flow: End to End

### 1. Fact Generation (Client-Side)

User completes assessments in Aura Player. Answers produce local facts:

```
facts = [
  { slot: "personality_type", value: "INTJ" },
  { slot: "social_confidence", value: "high" },
  { slot: "twitter_handle", value: "@adamstallard" },
  { slot: "location", value: "US-CA" },
  { slot: "assessment_version", value: "v2.1" },
  ...
]
```

Facts stay on the device. The user decides which to make credential-eligible.

### 2. Credential Issuance (Threshold BBS+)

```
User                           BrightID Node Network (t-of-N)
  |                                    |
  | Commit to facts (Pedersen          |
  | commitment — nodes can't           |
  | see plaintext)                     |
  | ---------------------------------> |
  |                                    |
  |                              Threshold BBS+ sign
  |                              (2 inter-signer rounds)
  |                              Each node produces a
  |                              signature share
  |                                    |
  | <--- Signature shares ------------ |
  |                                    |
  | Assemble full BBS+ signature       |
  | locally. Credential = facts +      |
  | signature. Stored on device.       |
```

The credential is 80 bytes (signature) + the fact data. The issuer's aggregate public key is published on-chain or via the node network's public endpoint.

### 3. Selective Disclosure (BBS+ Proof)

User wants to prove they have a verified personality type without revealing anything else:

```
User                                Verifier
  |                                    |
  | BBS+ ProofGen:                     |
  |   disclosed = [personality_type]   |
  |   hidden = [everything else]       |
  |                                    |
  | --- ZK proof (~400 bytes) -------> |
  |                                    |
  |                              ProofVerify against
  |                              issuer aggregate PK
  |                              → Valid / Invalid
```

### 4. Knowledge Check (SMP)

Verifier believes they know the user's Twitter handle. User has it as a fact. Neither reveals the value:

```
Verifier                            User
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

2 round trips. ~2ms compute. Verifier confirms their knowledge. No data transmitted.

### 5. Session Deniability (OTR Wrapping)

All of the above happens inside an OTR session:

```
1. DH key exchange → shared secret → session keys
2. All messages (BBS+ proofs, SMP messages) encrypted with AES-CTR
3. Authenticated with HMAC (symmetric — both parties can produce)
4. DH ratchet rotates keys per exchange
5. Session ends → old MAC keys published
6. Historical transcript becomes forgeable by anyone
```

The verifier was convinced during the session. After it ends, they hold nothing cryptographically binding.

---

## Integration with Existing Aura App

### Current Backend Boundary

The app isolates backend communication to ~5 functions:
- `captureResponse()` — world question answers
- `captureAssessResponse()` — assessment answers
- `claimMyResponses()` — attach responses to user
- `exportForAI()` — data export
- `demoStorage` — localStorage abstraction

### New Functions Needed

| Function | Purpose | Protocol |
|----------|---------|----------|
| `requestCredential(facts)` | Submit blinded fact commitment to node network | Threshold BBS+ |
| `assembleCredential(shares)` | Combine signature shares into full credential | BBS+ |
| `generateProof(credential, disclosed)` | Create selective disclosure proof | BBS+ ProofGen |
| `verifyProof(proof, issuerPK)` | Check a received proof | BBS+ ProofVerify |
| `startSMP(secret)` | Initiate Socialist Millionaire comparison | SMP |
| `processSMP(message)` | Handle SMP protocol messages | SMP (4 messages) |
| `createSession(peerPK)` | Establish OTR channel | OTR DAKE |
| `sendSecure(message)` | Send within OTR session | OTR Data Message |
| `endSession()` | Publish MAC keys, destroy session | OTR |

These extend the existing isolation boundary. Same pattern — isolated functions, backend-agnostic app code.

### Libraries

| Protocol | Recommended Library | Language | Notes |
|----------|-------------------|----------|-------|
| BBS+ | `@docknetwork/crypto-wasm-ts` | TS + WASM | Full stack: BBS+, predicates, accumulators, pseudonyms |
| SMP | `js-smp` | TypeScript | OTRv3-based, 4-message flow, MIT license |
| OTR | `otr` (arlolra) | JavaScript | Full OTR including SMP, browser/Node |

For BBS+ specifically, Dock's library is the only one providing threshold issuance + predicates + accumulators + pseudonyms in a single package.

### What Lives Where

| Component | Location | Why |
|-----------|----------|-----|
| Fact generation | Client (Aura App) | Already there — assessment answers |
| Credential storage | Client (localStorage → IndexedDB) | User controls their data |
| Proof generation | Client | Private keys never leave device |
| Proof verification | Verifier's client OR BrightID node | Peer-to-peer or node-assisted |
| SMP | Client-to-client via relay | Peer-to-peer, 4 messages |
| OTR sessions | Client-to-client via relay | Peer-to-peer, forward secrecy |
| Issuer aggregate PK | On-chain or node network endpoint | Public, immutable |
| Pseudonym nullifiers | On-chain (optional) | Global dedup |

---

## Open Questions for Adam

1. **Threshold parameters.** What t-of-N for credential issuance? How many BrightID nodes participate? What's the failure tolerance?

2. **Credential schema.** Which facts from the current assessment system should be credential-eligible? All of them, or a curated set? Should personality scores be continuous values or bucketed?

3. **Relay infrastructure.** SMP and OTR need message relay between peers. Use BrightID nodes as relays? A separate relay network? WebRTC for direct connections?

4. **Nullifier publication.** On-chain (Ethereum/Kusama) or a shared bulletin board on the node network? On-chain is more durable but costs gas.

5. **Blind issuance.** How much do we trust the node network? Full blind issuance (nodes never see facts) vs. committed issuance (nodes see commitments, verify structure, but not values)?

6. **Migration path.** Current Supabase captures responses in plaintext. What's the transition plan? Run both systems in parallel? Convert existing data to credentials?

7. **Post-quantum.** BBS+ is not PQ-safe. Privacy properties survive quantum attacks (information-theoretic), but forgery becomes possible. Design for algorithm agility? Or accept the risk for the next 5-10 years?

8. **SMP secret derivation.** Use Argon2id for anti-guessing on low-entropy facts? What cost parameters? This is a UX tradeoff — ~200ms per SMP initiation.

---

*First pass. Adam refines. The protocols are proven. The architecture is the question.*

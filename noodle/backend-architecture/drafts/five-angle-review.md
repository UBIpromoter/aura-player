# Backend Architecture v1 — Five-Angle Review Synthesis

*Five parallel review agents. Three panel consensus rounds (12 model responses total). The verdict is clear: we need a fundamental reframe before Adam sees this.*

---

## The Core Problem

**We built a credential system with Aura attached. Adam's spec describes Aura with cryptographic privacy enhancements.**

The architecture inverts Adam's priorities. His spec says: "Most players evaluate subjects using information they already know (share nothing architecture)." We made BBS+ credentials the center and SMP knowledge verification the sideshow. Adam's intent is the reverse:

- **SMP is the common case.** Player already knows your Twitter handle. SMP confirms they both know it. Nothing is transferred. Zero infrastructure.
- **BBS+ is the escape hatch.** For portable facts that need to travel outside the Aura context. Exceptional, not default.

We also made three premature commitments Adam never asked for: threshold BBS+ issuance, on-chain nullifiers, and specific library choices. All three need to go.

---

## Corrections Required (All Angles Agree)

### 1. BBS+ Signature Size: 80 bytes is WRONG

All three panel models, across both review rounds, flagged this. BBS+ on BLS12-381:
- Compressed: ~112 bytes (1 G1 at 48 bytes + 2 scalars at 32 bytes each)
- Some encodings: ~96-128 bytes depending on header
- **80 bytes is not a valid BBS+ signature size.** The number appears to be from an incomplete serialization.

### 2. SMP Timing: 2ms is WRONG

SMP requires multiple modular exponentiations with 2048+ bit primes. Real-world estimates:
- Pure compute (optimized ECC): 10-50ms per round
- Full protocol with 4 messages + network: 50-200ms+
- `js-smp` specifically: untested in browser, Node.js-only crypto imports

### 3. On-Chain Nullifiers: DIRECTLY CONTRADICT Adam's Privacy Goals

Adam's spec emphasizes "plausible deniability" and "can't share it further." On-chain nullifiers are:
- Permanent public records of verification events
- Enable correlation attacks across disclosures
- Create a surveillance graph of who verified what, when
- **The exact opposite of plausible deniability**

Consensus: remove entirely. Redesign duplicate prevention using private set intersection or social-graph-based detection through Aura's existing SybilRank.

### 4. Threshold BBS+ Issuance: NEVER REQUESTED

Adam's spec says: "Assume a working BrightID (Aura) node network and deploy protocols as node software." He listed tools (OTR, SMP, BBS+), not a distributed key generation ceremony. We wrapped his simple tool list in DKG, signer coordination, liveness requirements, and multi-round MPC.

For MVP: single issuer with user blinding is sufficient and dramatically simpler.

*However:* the infrastructure research (Angle 2) confirmed threshold BBS+ IS feasible with Dock's library. Keep it as a future scaling path, not the v1 design.

### 5. Pseudonym Construction: BREAKS PRIVACY

The "nym_secret jointly derived by user+issuer" formulation introduces issuer linkability. BBS+ privacy relies on user-unilateral key generation. If the issuer participates in secret derivation, they can link all pseudonyms from that credential. This is a fundamental privacy regression.

### 6. "Mandatory Disclosure Pointers": NOT NATIVE TO BBS+

BBS+ supports selective disclosure by message indices, but "must-reveal-together" bundle enforcement is not a native feature. It requires custom proof composition / issuer policy enforcement at the application layer, not cryptographic enforcement within BBS+ itself.

### 7. Non-Transferability Claims: OVERSTATED

BBS+ ZK proofs are deniable (simulatable), not non-transferable. True non-transferability requires explicit session/nonce binding. OTR adds session deniability but doesn't compose cleanly with ZK proof verification — they're different abstraction layers. The architecture conflates three distinct properties:
- **ZK deniability** (verifier could have simulated the proof)
- **Session non-transferability** (MAC key revelation makes transcript forgeable)
- **Proof binding** (proof is valid only in a specific session context)

---

## What We Completely Missed

### The Social Trust Graph

Adam's decentralization article describes: SybilRank, weighted trust flows, node domains, random walk auditing (HOPS = log10(N)), Updraft public ratification, team-based trust origins. **None of this appears in our architecture.** We treated BrightID nodes as generic signers. Adam built an entire social trust protocol — the architecture should show how cryptographic privacy enhances it, not replaces it.

### Directionality of Verification

Adam said: "Players can only verify they already know it." Our architecture has users revealing facts to players (selective disclosure). The arrow points the wrong way. The correct flow:
- Player believes subject's name is Alice Smith
- SMP confirms the match
- Player's existing knowledge is corroborated
- No new information flows to the player

### Revocation

Adam's spec mentions approvals can be revoked. Our architecture has no revocation mechanism — no accumulator protocol, no witness update flow, no proof-of-non-revocation. This is a critical gap.

### Correlation Resistance

When users present multiple selective disclosure proofs over time, a verifier (or colluding verifiers) can correlate them. No strategy for this appears in the architecture. This is the real privacy hard problem.

### User Agency

Adam said: "The system should help users understand which facts they might selectively share." Our architecture is all protocols and data flows with zero consideration of how users build a mental model of privacy.

---

## Library Reality Check

| Library | Architecture Claims | Reality | Rating |
|---------|-------------------|---------|--------|
| `@docknetwork/crypto-wasm-ts` | "Only one with threshold + predicates + accumulators + pseudonyms" | **TRUE.** Verified against source. MATTR's competitor archived Feb 2025. Has threshold BBS+ tests. BUT: 7MB WASM blob, CommonJS only, needs bundler. | **CAUTION** |
| `js-smp` | "OTRv3-based, 4-message flow, MIT" | Dead since 2020. 8 stars, 15 open issues. Node.js `crypto` import = **won't run in browser.** Bug in modulus operation. | **STOP** |
| `otr` (arlolra) | "Full OTR including SMP, browser/Node" | Dead since 2015. Security warning in README. 2015-era crypto polyfills. OTR v3 only (v4 published 2018). | **STOP** |

**Recommendation:**
- **BBS+:** Dock is the right (and only) choice. Accept the bundler requirement.
- **SMP:** Roll own against the OTR v3 spec (~200-400 lines) using Web Crypto API + native BigInt. Or extract from arlolra's otr SM module. Do NOT depend on `js-smp`.
- **OTR/Deniability:** Build purpose-specific deniable session layer using ECDH + AES-GCM + HMAC + DH ratchet. ~500 lines, modern, auditable. No need for full OTR protocol — we need two properties: forward secrecy and MAC key revelation.

---

## BrightID Infrastructure Findings

### Threshold BBS+ IS Real

- **Doerner et al.** (IEEE S&P 2023): Published, peer-reviewed, benchmarked. 1 request + 2 inter-signer rounds + 1 response.
- **Non-interactive variant** (CT-RSA 2025): Even better — no inter-signer communication during online phase. <14ms signing for t<=30. But NOT in Dock's library yet.
- **Dock implements Doerner's protocol:** `src/threshold-sigs/bbs-plus.ts` with FROST DKG. Tests for 3-of-5 threshold.

### But the Node Network Is a Question Mark

- BrightID uses IDChain (PoA), 2/3 consensus. Likely 5-10 validators.
- Exact count not publicly documented. **Must ask Adam.**
- DKG ceremony requires all threshold participants online simultaneously.
- Key resharing when validators join/leave adds operational complexity.
- ArangoDB Foxx services may not support loading BLS12-381 WASM — might need sidecar architecture.

### Crypto Coexistence: No Conflict

NaCl (Curve25519/Ed25519) and BBS+ (BLS12-381) are independent systems. Additive migration, not replacement. Keep NaCl for everything current; add BLS12-381 for credentials only.

---

## What the Open Questions SHOULD Be

**Remove these (wrong or premature):**
- Q4 (Nullifier publication) — answer is "don't, it violates plausible deniability"
- Q7 (Post-quantum) — ship the base system first
- Q8 (Argon2id for SMP) — bundling solves low-entropy, not hashing

**Keep these (genuinely hard):**
- Q1 (Threshold parameters) — but only if threshold issuance survives as a design choice
- Q2 (Credential schema) — core
- Q5 (Blind issuance trust model) — privacy crux

**Add these (the real hard problems):**
- How do we maintain "share nothing" when the architecture requires credential issuance?
- How does this integrate with SybilRank, trust flows, and node domains?
- What's the revocation story for BBS+ credentials?
- How do we prevent correlation attacks across multiple disclosures?
- Should credentials be domain-scoped rather than global?
- How does trust weight from the social graph inform credential issuance?

---

## Prototyping Roadmap

### Phase 1: BBS+ Feasibility (KILL THE BIGGEST RISK)

The entire architecture hinges on BBS+ WASM working in the browser. If it doesn't, everything changes.

**POC:** One HTML page. Generate keypair, sign 5 facts, produce selective disclosure proof, verify it. Time everything.
**Success criteria:** ProofGen <50ms, ProofVerify <100ms, WASM load <3s desktop.
**If it fails:** BBS+ moves server-side. Different architecture.

### Phase 2: SMP in Two Tabs

Two browser tabs compare secrets via `BroadcastChannel` (zero infra). Trivial risk.

### Phase 3: Composed Demo for Adam

One page, two panels. Alice generates credential, proves one fact. Bob verifies proof, then SMP-confirms a fact he already knows. Performance timings displayed.

### Phase 4+: Relay, OTR wrapping, production integration.

### The Single-HTML Constraint

WASM can't be inlined. The sidecar pattern preserves the spirit:
```
index.html          (unchanged)
aura-crypto.js      (Vite-built bundle)
aura-crypto.wasm    (BLS12-381 binary)
```
One additional `<script>` tag. Crypto module is a black box behind `window.AuraCrypto`.

---

## v2 Rewrite Direction

The consensus from all five angles:

1. **SMP-first, not BBS+-first.** "Share nothing" knowledge verification is the primary mechanism. BBS+ credentials are auxiliary — for portable facts that leave the Aura context.

2. **Social-graph-grounded.** Reference and integrate SybilRank, node domains, trust flows. Show how crypto enhances the social protocol, not replaces it.

3. **Remove premature commitments.** No on-chain nullifiers, no threshold issuance for MVP, no specific libraries, no unverified benchmarks.

4. **Correct technical details.** Fix sig sizes, timing claims, pseudonym construction, bundle enforcement. Cite sources.

5. **Right tone for Adam.** Don't explain protocols he specified. Show how they serve HIS system. Collaborator mode, not explainer mode.

6. **Add what's missing.** Revocation. Correlation resistance. Threat model. User agency. Integration with existing BrightID infrastructure.

7. **Ask the right questions.** The hard problems are about maintaining "share nothing" with credential infrastructure, integrating social trust, and preventing surveillance via the privacy system itself.

---

*Five directions. One conclusion: rewrite before Adam sees it. The protocol knowledge is solid. The framing is wrong.*

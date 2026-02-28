# Architecture v3 — Spec Compliance Audit

*Line-by-line against Adam's HackMD spec and decentralization article. Grading every claim.*

---

## Grading Scale

- **A** — Faithful, complete, correct. Ready for Adam.
- **B** — Addressed but shallow, vague, or missing nuance Adam specified.
- **C** — Present but wrong emphasis, missing the point, or oversimplified.
- **F** — Missing entirely or contradicts the spec.

---

## PRIVACY

### "Users generate local facts about themselves as they answer questions"

**Grade: C**

v3 barely mentions fact generation. The "Data Flow" section from v2 was stripped. What remains is open question #11: "How do assessments deterministically produce facts?"

**Why this matters:** This is the FOUNDATION. Every protocol in the architecture operates on "facts." How are they generated? What format? Are they deterministic (same answers = same facts always)? Can a user fabricate facts? If facts aren't deterministically tied to assessment answers, the entire credential system is built on sand.

v3 defers this entirely. That might be appropriate for an open question Adam decides, but the document should at least describe the problem space: facts must be deterministic (for SMP to work — both parties must derive the same hash from the same underlying truth), tamper-evident (for BBS+ credentials to mean anything), and locally generated (for privacy). None of this analysis appears.

**Fix:** Add a brief section acknowledging fact generation as the trust foundation. State the requirements (deterministic, tamper-evident, locally generated). Keep the mechanism as an open question.

---

### Mode 1: "Allow a player to verify they know approved facts, but they can't learn anything new"

**Grade: A**

v3 nails this. SMP as default, share-nothing, four messages, player learns nothing. Domain-separated hash construction. Bundling against guessing.

---

### Mode 2: "Share just the facts or parts of facts a user chooses" with "selected players"

**Grade: B+**

BBS+ selective disclosure is correct. Session binding is a strong addition.

**Missing:** "Selected players" implies user agency in choosing WHO to share with. v3 describes Mode 2 as "the user chooses to reveal specific facts to a selected player" — correct. But there's no discussion of HOW the user selects players, or what prevents a player from requesting disclosure the user didn't intend. The session flow (v3 lines 39-51) has the player initiating. Where does the subject's consent gate live? Adam's spec says the user "approves" — this implies the subject has veto power over every disclosure. v3 should be explicit about this.

**Fix:** Clarify that the subject controls disclosure consent within the OTR session. The player can request; the subject decides whether to generate the proof. This is implied but not stated.

---

### "Plausible deniability: a user proves a fact, but the player (verifier) can't share it further"

**Grade: B-**

v3 says OTR provides plausible deniability via symmetric MACs + key revelation. Correct at a high level. But there are THREE distinct deniability properties in play and v3 conflates them:

1. **ZK deniability** (BBS+ proofs): The verifier could have simulated the proof themselves. This is intrinsic to BBS+ — a property of the proof system, not OTR.

2. **Session non-transferability** (OTR): After MAC key revelation, anyone could have produced the session transcript. The verifier can't prove the session happened.

3. **Proof-session binding** (v3's addition): The proof is only valid within a specific OTR session. Can't be replayed.

These compose, but v3 doesn't explain HOW they compose. If a BBS+ proof is ZK-deniable on its own, why do we need OTR session wrapping for deniability? The answer: ZK deniability means the verifier could have forged the proof, but the proof IS still a valid proof against the issuer's public key — a colluding verifier could show it to a third party who would find it convincing. OTR adds session-level deniability so even the proof artifact can't be attributed to a specific session. v3 should articulate this composition.

**Fix:** Add 2-3 sentences explaining how BBS+ deniability and OTR deniability compose and why both are needed.

---

### "Facts can be bundled to discourage guessing or griefing"

**Grade: B**

Guessing is well-addressed (bundled SMP hashes, co-disclosure policy for BBS+).

**Missing: What is "griefing" in this context?** Adam explicitly paired guessing AND griefing. They're presumably different attack vectors. Guessing = brute-forcing low-entropy facts through repeated SMP checks. Griefing = what? Possibilities:
- Deliberately failing SMP checks to waste the subject's time/resources
- Requesting excessive verifications to harass a subject
- Using SMP to probe whether someone has specific sensitive facts (probing attack)

v3 doesn't address griefing at all. If bundling is Adam's answer to BOTH guessing and griefing, the document should explain how bundling addresses each one.

**Fix:** Define griefing in this context (ask Adam if unclear). Explain how bundling mitigates it.

---

### Tools: "Off the record protocol, Socialist millionaire protocol, BBS+"

**Grade: A**

All three present and correctly positioned.

---

## EVALUATION

### "Most players evaluate subjects using information they already know"

**Grade: A**

v3 correctly positions SMP as primary, no credential infrastructure needed.

---

### "Players must corroborate in some domains without publicly revealing subject information"

**Grade: B**

v3 describes SMP between players for corroboration. Correct mechanism.

**Missing nuances:**

1. **"In some domains"** — Adam distinguishes domains where corroboration is needed from domains where it isn't. v3 treats corroboration as a single universal pattern. Different domains may have different corroboration requirements. This connects to the node domain architecture in the decentralization article.

2. **"Without publicly revealing"** — v3 says "without either revealing identifiers." This is actually STRONGER than Adam's requirement (which says "without publicly revealing" — implying private revelation between players might be acceptable). v3 provides the stronger guarantee (SMP reveals to nobody), which is fine, but should note it exceeds the minimum spec.

3. **What IS the canonical identifying info?** v3 says "both hash canonical identifying information about the subject." But what constitutes this? Name? BrightID? Domain-specific identifier? This is foundational to corroboration working and is not addressed.

**Fix:** Acknowledge domain-specific corroboration requirements. Define or ask about canonical identifying info.

---

### "Players want to know that a subject isn't getting verified multiple times as different subjects using the same proofs"

**Grade: B+**

v3 correctly separates graph-layer (SybilRank) from credential-layer uniqueness. Good structural analysis.

**Missing:** Adam's language says "using the same proofs" — this specifically implies the credential layer. If a subject gets BBS+ credentials under two identities and presents proofs from both, players want detection. This isn't just about graph anomalies — it's about cryptographic proof reuse detection. v3 mentions "domain-scoped pseudonyms" and "proof-of-unique-credential schemes" as options but doesn't dig into the specific problem Adam described: same proofs, different identities.

Also: Adam frames this alongside "proving human uniqueness" — connecting to BrightID's core mission. v3 doesn't mention human uniqueness at all. The architecture needs to acknowledge that BrightID's fundamental purpose (one-person-one-identity) intersects with this credential-layer problem.

**Fix:** Connect duplicate detection explicitly to BrightID's uniqueness guarantee. Address "same proofs, different identities" as the specific attack vector.

---

## SCALABILITY

### "The architecture must be scalable to billions of participants"

**Grade: B+**

Pairwise/on-demand nature correctly described. Relay bandwidth flagged.

**Missing:** The "billions" claim is asserted but not analyzed. What are the actual scaling bottlenecks?
- Issuer nodes signing credentials for billions of users (throughput)
- Relay nodes handling concurrent sessions (bandwidth + connections)
- Issuer public key distribution at scale
- SybilRank running on a graph with billions of nodes (computational)

v3 waves at "capacity planning" without analysis. For an architecture aimed at an expert, this should at least identify the scaling dimensions even if the numbers aren't known.

**Fix:** Enumerate the scaling dimensions and identify which are the binding constraints.

---

### "Leverage existing BrightID (Aura) node network and deploy protocols as node software"

**Grade: C+**

v3 describes what runs where but ignores the practical constraint: **can these protocols actually run as node software?**

The five-angle review identified that BrightID nodes run ArangoDB Foxx services. Foxx is a JavaScript environment inside ArangoDB. Can it load 7MB of BLS12-381 WASM? Can it run threshold BBS+ signing ceremonies? The answer from the review was "likely needs a sidecar architecture" — a separate process alongside Foxx.

v3 is completely silent on this. For Adam, who maintains this node software, this is a critical practical question. "Deploy as node software" is his requirement — the architecture should address feasibility.

**Fix:** Acknowledge the node runtime constraint (ArangoDB Foxx). Present sidecar pattern as likely deployment model. Ask Adam about node runtime capabilities.

---

## DECENTRALIZATION

### "No centralized actor should be able to block operations or decrypt private data"

**Grade: B**

v3 addresses "block operations" implicitly (multiple nodes, peer-to-peer verification). But it doesn't formally argue the claim.

**"Block operations":** If all issuance authority derives from SybilRank scores, and SybilRank is run by nodes, then the node network collectively determines who can issue. A single node can't block because others can serve. But what if a MAJORITY of nodes collude? What's the threshold? v3 doesn't address majority collusion — only single-node compromise.

**"Decrypt private data":** v3 says facts stay local, OTR is end-to-end, relay sees only ciphertext. But it doesn't address: Can the issuer decrypt? In single-signer mode, the issuer sees the credential request. v3 says "user blinds facts" but also says (via the panel review) that blinding in BBS+ is not the same as classical blind signatures (WISchnorr). Does the issuer see fact values during issuance? If so, "no centralized actor can decrypt" is violated at issuance time. This needs to be crystal clear.

**Fix:** Formally argue both claims. Address majority collusion. Clarify what the issuer sees during issuance in each model.

---

### Decentralization Article — Node Domains

**Grade: B-**

v3 mentions node domains several times but doesn't explain the mapping: each regular domain (e.g., "human uniqueness") has a corresponding node domain that determines which nodes are trusted FOR THAT DOMAIN. This is not just "node trust" — it's domain-specific node trust. A node trusted for human uniqueness evaluation might not be trusted for personality assessment credential issuance.

v3 treats node trust as monolithic ("node domain scoring via SybilRank"). The decentralization article describes domain-specific trust.

**Fix:** Explicitly map credential issuance to domain-specific node trust. Different credential types may have different issuer sets.

---

### Decentralization Article — Weighted SybilRank

**Grade: A-**

Correctly described as deterministic, weighted, operating on node domains. v3 tightened the language appropriately (structural anomalies, not "identical humans").

**Minor issue:** Adam's CLAUDE.md says the Yekta sybil algorithm is REVISITABLE (Louvain clustering at 9 resolutions, multi-signal). v3 says "SybilRank" throughout. If the algorithm changes, does the architecture change? Probably not — v3 should reference "the scoring algorithm" rather than specifically "SybilRank" to avoid coupling to a revisitable decision.

---

### Decentralization Article — Random Walk Auditing

**Grade: B**

Mentioned once in passing: "Random walk auditing (HOPS = log₁₀(N)) catches inconsistencies."

**Missing:** HOW does auditing interact with the privacy architecture? If nodes audit each other by following positive evaluations, and evaluations are now wrapped in OTR sessions, does auditing still work? Can nodes audit evaluation chains when the evaluations themselves are privacy-protected? This is a potential conflict between the privacy architecture and the auditing mechanism. v3 doesn't address it.

**Fix:** Address whether the privacy architecture interferes with existing auditing mechanisms.

---

### Decentralization Article — Updraft

**Grade: B-**

v3 mentions Updraft as "public ratification" and "team/node reputation." The decentralization article describes Updraft as functioning like a prediction market where early correct opinions earn rewards. This incentive mechanism is what makes Updraft work — it's not just voting.

v3 also doesn't describe how Updraft campaigns map to credential trust. The article says Updraft reveals scoring results publicly via campaigns. For credential issuance: does a node's Updraft standing affect its issuance authority? How?

**Fix:** Capture the incentive mechanism. Map Updraft campaigns to credential issuance authority more concretely.

---

### Decentralization Article — Teams

**Grade: B-**

v3 says "Independent energy flows from teams through evaluations." One sentence.

The article describes teams as providing RESILIENCE — multiple independent teams each generate their own scores. If one team is compromised, others remain. For credential issuance, this means: are credentials scoped to teams? Can a credential from Team A be verified using Team B's trust chain? This is architecturally significant and unexplored.

**Fix:** Address how team independence affects credential issuance and verification.

---

## SECURITY (from SECURITY.md — not Adam's spec, but required for compliance)

### Domain Separation

**Grade: A**

Comprehensive domain tag table. Versioned. Cross-protocol replay prevention specified.

---

### Deterministic Serialization

**Grade: A-**

`fast-json-stable-stringify` referenced correctly. Applied to all signed/hashed payloads.

**Minor:** Is this the right serialization for BBS+ credential payloads specifically? BBS+ signs ordered message arrays, not JSON objects. The serialization from JSON facts to BBS+ message arrays needs its own specification. `fast-json-stable-stringify` produces a JSON string — but BBS+ takes byte arrays. The conversion step is unspecified.

---

### Threat Model

**Grade: A-**

All six SECURITY.md adversary capabilities mapped to protocols and mitigations.

**Minor gap:** "Compromise a single verifier node" from SECURITY.md — v3 addresses compromised issuer and relay nodes, but not compromised VERIFIER nodes. In BBS+ verification, the verifier is a client, so "compromised verifier" means a malicious player. What can a malicious player learn beyond what's disclosed? (Answer: nothing, if BBS+ is implemented correctly. But worth stating.)

---

## SUMMARY: What's Not Getting an A

| # | Issue | Grade | Why It Matters |
|---|-------|-------|---------------|
| 1 | **Fact generation is unanalyzed** | C | Foundation of entire system. Requirements (deterministic, tamper-evident, local) not stated. |
| 2 | **Deniability composition unanalyzed** | B- | Three distinct deniability properties conflated. Expert will notice. |
| 3 | **Node deployment feasibility missing** | C+ | Adam said "deploy as node software." Can Foxx run BLS12-381 WASM? Sidecar pattern not mentioned. |
| 4 | **Griefing not addressed** | B | Adam said "guessing or griefing." Only guessing is covered. |
| 5 | **Issuer visibility during issuance unclear** | B | "No centralized actor can decrypt" — but can the issuer see facts during single-signer issuance? |
| 6 | **Node domains are domain-specific, not monolithic** | B- | Different credential types may need different issuer sets. v3 treats trust as uniform. |
| 7 | **Auditing + privacy interaction** | B | Random walk auditing follows evaluations. OTR wraps evaluations. Conflict? |
| 8 | **Teams + credential scoping** | B- | Independent teams = independent trust chains. Are credentials team-scoped? |
| 9 | **Updraft incentive mechanism** | B- | Not just voting — prediction market with rewards. Drives real behavior. |
| 10 | **Human uniqueness connection** | B+ | BrightID's core purpose. Duplicate detection should connect to it. |
| 11 | **Scalability analysis thin** | B+ | "Billions" asserted but bottlenecks not enumerated. |
| 12 | **Domain-specific corroboration** | B | "In some domains" — different domains, different rules. |
| 13 | **Sybil algorithm is revisitable** | B+ | v3 says "SybilRank" — should say "scoring algorithm" since Yekta is REVISITABLE. |
| 14 | **Majority collusion** | B | Single-node compromise addressed. Coordinated majority attack is not. |
| 15 | **Subject consent/agency in sessions** | B+ | "User approves" — where is the consent gate in the session flow? |

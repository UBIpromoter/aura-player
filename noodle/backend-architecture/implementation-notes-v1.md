# Aura Assessment Credentials — Implementation Notes

We've been building toward [your spec](https://hackmd.io/7OUrHXl8Tau5urjHYtUa3g) for a while — the assessment engine, scoring, and fact generation are operational. These notes follow your structure section by section, drawing on both the spec and [decentralization article](https://hackmd.io/xKEcuzstQp2o8XIvve6KtA): what we've built, what we hit, where we'd suggest a simpler path, and where we need your input.

Two findings worth leading with: Foxx likely can't run BLS12-381 WASM synchronously, so Mode 2 needs a sidecar. And the architecture phases naturally — Mode 1 delivers most of the spec without any credential infrastructure.

---

## Privacy

### Fact generation

The assessment engine produces deterministic scores — given the same responses, any node gets identical results, making facts verifiable across the network without a central coordinator. We have 20+ assessments generating facts across these tiers:

| Tier | Examples | Values | SMP-safe alone? |
|------|----------|--------|----------------|
| Continuous (0-100) | Big Five, Shadow, Risk subs, 20+ Starter Pack | 101/score | Yes if bundled (101^5 ≈ 10B) |
| Categorical | Attachment (4), Chronotype (3), Reasoning (4) | 3-7 | No. Bundle with continuous. |
| Composite | Archetype (29), aura viz | 29+ | Marginal. Bundle. |

### Mode 1: SMP

The protocol completes in two round trips (four messages) and reveals nothing beyond the boolean result of the match. The subject retains full control and must explicitly opt in to any verification.

```
secret = H("aura:smp:v1" || stable_serialize(bundle))
```

To mitigate **guessing**, low-entropy facts are bundled with high-entropy ones so that a verifier must know the entire bundle to get a match. Categorical labels (3-7 values) are never exposed alone.

For broader **griefing** — probing, time-wasting, automated agents at scale — bundling handles the information-extraction angle. Rate limiting, subject veto, and the $1 BrightID sponsorship cost handle the rest. What griefing patterns concern you most?

### Mode 2: BBS+

Each assessment fact maps to one credential slot. The user picks which slots to reveal; undisclosed slots are mathematically hidden. Proofs are session-bound to prevent replay:

```
challenge = H("aura:proof-challenge:v1" || session_id || nonce)
```

Co-disclosure policy enforces bundling at the schema level — certain attributes must be revealed together or not at all. This is application-level enforcement, not native to BBS+.

**Signing:** Blind issuance (Pedersen commitment, Dock implements, IETF `draft-irtf-cfrg-bbs-blind-signatures-02`) is the only approach where no actor ever sees a user's scores. This directly satisfies "no centralized actor can decrypt private data." Standard issuance is simpler and battle-tested, but the issuer sees scores at signing time.

Fabrication isn't solved at the signing layer either way. Scores are self-reported — users can already answer dishonestly, get AI coaching, or misjudge themselves. Verifying scores at signing time doesn't change that. The Aura trust graph is where reliability lives. Over time, through evaluations, the network develops a sense of who is reliable and in what context. A credential is only as meaningful as the verified trust behind the identity holding it.

**Suggested path:** Start with standard issuance to get Mode 2 shipping sooner. Upgrade to blind issuance when the IETF spec finalizes and the tooling matures. The privacy cost is limited to the signing moment, mitigated by only allowing high-trust nodes to issue. Your call on whether that temporary cost is acceptable.

### Deniability

**Mode 1:** Fully deniable. After the session ends, neither party holds anything a third party could check.

**Mode 2:** Not deniable. BBS+ proofs are non-interactive and publicly verifiable — transferable by nature. Session binding contextually unmoors the proof, but the proof itself survives extraction.

This is the correct split. Mode 1 is "I showed you" — private, nothing changes hands. Mode 2 is "I gave you this" — portable, yours to keep. Your spec already separates these into two approval methods. The deniability property follows the user's choice of mode.

### Session layer

Encrypted sessions with forward secrecy wrap both modes. You and Ali have picked the OTR variant — the deniability properties are a natural fit for Mode 1.

One consideration: existing OTR JavaScript libraries are unmaintained. A custom implementation means constant-time requirements, security audits, and real side-channel risk in JS. Battle-tested alternatives like Noise (used by WhatsApp, WireGuard) and libsodium provide encrypted forward-secret sessions out of the box. What they lack is OTR's specific post-session deniability — the MAC key publication trick.

If post-session deniability is essential for Mode 1, OTR is the right choice and the custom work is justified. If the primary need is an encrypted forward-secret channel, a proven library ships faster and more safely. Deniability properties could be added as an upgrade. You've likely already considered this — just making sure the tradeoff is explicit.

---

## Evaluation

### Share nothing

SMP is the primary mechanism. No credential infrastructure is needed — just two parties and a relay. This works before any of the Mode 2 infrastructure exists, which is why it makes sense as the first phase.

### Corroboration

SMP between players, both hashing canonical identifying information about the subject. Different domains will need different corroboration evidence — human uniqueness requires different proof than personality assessment. This maps directly to the node domain architecture.

### Duplicate detection

Two layers are needed, each catching different things:

**Graph layer:** The scoring algorithm and random walk auditing detect structural anomalies in evaluation patterns. This defense operates at the protocol level, independent of any credential system.

**Credential layer:** The specific attack is a subject presenting proofs from credentials issued under two different identities. Aura verification is the primary gate — the $1 sponsorship cost and graph verification make mass identity creation expensive and structurally detectable. But if a sophisticated actor manages to obtain two verified identities, the graph alone may not catch credential-layer duplication.

**Proposed mechanism — domain-scoped pseudonyms:**

```
pseudonym = H("aura:pseudonym:v1:{domain_id}" || subject_secret)
```

Each credential embeds a pseudonym derived deterministically from the subject's identity and the verification domain. Verifiers in the same domain see the same pseudonym across sessions, so they can detect if two credentials map to the same person or if matching proof patterns appear under different pseudonyms. The pseudonym reveals nothing about the subject's real identity and is unlinkable across domains.

The graph catches structural anomalies. Pseudonyms catch credential reuse. Neither replaces the other.

**Open question:** Should the pseudonym derive from BrightID identity or from a separate secret? BrightID-derived means the graph's uniqueness guarantee flows directly into credential uniqueness. A separate secret decouples the systems but weakens the uniqueness guarantee.

---

## Scalability

Evaluations are pairwise, on-demand interactions between participants. The system does not require global consensus, which is what allows it to scale without a central bottleneck.

At billion-user scale, the binding constraints are relay bandwidth (distributable across relay nodes) and the scoring algorithm running on a billion-node graph (may need distributed computation or incremental updates). Issuer throughput, key distribution, and credential storage are not binding.

### Foxx can't run BLS12-381 WASM

Foxx is ArangoDB's synchronous-only embedded V8. The BBS+ signing library is a multi-megabyte WASM module — likely beyond V8's sync compilation limit. The [one documented WASM-in-Foxx case](https://github.com/arangodb/arangodb/issues/7334) (2018) was a trivial function.

**Proposed:** A helper service running alongside each node. Foxx continues to handle graph and data. The helper handles signing, verification, and session management.

```
+--------------------------------------+
|  BrightID Node                       |
|  +-----------+  +------+  +--------+ |
|  | ArangoDB  |<-| Foxx |  | scorer | |
|  +-----------+  +--+---+  +--------+ |
|                    |                  |
|                    v HTTP             |
|  +------------------------------+    |
|  | aura-credentials (Node.js)   |    |
|  | BBS+ signing / SMP / sessions|    |
|  +------------------------------+    |
+--------------------------------------+
```

You know this infrastructure better than anyone — there may be a better shape. The hard constraint is that the BBS+ WASM module needs an async-capable runtime, and Foxx isn't one.

**The sidecar is only needed for Mode 2.** Mode 1 runs entirely client-to-client via relay, with no node changes required.

NaCl and BLS12-381 coexist. The new signing system is additive — existing operations stay where they are.

---

## Decentralization

### Blocking and decryption

**To prevent blocking,** scoring runs on many nodes against identical data snapshots. Because it's deterministic, their results must agree — no single actor controls issuance. The primary remaining threat is majority collusion, where the combination of the scoring algorithm, random walk auditing, and Updraft is the defense.

**To prevent decryption,** Mode 1 keeps everything on the client. Mode 2 with blind issuance means the issuer sees nothing. With standard issuance, the issuer sees scores at signing time — a temporary cost mitigated by domain trust thresholds. All sessions are encrypted end-to-end. Relays see metadata only.

### Integration points

**Issuer and relay are two distinct trust surfaces.** Issuers require domain-specific high trust (they can issue fraudulent credentials). Relays require lower trust (transport only, they see metadata). Different thresholds, potentially different node sets.

**Node domains map to credential domains.** Issuance authority is domain-specific — a node trusted for human uniqueness isn't automatically trusted for personality assessment issuance. The data model already supports this; the Evaluate operation takes arbitrary domain and category fields.

**The scoring algorithm is decoupled.** If it changes, nothing in the credential system breaks.

**Auditing and privacy don't conflict.** Auditing operates on the public evaluation graph (IDChain). The session layer protects content. Different layers, no interference.

**Team scoping — open question.** Independent energy flows provide resilience. But are credentials team-scoped? If Team A's nodes sign a credential and a verifier trusts only Team B, is that credential worthless? Or does the Updraft-weighted overall score bridge across teams?

---

## Phased Delivery

### Phase 1 — Mode 1: "Show a Player"

SMP over encrypted sessions, client-to-client via relay.

Delivers: verification ✓, deniability ✓, bundling ✓, share-nothing evaluation ✓, corroboration ✓, scalability ✓

**No credentials, no signing, no sidecar, no node changes.**

Simpler session option: a battle-tested library instead of custom OTR, if post-session deniability isn't essential at this phase.

### Phase 2 — Mode 2: "Share with a Player"

BBS+ credential issuance and selective disclosure.

Adds: portable credentials ✓, selective disclosure ✓, credential-layer duplicate detection via pseudonyms ✓

Needs: BBS+ library (Dock), sidecar on nodes, signing key management, credential schemas, domain-scoped issuance authority.

Simpler starting points: standard issuance → blind issuance upgrade. Single-signer → threshold signing upgrade.

---

## Security

### Domain separation

| Construction | Tag |
|--------------|-----|
| SMP bundle | `"aura:smp:v1"` |
| Credential schema | `"aura:credential:v1:{schema_id}"` |
| Proof challenge | `"aura:proof-challenge:v1"` |
| Session binding | `"aura:session:v1"` |
| Blind commitment | `"aura:blind-commit:v1:{schema_id}"` |
| Pseudonym | `"aura:pseudonym:v1:{domain_id}"` |

### Serialization

BBS+ signs ordered message arrays, not JSON objects. The pipeline is: `JSON → canonical_serialize → UTF-8 → hash-to-scalar → message slot`. The mapping is fixed per schema version. We spec'd `fast-json-stable-stringify v2.1.0` in our SECURITY.md — want to confirm that aligns with what the node codebase uses.

### Threat model

| Threat | Mitigation |
|--------|------------|
| Sybil nodes | Scoring detects clusters. Issuance tied to domain score. Threshold signing (Phase 2) eliminates single-node compromise. |
| Network observation | Encrypted sessions. Metadata visible to relays. Relay diversity distributes exposure. |
| Replay | Session-bound proofs. Nonces in issuance requests. Key ratchet for forward secrecy. |
| Compromised node | Time-bounded credentials expire naturally. Threshold signing eliminates single-node risk. |
| Malicious verifier | Learns only disclosed attributes. Can transfer BBS+ proof (inherent to Mode 2 — user opted in). |
| Fabricated scores | Self-reported data. Graph trust is the real defense. |
| Griefing at scale | Bundling + rate limiting + subject veto + $1 sponsorship cost. |
| Credential reuse across identities | Domain-scoped pseudonyms + graph anomaly detection. |

---

## Your Input Needed

1. **Relay architecture.** Nodes as relays? WebRTC for direct connections? Hybrid?
2. **Team credential scoping.** Team-scoped or system-wide via Updraft weighting?
3. **OTR vs simpler session layer.** Is post-session deniability essential for Phase 1?
4. **Blind issuance timing.** Day-one requirement or acceptable as an upgrade path?
5. **Pseudonym derivation.** BrightID-derived (stronger uniqueness) or separate secret (decoupled systems)?
6. **Domain scoping.** Do personality assessments become their own domain with their own Updraft campaign?
7. **AI entity uniqueness.** Extension of Aura verification, or a fundamentally different problem needing its own domain?
8. **Credential lifecycle.** Revocation mechanism? TTL? What happens to existing credentials when a node loses trust?

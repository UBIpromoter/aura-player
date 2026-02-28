# Security Invariants

*Non-negotiable. Read every session. Violations are bugs.*

---

## Threat Model

Assume the adversary can:
- Control multiple sybil nodes in the social graph
- Observe network traffic between clients and nodes
- Front-run Ethereum transactions (MEV)
- Replay captured signed payloads
- Compromise a single verifier node
- Submit operations with manipulated timestamps

The system must remain correct under all of the above.

---

## Cryptographic Operations

**Never skip signature verification.** Every operation submitted to the BrightID node is Ed25519-signed. Client signs, server verifies. No exceptions.

**Deterministic serialization is load-bearing.** `fast-json-stable-stringify` before signing. Key ordering affects the hash. Changing serialization breaks all existing signatures. Touching serialization code = touching the trust model.

**Domain separation.** Signed payloads include context preventing cross-protocol replay: protocol version, operation type, chain/network identifier where applicable. Signatures valid in one context must not be valid in another.

**Key material is radioactive.** Never in logs, error messages, console output, commit messages, comments, API responses, or crash reports. Not even in debug builds.

**TweetNaCl for identity operations.** Ed25519/X25519 on both client and server. CryptoJS AES separately for channel/backup data. No alternative signing or key-exchange implementations.

**Constant-time operations.** TweetNaCl is constant-time by design. No crypto code paths that branch on secret data or use non-constant-time comparisons.

**Key rotation and revocation.** Identity keys must support rotation with verifiable continuity. Compromised key revocation must propagate through the graph.

---

## Blind Signatures

**WISchnorr partially blind signatures preserve user privacy.** Proves BrightID verification without revealing identity. This privacy property is the point.

**Never "simplify" the blinding protocol.** The t1-t4 blinding factors, challenge-response structure, and unblinding step all exist for security reasons. Removing steps removes privacy guarantees.

**RSA blind signatures** exist as an alternative. Same privacy goals, different math. Both maintained until one is formally deprecated.

---

## Smart Contracts

**Contracts are audited surface area.** Every function is a potential attack vector. Keep minimal.

**Token-gated verifier authorization.** Only addresses holding verifier tokens submit verification proofs. Don't add alternative auth paths.

**Immutability is a feature.** No proxy or upgradeability patterns unless explicitly governed with timelock and multi-sig. Backwards compatibility is permanent.

**Gas cost is a constraint.** Increases to common operations are regressions. Contract size stays below 24KB. Optimizer settings are deliberate.

**Event signatures are API surface.** The Graph subgraph and downstream frontends consume events. Changing event signatures breaks indexers.

---

## Sybil Resistance

**Changes need attack simulation.** `BrightID-AntiSybil` has adversarial scenarios: lone attacks, collaborative attacks, manual attacks. Unit tests alone are insufficient.

**Seed nodes anchor the trust graph.** Compromising seed selection compromises everything downstream. Maximum scrutiny.

**Detection is multi-signal.** Graph density, seed proximity, external edge ratios, multi-resolution clustering stability. Don't optimize one metric in isolation.

**Scoring must be deterministic.** Same snapshot input = same output across environments. Non-determinism (floating point, hash ordering, random seeds) is a bug.

---

## Data Handling

**BrightID identifiers are pseudonymous, not anonymous.** Graph connections reveal social structure. Treat the social graph as sensitive.

**Bcrypt hashes for social profiles.** One-way, not reversible. Don't downgrade to faster hashing.

**Operation replay prevention.** `operationsHashes` in ArangoDB. Don't bypass. Replay attacks duplicate trust assertions.

**Timestamp tolerance.** 1-hour `TIME_FUDGE`. Tightening breaks clients. Loosening widens replay window. Calibrated.

---

## Development Rules

- Never commit secrets (`.env`, keys, seed phrases)
- Never disable signature verification in code that could reach production
- Never log request bodies containing signed operations
- Never force-push branches others build on
- Smart contract changes require separate review — they're permanent
- Post-audit changes re-trigger adversarial review
- ArangoDB queries must be parameterized — no AQL string interpolation
- Test adversarial scenarios, not just happy paths

---

*Every rule here exists because something broke or could break. Remove nothing without discussion.*

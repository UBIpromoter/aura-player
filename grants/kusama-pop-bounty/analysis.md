# Kusama PoP Bounty — AI Research Analysis

**Date:** 2026-02-13
**Sources:** Claude, ChatGPT, Grok (independent research, then synthesized)

---

## Bounty Overview

Kusama's Proof of Personhood Bounty — part of the Kusama Vision program backed by 10M DOT (~$12.6M at $1.26/DOT as of Feb 2026) from the Web3 Foundation. Treasury Bounty #36. Mission: fund, test, and advance sybil-resistant, privacy-preserving, decentralized PoP solutions as public goods on Kusama.

## Charter Principles (Evaluation Criteria)

- **Privacy by design** — no biometrics, no surveillance, no identity leakage
- **One person, one presence** — prove uniqueness without collecting personal data
- **Anti-coercion/anti-farming** — explicit threat modeling required
- **No silver bullet** — target specific applications, state assumptions honestly
- **Human-centric** — inclusive, respectful engagement

## Why BrightID + Aura Are a Strong Fit

All three AIs independently flagged BrightID as one of the strongest existing matches:

- Social graph verification (no biometrics) maps 1:1 to charter's privacy requirements
- "Prove you're only using one account" is literally what the bounty funds
- Real deployment history (Gitcoin, quadratic funding, UBI experiments) — not vaporware
- Aura adds higher-assurance layer — expert-evaluating-expert producing privacy-preserving attestations
- Emerging Polkadot PoP roadmap describes two-tier model (DIM1 lightweight, DIM2 higher assurance): BrightID slots into DIM1, Aura into DIM2

## Three Proposal Angles

### 1. Kusama PoP Adapter
Bridge BrightID/Aura attestations on-chain. Milestones:
- Spec: proof format + threat model + what data is (not) revealed
- Prototype: verifier module + reference UI
- Pilot: one real Kusama use case (faucet, voting, distribution)
- Report: attack simulation + results

### 2. DIM-Compatible Signal Source
Position as one input in the PoP stack, not "the whole solution." BrightID for low-risk gating, Aura for high-assurance contexts. Interoperable, not competing.

### 3. Adversarial Stress Test
The bounty says "fund, test, and advance." Propose a red-team pilot measuring:
- Cost to attack / cost to defend
- False positive/negative rates
- UX friction
- Coercion/farming vectors

This directly satisfies their "realistic assumptions" requirement.

## What to Emphasize in Submission

Mirror their charter headings:
- **Privacy by Design:** what leaves the device, what hits chain, what's never collected
- **Threat Model:** collusion, bribery, graph poisoning — what you can/can't prevent
- **Target Apps:** pick 1-2 specific (quadratic voting, treasury experiment, sybil-resistant faucet)
- **Measurable Outcomes:** adoption numbers, attack cost increase, time-to-verify, dropout rate

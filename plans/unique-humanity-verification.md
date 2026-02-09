# Unique Humanity Verification — Question Flows

*Design doc for structured verification of unique personhood within Aura.*
*2026-02-09. Updated after full walkthrough of all flows.*

---

## Two Flows

**Subject Flow** — the person claiming uniqueness. Lightweight. Required for cold-start (nobody in the network knows you). Optional if a player already knows you. This is the beachhead — how the system grows beyond existing social circles.

**Evaluator Flow** — the Aura player assessing uniqueness. Three paths based on relationship. This is where the real work lives. Questions are designed to **teach evaluators how to think about sybil resistance**, not just collect data.

---

## Subject Flow

**Purpose:** Make yourself evaluable by strangers. Without this, no player who doesn't know you would take your case seriously.

**Design principles:**
- Low friction. No essays. No video (deepfakes make it meaningless).
- Every question earns its place by giving evaluators useful signal.
- Adaptive — branches based on answers.
- Subject may not want to play Aura at all. The system must still be able to label them.
- For people who DO engage, this is their warm lead.

### Questions

**S1. Basics**

- What name do you go by?
- Where are you located? *(city/region — not address)*
- How did you find Aura? *(dropdown: a friend told me, just checking it out, I want to prove my identity for an app/service, I want to become an Aura player, other)*
  - If friend referral → Who? *(links to connection graph)*

**S2. Connections**

- Do you know anyone already using Aura or BrightID?
  - **I'm sure they're here** → sends connection request
  - **I think they might be here** → soft link, no request, but evaluators see the claim
  - No → skip
- Optional: Connect a social account (LinkedIn, Facebook) to show your existing social graph
  - *Not for auto-verification. Gives evaluators a map to cross-reference.*
  - Twitter/TikTok not useful — those aren't real-world relationships.

**S3. Attestation**

- I confirm this is my only account in this system. *(toggle — required)*

**S4. Availability** *(optional — strengthens case)*

Warm language: *"These are optional — they help evaluators feel confident about you."*

- I'm open to a quick video chat with an evaluator
- I could meet someone in my area *(at a coffee shop, community event, co-working space, etc.)*
- Someone I know could confirm I'm a real person if asked

**Total time:** ~90 seconds. Creates a profile card evaluators work from.

---

## Evaluator Flow

**Purpose:** Structured assessment of whether a subject is a unique human. Guides the evaluator's thinking. Produces a confidence-weighted evaluation that feeds into Aura's scoring. **The question flow IS the training.**

**Maps to protocol:** Produces a Player → Subject evaluation (honesty rating + confidence 1-4).

### Routing Intelligence

**The system should route before it asks.** If a subject has overlapping connections with verified Aura users, push those users to do Path A evaluations first. Path C is a fallback, not a starting point.

- Subject has Aura connections → route to those connections for Path A
- Subject is in a city with active players → facilitate Path B meetups
- Neither works → fall back to Path C

### Step 1: Relationship Gate

**How do you know this person?**

| Answer | Path | Weight |
|--------|------|--------|
| I know them personally | **Path A — Vouching** | Highest |
| I met/interviewed them for verification | **Path B — Investigation** | Medium |
| I'm reviewing their profile only | **Path C — Analysis** | Lowest |

### Step 2: Evaluator Fit Check

**Are you well-positioned to evaluate this person?**

Quick gut check before investing time. Let evaluators opt out without guilt if they're the wrong person for this assessment.

---

### Path A: "I know this person"

High signal, few questions needed. ~1 minute.

**A1. Relationship**
- How do you know them? *(family / friend / colleague / neighbor / community member / other)*
- How long? *(< 1 year / 1-5 years / 5+ years)*
- When did you last interact? *(this week / this month / this year / longer)*

**A2a. Is this person a real human?**
- Certain
- I believe so
- Unsure

**A2b. Do you believe this is their only account?**
- Yes, I'd be very surprised if not
- Probably, but I can't be sure
- I have some doubt
- I suspect they may have another

**A2c. Sybil sophistication — could they pull off a split-circle attack?**
- Does this person have distinct, non-overlapping social circles?
- Are they technically savvy enough to maintain separate identities?
- How complex is their social life? *(simple/local vs. spread across cities/communities)*

*Not accusatory — risk profiling. Helps the system know how hard to look for duplicates.*

**A3. Confidence** *(1-4 scale)*
- 4 — Certain. I'd stake my reputation.
- 3 — Very confident. No reason to doubt.
- 2 — Fairly confident, minor uncertainty.
- 1 — Some confidence, notable gaps.

**A4. Doubt check** *(appears at confidence 1-2)*
- What's the source of your uncertainty? *(multi-select)*
  - I haven't seen them recently
  - I know them only in one context
  - Something feels off but I can't pinpoint it
  - Other

---

### Path B: "I met them for verification"

Evaluator investigated. Document what they did and found. ~3-5 minutes.

**B1. Encounter**
- How did you meet? *(in person / video call / text-chat only)*
- Who initiated? *(they came to me / I reached out / mutual)*
- Brief context *(where/when)*

**B2. Evidence observed** *(multi-select)*
- They appear to be a real person (not a bot/deepfake)
- They described their life with specific, consistent details
- Their social graph seems authentic
- They knew people already in the Aura network
- They had physical documents or presence
- They were referred by someone I trust
- **Other people independently recognized them** *(third-party ambient recognition)*
- **I saw proof-of-work that would be hard to fabricate** *(physical presence at known event, etc.)*
- Other

**B3. Red flags** *(multi-select)*
- Vague or inconsistent answers
- Reluctance to share basic information *(note: privacy-conscious ≠ red flag, but it limits evaluation ceiling)*
- Profile seemed templated or generic
- Claimed connections that didn't check out
- Rushed or pressured the process
- Nothing concerning
- Other

**B4a. Is this person a real human?**
*(same options as A2a)*

**B4b. Do you believe this is their only account?**
*(same options as A2b)*

**B4c. Sybil sophistication assessment**
*(same as A2c)*

**B5. Confidence** *(1-4 scale)*

**B6. Doubt check** *(at 1-2, multi-select)*
- I only met them once
- I know them in only one context
- They were reluctant to share personal info
- They seem capable of gaming the system
- I did not see proof-of-work that would be hard to fake
- Something feels off
- Other

---

### Path C: "Reviewing their profile"

No direct contact. Working from profile card and data. ~2-3 minutes.

**System note:** Path C should be a fallback. If the subject has connections in the system, route to those connections for Path A first.

**C1. What are you working from?** *(multi-select)*
- Subject's self-attestation
- Connection graph / social imports
- Other evaluators' assessments
- Referral chain (who brought them in)
- Activity history in the system
- Other

**C2. Does this profile look like a real, unique person?** *(slider/spectrum, not binary)*

**C3. Signal assessment**
- What's the strongest signal? *(dropdown + optional text)*
- What's the weakest point? *(dropdown + optional text)*

**C4. Red flags** *(same as B3)*

**C5. Evaluator fit**
- Am I the right person to evaluate this subject? *(yes / probably not — they should find someone closer)*

**C6. Confidence** *(1-4 — likely skews 1-2 for profile-only)*

---

## How the Flows Connect

```
Subject                          Evaluator
  │                                 │
  ├─ Completes subject flow ──────► Profile card created
  │                                 │
  │     System routes to best       │
  │     available evaluators ──────►├─ Path A (knows them) ──► High-weight eval
  │                                 ├─ Path B (investigated) ► Medium-weight eval
  │                                 └─ Path C (profile only) ► Low-weight eval
  │                                 │
  └─ Optional: responds to ◄─────── Evaluator requests
     follow-up questions             more info
```

Multiple evaluators assess the same subject. Weighted by:
- Evaluator's own reputation/energy in the system
- Path taken (A > B > C)
- Confidence level (1-4)
- Agreement/disagreement with other evaluators

Aggregate confidence → Bronze / Silver / Gold verification level.
Teams can set their own thresholds (Green = accessible, Blue = strict).

---

## Design Insights from Walkthrough

1. **Route before you ask.** Don't serve subjects to strangers when they have connections.
2. **Questions are training.** New players learn sybil hunting through the question flow itself.
3. **Separate humanity from uniqueness.** Different assessments — high confidence on one doesn't mean high confidence on the other.
4. **Sybil sophistication is a dimension.** Not "are they attacking" but "could they."
5. **Binary answers don't match real judgment.** Use spectrums/sliders where possible.
6. **Evaluator fit matters.** Let evaluators opt out if they're not well-positioned.
7. **Privacy-conscious ≠ red flag, but it caps evaluation ceiling.** The system should recognize this.
8. **Third-party ambient recognition is strong evidence.** People at a meetup knowing someone's name is hard to fake.
9. **Proof-of-work framing.** "Did you see anything that would be hard to fabricate?" is a powerful evaluator question.
10. **Cold start bootstraps from existing social graphs** (Facebook, LinkedIn — real-world connections). Early evaluators carry disproportionate weight but energy system decentralizes over time.

---

## Open Questions

1. **Should evaluators see each other's assessments before submitting?** Anchoring bias vs. building on prior work.
2. **How does this integrate with existing honesty rating?** Separate dimension or folded in?
3. **Team-specific thresholds.** How do teams configure question flows?
4. **Subject notification.** When someone creates a stub profile for you, do you get notified?
5. **Decay.** Confidence decay over time if no fresh evaluations?
6. **Stub profiles.** Can evaluators create profiles for people who haven't done the subject flow? (The "Aura labels everyone" case.)

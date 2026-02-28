# Aura System Stack
> Recorded 2026-02-25 from Philip + Claude strategy conversation

---

## The Problem

Trust is collapsing online. You can't tell who's real, who's acting in good faith, who's a duplicate. The existing answer — Worldcoin's Orb — is a one-time biometric scan held by a single company. Binary. Centralized. Dystopian.

Aura is the other path: identity as a living thing. Behavioral, relational, built over time. No single point of failure. Always smarter tomorrow than today.

If Aura can't solve the unique humanity question, nothing else matters. Other domains (work performance, certifications, grants, compliance) are possible — but uniqueness verification is the must-have.

---

## The Full Stack (Bottom to Top)

### 1. Identity Layer — BrightID → GetVerified

**BrightID** is the original identity primitive. A unique identifier that says "this is a person" before anyone evaluates trustworthiness. Social graph, recovery contacts, connections.

**GetVerified** (Adam & Ali, in development) replaces the BrightID dependency. Passkeys on phone, Apple/Google account as unique identifier. Removes the friction of downloading BrightID as a prerequisite.

**Role:** Authentication and identity. The foundation everything else sits on.

### 2. Evaluation Engine — Legacy Aura

**Legacy Aura** (aura.brightid.org) is the full evaluation system:

- **Subjects** — people being evaluated (passive, don't need to participate)
- **Players** — evaluate subjects by reviewing connections, activity, recovery contacts. Rate with confidence levels (Low to Very High)
- **Trainers** — evaluate players. Review player activity, get alerts for suspicious behavior. Bounded meta-judgment: "will this player be accurate and honest?"
- **Managers** — evaluate trainers and other managers. Energy circulates among managers via SybilRank on directed weighted graphs. Linear dissipation downward through trainers to players to subjects.
- **Teams** — the unit of decentralization. Independent scoring, multiple teams provide redundancy, apps combine team scores. Team owners are seed managers. Teams compete; best teams attract best participants and earn highest share of rewards.

**Scoring:** SybilRank algorithm adapted for directed graphs with weighted edges. Confidence is first-class — every evaluation carries a confidence level that directly affects weight/impact.

**Current state:** Works okay for trainers and managers. Lousy player experience. Too complex for onboarding new people. The UI exists but isn't ready for broad use.

**Role:** The trust math. The engine that turns human judgment into verifiable scores.

### 3. Player Experience — Aura Player

**Origin:** Started as a better UI for players to do their job — answering questions in the BrightID domain (is this person unique?) without limiting future expansion to other domains.

**Evolution:**
1. Built as a general question-answering app (not locked to one domain)
2. Added "fun questions" alongside "work questions" — any domain
3. "Questions about yourself" → personality assessments → deep rabbit hole
4. Dogfooding with AI test-takers → AI personality testing concept
5. The personality game became compelling on its own

**Key insight:** The personality game isn't a pivot away from verification. It's a feature that grew out of building the player tool. Verification questions are just another domain of questions in a system designed to handle any domain.

**Current state:** ~16,300 lines, polished, live, engaging. Personality assessments, archetypes, aura visualization, trait analysis, AI track, compare features, Supabase backend.

**Verification UI already exists in the app:**
- **VerifyHub** — evaluation queue with search, expert mode toggle (unlocks after 3 evals), completed history
- **Three evaluation paths:**
  - Path A (Vouching / Cyan) — "I know them personally." Connection details (relationship, duration, last contact), identity check, verdict + confidence
  - Path B (Investigation / Amber) — "I met them for verification." Meeting context, direct + supporting evidence, identity check, verdict + confidence
  - Path C (Analysis / Slate) — "I'm reviewing their profile." Sources, credibility star rating, strongest/weakest signals, verdict + confidence
- **VerifyExpertForm** — express mode for experienced players (single scrollable form)
- **VerifyEvalSummary** — review your evaluation before submitting
- **Confidence system** — 4-level (Gaps / Fair / Confident / Certain)
- **Identity checks** — sybil gaming risk, single account belief
- Currently running against mock subjects (8 fake profiles in VERIFY_MOCK_SUBJECTS). Evaluations stored in localStorage.
- **To go live:** replace mock subjects with real people from the network, wire evaluations to Adam's backend instead of localStorage.

**Role:** The top of the funnel AND the interface players use for real work.

**The funnel:**
1. **Top** — fun personality assessments. Learn the UI mechanics (fixed buttons, confidence intervals, thoughtful answering). Build a profile.
2. **Middle** — track record grows passively. Consistency, reasoning scores, depth of engagement. This is credentialing without trying — proof of work that shows you're a consistent, thoughtful person.
3. **Bottom** — ready to answer questions that matter. BrightID domain (unique humanity), other domains. Trainers reviewing whether to trust you as a player have real evidence: hundreds of questions answered, reasoning test scores, behavioral consistency patterns.

The personality game isn't separate from verification — it's the player development pipeline. It's how you produce good verifiers. Not everyone can or should evaluate subjects in the BrightID domain. The funnel naturally filters for people who are accurate, honest, and consistent — exactly what the system needs.

---

## The Hierarchy in Plain English

**Players answer questions.** That's it. Be accurate, be honest. You don't depend on anyone else. In the BrightID domain: "Is this a real, unique person?" In other domains: whatever the question is.

**Trainers ask:** "Will this player do a good job being accurate and honest?" Bounded scope — you're judging one person's capability at one job. Trainers get activity alerts when players behave suspiciously.

**Managers ask:** "Will this trainer do a good job evaluating players?" This is meta-judgment about meta-judgment. Managers also evaluate other managers, which is where it becomes circular and endlessly iterative. Energy at the manager level circulates via SybilRank. Downward from managers through trainers to players to subjects, energy flows linearly and naturally dissipates.

---

## Growth Model

### Two layers, one system

**Layer 1: Verification (for everyone)** — free, open, not creepy. You don't need to play the game. An Aura player who's earned trust vouches for you. The system validates whether players are good at vouching. This is the credential with mass utility.

**Layer 2: The game (for players)** — assessments, questions, depth over time. Players earn trust and standing. They become the immune system of the verification network. Status comes from accuracy and contribution.

Most people only need Layer 1. Layer 2 is what makes Layer 1 work.

### On-ramps

**Warm path:** You know a player. They stamp you. Basically free. Like going to a notary.

**Cold path → warm conversion:** You don't know anyone. You show up wanting verification, you're willing to jump through hoops. A player gives you a low-confidence rating. You ask how to get higher confidence or become a player yourself. You start doing work, building a portfolio. Trainers review it. If it's good, you level up. Now you're a warm hub for your own circle. 1-5% of cold arrivals convert to players — that's the growth engine.

### Incentives (three layers)

1. **Status/power** — you're the person who can verify others. Socially meaningful. The "knows a guy" role.
2. **Responsibility as retention** — your power is losable. Standing matters. Loss aversion is stickier than rewards.
3. **Revenue share (eventually)** — platforms pay to check endorsements, fees flow through teams → managers → trainers → players. Not get-rich money, but validates the effort.

### Demand side

Aura doesn't need to fund incentives. Other projects need Sybil-resistant distribution (airdrops, faucets, fair launches). Aura is the verification filter — gate your drop behind Aura verification, rewards go to real humans. Projects are the faucet; Aura is the filter.

**Prerequisite:** Must prove the system actually works first. No selling until accuracy is demonstrated.

---

## The Flywheel

```
AI takes Aura → generates press/attention
  → humans take Aura → builds user base
    → comparison (human vs AI, human vs human) drives engagement
      → verification network grows
        → platforms integrate Aura verification
          → more users → more players → better trust network
```

The AI angle is the ignition. The verification utility is the engine. The game is the fuel.

---

## What's Been Tried and What Failed

**BrightID alone:** Social graph wasn't enough. Only a small percentage (1-5%) want to do evaluation work. The graph existed, people connected, but accuracy wasn't there.

**Old Aura (flat, everyone a player):** No quality control layer. Trust sloshed around without structure. Showed the need for the trainer/manager hierarchy.

**Unitap (faucet gated by verification):** Concept was right — give people a reason to get verified. Project pivoted away. The model (be the Sybil filter for other people's giveaways) remains valid.

**Tokens:** Pain in the ass. Possible but not preferred. Ideally incentives come from external project budgets, not Aura's own token.

---

## Current Sequence

1. **AI Launch Event** — run every major AI model through assessments, publish comparative results. Proves entity distinction, generates attention. Cheap, self-contained, can happen now.

2. **Build verification UI in Aura Player** — the player tools for evaluating subjects. This is the missing piece. Adam's GetVerified becomes the backend; Aura Player becomes the frontend.

3. **Live test with real people** — small group, real stakes, real UI. Players, trainers, managers operating the hierarchy. Measure accuracy against known ground truth.

4. **Faucet partnerships** — once accuracy is proven, pitch to projects: gate your drops behind Aura verification.

5. **Platform integrations** — B2B play for platforms drowning in bots. Revenue model.

---

## Key People

- **Philip** — vision, product, Aura Player app, strategy
- **Adam Stallard** — systems architecture, GetVerified, backend, BrightID legacy, Updraft/SybilRank
- **Ali** — working with Adam on GetVerified and legacy Aura

---

## What Worldcoin Gets Right (and Wrong)

**Right:** People show up for free money. The credential is a side effect. Once they have it, it exists whether they care about it or not.

**Wrong:** One-time biometric scan. Centralized. Binary. Can't lose it (no accountability). "Has eyeballs" ≠ "is trustworthy."

Aura's advantage: ongoing, behavioral, decentralized, losable (accountability through stakes). Aura's disadvantage: harder to explain, harder to bootstrap, no free money on day one.

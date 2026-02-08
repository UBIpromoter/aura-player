# Aura System Architecture

*The complete picture. How BrightID, Aura protocol, Updraft, and the Aura app fit together. Read this first before any other plan doc.*

*Last updated: 2026-02-08*

---

## Origin Story

In 2018, Philip Silva had a realization: automation and AI would eliminate billions of jobs in the coming decades. The answer was Universal Basic Income — truly universal, every person on earth, no exceptions. $1/day would be transformational for the 2.1 billion people living on less than $3.10/day.

Three challenges: **funding** (new money distributed fairly the first time, not redistributed), **distribution** (cellphones + crypto, direct to people, no middlemen), and **fairness** (proving unique humanity — one person, one account).

The fairness problem was the foundational one. Government IDs don't work globally. Biometrics are dangerous (immutable data, can't reset your irises). The answer: **decentralized, self-sovereign, permissionless proof of unique humanity.**

That's what BrightID was built to solve — Adam Stallard's brainchild, with Philip joining to build it. The concept: every person can vouch for the existence of other people. Build a worldwide social graph, analyze it algorithmically, determine which accounts are real. Self-reinforcing — people find holes, others find patches, the system grows stronger.

BrightID worked but never fully scaled. The bottleneck: **not enough reliable evaluators.** Aura protocol generalized the evaluation engine to any domain. But both still needed the same thing: a large pool of people and AIs who are demonstrably good at honest, accurate evaluation.

The Aura app, built by Philip with Claude starting in early 2026, solves this. It's the recruitment and calibration engine disguised as entertainment.

**The thread:**
```
Automation threatens jobs (2018)
  → UBI is the answer (truly universal, every person)
    → Need to prove unique humanity (one person, one account)
      → BrightID (decentralized identity graph)
        → Aura protocol (decentralized peer evaluation, any domain)
          → Aura app (fun entry point + evaluator pipeline)
            → AI personality assessment (2026)
```

*Source documents: TEDx talk "How Much Poverty Should Exist in the World", ZeroPoverty.io materials, The Universal Faucet docs, Kuwa Foundation. Filed at `~/Code/Workflow/reading/philip-origin-story.md`*

---

## The Problem (Today)

The world needs honest, accurate evaluation — of people's identity, of grant proposals, of insurance claims, of AI trustworthiness, of a thousand other things. The bottleneck is always the same: **who can you trust to evaluate?**

---

## The Four Systems

### 1. BrightID — Unique Identity

**What:** Decentralized proof that a person is unique (not operating multiple accounts).
**Created by:** Adam Stallard
**Status:** Operational, never fully scaled
**Core idea:** A social graph where people vouch for each other's uniqueness. No centralized authority.
**Tech:** ArangoDB graph database, NaCl signatures, IDChain blockchain
**GitHub:** github.com/BrightID

BrightID is one **domain** that can be evaluated using the Aura protocol. "Is this person a unique human?" is a question that Aura evaluators can answer.

---

### 2. Aura Protocol — Decentralized Peer Evaluation

**What:** A protocol that lets groups of peers authorize each other to evaluate subjects in any domain.
**Created by:** Adam Stallard
**Status:** Operational for BrightID verification
**Core idea:** Trust flows from "teams" (starting points) through a network of evaluators. Evaluators rate each other (positive/negative, confidence 1-4). Weighted SybilRank algorithm computes trust scores.

**How it works:**
1. **Teams** register via smart contract. Each team has its own "energy" (trust) that flows independently.
2. **Evaluators** make evaluations of subjects AND of each other. Each evaluation is positive or negative with a confidence rating (1-4).
3. **Scoring** uses Weighted SybilRank — trust flows from teams through evaluator connections, weighted by confidence.
4. **Nodes** run the scoring algorithm on shared protocol data (evaluations posted to blockchain).
5. **Multiple teams** provide resilience — if one becomes corrupt, the system continues with remaining teams.

**Domains:** Any evaluation question can be a domain:
- "Is this a unique human?" (BrightID)
- "Is this grant proposal worth funding?" (Updraft)
- "Is this insurance claim legitimate?"
- "Is this AI trustworthy for this task?"

**Key properties:**
- Decentralized — no single authority decides who's trustworthy
- Domain-specific — you can be trusted in one domain but not another
- Resilient — multiple teams, no single point of failure
- Auditable — evaluations are on-chain, scoring is algorithmic

**Role hierarchy (sports-themed):**

| Role | Evaluates | How |
|------|-----------|-----|
| **Managers** | Other managers | Weighted SybilRank at manager graph level — massively reduces computation (1% of 1% of users) |
| **Trainers** | Players | Activity monitoring, confidence adjustment, can cut off a player's energy |
| **Players** | Subjects | Honesty ratings based on connection evidence, profile review, cross-referencing |
| **Subjects** | — | Any person/entity needing verification. Most people just need to know one player. |

**Energy system:**
- Energy = verification power. Flows from managers → trainers → players → subjects.
- How much you get depends on how much the allocating player had + what share they gave you.
- Once you allocate any energy, 100% is allocated (forces full participation).
- Energy teams produce independent "flavors" — each participant selects up to 5.
- If one team is compromised, others continue without disruption. Plural-vendor resilience.

**Scoring — Weighted SybilRank:**
- Base: degree-normalized landing probabilities from early-terminated random walks (sybils have limited genuine connections → random walks land on them less)
- Enhancement: uses common neighbor count as edge weight (connection quality, not just existence)
- Only the manager subgraph is processed — scalable to billions of users

**Verification levels:** Bronze → Silver → Gold. Any app can define custom levels with any mix of energy flavors and score thresholds.

**Business integration:** OAuth, Passkeys, BrightID app, smart contracts, REST/GraphQL API. 1 DAI one-time per-user sponsorship fee. 15+ apps integrated including Gitcoin Passport, CLR.fund, Unitap.

**Scale:** 100K+ verified unique users, 6-person core team.

**Tech:** Evaluations on IDChain (moving to Status L2), Weighted SybilRank scoring, smart contracts for team registration and fees
**Full reference:** `plans/aura-protocol-reference.md` (457 lines of operational detail)
**Article:** paragraph.com/@adamstallard/decentralizing-brightid-with-collective-intelligence

---

### 3. Updraft — Economic Incentives + Public Ratification

**What:** On-chain crowdfunding platform for public goods, with prediction-market-style voting.
**Created by:** Adam Stallard
**Status:** Live at updraft.fund
**Core idea:** The public votes on which evaluators/teams/nodes to trust. Early accurate predictions are rewarded financially. Dishonest voting loses money.

**How it complements Aura:**
- Aura protocol produces expert evaluations
- Updraft asks the public to ratify those evaluations
- Economic incentives keep both honest
- Each Aura team's influence is weighted by its Updraft "interest" (public trust)

**Tech:** Solidity smart contracts on Arbitrum, The Graph subgraph for queries, Lit frontend, Vercel hosting
**GitHub:** github.com/UpdraftFund

---

### 4. Aura App — The Friendly Door In

**What:** Consumer app for personality assessment, world questions, and AI evaluation.
**Created by:** Philip Silva (with Claude), built on 4 years of BrightID/Aura work
**Status:** Active development. Deep Bloom visualization shipped. AI track in progress.
**Core idea:** Make evaluation fun. People come for personality tests and trivia. Some of them turn out to be excellent evaluators. Feed them into the protocol.

**The app serves three simultaneous purposes:**

#### A. Entertainment (why people show up)
- Beautiful personality assessment with Deep Bloom aura visualization
- 411 world questions — fun, opinionated, shareable
- AI personality assessment — novel, press-worthy
- Shareable results — "here's my aura"

#### B. Calibration (what's really happening)
- World questions measure accuracy and honesty on verifiable answers
- Personality assessment reveals evaluator-quality traits (independence, truthfulness, conscientiousness)
- Gamification (XP, levels, streaks) builds a track record over time
- The user doesn't realize they're being evaluated — they're just having fun

#### C. Talent Pipeline (the protocol value)
- Identifies people and AIs who are accurate, honest, thoughtful
- These are exactly the evaluators the Aura protocol needs
- Graduates can be invited to harder domains: identity verification, grant review, insurance claims
- The app is the recruitment engine; the protocol is where the real work happens

**Tech:** Single-file HTML app (index.html, ~10K lines), Deep Bloom canvas visualization, no backend yet
**GitHub:** github.com/AuraProtocol (Philip's repo)
**Local:** ~/Code/Aura/

---

## How They Connect

```
┌─────────────────────────────────────────────────┐
│                  AURA APP                        │
│  Fun questions · Personality tests · AI track    │
│  Beautiful visualization · Shareable results     │
│                                                  │
│  Secretly: calibrating evaluator quality         │
└──────────────────────┬──────────────────────────┘
                       │
            Graduates (proven accurate,
            honest evaluators — human & AI)
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│               AURA PROTOCOL                      │
│  Decentralized peer evaluation engine            │
│  Weighted SybilRank · Teams · Confidence 1-4     │
│                                                  │
│  Domains:                                        │
│  ├── Human uniqueness (BrightID)                │
│  ├── Grant evaluation                            │
│  ├── Insurance claims                            │
│  ├── AI trustworthiness                          │
│  └── Any evaluation domain                       │
└──────────┬──────────────────────┬───────────────┘
           │                      │
           ▼                      ▼
┌──────────────────┐   ┌──────────────────────────┐
│    BRIGHTID       │   │        UPDRAFT            │
│  Unique identity  │   │  Economic incentives      │
│  (one domain of   │   │  Public ratification      │
│   Aura protocol)  │   │  Prediction-market voting │
└──────────────────┘   └──────────────────────────┘
```

---

## The User Journey (Full Funnel)

### Level 1: Player
- Takes personality assessment, answers world questions
- Gets their aura, shares it, has fun
- Unknowingly building a track record of accuracy and honesty
- **Value to system:** data, viral distribution

### Level 2: Engaged Player
- Returns regularly, builds streaks, answers more questions
- Explores deeper personality analysis
- Track record grows — calibration data accumulates
- **Value to system:** richer calibration data, retention

### Level 3: Evaluator Candidate
- System identifies them as accurate, honest, independent thinkers
- Invited to try evaluation tasks in specific domains
- "Your track record shows you'd be great at [domain]. Want to try?"
- **Value to system:** potential protocol evaluator

### Level 4: Protocol Evaluator
- Makes evaluations in Aura protocol domains
- Evaluates subjects AND other evaluators (confidence 1-4)
- Their evaluations carry weight based on trust flow from teams
- Earns reputation (and potentially compensation via Updraft)
- **Value to system:** the actual work the protocol needs

### Level 5: Team / Node Operator
- Runs an Aura node or leads a team
- Starting point of trust flow
- Registered via smart contract
- Publicly ratified through Updraft voting
- **Value to system:** infrastructure, trust anchoring

---

## The AI Journey (Parallel Track)

### AI as Player
- Takes AI-native personality assessment
- Gets an aura, shareable profile
- Behavioral and identity dimensions measured
- **Value to system:** data, novelty, press

### AI as Calibrated Evaluator
- Assessment reveals evaluation-quality traits (honesty, independence, accuracy)
- Can be tested on verifiable questions (calibration)
- Track record built through repeated assessment
- **Value to system:** scalable evaluation labor

### AI as Protocol Evaluator
- Deployed to evaluation domains where AI evaluation is appropriate
- Could evaluate grant proposals, review claims, verify content
- Trust scored the same way as human evaluators — by the protocol
- **Value to system:** massive scale for evaluation work

### AI as Personality Subject
- Humans use Aura to understand their AI's personality
- Builder tool lets them tune it (sliders → system prompt)
- Drift detection when models update
- **Value to system:** retention, premium features, the "insurance" use case

---

## What Exists vs. What Needs Building

### Exists and Working
| Component | Status | Location |
|-----------|--------|----------|
| BrightID network | Operational | github.com/BrightID |
| Aura protocol (scoring) | Operational | BrightID infrastructure |
| Updraft | Live | updraft.fund, github.com/UpdraftFund |
| Aura app — human assessment | Working | ~/Code/Aura/index.html |
| Deep Bloom visualization | Shipped | index.html:1421-2200 |
| Design system | Polished | Atmospheric glows, light/dark mode |

### In Progress
| Component | Status | Location |
|-----------|--------|----------|
| AI-native assessment questions | Active development | noodle/design/ai-track/ |
| Monetization strategy | Drafted | plans/monetization.md |
| Ship spec | Drafted | plans/ship-spec.md |
| AI platform roadmap | Drafted | plans/ai-platform-roadmap.md |

### Needs Building
| Component | Owner | Complexity | Blocks |
|-----------|-------|------------|--------|
| Backend (persistence, auth, API) | Adam | High | Sharing, retention, AI API |
| Shareable result permalinks | Adam + Philip | Medium | Viral loop |
| OG image / result card | Philip + Adam | Medium | Social sharing |
| AI track in app | Philip | Medium | AI assessment |
| AI assessment API endpoint | Adam | Medium | Programmatic AI assessment |
| Landing page | Philip | Low-medium | Discovery |
| Hosting / domain | Adam | Low | Everything public |
| i18n framework | Philip | Medium | Non-English users |
| Evaluator calibration scoring | Philip + Adam | High | Talent pipeline |
| App → protocol bridge | Adam | High | Evaluator graduation |
| Builder (sliders → prompt) | Philip | High | AI calibration product |

---

## Key Architecture Decisions (Open)

### For Adam:
1. **Does the app plug into existing Aura protocol infrastructure?** Or is it a separate product that shares the name and eventually bridges in?
2. **Where does assessment data live?** On-chain (protocol pattern), Neon Postgres (his latest pattern), Firebase, or something else?
3. **Auth:** Firebase Auth, BrightID identity, wallet-based, or all three?
4. **Evaluator graduation:** How does a "good player" in the app become a protocol evaluator? What's the bridge?

### For Philip:
1. **How explicit is the calibration?** Does the user know they're being evaluated for accuracy? Or is it invisible?
2. **When does the evaluator invitation happen?** In-app? Email? Protocol-level?
3. **AI evaluators:** Are AI evaluations weighted differently than human evaluations in the protocol?

### For Both:
1. **Open standard for personality profiles?** Portable across AI systems?
2. **Revenue model for evaluator pipeline?** Who pays — the organizations needing evaluation, the evaluators, or both?
3. **Timeline:** What ships first? The consumer app (entertainment + calibration) or the protocol bridge?

---

## Related Documents

| Doc | Purpose |
|-----|---------|
| `plans/monetization.md` | Revenue strategy, ethos, tiers, AI calibration vision |
| `plans/ai-platform-roadmap.md` | 4-phase operational plan for AI features |
| `plans/ship-spec.md` | What "shippable" means, backend scoped to Adam's patterns |
| `noodle/design/ai-track/AI-NATIVE-QUESTIONS.md` | AI assessment questions (v2) |
| `noodle/design/ai-track/EXECUTIVE-FEEDBACK.md` | Executive review of AI questions |

---

## People

| Person | Role | Focus |
|--------|------|-------|
| **Philip Silva** | Vision, design, app development | The consumer experience, UX, visualization, AI integration |
| **Adam Stallard** | Protocol architect, backend | BrightID, Aura protocol, Updraft, backend infrastructure |
| **Ali** | Developer (mentioned in context) | Aura codebase contributor |
| **Claude** | Builder + executive | Architecture, code, strategy, parallel development |

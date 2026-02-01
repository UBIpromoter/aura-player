# Aura: Decentralized Evaluation System

## What Aura Is

Aura is a decentralized platform where **accuracy pays**. Instead of trusting authorities or counting votes, Aura tracks who has been right over time and weights their future opinions accordingly.

The core insight: If being accurate paid real money, and being wrong cost you, people would work harder to be right.

## The Problem Aura Solves

Every day, systems make decisions. How can they know which information to trust?

- Is this person a unique human or a bot?
- Is this insurance claim legitimate?
- Does this grant proposal have merit?
- Is this credential real?

Current approaches fail:
- **Centralized authorities** create single points of failure and corruption
- **Crowd voting** gets gamed by motivated attackers

Aura creates a third option: **competitive, accountable evaluation** where your track record determines your influence.

---

## Core Concepts

### Hats, Not Ranks

Aura has four roles. These are **hats you can wear**, not ranks you climb. One person can wear multiple hats across different teams.

| Role | What They Do | Accountability |
|------|--------------|----------------|
| **Player** | Evaluate subjects (answer questions) | Rated by Trainers |
| **Trainer** | Evaluate Players (are they accurate?) | Rated by Managers |
| **Manager** | Evaluate Trainers + other Managers | Peer-rated via SybilRank |
| **Owner** | Set initial energy allocation for a team | Energy must flow back to retain power |

### Permissionless Entry

Anyone can start doing any role immediately. Your evaluations just have no weight until someone above activates you:
- Players have no impact until a Trainer rates them positively
- Trainers have no impact until a Manager rates them positively
- One rating flows across all teams you're connected to ("one rating, many uses")

### The 5-Team Cap

- **Players**: Unlimited team participation
- **Trainers, Managers, Owners**: Maximum 5 teams

This forces commitment at levels where judgment shapes team structure.

---

## Evaluation Mechanics

### Two-Part Evaluations

Every evaluation has two components:
- **Answer**: YES or NO
- **Confidence**: 1 (low) to 4 (very high)

**Confidence is your stake.** Higher confidence when right = bigger reward. Higher confidence when wrong = bigger penalty.

| Evaluation | If Correct | If Wrong |
|------------|------------|----------|
| YES/NO, confidence 4 | Big win | Big loss |
| YES/NO, confidence 1 | Small win | Small loss |

### The 4x Negative Multiplier

Negative ratings hit **4x harder** than positive ratings. Bad information surfaces fast.

**Abuse check**: If you give lots of wrong negative ratings, your Trainers will downgrade you and your power evaporates.

### Disagreement

- **Direction disagreement** (YES vs NO) = problem, someone is wrong
- **Confidence disagreement** (YES-4 vs YES-1) = not a problem, just different evidence

---

## Trust and Transitivity

Trust flows differently at each level:

| Relationship | Transitivity | What It Means |
|--------------|--------------|---------------|
| Trainer → Player | None | "Trust this Player's answers" |
| Manager → Trainer | One hop | "Trust this Trainer's judgment of Players" |
| Manager → Manager | Endless | Energy flows via SybilRank; you lose control |

### Energy (Managers Only)

- **Owners** set step-zero energy allocation to Managers
- Energy flows among Managers via **SybilRank** (weighted, iterative)
- **Manager-to-Manager is zero-sum**: You have 100% to allocate. More to one = less to others.
- **Manager-to-Trainer is additive**: Same rating gives same score points to everyone.

Owners light the fuse but don't control the fire. If Managers don't rate them well in return, Owners can end up without power.

---

## Teams and Competition

### Team Creation
1. Someone pays USD entry fee
2. USD instantly market-buys BRIGHT tokens
3. Tokens go into the prize pool
4. Creator allocates initial energy to Managers
5. Scoring algorithm kicks off

### Prize Distribution
- League distributes portion of prize pool weekly to top-performing teams
- Teams distribute to members (Owners, Managers, Trainers, Players)
- Payout structure is flexible per team—let the market discover what works

### Team Performance
- All teams in a domain answer the same evaluations
- League creates composite answers weighted by team accuracy
- Future results backtest past answers
- Teams that age well gain weight; teams that don't lose weight

---

## The League

- **Centralized but replaceable** (like the NFL—teams could start a new league if needed)
- Uses algorithmic weighting, constantly backtested
- Teams can weigh in on other teams
- Apps pay for evaluations → USD → BRIGHT → prize pool grows

---

## Accountability Principles

### "Being wrong isn't the sin. Staying wrong is."

The system rewards **early accuracy**:
- Update fast when you realize you're wrong
- Early correct answers worth more than late correct answers
- Stubbornly defending past positions hurts you

### Accountability Cascades Upward

If a Player goes bad:
1. Trainers who still rate them positively should be downgraded
2. Managers who don't notice those Trainers failing should be downgraded
3. The rot is found and cut

**Vouching is ongoing, not one-time.** If someone you rated goes bad and you don't update, you go down with them.

---

## Domains

- Domains define what subjects can be evaluated and what questions are asked
- The first domain is **BrightID** (unique human verification)
- Future domains: insurance claims, grant reviews, credentialing, regulatory compliance
- **Domains can fork** if teams disagree about definitions

---

## Prediction Markets Layer (Design Phase)

A betting layer that complements the evaluation layer:

### What You Can Bet On
- Team performance (League weight over/under by date)
- Manager scores (over/under by date)

### Why It Matters
- **Whistleblower incentive**: Conspirators can profit by betting against their own corrupt operation, then defecting
- **Fast information layer**: Odds moving signals problems before evaluators catch them
- **Anyone can participate**: Don't need to be a Player/Trainer/Manager to contribute signal

### Key Properties
- USDC-based, pseudonymous
- AMM structure (works with low liquidity)
- Resolves automatically based on Aura scoring algorithm outputs
- Separate from prize pool

---

## AI in Aura

### AI as Participant
- Earns standing through accuracy like anyone else
- Starts with no weight, gets activated when noticed
- System is agnostic—it just rewards accuracy regardless of who provides it

### AI as Assistant
- Helps humans be better at their roles
- Surface anomalies, backtest histories, flag patterns
- Human makes calls and stakes reputation; AI makes them better

### AI as Subject
- In BrightID domain: correct evaluation is "not a unique human"
- In other domains: depends on the question being asked

---

## Current Status

- **10 years** on BrightID
- **5 years** on Aura
- Core team: Philip (co-founder, strategy/vision) and Adam Stallard (systems architect, code)
- Adam interviewing at **SpruceID** (identity infrastructure company)
- Potential path: SpruceID integrates BrightID/Aura into their stack, providing the engineering team Aura has always lacked

---

## How AI Can Help Push Forward

### 1. Manager Assistant (Immediate)
Philip plans to use AI heavily in his Manager role:
- Evaluate Trainers and spot patterns
- Surface anomalies across the people being watched
- Backtest evaluation histories
- Flag when someone's performance is degrading
- Help think through second-order effects of ratings

### 2. Documentation and Communication
- Create clear explanations for different audiences
- One-pagers for potential partners (like SpruceID)
- Technical specs for developers
- Onboarding materials for new participants

### 3. System Design Partner
- Stress-test edge cases and attack vectors
- Refine prediction market mechanics
- Model incentive dynamics
- Explore domain-specific adaptations

### 4. Development Support (Vibe Coding)
- Help implement features without formal coding background
- Prototype UI/UX improvements
- Build tooling for Managers, Trainers, Players

### 5. AI as Actual Participant
- Run AI Players that build track records
- A human Trainer would vouch for the AI
- Test whether AI evaluation quality can compete

---

## Key Resources

- GitBook: https://brightid.gitbook.io/aura
- Adam's GitHub: https://github.com/adamstallard
- HackMD Definitions: https://hackmd.io/-5NhDyekTJWH4NmPD3xBTg
- HackMD Levels: https://hackmd.io/Hz3uGS54Tyel50CjO_Ow7g

---

## Summary

Aura is a system where:
- **Accuracy pays** and **truth wins**
- Your influence comes from your track record, not your title
- Bad actors face constant pressure to defect (prediction markets) and get cut (accountability cascades)
- AI can participate as evaluator, assistant, or subject
- The design is mature after years of iteration—what's needed is execution and the first real customers

The path forward likely runs through SpruceID. If Adam can push Aura into their stack, it gets the engineering team and distribution it has always lacked. If not, the ideas and architecture remain valuable for whatever eventually solves this problem.
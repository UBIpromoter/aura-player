# Aura Protocol Reference

> Comprehensive reference compiled from BrightID GitBook documentation, forum posts,
> GitHub repositories, external analyses, and web sources. February 2026.

---

## 1. What is Aura?

Aura is an **open, decentralized network** that lets experts evaluate each other and in turn evaluate subjects, generating **privacy-preserving proofs** across multiple domains.

It is the evolution of BrightID's verification system -- shifting from centralized "meets verification" (Zoom meetings with hosts) to decentralized evaluation by people who already know you.

### Core Design Principles

- **Decentralized administration**: Invites those closest to the source of truth to evaluate claims and make objective rulings
- **Trust-based oversight**: Uses existing trust relationships for oversight rather than central authorities
- **Privacy-preserving**: No personal information is shared with Aura players that they don't already know about a subject
- **Scalable**: Instead of analyzing the whole social graph, Aura analyzes only the graph of Aura managers (a much smaller subset)

### Domains (Current and Planned)

Aura is designed to operate across multiple evaluation domains:

| Domain | What Gets Evaluated |
|--------|-------------------|
| **Unique Humanity** | Is this BrightID a person's only identifier? (BrightID domain -- currently live) |
| **Community Membership** | Does person belong to a specific community? |
| **Residence** | Does person live where they claim? |
| **Insurance Claims** | Are claims legitimate? |
| **Acts of Kindness** | Verifying charitable/kind acts |
| **Platform Moderation** | Content moderation decisions |
| **Regulatory Compliance** | Meeting regulatory requirements |
| **Grant Reviews** | Evaluating grant applications |
| **Open Source Impact** | Assessing open source contributions |
| **Credentialing** | Verifying credentials and qualifications |
| **Code Audits** | Evaluating code quality and security |

New domains can be created by anyone. The system is designed so that different evaluation contexts share the same trust infrastructure but apply domain-specific criteria.

---

## 2. Architecture

### Three-Layer Stack

1. **Mobile App Layer (BrightID)**: Users create QR-code-based peer connections stored locally with cryptographic signatures. The BrightID mobile app creates a universal, socially recoverable identifier for each person.

2. **P2P Node Network**: Synchronizes the social graph across independent verification nodes. Aura runs on forked BrightID nodes (`BrightID-Aura-Node`) with specialized operations for subjects, players, trainers, and managers.

3. **IDChain (PoA Sidechain)**: Records all connection changes immutably on an Ethereum-compatible blockchain.

### Aura Node Components

From the `BrightID-Aura-Node` repository:

| Component | Function |
|-----------|----------|
| `consensus/` | Consensus mechanism implementation |
| `db/` | Database layer (social graph storage) |
| `scorer/` | Scoring algorithm module (energy/verification calculations) |
| `updater/` | Update mechanism |
| `web/` | Web interface |
| `web_services/` | API services |

### Aura Web App (aura.brightid.org)

- Progressive Web Application (PWA) -- not a native app
- Connects to BrightID system via API
- User information appears after authorization using Explorer Code
- Energy calculations occur in real-time
- Supports OAuth, Passkeys, and BrightID mobile app for authentication

### Login Flow

1. Visit https://aura.brightid.org
2. **On computer**: Open BrightID mobile app > "Scan a code" > scan QR from Aura login screen
3. **On mobile**: Click the link on Aura login screen
4. Name the "super app device" being created (e.g., "Aura-Chrome-Laptop")
5. Aura gains access to all BrightID user identities, avatars, and can create "Evaluations" (special BrightID connections)

---

## 3. Roles & Hierarchy

Aura uses a sports-themed role hierarchy:

### Subjects

- Any BrightID user who needs to be verified
- Must make a connection to an Aura player
- May be asked to make connections to people they know
- Most people won't need to play Aura -- they just need to know one person who is playing

### Players

- The core evaluators -- people who know users and do the work to verify them
- Anyone can start as a **provisional player**
- Players evaluate Subjects by giving them **honesty ratings**
- Players accumulate **energy** (verification power) based on how other players/trainers rate them
- Multiple ways to participate in verification

### Trainers

- **Advanced role** -- trainers evaluate Players (not Subjects directly)
- Use evidence by looking at:
  - A Player's **activity** (the evaluations a Player has made)
  - How **other Trainers** have evaluated the Player
- Receive **Activity Alerts** when Players they oversee make changes:
  - Player evaluates a large number of subjects in a short period
  - Evaluations from other Trainers change
- Can **lower confidence** of their evaluation of suspicious Players
- Can give **negative evaluations** to cut off a Player's ability to verify subjects

### Managers

- The highest-level role in the system
- Evaluate and give energy to other managers
- The portion of the graph analyzed by Weighted SybilRank operates at the manager level
- Can adjust or cut off the flow of energy as needed
- Provide the foundation of trust for the entire system

### Role Flow

```
Managers --> evaluate --> Managers (via Weighted SybilRank)
Trainers --> evaluate --> Players (activity monitoring + confidence ratings)
Players  --> evaluate --> Subjects (honesty ratings)
```

---

## 4. Evaluation Process

### How Players Evaluate Subjects (BrightID Domain)

In the BrightID domain, the core question is: **"Is this BrightID identifier a person's only identifier, or a duplicate?"**

#### Evidence Available to Players

Players use several types of evidence when evaluating:

1. **Subject Profile**: Review of the subject's BrightID profile
2. **Evidence**: Supporting information about the subject
3. **Expected Connections**: Analysis of who the subject should be connected to -- does their connection pattern match a real person?
4. **Known Identifiers**: A privacy-preserving tool that lets experts cross-reference information across participants without exposing sensitive identifiers to uninvolved parties
5. **Evaluations**: What other players have said about this subject

#### Honesty Ratings

- Players assign subjects a numerical **honesty rating**
- A rating of at least "1" is the minimum to allocate energy
- Honesty ratings directly influence whether a subject achieves a verification level

#### Connection Types (BrightID Foundation)

The underlying BrightID connections that inform evaluations:

| Level | Meaning |
|-------|---------|
| **Already Known** | Closest relationships -- family, friends, colleagues, trusted community members. Includes online relationships built over shared experiences. |
| **Recovery** | (Hidden sub-level of Already Known) Highly dependable people for social recovery |
| **Just Met** | Recently encountered, either in-person or online. Use carefully -- uncertain future trust. |
| **Suspicious** | Trust has diminished. Can reassign from "Just Met" when initial positive impressions fail. |

**Key principle**: The lowest selected level of familiarity between two users becomes the actual connection value. Connections are permanent in the graph even if hidden.

### How Trainers Evaluate Players

Trainers assess player quality through:

1. **Activity monitoring**: Volume and pattern of evaluations
2. **Peer assessment**: What other trainers think of the player
3. **Confidence adjustment**: Trainers assign confidence levels to their evaluations of players
4. **Negative evaluations**: Can completely cut off a player's verification power

---

## 5. Verification Levels

When a subject receives honesty ratings from players, they may achieve one of three **Aura verification levels**:

| Level | Tier |
|-------|------|
| **Bronze** | Entry-level verification |
| **Silver** | Mid-level verification |
| **Gold** | Highest verification |

- Verification level is shown on the top right of the subject's profile page
- If not yet verified, shows "not yet"
- Verification levels include **one or more energy flavors** in their analysis
- Any person or app is free to create their own verification levels with **any mix of energy flavors and score thresholds**

The specific score thresholds for bronze/silver/gold are configurable and may vary by domain or energy team.

---

## 6. Energy System

### What is Energy?

**Energy** measures the ability of an Aura player to verify people, and how well other Aura players think they play the game.

- Players get energy **from other Aura players**
- How much energy flows to you depends on:
  - How much energy the allocating player had
  - What percentage of their energy they allocated to you

### Energy Allocation Rules

- You can allocate energy to any connection you've given an honesty rating of at least "1"
- As soon as you allocate **any** energy, **100% of your energy** will be allocated (forces full participation)
- You should allocate energy to other players based on **how well they play Aura**

### Energy Flow

```
Managers (seed trust)
    |
    v  [Weighted SybilRank]
Managers <--> Managers (mutual evaluation)
    |
    v  [energy allocation]
Trainers
    |
    v  [confidence-weighted]
Players
    |
    v  [honesty ratings]
Subjects (receive verification levels)
```

---

## 7. Scoring: Weighted SybilRank

### SybilRank (Base Algorithm)

Based on **degree-normalized landing probabilities from early-terminated random walks**. The assumption: sybils have limited connections to legitimate users, so random walks starting from honest nodes land on real users more frequently than sybils.

### Weighted SybilRank (Aura's Enhancement)

Uses the **number of common neighbors** of two connected nodes as the weight (trustworthiness factor) of the edge. This incorporates connection quality into the scoring, not just connection existence.

### How It Applies in Aura

- The graph analyzed by SybilRank is **moved inward** -- only the manager-level graph is processed
- **Scalability advantage**: If 1% of BrightID users are Aura participants and 1% of participants are managers, SybilRank processes ~1M nodes instead of potentially 10B
- Managers evaluate and distribute energy to each other through this algorithm
- The algorithm propagates trust from seed nodes outward, with edge weights determining trust flow

### Other Algorithms in BrightID's Anti-Sybil Toolkit

From the `BrightID-AntiSybil` package (used for testing and comparison):

| Algorithm | Approach |
|-----------|----------|
| **SybilRank** | Degree-normalized random walk landing probabilities |
| **WeightedSybilRank** | Common-neighbor-weighted edge version |
| **GroupSybilRank** | Meta-graph where groups become nodes |
| **NormalizedSybilRank** | Topology-constrained (8 nearest neighbors, limited seed connections) |
| **ClusterRank** | Ranks 1-5 based on cross-cluster neighbor count |
| **SeednessScore** | Multi-resolution clustering, seed count / cluster size |
| **Yekta** | Normalized degree with cluster-density adjustments |

---

## 8. Energy Teams & Flavors

### What Are Energy Teams?

Energy teams are **independent groups of managers** that provide distinct trust streams. They are central to Aura's resilience model.

### Energy Flavors

- Each energy team produces a distinct **energy flavor**
- Each participant can select **up to 5 flavors** to send and receive
- Verification levels include one or more energy flavors in their analysis

### Resilience Model

- If one team becomes flawed or corrupt, other teams take its place **without disruption** to verification
- Apps naturally stop using a corrupted energy flavor
- This creates a **plural-vendor** approach that prevents single-point-of-failure capture

### Competition Between Teams

- Teams (and their flavors) **compete with each other** for usage by players and apps
- Teams can adopt **unique strategies and goals** to provide alternatives
- Teams can **cut off energy** to players that deviate from their stated goals
- Anyone can create their own system of trust that can be retroactively empowered with energy

### Reward Structure

- Each energy team has a **reward address**
- Anyone can send tokens to be distributed to players **proportionally to the amount of that team's energy they hold**
- This provides an easy way for apps to **pay for effective sybil protection**

### Teams & Leagues

Teams can focus on different specialties:
- BrightID verification
- Gitcoin grants analysis
- Hybrid approaches
- Domain-specific evaluation

---

## 9. Business Integration

### How Apps Use Aura

Apps integrate with Aura to get assurance that users have only one account (or other domain-specific proofs).

#### Integration Methods

| Method | Description |
|--------|-------------|
| **OAuth** | Standard OAuth flow for web apps |
| **Passkeys** | Modern passwordless authentication |
| **BrightID Mobile App** | QR-code scanning for verification |
| **Smart Contracts** | On-chain verification checks |
| **REST/GraphQL API** | Query verification status via Verification API Gateway |

#### Verification Workflow for Apps

1. User creates connections in BrightID
2. Connections propagate through P2P nodes
3. Nodes execute Aura scoring analysis periodically
4. Results cached in **Verification API Gateway**
5. Apps query verification status

#### Sponsorship Model

- **1 DAI one-time per-user lifetime fee** for sponsorship
- Apps pay to permanently verify new users
- Revenue flows to DAO treasury

#### Custom Verification Levels

Any app is free to create its own verification levels with:
- Any mix of energy flavors
- Custom score thresholds
- Domain-specific criteria

This means apps can require different levels of trust depending on their use case (e.g., a high-value DeFi app might require Gold from multiple energy teams, while a forum might accept Bronze from any team).

### Currently Integrated Apps (as of 2025)

15+ applications including:
- Gitcoin Passport
- CLR.fund
- Eidi Faucet
- Unitap
- Orange Protocol

### Planned Evolution

- **Aura Beta 2**: Migrating dApps from old "meets" model to Aura scoring
- **Ethereum Attestation Service (EAS) integration**: Supporting diverse on/off-chain proof formats
- Expanding beyond unique-humanity verification to multi-domain proofs

---

## 10. Future & Research Tools

### Graph Explorer

- **Legacy**: Old Aura Explorer at explorer.brightid.org
- **New version** (in development): Designed for Aura's role-based system, displays role relationships and evaluation impacts
- **Interactive features**: Shift-click to place dots, add comments/questions about specific regions
- **Use cases**: Flagging suspicious regions, requesting investigation, collaborative analysis

### Activity Alerts

Automated notifications for trainers about suspicious player behavior:
- Mass evaluations in short periods
- Evaluation pattern changes
- Trainer consensus changes

### Research Tools

Tools being developed for deeper analysis of the evaluation graph and detection of coordinated attacks.

---

## 11. Economic Model

- **No token-based rewards** for verification work itself
- **BRIGHT tokens**: Governance only (no circulation rewards)
- **1 DAI sponsorship**: One-time per-user lifetime fee paid by apps
- **Energy team rewards**: Apps can pay teams proportionally to energy held
- **Revenue flow**: DAO treasury funds node operations and research

### Funding History

- $200k from Optimism RetroPGF (2024)
- $50k from Gitcoin Grants (2024)

---

## 12. Key Metrics

- **100,000+ verified unique users** (as of mid-2025)
- **15+ integrated applications**
- **6-person core team** including Adam Stallard (Founder/Tech Lead) and Philip Silva (Cofounder)

---

## 13. Vulnerabilities & Open Questions

From academic and community analysis:

| Concern | Details |
|---------|---------|
| **Coordinated sybil networks** | Fake networks could exploit trust circles if they establish enough genuine-looking connections |
| **Graph privacy** | Exposing social topology creates data exposure risks |
| **Subjective trust quality** | System struggles to assess the quality (not just existence) of relationships |
| **Geographic bootstrapping** | New users in regions with few existing users face onboarding friction |
| **Revenue sustainability** | Whether 1 DAI sponsorship scales with growth |
| **Manager capture** | If manager-level nodes are compromised, energy flow to entire subtrees is affected (mitigated by multiple energy teams) |

---

## 14. How Aura Differs from Alternatives

| Approach | Aura's Advantage |
|----------|-----------------|
| **Biometric PoP** (Worldcoin, etc.) | No hardware required, no biometric data collection, privacy-preserving |
| **Centralized verification** | Decentralized -- no single point of failure or control |
| **Full graph analysis** | Scalable -- only analyzes manager subgraph, not entire social graph |
| **Single-algorithm detection** | Multi-layered -- players, trainers, managers each add evaluation depth |
| **Static trust** | Dynamic -- energy can be adjusted or cut off in response to attacks |

---

## Sources

### Official Documentation
- [Aura GitBook](https://brightid.gitbook.io/aura) -- Main documentation (many deeper pages currently returning 404; docs appear to be in active restructuring)
- [BrightID GitBook](https://brightid.gitbook.io/brightid) -- Parent project documentation
- [Aura App](https://aura.brightid.org/) -- Live web application

### GitHub Repositories
- [BrightID-AntiSybil](https://github.com/BrightID/BrightID-AntiSybil) -- Sybil detection algorithms (SybilRank, WeightedSybilRank, etc.)
- [BrightID-Aura-Node (Meta-Node)](https://github.com/Meta-Node/BrightID-Aura-Node) -- Aura node implementation
- [BrightID-Aura-Node (0xoc)](https://github.com/0xoc/BrightID-Aura-Node) -- Fork with custom Aura code

### Community & Analysis
- [BrightID Forum: Aura Proposal](https://forum.brightid.org/t/aura-a-new-verification-for-brightid/393)
- [Gitcoin Governance: Aura Analysis](https://gov.gitcoin.co/t/what-can-we-learn-from-brightids-aura-sybil-defense-software/11159)
- [KAIST 2025 Report: BrightID](https://web3classdao.github.io/kaist2025/reports/brightid/)
- [Octant: BrightID Protocol](https://discuss.octant.app/t/brightid-decentralized-uniqueness-protocol/79)
- [Adam Stallard on Mirror](https://mirror.xyz/adamstallard.eth/Up0RpURQ24Ehh5Dw6vTDgMm67QAdoiCJEVt0576sTvU)
- [Emotion Agency: Aura App Development](https://www.emotion-agency.com/en/projects/aura-brightid/)
- [Frontiers: Subjective Sybil-Resistance Review](https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2020.590171/full)

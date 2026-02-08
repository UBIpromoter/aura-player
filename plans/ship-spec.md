# Aura Ship Spec

*What "shippable" means. Not MVP — the real thing, end-to-end. Last updated: 2026-02-08*

---

## Definition of Ship

A person (or AI) can discover Aura, take the assessment, see their aura, save it, share it, and come back later. Both entity tracks work. The experience is beautiful, fast, and complete enough that someone who encounters it says "this is real" — not "this is a prototype."

Four years of work. Ship the vision, not the minimum.

---

## The Journey (what must work end-to-end)

| Step | Status | What's Needed |
|------|--------|---------------|
| 1. **Discover** — land on Aura | Missing | Landing page, hosting, domain |
| 2. **Entity gate** — human or AI? | In design | Simple routing question (in AI questions spec) |
| 3. **Take the assessment** — human track | Working | Polish, i18n framework |
| 4. **Take the assessment** — AI track | In progress | AI-native questions integration, API endpoint |
| 5. **See my aura** — Deep Bloom visualization | Working | Solid |
| 6. **Read my profile** — personality breakdown | Partial | Detailed analysis layer, type labels |
| 7. **Save my result** — persistence | Missing | Backend: accounts, database |
| 8. **Share my result** — viral loop | Missing | Permalink, OG card/image, embed |
| 9. **Come back later** — retention | Missing | Backend: auth, saved profiles |
| 10. **Retake / track changes** — temporal | Missing | Backend: history, comparison |

---

## Frontend (Philip's domain)

### Already built:
- Deep Bloom visualization (shipped, polished)
- Human assessment flow (working)
- Design system — atmospheric glows, light/dark mode
- Single-file app architecture

### Needs building:
- [ ] **AI track integration** — AI-native questions in the app, entity gate routing
- [ ] **Landing page** — what is Aura, why should I care, start the test. Not a marketing page — an invitation.
- [ ] **Result card** — the shareable artifact. Screenshot-ready. Generates OG preview when link is pasted.
- [ ] **Detailed analysis view** — the depth layer behind the aura. Dimensions explained, what the combinations mean.
- [ ] **i18n framework** — string extraction, locale system. Ship in English, structure for translation.
- [ ] **New input components** — ranking input (tap-to-rank), spectrum slider (1-7) for AI track question types
- [ ] **Profile page** — saved aura, history, shareable link

---

## Backend (Adam's domain)

### Adam's Stack (from BrightID + Updraft repos)

Adam has two architectural modes. Both are TypeScript + Vite. They diverge on everything else:

**Mode 1: Traditional web app** (aura-dashboard, aura-frontend, aura-verified)

| Layer | Pattern |
|-------|---------|
| **Language** | TypeScript |
| **Frontend** | React 19 + React Router |
| **Build** | Vite |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **Data fetching** | TanStack Query |
| **Backend/Auth** | Firebase (Auth + Firestore) |
| **Validation** | Zod |
| **Web3** | viem, brightid_sdk |

**Mode 2: Maximally decentralized** (Updraft — updraft.fund)

| Layer | Pattern |
|-------|---------|
| **Language** | TypeScript |
| **Frontend** | Lit 3 web components (not React) |
| **Build** | Vite 6 |
| **Styling** | CSS modules/themes (no Tailwind) |
| **State** | @lit-labs/signals |
| **Backend** | None. Smart contracts = source of truth |
| **Data layer** | The Graph (subgraph) — GraphQL queries via urql |
| **Auth** | Wallet connection only. No accounts, no sessions. |
| **Hosting** | Vercel (SPA + serverless functions) |
| **Light CMS** | Supabase (only for campaigns editorial feature) |
| **Serverless** | Vercel functions for OG image generation + social meta |
| **Contracts** | Solidity 0.8.30 + Hardhat + viem |

**Repos:** github.com/UpdraftFund — `updraft-frontend-lit-ts`, `updraft-contracts`, `updraft-subgraph`, `updraft-schemas`

**Mode 3: Latest backend pattern** (aura-verified — most current)

| Layer | Pattern |
|-------|---------|
| **Language** | TypeScript |
| **Hosting** | Vercel serverless functions |
| **Database** | Neon Postgres (serverless) + Drizzle ORM |
| **Auth** | Firebase Auth (sessions) + Ethereum wallet signatures (via viem `verifyMessage`) |
| **Validation** | Zod |
| **API style** | REST, file-based routing (`/api/login.ts`, `/api/projects/[id]/verify.ts`) |
| **CORS** | Manual (withCors higher-order function wrapper) |
| **Processing** | Python for scoring/consensus pipelines (BrightID-Node pattern) |

**Also notable:** BrightID-Node uses ArangoDB (graph database) for the social graph, with Foxx microservices running inside the DB. Python services handle scoring and consensus. 7 Docker services coordinated through shared DB.

### Recommendation for Aura

Based on his most recent work, the natural fit is:

- **Vercel** for hosting + serverless functions (his current pattern for both Updraft and aura-verified)
- **Neon Postgres + Drizzle ORM** for data (his latest backend choice, type-safe, serverless-friendly)
- **Firebase Auth** for identity, with BrightID/wallet as optional paths (hybrid auth, his aura-verified pattern)
- **Vercel serverless** for AI assessment API + OG image generation (matches both Updraft and aura-verified)
- **Zod** for validation at every API boundary
- **File-based routing** — each endpoint is a single file in `/api/`

The key insight: Adam builds **minimal backends**. Serverless functions, managed databases, no Express servers. The backend should be as thin as possible — just the plumbing between the frontend and the data store.

### What the backend needs to do:

**Core (ship-blocking):**
- [ ] **User accounts** — sign up, sign in. Firebase Auth is Adam's pattern. BrightID identity integration optional but natural.
- [ ] **Assessment storage** — save answers + computed profile. Firestore or equivalent.
- [ ] **Profile permalinks** — `/profile/{id}` returns the aura card + data. Powers sharing.
- [ ] **OG image generation** — when a link is shared, generate a preview image of the aura. Could be server-side canvas render or pre-generated on save.
- [ ] **AI assessment API** — `POST /api/assess` accepts JSON answers, returns profile. Rate-limited, API key optional for v1.

**Important (ship-enhancing):**
- [ ] **Assessment history** — store multiple assessments per user for temporal tracking
- [ ] **Anonymous mode** — take the test without an account, create account to save. Don't gate the experience.
- [ ] **Basic analytics** — assessment completions, drop-off points, shares. Could be Firebase Analytics.

**Not needed for ship:**
- Payment infrastructure
- Builder/slider feature
- Drift detection
- Social features (compatibility, comparison)
- Full API key management
- White-label/embed system

### Suggested Architecture

```
┌─────────────────────────────────────────┐
│            Frontend (Vite)              │
│  Current index.html → shell wrapper     │
│  Framework TBD (React or Lit — Adam's   │
│  call, he uses both)                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Vercel (hosting + serverless)      │
│  Firebase Auth for sessions             │
│  BrightID / wallet login optional       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Vercel Serverless Functions (/api/)  │
│  POST /api/assess    (AI assessment)    │
│  GET  /api/profile/:id (public profile) │
│  POST /api/profile/save                 │
│  GET  /api/og/:id    (OG image/meta)    │
│  POST /api/login     (auth)             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     Neon Postgres + Drizzle ORM         │
│  Users · Assessments · Profiles ·       │
│  History · API keys                     │
│  (serverless, type-safe, migrations)    │
└─────────────────────────────────────────┘
```

### Migration Path

Current state: single `index.html` (~10K lines).

The migration doesn't have to be all-at-once:
1. Wrap `index.html` in a Vite shell (existing code as a component)
2. Add Vercel deployment + Firebase Auth
3. Add Neon Postgres + Drizzle for persistence
4. Add API routes for profiles, AI assessment, OG images
5. Gradually extract components from the monolith as needed

This lets us ship without a full rewrite. The monolith works — add the infrastructure around it.

---

## i18n Strategy

### The nuance problem:
Personality assessment is linguistically sensitive. "Directness" doesn't carry the same cultural weight in Japanese as in English. Translating questions isn't just word substitution — it's cultural adaptation.

### Ship plan:
- [ ] **Build the plumbing** — string extraction, locale files, language selector
- [ ] **Ship in English** — full experience, no translation debt
- [ ] **Add languages post-launch** — one at a time, with native speaker validation of question nuance
- [ ] **Framework languages first** — Spanish, Portuguese, Mandarin, Hindi (largest populations)
- [ ] **AI as translation accelerator** — AIs can draft translations, humans validate nuance

### Don't:
- Machine-translate the questions without human review
- Assume cultural equivalence across question phrasing
- Block ship on translation

---

## Hosting & Domain

- [ ] **Domain** — TBD. `aura.app`? `getaura.io`? `aura.brightid.org`? Philip + Adam decision.
- [ ] **Hosting** — Firebase Hosting or Vercel. Both fit Adam's stack. Vercel better for edge functions, Firebase better for auth integration.
- [ ] **CDN** — whatever hosting provides. Aura is mostly client-side, so CDN matters less than for server-rendered apps.

---

## Ship Checklist (ordered by dependency)

### Phase A: Foundation (Adam)
1. Firebase project setup (auth, Firestore, hosting)
2. React shell around existing app
3. User accounts (sign up, sign in, anonymous mode)
4. Assessment storage (save answers + profile)

### Phase B: Sharing (Philip + Adam)
5. Profile permalinks
6. OG image generation
7. Result card design
8. Landing page

### Phase C: AI Track (Philip, informed by AI questions window)
9. AI-native questions integrated into app
10. Entity gate routing
11. New input components (ranking, spectrum)
12. AI assessment API endpoint

### Phase D: Polish
13. i18n framework (English only, structure for more)
14. Detailed analysis view
15. Analytics
16. Final visual polish pass

---

## Open Questions for Adam

- **Vercel vs Firebase Hosting?** (He uses Vercel for Updraft, Firebase for aura-dashboard. Vercel seems more current.)
- **Data store?** Firestore, Supabase, or something else? Supabase is lighter touch (his Updraft pattern). Firestore is more integrated if using Firebase Auth.
- **Auth approach?** Firebase Auth (email/password/Google), BrightID identity, wallet-based, or multiple options? BrightID integration is natural but may limit audience. Could offer both.
- **OG image generation?** Vercel serverless function (his Updraft pattern for social meta) — render aura card server-side for link previews.
- **Monolith-wrap-and-extend vs full componentization?** Current index.html is ~10K lines. Could wrap in React/Lit shell and extend, or he may prefer to componentize first.
- **Lit or React?** His newest project (Updraft) uses Lit, not React. His Aura projects use React. Which does he prefer going forward?
- **Where does AI assessment API live?** Vercel serverless function? Separate service?
- **Neon Postgres vs Firestore vs Supabase?** His latest (aura-verified) uses Neon + Drizzle. Worth confirming this is still preferred.

---

## What This Is NOT

- Not a rewrite. The existing app works. We're adding infrastructure around it.
- Not an MVP. Four years of work. Ship the real thing.
- Not a platform launch. Builder, API marketplace, paid tier — all come later.
- Not a marketing launch. No press, no announcement. Ship, validate, then tell the world.

This is: **the complete experience, available on the internet, for anyone who finds it.**

# Aura — Supabase Schema

*Bridge persistence layer. Designed for Phase A (single player), shaped for Phase B (social). Last updated: 2026-02-11.*

---

## Design Principles

- **Claims are the heart.** Every piece of user data is a claim — connected accounts, personal info, assessment results. Inspired by Human Passport's stamp model.
- **Visibility is first-class.** Every claim has a visibility setting from day one. Not bolted on later.
- **Deduplication built in.** Hashed claims prevent one person gaming multiple accounts (Passport pattern).
- **Supabase RLS enforces privacy.** Row Level Security policies ensure visibility rules are database-level, not just UI-level.
- **Schema anticipates Phase B.** Connections and verifications tables exist in the design. Build them when needed.

---

## Tables

### `profiles`

Extends Supabase auth.users. Public-facing identity.

```
profiles
├── id              UUID (PK, references auth.users)
├── display_name    TEXT
├── avatar_url      TEXT
├── bio             TEXT
├── humanity_score  NUMERIC         — computed from claims + verifications
├── created_at      TIMESTAMPTZ
└── updated_at      TIMESTAMPTZ
```

Notes:
- Auto-created on signup via trigger
- `humanity_score` is derived, updated when claims or verifications change
- This is what other users see (filtered by their relationship)

---

### `claims`

The stamp table. Every piece of evidence a user brings in.

```
claims
├── id              UUID (PK)
├── user_id         UUID (FK → profiles)
├── type            TEXT             — 'account' | 'contact' | 'personal' | 'assessment'
├── provider        TEXT             — 'google' | 'facebook' | 'linkedin' | 'github'
│                                      'x' | 'instagram' | 'phone' | 'email'
│                                      'brightid' | 'self' | 'aura'
├── label           TEXT             — human-readable: "My Facebook", "Work email"
├── value           TEXT (encrypted) — the actual data (account URL, phone number, etc.)
├── proof_type      TEXT             — 'oauth' | 'sms_code' | 'magic_link' | 'assessment' | 'self_reported'
├── proof_status    TEXT             — 'verified' | 'pending' | 'expired' | 'unverified'
├── proof_meta      JSONB            — provider-specific: OAuth scopes, verification timestamp, etc.
├── visibility      TEXT             — 'public' | 'verifiers' | 'private'
├── hash            TEXT (unique)    — for deduplication across accounts
├── weight          NUMERIC          — contribution to humanity_score (like Passport stamp weights)
├── created_at      TIMESTAMPTZ
└── updated_at      TIMESTAMPTZ
```

Notes:
- `hash` = hash(provider + normalized_value). Same Facebook account on two Aura profiles → caught.
- `weight` varies by type: verified OAuth account > self-reported claim. Exact weights TBD.
- `visibility` enforced by RLS policies. Verifiers see 'public' + 'verifiers'. Everyone else sees 'public' only. Owner sees all.
- `value` encrypted at rest for PII (phone numbers, emails). Non-PII (GitHub username) can be plaintext.
- Expired OAuth tokens → `proof_status` = 'expired', prompt re-verification.

**Claim lifecycle:**
1. User connects account → claim created, proof_status = 'verified', visibility = user's choice
2. User adds personal info → claim created, proof_status = 'self_reported', visibility = user's choice
3. Verifier confirms a claim → claim's weight increases (Phase B)
4. OAuth expires → proof_status = 'expired', weight reduced until re-verified

---

### `assessment_results`

Structured differently from claims — rich data, not just proof of existence.

```
assessment_results
├── id              UUID (PK)
├── user_id         UUID (FK → profiles)
├── category_id     TEXT             — 'quick-profile' | 'personality' | 'shadow-self' | etc.
├── status          TEXT             — 'in-progress' | 'completed'
├── answers         JSONB            — { questionId: answer } — full response data
├── traits          JSONB            — derived scores: { openness: 0.8, conscientiousness: 0.6 }
├── progress        NUMERIC          — 0.0 to 1.0 (percentage complete)
├── started_at      TIMESTAMPTZ
├── completed_at    TIMESTAMPTZ
└── updated_at      TIMESTAMPTZ
```

Notes:
- Replaces localStorage completion map from Layer 2
- `traits` computed on completion, null while in-progress
- Multiple results per category possible (retakes for temporal tracking — Phase D of ship spec)
- This data feeds the organism viz complexity and the intelligence layer

---

### `connections` (Phase B — design now, build later)

Who knows whom. Unidirectional — "I know this person" is MY data.

```
connections
├── id              UUID (PK)
├── user_id         UUID (FK → profiles)  — the person who knows someone
├── connected_id    UUID (FK → profiles, nullable)  — null if not on Aura yet
├── relationship    TEXT             — 'family' | 'friend' | 'colleague' | 'neighbor' | 'other'
├── context         TEXT             — freeform: "college roommate", "works in my team"
├── source          TEXT             — 'contacts' | 'manual' | 'link' | 'qr'
├── contact_info    JSONB (encrypted) — what I know: { phone, email, name }
├── invited         BOOLEAN          — have I sent them a link?
├── created_at      TIMESTAMPTZ
└── updated_at      TIMESTAMPTZ
```

Notes:
- `connected_id` is null when someone imports a contact who isn't on Aura yet. Backfilled when they join.
- `contact_info` is private to the owner — never exposed to the connected person or anyone else.
- `relationship` informs verification: "you know this person as a colleague" shapes what questions to ask.
- Bidirectional connections are derived: if A→B and B→A both exist, they're mutually connected.

---

### `verifications` (Phase B — design now, build later)

One person verifying another.

```
verifications
├── id              UUID (PK)
├── verifier_id     UUID (FK → profiles)
├── subject_id      UUID (FK → profiles)
├── claim_id        UUID (FK → claims, nullable)  — specific claim being verified, or null for general
├── responses       JSONB            — { questionId: 'yes' | 'no' | 'not_sure' }
├── confidence      INTEGER          — 1-4 (maps to Aura protocol confidence)
├── relationship    TEXT             — how verifier knows the subject
├── created_at      TIMESTAMPTZ
└── updated_at      TIMESTAMPTZ
```

Notes:
- `claim_id` nullable: some verification is about personality/behavior (general), some is about specific claims ("do they really work at Google?")
- `confidence` 1-4 maps directly to Aura protocol scoring
- `responses` uses the yes/no/not-sure pattern from our assessment flow
- One verification per verifier-subject pair per claim. Can update, not duplicate.

---

## RLS Policies (Supabase Row Level Security)

```
-- Profiles: public read, owner write
profiles: SELECT → anyone | UPDATE → owner only

-- Claims: visibility-aware read, owner write
claims (SELECT):
  owner        → all their claims
  verifier     → claims where visibility IN ('public', 'verifiers')
  everyone     → claims where visibility = 'public'
claims (INSERT/UPDATE/DELETE): owner only

-- Assessment results: owner read/write (Phase A), subject+verifier read (Phase B)
assessment_results: SELECT/INSERT/UPDATE → owner only (Phase A)

-- Connections: strictly private to owner
connections: ALL → owner only

-- Verifications: verifier writes, subject reads
verifications: INSERT/UPDATE → verifier | SELECT → verifier OR subject
```

---

## Phase A Build Order

1. **Auth** — Supabase magic link (email). Profile auto-created on signup.
2. **Assessment sync** — assessment_results table replaces localStorage. Layer 2 intelligence reads from Supabase instead of local state.
3. **Basic claims** — email (auto from auth), self-reported info (name, bio). Visibility defaults to 'private'.
4. **First OAuth stamp** — pick one: Google or LinkedIn. Proves the pattern works.

## Phase B Build Order

5. **More OAuth stamps** — Facebook, GitHub, X, Instagram
6. **Phone verification** — SMS code → phone claim
7. **Contact import** — phone contacts → connections table (connected_id null until they join)
8. **Sharing** — link + QR code generation from profile
9. **Verification flow** — verifications table + UI for verifying someone's claims

---

## Open Questions

- **Encryption approach:** Supabase Vault for PII fields? Or application-level encryption?
- **Hash algorithm:** SHA-256 of (provider + normalized_value)? Need to match if we ever bridge to Passport/onchain.
- **Humanity score formula:** Weighted sum of claims (like Passport) + assessment depth + verification count? Exact weights TBD.
- **BrightID stamp:** Direct integration as a claim provider? Adam would know the best path.
- **Portability:** Should claims be exportable as W3C Verifiable Credentials (like Passport does)? Aligns with decentralized ethos but adds complexity.
- **Retakes:** assessment_results allows multiple per category. How do we handle scoring — latest only, or weighted average?

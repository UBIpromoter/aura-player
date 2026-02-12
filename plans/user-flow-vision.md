# Aura User Flow Vision

*Product direction from Philip. Last updated: 2026-02-11.*

---

## Phase A: Single Player (NOW)

Make Aura great for one person. Supabase bridges persistence until Adam's backend is ready.

**The experience:** Sign in → do assessments → see your profile grow → come back tomorrow and it's all there. Intelligence Layer guides you through the journey (smart ordering, insight gating, post-assessment flow).

**Supabase scope:**
- Auth (email/magic link — simple, no passwords)
- Profile persistence (assessment answers, completion state)
- Schema anticipates connections and verifications (design for Phase B, build for Phase A)

**Migration plan:** When Adam's backend arrives, Supabase data migrates. The frontend doesn't care where the data lives — same API shape, different backing store.

---

## Phase B: Social Layer (NEXT)

Verification between real people. The core Aura promise: others confirm who you really are.

### Two Tracks

**Track 1: Build your profile (self-verification)**
You add claims about yourself and choose what to share:
- Assessment results (personality, traits, behavior)
- Connected accounts (Facebook, LinkedIn, etc.)
- Personal information (school, employer, location)
- Contact info, social graph data from your phone

**Track 2: Verify someone else**
You confirm or challenge someone's claims based on what they've chosen to show you.

### Three-Layer Privacy Model

**Layer 1: Claims** — things you assert. Connect accounts, add information, answer assessments. Everything goes into your profile vault.

**Layer 2: Visibility controls** — per-item, per-audience. For each piece of information, you choose:
- **Public** — anyone can see it
- **Verifiers only** — visible to people actively verifying you
- **Private** — only Aura knows (strengthens your trust score behind the scenes, not exposed)

**Layer 3: Verification** — others confirm your claims based on what you've made visible. Verifiers see what you've allowed + assessment-based personality/behavior questions.

### Incentive Structure

More transparency → easier verification → stronger trust score → stronger Aura.

The user is never forced to share. The benefit of sharing is obvious — you choose how much evidence to provide. Connected accounts serve double duty:
- Evidence for verifiers ("yes, this person exists and matches their claims")
- Identity anchoring (harder to fake when linked to real accounts, even if links aren't public)

This maps to the Aura protocol's sybil resistance mission. Not just personality — verifiable identity, as strong as you choose to make it.

### Zero-Friction Connection

Finding and connecting with people to verify must be effortless:
- **Text a link** — tap share, sends URL, recipient lands on your profile ready to verify
- **QR code** — in-person, show screen, they scan, done
- **Contact integration** — pull from phone contacts to find people on Aura, or associate what you know about someone with their profile (private to you)
- **Social graph** — your existing connections inform verification context. "You know this person as a colleague" helps frame verification questions

Contact/social data solves the cold-start problem. You're not verifying strangers — you're verifying people you already know, and the app knows that.

---

## Phase C: Adaptive Intelligence (FUTURE)

System learns from aggregate behavior. Cross-user patterns, engagement prediction, verification quality scoring. Requires backend + meaningful user base. See `ai-platform-roadmap.md`.

---

## Open Questions

- Supabase schema design — what tables, what shape?
- Auth flow — magic link? Social login? BrightID?
- How much of the profile page do we build before backend?
- Adam's timeline and stack decision
- Contact integration: what APIs, what permissions, what platforms?

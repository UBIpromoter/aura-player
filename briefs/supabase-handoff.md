# Handoff: Supabase Foundation — Get It Working

**Branch:** `feature/supabase-foundation`
**Last commit:** `04c4014`
**Brief:** `briefs/supabase-foundation.md` (original spec)

---

## What's Built

All code is in `index.html` on this branch. Four things were built:

1. **Password auth** (Script #3, ~line 1264): `signUpWithPassword()` and `signInWithPassword()` using `auraDB.auth.signUp/signInWithPassword`. Auth state tracked via `onAuthStateChange` listener that sets `AURA_AUTH_USER` and dispatches `aura-auth-change` CustomEvent.

2. **Assessment sync** (Script #3, ~line 1320): `saveAssessmentToCloud()`, `loadAssessmentsFromCloud()`, `migrateLocalAssessments()`. Called from `assessCompleteTest()` (~line 11698) and `assessSaveAndExit()` (~line 11625). Uses upsert on `assessment_results` table with `onConflict: 'user_id,category_id'`.

3. **Email claim** (Script #3, ~line 1290): `createEmailClaim()` — auto-creates a claim row on SIGNED_IN event with SHA-256 hash.

4. **UI** — WelcomeScreen (~line 5257) and ProfileSection (~line 6950) both have email+password sign-in/sign-up forms. Three modes each: welcome/signin/signup (Welcome) and view/signin/signup (Profile).

## What's in Supabase (already configured)

- **Tables:** profiles, claims, assessment_results, responses (+ profiles_legacy)
- **RLS:** enabled on all tables with policies
- **Grants:** ALL granted to `authenticated` on profiles, claims, assessment_results, responses
- **Triggers:** auto-create profile on signup, auto-update `updated_at`
- **Auth settings:** Email provider enabled, "Confirm email" OFF, min password 6, OTP length 6
- **Migration SQL:** `plans/supabase-migration.sql` (already run, don't run again)

## What's NOT Working — Fix These

### 1. AbortError on assessment captures
**Symptom:** `[Aura] Assessment capture failed: AbortError: signal is aborted without reason` in console during assessments.
**Where:** `captureAssessResponse()` at ~line 1112 inserts into `responses` table.
**Likely cause:** The Supabase client may not have an active auth session when these fire. The function doesn't check if the user is signed in before inserting — it always inserts (was designed for pre-auth anonymous capture too). But with RLS now enabled on `responses`, anonymous inserts might be blocked.
**Fix options:**
  - Add an `anon` INSERT policy on `responses` that allows inserts without auth (it already has `FOR INSERT WITH CHECK (true)` — verify this is working)
  - OR wrap `captureAssessResponse` with an auth check and skip cloud capture when signed out
  - OR check if the AbortError is actually a Supabase JS client issue — the CDN loads `@supabase/supabase-js@2` (no pinned version). Try pinning to a specific version like `@2.45.0`

### 2. Assessment save not verified
**Symptom:** `assessment_results` table had 0 rows after Philip completed a test.
**Where:** `assessCompleteTest()` at ~line 11696 calls `saveAssessmentToCloud()`.
**Likely cause:** Same session issue — Philip's sign-in attempts were failing (invalid credentials from deleted user), so `getCurrentUser()` returned null at test completion time.
**Test:** Create a FRESH account via "Create Account" (not "Sign In"). Complete a test. Check `assessment_results` table in Supabase dashboard.

### 3. Email claim not verified
**Same root cause** — claims are created in `onAuthStateChange` SIGNED_IN handler. If auth works, this should work. Test after fixing #1/#2.

## Testing Checklist

1. Open `http://localhost:3000` (run `npx serve -p 3000` from project root)
2. Click "Sign In" → "New here? Create account"
3. Enter a fresh email + password (min 6 chars) → Create Account
4. Check Supabase: **Authentication → Users** (user exists?), **Table Editor → profiles** (row?), **claims** (row?)
5. Take an assessment all the way through
6. Check: **assessment_results** (row with your category_id?)
7. Check browser console — any red `[Aura]` errors?
8. Sign out → Sign back in → check if completed assessments still show (cloud load working?)

## Key Files

| What | Where in index.html |
|------|---------------------|
| Supabase client init | ~line 1042 |
| Auth state listener | ~line 1062 |
| Auth functions | ~line 1264 |
| Email claim | ~line 1290 |
| Assessment sync | ~line 1320 |
| Response capture | ~line 1112 |
| WelcomeScreen | ~line 5257 |
| ProfileSection | ~line 6950 |
| getCurrentUser() | ~line 1445 |
| assessCompleteTest() | ~line 11688 |
| assessSaveAndExit() | ~line 11610 |
| App auth listener | ~line 11820 |

## Schema Reference

Full schema: `plans/supabase-schema.md`
Migration (already run): `plans/supabase-migration.sql`

# Brief: Supabase Foundation — Auth + Assessment Persistence

**Priority: High — this unlocks the real app**

## Context

Aura currently stores all assessment data in localStorage. Close the tab, switch devices — gone. We're adding Supabase as the persistence layer so users can sign in, save progress, and come back.

This is Phase A: single-player experience with real persistence. No social features, no verification, no connected accounts yet. Just: sign in, do assessments, your data is saved.

Full schema reference: `plans/supabase-schema.md`

## What to Build

### 1. Supabase Project Setup

Create/connect Supabase project. Set up three tables with RLS:

**`profiles`** (extends auth.users):
```sql
create table profiles (
  id uuid primary key references auth.users,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- RLS
alter table profiles enable row level security;
create policy "Public read" on profiles for select using (true);
create policy "Owner update" on profiles for update using (auth.uid() = id);
```

**`claims`** (stamps — build the table, only use it for email claim initially):
```sql
create table claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  type text not null,           -- 'account' | 'contact' | 'personal' | 'assessment'
  provider text not null,       -- 'email' | 'google' | 'self' | 'aura' | etc.
  label text,
  value text,
  proof_type text,              -- 'magic_link' | 'oauth' | 'self_reported' | 'assessment'
  proof_status text default 'unverified',
  visibility text default 'private',
  hash text unique,
  weight numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table claims enable row level security;
create policy "Owner full access" on claims for all using (auth.uid() = user_id);
create policy "Public read" on claims for select using (visibility = 'public');
```

**`assessment_results`**:
```sql
create table assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  category_id text not null,
  status text default 'in-progress',
  answers jsonb default '{}',
  traits jsonb,
  progress numeric default 0,
  started_at timestamptz default now(),
  completed_at timestamptz,
  updated_at timestamptz default now()
);

-- RLS
alter table assessment_results enable row level security;
create policy "Owner full access" on assessment_results for all using (auth.uid() = user_id);
```

### 2. Auth Flow

**Magic link (email) — simple, no passwords.**

UI needs:
- Sign in / Sign up screen (one screen — magic link works for both)
- Email input + "Send magic link" button
- "Check your email" confirmation state
- Sign out button (in settings or nav)
- Signed-in indicator (avatar/name in nav)

UX rules:
- **Don't gate the assessment.** Users can take assessments without signing in. Prompt to sign in when they try to save/leave. "Sign in to save your progress."
- If they sign in after completing assessments, migrate their localStorage data to Supabase (see section 3)
- Keep it minimal. One screen, one input, one button. No social logins yet (that's Phase A-2).

### 3. Assessment Data Sync

This is the critical piece. Currently:
- `assessCompleted` — set of completed assessment IDs
- `assessInProgress` — map of partial progress
- Layer 2 functions (`getCategoryStatus`, etc.) read from these

After this build:
- **Signed in:** read/write assessment_results table. Layer 2 functions read from Supabase data.
- **Signed out:** keep using localStorage (the current behavior). Everything still works offline.
- **Sign-in migration:** on first sign-in, check localStorage for existing assessment data. If found, push it to Supabase. Then clear localStorage assessment data (Supabase is now source of truth).

The Layer 2 intelligence (dynamic reordering, insight gating, profile depth) must keep working. The data source changes, the logic doesn't.

### 4. First Claim: Email

On sign-up, auto-create a claim:
- type: 'contact'
- provider: 'email'
- value: user's email
- proof_type: 'magic_link'
- proof_status: 'verified' (magic link IS the proof)
- visibility: 'private' (default — user can change later)
- hash: SHA-256('email:' + normalized_email)

This establishes the pattern. Every future data connection follows the same claims table shape.

## What NOT to Build

- No OAuth stamps (Google, Facebook, etc.) — next phase
- No connections table / contact import — Phase B
- No verifications — Phase B
- No sharing / QR codes — Phase B
- No profile editing UI beyond name — keep it minimal
- No humanity score computation — just the column, no formula yet
- No changes to the assessment questions or flow — only the data layer

## Technical Notes

- Supabase JS client: `@supabase/supabase-js` — add via CDN (app is a single HTML file, no bundler)
- Environment: Supabase URL + anon key go in the app config. Anon key is safe to expose (RLS handles security).
- The app is a single `index.html` (~13K lines). Add Supabase client near the top with other script tags.
- Assessment state lives around lines 4147-4215 (category data) and 8330-8600+ (AssessPickerScreen, Layer 2 logic)
- Existing state: `assessCompleted`, `assessInProgress`, `getCategoryStatus()`, `getCompletedCategoryCount()`

## Check DESIGN.md and TOKENS.md before starting.
## Read plans/supabase-schema.md for full schema context.

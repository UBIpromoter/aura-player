-- ============================================================
-- AURA PLAYER — Supabase Schema Migration
-- Run in Supabase Dashboard → SQL Editor
-- Tables: profiles, assessment_results, responses, claims, comparisons
-- ============================================================

-- 1. PROFILES — auto-created on signup via trigger
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  entity_type text default 'human',
  profile_summary jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

-- Drop existing trigger if re-running
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. ASSESSMENT_RESULTS — one row per user per test, upsert on (user_id, category_id)
create table if not exists public.assessment_results (
  user_id uuid not null references public.profiles on delete cascade,
  category_id text not null,
  status text not null default 'in_progress',
  answers jsonb default '{}'::jsonb,
  traits jsonb default '{}'::jsonb,
  progress jsonb default '{}'::jsonb,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  primary key (user_id, category_id)
);

alter table public.assessment_results enable row level security;

create policy "Users manage own assessments"
  on public.assessment_results for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 3. RESPONSES — individual question answers, auth-gated inserts
create table if not exists public.responses (
  id bigint generated always as identity primary key,
  session_id text,
  question_id int,
  answer text,
  confidence int,
  email text,
  test_id text,
  snapshot jsonb,
  created_at timestamptz default now()
);

alter table public.responses enable row level security;

create policy "Authenticated users insert responses"
  on public.responses for insert
  to authenticated
  with check (true);

create policy "Users read own responses"
  on public.responses for select
  to authenticated
  using (email = auth.jwt() ->> 'email');

create policy "Users update own responses"
  on public.responses for update
  to authenticated
  using (email = auth.jwt() ->> 'email' or email is null);


-- 4. CLAIMS — account linking / stamps / identity bridge
create table if not exists public.claims (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles on delete cascade,
  type text not null,
  provider text not null,
  label text,
  value text,
  proof_type text default 'self_reported',
  proof_status text default 'unverified',
  visibility text default 'public',
  hash text unique,
  weight int default 0,
  created_at timestamptz default now()
);

alter table public.claims enable row level security;

create policy "Users manage own claims"
  on public.claims for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Public claims readable by all"
  on public.claims for select
  using (visibility = 'public');


-- 5. COMPARISONS — immutable short links for social sharing
create table if not exists public.comparisons (
  id text primary key,
  traits jsonb not null,
  name text,
  entity_type text default 'human',
  created_at timestamptz default now()
);

alter table public.comparisons enable row level security;

create policy "Anyone can read comparisons"
  on public.comparisons for select
  using (true);

create policy "Authenticated users create comparisons"
  on public.comparisons for insert
  to authenticated
  with check (true);


-- ============================================================
-- INDEXES for common queries
-- ============================================================
create index if not exists idx_assessment_results_user
  on public.assessment_results (user_id);

create index if not exists idx_responses_session
  on public.responses (session_id);

create index if not exists idx_responses_email
  on public.responses (email);

create index if not exists idx_claims_user
  on public.claims (user_id);

create index if not exists idx_claims_hash
  on public.claims (hash);

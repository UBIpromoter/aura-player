-- Aura Supabase Foundation — Migration Script
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)
--
-- Creates: profiles, claims, assessment_results
-- Sets up: RLS policies, auto-profile trigger
--
-- IMPORTANT: Run this AFTER enabling Auth in Supabase dashboard.
-- Also configure: Authentication → URL Configuration → Site URL + Redirect URLs

-- ============================================================
-- 0. CLEAN UP OLD TABLES — old email+PIN system is replaced
-- ============================================================

-- Back up old profiles table (email+PIN) before dropping
alter table if exists public.profiles rename to profiles_legacy;

-- ============================================================
-- 1. PROFILES — extends auth.users
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists (idempotent)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;

drop policy if exists "Public read profiles" on public.profiles;
create policy "Public read profiles" on public.profiles
  for select using (true);

drop policy if exists "Owner update profile" on public.profiles;
create policy "Owner update profile" on public.profiles
  for update using (auth.uid() = id);

-- ============================================================
-- 2. CLAIMS — the stamp table
-- ============================================================

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,             -- 'account' | 'contact' | 'personal' | 'assessment'
  provider text not null,         -- 'email' | 'google' | 'self' | 'aura' | etc.
  label text,
  value text,
  proof_type text,                -- 'magic_link' | 'oauth' | 'self_reported' | 'assessment'
  proof_status text default 'unverified',
  visibility text default 'private',
  hash text unique,
  weight numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.claims enable row level security;

drop policy if exists "Owner full access claims" on public.claims;
create policy "Owner full access claims" on public.claims
  for all using (auth.uid() = user_id);

drop policy if exists "Public read visible claims" on public.claims;
create policy "Public read visible claims" on public.claims
  for select using (visibility = 'public');

-- ============================================================
-- 3. ASSESSMENT_RESULTS — replaces localStorage for signed-in users
-- ============================================================

create table if not exists public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  category_id text not null,      -- 'quick-profile' | 'bigfive-O' | etc.
  status text default 'in-progress',
  answers jsonb default '{}',
  traits jsonb,
  progress numeric default 0,
  started_at timestamptz default now(),
  completed_at timestamptz,
  updated_at timestamptz default now()
);

-- Unique constraint: one result per user per category (upsert target)
create unique index if not exists assessment_results_user_category
  on public.assessment_results (user_id, category_id);

-- RLS
alter table public.assessment_results enable row level security;

drop policy if exists "Owner full access assessment_results" on public.assessment_results;
create policy "Owner full access assessment_results" on public.assessment_results
  for all using (auth.uid() = user_id);

-- ============================================================
-- 4. UPDATED_AT TRIGGER — auto-update timestamps
-- ============================================================

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

drop trigger if exists claims_updated_at on public.claims;
create trigger claims_updated_at
  before update on public.claims
  for each row execute function public.update_updated_at();

drop trigger if exists assessment_results_updated_at on public.assessment_results;
create trigger assessment_results_updated_at
  before update on public.assessment_results
  for each row execute function public.update_updated_at();

-- ============================================================
-- 5. PROFILE SUMMARY — denormalized public snapshot for sharing
-- ============================================================

-- Add profile_summary column (run this separately if tables already exist)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_summary jsonb DEFAULT '{}';

-- Stores: { assessment_count, stamp_count, entity_type, updated_at }
-- Updated on assessment completion and claim changes.
-- Public-readable via existing "Public read profiles" policy.

-- ============================================================
-- DONE. Verify with:
--   select table_name from information_schema.tables where table_schema = 'public';
--   select column_name from information_schema.columns where table_name = 'profiles';
-- ============================================================

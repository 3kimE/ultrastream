-- ============================================================
-- ULTRASTREAM — Supabase Schema
-- Run this in the Supabase SQL editor (supabase.com → SQL Editor)
-- ============================================================

-- 1. PROFILES — extended user data (linked to auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  first_name  text,
  last_name   text,
  whatsapp    text,
  created_at  timestamptz default now()
);

-- auto-create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. SUBSCRIPTIONS
create table if not exists public.subscriptions (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users(id) on delete set null,
  plan_id             text not null,
  plan_name           text not null,
  status              text not null default 'pending' check (status in ('pending','active','expired','cancelled')),
  stripe_customer_id  text,
  stripe_session_id   text unique,
  amount              numeric(10,2) not null,
  currency            text not null default 'usd',
  starts_at           timestamptz,
  expires_at          timestamptz,
  -- IPTV credentials (filled in by admin or panel API after payment)
  m3u_url             text,
  xtream_username     text,
  xtream_password     text,
  xtream_host         text,
  connections         int not null default 1,
  created_at          timestamptz default now()
);

-- 3. ORDERS — raw payment records
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users(id) on delete set null,
  email             text not null,
  plan_id           text not null,
  plan_name         text not null,
  amount            numeric(10,2) not null,
  currency          text not null default 'usd',
  stripe_session_id text unique,
  payment_method    text not null default 'stripe',
  status            text not null default 'pending' check (status in ('pending','completed','failed','refunded')),
  whatsapp          text,
  created_at        timestamptz default now()
);

-- 4. TRIALS
create table if not exists public.trials (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  contact     text not null,
  device      text not null,
  connections text not null default '1',
  status      text not null default 'pending' check (status in ('pending','active','expired')),
  created_at  timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table public.profiles     enable row level security;
alter table public.subscriptions enable row level security;
alter table public.orders        enable row level security;
alter table public.trials        enable row level security;

-- profiles: users can only read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- subscriptions: users can only see their own subscriptions
create policy "Users can view own subscriptions"
  on public.subscriptions for select using (auth.uid() = user_id);

-- orders: users can only see their own orders
create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

-- trials: users can insert (sign up for a trial), but not read others
create policy "Anyone can request a trial"
  on public.trials for insert with check (true);

-- ============================================================
-- Service role can do everything (used by webhook + admin)
-- ============================================================
-- (No extra policy needed — service role bypasses RLS)
